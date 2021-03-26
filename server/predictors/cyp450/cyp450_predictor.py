import os
import random
import string
import sys
import pandas as pd
from pandas import DataFrame
import numpy as np
from rdkit.Chem import PandasTools
from numpy import array
from typing import Tuple
from rdkit.Chem.rdchem import Mol
from ..features.morgan_fp import MorganFPGenerator
from ..utilities.utilities import get_processed_smi
from rdkit import Chem
from ..features.rdkit_descriptors import RDKitDescriptorsGenerator
from ..cyp450 import cyp450_models_dict
import time
from tqdm import tqdm
from copy import deepcopy
import multiprocessing as mp
import platform

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

    def __init__(self, kekule_mols: array = None, rdkit_descriptors_matrix: array = None, morgan_fp_matrix: array = None):
        """
        Constructor for RLMPredictior class

        Parameters:
            rdkit_descriptors_matri (array): optional numpy array of rdkit descriptors for each molecule,
            morgan_fp_matrix (array): optional numpy array of morgan fingerprints for each molecule
        """

        self.kekule_mols = kekule_mols

        # create dataframe to be filled with predictions
        columns = self._columns_dict.keys()
        self.predictions_df = pd.DataFrame(columns=columns)

        if len(self.kekule_mols) == 0:
            raise ValueError('Please provide valid smiles')


        if morgan_fp_matrix is None:
            # generate morgan fingerprints
            morgan_fp_generator = MorganFPGenerator(self.kekule_mols)
            self.morgan_fp_matrix = morgan_fp_generator.get_morgan_features()
        else:
            self.morgan_fp_matrix = morgan_fp_matrix

        if rdkit_descriptors_matrix is None:
            # generate rdkit descriptors
            rdkit_descriptors_generator = RDKitDescriptorsGenerator(self.kekule_mols)
            self.rdkit_desc_matrix = rdkit_descriptors_generator.get_rdkit_descriptors(['MolLogP', 'TPSA', 'ExactMolWt', 'NumHDonors', 'NumHAcceptors'])
        else:
            self.rdkit_desc_matrix = rdkit_descriptors_matrix

        self.has_errors = False
        self.model_errors = []

    def get_predictions(self):

        features = np.append(self.morgan_fp_matrix, self.rdkit_desc_matrix, axis=1)
        
        start = time.time()

        processes_dict = {}
        #conns_dict = {}
        response_queues_dict ={}

        if mp.cpu_count() > 1:
            processes = mp.cpu_count() - 1
        else:
            processes = 1

        with mp.Pool(processes=processes) as pool:
            
            for model_name in cyp450_models_dict.keys():

                # parent_conn, child_conn = mp.Pipe()

                # conns_dict[model_name] = parent_conn
                manager = mp.Manager()
                request_queue = manager.Queue()
                response_queue = manager.Queue()
                response_queues_dict[model_name] = response_queue

                params_dict = {
                    "model_name": model_name,
                    "features": features,
                    "error_threshold_length": len(self.predictions_df.index)
                }

                #parent_conn.send(params_dict)
                request_queue.put(params_dict)

                #processes_dict[model_name] = pool.apply_async(self._get_model_predictions, args=(child_conn,))
                processes_dict[model_name] = pool.apply_async(self._get_model_predictions, args=(request_queue, response_queue,), error_callback=self._error_callback)

            for model_name in cyp450_models_dict.keys():
                processes_dict[model_name].wait()

            for model_name in cyp450_models_dict.keys():
                #response_dict = conns_dict[model_name].recv()

                response_dict = response_queues_dict[model_name].get()
                model_has_error = response_dict["model_has_error"]
                mean_probs = response_dict["mean_probs"]

                if model_has_error:
                    self.has_errors = True
                    self.model_errors.append(self._columns_dict[model_name]['description'])

                self.predictions_df[f'{model_name}'] = pd.Series(
                    pd.Series(np.where(mean_probs>=0.5, 1, 0)).round(2).astype(str)
                    +' ('
                    +pd.Series(mean_probs).round(2).astype(str)
                    +')'
                )
                #conns_dict[model_name].close()

            pool.close()
            pool.terminate()
            pool.join()

        end = time.time()
        print(f'{end - start} seconds to CYP450 predict {len(self.predictions_df.index)} molecules')

        return self.predictions_df

    def _error_callback(self, error):
        print(error)

    #def _get_model_predictions(self, con):
    def _get_model_predictions(self, request_queue, response_queue):
        #params_dict = con.recv()
        params_dict = request_queue.get()

        model_name = params_dict['model_name']
        features = params_dict['features']
        error_threshold_length = params_dict['error_threshold_length']
        models = cyp450_models_dict[model_name]
        model_has_error = False
        probs_matrix = np.ma.empty((64, features.shape[0]))
        probs_matrix.mask = True
        for model_number in range(0, 64):
            probs = models[f'model_{model_number}'].predict_proba(features)
            probs_matrix[model_number, :probs.shape[0]] = probs.T[1]
            if model_has_error == False and error_threshold_length > len(probs):
                model_has_error = True

        mean_probs = probs_matrix.mean(axis=0)
        response_dict = {
            "mean_probs": mean_probs,
            "model_has_error": model_has_error
        }

        #con.send(response_dict)
        #con.close()
        response_queue.put(response_dict)
        return None

    def get_errors(self):
        return {
            'model_errors': self.model_errors
        }

    def columns_dict(self):
        return self._columns_dict.copy()
