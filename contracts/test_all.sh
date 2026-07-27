#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h}"
TEST_HOME="$(mktemp -d "${TMPDIR:-/tmp}/doo-predmkt-leo-tests.XXXXXX")"
cleanup() {
  rm -rf "$TEST_HOME"
}
trap cleanup EXIT INT TERM

ENDPOINT="${ALEO_TEST_ENDPOINT:-https://api.provable.com/v2}"

leo --home "$TEST_HOME" test \
  --network testnet \
  --endpoint "$ENDPOINT" \
  --path "$SCRIPT_DIR/oracle"

leo --home "$TEST_HOME" test \
  --network testnet \
  --endpoint "$ENDPOINT" \
  --path "$SCRIPT_DIR/prediction-market"

echo "All Leo unit tests passed."
