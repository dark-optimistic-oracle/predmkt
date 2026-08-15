# Security audit record

This file is an append-only record of security reviews of the Dark Optimistic
Oracle prediction-market demonstration. Each review or remediation verification
is a separate dated chapter. This sample is experimental software, not a claim
that the market or its economics are production-ready.

## 2026-08-15 — Pre-remediation audit

Audit time: 2026-08-15 06:29 EDT (computer local time).

### Scope and method

The review covered both Leo programs and their cross-program calls, binary token
and collateral accounting, oracle settlement/liveness, wallet request creation,
input handling, browser audit export, dependencies, deployment wrappers, GitHub
Pages CI and response headers, secret handling, and Testnet program compatibility.
It included lint, 35 frontend/model tests, 21 Leo unit tests, static security
checks, a production build, devnet/Testnet/Mainnet deployment dry runs, dependency
audits, source/history scans, and read-only live Testnet verification. Ordered
call evidence is recorded in `LOG.md`.

### Findings

| ID | Severity | Status | Finding and impact | Recommendation |
| --- | --- | --- | --- | --- |
| PM-2026-08-15-01 | Critical | Open | The bundled oracle has the same permissionless `initialize` flaw as core: a first caller on a new network can receive the treasury mint and become fee collector. The existing Testnet mapping contains the intended administrator. | Apply the core administrator-bound initialization fix to the byte-identical bundled source and deploy it as a state-preserving upgrade. |
| PM-2026-08-15-02 | High | Open | A market stores one mandatory assertion ID and settlement accepts only that ID. Anyone can register that globally unique oracle ID first, including with an unrelated claim or extremely distant deadline, permanently preventing the legitimate market assertion and settlement. | Treat the market's stored ID as a suggested default, accept any post-close assertion whose title/content hash correctly binds the market and reported outcome, and record the actual settlement assertion separately without changing existing struct layout. |
| PM-2026-08-15-03 | High | Open | `create_market` permits identical YES and NO claim hashes. In that case one accepted assertion can satisfy either reported outcome, allowing the first successful settlement caller to choose the winner. | Require distinct YES and NO claim hashes in the contract, frontend model, form validation, and negative tests. |
| PM-2026-08-15-04 | High | Open | Oracle voting rights can be purchased through the public voting deadline while `confirm_votes` and `deny_votes` are live mappings. A late funded voter can buy influence after observing the tally. | Add a vote-only interval by closing right acquisition earlier, document residual economic manipulation risk, and reserve a hidden/commit-reveal tally redesign for production research. |
| PM-2026-08-15-05 | High | Open | Voting-related frontend calls use public fees. The public fee payer, separate `confirm`/`deny` transition, and public aggregate strongly link identity and direction despite private record inputs. | Use private fees for private-record voting lifecycle calls and make the exact privacy limitation prominent in UI and documentation. |
| PM-2026-08-15-06 | Medium | Open | The frontend has no global pending transaction lock and its Aleo literal conversion is insufficiently strict. Duplicate prompts and malformed wallet requests can produce avoidable rejected transactions and fees. | Add pending-state exclusion and canonical, range-checked Aleo input parsing with deadline and claim-hash relationship validation. |
| PM-2026-08-15-07 | Medium | Open | CI does not run the full dependency audit, Leo tests, deployment dry runs, or local integration test. The single job holds Pages/OIDC write permissions during install, lint, and tests. | Split verification/build from deployment permissions and add reproducible contract, audit, and deployment-dry-run gates. Keep the local broadcast lifecycle as an explicit environment-dependent gate. |
| PM-2026-08-15-08 | Medium | Open | The full development audit reports 7 advisories, including a critical Vitest issue and high-severity old Vite/esbuild tooling. The production-only audit reports zero advisories. | Upgrade Vitest and affected transitive tooling, refresh the lockfile, and enforce both full and production audit checks in CI. |
| PM-2026-08-15-09 | Medium | Open | The checked-in local integration exercises only the undisputed YES path. It does not cover NO settlement, dispute voting, tie/rejection inversion, assertion-ID collision, identical claim hashes, repeated settlement/redemption, or wrong-record attacks. | Add model and Leo negative cases now, then expand the local broadcast suite to disputed and adversarial lifecycles before production use. |
| PM-2026-08-15-10 | Medium | Open | GitHub Pages lacks comprehensive security response headers and uses a shared `github.io` origin. | Add safe in-document policies and use isolated custom subdomains with a header-capable front door for final production. |
| PM-2026-08-15-11 | Medium | Accepted for QA, open for release | Voluntary audit downloads intentionally contain readable public calls, parameters, results, and errors. This is useful for debugging, but upstream errors might unexpectedly include sensitive record text. Client exports are also editable and are not proof by themselves. | Preserve readable public evidence, aggressively redact secret/private-record shapes, label the evidence client-generated, and verify transaction IDs and final state on-chain. |
| PM-2026-08-15-12 | Medium | Open | Upgrade and fee authority rests in a single key with no on-chain delay or multisignature governance. | Document the trust model and adopt reviewed multisignature/timelock controls before any production market holds meaningful value. |

### Positive controls observed

- YES and NO are separate token-registry assets, not DOOR. Before settlement,
  equal collateral mints equal outcome units; after settlement, only the winning
  token redeems pro rata against all locked collateral and the losing token has
  no redemption path.
- Market settlement makes a synchronous oracle verification call and requires an
  assertion created after the market close height with the selected claim hash.
- Settlement and redemption mappings prevent a second market settlement and cap
  aggregate payout through tracked remaining collateral and winning supply.
- All three checked-in Leo programs declare upgrade policy. Public deployment
  scripts derive and substitute the administrator, reject the devnet placeholder,
  and default to dry-run unless broadcasting is explicitly requested.
- GitHub Actions are pinned to full commit SHAs. Real `.env*` files are ignored,
  private files are mode `600`, and the current tree/history scan found no public
  network private credential.

### Verification evidence and limits

- Frontend lint/static checks/build: passed.
- Frontend and model tests: 35 passed, 0 failed.
- Leo helper tests: 21 passed, 0 failed.
- Devnet, Testnet, and Mainnet deployment checks compiled successfully in dry-run
  mode; no deployment or upgrade transaction was submitted by those checks.
- Production dependency audit: 0 advisories. Full audit: 7 advisories (1 critical,
  3 high, 3 moderate).
- A local snarkOS/Leo devnet was not running, so the broadcast integration suite
  was not executed during this chapter.
- The current Testnet oracle and market instruction sets matched the freshly
  compiled sources except for the expected deployment administrator substitution;
  both were edition 0 at review time.

## 2026-08-15 — Remediation verification

Verification time: 2026-08-15 07:04 EDT (computer local time).

### Fixes and dispositions

| Finding | Disposition | Remediation and remaining risk |
| --- | --- | --- |
| PM-2026-08-15-01 | Fixed | The oracle initializer, treasury mint, and fee collector are all bound to the same administrator used for upgrades. Deployment substitutes and verifies both values before compilation. |
| PM-2026-08-15-02 | Fixed | Settlement now accepts any assertion created after market close whose title and selected canonical claim hash bind it to the market. The actual assertion is stored in the new `settlement_assertions` mapping; the existing `Market` struct and suggested ID remain unchanged. |
| PM-2026-08-15-03 | Fixed | Market creation rejects identical YES and NO claim hashes in Leo and the frontend. Positive and negative contract/model tests were added. |
| PM-2026-08-15-04 | Mitigated | New voting rights close 10 blocks before the vote deadline. Previously acquired rights and visible live totals leave residual strategic-voting risk. |
| PM-2026-08-15-05 | Mitigated | Record-based voting lifecycle calls request private fees and the exact public/private boundary is shown in the UI. Function direction and aggregate counts remain public. |
| PM-2026-08-15-06 | Fixed | A global pending lock prevents duplicate wallet prompts. Deeper review confirmed the earlier parser was already range-aware; this remediation additionally hardened canonical syntax, record bounds, distinct claims, and cross-deadline validation. |
| PM-2026-08-15-07 | Fixed except local broadcast gate | CI separates read-only verification from Pages deployment, runs full audits, installs the pinned Leo release, runs all Leo tests, and compiles all three deployment targets. A live local broadcast lifecycle remains an explicit environment-dependent release check. |
| PM-2026-08-15-08 | Fixed | Tooling and transitive dependencies were upgraded/overridden. Production and full dependency audits report zero known vulnerabilities. |
| PM-2026-08-15-09 | Partially fixed | Model and Leo coverage now includes all binary outcome inversions, duplicate claims, proportional payout, input limits, and key timing/authorization boundaries. Disputed broadcast and hostile-record local lifecycles remain future integration work. |
| PM-2026-08-15-10 | Partially fixed | A restrictive document CSP and `no-referrer` were added. Complete response headers and origin isolation require the future custom-domain front door. |
| PM-2026-08-15-11 | Accepted for QA | Readable public call evidence remains intentionally user-controlled. Private records and recognizable secret shapes remain redacted; exports are client-generated and require on-chain verification. |
| PM-2026-08-15-12 | Accepted risk | The dedicated single upgrade key remains an explicit trust boundary. Multisignature/timelock governance is still required before meaningful production custody. |

### Compatibility and verification

- Program IDs and every existing struct, record, and mapping layout are
  unchanged. The market adds one mapping without rewriting existing markets;
  the stored assertion ID remains a backwards-compatible suggested default.
- A first live oracle upgrade attempt was rejected by Leo before broadcast
  because the candidate removed an existing initializer finalize input. The
  initializer now preserves the historical captured caller and verifies both
  caller and signer against the administrator. No transaction or fee resulted
  from the rejected candidate.
- Frontend: ESLint/static checks/build passed; 36/36 Vitest tests passed.
- Contracts: 14/14 oracle and 13/13 market Leo 4.4.1 tests passed (27/27 total)
  after migration to the equivalent `std::ctx` syntax. The downloaded release
  asset matched its official published SHA-256.
- Devnet, Testnet, and Mainnet deployment builds compiled in dry-run mode.
- Production and full dependency audits report zero known vulnerabilities.
- The pre-upgrade Testnet snapshot showed both programs at edition 0 and
  preserved the existing unresolved QA market and assertion. Upgrade and
  post-upgrade state evidence are recorded in `LOG.md` and `DEPLOYMENTS.md`.

This is an engineering remediation review, not a formal proof, economic audit,
or independent third-party assessment.

## 2026-08-15 — Upgrade and preserved-state verification

Verification time: 2026-08-15 08:12 EDT (computer local time).

### Prediction-market upgrade

The first corrected market candidate was rejected locally before broadcast
because adding `settlement_assertions` changed the compiler-selected finalize
register order for `settle_market`. The source now captures the actual assertion
ID in the same register position as edition 0. Generated Aleo instructions were
compared directly: transition inputs and all seven finalize input types/order
match edition 0 exactly. No fee or transaction resulted from the rejected local
candidate.

The compatible candidate passed 13/13 market tests and was accepted as edition
1 in transaction
`at1gxza4mhcrendchvguswhyvjvq3ga5pc3wcl7948qvfgzs3g705yslssaal`.
The accepted public fee was `12.687318` credits. Post-upgrade reads preserved
market `187031921field`, collateral `300000u128`, YES supply `200000u128`, NO
supply `100000u128`, and `resolved = false`; the new settlement-assertion entry
is correctly absent until settlement. Findings PM-2026-08-15-02 and
PM-2026-08-15-03 are therefore fixed in the live Testnet market.

### Oracle coordination

The bundled oracle source is byte-equivalent to the core candidate and passes
10/10 Leo 4.4.1 tests. Its interface and state layout remain compatible with
edition 0. Testnet repeatedly aborted the candidate in blocks whose consensus
certificate count was below the 47 required by its `3481397` combined density;
provider HTTP 522 failures also occurred before some broadcasts. Aborted
transactions charged no fee and changed no state. Consequently
PM-2026-08-15-01 and PM-2026-08-15-04 are fixed in source but remain pending on
the live oracle, which is still edition 0.

The deployment wrapper now supports `--market-only` for this safe partial
upgrade path and refuses that option on devnet. Mainnet was not broadcast.
Exact transaction, abort, balance, and state evidence is in `LOG.md` and
`DEPLOYMENTS.md`. CI downloads the official Leo 4.4.1 Linux release archive and
verifies its pinned SHA-256 before running contract and deployment checks; it
does not spend Pages build time compiling the toolchain from source.
