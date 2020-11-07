import numpy as np
import pandas as pd
from pandas import DataFrame
import numpy as np
import pandas as pd
import pickle
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from rdkit import Chem
import warnings
warnings.filterwarnings('ignore')
import sys
sys.path.insert(0, '../chemprop')
from chemprop.data.utils import get_data, get_data_from_smiles
from chemprop.data import MoleculeDataLoader, MoleculeDataset
from chemprop.train import predict
from rdkit.Chem import PandasTools
import random
import string
import settings
from rdkit.Chem.rdchem import Mol
from numpy import array
from typing import Tuple
from ..features.morgan_fp import MorganFPGenerator
from ..utilities.processors import get_processed_smi
from . import rlm_rf_model, rlm_dnn_model, rlm_dnn_tokenizer, rlm_lstm_model, rlm_gcnn_scaler, rlm_gcnn_model
import time

class RLMPredictior:
    """
    Makes RLM stability preditions

    Attributes:
        df (DataFrame): DataFrame containing column with smiles
        smiles_column_index (int): index of column containing smiles
        predictions_df (DataFrame): DataFrame hosting all predictions
    """

    _columns_dict = {
        'RF': {
            'order': 1,
            'description': 'random forest',
            'isSmilesColumn': False
        },
        'DNN': {
            'order': 2,
            'description': 'deep neural network',
            'isSmilesColumn': False
        },
        'LSTM': {
            'order': 3,
            'description': 'long-short term memory',
            'isSmilesColumn': False
        },
        'GCNN': {
            'order': 4,
            'description': 'graph convolutional neural network',
            'isSmilesColumn': False
        },
        'Consensus': {
            'order': 5,
            'description': 'consensus of all four models',
            'isSmilesColumn': False
        },
        'Prediction': {
            'order': 6,
            'description': 'class label predicted by consensus model',
            'isSmilesColumn': False
        }
    }

    def __init__(self, df: DataFrame, smiles_column_index: int, morgan_fp_matrix: array = None):
        """
        Constructor for RLMPredictior class

        Parameters:
            df (DataFrame): DataFrame containing column with smiles
            smiles_column_index (int): index of column containing smiles
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

        self.rdkit_mols = self.predictions_df[self._mol_column_name].values

        # error properties
        self.has_errors = self.has_smi_errors = len(self.df.index) > len(self.predictions_df.index)

        self.model_errors = []

    def _get_kekule_smiles(self, mol: Mol) -> str:
        Chem.Kekulize(mol)
        kek_smi = Chem.MolToSmiles(mol,kekuleSmiles=True)
        return kek_smi
        
    def get_predictions(self) -> DataFrame:
        """
        Function that calculates consensus predictions

        Returns:
            Predictions (DataFrame): DataFrame with all predictions
        """

        if len(self.predictions_df.index) > 0:

            start = time.time()
            rf_y_pred, rf_y_pred_prob = self.rf_predict()
            dnn_predictions, dnn_labels = self.dnn_predict()
            lstm_predictions, lstm_labels = self.lstm_predict()
            gcnn_predictions, gcnn_labels = self.gcnn_predict()
            end = time.time()
            print(f'{end - start} seconds to RLM predict {len(self.predictions_df.index)} molecules')
            
            # create a masked array to calculate mean probabilities event when values are missing
            matrix = np.ma.empty((4, max(rf_y_pred_prob.shape[0], dnn_predictions.shape[0], lstm_predictions.shape[0], gcnn_predictions.shape[0])))
            matrix.mask = True
            matrix[0, :rf_y_pred_prob.shape[0]] = rf_y_pred_prob
            matrix[1, :dnn_predictions.shape[0]] = dnn_predictions
            matrix[2, :lstm_predictions.shape[0]] = lstm_predictions
            matrix[3, :gcnn_predictions.shape[0]] = gcnn_predictions

            consensus_pred_prob = matrix.mean(axis=0)
            self.predictions_df['Consensus'] = pd.Series(
                pd.Series(np.where(consensus_pred_prob>=0.5, 1, 0)).round(2).astype(str)
                +' ('
                +pd.Series(consensus_pred_prob).round(2).astype(str)
                +')'
            )

            self.predictions_df['Prediction'] = pd.Series(
                pd.Series(np.where(consensus_pred_prob>=0.5, 'unstable', 'stable'))
            )

        self.predictions_df.drop([self._mol_column_name], axis=1, inplace=True)

        return self.df.merge(self.predictions_df, on=self._smi_column_name, how='left')

    def rf_predict(self) -> Tuple[array, array]:
        """
        Function that handles random forest predictions, enters them into the predictions DataFrame and reports any errors

        Returns:
            predictions, prediction_probabilities (Tuple[array, array]): predictions and probabilities
        """

        y_pred = rlm_rf_model.predict(self.morgan_fp_matrix)
        y_pred_prob = rlm_rf_model.predict_proba(self.morgan_fp_matrix).T[1]
        self.predictions_df['RF'] = pd.Series(pd.Series(y_pred).astype(str) + ' (' + pd.Series(y_pred_prob).round(2).astype(str) + ')')
        if len(self.predictions_df.index) > len(y_pred_prob):
            self.model_errors.append('random forest')
            self.has_errors = True

        return y_pred, y_pred_prob

    def dnn_predict(self) -> Tuple[array, array]:
        """
        Function that handles deep neural network predictions, enters them into the predictions DataFrame and reports any errors

        Returns:
            predictions, prediction_labels (Tuple[array, array]): predictions and labels
        """

        predictions = rlm_dnn_model.predict(self.morgan_fp_matrix)
        y_pred_labels = np.array(predictions).ravel()
        labels = y_pred_labels.round(0).astype(int)
        predictions = np.array(predictions).ravel()
        self.predictions_df['DNN'] = pd.Series(pd.Series(labels).astype(str) + ' (' + pd.Series(predictions).round(2).astype(str) + ')')

        if len(self.predictions_df.index) > len(predictions):
            self.model_errors.append('deep neural network')
            self.has_errors = True
        
        return predictions, labels

    def lstm_predict(self) -> Tuple[array, array]:
        """
        Function that handles long short term memory predictions, enters them into the predictions DataFrame and reports any errors

        Parameters:
            rdkit_mols (array): a numpy array containing RDKit molecules

        Returns:
            predictions, prediction_labels (Tuple[array, array]): predictions and labels
        """

        max_len = 100
        X_smi = get_processed_smi(self.rdkit_mols)
        X_smi = rlm_dnn_tokenizer.texts_to_sequences(X_smi)
        X_smi = pad_sequences(X_smi, maxlen=max_len, padding='post')

        predictions = rlm_lstm_model.predict(X_smi)
        y_pred_labels = np.array(predictions).ravel()
        labels = y_pred_labels.round(0).astype(int)
        predictions = np.array(predictions).ravel()
        self.predictions_df['LSTM'] = pd.Series(pd.Series(labels).astype(str) + ' (' + pd.Series(predictions).round(2).astype(str) + ')')
        if len(self.predictions_df.index) > len(predictions):
            self.model_errors.append('deep neural network')
            self.has_errors = True
        
        return predictions, labels

    def gcnn_predict(self) -> Tuple[array, array]:
        """
        Function that handles graph convolutinal neural network predictions, enters them into the predictions DataFrame and reports any errors

        Parameters:
            rdkit_mols (array): a numpy array containing RDKit molecules

        Returns:
            predictions, prediction_labels (Tuple[array, array]): predictions and labels
        """

        smiles = self.rdkit_mols.tolist()
        full_data = get_data_from_smiles(smiles=smiles, skip_invalid_smiles=False)
        full_to_valid_indices = {}
        valid_index = 0
        for full_index in range(len(full_data)):
            if full_data[full_index].mol is not None:
                full_to_valid_indices[full_index] = valid_index
                valid_index += 1

        test_data = MoleculeDataset([full_data[i] for i in sorted(full_to_valid_indices.keys())])

        # create data loader
        test_data_loader = MoleculeDataLoader(
            dataset=test_data,
            batch_size=50,
            num_workers=0
        )

        model_preds = predict(
            model=rlm_gcnn_model,
            data_loader=test_data_loader,
            scaler=rlm_gcnn_scaler
        )
        predictions = np.ma.empty(len(full_data))
        predictions.mask = True
        labels = np.ma.empty(len(full_data))
        labels.mask = True
        for key in full_to_valid_indices.keys():
            full_index = int(key)
            predictions[full_index] = model_preds[full_to_valid_indices[key]][0]
            labels[full_index] = np.round(model_preds[full_to_valid_indices[key]][0], 0)

        self.predictions_df['GCNN'] = pd.Series(pd.Series(labels).fillna('').astype(str) + ' (' + pd.Series(predictions).round(2).astype(str) + ')').str.replace('(nan)', '', regex=False)
        if len(self.predictions_df.index) > len(predictions) or np.ma.count_masked(predictions) > 0:
            self.model_errors.append('graph convolutional neural network')
            self.has_errors = True
        
        return predictions, labels

    def get_errors(self):
        return {
            'has_smi_errors': self.has_smi_errors,
            'model_errors': self.model_errors
        }

    def columns_dict(self):
        return self._columns_dict.copy()
