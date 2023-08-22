import numpy as np
import pandas as pd
from pandas import DataFrame
import numpy as np
import pandas as pd
import pickle
# from keras.preprocessing.text import Tokenizer
# from keras.preprocessing.sequence import pad_sequences
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
from ..utilities.utilities import get_processed_smi, calc_rdkit_desc_req
from . import pampa_gcnn_scaler, pampa_gcnn_model, pampa_rdkit_desc, pampa_rdkit_desc_scaler
from ..base.gcnn import GcnnBase
import time

class PAMPABBBPredictior(GcnnBase):
    """
    Makes RLM stability preditions

    Attributes:
        df (DataFrame): DataFrame containing column with smiles
        smiles_column_index (int): index of column containing smiles
        predictions_df (DataFrame): DataFrame hosting all predictions
    """

    def __init__(self, kekule_smiles: array = None, smiles: array = None):
        """
        Constructor for PAMPA BBB Predictior class

        Parameters:
            kekule_smiles (Array): numpy array of RDkit molecules
        """

        GcnnBase.__init__(self, kekule_smiles, column_dict_key='Predicted Class (Probability)', columns_dict_order=1, smiles=smiles)

        df_desc = calc_rdkit_desc_req(kekule_smiles, pampa_rdkit_desc)

        df_feat = df_desc.iloc[:,1:]
        df_feat = df_feat[pampa_rdkit_desc]

        df_feat_scaled = pd.DataFrame(pampa_rdkit_desc_scaler.transform(df_feat))
        df_feat_scaled.columns = df_feat.columns

        if df_feat_scaled.shape[1] == len(pampa_rdkit_desc):
            self.additional_features = df_feat_scaled.to_numpy()

        self._columns_dict['Prediction'] = {
            'order': 2,
            'description': 'class label',
            'isSmilesColumn': False
        }

        self.model_name = 'pampabbb'

    def get_predictions(self) -> DataFrame:
        """
        Function that calculates consensus predictions

        Returns:
            Predictions (DataFrame): DataFrame with all predictions
        """

        if len(self.kekule_smiles) > 0:

            start = time.time()
            gcnn_predictions, gcnn_labels = self.gcnn_predict(pampa_gcnn_model, pampa_gcnn_scaler)
            print(f'PAMPA BBB predictions: {gcnn_predictions}')
            end = time.time()
            print(f'PAMPA BBB: {end - start} seconds to predict {len(self.predictions_df.index)} molecules')

            self.predictions_df['Prediction'] = pd.Series(
                pd.Series(np.where(gcnn_predictions>=0.5, 'low permeability', 'moderate or high permeability'))
            )

            # if not intrprt_df.empty:
            #     intrprt_df['final_smiles'] = np.where(intrprt_df['rationale_score']>0, intrprt_df['smiles'].astype(str)+'_'+intrprt_df['rationale_smiles'].astype(str), intrprt_df['smiles'].astype(str))
            #     self.predictions_df['mol'] = pd.Series(intrprt_df['final_smiles'].tolist())

        return self.predictions_df
