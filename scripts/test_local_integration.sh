#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PUBLIC_ENV_FILE="${PUBLIC_ENV_FILE:-${ENV_FILE:-${PROJECT_ROOT}/.env.devnet}}"
PRIVATE_ENV_FILE="${PRIVATE_ENV_FILE:-${PROJECT_ROOT}/.env.private}"

if [[ ! -f "$PUBLIC_ENV_FILE" ]]; then
  echo "Missing ${PUBLIC_ENV_FILE}. Copy .env.devnet.example."
  exit 1
fi
if [[ ! -f "$PRIVATE_ENV_FILE" ]]; then
  echo "Missing ${PRIVATE_ENV_FILE}. Copy .env.private.example and add local credentials."
  exit 1
fi

set +x
set -a
. "$PUBLIC_ENV_FILE"
. "$PRIVATE_ENV_FILE"
set +a

ENDPOINT="${ENDPOINT:-http://localhost:3030}"
API_NETWORK="${API_NETWORK:-testnet}"
PRIVATE_KEY="${DEVNET_PRIVATE_KEY:-}"
if [[ -z "${PRIVATE_KEY:-}" ]]; then
  echo "DEVNET_PRIVATE_KEY is required in .env.private."
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

wait_until_height() {
  local target_height="$1"
  local timeout_seconds="${2:-600}"
  local started_at="$SECONDS"
  local height_now
  while true; do
    height_now="$(current_height)"
    if (( height_now >= target_height )); then
      return
    fi
    if (( SECONDS - started_at >= timeout_seconds )); then
      echo "Timed out waiting for devnet height ${target_height}; current height is ${height_now}."
      exit 1
    fi
    sleep 2
  done
}

run_execution() {
  local step_name="$1"
  local function_name="$2"
  shift 2
  local execution_output
  local execution_exit
  local transaction_id
  local transaction_body
  set +e
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
    --no-local 2>&1)"
  execution_exit=$?
  set -e
  if (( execution_exit == 0 )) && [[ "$execution_output" == *"Execution confirmed!"* ]]; then
    echo "${step_name} confirmed."
    return
  fi

  transaction_id="$(
    printf '%s\n' "$execution_output" |
      grep -Eo 'at1[[:alnum:]]+' |
      head -n 1 ||
      true
  )"
  if [[ -n "$transaction_id" ]]; then
    transaction_body="$(
      curl -fsS "${ENDPOINT}/${API_NETWORK}/transaction/${transaction_id}" ||
        true
    )"
    if [[ "$transaction_body" == *'"type": "execute"'* ]]; then
      echo "${step_name} confirmed as ${transaction_id}."
      return
    fi
  fi

  if (( execution_exit != 0 )) || [[ "$execution_output" != *"Execution confirmed!"* ]]; then
    printf '%s\n' "$execution_output" |
      sed -E 's/APrivateKey1[[:alnum:]]+/[REDACTED]/g'
    echo "${step_name} was not confirmed (exit ${execution_exit})."
    exit 1
  fi
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
betting_deadline="$((start_height + 20))"

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
  doo_prediction_market.aleo::create_market \
  "$market" \
  1000000u64

wait_until_height "$((betting_deadline + 1))"
report_height="$(current_height)"
dispute_deadline="$((report_height + 20))"
voting_deadline="$((dispute_deadline + 20))"
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
  dark_optimistic_oracle.aleo::create_assertion \
  "$assertion"

wait_until_height "$((dispute_deadline + 1))"
run_execution \
  "Settle undisputed YES market" \
  doo_prediction_market.aleo::settle_market \
  "$market_id" \
  "$assertion_id" \
  true \
  "$yes_claim_hash" \
  true \
  "${betting_deadline}u32"

run_execution \
  "Redeem complete winning supply" \
  doo_prediction_market.aleo::redeem_winning_tokens \
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
