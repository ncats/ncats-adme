import pandas as pd
import csv

class PredictorBase:

    _columns_dict = {}

    def __init__ (self):

        self.predictions_df = pd.DataFrame()
        self.has_errors = False
        self.model_errors = []
        self.raw_predictions_df = pd.DataFrame()

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