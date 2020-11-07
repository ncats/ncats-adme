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

cypp450_models_dict = {
    'CYP2C9_inhib': {},
    'CYP2C9_subs': {},
    'CYP2D6_inhib': {},
    'CYP2D6_subs': {},
    'CYP3A4_inhib': {},
    'CYP3A4_subs': {}
}

# temp_dir = tempfile.TemporaryDirectory()
# base_url = 'https://tripod.nih.gov/pub/adme/models/CYPP450/'
# temp_dir_path = temp_dir.name

# try:
    # print(f'{temp_dir_path}', file=sys.stdout)
    # print(f'unzipping CYPP450 models', file=sys.stdout)
    # with zipfile.ZipFile(f'./models/CYPP450.zip', 'r') as zip_ref:
    #     zip_ref.extractall(temp_dir_path)
    # print(f'finished unzipping CYPP450 models', file=sys.stdout)

def download_file(base_url, model_name, model_number, models_dict):
    cypp450_rf_pkl_url = f'{base_url}/{model_name}/model_{model_number}'
    cypp450_rf_pkl_file_request = requests.get(cypp450_rf_pkl_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=f'{model_name}-model_{model_number}',
        total=int(cypp450_rf_pkl_file_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in cypp450_rf_pkl_file_request.iter_content(chunk_size=4096):
            fout.write(chunk)
    # model_path = os.path.join(os.getcwd(), f'{temp_dir_path}/CYPP450/{model_name}/model_{model_number}')
    # cypp450_models_dict[model_name][f'model_{model_number}'] = pickle.load(open(model_path, 'rb'))
    models_dict[model_name][f'model_{model_number}'] = pickle.load(BytesIO(cypp450_rf_pkl_file_request.content))

processes = []
with ThreadPoolExecutor() as executor:
    base_url = 'https://tripod.nih.gov/pub/adme/models/CYPP450/'
    print(f'Loading CYPP450 random forest models from {base_url}', file=sys.stdout)
    for model_name in cypp450_models_dict.keys():
        for model_number in range(0, 64):
            processes.append(executor.submit(download_file, base_url, model_name, model_number, cypp450_models_dict))
    
        
print(f'Finished loading CYPP450 model files', file=sys.stdout)
    # shutil.rmtree(temp_dir_path, ignore_errors=True)
# except:
    # shutil.rmtree(temp_dir_path, ignore_errors=True)