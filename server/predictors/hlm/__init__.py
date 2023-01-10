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

hlm_model_file_url = 'https://opendata.ncats.nih.gov/public/adme/models/current/static/hlm/gcnn_model.pt'
hlm_model_file_path = './models/hlm/gcnn_model.pt'

print(f'Loading HLM graph convolutional neural network model', file=sys.stdout)
os.makedirs('./models/hlm', exist_ok=True)
hlm_gcnn_scaler, hlm_gcnn_model = load_gcnn_model(hlm_model_file_path, hlm_model_file_url)

del hlm_model_file_url
del hlm_model_file_path

print(f'Finished loading HLM models', file=sys.stdout)
