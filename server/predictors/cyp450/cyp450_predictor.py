import os
import random
import string
import pandas as pd
from pandas import DataFrame
import numpy as np
from rdkit.Chem import PandasTools
from numpy import array
from typing import Tuple
from rdkit.Chem.rdchem import Mol
from ..features.morgan_fp import MorganFPGenerator
from ..utilities.processors import get_processed_smi
from rdkit import Chem
from ..features.rdkit_descriptors import RDKitDescriptorsGenerator
from ..cyp450 import cyp450_models_dict
import time
from tqdm import tqdm
from copy import deepcopy
import multiprocessing as mp
import platform
# if platform.system() == 'Linux' and 'Microsoft' not in platform.uname().release:
#     set_start_method('forkserver')
    #mp = multiprocessing.get_context('forkserver')
# else:
#     import multiprocessing as mp
    

class CYP450Predictor:
    """
    Makes RLM stability preditions

    Attributes:
        df (DataFrame): DataFrame containing column with smiles
        smiles_column_index (int): index of column containing smiles
        predictions_df (DataFrame): DataFrame hosting all predictions
    """

    _columns_dict = {
        'CYP2C9_inhib': {
            'order': 1,
            'description': 'CYP2C9 inhibitor',
            'isSmilesColumn': False
        },
        'CYP2C9_subs': {
            'order': 2,
            'description': 'CYP2C9 substrate',
            'isSmilesColumn': False
        },
        'CYP2D6_inhib': {
            'order': 3,
            'description': 'CYP2D6 inhibitor',
            'isSmilesColumn': False
        },
        'CYP2D6_subs': {
            'order': 4,
            'description': 'CYP450 CYP2D6 substrate',
            'isSmilesColumn': False
        },
        'CYP3A4_inhib': {
            'order': 5,
            'description': 'CYP450 CYP3A4 inhibitor',
            'isSmilesColumn': False
        },
        'CYP3A4_subs': {
            'order': 6,
            'description': 'CYP450 CYP3A4 substrate',
            'isSmilesColumn': False
        }
    }

    def __init__(self, df: DataFrame, smiles_column_index: int, morgan_fp_matrix: array = None):
        """
        Constructor for RLMPredictior class

        Parameters:
            df (DataFrame): DataFrame containing column with smiles
            smiles_column_index (int): index of column containing smiles,
            morgan_fp_matrix (array): optional numpy array with morgan fingerprints for each molecule
        """

        self.df = df.copy()
        self.smiles_column_index = smiles_column_index

        # create dataframe to be filled with predictions
        columns = self._columns_dict.keys()
        self.predictions_df = pd.DataFrame(columns=columns)

        # insert smiles into predictions df
        smi_series = self.df.iloc[:, self.smiles_column_index]
        self._smi_column_name = smi_series.name
        self.predictions_df.insert(0, self._smi_column_name, smi_series)

        # create random column name for molecules
        letters = string.ascii_letters
        self._mol_column_name = ''.join(random.choice(letters) for i in range(10))

        # converts smiles in self._smi_column_name column, converts them RDKit molecules and adds them to self._mol_column_name
        PandasTools.AddMoleculeColumnToFrame(
            self.predictions_df,
            self._smi_column_name,
            self._mol_column_name,
            includeFingerprints=False
        )

        # this step omits mols for which smiles could not be parsed
        self.predictions_df = self.predictions_df[~self.predictions_df[self._mol_column_name].isnull()]

        if len(self.predictions_df.index) == 0:
            raise ValueError('Please provide valid smiles')

        # add column with kekule smiles
        self.predictions_df[self._mol_column_name] = self.predictions_df[self._mol_column_name].apply(self._get_kekule_smiles)

        if morgan_fp_matrix is None:
            # generate morgan fingerprints
            morgan_fp_generator = MorganFPGenerator(self.predictions_df)
            self.morgan_fp_matrix = morgan_fp_generator.get_morgan_features(self._mol_column_name)
        else:
            self.morgan_fp_matrix = morgan_fp_matrix

        # generate rdkit descriptors
        rdkit_descriptors_generator = RDKitDescriptorsGenerator(self.predictions_df)
        self.rdkit_desc_matrix = rdkit_descriptors_generator.get_rdkit_descriptors(self._mol_column_name, ['MolLogP', 'TPSA', 'ExactMolWt', 'NumHDonors', 'NumHAcceptors'])

        # error properties
        self.has_errors = self.has_smi_errors = len(self.df.index) > len(self.predictions_df.index)
        self.model_errors = []

    def _get_kekule_smiles(self, mol: Mol) -> str:
        Chem.Kekulize(mol)
        kek_smi = Chem.MolToSmiles(mol,kekuleSmiles=True)
        return kek_smi

    def get_predictions(self):

        features = np.append(self.morgan_fp_matrix, self.rdkit_desc_matrix, axis=1)

        start = time.time()

        processes_dict = {}
        conns_dict = {}

        if mp.cpu_count() > 1:
            processes = mp.cpu_count() - 1
        else:
            processes = 1

        with mp.Pool(processes=processes) as pool:

            for model_name in cyp450_models_dict.keys():

                parent_conn, child_conn = mp.Pipe()

                conns_dict[model_name] = parent_conn

                params_dict = {
                    "model_name": model_name,
                    "features": features,
                    "error_threshold_length": len(self.predictions_df.index)
                }

                parent_conn.send(params_dict)
                processes_dict[model_name] = pool.apply_async(self._get_model_predictions, args=(child_conn,))

            for model_name in processes_dict:
                processes_dict[model_name].wait()

            for model_name in processes_dict:
                response_dict = conns_dict[model_name].recv()
                model_has_error = response_dict["model_has_error"]
                mean_probs = response_dict["mean_probs"]

                if model_has_error:
                    self.model_errors.append(self._columns_dict[model_name]['description'])

                self.predictions_df[f'{model_name}'] = pd.Series(
                    pd.Series(np.where(mean_probs>=0.5, 1, 0)).round(2).astype(str)
                    +' ('
                    +pd.Series(mean_probs).round(2).astype(str)
                    +')'
                )
                conns_dict[model_name].close()

        end = time.time()
        print(f'{end - start} seconds to CYP450 predict {len(self.predictions_df.index)} molecules')

        self.predictions_df.drop([self._mol_column_name], axis=1, inplace=True)

        return self.df.merge(self.predictions_df, on=self._smi_column_name, how='left')

    def _get_model_predictions(self, con):
        
        params_dict = con.recv()
        model_name = params_dict['model_name']
        features = params_dict['features']
        error_threshold_length = params_dict['error_threshold_length']
        models = cyp450_models_dict[model_name]
        model_has_error = False
        probs_matrix = np.ma.empty((64, features.shape[0]))
        probs_matrix.mask = True

        for model_number in tqdm(range(0, 64)):
            probs = models[f'model_{model_number}'].predict_proba(features)
            probs_matrix[model_number, :probs.shape[0]] = probs.T[1]
            if model_has_error == False and error_threshold_length > len(probs):
                model_has_error = True

        mean_probs = probs_matrix.mean(axis=0)
        response_dict = {
            "mean_probs": mean_probs,
            "model_has_error": model_has_error
        }
        con.send(response_dict)
        con.close()
        return

    def get_errors(self):
        return {
            'has_smi_errors': self.has_smi_errors,
            'model_errors': self.model_errors
        }

    def columns_dict(self):
        return self._columns_dict.copy()
