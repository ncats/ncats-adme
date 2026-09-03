#!/usr/bin/env python
# coding: utf-8
"""Step 4 — scaffold-grouped cross-validation + internal-test evaluation.

Leakage-free CV: feature filtering and scaling are fit **inside each fold** on the
fold's training portion only, using the scaffold-grouped fold assignment saved in
step 1. The internal-test evaluation legitimately uses the full-train fit produced
in step 3 (the internal set is held out).

Runs every (sampling, species, feature_set, algorithm) combination sequentially, writing one result
file per species/feature_set under {CV_DIR}/{species}/{feature_set}.csv, then merges them into the
combined cv_results_summary.csv. The run is resumable: combinations already present in the per-species
files are skipped.
"""

import os
import warnings

import numpy as np
import pandas as pd
from sklearn.metrics import (
    roc_auc_score,
    accuracy_score,
    balanced_accuracy_score,
    matthews_corrcoef,
    confusion_matrix,
)

import os as _os, sys as _sys  # run from anywhere: add project root to sys.path + chdir
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
_sys.path.insert(0, _ROOT)
_os.chdir(_ROOT)
import config
from pipeline_common import train_model, fit_filter_scale, apply_filter_scale

warnings.filterwarnings("ignore")

import glob as _glob

os.makedirs(config.CV_DIR, exist_ok=True)

# Process every (species, feature_set) sequentially, writing one result file per species/feature_set
# under {CV_DIR}/{species}/{feature_set}.csv, then merge them into the combined summary at the end.
species_list = config.SPECIES_LIST
feature_set_list = config.FEATURE_SET_LIST


def _species_fs_path(species, feature_set):
    sp_dir = os.path.join(config.CV_DIR, species)
    os.makedirs(sp_dir, exist_ok=True)
    return os.path.join(sp_dir, f"{feature_set}.csv")


def _merge_summary():
    """Combine the per-species result files -> cv_results_summary.csv."""
    files = [f for sp in config.SPECIES_LIST
             for f in sorted(_glob.glob(os.path.join(config.CV_DIR, sp, "*.csv")))]
    dfs = [pd.read_csv(f) for f in files if os.path.getsize(f) > 0]
    if not dfs:
        print(f"No per-species CV result files under {config.CV_DIR}/<species>/")
        return
    merged = pd.concat(dfs, ignore_index=True).sort_values(
        ["species", "feature_set", "sampling", "algorithm"]).reset_index(drop=True)
    merged.to_csv(config.CV_RESULTS_PATH, index=False)
    n = len(config.SPECIES_LIST) * len(config.FEATURE_SET_LIST) * len(config.SAMPLING_METHODS) * len(config.ALGORITHM_LIST)
    print(f"Merged {len(files)} per-species files ({len(merged)}/{n}) -> {config.CV_RESULTS_PATH}")


def calculate_metrics(y_true, y_pred_proba):
    """Calculate all required metrics from true labels and predicted probabilities."""
    y_pred = (y_pred_proba > 0.5).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred, labels=[0, 1]).ravel()

    return {
        "acc": accuracy_score(y_true, y_pred),
        "bacc": balanced_accuracy_score(y_true, y_pred),
        "sensitivity": tp / (tp + fn) if (tp + fn) > 0 else 0.0,
        "specificity": tn / (tn + fp) if (tn + fp) > 0 else 0.0,
        "auc": roc_auc_score(y_true, y_pred_proba),
        "mcc": matthews_corrcoef(y_true, y_pred),
    }


def feature_set_columns(filtered_cols, feature_set):
    """Subset a fold's filtered columns to the requested feature set."""
    if feature_set == "all_features":
        return filtered_cols
    prefix = config.FEATURE_SETS[feature_set]
    return [c for c in filtered_cols if c.startswith(prefix)]


print("🚀 Starting Batch Run: scaffold-grouped CV + Internal Test (Resumable) 🚀")

# Resumable: `done` holds (sampling, species, feature_set, algorithm) tuples already present in the
# per-species result files under {CV_DIR}/{species}/.
done = set()
for _sp in config.SPECIES_LIST:
    for _f in sorted(_glob.glob(os.path.join(config.CV_DIR, _sp, "*.csv"))):
        if os.path.getsize(_f) == 0:
            continue
        _df = pd.read_csv(_f)
        done |= set(zip(_df["sampling"], _df["species"], _df["feature_set"], _df["algorithm"]))

for species in species_list:
    target_col = config.binary_class_col(species)

    # Skip the whole species if every combination is already done
    species_pending = any(
        (sm, species, fs, alg) not in done
        for sm in config.SAMPLING_METHODS
        for fs in feature_set_list
        for alg in config.ALGORITHM_LIST
    )
    if not species_pending:
        continue

    # -- Load RAW (unfiltered/unscaled) training features + saved CV folds --
    raw_train_path = f"{config.FEATURE_GENERATION_DIR}/{species}/{species}_train_all_features.csv"
    fold_path = config.cv_fold_assignment_path(species)
    if not os.path.exists(raw_train_path) or not os.path.exists(fold_path):
        print(f"⚠️ Raw features or fold assignment missing for {species}, skipping.")
        continue

    raw_train = pd.read_csv(raw_train_path).reset_index(drop=True)
    fold_df = pd.read_csv(fold_path)

    # attach fold id by InChI (unique per species after dedup)
    fold_map = dict(zip(fold_df["InChI"], fold_df[config.CV_FOLD_COL]))
    fold_ids = raw_train["InChI"].map(fold_map)
    if fold_ids.isna().any():
        print(f"⚠️ {fold_ids.isna().sum()} training rows have no fold id for {species}, skipping.")
        continue
    fold_ids = fold_ids.astype(int).values

    all_feature_cols = config.feature_cols(raw_train.columns)
    y_all = raw_train[target_col].values

    # -- Pre-fit filter + scalers per fold (on the fold-train portion only) --
    # Done once per species and reused across feature sets / algorithms / sampling.
    fold_specs = []  # (train_idx, val_idx, filtered_cols, scalers)
    for k in range(config.N_SPLITS):
        tr_idx = np.where(fold_ids != k)[0]
        va_idx = np.where(fold_ids == k)[0]
        filtered_cols, scalers = fit_filter_scale(
            raw_train.iloc[tr_idx][all_feature_cols], raw_train.iloc[tr_idx][target_col]
        )
        fold_specs.append((tr_idx, va_idx, filtered_cols, scalers))

    for feature_set in feature_set_list:
        pending = [
            (sm, alg)
            for sm in config.SAMPLING_METHODS
            for alg in config.ALGORITHM_LIST
            if (sm, species, feature_set, alg) not in done
        ]
        if not pending:
            continue

        out_path = _species_fs_path(species, feature_set)
        header_written_fs = os.path.exists(out_path) and os.path.getsize(out_path) > 0

        # -- Internal-test data: full-train fit from step 3 (internal is held out) --
        final_dir = f"{config.FINAL_SETS_DIR}/{species}/{feature_set}"
        train_path = f"{final_dir}/train.csv"
        internal_test_path = f"{final_dir}/internal_test.csv"
        if not os.path.exists(train_path) or not os.path.exists(internal_test_path):
            print(f"⚠️ Final feature set missing for {species}/{feature_set}, skipping.")
            continue

        df_train_full = pd.read_csv(train_path)
        df_internal = pd.read_csv(internal_test_path)
        final_feature_cols = config.feature_cols(df_train_full.columns)
        X_train_full = df_train_full[final_feature_cols]
        y_train_full = df_train_full[target_col]
        X_internal = df_internal[final_feature_cols]
        y_internal = df_internal[target_col]

        for sampling_method, algorithm in pending:
            print("\n" + "=" * 70)
            print(f"🔬 Processing: Sample={sampling_method} | Species={species} | Feature={feature_set} | Algo={algorithm}")
            print("=" * 70)

            try:
                # -- Cross-validation: filter+scale fit per fold (no leakage) --
                cv_fold_metrics = []
                for tr_idx, va_idx, filtered_cols, scalers in fold_specs:
                    cols = feature_set_columns(filtered_cols, feature_set)
                    if not cols:
                        continue

                    X_tr = apply_filter_scale(raw_train.iloc[tr_idx], cols, scalers)
                    X_va = apply_filter_scale(raw_train.iloc[va_idx], cols, scalers)
                    y_tr, y_va = y_all[tr_idx], y_all[va_idx]

                    model = train_model(
                        algorithm=algorithm, X_train=X_tr, y_train=y_tr, sampling_method=sampling_method
                    )
                    y_va_proba = model.predict_proba(X_va)[:, 1]
                    cv_fold_metrics.append(calculate_metrics(y_va, y_va_proba))

                if not cv_fold_metrics:
                    print("⚠️ No usable folds for this feature set, skipping.")
                    continue

                df_cv_metrics = pd.DataFrame(cv_fold_metrics)
                cv_mean_metrics = {f"cv_{key}_mean": val for key, val in df_cv_metrics.mean().to_dict().items()}
                cv_std_metrics = {f"cv_{key}_std": val for key, val in df_cv_metrics.std().to_dict().items()}

                # -- Internal test: train on full train (full-train fit), predict internal --
                final_model = train_model(
                    algorithm=algorithm, X_train=X_train_full, y_train=y_train_full, sampling_method=sampling_method
                )
                y_internal_proba = final_model.predict_proba(X_internal)[:, 1]
                internal_test_metrics = {
                    f"internal_{key}": val for key, val in calculate_metrics(y_internal, y_internal_proba).items()
                }

                # -- Live Display and Incremental Save --
                result_row = {
                    "sampling": sampling_method,
                    "species": species,
                    "feature_set": feature_set,
                    "algorithm": algorithm,
                    **cv_mean_metrics,
                    **cv_std_metrics,
                    **internal_test_metrics,
                }

                print("-" * 30)
                print("  📈 **RESULTS FOR THIS RUN**")
                print(f"    - CV Mean AUC:          {result_row['cv_auc_mean']:.4f} (± {result_row['cv_auc_std']:.4f})")
                print(f"    - CV Mean Balanced Acc: {result_row['cv_bacc_mean']:.4f} (± {result_row['cv_bacc_std']:.4f})")
                print("-" * 30)
                print(f"    - Internal Test AUC:    {result_row['internal_auc']:.4f}")
                print(f"    - Internal Test B. Acc: {result_row['internal_bacc']:.4f}")
                print("-" * 30)

                df_result_row = pd.DataFrame([result_row])
                df_result_row.to_csv(out_path, mode="a", header=not header_written_fs, index=False)
                header_written_fs = True
                done.add((sampling_method, species, feature_set, algorithm))

            except Exception as e:
                print(f"❌ ERROR occurred: {e}")
                continue

print("\n" + "=" * 70)
print("🎉🎉🎉 All combinations processed successfully! 🎉🎉🎉")
_merge_summary()
