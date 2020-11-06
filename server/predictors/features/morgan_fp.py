import pandas as pd
from pandas import DataFrame
from rdkit.Chem.rdchem import Mol
from rdkit import Chem, DataStructs
from rdkit.Chem import AllChem
from rdkit.Chem.rdMolDescriptors import AtomPairsParameters
from rdkit.DataStructs.cDataStructs import ExplicitBitVect
import numpy as np
from numpy import array
from typing import List


class MorganFPGenerator:
    """
    Generates Morgan Fingerprints

    Attributes:
        df (DataFrame): DataFrame containing column with smiles
    """

    def __init__(self, df: DataFrame):
        """
        Constructor for MorganFPGenerator class

        Parameters:
            df (DataFrame): DataFrame containing column with smiles.
        """

        self.df = df.copy()

    def get_morgan_features(
        self,
        smi_column_name: str,
        radius: int = 2,
        nBits: int = 1024,
        invariants: List[AtomPairsParameters] = [],
        fromAtoms: List[AtomPairsParameters] = [],
        useChirality: bool = False,
        useBondTypes: bool = True,
        useFeatures: bool = False,
        bitInfo: AtomPairsParameters = {},
        includeRedundantEnvironments: bool = False
    ) -> array:
        """
        Function to generate Morgan fingerprints derived from the smiles in the dataframe

        Parameters:
            smi_column_name (str): name of column containing the smiles
            Same parameters as: https://www.rdkit.org/docs/source/rdkit.Chem.rdMolDescriptors.html#rdkit.Chem.rdMolDescriptors.GetMorganFingerprintAsBitVect

        Returns:
            fingerprints_matrix (array): a numpy array containing the Morgan fingerprints
        """

        morgan_cols = [ 'morgan_'+str(i) for i in range(nBits) ]
        for index, row in self.df.iterrows():
            
            smi = row[smi_column_name]
            mol = Chem.MolFromSmiles(smi)
            fp = self.get_morgan_fp(
                mol=mol,
                radius=radius,
                nBits=nBits,
                invariants=invariants,
                fromAtoms=fromAtoms,
                useChirality=useChirality,
                useBondTypes=useBondTypes,
                useFeatures=useFeatures,
                bitInfo=bitInfo
            )
            fpl = fp.tolist()
            fps = ','.join(str(e) for e in fpl)
            self.df.at[index,'morganfp'] = fps

        morgan_df = pd.DataFrame(self.df['morganfp'].str.split(',', expand=True).values, columns=morgan_cols)
        return morgan_df.iloc[:,0:].values

    def get_morgan_fp(
        self,
        mol: Mol,
        radius: int = 2,
        nBits: int = 1024,
        invariants: List[AtomPairsParameters] = [],
        fromAtoms: List[AtomPairsParameters] = [],
        useChirality: bool = False,
        useBondTypes: bool = True,
        useFeatures: bool = False,
        bitInfo: AtomPairsParameters = {},
        includeRedundantEnvironments: bool = False
    ) -> array:
        """
        Function to generate a set of fingerprints from a single molecule

        Parameters:
            Same parameters as: https://www.rdkit.org/docs/source/rdkit.Chem.rdMolDescriptors.html#rdkit.Chem.rdMolDescriptors.GetMorganFingerprintAsBitVect

        Returns:
            fingerprints_vector (array): numpy array containing fingerprints for the molecule
        """

        arr = np.zeros((1,))
        fp = AllChem.GetMorganFingerprintAsBitVect(
            mol=mol,
            radius=radius,
            nBits=nBits,
            invariants=invariants,
            fromAtoms=fromAtoms,
            useChirality=useChirality,
            useBondTypes=useBondTypes,
            useFeatures=useFeatures,
            bitInfo=bitInfo
        )
        DataStructs.ConvertToNumpyArray(fp, arr)
        arr = np.array([len(bitInfo[x]) if x in bitInfo else 0 for x in range(nBits)])
        return arr
