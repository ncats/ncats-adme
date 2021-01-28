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

    def __init__(self, kekule_mols: array = None):
        """
        Constructor for MorganFPGenerator class

        Parameters:
            df (DataFrame): DataFrame containing column with smiles.
        """

        self.kekule_mols = kekule_mols

    def get_morgan_features(
        self,
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

        fingerprint_matrix = np.zeros((len(self.kekule_mols), nBits), dtype=int)

        for index, mol in enumerate(self.kekule_mols):

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
            fingerprint_matrix[index] = fp.ravel()

        return fingerprint_matrix

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
