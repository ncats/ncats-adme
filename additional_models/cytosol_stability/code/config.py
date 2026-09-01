"""Central configuration for the cytosol stability ML pipeline.

All shared constants (paths, species, feature sets, hyperparameter-search
settings, etc.) live here so the individual pipeline scripts stay free of
duplicated, hardcoded values. Edit this file to change pipeline behavior.
"""

# -- Reproducibility ---------------------------------------------------------
RANDOM_STATE = 42

# -- Parallelism -------------------------------------------------------------
# Worker count for the parallel steps.
N_CORES = 10


def num_cores():
    """Resolved worker count."""
    return N_CORES


# -- Species & target columns ------------------------------------------------
SPECIES_LIST = ["Human", "Mouse", "Rat"]

# Per-species label columns carried alongside the features.
TARGET_SUFFIXES = ["_HL", "_class", "_status"]

# Molecule identity / metadata columns (never treated as features).
ID_COLS = ["Sample", "SMILES", "Standardized_SMILES", "InChI"]


def binary_class_col(species):
    return f"{species}_binary_class"


def non_feature_cols(species):
    """Metadata + label columns for a species (everything that isn't a feature)."""
    return ID_COLS + [f"{species}{suf}" for suf in TARGET_SUFFIXES] + [binary_class_col(species)]


# Mapping used when binarizing the raw class label.
CLASS_TO_BINARY = {"Stable": 0, "Unstable": 1}

# -- Feature sets ------------------------------------------------------------
# name -> column-name prefix
FEATURE_SETS = {
    "morgan_fp_2048": "morgan_fp_2048_",
    "rdkit_fp_2048": "rdkit_fp_2048_",
    "atompair_fp_2048": "atompair_fp_2048_",
    "avalon_fp_2048": "avalon_fp_2048_",
    "rdkit_ds": "rdkit_ds_",
    "mordred_ds": "mordred_ds_",
}

# Combined "all_features" plus each individual set, used during cross-validation.
FEATURE_SET_LIST = ["all_features"] + list(FEATURE_SETS.keys())

# Descriptor feature families that require standard scaling.
DESCRIPTOR_PREFIXES = ["rdkit_ds_", "mordred_ds_"]


def feature_cols(columns):
    """Return the subset of `columns` that are feature columns."""
    prefixes = tuple(FEATURE_SETS.values())
    return [c for c in columns if c.startswith(prefixes)]


# -- Feature filtering thresholds --------------------------------------------
VARIANCE_THRESHOLD = 0.01   # drop near-constant features
CORR_THRESHOLD = 0.9        # drop features too correlated with the target

# -- Algorithms & sampling ---------------------------------------------------
ALGORITHM_LIST = ["rf", "xgb", "lgbm", "svm", "dnn"]
SAMPLING_METHODS = ["stratified_bagging", "none"]

# -- Cross-validation --------------------------------------------------------
N_SPLITS = 5
# Column name carrying the pre-assigned scaffold-grouped CV fold id (set in step 0).
CV_FOLD_COL = "cv_fold"


def cv_fold_assignment_path(species):
    """Per-species file mapping each training molecule to its CV fold."""
    return f"{SPLIT_DATA_DIR}/{species}/cv_fold_assignment.csv"

# -- Train / internal / external split ---------------------------------------
# Splitting strategy. "scaffold" groups molecules by Bemis-Murcko scaffold so
# that no scaffold appears in more than one split (tests generalization to
# novel chemical scaffolds). Cross-validation folds are grouped the same way.
SPLIT_METHOD = "scaffold"

# train : internal : external = 8 : 1 : 1
FRAC_TRAIN = 0.8
FRAC_INTERNAL = 0.1
FRAC_EXTERNAL = 0.1

# Treat stereoisomers as distinct scaffolds when True.
SCAFFOLD_INCLUDE_CHIRALITY = False

# -- Hyperparameter tuning ---------------------------------------------------
# Model family (feature_set + algorithm + sampling) is chosen from the step-3 CV
# results by this metric (higher is better). Selection is CV based, not internal.
TUNING_SELECTION_METRIC = "cv_bacc_mean"
TUNING_TOP_NUM = 1                        # number of top families to tune per species
# Hyperparameters are chosen by scaffold CV (balanced accuracy at 0.5). The internal
# set is reserved for picking the decision threshold, NOT for model selection.
THRESHOLD_METRIC = "balanced_accuracy"   # threshold criterion: "balanced_accuracy"/"youden" (identical), "g_mean", "f1"
TUNING_MAX_CONFIGS = None                # cap grid via random sampling (None = full grid)

# -- Directory layout --------------------------------------------------------
PROGRESS_DIR = "progress"
RAW_DATA_DIR = f"{PROGRESS_DIR}/0_raw_data"
PREPROCESSED_DIR = f"{PROGRESS_DIR}/1_curated_data"
SPLIT_DATA_DIR = f"{PROGRESS_DIR}/2_data_splits"
FEATURE_GENERATION_DIR = f"{PROGRESS_DIR}/3_feature_generation"
INTERMEDIATE_DIR = f"{PROGRESS_DIR}/4_feature_filters_scalers"
FINAL_SETS_DIR = f"{PROGRESS_DIR}/5_final_feature_sets"
CV_DIR = f"{PROGRESS_DIR}/6_cross_validation"
CV_RESULTS_PATH = f"{CV_DIR}/cv_results_summary.csv"
TUNING_DIR = f"{PROGRESS_DIR}/7_hyperparameter_optimization"

# -- Raw input files ---------------------------------------------------------
# The prepared pipeline inputs live under 0_raw_data/pipeline_inputs/ (originals as received are
# kept in 0_raw_data/source_received/, comparison sets in 0_raw_data/comparison/; see PROVENANCE.md).
RAW_INPUTS_DIR = f"{RAW_DATA_DIR}/pipeline_inputs"
RAW_FILES = {
    "original": f"{RAW_INPUTS_DIR}/1_original_raw_data.csv",
    "update_1": f"{RAW_INPUTS_DIR}/2_updated_raw_data.csv",
    "update_2": f"{RAW_INPUTS_DIR}/3_additional_updated_raw_data.csv",
    "external_human": f"{RAW_INPUTS_DIR}/4_external_human_raw_data.csv",
    "external_mouse": f"{RAW_INPUTS_DIR}/5_external_mouse_raw_data.csv",
}

# Raw sources merged to build the modeling dataset.
TRAIN_SOURCES = ["original", "update_1", "update_2", "external_human", "external_mouse"]

# Split file basenames produced by the data-split step.
SPLIT_NAMES = ["train", "internal_test", "external_test"]
