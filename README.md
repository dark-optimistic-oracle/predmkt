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
├── deploy_testnet.sh               # guarded deploy-or-upgrade workflow
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
pnpm lint
pnpm test
pnpm build
```

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

## Upgradeability and Testnet deployment

Every Aleo program checked into this repository declares a Leo 4 `@admin` constructor. The committed administrator is the public local-development account so the sources compile for local use. It is not safe for a public deployment.

Before deploying:

1. Replace the `@admin` address in all three checked-in programs with the same secure administrator address.
2. Copy `.env.example` to `.env`.
3. Set a funded Testnet `PRIVATE_KEY` and its matching `PROTOCOL_ADMIN`.
4. Run `./deploy_testnet.sh`.

The script:

- Refuses the known public development key or administrator.
- Requires the canonical Testnet token registry and never deploys the workaround publicly.
- Builds all source programs.
- Deploys a missing oracle or performs an administrator-authorized upgrade.
- Initializes DOOR only after the oracle’s initial deployment.
- Deploys a missing market or performs an administrator-authorized upgrade.

No deployment key belongs in source control.

## GitHub Pages

Pushing `main` runs `.github/workflows/pages.yml`, which lints, tests, builds the static Vite site with `/predmkt/`, and deploys `dist`.

In the repository settings, select **GitHub Actions** as the Pages source. Jekyll is not required.

## Demonstration status

The public client fails closed when either Testnet program is unavailable: documentation and source remain accessible, but transaction buttons are disabled. Deploy the programs with a secure administrator before treating the hosted interface as live.

This software is a Testnet demonstration and has not been represented as production-ready or audited.
