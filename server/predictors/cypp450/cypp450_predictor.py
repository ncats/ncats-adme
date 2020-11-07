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
from ..cypp450 import cypp450_models_dict
import time
from tqdm import tqdm

class CYPP450redictior:
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
            'description': 'CYPP450 CYP2D6 substrate',
            'isSmilesColumn': False
        },
        'CYP3A4_inhib': {
            'order': 5,
            'description': 'CYPP450 CYP3A4 inhibitor',
            'isSmilesColumn': False
        },
        'CYP3A4_subs': {
            'order': 6,
            'description': 'CYPP450 CYP3A4 substrate',
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

        for model_name in tqdm(cypp450_models_dict.keys()):

            model_has_error = False

            # create a masked array to calculate mean probabilities event when values are missing
            probs_matrix = np.ma.empty((64, features.shape[0]))
            probs_matrix.mask = True

            for model_number in tqdm(range(0, 64)):
                probs = cypp450_models_dict[model_name][f'model_{model_number}'].predict_proba(features)
                probs_matrix[model_number, :probs.shape[0]] = probs.T[1]
                if model_has_error == False and len(self.predictions_df.index) > len(probs):
                    model_has_error = True

            mean_probs = probs_matrix.mean(axis=0)

            if model_has_error:
                self.model_errors.append(self._columns_dict[model_name]['description'])

            self.predictions_df[f'{model_name}'] = pd.Series(
                pd.Series(np.where(mean_probs>=0.5, 1, 0)).round(2).astype(str)
                +' ('
                +pd.Series(mean_probs).round(2).astype(str)
                +')'
            )

        end = time.time()
        print(f'{end - start} seconds to CYPP450 predict {len(self.predictions_df.index)} molecules')

        self.predictions_df.drop([self._mol_column_name], axis=1, inplace=True)

        return self.df.merge(self.predictions_df, on=self._smi_column_name, how='left')

    def get_errors(self):
        return {
            'has_smi_errors': self.has_smi_errors,
            'model_errors': self.model_errors
        }

    def columns_dict(self):
        return self._columns_dict.copy()
