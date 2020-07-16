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

def get_morgan_features(test_df, indexIdentifierColumn):
	morgan_cols = [ 'morgan_'+str(i) for i in range(1024) ]
	for index, row in test_df.iterrows():
		# change this to column index of smiles
		smi = row.iloc[indexIdentifierColumn]
		mol = Chem.MolFromSmiles(smi)
		fp = Get_MorganFP(mol)
		fpl = fp.tolist()
		fps = ','.join(str(e) for e in fpl)
		test_df.at[index,'morganfp'] = fps

	morgan_df = pd.DataFrame(test_df['morganfp'].str.split(',', expand=True).values, columns=morgan_cols)
	return morgan_df.iloc[:,0:].values


def get_processed_smi(X_test):
	print(X_test.shape[0], file=sys.stdout)
	for p in range (X_test.shape[0]):
		print(p, file=sys.stdout)
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

# loading tokenizer for lstm model


def getRfPredictions(X_morgan):
	with open('./models/rf_morgan_all_data.pkl', 'rb') as pkl_file:
		model = pickle.load(pkl_file)
	y_pred = model.predict(X_morgan)
	y_pred_prob = model.predict_proba(X_morgan).T[1]
	return y_pred, y_pred_prob

def getDnnPredictions(X_morgan):
	# with graph.as_default():
	predictions = dnn_model.predict(X_morgan)
	y_pred = np.round(predictions,0)
	y_pred_labels = np.array(y_pred).ravel()
	labels = y_pred_labels.astype(int)
	predictions = np.array(predictions).ravel()
	predictions = np.round(predictions, 2)
	return predictions, labels

def getLstmPredictions(X_smi_list):
	max_len = 100
	X_smi = get_processed_smi(X_smi_list)
	X_smi = tokenizer.texts_to_sequences(X_smi)
	X_smi = pad_sequences(X_smi, maxlen=max_len, padding='post')

	predictions = lstm_model.predict(X_smi)
	y_pred = np.round(predictions,0)
	y_pred_labels = np.array(y_pred).ravel()
	labels = y_pred_labels.astype(int)
	predictions = np.array(predictions).ravel()
	predictions = np.round(predictions, 2)

	return predictions, labels

# get consensus predictions

def getConsensusPredictions(df, indexIdentifierColumn):
	pred_df = df.copy() # create a copy for final predictions
	X_morgan = get_morgan_features(df, indexIdentifierColumn)

	# change column to where smiles are located
	X_smi = df.iloc[:,indexIdentifierColumn].values
	print(X_smi, file=sys.stdout)
	y_pred, y_pred_prob = getRfPredictions(X_morgan)
	pred_df['rf_pred_prob'] = pd.Series(y_pred_prob)
	pred_df['rf_pred'] = pd.Series(y_pred)

	predictions, labels = getDnnPredictions(X_morgan)
	pred_df['dnn_pred_prob'] = pd.Series(predictions)
	pred_df['dnn_pred'] = pd.Series(labels)

	predictions, labels = getLstmPredictions(X_smi)
	pred_df['lstm_pred_prob'] = pd.Series(predictions)
	pred_df['lstm_pred'] = pd.Series(labels)

	pred_df['consensus_pred_prob'] = pred_df[['rf_pred_prob', 'dnn_pred_prob', 'lstm_pred_prob']].mean(axis=1)
	pred_df['consensus_pred'] = np.where(pred_df['consensus_pred_prob']>=0.5, 1, 0)

	pred_df = pred_df.round({'consensus_pred_prob': 2})

	return pred_df