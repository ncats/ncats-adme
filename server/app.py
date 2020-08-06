import flask
from flask import request, jsonify, send_from_directory, Response
import numpy as np
import pandas as pd
from rdkit import Chem, DataStructs
from rdkit.Chem import AllChem
from flask_cors import CORS
import sys
import os
from werkzeug.utils import secure_filename
from werkzeug.datastructures import ImmutableMultiDict
from consensus_model import getConsensusPredictions
from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem.Draw import rdMolDraw2D
from rdkit.Chem import rdDepictor
rdDepictor.SetPreferCoordGen(True)
from rdkit.Chem.Draw import IPythonConsole
import rdkit
from flask import send_file
import settings
settings.init()
import models
models.init()

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
    response = {}

    smiles = request.args.get('smiles')
    
    df = pd.DataFrame([[smiles]], columns=['mol'])

    columns_dict =  settings.columns_dict.copy()
    columns_dict['mol'] = { 'order': 0, 'description': 'SMILES', 'isSmilesColumn': True }

    (
        has_smi_errors,
        has_rf_errors,
        has_dnn_errors,
        has_lstm_errors,
        has_gcnn_errors,
        pred_df
    ) = getConsensusPredictions(df, 0)
    error_messages = []

    response['hasErrors'] = has_smi_errors

    if has_smi_errors:
        smi_error_message = 'We were not able to parse the structure you submitted'
        error_messages.append(smi_error_message)

    if has_rf_errors:
        rf_error_message = 'We were not able to make predictions using the random forest model'
        error_messages.append(rf_error_message)

    if has_dnn_errors:
        dnn_error_message = 'We were not able to make predictions using the deep neural networ model'
        error_messages.append(dnn_error_message)

    if has_lstm_errors:
        lstm_error_message = 'We were not able to make predictions using the long short term memory model'
        error_messages.append(lstm_error_message)

    if has_gcnn_errors:
        gcnn_error_message = 'We were not able to make predictions for some of your molecules using the graph convolutional neural network model'
        error_messages.append(gcnn_error_message)

    response['errorMessages'] = error_messages
    response['columns'] = list(pred_df.columns.values)
    response['mainColumnsDict'] = columns_dict
    response['data'] = pred_df.replace(np.nan, '', regex=True).to_dict(orient='records')
    return jsonify(response)

ALLOWED_EXTENSIONS = {'csv', 'txt', 'smi'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/v1/predict-file', methods=['POST'])
def upload_file():

    response = {}

    # check if the post request has the file part
    if 'file' not in request.files:
        response['hasErrors'] = True
        response['errorMessages'] = 'A file needs to be attached to the request'
        return jsonify(response)

    file = request.files['file']

    if file.filename == '':
        response['hasErrors'] = True
        response['errorMessages'] = 'A file with a file name needs to be attached to the request'
        return jsonify(response)
    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)
        data = dict(request.form)
        indexIdentifierColumn = int(data['indexIdentifierColumn'])

        if data['hasHeaderRow'] == 'true':
            df = pd.read_csv(file, header=0, sep=data['columnSeparator'])
        else:
            df = pd.read_csv(file, header=None, sep=data['columnSeparator'])
            column_name_mapper = {}
            for column_name in df.columns.values:
                if int(column_name) == indexIdentifierColumn:
                    column_name_mapper[column_name] = 'mol'
                else:
                    column_name_mapper[column_name] = f'col_{column_name}'
            df.rename(columns=column_name_mapper, inplace=True)

        columns_dict =  settings.columns_dict.copy()
        smi_column_name = df.columns.values[indexIdentifierColumn]
        columns_dict[smi_column_name] = { 'order': 0, 'description': 'SMILES', 'isSmilesColumn': True }

        (
            has_smi_errors,
		    has_rf_errors,
		    has_dnn_errors,
		    has_lstm_errors,
		    has_gcnn_errors,
            pred_df
        ) = getConsensusPredictions(df, indexIdentifierColumn)

        error_messages = []

        response['hasErrors'] = has_smi_errors
        print(response['hasErrors'], file=sys.stdout)
        if has_smi_errors:
            smi_error_message = 'We were not able to parse some smiles'
            error_messages.append(smi_error_message)

        if has_rf_errors:
            rf_error_message = 'We were not able to make predictions for some of your molecules using the random forest model'
            error_messages.append(rf_error_message)

        if has_dnn_errors:
            dnn_error_message = 'We were not able to make predictions for some of your molecules using the deep neural networ model'
            error_messages.append(dnn_error_message)

        if has_lstm_errors:
            lstm_error_message = 'We were not able to make predictions for some of your molecules using the long short term memory model'
            error_messages.append(lstm_error_message)

        if has_gcnn_errors:
            gcnn_error_message = 'We were not able to make predictions for some of your molecules using the graph convolutional neural network model'
            error_messages.append(gcnn_error_message)

        response['errorMessages'] = error_messages
        response['columns'] = list(pred_df.columns.values)
        response['mainColumnsDict'] = columns_dict
        response['data'] = pred_df.replace(np.nan, '', regex=True).to_dict(orient='records')
        pred_df.replace(np.nan, '', regex=True).to_json('test.json', orient='records')
        return jsonify(response)
    else:
        response['hasErrors'] = True
        response['errorMessages'] = 'Only csv, txt or smi files can be processed'
        return jsonify(response)
        
@app.route('/api/v1/structure_image/<path:smiles>', methods=['GET'])
def get_structure_image(smiles):
    try:
        diclofenac = Chem.MolFromSmiles(smiles)
        d2d = rdMolDraw2D.MolDraw2DSVG(350,300)
        d2d.DrawMolecule(diclofenac)
        d2d.FinishDrawing()
        return Response(d2d.GetDrawingText(), mimetype='image/svg+xml')
    except:
        return send_file('./images/no_image_available.png', mimetype='image/png')


@app.route('/client/<path:path>')
def send_js(path):
    print(path, file=sys.stdout)
    return send_from_directory('client', path)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def return_index(path):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run()