from numpy import array
from rdkit import Chem
from pandas import DataFrame
from rdkit.Chem.rdchem import Mol
from FPSim2 import FPSim2Engine
import sys
sys.path.insert(0, './predictors/chemprop')
from chemprop.utils import load_checkpoint, load_scalers
from os import path
import requests
from tqdm import tqdm
import os
import os.path as path
from chemprop.args import InterpretArgs
from chemprop.interpret import interpret
import tempfile
import time
from datetime import datetime
from rdkit.Chem import Descriptors
from rdkit.ML.Descriptors import MoleculeDescriptors
import pandas as pd
import numpy as np

def get_processed_smi(rdkit_mols: array) -> array:
    """
    Function makes necessary replacements in RDKit molecules

    Parameters:
        rdkit_mols (array): a numpy array containing RDKit molecules

    Returns:
        rdkit_mols (array): modified RDKit molecules
    """
    _rdkit_mols = rdkit_mols.copy()
    for p in range (_rdkit_mols.shape[0]):
        s = _rdkit_mols[p]
        s = s.replace("[nH]","A")
        s = s.replace("Cl","L")
        s = s.replace("Br","R")
        s = s.replace("[C@]","C")
        s = s.replace("[C@@]","C")
        s = s.replace("[C@@H]","C")
        s =[s[i:i+1] for i in range(0,len(s),1)]
        s = " ".join(s)
        _rdkit_mols[p] = s
    _rdkit_mols = _rdkit_mols.tolist()
    return _rdkit_mols

def get_kekule_smiles(mol: Mol) -> str:
    Chem.Kekulize(mol)
    kek_smi = Chem.MolToSmiles(mol,kekuleSmiles=True)
    return kek_smi

def addMolsKekuleSmilesToFrame(df: DataFrame, smi_column_name: str):

    for index, row in df.iterrows():
        mol = Chem.MolFromSmiles(row[smi_column_name])
        if mol is not None:
            Chem.Kekulize(mol)
            df.loc[index, 'mols'] = mol
            df.loc[index, 'kekule_smiles'] = Chem.MolToSmiles(mol,kekuleSmiles=True)
        else:
            df.loc[index, 'mols'] = None
            df.loc[index, 'kekule_smiles'] = None

def load_gcnn_model(model_file_path, model_file_url):
    if path.exists(model_file_path):
        gcnn_scaler, _ = load_scalers(model_file_path)
    else:
        gcnn_scaler_request = requests.get(model_file_url)
        with tqdm.wrapattr(
            open(os.devnull, "wb"),
            "write",
            miniters=1,
            desc=model_file_url.split('/')[-1],
            total=int(gcnn_scaler_request.headers.get('content-length', 0))
        ) as fout:
            for chunk in gcnn_scaler_request.iter_content(chunk_size=4096):
                fout.write(chunk)
        with open(model_file_path, 'wb') as gcnn_scaler_file:
            gcnn_scaler_file.write(gcnn_scaler_request.content)
        gcnn_scaler, _ = load_scalers(model_file_path)

    gcnn_model = load_checkpoint(model_file_path)

    return gcnn_scaler, gcnn_model

def load_gcnn_model_with_versioninfo(model_file_path, model_file_url):
    if path.exists(model_file_path):
        print('Model File Exists Locally')
        gcnn_scaler, _ = load_scalers(model_file_path)
    else:
        print('Model File Does not Exist. Downloading!')
        gcnn_scaler_request = requests.get(model_file_url, allow_redirects=True)
        with tqdm.wrapattr(
            open(os.devnull, "wb"),
            "write",
            miniters=1,
            desc=model_file_url.split('/')[-1],
            total=int(gcnn_scaler_request.headers.get('content-length', 0))
        ) as fout:
            for chunk in gcnn_scaler_request.iter_content(chunk_size=4096):
                fout.write(chunk)
        with open(model_file_path, 'wb') as gcnn_scaler_file:
            gcnn_scaler_file.write(gcnn_scaler_request.content)
        gcnn_scaler, _ = load_scalers(model_file_path)

    gcnn_model = load_checkpoint(model_file_path)

    model_timestamp = datetime.fromtimestamp(os.path.getctime(model_file_path)).strftime('%Y-%m-%d') # get model file creation timestamp

    return gcnn_scaler, gcnn_model, model_timestamp

def get_similar_mols(kekule_smiles: list, model: str):
    start = time.time()

    sim_vals = []
    fp_dict_path = ''.join(['./train_data/', model, '.h5'])
    fp_dict_path = path.abspath(path.join(os.getcwd(), fp_dict_path))
    fp_engine = FPSim2Engine(fp_dict_path)
    for smi in kekule_smiles:
        res = fp_engine.on_disk_similarity(smi, 0.01)
        sim_vals.append(res[0][1])

    end = time.time()
    print(f'{end - start} seconds to calculate Tanimoto similarity for {len(kekule_smiles)} molecules')

    return sim_vals

def get_interpretation(kekule_smiles, model):

    start = time.time()

    with tempfile.NamedTemporaryFile(delete=True) as temp:
        kekule_smiles_df = DataFrame(kekule_smiles)
        kekule_smiles_df.to_csv(temp.name + '.csv', index=None)

        # interpretation arguments
        intrprt_args = [
        '--data_path', temp.name + '.csv',
        '--checkpoint_path', './models/{}/gcnn_model.pt'.format(model),
        '--property_id', '1',
        ]

        intrprt_df = interpret(args=InterpretArgs().parse_args(intrprt_args))
    end = time.time()
    print(f'{end - start} seconds to interpret {kekule_smiles_df.shape[0]} molecules')
    return intrprt_df

# source: Pat Walters (https://github.com/PatWalters/useful_rdkit_utils)
FUNCS = {name: func for name, func in Descriptors.descList}

def apply_func(name, mol):
    """Apply an RDKit descriptor calculation to a moleucle
    :param name: descriptor name
    :param mol: RDKit molecule
    :return:
    """
    try:
        return FUNCS[name](mol)
    except:
        logging.exception("function application failed (%s->%s)", name, Chem.MolToSmiles(m))
        return None

class RDKitDescriptors:
    """ Calculate RDKit descriptors"""

    def __init__(self):
        self.desc_names = [desc_name for desc_name, _ in sorted(Descriptors.descList)]

    def calc_mol(self, mol):
        """Calculate descriptors for an RDKit molecule
        :param mol: RDKit molecule
        :return: a numpy array with descriptors
        """
        res = [apply_func(name, mol) for name in self.desc_names]
        return np.array(res, dtype=float)

    def calc_smiles(self, smiles):
        """Calculate descriptors for a SMILES string
        :param smiles: SMILES string
        :return: a numpy array with properties
        """
        mol = Chem.MolFromSmiles(smiles)
        if mol:
            return self.calc_mol(mol)
        else:
            return None

def calc_rdkit_desc_req(kekule_smiles, desc_required):
    
    rdkit_desc = RDKitDescriptors()
    df_test = pd.DataFrame(kekule_smiles, columns=['SMILES'])
    df_test['desc'] = df_test.SMILES.apply(rdkit_desc.calc_smiles)
    df_test[rdkit_desc.desc_names] = pd.DataFrame(df_test.desc.tolist(), index= df_test.index)
    rdkit_desc_list = rdkit_desc.desc_names
    desc_to_omit = list(set(rdkit_desc_list) - set(desc_required))
    df_test.drop('desc', axis=1, inplace=True)
    df_test.drop(desc_to_omit, axis=1, inplace=True)

    return df_test