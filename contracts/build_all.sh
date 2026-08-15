#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

for contract in token-registry-workaround oracle prediction-market; do
  echo "Building ${contract}..."
  leo build --path "${PROJECT_ROOT}/contracts/${contract}"
done

echo "All Aleo programs compiled successfully."
