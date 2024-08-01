import numpy as np
import pandas as pd
from pandas import DataFrame
import pickle
from rdkit import Chem
import warnings
warnings.filterwarnings('ignore')
import sys
sys.path.insert(0, '../chemprop')
import random
import string
from rdkit.Chem.rdchem import Mol
from numpy import array
from typing import Tuple
from ..utilities.utilities import calc_rdkit_desc_req
from . import hlm_model_dict, hlm_rdkit_desc
from ..rlm import rlm_gcnn_scaler, rlm_gcnn_model
from ..base.gcnn import GcnnBase
import time
from datetime import timezone
import datetime
import csv

class HLMPredictior(GcnnBase):
    """
    Makes HLM stability preditions

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

    def __init__(self, kekule_smiles: array = None, smiles: array = None):
        """
        Constructor for HLMPredictior class

        Parameters:
            kekule_smiles (Array): numpy array of RDkit molecules
        """
        GcnnBase.__init__(self, kekule_smiles, column_dict_key='Predicted Class (Probability)', columns_dict_order = 1, smiles=smiles)

        # get RLM predictions
        rlm_predictions, rlm_labels = self.gcnn_predict(rlm_gcnn_model, rlm_gcnn_scaler)
        rlm_predictions = rlm_predictions.tolist()
        # get RDKit descriptors
        df_desc = calc_rdkit_desc_req(kekule_smiles, hlm_rdkit_desc)
        df_desc.columns = ['RDKit_' + str(col) for col in df_desc.columns]
        df_desc = df_desc.drop('RDKit_SMILES', axis=1)

        # check if all cpds have both RLM preds and RDKit descriptors
        if df_desc.shape[1] == len(hlm_rdkit_desc) and len(rlm_predictions) == df_desc.shape[0]:
            df_desc.insert(0, 'RLM_Pred', rlm_predictions)
            # restore original feature column order
            hlm_rdkit_desc_ordered = ['RDKit_' + str(desc) for desc in hlm_rdkit_desc]
            hlm_rdkit_desc_ordered.insert(0, 'RLM_Pred')
            df_desc = df_desc[hlm_rdkit_desc_ordered] # order restored here
            df_desc.to_csv('/Users/siramshv/Work/ncats/hlm_new/scripts/best_model/rdkit_desc_from_ncatsadme.csv', index=False)
            self.features = df_desc.to_numpy()
        else:
            self.model_errors = 'Error calculating descriptors for HLM predictions'

        # create dataframe to be filled with predictions
        columns = self._columns_dict.keys()
        self.predictions_df = pd.DataFrame(columns=columns)
        self.raw_predictions_df = pd.DataFrame()
        self.model_name = 'hlm'

    def get_predictions(self) -> DataFrame:
        """
        Function that calculates consensus predictions

        Returns:
            Predictions (DataFrame): DataFrame with all predictions
        """

        if len(self.kekule_smiles) > 0:

            features = self.features
            start = time.time()

            model = hlm_model_dict['hlm_model']
            pred_probs = model.predict_proba(features).T[1]

            self.predictions_df['Predicted Class (Probability)'] = pd.Series(pd.Series(pred_probs).round().astype(int).astype(str) + ' (' + pd.Series(np.where(np.asarray(pred_probs)>=0.5, np.asarray(pred_probs), (1-np.asarray(pred_probs)))).round(2).astype(str) + ')')
            self.predictions_df['Prediction'] = pd.Series(pd.Series(np.where(np.asarray(pred_probs)>=0.5, 'unstable', 'stable')))

            # populate raw df for recording preds
            if self.smiles is not None:
                dt = datetime.datetime.now(timezone.utc)
                utc_time = dt.replace(tzinfo=timezone.utc)
                utc_timestamp = utc_time.timestamp()
                self.raw_predictions_df = self.raw_predictions_df.append(
                    pd.DataFrame(
                        { 'SMILES': self.smiles, 'model': 'hlm', 'prediction': pred_probs, 'timestamp': utc_timestamp }
                    ),
                    ignore_index = True
                )

            end = time.time()
            print(f'HLM: {end - start} seconds to predict {len(self.predictions_df.index)} molecules')

        return self.predictions_df
    
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
