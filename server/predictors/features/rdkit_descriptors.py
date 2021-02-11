from rdkit.Chem import Descriptors
from rdkit import Chem
import numpy as np
from numpy import array
from typing import List
from pandas import DataFrame
import pandas as pd

class RDKitDescriptorsGenerator:
    """
    Generates RDKit Descriptors

    Attributes:
        kekule_mols (array): numpy array with kekule rdkit mol objects.
    """

    def __init__(self, kekule_mols: array = None):
        """
        Constructor for RDKitDescriptorsGenerator class

        Parameters:
            kekule_mols (array): numpy array with kekule rdkit mol objects.
        """

        self.kekule_mols = kekule_mols

    def get_rdkit_descriptors(
        self,
        descriptors: List[str] = []
    ) -> array:
        """
        Function to generate Morgan fingerprints derived from the smiles in the dataframe

        Parameters:
            smi_column_name (str): name of column containing the smiles
            descriptors (List[str]): list of descriptors names to be generated

        Returns:
            descriptors_matrix (array): a numpy array containing the RDKit descriptors
        """

        descriptors_matrix = np.zeros((len(self.kekule_mols), len(descriptors)))

        descriptor_tuples = list(filter(lambda x: x[0] in descriptors, Descriptors.descList))

        for smiles_index, mol in enumerate(self.kekule_mols):
            for desc in descriptor_tuples:
                descriptors_index = descriptors.index(desc[0])
                value = desc[1](mol)
                descriptors_matrix[smiles_index, descriptors_index] = value

        return descriptors_matrix