# load libraries
import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from sklearn.feature_selection import VarianceThreshold
from sklearn.preprocessing import StandardScaler
from imblearn.ensemble import BalancedBaggingClassifier
from sklearn.metrics import roc_auc_score
import numpy as np
from molvs.standardize import Standardizer
from rdkit import Chem
from rdkit import DataStructs
from rdkit.Chem.Scaffolds import MurckoScaffold
from scikeras.wrappers import KerasClassifier
import tensorflow as tf
from rdkit.Chem import inchi
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization, LeakyReLU, Input
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.optimizers import AdamW
from tensorflow.keras.optimizers.schedules import ExponentialDecay
from sklearn.utils import check_random_state
from sklearn.base import is_classifier
import warnings
from rdkit.Chem import rdFingerprintGenerator
from rdkit.Avalon import pyAvalonTools
from mordred import Calculator, descriptors
from rdkit.ML.Descriptors.MoleculeDescriptors import MolecularDescriptorCalculator
from sklearn.inspection import permutation_importance
import random

import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__))))
import config


def build_dnn(
    input_dim, output_dim, hidden_units=(128, 64), dropout_rate=0.3, learning_rate=0.001
):
    model = Sequential()
    model.add(Input(shape=(input_dim,)))
    for units in hidden_units:
        model.add(Dense(units, activation="relu"))
        model.add(Dropout(dropout_rate))
    model.add(Dense(output_dim, activation="sigmoid"))
    model.compile(
        optimizer=Adam(learning_rate=learning_rate),
        loss="binary_crossentropy",
        metrics=["accuracy"],
    )
    return model


def train_model(algorithm, X_train, y_train, sampling_method="none", **kwargs):
    import warnings

    warnings.filterwarnings("ignore")
    total_cores = config.num_cores()
    if sampling_method == "stratified_bagging":
        # Parallelize across bags only; keep each base estimator single-threaded
        # to avoid nested oversubscription (n_bags x per-estimator threads).
        n_jobs = 1
        # DNN base models spawn their own TF threads (capped at 4), so limit bag
        # parallelism accordingly; other estimators are single-threaded here.
        bag_n_jobs = max(1, total_cores // 4) if algorithm == "dnn" else total_cores
    else:
        n_jobs = total_cores
        bag_n_jobs = total_cores  # unused unless bagging
    kwargs["n_jobs"] = n_jobs

    if algorithm == "rf":
        # rf base parameters
        n_estimators = kwargs.get("n_estimators", 100)
        criterion = kwargs.get("criterion", "gini")
        max_depth = kwargs.get("max_depth", None)
        min_samples_split = kwargs.get("min_samples_split", 2)
        min_samples_leaf = kwargs.get("min_samples_leaf", 1)
        min_weight_fraction_leaf = kwargs.get("min_weight_fraction_leaf", 0.0)
        max_features = kwargs.get("max_features", "sqrt")
        max_leaf_nodes = kwargs.get("max_leaf_nodes", None)
        min_impurity_decrease = kwargs.get("min_impurity_decrease", 0.0)
        bootstrap = kwargs.get("bootstrap", True)
        oob_score = kwargs.get("oob_score", False)
        class_weight = kwargs.get("class_weight", None)
        max_samples = kwargs.get("max_samples", None)

        base_model = RandomForestClassifier(
            n_estimators=n_estimators,
            criterion=criterion,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            min_samples_leaf=min_samples_leaf,
            min_weight_fraction_leaf=min_weight_fraction_leaf,
            max_features=max_features,
            max_leaf_nodes=max_leaf_nodes,
            min_impurity_decrease=min_impurity_decrease,
            bootstrap=bootstrap,
            oob_score=oob_score,
            class_weight=class_weight,
            max_samples=max_samples,
            random_state=config.RANDOM_STATE,
            n_jobs=n_jobs,
        )
    elif algorithm == "xgb":
        # xgb base parameters
        n_estimators = kwargs.get("n_estimators", 100)
        learning_rate = kwargs.get("learning_rate", 0.3)
        max_depth = kwargs.get("max_depth", 6)
        subsample = kwargs.get("subsample", 1.0)
        colsample_bytree = kwargs.get("colsample_bytree", 1.0)
        min_child_weight = kwargs.get("min_child_weight", 1)
        reg_lambda = kwargs.get("reg_lambda", 1.0)
        reg_alpha = kwargs.get("reg_alpha", 0.0)
        gamma = kwargs.get("gamma", 0.0)
        scale_pos_weight = kwargs.get("scale_pos_weight", 1.0)

        base_model = XGBClassifier(
            eval_metric="logloss",
            n_estimators=n_estimators,
            learning_rate=learning_rate,
            max_depth=max_depth,
            subsample=subsample,
            colsample_bytree=colsample_bytree,
            min_child_weight=min_child_weight,
            reg_lambda=reg_lambda,
            reg_alpha=reg_alpha,
            gamma=gamma,
            scale_pos_weight=scale_pos_weight,
            random_state=config.RANDOM_STATE,
            n_jobs=n_jobs,
        )
    elif algorithm == "svm":
        # SVM base parameters
        C = kwargs.get("C", 1.0)
        kernel = kwargs.get("kernel", "rbf")
        degree = kwargs.get("degree", 3)
        gamma = kwargs.get("gamma", "scale")
        coef0 = kwargs.get("coef0", 0.0)
        shrinking = kwargs.get("shrinking", True)
        probability = kwargs.get("probability", True)
        class_weight = kwargs.get("class_weight", None)
        cache_size = kwargs.get("cache_size", 200)
        max_iter = kwargs.get("max_iter", -1)

        base_model = SVC(
            C=C,
            kernel=kernel,
            degree=degree,
            gamma=gamma,
            coef0=coef0,
            shrinking=shrinking,
            class_weight=class_weight,
            cache_size=cache_size,
            probability=probability,
            max_iter=max_iter,
            random_state=config.RANDOM_STATE,
        )
    elif algorithm == "lgbm":
        # lgbm base parameters
        n_estimators = kwargs.get("n_estimators", 100)
        learning_rate = kwargs.get("learning_rate", 0.1)
        max_depth = kwargs.get("max_depth", -1)
        num_leaves = kwargs.get("num_leaves", 31)
        min_child_samples = kwargs.get("min_child_samples", 20)
        subsample = kwargs.get("subsample", 1.0)
        colsample_bytree = kwargs.get("colsample_bytree", 1.0)
        reg_alpha = kwargs.get("reg_alpha", 0.0)
        reg_lambda = kwargs.get("reg_lambda", 0.0)
        scale_pos_weight = kwargs.get("scale_pos_weight", 1.0)
        class_weight = kwargs.get("class_weight", None)
        boosting_type = kwargs.get("boosting_type", "gbdt")

        base_model = LGBMClassifier(
            n_estimators=n_estimators,
            learning_rate=learning_rate,
            max_depth=max_depth,
            num_leaves=num_leaves,
            min_child_samples=min_child_samples,
            subsample=subsample,
            colsample_bytree=colsample_bytree,
            reg_alpha=reg_alpha,
            reg_lambda=reg_lambda,
            scale_pos_weight=scale_pos_weight,
            class_weight=class_weight,
            boosting_type=boosting_type,
            random_state=config.RANDOM_STATE,
            n_jobs=n_jobs,
            verbosity=-1,
        )
    elif algorithm == "dnn":
        # print('Configuring KerasClassifier...')

        # set global random seed for reproducibility
        seed = kwargs.get("random_state", config.RANDOM_STATE)
        os.environ["PYTHONHASHSEED"] = str(seed)
        np.random.seed(seed)
        random.seed(seed)
        tf.random.set_seed(seed)

        # limit core number
        max_threads = 4
        tf.config.threading.set_intra_op_parallelism_threads(max_threads)
        tf.config.threading.set_inter_op_parallelism_threads(max_threads)

        # dnn base parameters
        hidden_units = kwargs.get("hidden_units", (128, 64))
        dropout_rate = kwargs.get("dropout_rate", 0.3)
        learning_rate = kwargs.get("learning_rate", 0.001)
        epochs = kwargs.get("epochs", 10)
        batch_size = kwargs.get("batch_size", 32)
        base_model = KerasClassifier(
            model=build_dnn,
            input_dim=X_train.shape[1],
            output_dim=1,
            hidden_units=hidden_units,
            dropout_rate=dropout_rate,
            learning_rate=learning_rate,
            epochs=epochs,
            batch_size=batch_size,
            verbose=0,
            random_state=seed,
        )
    else:
        raise ValueError(f"Unknown algorithm: {algorithm}")

    # stratified bagging apply
    if sampling_method == "stratified_bagging":
        n_bags = kwargs.get("n_bags", 64)
        model = BalancedBaggingClassifier(
            estimator=base_model,
            n_estimators=n_bags,  # number of bags
            sampling_strategy="auto",
            bootstrap=True,
            random_state=config.RANDOM_STATE,
            n_jobs=bag_n_jobs,
        )
        model.fit(X_train, y_train)
    else:
        base_model.fit(X_train, y_train)
        model = base_model

    return model


def replace_consensus(used_feature):
    consensus_parts = set(
        [
            "morgan_fp_2048",
            "rdkit_fp_2048",
            "atompair_fp_2048",
            "avalon_fp_2048",
            "rdkit_ds",
            "mordred_ds",
        ]
    )
    parts = used_feature.split("/")
    remaining_parts = [p for p in parts if p not in consensus_parts]
    if consensus_parts.issubset(set(parts)):
        if remaining_parts:
            return "/".join(remaining_parts + ["consensus"])
        else:
            return "consensus"
    else:
        return used_feature


def reverse_replace_consensus(feature_name: str) -> str:
    if feature_name == "consensus":
        return "morgan_fp_2048/rdkit_fp_2048/atompair_fp_2048/avalon_fp_2048/rdkit_ds/mordred_ds"
    return feature_name


def feature_filter(X_data, y_data):
    """Drop features whose variance is below the threshold, and exclude features whose
    absolute correlation with y is at or above the threshold or exactly zero."""
    corr_with_target = X_data.corrwith(y_data)
    low_corr = corr_with_target.index[
        (abs(corr_with_target) < config.CORR_THRESHOLD) & (corr_with_target != 0)
    ]
    if len(low_corr) == 0:
        return X_data.copy()
    df_low_corr = X_data[low_corr]
    selector = VarianceThreshold(threshold=config.VARIANCE_THRESHOLD)
    try:
        selected = selector.fit_transform(df_low_corr)
        cols = df_low_corr.columns[selector.get_support()]
        return pd.DataFrame(selected, columns=cols)
    except ValueError:
        return df_low_corr


def fit_filter_scale(X_train_all, y_train):
    """Fit the feature filter + descriptor scalers on training data ONLY.

    Used per CV fold (fold-train portion) and for the full training set. Because
    `feature_filter` and StandardScaler act column-wise, fitting on the full
    feature matrix and later subsetting by feature-set prefix is equivalent to
    filtering within each feature set.

    Returns (filtered_cols, scalers) where scalers maps a descriptor prefix to a
    fitted StandardScaler.
    """
    filtered_cols = feature_filter(X_train_all, y_train).columns.tolist()
    scalers = {}
    for prefix in config.DESCRIPTOR_PREFIXES:
        cols = [c for c in filtered_cols if c.startswith(prefix)]
        if cols:
            scalers[prefix] = StandardScaler().fit(X_train_all[cols])
    return filtered_cols, scalers


def apply_filter_scale(X_all, filtered_cols, scalers):
    """Select `filtered_cols` and apply already-fitted descriptor `scalers`."""
    X = X_all[filtered_cols].copy()
    for prefix, scaler in scalers.items():
        cols = [c for c in X.columns if c.startswith(prefix)]
        if cols:
            X[cols] = scaler.transform(X[cols])
    return X


def scale_features(X_src, X_tgt, prefixes, scalers=None, copy=True):
    """
    • Scalers are fit on X_src (train + internal) and applied to both X_src and
      X_tgt (external and similar held-out sets), which is transform-only.
    • copy=True  : leave the inputs untouched and return transformed copies
      copy=False : transform in place
    """
    if copy:
        X_src, X_tgt = X_src.copy(), X_tgt.copy()

    scalers = scalers or {}
    scaled_cols = []

    for p in prefixes:
        cols = [c for c in X_src.columns if c.startswith(p)]
        if not cols:
            continue
        scaler = scalers.setdefault(p, StandardScaler().fit(X_src[cols]))
        X_src[cols] = scaler.transform(X_src[cols])
        X_tgt[cols] = scaler.transform(X_tgt[cols])
        scaled_cols += cols

    return X_src, X_tgt, scalers, scaled_cols


def standardize_smiles_molvs(smiles: str) -> str:
    s = Standardizer()
    parent_smiles = None
    mol = None
    if smiles is not None:
        try:
            mol = Chem.MolFromSmiles(smiles)
            parent_mol = s.standardize(mol)
            parent_smiles = Chem.MolToSmiles(parent_mol)
            return parent_smiles
        except:
            return None
    else:
        return None


def smiles_to_inchi(smiles):
    try:
        mol = Chem.MolFromSmiles(smiles)
        return inchi.MolToInchi(mol) if mol else None
    except Exception:
        return None


def deduplicate_by_species(df, species):
    class_col = f"{species}_class"
    df_species = df[
        (~df[class_col].isna()) & (df[class_col].str.lower() != "missing")
    ].copy()

    dedup = []
    conflict = []
    duplication = []

    for _, group in df_species.groupby("InChI"):
        if pd.isna(group["InChI"].iloc[0]):
            continue
        classes = group[class_col].dropna().unique()
        if len(classes) == 1:
            dedup.append(group.iloc[0])
            if len(group) > 1:
                group = group.copy()
                group["duplication_reason"] = "same_inchi_same_class"
                duplication.append(group)
        else:
            group = group.copy()
            group["conflict_reason"] = "class_conflict"
            conflict.append(group)

    return (
        pd.DataFrame(dedup),
        pd.concat(conflict) if conflict else pd.DataFrame(),
        pd.concat(duplication) if duplication else pd.DataFrame(),
    )


def bemis_murcko_scaffold(smiles, include_chirality=config.SCAFFOLD_INCLUDE_CHIRALITY):
    """Return the Bemis-Murcko scaffold SMILES for a molecule.

    Acyclic molecules (no ring system) yield an empty string and are therefore
    grouped together. Invalid/None SMILES also yield "" so they never silently
    leak across splits as distinct groups.
    """
    if not smiles:
        return ""
    try:
        return MurckoScaffold.MurckoScaffoldSmiles(smiles=smiles, includeChirality=include_chirality)
    except Exception:
        return ""


def scaffold_split(smiles_list, frac_train, frac_internal, frac_external):
    """Deterministic Bemis-Murcko scaffold split into train/internal/external.

    Molecules sharing a scaffold always land in the same split. Scaffold groups
    are assigned largest-first so common scaffolds populate the training set,
    following the standard DeepChem/Chemprop scaffold-split convention. Returns
    three lists of positional indices into `smiles_list`.
    """
    total = frac_train + frac_internal + frac_external
    if not abs(total - 1.0) < 1e-6:
        raise ValueError(f"Split fractions must sum to 1.0, got {total}")

    # group molecule indices by scaffold
    scaffold_to_indices = {}
    for i, smi in enumerate(smiles_list):
        scaffold_to_indices.setdefault(bemis_murcko_scaffold(smi), []).append(i)

    # largest scaffold sets first (tie-break on first index for determinism)
    scaffold_sets = sorted(
        scaffold_to_indices.values(), key=lambda idxs: (len(idxs), -idxs[0]), reverse=True
    )

    n = len(smiles_list)
    train_cutoff = frac_train * n
    internal_cutoff = (frac_train + frac_internal) * n

    train_idx, internal_idx, external_idx = [], [], []
    for idx_set in scaffold_sets:
        if len(train_idx) + len(idx_set) > train_cutoff:
            if len(train_idx) + len(internal_idx) + len(idx_set) > internal_cutoff:
                external_idx.extend(idx_set)
            else:
                internal_idx.extend(idx_set)
        else:
            train_idx.extend(idx_set)

    return train_idx, internal_idx, external_idx


def _fps_to_dataframe(fps, prefix, n_bits):
    """Convert a list of RDKit bit-vector fingerprints to a 0/1 column DataFrame.

    Uses RDKit's vectorized ConvertToNumpyArray instead of per-bit indexing,
    which is much faster for large fingerprints.
    """
    arr = np.zeros((len(fps), n_bits), dtype=np.uint8)
    for i, fp in enumerate(fps):
        DataStructs.ConvertToNumpyArray(fp, arr[i])
    cols = [f"{prefix}_{i + 1}" for i in range(n_bits)]
    return pd.DataFrame(arr, columns=cols)


# Create processing function
def process_feature_generation(df, species, split_name, n_bits=2048):
    df = df.reset_index(drop=True)

    # convert smiles to mol objects
    mols = [Chem.MolFromSmiles(smi) for smi in df["Standardized_SMILES"]]

    # Fingerprints (Morgan / RDKit / AtomPair / Avalon)
    mfgen = rdFingerprintGenerator.GetMorganGenerator(radius=2, fpSize=n_bits)
    rdkgen = rdFingerprintGenerator.GetRDKitFPGenerator(fpSize=n_bits)
    apgen = rdFingerprintGenerator.GetAtomPairGenerator(fpSize=n_bits)

    df_morgan = _fps_to_dataframe([mfgen.GetFingerprint(m) for m in mols], "morgan_fp_2048", n_bits)
    df_rdkit_fp = _fps_to_dataframe([rdkgen.GetFingerprint(m) for m in mols], "rdkit_fp_2048", n_bits)
    df_atompair = _fps_to_dataframe([apgen.GetFingerprint(m) for m in mols], "atompair_fp_2048", n_bits)
    df_avalon = _fps_to_dataframe([pyAvalonTools.GetAvalonFP(m, nBits=n_bits) for m in mols], "avalon_fp_2048", n_bits)

    # RDKit 2D descriptors
    calc_rdkit = MolecularDescriptorCalculator([x[0] for x in Chem.Descriptors._descList])
    rdkit_names = ["rdkit_ds_" + name for name in calc_rdkit.GetDescriptorNames()]
    df_rdkit_ds = pd.DataFrame(
        [calc_rdkit.CalcDescriptors(Chem.AddHs(mol)) for mol in mols],
        columns=rdkit_names,
    )

    # Mordred descriptors (parallelized across available cores)
    calc_mordred = Calculator(descriptors, ignore_3D=True)
    df_mordred_ds = calc_mordred.pandas(mols, nproc=config.num_cores(), quiet=True)
    mordred_numeric = df_mordred_ds.select_dtypes(include="number").copy()
    mordred_numeric.columns = ["mordred_ds_" + col for col in mordred_numeric.columns]
    mordred_numeric = mordred_numeric.reset_index(drop=True)

    # Merge metadata + all feature blocks
    df_features = pd.concat(
        [df, df_morgan, df_rdkit_fp, df_atompair, df_avalon, df_rdkit_ds, mordred_numeric],
        axis=1,
    )

    # Save
    out_dir = f"{config.FEATURE_GENERATION_DIR}/{species}"
    os.makedirs(out_dir, exist_ok=True)
    df_features.to_csv(f"{out_dir}/{species}_{split_name}_all_features.csv", index=False)

    # Write profile
    info = f"""
    Data Profile:
    - Species: {species}
    - Split: {split_name}
    - Data number: {df.shape[0]}
    - Morgan 2048 FP: {df_morgan.shape[1]}
    - RDKit 2048 FP: {df_rdkit_fp.shape[1]}
    - Atompair 2048 FP: {df_atompair.shape[1]}
    - Avalon 2048 FP: {df_avalon.shape[1]}
    - RDKit 2D DS: {df_rdkit_ds.shape[1]}
    - Mordred DS: {mordred_numeric.shape[1]}
    """
    with open(f"{out_dir}/{species}_{split_name}_feature_profile.txt", "w") as f:
        f.write(info.strip())

    print(f"{species} - {split_name} processed.")


def extract_feature_importance(estimator):
    """
    Safely extract feature_importances_ from potentially wrapped estimators
    (e.g., inside Pipeline, Bagging, or nested estimators).

    Returns:
        np.ndarray or None
    """
    # Step 1: Pipeline unwrap (e.g., from sklearn/imbalanced-learn pipelines)
    if hasattr(estimator, "steps"):  # pipeline object
        try:
            estimator = estimator.steps[-1][1]  # get the final estimator
        except Exception as e:
            print("⚠️ Failed to unwrap pipeline:", e)
            return None

    # Step 2: Recursively unwrap estimators to get to the core model
    visited = set()
    while True:
        if hasattr(estimator, "feature_importances_"):
            return estimator.feature_importances_

        # try known wrapper attributes
        for attr in ["base_estimator_", "estimator_", "model_"]:
            if hasattr(estimator, attr) and id(getattr(estimator, attr)) not in visited:
                visited.add(id(estimator))
                estimator = getattr(estimator, attr)
                break
        else:
            break  # no more unwraps available

    # Step 3: If nothing worked, return None
    return None


def get_feature_importance_values(model, X_val, y_val, random_state=config.RANDOM_STATE):
    import numpy as np
    from sklearn.inspection import permutation_importance

    def _safe_permutation_importance(model, X, y):
        print("🔁 Using permutation importance (fallback)")
        try:
            result = permutation_importance(
                model,
                X,
                y,
                n_repeats=5,
                random_state=random_state,
                n_jobs=4,
                scoring="balanced_accuracy",
            )
            return result.importances_mean
        except Exception as e:
            print(f"⚠️ Permutation importance failed: {e}")
            return np.zeros(X.shape[1])

    # 1. Ordinary models that expose importances directly (XGBoost, RandomForest, ...)
    if hasattr(model, "feature_importances_"):
        print("✅ Using model.feature_importances_")
        return model.feature_importances_

    # 2. BalancedBaggingClassifier
    elif hasattr(model, "estimators_"):
        print("🔁 Averaging feature importances from bagged estimators")
        importances = [
            imp
            for est in model.estimators_
            if (imp := get_feature_importance_values(est, X_val, y_val, random_state))
            is not None
        ]
        return np.mean(importances, axis=0) if importances else np.zeros(X_val.shape[1])

    # 3. Wrapper whose inner estimator exposes feature_importances_
    elif hasattr(model, "estimator_") and hasattr(
        model.estimator_, "feature_importances_"
    ):
        print("✅ Using model.estimator_.feature_importances_")
        return model.estimator_.feature_importances_

    # 4. Everything else (DNN, Chemprop wrappers, ...) -- fall back to permutation importance
    elif hasattr(model, "predict") and hasattr(model, "predict_proba"):
        return _safe_permutation_importance(model, X_val, y_val)

    # 5. Nothing applies -- fill with zeros
    else:
        print("⚠️ Model type not supported for feature importance")
        return np.zeros(X_val.shape[1])


def save_external_predictions(
    species: str,
    algorithm: str,
    sampling: str,
    alias_name: str,
    param_set: int,
    samples: pd.Series,
    smiles: pd.Series,
    true_labels: pd.Series,
    pred_labels: np.ndarray,
    pred_probs: np.ndarray,
    pred_dir: str,
):
    """Save external set predictions (labels & probabilities) to a CSV file."""
    ext_pred_dir = f"{pred_dir}"
    os.makedirs(ext_pred_dir, exist_ok=True)

    df_pred = pd.DataFrame(
        {
            "Sample": samples.values,
            "SMILES": smiles.values,
            "TrueLabel": true_labels.values,
            "PredLabel": pred_labels,
            "PredProb": pred_probs,
        }
    )
    fname = f"{species}_{algorithm}_{sampling}_{alias_name}_params_{param_set}_external_predictions.csv"
    pred_path = os.path.join(ext_pred_dir, fname)
    df_pred.to_csv(pred_path, index=False)
    print(f"📈 Saved external predictions to: {pred_path}")
