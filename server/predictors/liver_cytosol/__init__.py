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

def download_file(base_url, model_number, models_dict):
    lc_rf_pkl_url = f'{base_url}/model_{model_number}.pkl'
    lc_model_path = f'./models/liver_cytosol/model_{model_number}.pkl'
    lc_rf_pkl_file_request = requests.get(lc_rf_pkl_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=f'{model_name}-model_{model_number}',
        total=int(lc_rf_pkl_file_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in lc_rf_pkl_file_request.iter_content(chunk_size=4096):
            fout.write(chunk)
    with open(lc_model_path, 'wb') as lc_rf_pkl_file_writer:
        lc_rf_pkl_file_writer.write(lc_rf_pkl_file_request.content)

    lc_rf_model = pickle.load(BytesIO(lc_rf_pkl_file_request.content))
    return lc_rf_model

def load_models():
    # processes = []
    #with ThreadPoolExecutor() as executor:
    base_url = 'https://tripod.nih.gov/pub/adme/models/liver_cytosol/'
    print(f'Loading human liver cytosol stability random forest models', file=sys.stdout)

    lc_models_dict = {}

    for model_number in tqdm(range(1, 4)):
        lc_model_path = f'./models/liver_cytosol/model_{model_number}.pkl'
        if path.exists(lc_model_path) and os.path.getsize(lc_model_path) > 0:
            with open(lc_model_path, 'rb') as pkl_file:
                lc_models_dict[f'model_{model_number}'] = pickle.load(pkl_file)
        else:
            os.makedirs(f'./models/liver_cytosol', exist_ok=True)
            lc_models_dict[f'model_{model_number}'] = download_file(base_url, model_number, lc_models_dict)

    print(f'Finished loading human liver cytosol stability models', file=sys.stdout)
    return lc_models_dict


lc_models_dict = load_models()
