#!/usr/bin/env python
# coding: utf-8
"""Step 3 — filter and scale features per species (fit on the training set only).

Fits the feature filter + descriptor scalers on each species' training split and
re-applies them to the internal/external splits and the combined train+internal set.
Saves per-feature-set datasets (all_features + each individual set) used for the
internal/external evaluation in later stages.

Note: the cross-validation in step 4 does NOT use these full-train-fit datasets for
its folds — it re-fits filter/scaler per fold on the raw features to avoid leakage.
These outputs are for the held-out internal/external evaluation and final models.
"""

import os

import joblib
import pandas as pd

import os as _os, sys as _sys  # run from anywhere: add project root to sys.path + chdir
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
_sys.path.insert(0, _ROOT)
_os.chdir(_ROOT)
import config
from pipeline_common import fit_filter_scale, apply_filter_scale

print("🔬 Starting feature filtering, scaling, and splitting process...")

os.makedirs(config.INTERMEDIATE_DIR, exist_ok=True)
os.makedirs(config.FINAL_SETS_DIR, exist_ok=True)


def save_feature_sets(species_final_dir, non_feature_df, X_processed, split_name):
    """Save the all_features set plus each individual feature set for one split."""
    all_dir = os.path.join(species_final_dir, "all_features")
    os.makedirs(all_dir, exist_ok=True)
    pd.concat(
        [non_feature_df.reset_index(drop=True), X_processed.reset_index(drop=True)], axis=1
    ).to_csv(os.path.join(all_dir, f"{split_name}.csv"), index=False)

    for set_name, prefix in config.FEATURE_SETS.items():
        cols = [c for c in X_processed.columns if c.startswith(prefix)]
        if not cols:
            continue
        set_dir = os.path.join(species_final_dir, set_name)
        os.makedirs(set_dir, exist_ok=True)
        pd.concat(
            [non_feature_df.reset_index(drop=True), X_processed[cols].reset_index(drop=True)], axis=1
        ).to_csv(os.path.join(set_dir, f"{split_name}.csv"), index=False)


for species in config.SPECIES_LIST:
    print(f"\n--- Processing species: {species} ---")

    species_intermediate_dir = os.path.join(config.INTERMEDIATE_DIR, species)
    species_final_dir = os.path.join(config.FINAL_SETS_DIR, species)
    os.makedirs(species_intermediate_dir, exist_ok=True)
    os.makedirs(species_final_dir, exist_ok=True)

    # Load datasets with all (raw) features
    feature_dir = f"{config.FEATURE_GENERATION_DIR}/{species}"
    df_train = pd.read_csv(f"{feature_dir}/{species}_train_all_features.csv")
    df_internal = pd.read_csv(f"{feature_dir}/{species}_internal_test_all_features.csv")
    df_external = pd.read_csv(f"{feature_dir}/{species}_external_test_all_features.csv")

    target_col = config.binary_class_col(species)
    feature_cols = config.feature_cols(df_train.columns)
    non_feature_cols = [c for c in df_train.columns if c not in feature_cols]

    # Fit feature filter + descriptor scalers on the TRAINING set only
    print(f"Filtering and scaling features for {species}...")
    filtered_cols, scalers = fit_filter_scale(df_train[feature_cols], df_train[target_col])
    joblib.dump(filtered_cols, os.path.join(species_intermediate_dir, f"{species}_filtered_columns.pkl"))
    joblib.dump(scalers, os.path.join(species_intermediate_dir, f"{species}_scalers.pkl"))
    print(f"✔️ Kept {len(filtered_cols)} of {len(feature_cols)} features. Filter + scalers saved.")

    # Apply the SAME filter + scalers to every split
    splits = {
        "train": df_train,
        "internal_test": df_internal,
        "external_test": df_external,
        "train_internal": pd.concat([df_train, df_internal], ignore_index=True),
    }
    for split_name, df_split in splits.items():
        X_processed = apply_filter_scale(df_split, filtered_cols, scalers)
        save_feature_sets(species_final_dir, df_split[non_feature_cols], X_processed, split_name)
    print("  - Saved all_features + individual feature sets (incl. train_internal).")

print("\n✅ All species have been filtered, scaled, and split successfully.")
