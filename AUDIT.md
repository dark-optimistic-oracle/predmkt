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
