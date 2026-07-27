# Development Notes

Last updated: 2026-07-27

## Responsibility

This repository is the complete demonstration: the upgradeable Dark Optimistic
Oracle, an upgradeable binary prediction-market program, a local-only
upgradeable token-registry workaround, and a React/Vite/Shield-wallet site that
combines the landing page, explanation, and application.

## Contract design implemented

- The oracle uses DOOR only for assertion, dispute, and private-voter
  incentives.
- Every market creates distinct `YES<x>` and `NO<x>` token-registry assets.
  These outcome assets are independent of DOOR.
- Public Aleo credits back the outcome pool.
- Once the oracle accepts an undisputed assertion or resolves a dispute, the
  losing outcome has no redemption path and is worth zero to the contract.
  Winning tokens divide all settlement collateral proportionally.
- Settlement binds the assertion ID, market ID, reported claim hash, market
  close height, and oracle result.
- Repeat settlement and invalid-token redemption fail on-chain.
- Every deployable project program has a Leo 4 `@admin` constructor. Deployment
  scripts substitute the selected administrator in a temporary source tree.

The oracle copy here is authoritative for the combined demonstration and is
kept synchronized with `../core/src/main.leo`.

## Frontend work completed

- Added Shield wallet connection and Testnet network checks.
- Added market creation, outcome purchase, oracle assertion/dispute/private
  vote, settlement, and winning-token redemption flows.
- Kept the landing page, protocol explanation, and application in one static
  site suitable for GitHub Pages.
- Added fail-closed program availability checks and explicit Aleo input
  formatting.
- Added read-only fallback between Provable's two official `/v2` API hosts so
  temporary propagation differences do not incorrectly mark an accepted
  deployment unavailable. Custom and local endpoints remain single-provider.

## Configuration and credentials

All real `.env*` files are ignored; only sanitized `*.example` templates are
allowed in Git.

- `.env.devnet`, `.env.testnet`, and `.env.mainnet` contain public settings.
- `.env.private` is mode `600`.
- `DEVNET_PRIVATE_KEY` retains the generic local account.
- `TESTNET_PRIVATE_KEY` matches the shared Testnet administrator used by
  `core`.
- `MAINNET_PRIVATE_KEY` is reserved for a later hardware-backed account and is
  not configured or used.

Current Testnet administrator:

`aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf`

## Validation

```bash
pnpm check
pnpm test:contracts
pnpm deploy:check
```

Current results:

- 33/33 browser and lifecycle unit tests pass.
- 21/21 Leo unit tests pass.
- ESLint, static security checks, TypeScript, and the production Vite build
  pass.
- Devnet, Testnet, and Mainnet dry-run builds pass without signing or
  broadcasting.
- The deployed local integration lifecycle passes: create the market, wait for
  betting to close, create an oracle assertion, wait through the grace period,
  settle an undisputed YES result, redeem the complete winning supply, and
  verify `resolved=true`, `resolution=true`, and zero remaining collateral.

The static security scanner uses `git grep`, so ignored credential files are
neither inspected nor printed.

The local integration runner polls the actual ledger height and requires the
transaction endpoint to report an accepted `execute` transaction. A fee-only
transaction returned for a rejected execution is not treated as confirmation.

## Deployment status

`deploy_local_devnet.sh` deploys the local registry, oracle, and market in that
order. `deploy_testnet.sh` and `deploy_mainnet.sh` require the canonical
registry and skip the local workaround. Existing custom programs are upgraded
by the configured administrator.

The devnet is started through `../core/run_node.sh --install`, which delegates
snarkOS installation to Leo. Current local validation used Leo `4.3.4`,
snarkOS `4.8.1` with `test_network`, and the explicit 17-entry consensus
schedule through height 20. The ignored local binary is only a compatible
fallback when the macOS Xcode `libclang` runtime prevents Leo's installer from
completing.

The public Testnet deployment completed successfully:

- `dark_optimistic_oracle.aleo`: edition `0`, initialized against canonical
  `token_registry.aleo`.
- `doo_prediction_market.aleo`: edition `0`.
- Shared dedicated administrator and oracle fee collector:
  `aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf`.

Accepted transaction IDs, deterministic program addresses, current post-deploy
balances, and devnet address roles are in [DEPLOYMENTS.md](DEPLOYMENTS.md).
`--resume` now supports safe continuation after an accepted partial deployment,
and public program detection falls back to the latest-edition route when a
provider's full-program route is briefly behind.

The final production build was tested in a browser against Testnet. The page
reported both programs as ready, loaded the current block height, switched
between lifecycle tabs, and emitted no browser warnings or errors. Wallet
signing remains an interactive Shield approval and was not automated.

Mainnet remains intentionally locked behind both an explicit command argument
and a public confirmation value.
