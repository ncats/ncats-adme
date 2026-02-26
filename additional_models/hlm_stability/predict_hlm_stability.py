import sys
import pickle

import pandas as pd 
import numpy as np

from rdkit import Chem
from rdkit.ML.Descriptors.MoleculeDescriptors import MolecularDescriptorCalculator
from rdkit.Chem.MolStandardize import rdMolStandardize

from sklearn.preprocessing import StandardScaler
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.utils.validation import check_is_fitted
from sklearn.pipeline import Pipeline
from sklearn.feature_selection import VarianceThreshold

from xgboost import XGBClassifier
from imblearn.ensemble import BalancedBaggingClassifier

# To run script, cd into additional_models/hlm_stability directory and use the command: python predict_hlm_stability.py "<SMILES_STRING>"

# Remover of highly correlated features
class Decorrelator(BaseEstimator, TransformerMixin):
    
    def __init__(self, threshold=0.95):
        self.threshold = threshold

    def fit(self, X, y=None):
        X = pd.DataFrame(X)

        self.feature_names_in_ = X.columns.tolist()

        corr_matrix = X.corr().abs()
        upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
        correlated_columns = [column for column in upper.columns if any(upper[column] > self.threshold)]
        self.correlated_columns_ = correlated_columns
        return self

    def transform(self, X, y=None, **kwargs):
        check_is_fitted(self)
        return (pd.DataFrame(X)).drop(labels=self.correlated_columns_, axis=1)
    
    def get_feature_names_out(self, input_features=None):
        check_is_fitted(self)
        
        if input_features is None:
            # If input_features is not provided, use the feature names from fit
            if hasattr(self, 'feature_names_in_'):
                input_features = self.feature_names_in_
            else:
                # Fallback if fit was not called with a DataFrame or had no column names
                raise ValueError("input_features must be provided if the transformer was not fitted with named features.")
        
        # Convert to a set for efficient difference calculation
        remaining_features_set = set(input_features) - set(self.correlated_columns_)
        
        # Maintain the original order of the remaining features as much as possible
        remaining_features = [col for col in input_features if col in remaining_features_set]
        
        return np.array(remaining_features)

# Load pre-trained model and scaler
with open('biogen_chembl_ncats_hlm_model.pkl', 'rb') as model_file:
    hlm_stability_model: Pipeline = pickle.load(model_file)

# Get SMILES input from command line argument
if len(sys.argv) != 2:
    print("Please provide the SMILES string as a command line argument.")
    sys.exit(1)


print(f"The script name is: {sys.argv[0]}")
print(f"The argument you provided is: {sys.argv[1]}")

smiles_input = sys.argv[1]


# Process SMILES input
def standardize_smiles_rdkit(smiles: str) -> str:
	# follows the steps in
	# https://github.com/greglandrum/RSC_OpenScience_Standardization_202104/blob/main/MolStandardize%20pieces.ipynb
	# as described (by Greg) in
	# https://www.youtube.com/watch?v=eWTApNX8dJQ
	mol = Chem.MolFromSmiles(smiles)
	 
	# Remove hydrogens, disconnect metal atoms, normalize the molecule, reionize the molecule
	clean_mol = rdMolStandardize.Cleanup(mol) 
	 
	# Get parent molecule
	parent_clean_mol = rdMolStandardize.FragmentParent(clean_mol)
		 
	# Neutralize molecule
	uncharger = rdMolStandardize.Uncharger()
	uncharged_parent_clean_mol = uncharger.uncharge(parent_clean_mol)
	 
	# Canonicalize tautomers
	te = rdMolStandardize.TautomerEnumerator()
	taut_uncharged_parent_clean_mol = te.Canonicalize(uncharged_parent_clean_mol)
	
	std_smiles = Chem.MolToSmiles(taut_uncharged_parent_clean_mol)
	 
	return std_smiles

std_smiles = standardize_smiles_rdkit(smiles_input)

df = pd.DataFrame([std_smiles], columns=['SMILES'])

# Generate RDKit molecular descriptors
def rdkit_descriptors(smiles: str) -> pd.DataFrame:
    mol = Chem.MolFromSmiles(smiles)
    calc = MolecularDescriptorCalculator([x[0] for x in Chem.Descriptors._descList])
    descriptor_names = calc.GetDescriptorNames()
    mol_descriptors = calc.CalcDescriptors(mol)
    descriptors = pd.DataFrame([mol_descriptors], columns=descriptor_names)

    return descriptors

df = pd.concat([df, rdkit_descriptors(std_smiles)], axis=1)

prediction = hlm_stability_model.predict(df.drop(columns=['SMILES']))
print(f"HLM Stability Prediction: {'Stable' if prediction[0] == 0 else 'Unstable'}")
