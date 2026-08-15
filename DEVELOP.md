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

## Browser audit log

Every frontend-initiated Aleo read and every transaction handed to Shield is
written to the browser console with the prefix `[Aleo audit]`. Entries use the
`aleo-browser-audit/v1` schema and contain a monotonic sequence number, call ID,
timestamp, phase, description, network, program, called function, and every
parameter. Read entries include the exact HTTP method and provider URL;
transaction entries include ordered and named Leo inputs, caller, fee, and fee
privacy. Shield's initial temporary identifier is recorded as
`walletRequestId`. The frontend polls `transactionStatus` for up to two minutes
and adds a response entry with the terminal wallet status, poll count, timeout
state, and real `onchainTransactionId` when accepted. This avoids presenting a
wallet request ID as blockchain evidence.

Request and response/submission entries repeat the complete call description so
each line can be audited independently. Values are serialized immediately to
prevent later object mutation from changing historical console output. Private
DOOR payment and voting-right record plaintext is replaced with a classification,
plaintext length, and SHA-256 fingerprint before logging. The fingerprint allows
correlation across an audit without disclosing a spendable record.

Provable can represent an absent mapping value as either HTTP 404 or a JSON
`null` response with HTTP 200. The shared mapping reader treats both forms as
missing state; this prevents a nonexistent oracle assertion or disputer from
being rendered as the literal string `"null"`.

The audit writer automatically stores the latest 2,000 redacted entries under a
prediction-market-specific `localStorage` key. `buildAleoAuditMarkdown` converts
the journal to human-readable operation explanations followed by exact JSON,
and the UI's **Download audit LOG.md** control downloads it. Static GitHub Pages
cannot write or commit repository files, so reviewed exports must still be
appended and committed deliberately. The complete operation inventory and
retained call evidence live in [LOG.md](LOG.md).

`AGENTS.md` makes updating `LOG.md` a required completion step for future
experiments, QA runs, deployments, and Aleo call sequences. It also defines the
evidence fields and secret-redaction rules that future contributors and coding
agents must follow.

## Live Testnet browser QA (2026-08-13)

The dedicated public QA account
`aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th`
was used through Shield. No wallet secret is stored in this repository.

- Market `187031921field` was created with betting deadline `18703305u32`.
- The YES and NO token IDs are respectively
  `3002210804557717497114387731899429818297289214360002865070891917831340783806field`
  and
  `2959601667237201281332120192717557075647714352647817374702525943122374138208field`.
- Initial neutral collateral created 100,000 units of each outcome asset. A
  subsequent YES purchase produced final pre-settlement supplies of 200,000 YES
  and 100,000 NO, backed by 300,000 public microcredits.
- Assertion `187031922field` reports YES with the market-bound claim hash
  `5324225230327309758036215428934805159243555382598664189792628563485661196146field`.
  It bonded 100,000,000 public DOOR, uses dispute deadline `18703670u32`, and
  voting deadline `18703770u32`.
- Shield request `shield_1786664336595_nes5rpygvt8` finalized as Testnet
  transaction
  `at17hqfx3nlfp8tn6trje22yyp67jdjvej8usccnclu9n6x93eg2u8svxjsgk`.
- Provider mappings confirmed the assertion fields and QA asserter address, no
  disputer, and the expected QA public DOOR balance change from 250,000,000 to
  150,000,000 units after bonding.

This evidence validates the connected-wallet reporting path and the browser
audit distinction between Shield's temporary request ID and the accepted
on-chain transaction ID. The retained settlement request never received wallet
approval and is documented in [LOG.md](LOG.md) as incomplete; the on-chain
market therefore remains unresolved and redemption has not occurred.

Mainnet remains intentionally locked behind both an explicit command argument
and a public confirmation value.
