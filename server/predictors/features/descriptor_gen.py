#!/usr/bin/env python

from rdkit import Chem, DataStructs
import numpy as np
from rdkit.Chem import AllChem

class DescriptorGen:

    def from_smiles(self,smi):
        mol = Chem.MolFromSmiles(smi)
        if mol:
            return self.from_mol(mol)
        else:
            return None

    def from_mol(self,mol):
        fp = AllChem.GetMorganFingerprintAsBitVect(mol, 2)
        arr = np.zeros((0,), dtype=np.int8)
        DataStructs.ConvertToNumpyArray(fp,arr)
        return arr

if __name__ == "__main__":
    descriptor_gen = DescriptorGen()
    print(descriptor_gen.from_smiles("CCCC"))
