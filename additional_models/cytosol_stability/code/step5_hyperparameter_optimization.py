#!/usr/bin/env python
# coding: utf-8
"""Step 5 — Hyperparameter optimization by scaffold CV, threshold on internal, external eval.

Per species:
  1. Pick the best model family from the step-4 CV results (highest cv_bacc_mean):
     a (feature_set, algorithm, sampling) triple.
  2. Grid-search that family's hyperparameters with scaffold CV on the training set
     (leakage-free, reusing the step-1 fold assignment and per-fold filter/scale);
     choose the config with the best CV balanced accuracy.
  3. Fit the final model on the full training set with that config.
  4. Choose the decision threshold on the internal set (maximize balanced accuracy).
     The internal set is used ONLY for this, never for model/hyperparameter selection.
  5. Evaluate on the external set at that threshold (final unbiased report).

Runs all species sequentially, writing each species' summary under {TUNING_DIR}/{species}/summary.csv
and then merging them into tuning_summary.csv.
Resumable: per-config CV scores are cached and skipped on restart.
"""

import os
import warnings

import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import ParameterGrid
from sklearn.metrics import (
    accuracy_score,
    balanced_accuracy_score,
    confusion_matrix,
    f1_score,
    roc_auc_score,
    matthews_corrcoef,
    recall_score,
    precision_score,
)

import os as _os, sys as _sys  # run from anywhere: add project root to sys.path + chdir
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
_sys.path.insert(0, _ROOT)
_os.chdir(_ROOT)
import config
from pipeline_common import train_model, fit_filter_scale, apply_filter_scale

warnings.filterwarnings("ignore")


def _merge_summaries():
    """Combine the per-species tuning summaries -> tuning_summary.csv."""
    rows = []
    for sp in config.SPECIES_LIST:
        f = f"{config.TUNING_DIR}/{sp}/summary.csv"
        if os.path.exists(f) and os.path.getsize(f) > 0:
            rows.append(pd.read_csv(f))
    if not rows:
        print(f"No per-species summaries under {config.TUNING_DIR}")
        return
    merged = pd.concat(rows, ignore_index=True).sort_values("species").reset_index(drop=True)
    out = f"{config.TUNING_DIR}/tuning_summary.csv"
    merged.to_csv(out, index=False)
    print(f"Merged {len(rows)} species -> {out}")

algorithm_params = {
    "xgb": {
        "n_estimators": [100, 200, 300, 400], "max_depth": [3, 5, 6, 7], "learning_rate": [0.01, 0.1, 0.3],
        "subsample": [0.8, 1.0], "colsample_bytree": [0.8, 1.0], "gamma": [0],
        "min_child_weight": [1, 3, 5], "scale_pos_weight": [1], "n_bags": [4, 8, 16, 32, 64],
    },
    "rf": {
        "n_estimators": [100, 200, 300, 400], "max_depth": [None, 5, 10], "min_samples_split": [2, 5],
        "min_samples_leaf": [1, 2], "max_features": ["sqrt", "log2"], "n_bags": [4, 8, 16, 32, 64],
    },
    "lgbm": {
        "n_estimators": [100, 200, 300, 400], "num_leaves": [31, 63], "min_child_samples": [20, 50],
        "learning_rate": [0.01, 0.05, 0.1], "n_bags": [4, 8, 16, 32, 64],
    },
    "svm": {
        "C": [0.1, 1.0, 10.0, 100.0], "kernel": ["rbf"], "gamma": ["scale", "auto", 0.001, 0.01, 0.1],
        "class_weight": [None, "balanced"], "n_bags": [4, 8, 16, 32, 64],
    },
    "dnn": {
        "n_bags": [4, 8, 16, 32, 64], "epochs": [10, 30, 50], "batch_size": [16, 32, 64],
        "learning_rate": [0.001, 0.0005, 0.0001], "hidden_units": [(128, 64), (256, 128), (64, 32)],
        "dropout_rate": [0.2, 0.3, 0.5],
    },
}


def feature_set_columns(filtered_cols, feature_set):
    """Subset a fold's filtered columns to the requested feature set."""
    if feature_set == "all_features":
        return filtered_cols
    prefix = config.FEATURE_SETS[feature_set]
    return [c for c in filtered_cols if c.startswith(prefix)]


def build_param_grid(algorithm, sampling):
    """Parameter grid for an algorithm; drop n_bags when not bagging, then optionally cap."""
    grid = {k: list(v) for k, v in algorithm_params[algorithm].items()}
    if sampling != "stratified_bagging":
        grid.pop("n_bags", None)
    configs = list(ParameterGrid(grid))
    if config.TUNING_MAX_CONFIGS is not None and len(configs) > config.TUNING_MAX_CONFIGS:
        rng = np.random.RandomState(config.RANDOM_STATE)
        idx = sorted(rng.choice(len(configs), size=config.TUNING_MAX_CONFIGS, replace=False))
        configs = [configs[i] for i in idx]
    return configs


def _threshold_score(y_true, y_pred, metric):
    """Score a thresholded prediction by the chosen criterion."""
    if metric == "g_mean":
        tn, fp, fn, tp = confusion_matrix(y_true, y_pred, labels=[0, 1]).ravel()
        sens = tp / (tp + fn) if (tp + fn) > 0 else 0.0
        spec = tn / (tn + fp) if (tn + fp) > 0 else 0.0
        return (sens * spec) ** 0.5
    if metric == "f1":
        return f1_score(y_true, y_pred, zero_division=0)
    if metric == "youden":
        # Youden's J = sens + spec - 1; argmax(J) == argmax(balanced accuracy)
        tn, fp, fn, tp = confusion_matrix(y_true, y_pred, labels=[0, 1]).ravel()
        sens = tp / (tp + fn) if (tp + fn) > 0 else 0.0
        spec = tn / (tn + fp) if (tn + fp) > 0 else 0.0
        return sens + spec - 1.0
    # default: balanced accuracy (== Youden's J for threshold selection)
    return balanced_accuracy_score(y_true, y_pred)


def best_threshold(y_true, y_proba, metric=None):
    """Decision threshold on y_proba that maximizes the chosen criterion on (y_true).

    metric is config.THRESHOLD_METRIC by default: "balanced_accuracy" (= Youden's J),
    "g_mean" (geometric mean of sensitivity and specificity), or "f1".
    """
    metric = metric or config.THRESHOLD_METRIC
    candidates = np.unique(y_proba)
    best_t, best_score = 0.5, -1.0
    for t in candidates:
        score = _threshold_score(y_true, (y_proba >= t).astype(int), metric)
        if score > best_score:
            best_score, best_t = score, float(t)
    return best_t, best_score


def metrics_at_threshold(y_true, y_proba, threshold, prefix):
    """Full metric dict at a fixed threshold, plus threshold-independent AUC."""
    y_pred = (y_proba >= threshold).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred, labels=[0, 1]).ravel()
    return {
        f"{prefix}_acc": accuracy_score(y_true, y_pred),
        f"{prefix}_bacc": balanced_accuracy_score(y_true, y_pred),
        f"{prefix}_sensitivity": recall_score(y_true, y_pred, zero_division=0),
        f"{prefix}_specificity": tn / (tn + fp) if (tn + fp) > 0 else 0.0,
        f"{prefix}_precision": precision_score(y_true, y_pred, zero_division=0),
        f"{prefix}_f1": f1_score(y_true, y_pred, zero_division=0),
        f"{prefix}_auc": roc_auc_score(y_true, y_proba),
        f"{prefix}_mcc": matthews_corrcoef(y_true, y_pred),
    }


species_list = config.SPECIES_LIST

os.makedirs(config.TUNING_DIR, exist_ok=True)

for species in species_list:
    print("\n" + "=" * 70)
    print(f"🔧 Hyperparameter tuning: {species}")
    print("=" * 70)

    target_col = config.binary_class_col(species)
    species_dir = f"{config.TUNING_DIR}/{species}"
    os.makedirs(species_dir, exist_ok=True)

    # 1. Pick the best model family from step-4 CV results (CV based, not internal)
    if not os.path.exists(config.CV_RESULTS_PATH):
        print("❌ No CV results found, run step 4 first. Skipping.")
        continue
    df_cv = pd.read_csv(config.CV_RESULTS_PATH)
    df_cv = df_cv[df_cv["species"] == species]
    if df_cv.empty:
        print(f"⚠️ No CV results for {species}. Skipping.")
        continue
    top = df_cv.sort_values(config.TUNING_SELECTION_METRIC, ascending=False).iloc[0]
    feature_set, algorithm, sampling = top["feature_set"], top["algorithm"], top["sampling"]
    print(f"Selected family (by {config.TUNING_SELECTION_METRIC}={top[config.TUNING_SELECTION_METRIC]:.4f}): "
          f"feature_set={feature_set} | algorithm={algorithm} | sampling={sampling}")

    # 2. Build the CV folds for this feature set (raw features + saved fold assignment)
    raw_train_path = f"{config.FEATURE_GENERATION_DIR}/{species}/{species}_train_all_features.csv"
    fold_path = config.cv_fold_assignment_path(species)
    if not os.path.exists(raw_train_path) or not os.path.exists(fold_path):
        print(f"⚠️ Raw features or fold assignment missing for {species}. Skipping.")
        continue
    raw_train = pd.read_csv(raw_train_path).reset_index(drop=True)
    fold_map = dict(zip(pd.read_csv(fold_path)["InChI"], pd.read_csv(fold_path)[config.CV_FOLD_COL]))
    fold_ids = raw_train["InChI"].map(fold_map)
    if fold_ids.isna().any():
        print(f"⚠️ {fold_ids.isna().sum()} training rows have no fold id for {species}. Skipping.")
        continue
    fold_ids = fold_ids.astype(int).values
    all_feature_cols = config.feature_cols(raw_train.columns)
    y_all = raw_train[target_col].values

    fold_specs = []  # (tr_idx, va_idx, filtered_cols, scalers)
    for k in range(config.N_SPLITS):
        tr_idx = np.where(fold_ids != k)[0]
        va_idx = np.where(fold_ids == k)[0]
        filtered_cols, scalers = fit_filter_scale(
            raw_train.iloc[tr_idx][all_feature_cols], raw_train.iloc[tr_idx][target_col]
        )
        fold_specs.append((tr_idx, va_idx, filtered_cols, scalers))

    # 3. Grid-search hyperparameters by scaffold CV (resumable)
    grid = build_param_grid(algorithm, sampling)
    cv_path = f"{species_dir}/cv_tuning_results.csv"
    done = {}
    if os.path.exists(cv_path):
        prev = pd.read_csv(cv_path)
        done = dict(zip(prev["param_idx"], prev["cv_bacc"]))
    write_header = not (os.path.exists(cv_path) and os.path.getsize(cv_path) > 0)
    print(f"Grid: {len(grid)} configs ({len(done)} already done). Evaluating by {config.N_SPLITS}-fold scaffold CV...")

    for i, params in enumerate(grid):
        if i in done:
            continue
        fold_baccs = []
        for tr_idx, va_idx, filtered_cols, scalers in fold_specs:
            cols = feature_set_columns(filtered_cols, feature_set)
            if not cols:
                continue
            X_tr = apply_filter_scale(raw_train.iloc[tr_idx], cols, scalers)
            X_va = apply_filter_scale(raw_train.iloc[va_idx], cols, scalers)
            model = train_model(algorithm, X_tr, y_all[tr_idx], sampling_method=sampling, **params)
            proba = model.predict_proba(X_va)[:, 1]
            fold_baccs.append(balanced_accuracy_score(y_all[va_idx], (proba > 0.5).astype(int)))
        cv_bacc = float(np.mean(fold_baccs)) if fold_baccs else float("nan")
        row = pd.DataFrame([{"param_idx": i, "params": str(params), "cv_bacc": cv_bacc}])
        row.to_csv(cv_path, mode="a", header=write_header, index=False)
        write_header = False
        done[i] = cv_bacc
        if (i + 1) % 25 == 0 or i == len(grid) - 1:
            print(f"  config {i + 1}/{len(grid)} | best CV bACC so far {max(v for v in done.values() if v == v):.4f}")

    # pick the best config by CV balanced accuracy
    cv_df = pd.read_csv(cv_path).dropna(subset=["cv_bacc"]).sort_values("cv_bacc", ascending=False)
    best_param_idx = int(cv_df.iloc[0]["param_idx"])
    best_params = grid[best_param_idx]
    best_cv_bacc = float(cv_df.iloc[0]["cv_bacc"])
    print(f"Best config (CV bACC {best_cv_bacc:.4f}): {best_params}")

    # 4. Fit final model on full train (full-train filter/scale from step 3)
    final_dir = f"{config.FINAL_SETS_DIR}/{species}/{feature_set}"
    df_train = pd.read_csv(f"{final_dir}/train.csv")
    df_internal = pd.read_csv(f"{final_dir}/internal_test.csv")
    df_external = pd.read_csv(f"{final_dir}/external_test.csv")
    fcols = config.feature_cols(df_train.columns)
    final_model = train_model(
        algorithm, df_train[fcols], df_train[target_col], sampling_method=sampling, **best_params
    )

    # 5. Choose threshold on internal, evaluate on external at that threshold
    proba_internal = final_model.predict_proba(df_internal[fcols])[:, 1]
    threshold, internal_thr_bacc = best_threshold(df_internal[target_col].values, proba_internal)
    proba_external = final_model.predict_proba(df_external[fcols])[:, 1]
    internal_metrics = metrics_at_threshold(df_internal[target_col].values, proba_internal, threshold, "internal")
    external_metrics = metrics_at_threshold(df_external[target_col].values, proba_external, threshold, "external")

    print(f"Threshold (max internal bACC) = {threshold:.3f}")
    print(f"  internal: bACC {internal_metrics['internal_bacc']:.3f} | AUC {internal_metrics['internal_auc']:.3f}")
    print(f"  EXTERNAL: bACC {external_metrics['external_bacc']:.3f} | AUC {external_metrics['external_auc']:.3f} "
          f"| sens {external_metrics['external_sensitivity']:.3f} | spec {external_metrics['external_specificity']:.3f} "
          f"| MCC {external_metrics['external_mcc']:.3f}")

    # Save the final model bundle and external predictions
    joblib.dump(
        {"model": final_model, "feature_cols": fcols, "threshold": threshold,
         "feature_set": feature_set, "algorithm": algorithm, "sampling": sampling, "params": best_params},
        f"{species_dir}/final_model.pkl",
    )
    pd.DataFrame({
        "Sample": df_external["Sample"], "SMILES": df_external["SMILES"],
        "TrueLabel": df_external[target_col].values, "PredProb": proba_external,
        "PredLabel": (proba_external >= threshold).astype(int),
    }).to_csv(f"{species_dir}/external_predictions.csv", index=False)

    # Write the per-species summary row (merged into tuning_summary.csv after all species finish)
    summary_row = {
        "species": species, "feature_set": feature_set, "algorithm": algorithm, "sampling": sampling,
        "cv_bacc": best_cv_bacc, "threshold": threshold, "params": str(best_params),
        **internal_metrics, **external_metrics,
    }
    pd.DataFrame([summary_row]).to_csv(f"{species_dir}/summary.csv", index=False)
    print(f"✅ {species} done. Summary -> {species_dir}/summary.csv")

_merge_summaries()
print("\n🎉 Hyperparameter tuning complete.")
