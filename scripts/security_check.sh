#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

if grep -R -n -E 'APrivateKey1[a-zA-Z0-9]{20,}' \
  --exclude='pnpm-lock.yaml' \
  --exclude='SECURITY.md' \
  --exclude-dir='.git' \
  --exclude-dir='.aleo' \
  --exclude-dir='.toolhome' \
  --exclude-dir='build' \
  --exclude-dir='dist' \
  --exclude-dir='node_modules' \
  .; then
  echo "Potential Aleo private key found in tracked project files."
  exit 1
fi

for source_file in contracts/*/src/main.leo; do
  if ! grep -Eq '@admin\(address[[:space:]]*=' "$source_file"; then
    echo "Missing upgrade administrator in ${source_file}."
    exit 1
  fi
  if grep -Eq '@noupgrade' "$source_file"; then
    echo "Non-upgradeable constructor found in ${source_file}."
    exit 1
  fi
done

if grep -Eq '"latest"' package.json; then
  echo "Unpinned latest dependency found in package.json."
  exit 1
fi

for required_script in deploy_local_devnet.sh deploy_testnet.sh deploy_mainnet.sh; do
  if [[ ! -x "$required_script" ]]; then
    echo "${required_script} is missing or not executable."
    exit 1
  fi
done

if ! grep -Eq 'CONFIRM_MAINNET_DEPLOYMENT' scripts/deploy_common.sh; then
  echo "Mainnet deployment confirmation guard is missing."
  exit 1
fi

if ! grep -Eq 'pnpm test' .github/workflows/pages.yml; then
  echo "GitHub Pages workflow does not run the test suite."
  exit 1
fi

if grep -Eq 'uses:[[:space:]]+[^[:space:]#]+@v[0-9]' .github/workflows/pages.yml; then
  echo "GitHub Actions dependencies must be pinned to full commit SHAs."
  exit 1
fi

echo "Static security checks passed."
