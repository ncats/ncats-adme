# Species-specific cytosolic metabolic stability models — reproduction package

Supporting material for *"Advancements in Forecasting Liver Cytosol Metabolic Stability: A
Comprehensive Update on Machine Learning Predictive Models"* (Lim, Jain, Xu, Shah).

This package contains the **data split assignments**, the **preprocessing and modeling code**, and
the **trained final models** for the human, mouse, and rat cytosolic metabolic stability
classifiers reported in the manuscript.

## Why chemical structures are not included

The compounds in this dataset are subject to ongoing patent considerations, so **no chemical
structures (SMILES, InChI, InChIKey) and no molecular feature matrices are released here**. Every
table in this package is keyed by the internal compound identifier only.

Compound identifiers are anonymised for the same reason. The registry numbers used internally
during the study resolve to structures through public NCATS and PubChem records, so every compound
is released under an opaque `CPD-*` identifier instead. The same compound carries the same
identifier in all three species files, so cross-species comparisons remain possible.

The `data_source` column still separates compounds carried over from our previous study
(Shah *et al.*, *J Cheminform* 2020;12:21) — 1227 of the 2971 human and 1229 of the 2856 mouse
compounds, whose structures are openly available in that article's supplementary data — from those
measured for this work. The rat dataset is entirely new.

## Contents

```
.
├── README.md
├── environment.yml                    # conda environment (python 3.10, scikit-learn 1.7.2)
├── predict_cytosol_stability.py       # predict from SMILES (human and mouse)
├── split_assignments/
│   └── {Human,Mouse,Rat}.csv          # per-compound split, CV fold, and label
├── code/
│   ├── config.py                      # all shared settings (paths, feature sets, search space)
│   ├── pipeline_common.py             # standardization, scaffold split, filtering/scaling, training
│   ├── step1_data_preparation.py      # curation, deduplication, scaffold split, CV fold assignment
│   ├── step2_feature_generation.py    # descriptors and fingerprints
│   ├── step3_feature_filtering_scaling.py
│   ├── step4_model_development.py     # cross-validation over sampling × algorithm × feature set
│   ├── step5_hyperparameter_optimization.py
│   └── README.md                      # how the five steps chain together
└── models/
    └── {Human,Mouse,Rat}/
        ├── final_model.pkl            # {model, feature_cols, threshold, algorithm, feature_set, …}
        ├── model_card.json            # metadata + published external-test metrics
        └── scalers.pkl                # Mouse only — see "Using a model"
```

## Split assignments

`split_assignments/{species}.csv` lists every compound in that species' curated dataset:

| Column | Description |
|---|---|
| `compound_id` | anonymised compound identifier, shared across the three species files |
| `split` | `train` / `internal_test` / `external_test` — the 8:1:1 Bemis–Murcko scaffold split |
| `cv_fold` | scaffold-grouped 5-fold CV assignment (0–4); empty for the held-out sets |
| `half_life_min` | measured depletion half-life in minutes |
| `class` | `Stable` (t½ > 30 min) or `Unstable` (t½ ≤ 30 min) |
| `binary_class` | `0` = Stable, `1` = Unstable — the modeling target |
| `data_source` | `Old` = from the previous publication, `New` = added in this work |

Row counts, matching the manuscript:

| Species | Total | Train | Internal test | External test | Stable | Unstable |
|---|---|---|---|---|---|---|
| Human | 2971 | 2376 | 297 | 298 | 2550 | 421 |
| Mouse | 2856 | 2284 | 286 | 286 | 2612 | 244 |
| Rat | 1198 | 958 | 120 | 120 | 1139 | 59 |

One `compound_id` appears twice in each species file (two forms of the same registered compound,
carrying identical measurements); both rows are retained so that the totals match the manuscript.

Rows are ordered by `compound_id`, which is assigned by a seeded shuffle, so neither the identifier
numbering nor the row order encodes acquisition order or data source.

## Final models

| Species | Algorithm | Feature set | Threshold | BACC | SEN | SPE | AUC | MCC |
|---|---|---|---|---|---|---|---|---|
| Human | LGBM (stratified bagging, 64 bags) | Avalon FP (1535 bits) | 0.552 | 0.812 | 0.724 | 0.900 | 0.883 | 0.595 |
| Mouse | RF (stratified bagging, 32 bags) | Consensus, all features (6461) | 0.530 | 0.658 | 0.556 | 0.761 | 0.727 | 0.208 |
| Rat | SVM-RBF (stratified bagging, 16 bags) | RDKit descriptors (166) | 0.529 | 0.724 | 0.714 | 0.735 | 0.886 | 0.231 |

Task: binary classification of cytosolic metabolic stability (0 = Stable, 1 = Unstable). Full
hyperparameters and the complete external-test metrics are in each `model_card.json`.

### Using a model

`predict_cytosol_stability.py` takes SMILES directly and does the standardization, feature
generation, and thresholding for you:

```bash
python predict_cytosol_stability.py --species Human "CC(=O)Oc1ccccc1C(=O)O"
python predict_cytosol_stability.py --species Mouse "CCO" "c1ccccc1O"
```

```
Human cytosolic stability (LGBM / avalon_fp_2048, threshold=0.5516)

               SMILES   Standardized_SMILES  P(Unstable) Prediction
CC(=O)Oc1ccccc1C(=O)O CC(=O)Oc1ccccc1C(=O)O       0.1246     Stable
```

Or load a model directly:

```python
import joblib
bundle = joblib.load("models/Human/final_model.pkl")
model, feature_cols, thr = bundle["model"], bundle["feature_cols"], bundle["threshold"]

proba = model.predict_proba(X[feature_cols])[:, 1]   # P(Unstable)
pred  = (proba >= thr).astype(int)                   # 1 = Unstable
```

`X` must be built exactly as in `code/step2_feature_generation.py`, and descriptor columns must be
standardized with the matching `scalers.pkl`, or the predictions will be meaningless.

**Why only human and mouse.** The human model uses Avalon fingerprint bits alone, so it needs no
scaling and is self-contained. The mouse model additionally uses RDKit and Mordred descriptors, and
the scalers fitted for them ship in `models/Mouse/scalers.pkl`. The rat model is built on
standardized RDKit descriptors, but it is a support-vector ensemble: releasing its scaler together
with the stored support vectors would expose absolute descriptor values for individual training
compounds, which the patent position on those structures does not permit. The rat model is therefore
distributed for reproduction only. For rat predictions on new structures, use ADME@NCATS
(https://opendata.ncats.nih.gov/adme), which runs the models server-side.

**Versions matter.** The pickles are scikit-learn version specific — use `environment.yml`
(scikit-learn 1.7.2); loading under a different version may fail or change behavior. Fingerprint
features are stable across RDKit versions, so human predictions are reproducible exactly. Mouse
predictions depend on RDKit and Mordred descriptor implementations and can drift by roughly 0.001 in
predicted probability across versions, which is far below the decision threshold's margin but not
bit-identical.

## Reproducing the analyses

The modeling pipeline runs from the raw measurement table, which is not included here. With that
table in place (`progress/0_raw_data/pipeline_inputs/`, schema
`Sample, {species}_HL, {species}_class, {species}_status`), the manuscript results regenerate as:

```bash
conda env create -f environment.yml
conda activate cytosol
python code/step1_data_preparation.py            # -> curated data + the splits in split_assignments/
python code/step2_feature_generation.py
python code/step3_feature_filtering_scaling.py
python code/step4_model_development.py           # cross-validation (Figure 4, Table S5)
python code/step5_hyperparameter_optimization.py # final models (Table 1)
```

Steps 4 and 5 are the expensive ones and are resumable: combinations already present in the
per-species output files are skipped on restart. `step1` is deterministic given the raw table
(`RANDOM_STATE = 42` in `config.py`) and regenerates exactly the split and fold assignments
distributed in `split_assignments/`, which lets the splits be verified independently.

Without the raw table, the released `final_model.pkl` files can still be applied to any external
compound set to check the models' behavior directly.

## Note on model contents

The pickled models contain fitted parameters, not the training table. One exception is worth
stating plainly: the rat model is an SVM ensemble, and an SVM stores its support vectors, so
`models/Rat/final_model.pkl` embeds 505 unique 166-dimensional **standardized** RDKit descriptor
vectors belonging to training compounds. The fitted scaler is not distributed, so these cannot be
converted back to absolute descriptor values, and no structures can be read from them.

## Citation

> Lim G, Jain S, Xu X, Shah P. Advancements in Forecasting Liver Cytosol Metabolic Stability:
> A Comprehensive Update on Machine Learning Predictive Models. *Bioinformatics Advances* (in press).

Previous human model, and the source of the compounds marked `Old` in `data_source`:

> Shah P, Siramshetty VB, Zakharov AV, Southall NT, Xu X, Nguyen DT. Predicting liver cytosol
> stability of small molecules. *J Cheminform* 2020;12(1):21.

## Contact

Pranav Shah — pranav.shah@nih.gov
National Center for Advancing Translational Sciences (NCATS), National Institutes of Health
