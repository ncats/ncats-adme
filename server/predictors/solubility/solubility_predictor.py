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
from rdkit.Chem.rdchem import Mol
from numpy import array
from typing import Tuple
from ..features.morgan_fp import MorganFPGenerator
from ..utilities.utilities import get_processed_smi
from . import solubility_gcnn_scaler, solubility_gcnn_model
from ..base.gcnn import GcnnBase
import time

class SolubilityPredictior(GcnnBase):
    """
    Makes RLM stability preditions

    Attributes:
        df (DataFrame): DataFrame containing column with smiles
        smiles_column_index (int): index of column containing smiles
        predictions_df (DataFrame): DataFrame hosting all predictions
    """

    def __init__(self, kekule_smiles: array = None):
        """
        Constructor for RLMPredictior class

        Parameters:
            kekule_smiles (Array): numpy array of RDkit molecules
        """

        GcnnBase.__init__(self, kekule_smiles, column_dict_key='Predicted Class (Probability)', columns_dict_order = 1)

        self._columns_dict['Prediction'] = {
            'order': 2,
            'description': 'class label',
            'isSmilesColumn': False
        }
        
    def get_predictions(self) -> DataFrame:
        """
        Function that calculates consensus predictions

        Returns:
            Predictions (DataFrame): DataFrame with all predictions
        """

        if len(self.kekule_smiles) > 0:

            start = time.time()
            gcnn_predictions, gcnn_labels = self.gcnn_predict(solubility_gcnn_model, solubility_gcnn_scaler)
            end = time.time()
            print(f'{end - start} seconds to Solubility predict {len(self.predictions_df.index)} molecules')

            self.predictions_df['Prediction'] = pd.Series(
                pd.Series(np.where(gcnn_predictions>=0.5, 'low solubility', 'high solubility'))
            )
            
        return self.predictions_df
