import pickle
from keras.models import load_model
from keras_self_attention import SeqSelfAttention
import sys
sys.path.insert(0, './predictors/chemprop')
from chemprop.utils import load_checkpoint, load_scalers
import requests
from io import BytesIO
import tempfile
import shutil
from tqdm import tqdm
import os
from os import path

base_url = 'https://tripod.nih.gov/pub/adme/models/rlm/'
rlm_base_models_path = './models/rlm'
rlm_models_total_size = 0

# global rlm_rf_model
# with open('./models/rf_morgan_all_data.pkl', 'rb') as pkl_file:
# model = pickle.load(pkl_file)

os.makedirs(f'./models/rlm', exist_ok=True)

print(f'Loading RLM random forest model from {base_url}', file=sys.stdout)
rlm_rf_model_path = f'{rlm_base_models_path}/rf_morgan_all_data.pkl'
if path.exists(rlm_rf_model_path):
    with open(rlm_rf_model_path, 'rb') as rlm_rf_pkl_file:
        rlm_rf_model = pickle.load(rlm_rf_pkl_file)
else:
    rlm_rf_pkl_url = f'{base_url}/rf_morgan_all_data.pkl'
    rlm_rf_pkl_file_request = requests.get(rlm_rf_pkl_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=rlm_rf_pkl_url.split('/')[-1],
        total=int(rlm_rf_pkl_file_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in rlm_rf_pkl_file_request.iter_content(chunk_size=4096):
            fout.write(chunk)

    with open(rlm_rf_model_path, 'wb') as rlm_rf_pkl_file:
        rlm_rf_pkl_file.write(rlm_rf_pkl_file_request.content)
    with open(rlm_rf_model_path, 'rb') as rlm_rf_pkl_file:
        rlm_rf_model = pickle.load(rlm_rf_pkl_file)

rlm_models_total_size = rlm_models_total_size + sys.getsizeof(rlm_rf_model)
# print(f'Finished loading random forest model', file=sys.stdout)

# global rlm_dnn_model
# with open('./models/dnn_morgan_all_data.pkl', 'rb') as pkl_file:
#     dnn_model = pickle.load(pkl_file)
print(f'Loading RLM deep neural network model from {base_url}', file=sys.stdout)
rlm_dnn_model_path = f'{rlm_base_models_path}/dnn_morgan_all_data.pkl'
if path.exists(rlm_dnn_model_path):
    with open(rlm_dnn_model_path, 'rb') as rlm_dnn_pkl_file:
        rlm_dnn_model = pickle.load(rlm_dnn_pkl_file)
else:
    rlm_dnn_pkl_url = f'{base_url}/dnn_morgan_all_data.pkl'
    rlm_dnn_pkl_file_request = requests.get(rlm_dnn_pkl_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=rlm_dnn_pkl_url.split('/')[-1],
        total=int(rlm_dnn_pkl_file_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in rlm_dnn_pkl_file_request.iter_content(chunk_size=4096):
            fout.write(chunk)

    with open(rlm_dnn_model_path, 'wb') as rlm_dnn_pkl_file:
        rlm_dnn_pkl_file.write(rlm_dnn_pkl_file_request.content)
    with open(rlm_dnn_model_path, 'rb') as rlm_dnn_pkl_file:
        rlm_dnn_model = pickle.load(rlm_dnn_pkl_file)

rlm_models_total_size = rlm_models_total_size + sys.getsizeof(rlm_dnn_model)

# global rlm_tokenizer
# with open("./models/tokenizer.pickle",'rb') as tokfile:
#     tokenizer = pickle.load(tokfile)
print(f'Loading RLM long-short term memory model from {base_url}', file=sys.stdout)
rlm_dnn_tokfile_path = f'{rlm_base_models_path}/tokenizer.pickle'
if path.exists(rlm_dnn_tokfile_path):
    with open(rlm_dnn_tokfile_path, 'rb') as rlm_dnn_tok_pkl_file:
        rlm_dnn_tokenizer = pickle.load(rlm_dnn_tok_pkl_file)
else:
    rlm_dnn_tokfile_url = f'{base_url}/tokenizer.pickle'
    rlm_dnn_tokfile_request = requests.get(rlm_dnn_tokfile_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=rlm_dnn_tokfile_url.split('/')[-1],
        total=int(rlm_dnn_tokfile_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in rlm_dnn_tokfile_request.iter_content(chunk_size=4096):
            fout.write(chunk)

    with open(rlm_dnn_tokfile_path, 'wb') as rlm_dnn_tok_pkl_file:
        rlm_dnn_tok_pkl_file.write(rlm_dnn_tokfile_request.content)
    with open(rlm_dnn_tokfile_path, 'rb') as rlm_dnn_tok_pkl_file:
        rlm_dnn_tokenizer = pickle.load(rlm_dnn_tok_pkl_file)

rlm_models_total_size = rlm_models_total_size + sys.getsizeof(rlm_dnn_tokenizer)

# global rlm_lstm_model
# lstm_model = load_model("./models/lstm_all_data.h5", custom_objects=SeqSelfAttention.get_custom_objects())

rlm_lstm_model_path = f'{rlm_base_models_path}/lstm_all_data.h5'
if path.exists(rlm_lstm_model_path):
    with open(rlm_lstm_model_path, 'rb') as rlm_lstm_pkl_file:
        rlm_lstm_model = load_model(rlm_lstm_pkl_file, custom_objects=SeqSelfAttention.get_custom_objects())
else:
    rlm_lstm_model_url = f'{base_url}/lstm_all_data.h5'
    rlm_lstm_model_request = requests.get(rlm_lstm_model_url)
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=rlm_lstm_model_url.split('/')[-1],
        total=int(rlm_lstm_model_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in rlm_lstm_model_request.iter_content(chunk_size=4096):
            fout.write(chunk)

    with open(rlm_lstm_model_path, 'wb') as rlm_lstm_pkl_file:
        rlm_lstm_pkl_file.write(rlm_lstm_model_request.content)
    with open(rlm_lstm_model_path, 'rb') as rlm_lstm_pkl_file:
        rlm_lstm_model = load_model(rlm_lstm_pkl_file, custom_objects=SeqSelfAttention.get_custom_objects())

rlm_models_total_size = rlm_models_total_size + sys.getsizeof(rlm_lstm_model)

# global rlm_gcnn_scaler, rlm_gcnn_features_scaler
# gcnn_scaler, gcnn_features_scaler = load_scalers('./models/gcnn_model.pt')
print(f'Loading RLM graph convolutional neural network model from {base_url}', file=sys.stdout)
rlm_gcnn_scaler_path = f'{rlm_base_models_path}/gcnn_model.pt'
if path.exists(rlm_gcnn_scaler_path):
    rlm_gcnn_scaler, _ = load_scalers(rlm_gcnn_scaler_path)
else:
    rlm_gcnn_scaler_url = f'{base_url}/gcnn_model.pt'
    rlm_gcnn_scaler_request = requests.get(f'{base_url}/gcnn_model.pt')
    with tqdm.wrapattr(
        open(os.devnull, "wb"),
        "write",
        miniters=1,
        desc=rlm_gcnn_scaler_url.split('/')[-1],
        total=int(rlm_gcnn_scaler_request.headers.get('content-length', 0))
    ) as fout:
        for chunk in rlm_gcnn_scaler_request.iter_content(chunk_size=4096):
            fout.write(chunk)
    with open(rlm_gcnn_scaler_path, 'wb') as rlm_gcnn_scaler_file:
        rlm_gcnn_scaler_file.write(rlm_gcnn_scaler_request.content)
    rlm_gcnn_scaler, _ = load_scalers(rlm_gcnn_scaler_path)

rlm_gcnn_model = load_checkpoint(rlm_gcnn_scaler_path)

rlm_models_total_size = rlm_models_total_size + sys.getsizeof(rlm_gcnn_scaler)
rlm_models_total_size = rlm_models_total_size + sys.getsizeof(rlm_gcnn_model)
print(f'rlm_models_total_size: {rlm_models_total_size} bytes')
print(f'Finished loading RLM model files', file=sys.stdout)
