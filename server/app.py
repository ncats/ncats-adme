import flask
from flask import request, jsonify, send_from_directory
import numpy as np
import pandas as pd
from rdkit import Chem, DataStructs
from rdkit.Chem import AllChem
import pickle
from flask_cors import CORS
import sys
import os
from werkzeug.utils import secure_filename
from werkzeug.datastructures import ImmutableMultiDict
from consensus_model import getConsensusPredictions
import tensorflow as tf

app = flask.Flask(__name__, static_folder ='./client')
CORS(app)
app.config["DEBUG"] = True

def get_morgan_fp(mol):
    """
    Returns the RDKit Morgan fingerprint for a molecule.
    """
    info = {}
    arr = np.zeros((1,))
    fp = AllChem.GetMorganFingerprintAsBitVect(mol, 2, nBits=1024, useFeatures=False, bitInfo=info)
    DataStructs.ConvertToNumpyArray(fp, arr)
    arr = np.array([len(info[x]) if x in info else 0 for x in range(1024)])

    return arr

def get_prediction(smi, model):
    """
    Returns predictions for a given input smiles but needs a model object as argument.
    """
    mol = Chem.MolFromSmiles(smi)
    fp = get_morgan_fp(mol)
    fp1 = np.reshape(fp, (1, -1)) # converting into 2d array
    y_pred = model.predict(fp1)
    y_pred_prob = model.predict_proba(fp1).T[1]
    y_pred_prob = y_pred_prob.ravel()
    y_pred_prob = np.round(y_pred_prob, 2)
    
    return y_pred, y_pred_prob


@app.route('/api/v1/predict', methods=['GET'])
def predict():
    pkl_file = open('./models/random_forest_2019.pkl', 'rb')
    model = pickle.load(pkl_file)
    smiles = request.args.get('smiles')
    y_pred, y_pred_prob = get_prediction(smiles, model)
    return f'{y_pred_prob}'

ALLOWED_EXTENSIONS = {'csv', 'txt', 'smi'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/v1/predict-file', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        data = dict(request.form)
        # if data['hasHeaderRow'] == 'true':
        #     header = 0
        # else:
        #     header = None
        df = pd.read_csv(file)
        pred_df = getConsensusPredictions(df, int(data['indexIdentifierColumn']))
        print(pred_df.head(), file=sys.stdout)
        return pred_df.to_json(orient='records')

    return ''
        

@app.route('/client/<path:path>')
def send_js(path):
    print(path, file=sys.stdout)
    return send_from_directory('client', path)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def return_index(path):
    return app.send_static_file('index.html')

app.run()