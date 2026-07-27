#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

if rg -n 'APrivateKey1[a-zA-Z0-9]{20,}' \
  --glob '!pnpm-lock.yaml' \
  --glob '!SECURITY.md' \
  .; then
  echo "Potential Aleo private key found in tracked project files."
  exit 1
fi

for source_file in contracts/*/src/main.leo; do
  if ! rg -q '@admin\(address\s*=' "$source_file"; then
    echo "Missing upgrade administrator in ${source_file}."
    exit 1
  fi
  if rg -q '@noupgrade' "$source_file"; then
    echo "Non-upgradeable constructor found in ${source_file}."
    exit 1
  fi
done

if rg -q '"latest"' package.json; then
  echo "Unpinned latest dependency found in package.json."
  exit 1
fi

for required_script in deploy_local_devnet.sh deploy_testnet.sh deploy_mainnet.sh; do
  if [[ ! -x "$required_script" ]]; then
    echo "${required_script} is missing or not executable."
    exit 1
  fi
done

if ! rg -q 'CONFIRM_MAINNET_DEPLOYMENT' scripts/deploy_common.sh; then
  echo "Mainnet deployment confirmation guard is missing."
  exit 1
fi

if ! rg -q 'pnpm test' .github/workflows/pages.yml; then
  echo "GitHub Pages workflow does not run the test suite."
  exit 1
fi

if rg -q 'uses:\s+[^[:space:]#]+@v[0-9]' .github/workflows/pages.yml; then
  echo "GitHub Actions dependencies must be pinned to full commit SHAs."
  exit 1
fi

echo "Static security checks passed."
