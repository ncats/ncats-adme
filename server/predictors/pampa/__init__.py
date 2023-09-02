import pickle
# from keras.models import load_model
# from keras_self_attention import SeqSelfAttention
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
from ..utilities.utilities import load_gcnn_model_with_versioninfo

pampa_model_file_url = 'https://opendata.ncats.nih.gov/public/adme/models/current/biweekly/pampa/gcnn_model.pt'
pampa_model_file_path = './models/pampa/gcnn_model.pt'

print(f'Loading PAMPA graph convolutional neural network model', file=sys.stdout)
os.makedirs('./models/pampa', exist_ok=True)
#pampa_gcnn_scaler, pampa_gcnn_model = load_gcnn_model(pampa_model_file_path, pampa_model_file_url)
pampa_gcnn_scaler, pampa_gcnn_model, pampa_gcnn_model_version = load_gcnn_model_with_versioninfo(pampa_model_file_path, pampa_model_file_url)

del pampa_model_file_url
del pampa_model_file_path

print(f'Finished loading PAMPA 7.4 models', file=sys.stdout)
