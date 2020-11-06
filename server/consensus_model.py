import numpy as np
import pandas as pd
import pickle
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from rdkit import Chem
import warnings
warnings.filterwarnings('ignore')
import sys
sys.path.insert(0, './predictors/chemprop')
from chemprop.data.utils import get_data, get_data_from_smiles
from chemprop.data import MoleculeDataLoader, MoleculeDataset
from chemprop.train import predict
from rdkit.Chem import PandasTools
import random
import string
import settings
import models
from predictors.features.morgan_fp import MorganFPGenerator
from predictors.rlm.rlm_predictor import RLMPredictior

def Average(lst):
	return sum(lst) / len(lst)

def Get_ClassLabel(y_pred_prob):
	if y_pred_prob >= 0.7:
		return 'Highly Unstable'
	elif ((y_pred_prob < 0.7) and (y_pred_prob >= 0.5)):
		return 'Unstable'
	else:
		return 'Stable'

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
	y_pred = models.rf_model.predict(X_morgan)
	y_pred_prob = models.rf_model.predict_proba(X_morgan).T[1]
	return y_pred, y_pred_prob

def getDnnPredictions(X_morgan):
	predictions = models.dnn_model.predict(X_morgan)
	y_pred_labels = np.array(predictions).ravel()
	labels = y_pred_labels.round(0).astype(int)
	predictions = np.array(predictions).ravel()
	return predictions, labels

def getLstmPredictions(X_smi_list):
	max_len = 100
	X_smi = get_processed_smi(X_smi_list)
	X_smi = models.tokenizer.texts_to_sequences(X_smi)
	X_smi = pad_sequences(X_smi, maxlen=max_len, padding='post')

	predictions = models.lstm_model.predict(X_smi)
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
		num_workers=0
	)

	model_preds = predict(
		model=models.gcnn_model,
		data_loader=test_data_loader,
		scaler=models.gcnn_scaler
	)
	predictions = np.ma.empty(len(full_data))
	predictions.mask = True
	labels = np.ma.empty(len(full_data))
	labels.mask = True
	for key in full_to_valid_indices.keys():
		full_index = int(key)
		predictions[full_index] = model_preds[full_to_valid_indices[key]][0]
		labels[full_index] = np.round(model_preds[full_to_valid_indices[key]][0], 0)
	return predictions, labels.astype(int)

def get_kekule_smiles(mol):
	Chem.Kekulize(mol)
	kek_smi = Chem.MolToSmiles(mol,kekuleSmiles=True)
	return kek_smi



# get consensus predictions

def getConsensusPredictions(df, indexIdentifierColumn):

	columns = settings.columns_dict.keys()

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

		morgan_fp_generator = MorganFPGenerator(smi_df.copy())
		X_morgan = morgan_fp_generator.get_morgan_features(mol_column_name)

		# change column to where smiles are located
		X_smi = smi_df[mol_column_name].values


		rlm_predictor = RLMPredictior(df, indexIdentifierColumn)
		# rf_y_pred, rf_y_pred_prob = getRfPredictions(X_morgan)
		rf_y_pred, rf_y_pred_prob = rlm_predictor.rf_predict(X_morgan)
		smi_df['RF'] = pd.Series(pd.Series(rf_y_pred).astype(str) + ' (' + pd.Series(rf_y_pred_prob).round(2).astype(str) + ')')
		has_rf_errors = len(smi_df.index) > len(rf_y_pred_prob)

		dnn_predictions, dnn_labels = getDnnPredictions(X_morgan)
		smi_df['DNN'] = pd.Series(pd.Series(dnn_labels).astype(str) + ' (' + pd.Series(dnn_predictions).round(2).astype(str) + ')')
		has_dnn_errors = len(smi_df.index) > len(dnn_predictions)

		lstm_predictions, lstm_labels = getLstmPredictions(X_smi.copy())
		smi_df['LSTM'] = pd.Series(pd.Series(lstm_labels).astype(str) + ' (' + pd.Series(lstm_predictions).round(2).astype(str) + ')')
		has_lstm_errors = len(smi_df.index) > len(lstm_predictions)

		gcnn_predictions, gcnn_labels = getGcnnPredictions(smi_df[mol_column_name].tolist())
		smi_df['GCNN'] = pd.Series(pd.Series(gcnn_labels).fillna('').astype(str) + ' (' + pd.Series(gcnn_predictions).round(2).astype(str) + ')').str.replace('(nan)', '', regex=False)
		has_gcnn_errors = len(smi_df.index) > len(gcnn_predictions) or np.ma.count_masked(gcnn_predictions) > 0

		matrix = np.ma.empty((4, max(rf_y_pred_prob.shape[0], dnn_predictions.shape[0], lstm_predictions.shape[0], gcnn_predictions.shape[0])))
		matrix.mask = True
		matrix[0, :rf_y_pred_prob.shape[0]] = rf_y_pred_prob
		matrix[1, :dnn_predictions.shape[0]] = dnn_predictions
		matrix[2, :lstm_predictions.shape[0]] = lstm_predictions
		matrix[3, :gcnn_predictions.shape[0]] = gcnn_predictions

		consensus_pred_prob = matrix.mean(axis=0)
		smi_df['Consensus'] = pd.Series(
			pd.Series(np.where(consensus_pred_prob>=0.5, 1, 0)).round(2).astype(str)
			+' ('
			+pd.Series(consensus_pred_prob).round(2).astype(str)
			+')'
		)

		smi_df['Prediction'] = pd.Series(
			pd.Series(np.where(consensus_pred_prob>=0.5, 'unstable', 'stable'))
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
