#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h}"
NETWORK_NAME="${1:-}"
shift || true

usage() {
  echo "Usage: deploy_{local_devnet|testnet|mainnet}.sh [--dry-run] [--confirm-mainnet]"
  echo "Set ENV_FILE to override the default .env.<network> file."
}

if [[ "$NETWORK_NAME" != "devnet" && "$NETWORK_NAME" != "testnet" && "$NETWORK_NAME" != "mainnet" ]]; then
  usage
  exit 2
fi

DRY_RUN=false
CONFIRM_MAINNET=false
for argument in "$@"; do
  case "$argument" in
    --dry-run)
      DRY_RUN=true
      ;;
    --confirm-mainnet)
      CONFIRM_MAINNET=true
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $argument"
      usage
      exit 2
      ;;
  esac
done

DEFAULT_ENV_FILE="${PROJECT_ROOT}/.env.${NETWORK_NAME}"
ENV_FILE="${ENV_FILE:-$DEFAULT_ENV_FILE}"
if [[ "$ENV_FILE" != /* ]]; then
  ENV_FILE="${PROJECT_ROOT}/${ENV_FILE}"
fi
if [[ -f "$ENV_FILE" ]]; then
  set -a
  . "$ENV_FILE"
  set +a
elif [[ "$DRY_RUN" != "true" ]]; then
  echo "Missing ${ENV_FILE}. Copy the matching example file and add credentials."
  exit 1
fi

LIVE_ENDPOINT="https://api.explorer.provable.com/v1"
DEV_ADMIN="aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px"

case "$NETWORK_NAME" in
  devnet)
    ENDPOINT="${ENDPOINT:-http://localhost:3030}"
    API_NETWORK="${API_NETWORK:-testnet}"
    PROTOCOL_ADMIN="${PROTOCOL_ADMIN:-$DEV_ADMIN}"
    LEO_NETWORK="testnet"
    ;;
  testnet)
    ENDPOINT="${TESTNET_ENDPOINT:-${ENDPOINT:-$LIVE_ENDPOINT}}"
    API_NETWORK="testnet"
    PROTOCOL_ADMIN="${PROTOCOL_ADMIN:-}"
    LEO_NETWORK="testnet"
    ;;
  mainnet)
    ENDPOINT="${MAINNET_ENDPOINT:-${ENDPOINT:-$LIVE_ENDPOINT}}"
    API_NETWORK="mainnet"
    PROTOCOL_ADMIN="${PROTOCOL_ADMIN:-}"
    LEO_NETWORK="mainnet"
    ;;
esac

if [[ "$DRY_RUN" != "true" ]]; then
  if [[ -z "${PRIVATE_KEY:-}" || -z "$PROTOCOL_ADMIN" ]]; then
    echo "PRIVATE_KEY and PROTOCOL_ADMIN are required for a broadcast deployment."
    exit 1
  fi
  if [[ ! "$PROTOCOL_ADMIN" =~ '^aleo1[a-z0-9]{58}$' ]]; then
    echo "PROTOCOL_ADMIN is not a valid Aleo address."
    exit 1
  fi
fi

if [[ "$NETWORK_NAME" != "devnet" && "$DRY_RUN" != "true" && "$PROTOCOL_ADMIN" == "$DEV_ADMIN" ]]; then
  echo "Refusing a public-network deployment with the public development administrator."
  exit 1
fi

if [[ "$NETWORK_NAME" == "mainnet" && "$DRY_RUN" != "true" ]]; then
  if [[ "$CONFIRM_MAINNET" != "true" || "${CONFIRM_MAINNET_DEPLOYMENT:-}" != "I_UNDERSTAND_THIS_BROADCASTS_TO_MAINNET" ]]; then
    echo "Mainnet is locked. Both --confirm-mainnet and the exact confirmation value in .env.mainnet are required."
    exit 1
  fi
fi

for command_name in leo curl rg perl mktemp; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Missing required command: ${command_name}"
    exit 1
  fi
done

if [[ "$DRY_RUN" != "true" ]]; then
  DERIVED_ADMIN="$(leo account import "$PRIVATE_KEY" 2>/dev/null | rg -o 'aleo1[a-z0-9]{58}' | tail -1)"
  if [[ "$DERIVED_ADMIN" != "$PROTOCOL_ADMIN" ]]; then
    echo "PRIVATE_KEY does not control PROTOCOL_ADMIN; refusing deployment."
    exit 1
  fi
fi

DEPLOY_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/doo-predmkt-deploy.XXXXXX")"
cleanup() {
  rm -rf "$DEPLOY_ROOT"
}
trap cleanup EXIT INT TERM

cp -R "${PROJECT_ROOT}/contracts" "$DEPLOY_ROOT/contracts"
mkdir -p "$DEPLOY_ROOT/.aleo"

if [[ -n "$PROTOCOL_ADMIN" ]]; then
  for source_file in \
    "$DEPLOY_ROOT/contracts/oracle/src/main.leo" \
    "$DEPLOY_ROOT/contracts/prediction-market/src/main.leo" \
    "$DEPLOY_ROOT/contracts/token-registry-workaround/src/main.leo"; do
    perl -0pi -e "s/\@admin\\(address\\s*=\\s*\"aleo1[a-z0-9]{58}\"\\)/\@admin(address=\"${PROTOCOL_ADMIN}\")/g" "$source_file"
    if ! rg -q "@admin\\(address=\"${PROTOCOL_ADMIN}\"\\)" "$source_file"; then
      echo "Failed to set the upgrade administrator in ${source_file}."
      exit 1
    fi
  done
fi

program_status() {
  local program_id="$1"
  local response_body="$DEPLOY_ROOT/program-status.txt"
  local response_code
  response_code="$(curl -sS -o "$response_body" -w "%{http_code}" --connect-timeout 5 --max-time 20 \
    "${ENDPOINT}/${API_NETWORK}/program/${program_id}")" || {
      echo "000"
      return
    }
  if [[ "$NETWORK_NAME" == "devnet" && "$response_code" == "500" ]] &&
    rg -q "Missing program for ID ${program_id}" "$response_body"; then
    echo "404"
    return
  fi
  echo "$response_code"
}

if [[ "$NETWORK_NAME" != "devnet" ]]; then
  REGISTRY_STATUS="$(program_status token_registry.aleo)"
  if [[ "$REGISTRY_STATUS" != "200" ]]; then
    echo "Canonical token_registry.aleo is unavailable on ${NETWORK_NAME} (HTTP ${REGISTRY_STATUS})."
    exit 1
  fi
fi

echo "Building deployment source for ${NETWORK_NAME}..."
BUILD_ENDPOINT="$ENDPOINT"
if [[ "$NETWORK_NAME" == "devnet" && "$DRY_RUN" == "true" ]]; then
  # A dry run validates source without requiring a running local node.
  BUILD_ENDPOINT="$LIVE_ENDPOINT"
fi
for contract_name in token-registry-workaround oracle prediction-market; do
  leo --home "$DEPLOY_ROOT/.aleo" build \
    --network "$LEO_NETWORK" \
    --endpoint "$BUILD_ENDPOINT" \
    --path "$DEPLOY_ROOT/contracts/$contract_name"
done

if [[ "$DRY_RUN" == "true" ]]; then
  echo "Dry run complete: all programs compiled; no transaction was signed or broadcast."
  echo "Planned order: token registry (devnet only), oracle, oracle initialization on first deploy, prediction market."
  exit 0
fi
echo "Source validation complete; beginning confirmed ${NETWORK_NAME} transactions."

NETWORK_ARGS=(--network "$LEO_NETWORK")
if [[ "$NETWORK_NAME" == "devnet" ]]; then
  NETWORK_ARGS=(--network "$LEO_NETWORK" --devnet)
  if [[ -n "${CONSENSUS_HEIGHTS:-}" ]]; then
    NETWORK_ARGS+=(--consensus-heights "$CONSENSUS_HEIGHTS")
  fi
fi

COMMON_ARGS=(
  --yes
  --broadcast
  "${NETWORK_ARGS[@]}"
  --endpoint "$ENDPOINT"
  --private-key "$PRIVATE_KEY"
  --network-retries "${NETWORK_RETRIES:-5}"
  --max-wait "${MAX_WAIT:-30}"
  --blocks-to-check "${BLOCKS_TO_CHECK:-100}"
  --home "$DEPLOY_ROOT/.aleo"
)

run_checked() {
  local step_name="$1"
  local success_marker="$2"
  shift 2
  local command_output
  local command_exit
  set +e
  command_output="$("$@" 2>&1)"
  command_exit=$?
  set -e
  echo "$command_output"
  if (( command_exit != 0 )); then
    echo "${step_name} failed with exit code ${command_exit}."
    exit "$command_exit"
  fi
  if [[ "$command_output" == *"Could not find the transaction."* || "$command_output" != *"$success_marker"* ]]; then
    echo "${step_name} did not receive the required confirmation marker: ${success_marker}"
    exit 1
  fi
  echo "${step_name} confirmed."
  return 0
}

DEPLOY_ACTION=""
deploy_or_upgrade() {
  local program_id="$1"
  local package_path="$2"
  shift 2
  local http_code
  http_code="$(program_status "$program_id")"
  if [[ "$http_code" == "200" ]]; then
    DEPLOY_ACTION="upgrade"
    run_checked \
      "Upgrade ${program_id}" \
      "Upgrade confirmed!" \
      leo upgrade "${COMMON_ARGS[@]}" --path "$package_path" "$@"
  elif [[ "$http_code" == "404" ]]; then
    DEPLOY_ACTION="deploy"
    run_checked \
      "Deploy ${program_id}" \
      "Deployment confirmed!" \
      leo deploy "${COMMON_ARGS[@]}" --path "$package_path" "$@"
  else
    echo "Unable to determine ${program_id} state at ${ENDPOINT} (HTTP ${http_code})."
    exit 1
  fi
  return 0
}

initialize_program() {
  local program_name="$1"
  local package_path="$2"
  run_checked \
    "Initialize ${program_name}" \
    "Execution confirmed!" \
    leo execute initialize "${COMMON_ARGS[@]}" --path "$package_path"
}

if [[ "$NETWORK_NAME" == "devnet" ]]; then
  echo "Checking local token_registry.aleo..."
  deploy_or_upgrade token_registry.aleo "$DEPLOY_ROOT/contracts/token-registry-workaround"
  if [[ "$DEPLOY_ACTION" == "deploy" ]]; then
    initialize_program token_registry.aleo "$DEPLOY_ROOT/contracts/token-registry-workaround"
  fi
fi

deploy_or_upgrade \
  dark_optimistic_oracle.aleo \
  "$DEPLOY_ROOT/contracts/oracle" \
  --skip token_registry.aleo
ORACLE_ACTION="$DEPLOY_ACTION"
if [[ "$ORACLE_ACTION" == "deploy" ]]; then
  initialize_program dark_optimistic_oracle.aleo "$DEPLOY_ROOT/contracts/oracle"
fi

deploy_or_upgrade \
  doo_prediction_market.aleo \
  "$DEPLOY_ROOT/contracts/prediction-market" \
  --skip token_registry.aleo \
  --skip dark_optimistic_oracle.aleo

echo "${NETWORK_NAME} deployment or upgrade completed with confirmed transactions."
