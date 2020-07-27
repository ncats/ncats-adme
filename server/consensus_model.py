import numpy as np
import pandas as pd
import pickle
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Model, load_model
from keras_self_attention import SeqSelfAttention
import tensorflow as tf
from rdkit import Chem, DataStructs
from rdkit.Chem import AllChem
import pickle
import warnings
warnings.filterwarnings('ignore')
import sys
sys.path.insert(0, './chemprop')
from chemprop.data.utils import get_data, get_data_from_smiles
from chemprop.data import MoleculeDataLoader, MoleculeDataset
from chemprop.train import predict
from chemprop.utils import load_checkpoint, load_scalers
from rdkit.Chem import PandasTools
import random
import string

# global graph
# graph = tf.compat.v1.get_default_graph()

global dnn_model
with open('./models/dnn_morgan_all_data.pkl', 'rb') as pkl_file:
	dnn_model = pickle.load(pkl_file)

global tokenizer
with open("./models/tokenizer.pickle",'rb') as tokfile:
	tokenizer = pickle.load(tokfile)

global lstm_model
lstm_model = load_model("./models/lstm_all_data.h5", custom_objects=SeqSelfAttention.get_custom_objects())

global gcnn_scaler, gcnn_features_scaler
gcnn_scaler, gcnn_features_scaler = load_scalers('./models/gcnn_model.pt')

global gcnn_model
gcnn_model = load_checkpoint('./models/gcnn_model.pt')

def Get_MorganFP(mol):
    """
    Returns the RDKit Morgan fingerprint for a molecule.
    """
    info = {}
    arr = np.zeros((1,))
    fp = AllChem.GetMorganFingerprintAsBitVect(mol, 2, nBits=1024, useFeatures=False, bitInfo=info)
    DataStructs.ConvertToNumpyArray(fp, arr)
    arr = np.array([len(info[x]) if x in info else 0 for x in range(1024)])
    return arr

def Average(lst):
	return sum(lst) / len(lst)

def Get_ClassLabel(y_pred_prob):
	if y_pred_prob >= 0.7:
		return 'Highly Unstable'
	elif ((y_pred_prob < 0.7) and (y_pred_prob >= 0.5)):
		return 'Unstable'
	else:
		return 'Stable'

def get_morgan_features(test_df, smi_column_name):
	morgan_cols = [ 'morgan_'+str(i) for i in range(1024) ]
	for index, row in test_df.iterrows():
		# change this to column index of smiles
		smi = row[smi_column_name]
		mol = Chem.MolFromSmiles(smi)
		fp = Get_MorganFP(mol)
		fpl = fp.tolist()
		fps = ','.join(str(e) for e in fpl)
		test_df.at[index,'morganfp'] = fps

	morgan_df = pd.DataFrame(test_df['morganfp'].str.split(',', expand=True).values, columns=morgan_cols)
	return morgan_df.iloc[:,0:].values


def get_processed_smi(X_test):
	for p in range (X_test.shape[0]):
		s = X_test[p]
		s = s.replace("[nH]","A")
		s = s.replace("Cl","L")
		s = s.replace("Br","R")
		s = s.replace("[C@]","C")
		s = s.replace("[C@@]","C")
		s = s.replace("[C@@H]","C")
		s =[s[i:i+1] for i in range(0,len(s),1)]
		s = " ".join(s)
		X_test[p] = s
	#X_test = X_test[:,0]
	X_test = X_test.tolist()
	return X_test

def get_random_string(length):
	letters = string.ascii_letters
	result_str = ''.join(random.choice(letters) for i in range(length))
	return result_str

def getRfPredictions(X_morgan):
	with open('./models/rf_morgan_all_data.pkl', 'rb') as pkl_file:
		model = pickle.load(pkl_file)
	y_pred = model.predict(X_morgan)
	y_pred_prob = model.predict_proba(X_morgan).T[1]
	return y_pred, y_pred_prob

def getDnnPredictions(X_morgan):
	predictions = dnn_model.predict(X_morgan)
	y_pred_labels = np.array(predictions).ravel()
	labels = y_pred_labels.round(0).astype(int)
	predictions = np.array(predictions).ravel()
	return predictions, labels

def getLstmPredictions(X_smi_list):
	max_len = 100
	X_smi = get_processed_smi(X_smi_list)
	X_smi = tokenizer.texts_to_sequences(X_smi)
	X_smi = pad_sequences(X_smi, maxlen=max_len, padding='post')

	predictions = lstm_model.predict(X_smi)
	y_pred_labels = np.array(predictions).ravel()
	labels = y_pred_labels.round(0).astype(int)
	predictions = np.array(predictions).ravel()

	return predictions, labels

def getGcnnPredictions(smiles):
	full_data = get_data_from_smiles(smiles=smiles, skip_invalid_smiles=False)
	full_to_valid_indices = {}
	valid_index = 0
	for full_index in range(len(full_data)):
		if full_data[full_index].mol is not None:
			full_to_valid_indices[full_index] = valid_index
			valid_index += 1

	test_data = MoleculeDataset([full_data[i] for i in sorted(full_to_valid_indices.keys())])

	# create data loader
	test_data_loader = MoleculeDataLoader(
		dataset=test_data,
		batch_size=50,
		num_workers=8
	)

	model_preds = predict(
		model=gcnn_model,
		data_loader=test_data_loader,
		scaler=gcnn_scaler
	)
	predictions = np.ma.empty(len(full_data))
	predictions.mask = True
	labels = np.ma.empty(len(full_data))
	labels.mask = True
	for key in full_to_valid_indices.keys():
		full_index = int(key)
		predictions[full_index] = model_preds[full_to_valid_indices[key]][0]
		labels[full_index] = int(round(model_preds[full_to_valid_indices[key]][0]))

	return predictions, labels

def get_kekule_smiles(mol):
	Chem.Kekulize(mol)
	kek_smi = Chem.MolToSmiles(mol,kekuleSmiles=True)
	return kek_smi



# get consensus predictions

def getConsensusPredictions(df, indexIdentifierColumn):


	columns = [
		'rnd_forest',
		'neural_net',
		'long_short_term_mem',
		'graph_conv_neural_net',
		'consensus'
	]
	
	smi_series = df.iloc[:, indexIdentifierColumn]
	smi_column_name = smi_series.name
	smi_df = pd.DataFrame(columns=columns)
	smi_df.insert(0, smi_column_name, smi_series)

	mol_column_name = get_random_string(10)


	PandasTools.AddMoleculeColumnToFrame(smi_df, smi_column_name, mol_column_name, includeFingerprints=False)
	smi_df = smi_df[~smi_df[mol_column_name].isnull()] # this step omits mols for which smiles could not be parsed
	smi_df[mol_column_name]=smi_df[mol_column_name].apply(get_kekule_smiles)

	has_smi_errors = len(df.index) > len(smi_df.index)
	has_rf_errors = False
	has_dnn_errors = False
	has_lstm_errors = False
	has_gcnn_errors = False

	if len(smi_df.index) > 0:
		X_morgan = get_morgan_features(smi_df.copy(), mol_column_name)

		# change column to where smiles are located
		X_smi = smi_df[mol_column_name].values

		rf_y_pred, rf_y_pred_prob = getRfPredictions(X_morgan)
		smi_df['rnd_forest'] = pd.Series(pd.Series(rf_y_pred).astype(str) + ' (' + pd.Series(rf_y_pred_prob).round(2).astype(str) + ')')
		has_rf_errors = len(smi_df.index) > len(rf_y_pred_prob)

		dnn_predictions, dnn_labels = getDnnPredictions(X_morgan)
		smi_df['neural_net'] = pd.Series(pd.Series(dnn_labels).astype(str) + ' (' + pd.Series(dnn_predictions).round(2).astype(str) + ')')
		has_dnn_errors = len(smi_df.index) > len(dnn_predictions)

		lstm_predictions, lstm_labels = getLstmPredictions(X_smi)
		smi_df['long_short_term_mem'] = pd.Series(pd.Series(lstm_labels).astype(str) + ' (' + pd.Series(lstm_predictions).round(2).astype(str) + ')')
		has_lstm_errors = len(smi_df.index) > len(lstm_predictions)

		gcnn_predictions, gcnn_labels = getGcnnPredictions(smi_df[mol_column_name].tolist())
		smi_df['graph_conv_neural_net'] = pd.Series(pd.Series(gcnn_labels).fillna('').astype(str) + ' (' + pd.Series(gcnn_predictions).round(2).astype(str) + ')').str.replace('(nan)', '', regex=False)
		has_gcnn_errors = len(smi_df.index) > len(gcnn_predictions) or np.ma.count_masked(gcnn_predictions) > 0

		matrix = np.ma.empty((4, max(rf_y_pred_prob.shape[0], dnn_predictions.shape[0], lstm_predictions.shape[0], gcnn_predictions.shape[0])))
		matrix.mask = True
		matrix[0, :rf_y_pred_prob.shape[0]] = rf_y_pred_prob
		matrix[1, :dnn_predictions.shape[0]] = dnn_predictions
		matrix[2, :lstm_predictions.shape[0]] = lstm_predictions
		matrix[3, :gcnn_predictions.shape[0]] = gcnn_predictions

		consensus_pred_prob = matrix.mean(axis=0)
		smi_df['consensus'] = pd.Series(
			pd.Series(np.where(consensus_pred_prob>=0.5, 1, 0)).round(2).astype(str)
			+' ('
			+pd.Series(consensus_pred_prob).round(2).astype(str)
			+')'
		)

	smi_df.drop([mol_column_name], axis=1, inplace=True)
	
	return (
		has_smi_errors,
		has_rf_errors,
		has_dnn_errors,
		has_lstm_errors,
		has_gcnn_errors,
		df.merge(smi_df, on=smi_column_name, how='left')
	)
