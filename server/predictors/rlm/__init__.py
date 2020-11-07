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

temp_dir = tempfile.TemporaryDirectory()
base_url = 'https://tripod.nih.gov/pub/adme/models/rlm/'
temp_dir_path = temp_dir.name

try:
    # global rlm_rf_model
    # with open('./models/rf_morgan_all_data.pkl', 'rb') as pkl_file:
    # model = pickle.load(pkl_file)
    print(f'Loading RLM random forest model from {base_url}', file=sys.stdout)
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

    rlm_rf_model = pickle.load(BytesIO(rlm_rf_pkl_file_request.content))
    # print(f'Finished loading random forest model', file=sys.stdout)

    # global rlm_dnn_model
    # with open('./models/dnn_morgan_all_data.pkl', 'rb') as pkl_file:
    #     dnn_model = pickle.load(pkl_file)
    print(f'Loading RLM deep neural network model from {base_url}', file=sys.stdout)
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
    rlm_dnn_model = pickle.load(BytesIO(rlm_dnn_pkl_file_request.content))

    # global rlm_tokenizer
    # with open("./models/tokenizer.pickle",'rb') as tokfile:
    #     tokenizer = pickle.load(tokfile)
    print(f'Loading RLM long-short term memory model from {base_url}', file=sys.stdout)
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
    rlm_dnn_tokenizer = pickle.load(BytesIO(rlm_dnn_tokfile_request.content))

    # global rlm_lstm_model
    # lstm_model = load_model("./models/lstm_all_data.h5", custom_objects=SeqSelfAttention.get_custom_objects())
    
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
    rlm_lstm_model = load_model(BytesIO(rlm_lstm_model_request.content), custom_objects=SeqSelfAttention.get_custom_objects())

    # global rlm_gcnn_scaler, rlm_gcnn_features_scaler
    # gcnn_scaler, gcnn_features_scaler = load_scalers('./models/gcnn_model.pt')
    print(f'Loading RLM graph convolutional neural network model from {base_url}', file=sys.stdout)
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
    with open(f'{temp_dir_path}/gcnn_model.pt', 'wb') as gcnn_scaler_file:
        gcnn_scaler_file.write(rlm_gcnn_scaler_request.content)
    rlm_gcnn_scaler, rlm_gcnn_features_scaler = load_scalers(f'{temp_dir_path}/gcnn_model.pt')
    rlm_gcnn_model = load_checkpoint(f'{temp_dir_path}/gcnn_model.pt')
    

    print(f'Finished loading RLM model files', file=sys.stdout)
    shutil.rmtree(temp_dir_path, ignore_errors=True)
except:
    shutil.rmtree(temp_dir_path, ignore_errors=True)