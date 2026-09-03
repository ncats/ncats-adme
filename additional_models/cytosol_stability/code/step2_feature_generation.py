#!/usr/bin/env python
# coding: utf-8
"""Step 2 — generate molecular features per species and split.

For each species/split, computes fingerprints (Morgan / RDKit / AtomPair / Avalon)
and descriptors (RDKit 2D, Mordred) and writes the raw, unfiltered/unscaled feature
matrix consumed by step 3 (filtering/scaling) and step 4 (per-fold CV).
"""

import pandas as pd

import os as _os, sys as _sys  # run from anywhere: add project root to sys.path + chdir
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
_sys.path.insert(0, _ROOT)
_os.chdir(_ROOT)
import config
from pipeline_common import process_feature_generation

for species in config.SPECIES_LIST:
    for split_name in config.SPLIT_NAMES:
        print(f"Processing {species} - {split_name} split")
        split_file = f"{config.SPLIT_DATA_DIR}/{species}/{split_name}.csv"
        df_split = pd.read_csv(split_file)
        process_feature_generation(df_split, species, split_name)
    print()

print("✅ Feature generation complete.")
