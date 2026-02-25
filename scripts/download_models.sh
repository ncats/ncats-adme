#!/usr/bin/env bash
#
# Download ADME models from the NCATS server.
# Usage:
#   bash scripts/download_models.sh [--output-dir ./models]
#
set -euo pipefail

BASE_URL="https://opendata.ncats.nih.gov/public/adme/models/current"
OUTPUT_DIR="./models"

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --output-dir)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        *)
            echo "Unknown argument: $1" >&2
            exit 1
            ;;
    esac
done

echo "Downloading ADME models to: $OUTPUT_DIR"

# download_file <remote_path> <local_subpath>
download_file() {
    local remote_path="$1"
    local local_subpath="$2"
    local dest="${OUTPUT_DIR}/${local_subpath}"

    mkdir -p "$(dirname "$dest")"
    echo "  Downloading ${local_subpath}..."
    curl --fail --silent --show-error --retry 3 --retry-all-errors --location -o "$dest" "${BASE_URL}/${remote_path}"
}

# --- Biweekly models (retrained regularly) ---
echo ""
echo "=== Biweekly models ==="
download_file "biweekly/rlm/gcnn_model.ckpt"        "rlm/gcnn_model.ckpt"
download_file "biweekly/pampa/gcnn_model.ckpt"       "pampa/gcnn_model.ckpt"
download_file "biweekly/solubility/gcnn_model.ckpt"  "solubility/gcnn_model.ckpt"

# --- Static models (fixed) ---
echo ""
echo "=== Static models ==="
download_file "static/hlm/model.pkl"            "hlm/model.pkl"
download_file "static/liver_cytosol/model.pkl"  "liver_cytosol/model.pkl"
download_file "static/mlc/model.pkl"            "mlc/model.pkl"
download_file "static/rlc/model.pkl"            "rlc/model.pkl"
download_file "static/pampa50/gcnn_model.ckpt"  "pampa50/gcnn_model.ckpt"
download_file "static/pampabbb/gcnn_model.ckpt" "pampabbb/gcnn_model.ckpt"

# --- CYP450 models (ZIP download + extract) ---
echo ""
echo "=== CYP450 models ==="
mkdir -p "${OUTPUT_DIR}/cyp450"

echo "  Downloading cyp450_inhib.zip..."
curl --fail --silent --show-error --retry 3 --retry-all-errors --location \
    -o "${OUTPUT_DIR}/cyp450/cyp450_inhib.zip" \
    "${BASE_URL}/static/cyp450/cyp450_inhib.zip"
echo "  Extracting cyp450_inhib.zip..."
unzip -q -o "${OUTPUT_DIR}/cyp450/cyp450_inhib.zip" -d "${OUTPUT_DIR}/cyp450/"
rm "${OUTPUT_DIR}/cyp450/cyp450_inhib.zip"

echo "  Downloading cyp450_subs.zip..."
curl --fail --silent --show-error --retry 3 --retry-all-errors --location \
    -o "${OUTPUT_DIR}/cyp450/cyp450_subs.zip" \
    "${BASE_URL}/static/cyp450/cyp450_subs.zip"
echo "  Extracting cyp450_subs.zip..."
unzip -q -o "${OUTPUT_DIR}/cyp450/cyp450_subs.zip" -d "${OUTPUT_DIR}/cyp450/"
rm "${OUTPUT_DIR}/cyp450/cyp450_subs.zip"

echo ""
echo "All models downloaded successfully to: $OUTPUT_DIR"
