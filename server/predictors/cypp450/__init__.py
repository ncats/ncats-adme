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

for model_name in cypp450_models_dict.keys():
    for model_number in range(0, 64):
        model_path = os.path.join(os.getcwd(), f'models/CYPP450/{model_name}/model_{model_number}')
        cypp450_models_dict[model_name][f'model_{model_number}'] = pickle.load(open(model_path, 'rb'))

# def download_file(base_url, model_name, model_number, models_dict):
#     cypp450_rf_pkl_url = f'{base_url}/{model_name}/model_{model_number}'
#     cypp450_rf_pkl_file_request = requests.get(cypp450_rf_pkl_url)
#     with tqdm.wrapattr(
#         open(os.devnull, "wb"),
#         "write",
#         miniters=1,
#         desc=f'{model_name}-model_{model_number}',
#         total=int(cypp450_rf_pkl_file_request.headers.get('content-length', 0))
#     ) as fout:
#         for chunk in cypp450_rf_pkl_file_request.iter_content(chunk_size=4096):
#             fout.write(chunk)
#     models_dict[model_name][f'model_{model_number}'] = pickle.load(BytesIO(cypp450_rf_pkl_file_request.content))

# processes = []
# with ThreadPoolExecutor() as executor:
#     base_url = 'https://tripod.nih.gov/pub/adme/models/CYPP450/'
#     print(f'Loading CYPP450 random forest models from {base_url}', file=sys.stdout)
#     for model_name in cypp450_models_dict.keys():
#         for model_number in range(0, 64):
#             processes.append(executor.submit(download_file, base_url, model_name, model_number, cypp450_models_dict))
    
        
print(f'Finished loading CYPP450 model files', file=sys.stdout)