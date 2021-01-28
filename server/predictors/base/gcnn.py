from numpy import array
import numpy as np
import pandas as pd
from rdkit.Chem.rdchem import Mol
from chemprop.data.utils import get_data, get_data_from_smiles
from chemprop.data import MoleculeDataLoader, MoleculeDataset
from chemprop.train import predict
from .base import PredictorBase
from typing import Tuple

class GcnnBase(PredictorBase):

    def __init__(self, kekule_smiles: array = None, columns_dict_order: int = 1):
        PredictorBase.__init__(self)

        if kekule_smiles is None or len(kekule_smiles) == 0:
            raise ValueError('Please provide a list of kekule smiles')

        self.kekule_smiles = kekule_smiles

        self._columns_dict['GCNN'] = {
            'order': columns_dict_order,
            'description': 'graph convolutional neural network',
            'isSmilesColumn': False
        }

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