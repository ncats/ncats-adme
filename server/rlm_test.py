
import pandas as pd
from predictors.rlm.rlm_predictor import RLMPredictior

print('working on RLM test script!')

working_df = pd.read_csv('/Users/siramshettyv2/work/adme/adme_website/test_set_rlm.csv')

predictor = RLMPredictior(kekule_smiles = working_df['smiles'].values)
pred_df = predictor.get_predictions()

print(pred_df.head(10))