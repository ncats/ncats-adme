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
from rdkit import Chem
from rdkit.Chem import Descriptors
from rdkit.ML.Descriptors import MoleculeDescriptors
from ..utilities.utilities import get_processed_smi
from ..features.descriptor_gen import DescriptorGen
from ..liver_cytosol import lc_models_dict # change this
import time
from tqdm import tqdm
from copy import deepcopy
import multiprocessing as mp
import platform
import csv
from datetime import timezone
import datetime

class LCPredictor:
    """
    Makes Livr Cytosol Stability preditions

    Attributes:
        df (DataFrame): DataFrame containing column with smiles
        smiles_column_index (int): index of column containing smiles
        predictions_df (DataFrame): DataFrame hosting all predictions
    """

    _columns_dict = {
        'Predicted Class (Probability)': {
            'order': 1,
            'description': 'random forest prediction',
            'isSmilesColumn': False
        },
        'Prediction': {
            'order': 2,
            'description': 'class label',
            'isSmilesColumn': False
        }
    }

    def __init__(self, kekule_smiles: array = None, morgan_fp: array = None, smiles: array = None):
        """
        Constructor for RLMPredictior class

        Parameters:
            kekule_mols (array): n x 1 array of RDKit molecule objects kekulized
            morgan_fp_matrix (array): optional numpy array of morgan fingerprints for each molecule,
            smiles (array): optional n x 1 array of SMILES used to record raw predictions in raw_predictions_df property
        """

        if len(kekule_smiles) == 0:
            raise ValueError('Please provide valid SMILES')

        kekule_smiles_df = pd.DataFrame(kekule_smiles, columns=['kekule_smiles'])

        # create dataframe to be filled with predictions
        columns = self._columns_dict.keys()
        self.predictions_df = pd.DataFrame(columns=columns)
        self.raw_predictions_df = pd.DataFrame()

        desc_gen = DescriptorGen()
        kekule_smiles_df['desc'] = kekule_smiles_df['kekule_smiles'].apply(desc_gen.from_smiles)
        self.morgan_fp = np.stack(kekule_smiles_df.desc)

        self.smiles = smiles
        self.has_errors = False
        self.model_errors = []

    def get_predictions(self):

        features = self.morgan_fp
        start = time.time()

        for model_name in lc_models_dict.keys():
            model = lc_models_dict[model_name]
            pred_probs = model.predict_proba(features).T[1]
            self.raw_predictions_df[model_name] =  pred_probs

        self.raw_predictions_df['average'] = self.raw_predictions_df.mean(axis=1)
        avg_pred_probs = self.raw_predictions_df['average'].tolist()
        #self.predictions_df['Predicted Class (Probability)'] = pd.Series(pd.Series(avg_pred_probs).round().astype(int).astype(str) + ' (' + pd.Series(avg_pred_probs).round(2).astype(str) + ')')
        self.predictions_df['Predicted Class (Probability)'] = pd.Series(pd.Series(avg_pred_probs).round().astype(int).astype(str) + ' (' + pd.Series(np.where(np.asarray(avg_pred_probs)>=0.5, np.asarray(avg_pred_probs), (1-np.asarray(avg_pred_probs)))).round(2).astype(str) + ')')
        self.predictions_df['Prediction'] = pd.Series(pd.Series(np.where(np.asarray(avg_pred_probs)>=0.5, 'unstable', 'stable')))

        # empyting the raw df
        self.raw_predictions_df = pd.DataFrame(None)

        # populate raw df for recording preds
        if self.smiles is not None:
            dt = datetime.datetime.now(timezone.utc)
            utc_time = dt.replace(tzinfo=timezone.utc)
            utc_timestamp = utc_time.timestamp()
            self.raw_predictions_df = self.raw_predictions_df.append(
                pd.DataFrame(
                    { 'SMILES': self.smiles, 'model': 'hlc', 'prediction': avg_pred_probs, 'timestamp': utc_timestamp }
                ),
                ignore_index = True
            )

        end = time.time()
        print(f'HLC: {end - start} seconds to predict {len(self.raw_predictions_df.index)} molecules')

        return self.predictions_df


    def generate_descriptor_value(smiles, descriptor_function):
        mol = Chem.MolFromSmiles(smiles)
        value = None
        if mol is not None:
            value = descriptor_function(mol)
        return value

    def calc_rdkit_descriptors(df, smiles_col_name):

        df_all = df.copy()

        for (descriptor_tuple, i) in zip(Descriptors.descList, range(len(df_all))):
            descriptor_name = descriptor_tuple[0]
            descriptor_function = descriptor_tuple[1]
            df_all[descriptor_name] = df_all['SMILES'].apply(lambda x: generate_descriptor_value(x, descriptor_function))

        return df_all


    def _error_callback(self, error):
        print(error)

    def get_errors(self):
        return {
            'model_errors': self.model_errors
        }

    def columns_dict(self):
        return self._columns_dict.copy()

    def record_predictions(self, file_path):
        if len(self.raw_predictions_df.index) > 0:
            with open(file_path, 'a') as fw:
                rows = self.raw_predictions_df.values.tolist()
                cw = csv.writer(fw)
                cw.writerows(rows)
