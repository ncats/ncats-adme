import pandas as pd

class PredictorBase:

    _columns_dict = {}

    def __init__ (self):

        self.predictions_df = pd.DataFrame()
        self.has_errors = False
        self.model_errors = []

    def get_errors(self):
        return {
            'model_errors': self.model_errors
        }

    def columns_dict(self):
        return self._columns_dict.copy()