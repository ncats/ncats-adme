# Cytosol stability pipeline

Rebuild scripts that regenerate `../progress/` from the raw dataset. Run in order with the `cytosol`
conda environment. Each script adds the project root to `sys.path` and `chdir`s to it, so it can be
launched from anywhere; outputs still land under `../progress/`.

| # | Script | Produces (`progress/…`) |
|---|--------|--------------------------|
| 1 | `step1_data_preparation.py`   | `1_curated_data/{species}/`, `2_data_splits/{species}/` (+ `cv_fold_assignment.csv`) |
| 2 | `step2_feature_generation.py`     | `3_feature_generation/` |
| 3 | `step3_feature_filtering_scaling.py` | `4_feature_filters_scalers/`, `5_final_feature_sets/` |
| 4 | `step4_model_development.py`       | `6_cross_validation/cv_results_summary.csv` |
| 5 | `step5_hyperparameter_optimization.py`  | `7_hyperparameter_optimization/{species}/` (final_model + predictions + summary) |

- `pipeline_common.py` — shared helpers imported by all steps (formerly `functions_for_cytosol.py`):
  `standardize_smiles_molvs`, `scaffold_split`, `bemis_murcko_scaffold`, `process_feature_generation`,
  `fit_filter_scale`, `apply_filter_scale`, `train_model`, …
- `config.py` — all shared settings (paths, species, feature sets, hyperparameters). Kept at the
  **project root** so the analysis folders under `progress/8_analysis/` import it too.

```bash
conda activate cytosol
python pipeline/step1_data_preparation.py
python pipeline/step2_feature_generation.py
python pipeline/step3_feature_filtering_scaling.py
python pipeline/step4_model_development.py
python pipeline/step5_hyperparameter_optimization.py
```

Steps 4-5 are the heavy ones. They run every combination **sequentially**: step 4 writes one CV
result file per species/feature_set under `6_cross_validation/{species}/{feature_set}.csv` and merges
them into `cv_results_summary.csv`; step 5 writes `7_hyperparameter_optimization/{species}/summary.csv`
per species and merges them into `tuning_summary.csv`. Both are **resumable** — combinations already
present in the per-species files are skipped on restart, so a long run can be stopped and continued.
