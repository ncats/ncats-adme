#!/usr/bin/env python
# coding: utf-8
"""Step 1 — load raw data, standardize structures, deduplicate, and split.

Produces train / internal_test / external_test (8:1:1) splits per species, plus a
pre-assigned scaffold-grouped CV fold for each training molecule (used by step 4
so that filtering/scaling can be fit per fold without leakage).
"""

import os
import warnings

import numpy as np
import pandas as pd
from joblib import Parallel, delayed
from rdkit import RDLogger
from sklearn.model_selection import GroupKFold

import os as _os, sys as _sys  # run from anywhere: add project root to sys.path + chdir
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
_sys.path.insert(0, _ROOT)
_os.chdir(_ROOT)
import config
from pipeline_common import (
    standardize_smiles_molvs,
    smiles_to_inchi,
    deduplicate_by_species,
    scaffold_split,
    bemis_murcko_scaffold,
)

# suppress warnings
warnings.filterwarnings("ignore", message=".*NotOpenSSLWarning.*")
RDLogger.DisableLog("rdApp.*")

os.makedirs(config.PREPROCESSED_DIR, exist_ok=True)

# columns kept from each raw source
columns_to_keep = config.ID_COLS[:2] + [
    f"{sp}{suf}" for sp in config.SPECIES_LIST for suf in config.TARGET_SUFFIXES
]

# read & merge all raw sources
df_main = pd.concat(
    [pd.read_csv(config.RAW_FILES[key])[columns_to_keep] for key in config.TRAIN_SOURCES],
    ignore_index=True,
)
# standardize structures + derive InChI in parallel across cores
n_jobs = config.num_cores()
df_main["Standardized_SMILES"] = Parallel(n_jobs=n_jobs)(
    delayed(standardize_smiles_molvs)(smi) for smi in df_main["SMILES"]
)
df_main["InChI"] = Parallel(n_jobs=n_jobs)(
    delayed(smiles_to_inchi)(smi) for smi in df_main["Standardized_SMILES"]
)

# add binary class columns
for sp in config.SPECIES_LIST:
    df_main[config.binary_class_col(sp)] = df_main[f"{sp}_class"].map(config.CLASS_TO_BINARY)

# deduplicate and split per species
for sp in config.SPECIES_LIST:
    print(f"\n🔬 Processing species: {sp}")
    df_cleaned, df_conflict, df_duplication = deduplicate_by_species(df_main.copy(), sp)

    selected = (
        config.ID_COLS
        + [f"{sp}{suf}" for suf in config.TARGET_SUFFIXES]
        + [config.binary_class_col(sp)]
    )
    df_cleaned = df_cleaned[selected]
    sp_dir = f"{config.PREPROCESSED_DIR}/{sp}"
    os.makedirs(sp_dir, exist_ok=True)
    df_cleaned.to_csv(f"{sp_dir}/preprocessed.csv", index=False)

    if not df_conflict.empty:
        df_conflict[selected + ["conflict_reason"]].to_csv(
            f"{sp_dir}/conflict_log.csv", index=False
        )
    if not df_duplication.empty:
        df_duplication[selected + ["duplication_reason"]].to_csv(
            f"{sp_dir}/duplication_log.csv", index=False
        )

    print(f"✔️ {sp}: kept={df_cleaned.shape[0]}, conflicts={df_conflict.shape[0]}, dups={df_duplication.shape[0]}")

    # split train / internal / external = 8:1:1 by Bemis-Murcko scaffold
    df_cleaned = df_cleaned.reset_index(drop=True)
    train_idx, internal_idx, external_idx = scaffold_split(
        df_cleaned["Standardized_SMILES"].tolist(),
        config.FRAC_TRAIN,
        config.FRAC_INTERNAL,
        config.FRAC_EXTERNAL,
    )
    df_train = df_cleaned.iloc[train_idx]
    df_internal = df_cleaned.iloc[internal_idx]
    df_external = df_cleaned.iloc[external_idx]

    # save splits
    split_dir = f"{config.SPLIT_DATA_DIR}/{sp}"
    os.makedirs(split_dir, exist_ok=True)
    df_train.to_csv(f"{split_dir}/train.csv", index=False)
    df_internal.to_csv(f"{split_dir}/internal_test.csv", index=False)
    df_external.to_csv(f"{split_dir}/external_test.csv", index=False)

    print(f"📁 {sp} split done: train={len(df_train)}, internal={len(df_internal)}, external={len(df_external)}")

    # pre-assign scaffold-grouped CV folds on the training set (GroupKFold: scaffolds
    # never span folds, fold sizes kept even — consistent with the unstratified scaffold
    # holdout). Saved for step 4 to fit filter/scaler per fold.
    df_train = df_train.reset_index(drop=True)
    groups = df_train["Standardized_SMILES"].map(bemis_murcko_scaffold)
    gkf = GroupKFold(n_splits=config.N_SPLITS)
    fold_ids = np.empty(len(df_train), dtype=int)
    for k, (_, val_idx) in enumerate(gkf.split(df_train, groups=groups)):
        fold_ids[val_idx] = k

    fold_df = df_train[["Sample", "InChI"]].copy()
    fold_df[config.CV_FOLD_COL] = fold_ids
    fold_df.to_csv(config.cv_fold_assignment_path(sp), index=False)
    print(f"   ↳ CV folds saved ({config.N_SPLITS} folds): sizes={np.bincount(fold_ids).tolist()}")
