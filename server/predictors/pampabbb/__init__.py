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
from ..utilities.utilities import load_gcnn_model
import pandas as pd
from pickle import load

pampa_model_file_url = 'https://opendata.ncats.nih.gov/public/adme/models/current/static/pampabbb/gcnn_model.pt'
pampa_model_file_path = './models/pampabbb/gcnn_model.pt'
pampa_rdkit_desc_path = './models/pampabbb/rdkit_desc.csv'
pampa_rdkit_desc_scaler_path = './models/pampabbb/scaler.pkl'

print(f'Loading PAMPA BBB graph convolutional neural network model', file=sys.stdout)
os.makedirs('./models/pampabbb', exist_ok=True)
pampa_gcnn_scaler, pampa_gcnn_model = load_gcnn_model(pampa_model_file_path, pampa_model_file_url)
df_rdkit_desc = pd.read_csv(pampa_rdkit_desc_path, header=None)
pampa_rdkit_desc = df_rdkit_desc[0].tolist()
pampa_rdkit_desc_scaler = load(open(pampa_rdkit_desc_scaler_path, 'rb'))

del pampa_model_file_url
del pampa_model_file_path

print(f'Finished loading PAMPA BBB models', file=sys.stdout)
