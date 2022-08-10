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
from flask import abort, send_file
from predictors.rlm.rlm_predictor import RLMPredictior
from predictors.pampa.pampa_predictor import PAMPAPredictior
from predictors.pampa50.pampa_predictor import PAMPA50Predictior
from predictors.solubility.solubility_predictor import SolubilityPredictior
from predictors.liver_cytosol.lc_predictor import LCPredictor
from predictors.cyp450.cyp450_predictor import CYP450Predictor
from predictors.utilities.utilities import addMolsKekuleSmilesToFrame
from predictors.utilities.utilities import get_similar_mols
from flask_swagger_ui import get_swaggerui_blueprint
import urllib

app = flask.Flask(__name__, static_folder ='./client')
CORS(app)
app.config["DEBUG"] = False

global root_route_path
root_route_path = os.getenv('ROOT_ROUTE_PATH', '')

global data_path
data_path = os.getenv('DATA_PATH', '')

if data_path != '' and not os.path.isfile(f'{data_path}predictions.csv'):
    pd.DataFrame(columns=['SMILES', 'model', 'prediction', 'timestamp']).to_csv(f'{data_path}predictions.csv', index=False)

# path for mounted volume will be '/data'

# flask swagger configs
SWAGGER_URL = root_route_path + '/swagger'
API_URL = root_route_path + '/client/assets/apidoc/swagger.yaml'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "ADME API"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

@app.route(f'{root_route_path}/api/v1/predict', methods=['GET'])
def predict():
    response = {}
    model_error = False
    mol_error = False
    #gcnnOpt_error = False

    # checking for input - smiles
    smiles_list = request.args.getlist('smiles')
    smiles_list = [string for string in smiles_list if string != '']
    smiles_list = [urllib.parse.unquote(string, encoding='utf-8', errors='replace') for string in smiles_list] # additional decoding step to transform any %2B to + symbols

    if not smiles_list or smiles_list == None:
        mol_error = True

    # checking for input - models
    models = request.args.getlist('model')
    if len(models) == 0 or models == None:
        model_error = True

    # checking for input - gcnnOpt
    #gcnnOpt = request.args.getlist('gcnnOpt')
    #gcnnOpt = [string for string in gcnnOpt if string != '']
    #if not gcnnOpt or gcnnOpt == None:
        #gcnnOpt_error = True

    # error handling for invalid inputs
    if mol_error == True and model_error == True:
        response['hasErrors'] = True
        response['errorMessages'] = 'Please choose at least one model and provide at least one input molecule.'
        return jsonify(response)
    elif mol_error == True and model_error == False:
        response['hasErrors'] = True
        response['errorMessages'] = 'Please provide at least one input molecule.'
        return jsonify(response)
    elif mol_error == False and model_error == True:
        response['hasErrors'] = True
        response['errorMessages'] = 'Please choose at least one model.'
        return jsonify(response)

    smi_column_name = 'smiles'
    df = pd.DataFrame([smiles_list], columns=[smi_column_name])

    try:
        response = predict_df(df, smi_column_name, models)
    except Exception as e:
        app.logger.error('Error making a prediction')
        app.logger.error(f'error type: {type(e)}')
        app.logger.error(e)
        abort(418, 'There was an unknown error.')

    try:
        json_response = jsonify(response)
    except Exception as e:
        app.logger.error('Error converting the response to JSON.')
        app.logger.error(f'response type: {type(response)}')
        app.logger.error(response)
        app.logger.error(f'error type: {type(e)}')
        app.logger.error(e)
        abort(418, 'There was an unknown error.')

    return json_response

ALLOWED_EXTENSIONS = {'csv', 'txt', 'smi'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route(f'{root_route_path}/api/v1/predict-file', methods=['POST'])
def upload_file():

    response = {}

    # check if the post request has the file part, else throw error message
    if 'file' not in request.files:
        response['hasErrors'] = True
        response['errorMessages'] = 'A file needs to be attached to the request.'
        return jsonify(response)

    file = request.files['file']

    # check if the file has a name, else throw error message
    if file.filename == '':
        response['hasErrors'] = True
        response['errorMessages'] = 'A file with a file name needs to be attached to the request.'
        return jsonify(response)

    # check if the file extension is in the allowed list of file extensions (CSV, TXT or SMI)
    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)
        data = dict(request.form)
        indexIdentifierColumn = int(data['indexIdentifierColumn'])
        models = data['model'].split(';')
        models = [string for string in models if string != '']
        #gcnnOpt = data['gcnnOpt']

        if len(models) == 0 or models == None:
            response['hasErrors'] = True
            response['errorMessages'] = 'Please choose at least one model.'
            return jsonify(response)

        if data['hasHeaderRow'] == 'true': # file has a header row
            df = pd.read_csv(file, header=0, sep=data['columnSeparator'])
        else: # file does not have a header row
            df = pd.read_csv(file, header=None, sep=data['columnSeparator'])
            column_name_mapper = {}
            for column_name in df.columns.values:
                if int(column_name) == indexIdentifierColumn:
                    column_name_mapper[column_name] = 'mol' # check if this is not the case...
                else:
                    column_name_mapper[column_name] = f'col_{column_name}'
            df.rename(columns=column_name_mapper, inplace=True)

        smi_column_name = df.columns.values[indexIdentifierColumn]

        try:
            if len(df.index) > 1000:
                response['hasErrors'] = True
                response['errorMessages'] = 'The input file contains more than 1000 rows which exceeds the limit. Please try again with a maximum of 1000 rows.'
                return jsonify(response)
            else:
                response = predict_df(df, smi_column_name, models)
        except Exception as e:
            app.logger.error('Error making a prediction.')
            app.logger.error(f'error type: {type(e)}')
            app.logger.error(e)
            abort(418, 'There was an unknown error.')

        try:
            json_response = jsonify(response)
        except Exception as e:
            app.logger.error('Error converting the response to JSON.')
            app.logger.error(f'response type: {type(response)}')
            app.logger.error(response)
            app.logger.error(f'error type: {type(e)}')
            app.logger.error(e)
            abort(418, 'There was an unknown error.')

        return json_response
    else:
        response['hasErrors'] = True
        response['errorMessages'] = 'Only csv, txt or smi files can be processed.'
        return jsonify(response)

# @app.route(f'{root_route_path}/api/v1/structure_image/<path:smiles>', methods=['GET'])
# def get_structure_image(smiles):
#     try:
#         mol = Chem.MolFromSmiles(smiles)
#         d2d = rdMolDraw2D.MolDraw2DSVG(350,300)
#         d2d.DrawMolecule(mol)
#         d2d.FinishDrawing()
#         return Response(d2d.GetDrawingText(), mimetype='image/svg+xml')
#     except:
#         return send_file('./images/no_image_available.png', mimetype='image/png')

@app.route(f'{root_route_path}/api/v1/structure_image/<path:smiles>', methods=['GET'])
def get_image(smiles):
        try:
            mol = Chem.MolFromSmiles(smiles)
            d2d = rdMolDraw2D.MolDraw2DSVG(350,300)
            d2d.DrawMolecule(mol)
            d2d.FinishDrawing()
            return Response(d2d.GetDrawingText(), mimetype='image/svg+xml')
        except:
            return send_file('./images/no_image_available.png', mimetype='image/png')


@app.route(f'{root_route_path}/api/v1/structure_image_glowing', methods=['GET'])
def get_glowing_image():
        smiles = request.args.getlist('smiles')
        smiles = [string for string in smiles if string != '']
        subs = request.args.getlist('subs')
        subs = [string for string in subs if string != '']
        print(f'Substructure: {subs}')
        if smiles and subs:
            try:
                mol = Chem.MolFromSmiles(smiles[0])
                patt = Chem.MolFromSmiles(subs[0])
                matching = mol.GetSubstructMatch(patt)
                d2d = rdMolDraw2D.MolDraw2DSVG(350,300)
                d2d.DrawMolecule(mol, highlightAtoms=matching)
                d2d.FinishDrawing()
                return Response(d2d.GetDrawingText(), mimetype='image/svg+xml')
            except:
                return send_file('./images/no_image_available.png', mimetype='image/png')
        else:
            response = {
                'error': 'Please provide at least one molecule and one substructure each in SMILES specification'
            }

            return response, 400


def predict_df(df, smi_column_name, models):

    #interpret = False
    #if gcnnOpt == 'yes':
    #    interpret = True

    response = {}
    working_df = df.copy()
    addMolsKekuleSmilesToFrame(working_df, smi_column_name)
    working_df = working_df[~working_df['mols'].isnull() & ~working_df['kekule_smiles'].isnull()]

    if len(working_df.index) == 0:
        response['hasErrors'] = True
        response['errorMessages'] = 'We were not able to parse the smiles you provided'
        return jsonify(response)

    base_models_error_message = 'We were not able to make predictions using the following model(s): '

    for model in models:
        response[model] = {}
        error_messages = []

        if model.lower() == 'rlm':
            predictor = RLMPredictior(kekule_smiles = working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
        elif model.lower() == 'pampa':
            predictor = PAMPAPredictior(kekule_smiles = working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
        elif model.lower() == 'pampa50':
            predictor = PAMPA50Predictior(kekule_smiles = working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
        elif model.lower() == 'solubility':
            predictor = SolubilityPredictior(kekule_smiles = working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
        elif model.lower() == 'hlc':
            predictor = LCPredictor(kekule_smiles = working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
        elif model.lower() == 'cyp450':
            predictor = CYP450Predictor(kekule_mols = working_df['mols'].values, smiles=working_df[smi_column_name].values)
        else:
            break

        pred_df = predictor.get_predictions()

        if data_path != '':
            predictor.record_predictions(f'{data_path}/predictions.csv')
        pred_df = working_df.join(pred_df)
        pred_df.drop(['mols', 'kekule_smiles'], axis=1, inplace=True)

        # columns not present in original df
        diff_cols = pred_df.columns.difference(df.columns)
        df_res = pred_df[diff_cols]

        #response_df = pd.merge(df, pred_df, how='inner', left_on=smi_column_name, right_on=smi_column_name)
        # making sure the response df is of the exact same length (rows) as original df
        response_df = pd.merge(df, df_res, left_index=True, right_index=True, how='inner')

        errors_dict = predictor.get_errors()
        response[model]['hasErrors'] = predictor.has_errors
        model_errors = errors_dict['model_errors']

        if len(model_errors) > 0:
            error_message = base_models_error_message + model_errors.join(', ')
            error_messages.append(error_message)

        response[model]['errorMessages'] = error_messages
        response[model]['columns'] = list(response_df.columns.values)

        columns_dict =  predictor.columns_dict()

        dict_length = len(columns_dict.keys())
        columns_dict[smi_column_name] = { 'order': 0, 'description': 'SMILES', 'isSmilesColumn': True }

        if response_df.shape[0] <= 100: # go for similarity assessment only if the response df contains 100 compounds or less

            if model.lower() != 'cyp450':
                # for all models except cyp450, calculate the nearest neigbors and add additional column to response_df
                try:
                    sim_vals = get_similar_mols(response_df[smi_column_name].values, model.lower())
                    sim_series = pd.Series(sim_vals).round(2).astype(str)
                    response_df['Tanimoto Similarity'] = sim_series.values
                    columns_dict['Tanimoto Similarity'] = { 'order': 3, 'description': 'similarity towards nearest neighbor in training data', 'isSmilesColumn': False }
                except Exception as e:
                    app.logger.error('Error calculating similarity')
                    app.logger.error(f'error type: {type(e)}')
                    app.logger.error(e)
            else:
                # for cyp450 models, a similarity value is calculated using a global dataset that is representative of all six cyp450 endpoints
                try:
                    sim_vals = get_similar_mols(response_df[smi_column_name].values, model.lower())
                    sim_series = pd.Series(sim_vals).round(2).astype(str)
                    response_df['Tanimoto Similarity'] = sim_series.values
                    columns_dict['Tanimoto Similarity'] = { 'order': 7, 'description': 'similarity towards nearest neighbor in training data that was obtained by combining the compounds from all six individual datasets', 'isSmilesColumn': False }
                except Exception as e:
                    app.logger.error('Error calculating similarity')
                    app.logger.error(f'error type: {type(e)}')
                    app.logger.error(e)

        # replace SMILES with interpret SMILES when interpretation available
        #if len(model_errors) == 0:
        #    if 'mol' in response_df.columns:
        #        response_df[smi_column_name] = response_df['mol']
        #        response_df = response_df.drop('mol', 1)
                #print(response_df.head())

        response[model]['mainColumnsDict'] = columns_dict
        response[model]['data'] = response_df.replace(np.nan, '', regex=True).to_dict(orient='records')

    return response

@app.route(f'{root_route_path}/ketcher/info', methods=['GET'])
def ketcher_info():
    response = {
        "imago_versions": [],
        "indigo_version": "N/A",
    }

    return jsonify(response)

@app.route(f'{root_route_path}/ketcher/indigo/layout', methods=['POST'])
def ketcher_layout():

    mol = Chem.MolFromSmiles(request.json['struct'])

    if mol is None:
        mol = Chem.MolFromMolBlock(request.json['struct'])

    if mol is not None:

        if 'output_format' in request.json.keys():
            output_format = request.json['output_format']
        else:
            output_format = 'chemical/x-mdl-molfile'

        response = {
            'format': output_format,
            'struct': Chem.MolToMolBlock(mol)
        }
        return response
    else:
        response = {
            'error': 'Please provide valid SMILES or molfile'
        }
        return response, 400

@app.route(f'{root_route_path}/ketcher/indigo/clean', methods=['POST'])
def ketcher_clean():

    mol = Chem.MolFromMolBlock(request.json['struct'])

    if mol is not None:

        output_format = 'chemical/x-mdl-molfile'
        Chem.Cleanup(mol)
        response = {
            'format': output_format,
            'struct': Chem.MolToMolBlock(mol)
        }

        return response
    else:
        response = {
            'error': 'Please provide valid structures'
        }
        return response, 400

@app.route(f'{root_route_path}/ketcher/indigo/aromatize', methods=['POST'])
def ketcher_aromatize():

    mol = Chem.MolFromMolBlock(request.json['struct'])

    if mol is not None:

        output_format = 'chemical/x-mdl-molfile'
        Chem.SanitizeMol(mol)
        response = {
            'format': output_format,
            'struct': Chem.MolToMolBlock(mol)
        }

        return response
    else:
        response = {
            'error': 'Please provide valid structures'
        }
        return response, 400

@app.route(f'{root_route_path}/ketcher/indigo/dearomatize', methods=['POST'])
def ketcher_dearomatize():

    mol = Chem.MolFromMolBlock(request.json['struct'])

    if mol is not None:

        output_format = 'chemical/x-mdl-molfile'
        Chem.Kekulize(mol)
        response = {
            'format': output_format,
            'struct': Chem.MolToMolBlock(mol)
        }

        return response
    else:
        response = {
            'error': 'Please provide valid structures'
        }
        return response, 400

@app.route(f'{root_route_path}/ketcher/indigo/calculate_cip', methods=['POST'])
def ketcher_calculate_cip():
    response = {
        'error': 'This feature is not supported at the moment'
    }
    return response, 501

@app.route(f'{root_route_path}/ketcher/indigo/check', methods=['POST'])
def ketcher_chek():
    response = {
        'error': 'This feature is not supported at the moment'
    }
    return response, 501

@app.route(f'{root_route_path}/ketcher/indigo/calculate', methods=['POST'])
def ketcher_calculate():
    response = {
        'error': 'This feature is not supported at the moment'
    }
    return response, 501

@app.route(f'{root_route_path}/ketcher/imago/uploads', methods=['POST'])
def ketcher_uploads():
    response = {
        'error': 'This feature is not supported at the moment'
    }
    return response, 501

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
    app.run(host='0.0.0.0')
