# Dark Prediction Market

A self-contained prediction-market demonstration resolved by the Dark Optimistic Oracle on Aleo. This repository keeps the React frontend, user documentation, oracle source, market source, and local-devnet registry workaround together.

The GitHub Pages site places the overview, documentation, and working Testnet interface at one URL:

`https://dark-optimistic-oracle.github.io/predmkt/`

## Purpose

The project demonstrates how an application can consume optimistic truth without deciding truth itself. A reporter submits the market’s canonical outcome claim to the oracle. The market waits through the dispute grace period. An undisputed claim becomes usable after that window; a disputed claim waits for private voting and the final aggregate tally.

The browser uses Shield Wallet to create and submit Aleo executions. Proof generation and transaction confirmation occur through the same Provable wallet-adapter stack used by the main Dark Optimistic Oracle webapp.

## Market assets and oracle assets

The two systems use separate assets.

| Asset | Role |
| --- | --- |
| Public Aleo credits | Neutral collateral deposited into each market. |
| `YES<x>` and `NO<x>` | Transferable token-registry assets representing the two outcomes for market `<x>`. |
| DOOR | Oracle-only incentives: reporter and disputer bonds, private voting rights, refunds, and rewards. |

Creating a market registers both outcome tokens and seeds each side equally. A participant deposits public Aleo credits and receives the selected outcome token. After settlement:

- The losing outcome token has no redemption path and is worth zero to the market contract.
- The winning outcome token can be burned for a proportional share of all collateral deposited on both sides.

DOOR is never used to buy an outcome token or fund a market payout.

## End-to-end lifecycle

1. **Create:** The creator defines a binary question, fixes canonical YES- and NO-claim hashes and an assertion ID, registers `YES<x>` and `NO<x>`, and seeds both sides.
2. **Participate:** A user deposits public Aleo credits and receives the selected outcome token.
3. **Report:** After betting closes, a reporter bonds DOOR and submits the exact canonical YES or NO assertion.
4. **Wait:** The assertion remains challengeable until its dispute deadline.
5. **Resolve:**
   - If nobody disputes, the reported outcome may settle only after the grace period.
   - If disputed, voters fund private voting-right records with DOOR and privately confirm or deny the report. Settlement waits until voting closes; rejecting a report selects the opposite binary outcome.
6. **Redeem:** The market calls the oracle verifier. Losing tokens become non-redeemable; winning tokens divide the complete collateral pool.

The market contract binds settlement to the market ID, assertion ID, and canonical YES/NO claim hashes fixed at creation. A caller cannot replace any of them with a convenient outcome.

## Privacy model

Market questions, outcome-token supplies, collateral, aggregate vote counts, and settlement are public. Oracle voting uses private Aleo records:

- Private DOOR payment record.
- Private voting-right record.
- Private vote receipt.
- Private voter reward or refund.

The aggregate confirm and deny counts are public so downstream contracts can verify the result without revealing the records that carried each voter’s right and receipt.

## Repository layout

```text
.
├── contracts/
│   ├── oracle/                     # dark_optimistic_oracle.aleo
│   ├── prediction-market/          # doo_prediction_market.aleo
│   └── token-registry-workaround/  # local devnet only
├── src/                            # React + TypeScript frontend
├── public/                         # static site assets
├── deploy_local_devnet.sh          # local deploy-or-upgrade workflow
├── deploy_testnet.sh               # guarded Testnet workflow
├── deploy_mainnet.sh               # locked Mainnet workflow
├── SECURITY.md                     # internal review, threat model, residual risks
└── .github/workflows/pages.yml     # GitHub Pages build and deployment
```

## Milestone coverage

### Core contract development

The oracle uses real Aleo block heights for dispute and voting deadlines, supports assertion and dispute incentives, uses private voting rights and receipts, exposes aggregate tallies, and provides a consumer verification entry point. The market contract consumes that verifier instead of duplicating oracle logic.

### Voting frontend and assert/dispute API

The React interface covers market creation, outcome participation, assertion reporting, disputes, private voting, settlement, and redemption. It reads public mappings through the Testnet API and asks Shield Wallet to produce and submit Aleo executions transparently.

### Sample prediction market

The market creates a tokenized YES/NO pair, accepts neutral collateral, routes outcome truth through the full assertion/dispute/voting lifecycle, and transfers the combined collateral value to holders of the verified winning asset.

## Local frontend

Requirements: Node.js 22 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm check
pnpm test:contracts
pnpm deploy:check
pnpm security:audit
```

The browser suite covers input parsing, API handling, every frontend transaction family, all binary assertion-result combinations, deadline failures, claim binding, payout conservation, rounding, and repeat-redemption rejection. `pnpm test:contracts` runs the Leo unit tests for oracle and market rules. The deployment check compiles all three programs for each target without signing or broadcasting.

The production build uses `/predmkt/` as its base path. To preview at the root locally:

```bash
VITE_BASE_PATH=/ pnpm build
pnpm preview
```

## Aleo programs

Requirements: Leo 4.3.4 or a compatible release.

```bash
./contracts/build_all.sh
```

Public Testnet already provides canonical `credits.aleo` and `token_registry.aleo`. The bundled token-registry workaround exists only for a local devnet.

## Upgradeability and deployment

Every Aleo program checked into this repository declares a Leo 4 `@admin` constructor. The committed administrator is a public local-development account so the sources compile for local use. It is not safe for a public deployment.

The deployment scripts copy the contracts to a temporary directory and substitute the configured administrator there. This preserves reproducible checked-in source while ensuring the deployed upgrade policy belongs to the signer. No deployment key belongs in source control.

### Local devnet

Start a compatible local Aleo devnet, copy `.env.devnet.example` to `.env.devnet`, add a funded local key and matching address, then run:

```bash
./deploy_local_devnet.sh --dry-run
./deploy_local_devnet.sh
```

Local deployment installs or upgrades the registry workaround before the oracle and market.
With an Aleo devnode and the three programs running, execute the on-chain integration lifecycle:

```bash
pnpm test:integration:local
```

It creates a market, waits past betting, creates a post-close oracle assertion, waits through the grace period, settles YES, redeems the complete winning supply, and verifies that the collateral pool reaches zero.

### Testnet

Copy `.env.testnet.example` to `.env.testnet`, add a funded Testnet key and matching secure administrator, then run:

```bash
./deploy_testnet.sh --dry-run
./deploy_testnet.sh
```

The script requires the canonical public token registry, skips the local workaround, and deploys missing custom programs or performs administrator-authorized upgrades.

### Mainnet

Mainnet support is present but intentionally locked. A dry run is safe:

```bash
./deploy_mainnet.sh --dry-run
```

An actual broadcast requires `.env.mainnet`, the exact confirmation value documented in its example, and an explicit `--confirm-mainnet` argument. Do not use it until deployment parameters, administrator custody, live-network integration tests, and an independent audit are complete.

## GitHub Pages

Pushing `main` runs `.github/workflows/pages.yml`, which lints, tests, builds the static Vite site with `/predmkt/`, and deploys `dist`.

In the repository settings, select **GitHub Actions** as the Pages source. Jekyll is not required.

## Demonstration status

The public client fails closed when either Testnet program is unavailable: documentation and source remain accessible, but transaction buttons are disabled. Deploy the programs with a secure administrator before treating the hosted interface as live.

This software is a Testnet demonstration. An internal engineering security review and its residual risks are documented in [SECURITY.md](SECURITY.md); it is not an independent audit or formal verification.
