#!/usr/bin/env bash
set -euo pipefail

LEO_BIN="${LEO_BIN:-leo}"
if ! command -v "$LEO_BIN" >/dev/null 2>&1; then
  echo "Leo is required. Install Leo 4.4.1 or set LEO_BIN to that binary."
  exit 1
fi
LEO_VERSION="$("$LEO_BIN" --version 2>/dev/null | grep -Eo '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
if [[ "$LEO_VERSION" != "4.4.1" ]]; then
  echo "Leo 4.4.1 is required for the current program manifests; found ${LEO_VERSION:-unknown}."
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TEST_HOME="$(mktemp -d "${TMPDIR:-/tmp}/doo-predmkt-leo-tests.XXXXXX")"
cleanup() {
  rm -rf "$TEST_HOME"
}
trap cleanup EXIT INT TERM

ENDPOINT="${ALEO_TEST_ENDPOINT:-https://api.provable.com/v2}"

"$LEO_BIN" --home "$TEST_HOME" test \
  --network testnet \
  --endpoint "$ENDPOINT" \
  --path "$SCRIPT_DIR/oracle"

"$LEO_BIN" --home "$TEST_HOME" test \
  --network testnet \
  --endpoint "$ENDPOINT" \
  --path "$SCRIPT_DIR/prediction-market"

echo "All Leo unit tests passed."
