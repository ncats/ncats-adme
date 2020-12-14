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
from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem.Draw import rdMolDraw2D
from rdkit.Chem import rdDepictor
rdDepictor.SetPreferCoordGen(True)
from rdkit.Chem.Draw import IPythonConsole
import rdkit
from flask import send_file
from predictors.rlm.rlm_predictor import RLMPredictior
from predictors.cyp450.cyp450_predictor import CYP450Predictor


app = flask.Flask(__name__, static_folder ='./client')
CORS(app)
app.config["DEBUG"] = False

global root_route_path
root_route_path = os.getenv('ROOT_ROUTE_PATH', '')

@app.route(f'{root_route_path}/api/v1/predict', methods=['GET'])
def predict():
    response = {}
    smiles = request.args.get('smiles')
    models = request.args.getlist('model')
    base_models_error_message = 'We were not able to make predictions using the following model(s): '

    morgan_fp_matrix = None
    
    for model in models:
        response[model] = {}
        df = pd.DataFrame([[smiles]], columns=['mol'])
        error_messages = []

        if model.lower() == 'rlm':
            predictor = RLMPredictior(df, 0, morgan_fp_matrix)
        elif model.lower() == 'cyp450':
            predictor = CYP450Predictor(df, 0, morgan_fp_matrix)
        
        pred_df = predictor.get_predictions()
        if morgan_fp_matrix is None:
            morgan_fp_matrix = predictor.morgan_fp_matrix
        
        errors_dict = predictor.get_errors()
        response[model]['hasErrors'] = predictor.has_errors
        model_errors = errors_dict['model_errors']

        if errors_dict['has_smi_errors']:
            smi_error_message = 'We were not able to parse the structure you submitted'
            error_messages.append(smi_error_message)

        if len(model_errors) > 0:
            error_message = base_models_error_message + model_errors.join(', ')
            error_messages.append(error_message)

        response[model]['errorMessages'] = error_messages
        response[model]['columns'] = list(pred_df.columns.values)

        columns_dict =  predictor.columns_dict()
        dict_length = len(columns_dict.keys())
        columns_dict['mol'] = { 'order': 0, 'description': 'SMILES', 'isSmilesColumn': True }
        response[model]['mainColumnsDict'] = columns_dict
        response[model]['data'] = pred_df.replace(np.nan, '', regex=True).to_dict(orient='records')
    return jsonify(response)

ALLOWED_EXTENSIONS = {'csv', 'txt', 'smi'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route(f'{root_route_path}/api/v1/predict-file', methods=['POST'])
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
        models = data['models'].split(';')
        base_models_error_message = 'We were not able to make predictions on some of your molecules using the following model(s): '

        morgan_fp_matrix = None

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

        for model in models:
            response[model] = {}
            error_messages = []

            if model.lower() == 'rlm':
                predictor = RLMPredictior(df, indexIdentifierColumn, morgan_fp_matrix)
            elif model.lower() == 'cyp450':
                predictor = CYP450Predictor(df, indexIdentifierColumn, morgan_fp_matrix)

            pred_df = predictor.get_predictions()

            if morgan_fp_matrix is None:
                morgan_fp_matrix = predictor.morgan_fp_matrix
            
            errors_dict = predictor.get_errors()
            response[model]['hasErrors'] = predictor.has_errors
            model_errors = errors_dict['model_errors']
    
            if errors_dict['has_smi_errors']:
                smi_error_message = 'We were not able to parse some of the structure you submitted'
                error_messages.append(smi_error_message)

            if len(model_errors) > 0:
                error_message = base_models_error_message + model_errors.join(', ')
                error_messages.append(error_message)

            response[model]['errorMessages'] = error_messages
            response[model]['columns'] = list(pred_df.columns.values)

            columns_dict =  predictor.columns_dict()
            dict_length = len(columns_dict.keys())
            smi_column_name = df.columns.values[indexIdentifierColumn]
            columns_dict[smi_column_name] = { 'order': 0, 'description': 'SMILES', 'isSmilesColumn': True }
            response[model]['mainColumnsDict'] = columns_dict
            response[model]['data'] = pred_df.replace(np.nan, '', regex=True).to_dict(orient='records')

        return jsonify(response)
    else:
        response['hasErrors'] = True
        response['errorMessages'] = 'Only csv, txt or smi files can be processed'
        return jsonify(response)
        
@app.route(f'{root_route_path}/api/v1/structure_image/<path:smiles>', methods=['GET'])
def get_structure_image(smiles):
    try:
        diclofenac = Chem.MolFromSmiles(smiles)
        d2d = rdMolDraw2D.MolDraw2DSVG(350,300)
        d2d.DrawMolecule(diclofenac)
        d2d.FinishDrawing()
        return Response(d2d.GetDrawingText(), mimetype='image/svg+xml')
    except:
        return send_file('./images/no_image_available.png', mimetype='image/png')


@app.route(f'{root_route_path}/client/<path:path>')
def send_js(path):
    print(path, file=sys.stdout)
    return send_from_directory('client', path)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def return_index(path):
    print(path, file=sys.stdout)
    return app.send_static_file('index.html')

if __name__ == "__main__":
    from multiprocessing import set_start_method
    set_start_method('forkserver')
    app.run()