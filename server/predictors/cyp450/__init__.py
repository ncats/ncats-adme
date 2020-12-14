import warnings
warnings.filterwarnings("ignore")
import os, sys
import numpy as np
import pandas as pd
import pickle
# import zipfile
# import tempfile
import shutil
from tqdm import tqdm
import requests
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor, as_completed
from os import path

cyp450_models_dict = {
    'CYP2C9_inhib': {},
    'CYP2C9_subs': {},
    'CYP2D6_inhib': {},
    'CYP2D6_subs': {},
    'CYP3A4_inhib': {},
    'CYP3A4_subs': {}
}

# for model_name in cyp450_models_dict.keys():
#     for model_number in range(0, 64):
#         model_path = os.path.join(os.getcwd(), f'models/CYP450/{model_name}/model_{model_number}')
#         cyp450_models_dict[model_name][f'model_{model_number}'] = pickle.load(open(model_path, 'rb'))

def download_file(base_url, model_name, model_number, models_dict):
    cyp450_rf_pkl_url = f'{base_url}/{model_name}/model_{model_number}'
    cyp450_model_path = f'./models/CYP450/{model_name}/model_{model_number}'
    cyp450_rf_pkl_file_request = requests.get(cyp450_rf_pkl_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=f'{model_name}-model_{model_number}',
        total=int(cyp450_rf_pkl_file_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in cyp450_rf_pkl_file_request.iter_content(chunk_size=4096):
            fout.write(chunk)
    with open(cyp450_model_path, 'wb') as cyp450_rf_pkl_file_writer:
        cyp450_rf_pkl_file_writer.write(cyp450_rf_pkl_file_request.content)

    cyp450_models_dict[model_name][f'model_{model_number}'] = pickle.load(BytesIO(cyp450_rf_pkl_file_request.content))
    # with open(cyp450_model_path, 'r') as cyp450_rf_pkl_file_reader:
    #     print(model_name)
    #     print(model_number)
    #     cyp450_models_dict[model_name][f'model_{model_number}'] = pickle.load(cyp450_rf_pkl_file_reader)
        
def load_models(cyp450_models_dict):
    # processes = []
    #with ThreadPoolExecutor() as executor:
    base_url = 'https://tripod.nih.gov/pub/adme/models/CYPP450/'
    print(f'Loading CYP450 random forest models', file=sys.stdout)
    for model_name in tqdm(cyp450_models_dict.keys()):
    # for model_name in cyp450_models_dict.keys():
        for model_number in tqdm(range(0, 64)):
        # for model_number in range(0, 64):
            cyp450_model_path = f'./models/CYP450/{model_name}/model_{model_number}'
            if path.exists(cyp450_model_path) and os.path.getsize(cyp450_model_path) > 0:
                with open(cyp450_model_path, 'rb') as pkl_file:
                    cyp450_models_dict[model_name][f'model_{model_number}'] = pickle.load(pkl_file)
            else:
                os.makedirs(f'./models/CYP450/{model_name}', exist_ok=True)
                # processes.append(executor.submit(download_file, base_url, model_name, model_number, cyp450_models_dict))
                download_file(base_url, model_name, model_number, cyp450_models_dict)

    print(f'Finished loading CYP450 model files', file=sys.stdout)

load_models(cyp450_models_dict)