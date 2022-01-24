from numpy import array
import numpy as np
import pandas as pd
from rdkit.Chem.rdchem import Mol
from chemprop.data.utils import get_data, get_data_from_smiles
from chemprop.data import MoleculeDataLoader, MoleculeDataset
from chemprop.train import predict
from .base import PredictorBase
#from ..utilities.utilities import get_interpretation
from typing import Tuple
from datetime import timezone
import datetime

class GcnnBase(PredictorBase):

    def __init__(self, kekule_smiles: array = None, column_dict_key = 'GCNN', columns_dict_order: int = 1, smiles: array = None):
        PredictorBase.__init__(self)

        if kekule_smiles is None or len(kekule_smiles) == 0:
            raise ValueError('Please provide a list of kekule smiles')

        self.kekule_smiles = kekule_smiles

        self.column_dict_key = column_dict_key

        self._columns_dict[column_dict_key] = {
            'order': columns_dict_order,
            'description': 'graph convolutional neural network prediction',
            'isSmilesColumn': False
        }

        self.smiles = smiles
        self.model_name = None

    def gcnn_predict(self, model, scaler) -> Tuple[array, array]:
        """
        Function that handles graph convolutinal neural network predictions, enters them into the predictions DataFrame and reports any errors

        Parameters:
            models (model): model
            scaler  (scalar): scalar

        Returns:
            predictions, prediction_labels (Tuple[array, array]): predictions and labels
        """

        smiles = self.kekule_smiles.tolist()
        full_data = get_data_from_smiles(smiles=smiles, skip_invalid_smiles=False)
        full_to_valid_indices = {}
        valid_index = 0
        for full_index in range(len(full_data)):
            if full_data[full_index].mol is not None:
                full_to_valid_indices[full_index] = valid_index
                valid_index += 1

        data = MoleculeDataset([full_data[i] for i in sorted(full_to_valid_indices.keys())])

        # create data loader
        data_loader = MoleculeDataLoader(
            dataset=data,
            batch_size=50,
            num_workers=0
        )

        model_preds = predict(
            model=model,
            data_loader=data_loader,
            scaler=scaler
        )

        predictions = np.ma.empty(len(full_data))
        predictions.mask = True
        labels = np.ma.empty(len(full_data), dtype=np.int32)
        labels.mask = True
        for key in full_to_valid_indices.keys():
            full_index = int(key)
            predictions[full_index] = model_preds[full_to_valid_indices[key]][0]
            labels[full_index] = np.round(model_preds[full_to_valid_indices[key]][0], 0)

        if self.smiles is not None:
            dt = datetime.datetime.now(timezone.utc)
            utc_time = dt.replace(tzinfo=timezone.utc)
            utc_timestamp = utc_time.timestamp()

            self.raw_predictions_df = self.raw_predictions_df.append(
                pd.DataFrame(
                    { 'SMILES': self.smiles, 'model': self.model_name, 'prediction': predictions, 'timestamp': utc_timestamp }
                ),
                ignore_index = True
            )

        # if self.interpret == True:
        #     intrprt_df = get_interpretation(self.smiles, self.model_name)
        # else:
        #     col_names = ['smiles', 'rationale_smiles', 'rationale_score']
        #     intrprt_df = pd.DataFrame(columns = col_names)


        #self.predictions_df['smiles'] = pd.Series(np.where(intrprt_df['rationale_scores']>0, intrprt_df['smiles'] + '_' + intrprt_df['rationale_smiles'], intrprt_df['smiles']))

        self.predictions_df[self.column_dict_key] = pd.Series(pd.Series(labels).fillna('').astype(str) + ' (' + pd.Series(np.where(predictions>=0.5, predictions, (1 - predictions))).round(2).astype(str) + ')').str.replace('(nan)', '', regex=False)
        if len(self.predictions_df.index) > len(predictions) or np.ma.count_masked(predictions) > 0:
            self.model_errors.append('graph convolutional neural network')
            self.has_errors = True

        return predictions, labels
