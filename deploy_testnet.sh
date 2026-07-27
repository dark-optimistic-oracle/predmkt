#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
cd "$SCRIPT_DIR"

if [[ ! -f .env ]]; then
  echo "Create .env from .env.example before deploying."
  exit 1
fi

. ./.env

if [[ "${NETWORK:-}" != "testnet" || -z "${PRIVATE_KEY:-}" || -z "${PROTOCOL_ADMIN:-}" ]]; then
  echo "Set NETWORK=testnet, PRIVATE_KEY, and PROTOCOL_ADMIN in .env."
  exit 1
fi

TESTNET_ENDPOINT="${TESTNET_ENDPOINT:-https://api.explorer.provable.com/v1}"
DEV_ADMIN="aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px"

if [[ "$PROTOCOL_ADMIN" == "$DEV_ADMIN" ]]; then
  echo "Refusing Testnet deployment with the public local-development administrator."
  exit 1
fi

for source in \
  contracts/oracle/src/main.leo \
  contracts/prediction-market/src/main.leo \
  contracts/token-registry-workaround/src/main.leo; do
  if rg -q "$DEV_ADMIN" "$source"; then
    echo "Refusing Testnet deployment: ${source} still uses the public development administrator."
    echo "Replace every checked-in @admin address with ${PROTOCOL_ADMIN} first."
    exit 1
  fi
done

REGISTRY_STATUS="$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 \
  "${TESTNET_ENDPOINT}/testnet/program/token_registry.aleo")"
if [[ "$REGISTRY_STATUS" != "200" ]]; then
  echo "Canonical token_registry.aleo is unavailable on Testnet (HTTP ${REGISTRY_STATUS})."
  echo "The local workaround will not be deployed to public Testnet."
  exit 1
fi

./contracts/build_all.sh

deploy_or_upgrade() {
  local program_id="$1"
  local path="$2"
  shift 2
  local status
  status="$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 \
    "${TESTNET_ENDPOINT}/testnet/program/${program_id}")"

  if [[ "$status" == "200" ]]; then
    echo "Upgrading ${program_id}..."
    leo upgrade \
      --yes \
      --broadcast \
      --network testnet \
      --endpoint "$TESTNET_ENDPOINT" \
      --private-key "$PRIVATE_KEY" \
      --network-retries 5 \
      --max-wait 30 \
      --blocks-to-check 100 \
      --path "$path" \
      "$@"
  elif [[ "$status" == "404" ]]; then
    echo "Deploying ${program_id}..."
    leo deploy \
      --yes \
      --broadcast \
      --network testnet \
      --endpoint "$TESTNET_ENDPOINT" \
      --private-key "$PRIVATE_KEY" \
      --network-retries 5 \
      --max-wait 30 \
      --blocks-to-check 100 \
      --path "$path" \
      "$@"
  else
    echo "Unable to determine ${program_id} state (HTTP ${status})."
    exit 1
  fi

  DEPLOY_ACTION="$([[ "$status" == "200" ]] && echo upgrade || echo deploy)"
}

deploy_or_upgrade "dark_optimistic_oracle.aleo" "contracts/oracle"
ORACLE_ACTION="$DEPLOY_ACTION"

if [[ "$ORACLE_ACTION" == "deploy" ]]; then
  echo "Initializing the DOOR token in the canonical Testnet registry..."
  leo execute initialize \
    --yes \
    --broadcast \
    --network testnet \
    --endpoint "$TESTNET_ENDPOINT" \
    --private-key "$PRIVATE_KEY" \
    --network-retries 5 \
    --max-wait 30 \
    --blocks-to-check 100 \
    --path contracts/oracle
fi

deploy_or_upgrade \
  "doo_prediction_market.aleo" \
  "contracts/prediction-market" \
  --skip dark_optimistic_oracle.aleo

echo "Testnet deployment or upgrade completed."
