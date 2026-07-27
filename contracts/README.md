# Aleo programs

This directory contains the Aleo source required by the prediction-market demonstration.

| Directory | Program | Responsibility |
| --- | --- | --- |
| `oracle` | `dark_optimistic_oracle.aleo` | Assertions, disputes, private voting records, aggregate tallies, rewards, and consumer outcome verification. |
| `prediction-market` | `doo_prediction_market.aleo` | Binary outcome-token creation, collateral custody, oracle-gated settlement, and winner redemption. |
| `token-registry-workaround` | `token_registry.aleo` | Local-devnet substitute for the canonical registry. Never deploy this workaround to public Testnet. |

## Asset separation

The market and oracle have intentionally separate assets:

- **Market collateral:** public Aleo credits.
- **Market outcomes:** a distinct registry token pair, `YES<x>` and `NO<x>`, created for each market.
- **Oracle incentives:** DOOR, used only for assertion bonds, dispute bonds, voting rights, refunds, and rewards.

Creating a market registers both outcome tokens and seeds each side with equal collateral. A participant deposits credits and receives the selected outcome token. Once the oracle verifies the result, the losing token has no redemption path and the winning token divides all settlement collateral proportionally among its holders.

## Settlement invariant

Each market stores its question hash, canonical YES- and NO-claim hashes, assertion ID, outcome-token IDs, and betting deadline. The corresponding oracle assertion must use:

- The market ID as its `title`.
- The stored canonical claim hash for the reported outcome as its `content_hash`.

`settle_market` calls `verify_assertion_outcome`:

- With no dispute, the reported outcome is accepted only after the grace period.
- With a dispute, settlement waits for the voting deadline. Accepting the assertion selects its reported outcome; rejecting it selects the opposite binary outcome.

The market cannot substitute a different assertion, claim hash, or outcome.
The oracle also records the assertion creation height. Settlement rejects an assertion created at or before the market’s betting deadline, preventing a report from maturing while positions are still available.

## Upgrade policy

Every Aleo program checked into this directory declares a Leo 4 `@admin` constructor. The checked-in address is a public local-development account. Replace it with a secure administrator controlled by the deployer before any public deployment. `deploy_testnet.sh` refuses the placeholder.

The local registry source is referenced as a build dependency so contract tests are deterministic. Public deployment scripts require the canonical `credits.aleo` and `token_registry.aleo` programs and pass `--skip` for the local dependency, so neither network-owned program is deployed or administered by this repository.

## Build

From the repository root:

```bash
./contracts/build_all.sh
./contracts/test_all.sh
```

The script builds the local registry workaround first, followed by the oracle and prediction market.
The test script executes Leo unit tests for oracle majority/tie behavior, reward arithmetic, assertion timing, binary settlement inversion, proportional payout, rounding, and invalid redemption boundaries.
