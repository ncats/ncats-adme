import json as json_module
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
import rdkit
from flask import abort, send_file
from predictors.rlm.rlm_predictor import RLMPredictior
from predictors.hlm.hlm_predictor import HLMPredictior
from predictors.pampa.pampa_predictor import PAMPAPredictior
from predictors.pampa50.pampa_predictor import PAMPA50Predictior
from predictors.pampabbb.pampa_predictor import PAMPABBBPredictior
from predictors.solubility.solubility_predictor import SolubilityPredictior
# Cytosol stability models (TensorFlow DNNs via scikeras)
from predictors.liver_cytosol.lc_predictor import LCPredictor
from predictors.liver_cytosol import get_hlc_status, start_hlc_loading, wait_for_hlc
from predictors.mlc.mlc_predictor import MLCPredictor
from predictors.mlc import get_mlc_status, start_mlc_loading
from predictors.rlc.rlc_predictor import RLCPredictor
from predictors.rlc import get_rlc_status
import threading
# CYP450 models (sklearn Random Forest)
from predictors.cyp450.cyp450_predictor import CYP450Predictor
from predictors.utilities.utilities import addMolsKekuleSmilesToFrame
from flask_swagger_ui import get_swaggerui_blueprint
import urllib
from healthcheck import HealthCheck, EnvironmentDump

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

# Models that benefit from batching due to expensive feature generation or many sub-models
BATCH_MODELS = {'cyp450', 'hlc', 'mlc', 'rlc'}
BATCH_SIZE = 100


def _create_predictor(model_name, working_df, smi_column_name):
    """Create a predictor instance for a given model name."""
    m = model_name.lower()
    if m == 'hlm':
        return HLMPredictior(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'rlm':
        return RLMPredictior(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'pampa':
        return PAMPAPredictior(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'pampa50':
        return PAMPA50Predictior(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'pampabbb':
        return PAMPABBBPredictior(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'solubility':
        return SolubilityPredictior(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'hlc':
        return LCPredictor(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'mlc':
        return MLCPredictor(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'rlc':
        return RLCPredictor(kekule_smiles=working_df['kekule_smiles'].values, smiles=working_df[smi_column_name].values)
    elif m == 'cyp450':
        return CYP450Predictor(kekule_mols=working_df['mols'].values, smiles=working_df[smi_column_name].values)
    else:
        return None


def predict_df(df, smi_column_name, models):

    response = {}
    working_df = df.copy()
    addMolsKekuleSmilesToFrame(working_df, smi_column_name)
    working_df = working_df[~working_df['mols'].isnull() & ~working_df['kekule_smiles'].isnull()]

    if len(working_df.index) == 0:
        response['hasErrors'] = True
        response['errorMessages'] = 'We were not able to parse the smiles you provided'
        return response

    base_models_error_message = 'We were not able to make predictions using the following model(s): '

    print(f'Models to be predicted: {models}')

    for model in models:
        response[model] = {}
        error_messages = []

        try:
            use_batching = model.lower() in BATCH_MODELS and len(working_df) > BATCH_SIZE

            if use_batching:
                # Process in batches for slow models
                print(f'{model}: Using batched processing ({BATCH_SIZE} per batch) for {len(working_df)} molecules')
                batch_pred_dfs = []
                batch_has_errors = False
                batch_model_errors = []
                last_predictor = None

                for start in range(0, len(working_df), BATCH_SIZE):
                    end = min(start + BATCH_SIZE, len(working_df))
                    chunk = working_df.iloc[start:end].copy()
                    chunk = chunk.reset_index(drop=True)
                    print(f'{model}: Processing batch {start//BATCH_SIZE + 1} (rows {start}-{end})', flush=True)

                    predictor = _create_predictor(model, chunk, smi_column_name)
                    if predictor is None:
                        break
                    batch_df = predictor.get_predictions()
                    batch_pred_dfs.append(batch_df)
                    last_predictor = predictor

                    if predictor.has_errors:
                        batch_has_errors = True
                        batch_model_errors.extend(predictor.get_errors()['model_errors'])

                if not batch_pred_dfs or last_predictor is None:
                    continue

                pred_df = pd.concat(batch_pred_dfs, ignore_index=True)

                # Use last_predictor for metadata (columns_dict, etc.)
                predictor = last_predictor
                predictor.has_errors = batch_has_errors
                predictor.model_errors = batch_model_errors
            else:
                # Non-batched: process all at once
                predictor = _create_predictor(model, working_df, smi_column_name)
                if predictor is None:
                    continue
                pred_df = predictor.get_predictions()

            pred_df = working_df.reset_index(drop=True).join(pred_df)
            pred_df.drop(['mols', 'kekule_smiles'], axis=1, inplace=True)

            # columns not present in original df
            diff_cols = pred_df.columns.difference(df.columns)
            df_res = pred_df[diff_cols]

            # making sure the response df is of the exact same length (rows) as original df
            response_df = pd.merge(df.reset_index(drop=True), df_res, left_index=True, right_index=True, how='inner')

            errors_dict = predictor.get_errors()
            response[model]['hasErrors'] = predictor.has_errors
            model_errors = errors_dict['model_errors']

            if len(model_errors) > 0:
                error_message = base_models_error_message + ', '.join(model_errors)
                error_messages.append(error_message)

            response[model]['errorMessages'] = error_messages
            response[model]['columns'] = list(response_df.columns.values)

            columns_dict = predictor.columns_dict()
            columns_dict[smi_column_name] = { 'order': 0, 'description': 'SMILES', 'isSmilesColumn': True }

            response[model]['mainColumnsDict'] = columns_dict
            response[model]['data'] = response_df.replace(np.nan, '', regex=True).to_dict(orient='records')
            if model.lower() in ['rlm', 'pampa', 'solubility']:
                response[model]['model_version'] = predictor.get_model_version()

            if data_path != '':
                predictor.record_predictions(f'{data_path}/predictions.csv')

        except Exception as e:
            print(f'ERROR processing model {model}: {e}', flush=True)
            import traceback
            traceback.print_exc()
            response[model]['hasErrors'] = True
            response[model]['errorMessages'] = [f'Error processing {model}: {str(e)}']
            response[model]['data'] = []
            response[model]['columns'] = []
            response[model]['mainColumnsDict'] = {}
            # Continue to next model instead of aborting
            continue

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
    return send_from_directory('client', path)

@app.route(f'{root_route_path}/assets/data/config.json')
def serve_config():
    """Serve client config with apiBaseUrl derived from ROOT_ROUTE_PATH."""
    config_path = os.path.join(app.static_folder, 'assets', 'data', 'config.json')
    try:
        with open(config_path) as f:
            config = json_module.load(f)
    except Exception:
        config = {}
    config['apiBaseUrl'] = root_route_path + '/' if root_route_path else '/'
    return jsonify(config)

@app.route(f'{root_route_path}/', defaults={'path': ''})
@app.route(f'{root_route_path}/<path:path>')
def return_index(path):
    if path and '.' in path.split('/')[-1]:
        try:
            return send_from_directory('client', path)
        except Exception:
            pass
    # Serve index.html with the base href rewritten to match the deployment path
    index_path = os.path.join(app.static_folder, 'index.html')
    with open(index_path) as f:
        content = f.read()
    if root_route_path:
        content = content.replace('<base href="/">', f'<base href="{root_route_path}/">')
    return Response(content, mimetype='text/html')


# app and API health check
health = HealthCheck()

def api_available():
    # nothing needed here. if the API is up this will return True
    return True, "API is available"

health.add_check(api_available)

# Model loading status endpoint
@app.route(f'{root_route_path}/api/model-status', methods=['GET'])
def get_model_status():
    """Get the loading status of lazy-loaded models."""
    return jsonify({
        'models': [
            get_hlc_status(),
            get_mlc_status(),
            get_rlc_status()
        ]
    })

@app.route(f'{root_route_path}/api/model-status/<model_name>', methods=['GET'])
def get_specific_model_status(model_name):
    """Get the loading status of a specific model."""
    model_name = model_name.lower()
    if model_name == 'hlc':
        return jsonify(get_hlc_status())
    elif model_name == 'mlc':
        return jsonify(get_mlc_status())
    elif model_name == 'rlc':
        return jsonify(get_rlc_status())
    else:
        return jsonify({'error': f'Model {model_name} not found'}), 404

# Add a flask route to expose information
app.add_url_rule("/healthcheck", "healthcheck", view_func=lambda: health.run())


def _load_large_models_sequentially():
    """Load HLC and MLC models sequentially in background to avoid resource contention."""
    print('Starting sequential loading of large models (HLC -> MLC)', file=sys.stdout)
    sys.stdout.flush()
    start_hlc_loading()
    wait_for_hlc()
    start_mlc_loading()
    print('Sequential model loading initiated (HLC -> MLC)', file=sys.stdout)
    sys.stdout.flush()

# Start background loading of large models
threading.Thread(target=_load_large_models_sequentially, daemon=True).start()
print('All eager models loaded. HLC/MLC loading in background.', file=sys.stdout)
sys.stdout.flush()


if __name__ == "__main__":
    app.run(host='0.0.0.0')
