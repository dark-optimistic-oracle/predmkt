#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h}"

for contract in token-registry-workaround oracle prediction-market; do
  echo "Building ${contract}..."
  leo build --path "${PROJECT_ROOT}/contracts/${contract}"
done

echo "All Aleo programs compiled successfully."
