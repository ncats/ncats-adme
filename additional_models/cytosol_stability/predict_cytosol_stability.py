#!/usr/bin/env python
# coding: utf-8
"""Predict cytosolic metabolic stability for one or more SMILES.

    python predict_cytosol_stability.py --species Human "CCOc1ccccc1"
    python predict_cytosol_stability.py --species Mouse "CCO" "c1ccccc1O"

Human and Mouse are supported. The rat model is distributed for reproduction only:
it is built on standardized RDKit descriptors and the fitted scaler it needs is not
part of this release, so it cannot be applied to new structures here. Use ADME@NCATS
(https://opendata.ncats.nih.gov/adme) for rat predictions.

Feature generation mirrors the training pipeline in `code/` exactly; changing it will
silently invalidate the predictions.
"""

import argparse
import os
import sys

import joblib
import numpy as np
import pandas as pd
from molvs.standardize import Standardizer
from rdkit import Chem, DataStructs, RDLogger
from rdkit.Avalon import pyAvalonTools
from rdkit.Chem import rdFingerprintGenerator
from rdkit.ML.Descriptors.MoleculeDescriptors import MolecularDescriptorCalculator

RDLogger.DisableLog("rdApp.*")

HERE = os.path.dirname(os.path.abspath(__file__))
N_BITS = 2048
SUPPORTED = ["Human", "Mouse"]
# Feature families each model needs. Human uses Avalon bits alone, so it needs no scaler;
# Mouse uses the consensus set, whose descriptor blocks must be standardized.
FAMILIES = {
    "Human": ["avalon_fp_2048"],
    "Mouse": [
        "morgan_fp_2048", "rdkit_fp_2048", "atompair_fp_2048",
        "avalon_fp_2048", "rdkit_ds", "mordred_ds",
    ],
}


def standardize(smiles):
    """Standardize with MolVS, exactly as `code/pipeline_common.standardize_smiles_molvs`."""
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError(f"could not parse SMILES: {smiles!r}")
    return Chem.MolToSmiles(Standardizer().standardize(mol))


def _fps_frame(fps, prefix):
    arr = np.zeros((len(fps), N_BITS), dtype=np.uint8)
    for i, fp in enumerate(fps):
        DataStructs.ConvertToNumpyArray(fp, arr[i])
    return pd.DataFrame(arr, columns=[f"{prefix}_{i + 1}" for i in range(N_BITS)])


def build_features(mols, families):
    blocks = []

    if "morgan_fp_2048" in families:
        gen = rdFingerprintGenerator.GetMorganGenerator(radius=2, fpSize=N_BITS)
        blocks.append(_fps_frame([gen.GetFingerprint(m) for m in mols], "morgan_fp_2048"))
    if "rdkit_fp_2048" in families:
        gen = rdFingerprintGenerator.GetRDKitFPGenerator(fpSize=N_BITS)
        blocks.append(_fps_frame([gen.GetFingerprint(m) for m in mols], "rdkit_fp_2048"))
    if "atompair_fp_2048" in families:
        gen = rdFingerprintGenerator.GetAtomPairGenerator(fpSize=N_BITS)
        blocks.append(_fps_frame([gen.GetFingerprint(m) for m in mols], "atompair_fp_2048"))
    if "avalon_fp_2048" in families:
        blocks.append(
            _fps_frame([pyAvalonTools.GetAvalonFP(m, nBits=N_BITS) for m in mols], "avalon_fp_2048")
        )

    if "rdkit_ds" in families:
        calc = MolecularDescriptorCalculator([x[0] for x in Chem.Descriptors._descList])
        names = ["rdkit_ds_" + n for n in calc.GetDescriptorNames()]
        # Descriptors are computed on the explicit-H molecule, as in the pipeline.
        blocks.append(
            pd.DataFrame([calc.CalcDescriptors(Chem.AddHs(m)) for m in mols], columns=names)
        )

    if "mordred_ds" in families:
        from mordred import Calculator, descriptors

        md = Calculator(descriptors, ignore_3D=True).pandas(mols, quiet=True)
        md.columns = ["mordred_ds_" + c for c in md.columns]
        # Mordred returns error objects for descriptors it cannot compute; the pipeline
        # drops those columns, so coerce here and let the reindex below select what the
        # model actually needs.
        blocks.append(md.apply(pd.to_numeric, errors="coerce").reset_index(drop=True))

    return pd.concat(blocks, axis=1)


def predict(smiles_list, species):
    bundle = joblib.load(os.path.join(HERE, "models", species, "final_model.pkl"))
    model, feature_cols, threshold = bundle["model"], bundle["feature_cols"], bundle["threshold"]

    std = [standardize(s) for s in smiles_list]
    mols = [Chem.MolFromSmiles(s) for s in std]
    X = build_features(mols, FAMILIES[species])

    scaler_path = os.path.join(HERE, "models", species, "scalers.pkl")
    if os.path.exists(scaler_path):
        for prefix, scaler in joblib.load(scaler_path).items():
            cols = list(scaler.feature_names_in_)
            block = X.reindex(columns=cols)
            if block.isna().any().any():
                missing = block.columns[block.isna().any()].tolist()
                raise RuntimeError(
                    f"{len(missing)} descriptor(s) could not be computed for this input "
                    f"(first few: {missing[:5]}); prediction would be unreliable"
                )
            X[cols] = scaler.transform(block)

    X = X.reindex(columns=feature_cols)
    if X.isna().any().any():
        missing = X.columns[X.isna().any()].tolist()
        raise RuntimeError(f"missing model features: {missing[:5]} ({len(missing)} total)")

    proba = model.predict_proba(X)[:, 1]
    return pd.DataFrame(
        {
            "SMILES": smiles_list,
            "Standardized_SMILES": std,
            "P(Unstable)": proba.round(4),
            "Prediction": np.where(proba >= threshold, "Unstable", "Stable"),
        }
    )


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("smiles", nargs="+", help="one or more SMILES strings")
    ap.add_argument("--species", default="Human", choices=SUPPORTED)
    args = ap.parse_args()

    result = predict(args.smiles, args.species)
    bundle = joblib.load(os.path.join(HERE, "models", args.species, "final_model.pkl"))
    print(
        f"{args.species} cytosolic stability "
        f"({bundle['algorithm'].upper()} / {bundle['feature_set']}, "
        f"threshold={bundle['threshold']:.4f})\n"
    )
    print(result.to_string(index=False))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, RuntimeError) as exc:
        sys.exit(f"error: {exc}")
