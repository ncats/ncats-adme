import warnings
warnings.filterwarnings("ignore")
import os, sys
import numpy as np
import pandas as pd
import pickle
import shutil
from tqdm import tqdm
import requests
from io import BytesIO
from os import path
import multiprocessing

hlm_model_file_url = 'https://opendata.ncats.nih.gov/public/adme/models/current/static/hlm/model.pkl'
hlm_model_file_path = './models/hlm/model.pkl'
hlm_rdkit_desc_path = 'predictors/hlm/rdkit_desc.csv'

def download_file(model_file_url):
    hlm_xgb_pkl_file_request = requests.get(model_file_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc='hlm_model',
        total=int(hlm_xgb_pkl_file_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in hlm_xgb_pkl_file_request.iter_content(chunk_size=4096):
            fout.write(chunk)
    with open(hlm_model_file_path, 'wb') as lc_rf_pkl_file_writer:
        lc_rf_pkl_file_writer.write(hlm_xgb_pkl_file_request.content)

    hlm_xgb_model = pickle.load(BytesIO(hlm_xgb_pkl_file_request.content))
    return hlm_xgb_model

hlm_model_dict = {}
print(f'Loading HLM XGBoost model', file=sys.stdout)
os.makedirs('./models/hlm', exist_ok=True)

if path.exists(hlm_model_file_path) and os.path.getsize(hlm_model_file_path) > 0:
            with open(hlm_model_file_path, 'rb') as pkl_file:
                hlm_model_dict['hlm_model'] = pickle.load(pkl_file)
else:
    os.makedirs(f'./models/hlm', exist_ok=True)
    hlm_model_dict['hlm_model'] = download_file(hlm_model_file_url)

df_rdkit_desc = pd.read_csv(hlm_rdkit_desc_path, header=None)
hlm_rdkit_desc = df_rdkit_desc[0].tolist()

del hlm_model_file_url
del hlm_model_file_path

print(f'Finished loading HLM models', file=sys.stdout)
