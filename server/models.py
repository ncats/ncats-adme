import pickle
from keras.models import load_model
from keras_self_attention import SeqSelfAttention
from chemprop.utils import load_checkpoint, load_scalers
import requests
from io import BytesIO
import sys
import tempfile
import shutil

def init():

    temp_dir = tempfile.TemporaryDirectory()
    base_url = 'https://tripod.nih.gov/pub/adme/models/rlm/'
    temp_dir_path = temp_dir.name

    try:
        global dnn_model
        # with open('./models/dnn_morgan_all_data.pkl', 'rb') as pkl_file:
        #     dnn_model = pickle.load(pkl_file)
        pkl_file_request = requests.get(f'{base_url}/dnn_morgan_all_data.pkl')
        dnn_model = pickle.load(BytesIO(pkl_file_request.content))

        global tokenizer
        # with open("./models/tokenizer.pickle",'rb') as tokfile:
        #     tokenizer = pickle.load(tokfile)
        tokfile_request = requests.get(f'{base_url}/tokenizer.pickle')
        tokenizer = pickle.load(BytesIO(tokfile_request.content))

        global lstm_model
        # lstm_model = load_model("./models/lstm_all_data.h5", custom_objects=SeqSelfAttention.get_custom_objects())
        lstm_model_request = requests.get(f'{base_url}/lstm_all_data.h5')
        lstm_model = load_model(BytesIO(lstm_model_request.content), custom_objects=SeqSelfAttention.get_custom_objects())

        global gcnn_scaler, gcnn_features_scaler
        # gcnn_scaler, gcnn_features_scaler = load_scalers('./models/gcnn_model.pt')
        gcnn_scaler_request = requests.get(f'{base_url}/gcnn_model.pt')
        with open(f'{temp_dir_path}/gcnn_model.pt', 'wb') as gcnn_scaler_file:
            gcnn_scaler_file.write(gcnn_scaler_request.content)
        gcnn_scaler, gcnn_features_scaler = load_scalers(f'{temp_dir_path}/gcnn_model.pt')

        global gcnn_model
        # gcnn_model = load_checkpoint('./models/gcnn_model.pt')
        gcnn_model_request = requests.get(f'{base_url}/gcnn_model.pt')
        with open(f'{temp_dir_path}/gcnn_model.pt', 'wb') as gcnn_model_file:
            gcnn_model_file.write(gcnn_model_request.content)
        gcnn_model = load_checkpoint(f'{temp_dir_path}/gcnn_model.pt')

        shutil.rmtree(temp_dir_path, ignore_errors=True)
    except:
        shutil.rmtree(temp_dir_path, ignore_errors=True)