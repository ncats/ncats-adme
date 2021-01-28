from numpy import array
from rdkit import Chem
from pandas import DataFrame
from rdkit.Chem.rdchem import Mol
import sys
sys.path.insert(0, './predictors/chemprop')
from chemprop.utils import load_checkpoint, load_scalers
from os import path
import requests
from tqdm import tqdm
import os

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