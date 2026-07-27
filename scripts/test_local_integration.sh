#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h}"
ENV_FILE="${ENV_FILE:-${PROJECT_ROOT}/.env.devnet}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing ${ENV_FILE}. Copy .env.devnet.example and add local credentials."
  exit 1
fi

set -a
. "$ENV_FILE"
set +a

ENDPOINT="${ENDPOINT:-http://localhost:3030}"
API_NETWORK="${API_NETWORK:-testnet}"
if [[ -z "${PRIVATE_KEY:-}" ]]; then
  echo "PRIVATE_KEY is required."
  exit 1
fi

for program_id in token_registry.aleo dark_optimistic_oracle.aleo doo_prediction_market.aleo; do
  if [[ "$(curl -sS -o /dev/null -w '%{http_code}' "${ENDPOINT}/${API_NETWORK}/program/${program_id}")" != "200" ]]; then
    echo "${program_id} is not deployed at ${ENDPOINT}. Run deploy_local_devnet.sh first."
    exit 1
  fi
done

TEST_HOME="$(mktemp -d "${TMPDIR:-/tmp}/doo-predmkt-integration.XXXXXX")"
cleanup() {
  rm -rf "$TEST_HOME"
}
trap cleanup EXIT INT TERM

current_height() {
  curl -fsS "${ENDPOINT}/${API_NETWORK}/block/height/latest"
}

advance_to() {
  local target_height="$1"
  local height_now
  height_now="$(current_height)"
  if (( height_now < target_height )); then
    leo devnode advance "$((target_height - height_now))" \
      --socket-addr "${ENDPOINT#http://}" >/dev/null
  fi
}

run_execution() {
  local step_name="$1"
  local contract_path="$2"
  local function_name="$3"
  shift 3
  local execution_output
  execution_output="$(leo execute "$function_name" "$@" \
    --yes \
    --broadcast \
    --network testnet \
    --devnet \
    --endpoint "$ENDPOINT" \
    --private-key "$PRIVATE_KEY" \
    --max-wait 10 \
    --blocks-to-check 100 \
    --home "$TEST_HOME" \
    --no-local \
    --path "$contract_path" 2>&1)"
  if [[ "$execution_output" != *"Execution confirmed!"* ]]; then
    echo "$execution_output"
    echo "${step_name} was not confirmed."
    exit 1
  fi
  echo "${step_name} confirmed."
}

start_height="$(current_height)"
base_id="$((start_height * 1000 + 101))"
market_id="${base_id}field"
question_hash="$((base_id + 1))field"
yes_claim_hash="$((base_id + 2))field"
no_claim_hash="$((base_id + 3))field"
assertion_id="$((base_id + 4))field"
yes_token_id="$((base_id + 5))field"
no_token_id="$((base_id + 6))field"
betting_deadline="$((start_height + 3))"

market="{
  id: ${market_id},
  question_hash: ${question_hash},
  yes_claim_hash: ${yes_claim_hash},
  no_claim_hash: ${no_claim_hash},
  assertion_id: ${assertion_id},
  yes_token_id: ${yes_token_id},
  no_token_id: ${no_token_id},
  yes_token_name: 585044u128,
  no_token_name: 20047u128,
  yes_token_symbol: 585044u128,
  no_token_symbol: 20047u128,
  betting_deadline_block_height: ${betting_deadline}u32
}"

run_execution \
  "Create market" \
  "$PROJECT_ROOT/contracts/prediction-market" \
  create_market \
  "$market" \
  1000000u64

advance_to "$((betting_deadline + 1))"
report_height="$(current_height)"
dispute_deadline="$((report_height + 11))"
voting_deadline="$((dispute_deadline + 10))"
assertion="{
  id: ${assertion_id},
  title: ${market_id},
  content_hash: ${yes_claim_hash},
  cost: 1000u128,
  voter_stake: 100u128,
  dispute_deadline_block_height: ${dispute_deadline}u32,
  voting_deadline_block_height: ${voting_deadline}u32
}"

run_execution \
  "Create post-close assertion" \
  "$PROJECT_ROOT/contracts/oracle" \
  create_assertion \
  "$assertion"

advance_to "$((dispute_deadline + 1))"
run_execution \
  "Settle undisputed YES market" \
  "$PROJECT_ROOT/contracts/prediction-market" \
  settle_market \
  "$market_id" \
  "$assertion_id" \
  true \
  "$yes_claim_hash" \
  true \
  "${betting_deadline}u32"

run_execution \
  "Redeem complete winning supply" \
  "$PROJECT_ROOT/contracts/prediction-market" \
  redeem_winning_tokens \
  "$market_id" \
  "$yes_token_id" \
  1000000u128 \
  2000000u64

resolved="$(curl -fsS "${ENDPOINT}/${API_NETWORK}/program/doo_prediction_market.aleo/mapping/resolved/${market_id}")"
resolution="$(curl -fsS "${ENDPOINT}/${API_NETWORK}/program/doo_prediction_market.aleo/mapping/resolutions/${market_id}")"
collateral="$(curl -fsS "${ENDPOINT}/${API_NETWORK}/program/doo_prediction_market.aleo/mapping/collateral_pool/${market_id}")"

if [[ "$resolved" != '"true"' || "$resolution" != '"true"' || "$collateral" != '"0u128"' ]]; then
  echo "Unexpected final state: resolved=${resolved}, resolution=${resolution}, collateral=${collateral}"
  exit 1
fi

echo "Local integration lifecycle passed: create, report, wait, settle, and redeem."
