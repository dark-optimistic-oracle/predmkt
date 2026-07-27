# Security

## Review status

An internal engineering security review was completed on 2026-07-26. It covered the Aleo programs, React client, wallet transaction construction, public mapping reads, deployment scripts, external Aleo program dependencies, and GitHub Pages workflow.

This review is not an independent third-party audit, formal verification, or a guarantee that the software is free of vulnerabilities. The repository remains a demonstration until the programs are deployed, exercised end to end on a live network, and independently reviewed.

## Security model

The design relies on these trust assumptions:

- The configured Aleo network, `credits.aleo`, and the canonical `token_registry.aleo` behave according to their published interfaces.
- The upgrade administrator protects its private key and reviews every upgrade.
- A market creator publishes meaningful canonical YES and NO claims before participation begins.
- DOOR voting participation and bond sizes are sufficient to make an incorrect assertion economically unattractive.
- Wallet software accurately displays the target program, function, inputs, and fee before approval.
- Public Aleo API responses may be unavailable or stale; they are display data and never replace on-chain contract checks.

## Reviewed components

| Component | Review and automated coverage |
| --- | --- |
| Oracle program | Assertion uniqueness, timing windows, recorded creation height, dispute exclusivity, private voting-right consumption, tally result, tie behavior, one-time awards, caller checks, bond arithmetic, and consumer verification. Leo unit tests exercise pure outcome, timing, and reward rules. |
| Prediction-market program | Asset separation, market uniqueness, betting deadline, collateral accounting, YES/NO supply accounting, oracle binding, settlement inversion, winning-token restriction, proportional redemption, and arithmetic bounds. Leo unit tests and lifecycle model tests cover all binary result combinations and redemption boundaries. |
| Local token-registry workaround | Restricted to local devnet deployment, compiled with the other programs, checked for an upgrade administrator, and skipped on public networks. Its broader token behavior is inherited from the bundled implementation and has not received an independent cryptographic review here. |
| React client | Strict unsigned-value parsing, integer range checks, bounded private-record input, wallet capability checks, fail-closed program availability checks, transaction payload tests, API error handling, and no persistent storage of private records. |
| Wallet integration | Shield is the configured wallet adapter. Tests verify every transaction family constructed by the UI. Final authorization and proof generation remain wallet responsibilities. |
| Aleo integrations | Public deployment requires the canonical registry to exist. Settlement calls the oracle verifier and binds assertion ID, market ID, claim hash, market close height, and expected validity. |
| Deployment | Separate devnet, Testnet, and locked Mainnet entry points; no embedded keys; key/admin matching; temporary administrator substitution; deploy-or-upgrade detection; confirmation-marker checks; canonical public registry checks; and dry-run compilation. |
| GitHub Pages and dependencies | CI runs lint, browser-unit/lifecycle tests, static security checks, and a production build. Direct Provable wallet packages are version-pinned, the lockfile is frozen, and GitHub Actions are pinned to full commit SHAs. |

## Findings and disposition

| ID | Severity | Finding | Status |
| --- | --- | --- | --- |
| PM-01 | High | A report could be created before betting closed and mature while participation remained open. | Fixed. The oracle records assertion creation height; market settlement requires it to be strictly later than the stored betting deadline. |
| DEP-01 | High | A public deployment could accidentally retain the known development upgrade administrator. | Fixed. Deployment creates temporary source with the configured administrator, rejects the development address on public networks, and verifies that the signing key controls that address. |
| DEP-02 | High | Deploying the local registry workaround to a public network could conflict with the canonical registry. | Fixed. Public scripts require the canonical program and always skip the workaround. |
| OR-01 | Medium | Reward multiplication could overflow for extreme bond values. | Fixed. Assertion cost and voter stake are bounded before multiplication. |
| PM-02 | Medium | Redemption multiplication needed explicit bounds on aggregate collateral and winning supply. | Fixed. Both are capped to the `credits.aleo` public-balance range before payout multiplication, including maximum-boundary tests. |
| SUP-01 | Medium | Wallet adapter dependencies used the floating `latest` tag. | Fixed. Direct Provable packages are pinned to the lockfile version. |
| UI-01 | Low | Free-form numeric inputs could create malformed or out-of-range wallet requests. | Fixed. The client normalizes and bounds Aleo integer literals before invoking the wallet. |
| UI-02 | Low | Token names and symbols are creator-supplied registry metadata. | Acknowledged. Contract identity uses stored token IDs; clients should treat metadata as display text, not authority. |
| OR-02 | Low | The original DOOR field literal relied on implicit field-modulus reduction. | Fixed. The source now uses the canonical reduced field value explicitly. |

## Preserved invariants

- DOOR is never accepted as market collateral and is never minted as a market outcome.
- Each market stores distinct `YES<x>` and `NO<x>` token IDs.
- Only the token matching the verified binary result can redeem.
- The winning supply divides the complete settlement collateral; losing tokens have no redemption path.
- An undisputed assertion resolves valid only after its grace period.
- A disputed assertion resolves only after voting; more confirms than denials accepts it, while a tie rejects it.
- An assertion used by a market must have been created after that market stopped accepting positions.
- Claims, market IDs, and assertion IDs are immutable settlement bindings.
- Every bundled deployable Aleo program has an explicit `@admin` upgrade policy.

## Residual risks

- The upgrade administrator can replace program logic. Use a hardened key-management or multisignature process and publicly review upgrades before broadcast.
- Oracle correctness is economic, not absolute. Concentrated voting power, low participation, collusion, or depleted reward capacity can affect safety or liveness.
- Proportional integer division rounds down. Multiple redemptions can leave a small amount of non-withdrawable collateral dust.
- Registry metadata can be misleading, and outcome tokens are transferable independently of this interface.
- A compromised wallet, browser extension, dependency, GitHub account, or Pages deployment can deceive users even when on-chain checks remain intact.
- The canonical registry and credits programs are external dependencies outside this repository’s upgrade and audit scope.
- Testnet and Mainnet end-to-end transaction tests cannot be completed until the two custom programs are deployed there. Mainnet deployment is intentionally locked.

## Verification commands

```bash
pnpm check
pnpm test:contracts
pnpm deploy:check
pnpm test:integration:local
pnpm security:audit
```

`pnpm security:audit` queries the package registry and therefore requires network access. Deployment checks compile all programs for devnet, Testnet, and Mainnet without signing or broadcasting. The local integration command requires an already-running Aleo devnode and deployed programs; it broadcasts only to that configured local endpoint.

## Reporting a vulnerability

Use the repository’s private GitHub Security Advisory reporting flow. Do not include private keys, wallet records, or other secrets in a public issue.
