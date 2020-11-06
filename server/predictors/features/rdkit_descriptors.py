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
        df (DataFrame): DataFrame containing column with smiles
    """

    def __init__(self, df: DataFrame):
        """
        Constructor for RDKitDescriptorsGenerator class

        Parameters:
            df (DataFrame): DataFrame containing column with smiles.
        """

        self.df = df.copy()

    def get_rdkit_descriptors(
        self,
        smi_column_name: str,
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

        descriptors_matrix = np.zeros((len(self.df.index), len(descriptors)))

        descriptor_tuples = list(filter(lambda x: x[0] in descriptors, Descriptors.descList))

        for smiles_index, row in self.df.iterrows():
            smi = row[smi_column_name]
            for desc in descriptor_tuples:
                descriptors_index = descriptors.index(desc[0])
                value = desc[1](Chem.MolFromSmiles(smi))
                descriptors_matrix[smiles_index, descriptors_index] = value

        return descriptors_matrix