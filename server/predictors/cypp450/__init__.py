import warnings
warnings.filterwarnings("ignore")
import os, sys
import numpy as np
import pandas as pd
import pickle

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
