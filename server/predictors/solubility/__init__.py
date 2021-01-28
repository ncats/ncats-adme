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
from ..utilities.utilities import load_gcnn_model

solubility_model_file_url = 'https://tripod.nih.gov/pub/adme/models/solubility/gcnn_model.pt'
solubility_model_file_path = './models/solubility/gcnn_model.pt'

print(f'Loading PAMPA graph convolutional neural network model', file=sys.stdout)
os.makedirs('./models/solubility', exist_ok=True)
solubility_gcnn_scaler, solubility_gcnn_model = load_gcnn_model(solubility_model_file_path, solubility_model_file_url)

del solubility_model_file_url
del solubility_model_file_path

print(f'Finished loading PAMPA models', file=sys.stdout)
