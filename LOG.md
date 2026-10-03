# Prediction market Aleo call log

## 2026-10-03 — Private preparation implementation checkpoint

The user authorized private record preparation and continued testing within an
additional 10-Testnet-ALEO budget. Added separately opt-in self-funding and
wallet record selection, with private data retained in memory/form inputs only.
Only public transfer parameters and record counts enter the journal. No actual
preparation or private vote has happened at this implementation checkpoint.

## 2026-10-03 — Actual public-path screenshot checkpoint

Created fresh market 202610031; minted YES and NO positions; reported canonical
YES through assertion 2026100304 after betting close; waited for actual grace
expiry; settled through the oracle; burned all 30000 winning tokens and received
the full 50000-microcredit collateral pool. Six accepted executions, exact
public inputs, wallet IDs, timestamps and terminal transaction IDs are preserved
in the imported frontend journal below and the calling-sequence table.

Final mapping evidence is resolved YES and collateral_pool=0u128. Historical
yes_supply=30000u128 and no_supply=20000u128 remain pricing denominators. Losing
NO has no redemption entitlement. Provider indexing briefly returned old pool
values after acceptance; repeated later reads confirmed the final state. No
earlier response was altered. The explorer independently showed settlement
accepted in block 20136497 with nested oracle verify_assertion_outcome, and
redemption accepted in block 20136518 with registry burn and credits payment.

Separate diagnostic HEAD then GET to
`https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field`
at approximately 05:51:50 UTC returned HTTP 200, Cache-Control no-store, and
`0u128`. No wallet or transaction ID applies to these reads. Oracle LOG.md
records the ordered diagnostic live-height reads used to establish deadlines.

Both Download audit LOG.md and View demo audit log were used. Downloads
completed in Chrome, but macOS denied direct filesystem access to Downloads;
the identical generated Markdown was therefore preserved through the preview
as AUDIT_EXPORT.md and imported here. Sixteen untouched public screenshots are
assembled in a captioned PDF and HTML slideshow. No secret/private inputs appear.

Found a frontend display gap: current block remained at startup height during
state refresh. Fixed Load on-chain state to refresh height while preserving
form deadlines. All 37 tests, lint, static security checks and build passed.
Private branches remain pending preparation authorized by the user within an
additional 10-Testnet-ALEO budget. This is a checkpoint, not full-feature success.

## 2026-10-03 — Demo preparation (run demo-20261003)

Purpose: demonstrate actual market operations with screenshot and call-log
step labels. Added opt-in demo instrumentation and tested preservation of the
initiating step through asynchronous results. `pnpm check` passed, including
37 unit tests, lint, static security checks and production build. No market
transaction has been submitted in this preparation. Wallet access was blocked
by macOS permissions, subsequently enabled by the user; Shield is now unlocked.
Planned calls in the screenplay are not claimed as executed evidence.

Last updated: 2026-08-15.

This file is the durable audit reference for Aleo reads and transactions
initiated by the prediction-market frontend. The original entries are written
to the browser console with the prefix `[Aleo audit]`.

Every redacted entry is also retained automatically in browser `localStorage`,
up to the most recent 2,000 entries. The site's **Download audit LOG.md** control
exports that journal with a plain-English explanation before every exact JSON
entry. A static GitHub Pages site cannot modify or commit this checked-in file;
reviewed exports must be appended and committed deliberately.

No private key, wallet password, seed phrase, or private record plaintext may
be added to this file.

## Audit entry lifecycle

All entries use schema `aleo-browser-audit/v1` and share a `callId`:

| Phase | Meaning |
|---|---|
| `request` | The frontend is about to perform a read or hand a transaction request to Shield. |
| `submitted` | Shield accepted the request and returned a temporary `walletRequestId`. This is not blockchain finality. |
| `response` | A read returned, or Shield reported terminal transaction status. Accepted writes include the real `onchainTransactionId`. |
| `error` | The provider or wallet rejected or failed the operation. |

Transaction entries repeat the program, function, caller, ordered named inputs,
fee, and fee privacy at every phase. Reads repeat the program or network
operation, mapping and key when applicable, HTTP method, and provider URL.

Private `payment`, `voting_right`, and `voting_receipt` inputs are replaced
before logging with their classification, plaintext length, and SHA-256
fingerprint. The fingerprint supports correlation without disclosing a
spendable record.

## Complete call inventory

### Network and program reads

| Logged function | Parameters | Operation |
|---|---|---|
| `get_latest_block_height` | Provider URL and `GET` method | Loads the current Testnet height used for market and oracle deadlines. |
| `get_program` | `programId`, provider URL and `GET` method | Verifies `dark_optimistic_oracle.aleo` and `doo_prediction_market.aleo` before enabling writes. |

### Mapping reads

Every mapping lookup is logged as `get_mapping_value` with the program, mapping,
key, method, and provider URL.

| Program and mapping | Operation |
|---|---|
| `doo_prediction_market.aleo/markets` | Loads the canonical market definition and bound assertion/token IDs. |
| `doo_prediction_market.aleo/collateral_pool` | Loads remaining neutral public-credit collateral. |
| `doo_prediction_market.aleo/yes_supply` | Loads the outstanding YES outcome-token supply. |
| `doo_prediction_market.aleo/no_supply` | Loads the outstanding NO outcome-token supply. |
| `doo_prediction_market.aleo/resolved` | Determines whether oracle-gated settlement completed. |
| `doo_prediction_market.aleo/resolutions` | Loads the winning binary outcome after settlement. |
| `dark_optimistic_oracle.aleo/assertions` | Loads the bound oracle assertion and deadlines. |
| `dark_optimistic_oracle.aleo/disputers` | Determines whether the optimistic report was challenged. |

An absent mapping may be returned as HTTP 404 or HTTP 200 with JSON `null`.
Both are treated as missing state.

### Transactions

All writes use a fee of 1,000,000 microcredits and require interactive Shield
approval. Public collateral and bond flows use a public fee. Record-based
voting flows use a private fee so the fee payer is not added as a public
identity link; the called vote transition and aggregate tally remain public.

| Program and function | Ordered named inputs | Fee | Operation |
|---|---|---|---|
| `doo_prediction_market.aleo/create_market` | `market`, `initial_liquidity` | Public | Registers independent YES and NO assets, deposits equal neutral collateral for each side, and records the oracle binding. |
| `doo_prediction_market.aleo/buy_outcome` | `market_id`, `outcome`, `outcome_token_id`, `amount` | Public | Deposits public credits and mints only the selected market outcome asset. DOOR is not involved. |
| `dark_optimistic_oracle.aleo/create_assertion` | `assertion` | Public | Bonds public DOOR and reports the market's canonical YES or NO claim. |
| `dark_optimistic_oracle.aleo/dispute_assertion` | `assertion_id`, `assertion_cost` | Public | Bonds matching public DOOR before the grace period ends and opens private voting. |
| `dark_optimistic_oracle.aleo/new_voting_right` | `payment`, `assertion_id`, `voter_stake` | Private | Consumes a private DOOR payment record and creates a private voting right. |
| `dark_optimistic_oracle.aleo/confirm` | `voting_right` | Private | Consumes a private right and adds one public confirm vote while returning a private receipt. |
| `dark_optimistic_oracle.aleo/deny` | `voting_right` | Private | Consumes a private right and adds one public deny vote while returning a private receipt. |
| `doo_prediction_market.aleo/settle_market` | `market_id`, `assertion_id`, `reported_outcome`, `reported_claim_hash`, `assertion_valid`, `betting_deadline_block_height` | Public | Verifies the assertion lifecycle and fixes the winning YES/NO outcome. |
| `doo_prediction_market.aleo/redeem_winning_tokens` | `market_id`, `outcome_token_id`, `amount`, `payout_microcredits` | Public | Burns winning outcome tokens and pays their exact proportional share of all collateral. Losing tokens have no redemption path. |

## Retained live Testnet session: 2026-08-13

The dedicated public QA address was
`aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th`.
No wallet secret is stored in this repository.

The normalized JSON below contains only values that were retained. The original
browser sequence numbers and exact timestamps were not exported, so they are
not fabricated here.

### Setup transfer outside the frontend

**What happened:** The Testnet treasury transferred 250,000,000 public DOOR
units to the QA address so it could test oracle bonding. This was a setup
transaction, not a frontend call.

- On-chain transaction ID:
  `at1hudzentkqrsg3vzep723utsy875cwfl7udvj8xuw5cjv927qtu9s4u0znt`

### 1. Create the binary market

**What happened:** The frontend asked Shield to create market
`187031921field`, register independent `YES187031921` and `NO187031921` assets,
and deposit 100,000 public microcredits for each side. The oracle assertion ID
and both canonical claim hashes were fixed at creation.

```json
{"retention":"normalized from retained browser evidence","phase":"request","kind":"transaction","network":"testnet","program":"doo_prediction_market.aleo","function":"create_market","parameters":{"caller":"aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th","inputs":[{"position":0,"name":"market","value":{"id":"187031921field","question_hash":"183815265233130227596382391327007681412966106502979721491966329692533090558field","yes_claim_hash":"5324225230327309758036215428934805159243555382598664189792628563485661196146field","no_claim_hash":"7949291652296582683818819687533556983578364295482179075790313700456892565084field","assertion_id":"187031922field","yes_token_id":"3002210804557717497114387731899429818297289214360002865070891917831340783806field","no_token_id":"2959601667237201281332120192717557075647714352647817374702525943122374138208field","yes_token_name":"27627974620012417708151353905u128","no_token_name":"94670188823306775637340721u128","yes_token_symbol":"27627974620012417708151353905u128","no_token_symbol":"94670188823306775637340721u128","betting_deadline_block_height":"18703305u32"}},{"position":1,"name":"initial_liquidity","value":"100000u64"}],"fee":1000000,"privateFee":false}}
{"retention":"normalized from retained browser evidence","phase":"submitted","kind":"transaction","program":"doo_prediction_market.aleo","function":"create_market","result":{"walletRequestId":"shield_1786663220447_8v25igsuput"}}
```

The transaction predated final-status polling in the frontend. Its accepted
`at1...` ID was not retained and is therefore not guessed. Provider mappings
confirmed the result: collateral `200000u128`, YES supply `100000u128`, NO
supply `100000u128`, creator equal to the QA address, and `resolved = false`.

### 2. Buy an additional YES position

**What happened:** The frontend deposited another 100,000 public microcredits
and minted 100,000 units of the existing YES market asset. No DOOR was spent.

```json
{"retention":"normalized from retained browser evidence","phase":"request","kind":"transaction","network":"testnet","program":"doo_prediction_market.aleo","function":"buy_outcome","parameters":{"caller":"aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th","inputs":[{"position":0,"name":"market_id","value":"187031921field"},{"position":1,"name":"outcome","value":"true"},{"position":2,"name":"outcome_token_id","value":"3002210804557717497114387731899429818297289214360002865070891917831340783806field"},{"position":3,"name":"amount","value":"100000u64"}],"fee":1000000,"privateFee":false}}
{"retention":"normalized from retained browser evidence","phase":"submitted","kind":"transaction","program":"doo_prediction_market.aleo","function":"buy_outcome","result":{"walletRequestId":"shield_1786663276532_rb9j2gh4o1s"}}
```

This transaction also predated final-status polling, so its accepted `at1...`
ID was not retained. Provider mappings confirmed collateral `300000u128`, YES
supply `200000u128`, and NO supply `100000u128`.

### 3. Report YES through the Dark Optimistic Oracle

**What happened:** The frontend handed Shield a 100,000,000-unit public DOOR
bond and asserted the market's exact canonical YES claim. Shield first returned
a temporary request ID and later reported the accepted on-chain transaction ID.

```json
{"retention":"normalized from retained browser evidence","phase":"request","kind":"transaction","network":"testnet","description":"Submit dark_optimistic_oracle.aleo.create_assertion","program":"dark_optimistic_oracle.aleo","function":"create_assertion","parameters":{"caller":"aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th","inputs":[{"position":0,"name":"assertion","value":{"id":"187031922field","title":"187031921field","content_hash":"5324225230327309758036215428934805159243555382598664189792628563485661196146field","cost":"100000000u128","voter_stake":"1000000u128","dispute_deadline_block_height":"18703670u32","voting_deadline_block_height":"18703770u32"}}],"fee":1000000,"privateFee":false}}
{"retention":"normalized from retained browser evidence","phase":"submitted","kind":"transaction","program":"dark_optimistic_oracle.aleo","function":"create_assertion","result":{"walletRequestId":"shield_1786664336595_nes5rpygvt8"}}
{"retention":"normalized from retained browser evidence","phase":"response","kind":"transaction","program":"dark_optimistic_oracle.aleo","function":"create_assertion","result":{"walletRequestId":"shield_1786664336595_nes5rpygvt8","walletStatus":"accepted","onchainTransactionId":"at17hqfx3nlfp8tn6trje22yyp67jdjvej8usccnclu9n6x93eg2u8svxjsgk","timedOut":false,"walletError":null}}
```

Provider mappings confirmed every assertion field, the QA address as asserter,
no disputer, and the expected public DOOR balance change from `250000000u128`
to `150000000u128`.

### 4. Read the combined lifecycle state

**What happened:** The frontend read all eight mappings in the table below in
parallel to show market collateral, token supplies, oracle status, and
resolution without relying on client-side assumptions.

| Program | Mapping | Key | Retained result |
|---|---|---|---|
| `doo_prediction_market.aleo` | `markets` | `187031921field` | Canonical stored market struct. |
| `doo_prediction_market.aleo` | `collateral_pool` | `187031921field` | `300000u128` |
| `doo_prediction_market.aleo` | `yes_supply` | `187031921field` | `200000u128` |
| `doo_prediction_market.aleo` | `no_supply` | `187031921field` | `100000u128` |
| `doo_prediction_market.aleo` | `resolved` | `187031921field` | `false` |
| `doo_prediction_market.aleo` | `resolutions` | `187031921field` | Missing until settlement. |
| `dark_optimistic_oracle.aleo` | `assertions` | `187031922field` | Canonical stored assertion struct. |
| `dark_optimistic_oracle.aleo` | `disputers` | `187031922field` | Missing; the assertion was not disputed. |

### 5. Settlement request was not approved

**What happened:** After the grace period, the frontend prepared the correct
optimistic YES settlement parameters and opened Shield. The wallet never
returned a `walletRequestId`, so there was no `submitted` or accepted `response`
entry. This must not be described as an on-chain transaction.

```json
{"retention":"normalized from retained browser evidence","phase":"request","kind":"transaction","network":"testnet","description":"Submit doo_prediction_market.aleo.settle_market","program":"doo_prediction_market.aleo","function":"settle_market","parameters":{"caller":"aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th","inputs":[{"position":0,"name":"market_id","value":"187031921field"},{"position":1,"name":"assertion_id","value":"187031922field"},{"position":2,"name":"reported_outcome","value":"true"},{"position":3,"name":"reported_claim_hash","value":"5324225230327309758036215428934805159243555382598664189792628563485661196146field"},{"position":4,"name":"assertion_valid","value":"true"},{"position":5,"name":"betting_deadline_block_height","value":"18703305u32"}],"fee":1000000,"privateFee":false}}
```

The current mapping check on 2026-08-15 still reports `resolved = false`, no
resolution value, collateral `300000u128`, no disputer, no claimed asserter
award, and QA balance `150000000u128` public DOOR. Settlement and redemption
remain incomplete.

## Preserving future sessions

Use **Download audit LOG.md** after browser QA. Review the generated
plain-English explanations and JSON, then append the relevant dated session to
this file and commit it. Preserve rejected and timed-out calls as well as
accepted calls. Never replace a `walletRequestId` with an assumed on-chain ID,
and never add private record plaintext or wallet secrets.

## Security-audit experiment: 2026-08-15

**What happened:** A fresh audit reviewed the React app, Shield transaction
construction, browser audit journal, Aleo oracle and prediction-market source,
deployment scripts, CI/Pages workflow, dependency graph, tests, tracked secret
history, and the currently deployed Testnet programs. No wallet transaction was
prepared, signed, or broadcast during this audit.

The experiment ran from approximately `2026-08-15T10:09:00Z` through
`2026-08-15T10:18:35Z`.

### Local verification

| Command or check | Result |
|---|---|
| `pnpm check` | Passed: lint, 35 of 35 browser/model tests, static security checks, TypeScript, and the production build. Wallet and provider responses in the unit tests were mocked, not live calls. |
| `pnpm test:contracts` | Passed all 21 Leo helper tests: 10 oracle and 11 prediction-market tests. |
| `pnpm deploy:check` | Devnet, Testnet, and Mainnet dry-run builds passed. No transaction was signed or broadcast. The public-network checks confirmed that canonical `token_registry.aleo` was queryable. |
| `pnpm audit --prod` | No known production dependency vulnerabilities. |
| `pnpm audit` | Reported 7 development-tool advisories: 1 critical, 3 high, and 3 moderate. |
| Current and history-aware tracked-secret scans | No Aleo private key, seed-phrase assignment, wallet-password assignment, or PEM private key was found. `.env.private` remained ignored and mode `600`. |
| Local integration precondition | No `snarkos` or Leo devnet process was running, so the broadcast integration script was not executed. |
| GitHub Pages `HEAD` and index reads | Returned HTTP 200 and the current production asset hashes. HSTS was present; CSP, clickjacking protection, Referrer-Policy, Permissions-Policy, and `X-Content-Type-Options` were absent. |

### Read-only Testnet program verification

All reads used network `testnet` and endpoint
`https://api.provable.com/v2`. They did not require a private key.

1. `leo query program dark_optimistic_oracle.aleo -q` and
   `leo query program doo_prediction_market.aleo -q` returned edition-0 Aleo
   instructions. Whitespace-insensitive diffs against fresh local builds found
   only the intentional constructor administrator substitution:
   `aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf`.
2. `curl -fsS https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/latest_edition`
   and `curl -fsS https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/latest_edition`
   each returned `0`.
3. `leo query program dark_optimistic_oracle.aleo --mapping-value fee_collector 0u8 -q`
   returned the same administrator address. The existing Testnet oracle was
   therefore initialized by the intended account.
4. The `registered_tokens` read for DOOR token
   `346688784394585735039324415800163929700021701423791533632764818774905958305field`
   returned oracle program address
   `aleo1nyflwg9mjfkfp2n9mtng0snxj9qrhahkjxp5l9pag4zxm3qrssrqwv8tml` as token
   administrator and authorization party, with supply
   `999999900000000u128` and maximum `10000000000000000u128`.

The audit found security issues that require remediation before Mainnet. This
entry records the experiment and public network evidence; it is not a claim
that the application is secure or an independent third-party audit.


## Security remediation and Testnet upgrade experiment: 2026-08-15

**What happened:** The audited contract fixes were compiled with Leo 4.4.1,
checked against the deployed edition-0 interfaces, and submitted through the
dedicated Testnet administrator. No wallet password, private key, seed phrase,
private record, transaction signature, or raw provider error body is retained
here.

The experiment ran from approximately `2026-08-15T10:45:00Z` through
`2026-08-15T12:12:25Z` using network `testnet` and the official Provable
API endpoints.

### Read-only preflight and compatibility calls

| Call | Public parameters | Result and purpose |
|---|---|---|
| `get_program` / `latest_edition` | `dark_optimistic_oracle.aleo` | Edition 0. The generated candidate kept its program ID, mappings, records, transition inputs, and finalize input order. |
| `get_program` / `latest_edition` | `doo_prediction_market.aleo` | Edition 0 before the market upgrade. The generated candidate preserved every edition-0 interface and added only `settlement_assertions`. |
| `get_mapping_value` | Oracle `fee_collector[0u8]` | Returned the documented dedicated administrator. |
| `get_mapping_value` | Oracle `assertions[187031922field]` | Returned the retained QA assertion before and after the attempts with identical fields. |
| `get_mapping_value` | Market `markets[187031921field]`, collateral, supplies, and resolution | Returned the retained market, `300000u128` collateral, `200000u128` YES, `100000u128` NO, and `resolved = false`. |

Leo 4.3.4 first produced an obsolete base-fee estimate and the network did not
accept candidate `at184pml9xx44j82g3cz8um4sl4xfesj5lvlxqzyjnk07lyzv7nlcpswcph5e`.
No accepted transaction or fee resulted. Leo 4.4.1 uses the active consensus
V18 cost rules. Local compatibility checks also rejected an oracle initializer
and a market settlement candidate whose finalize input order differed from
edition 0; both were corrected before any broadcast or fee.

### Oracle upgrade calls

The final oracle candidate's public parameters were:

- program: `dark_optimistic_oracle.aleo`;
- existing edition: `0`;
- administrator: the documented dedicated Testnet administrator;
- combined circuit density: `3481397`;
- minimum public fee if accepted: `29.406397` credits;
- dependencies: canonical `token_registry.aleo` and `credits.aleo`.

Consensus V18 gives the target block 75,000 deployment-density units per
certificate, so this candidate needs at least 47 certificates. The following
public deployment IDs reached validators but landed in lower-capacity blocks
and were recorded in each block's `aborted_transaction_ids` list:

| Candidate transaction ID | Block | Certificates | Result |
|---|---:|---:|---|
| `at1550we5h9nnd7sp7mc60n8u35v26m2cpkr7xn7pvmaxevx2ynpc8sp60srj` | 18742086 | 44 | Aborted; no fee or state change. |
| `at1zs4syx646ggk44u5vgkqe74edtfyrf6rcmvrmx9qxe5cnv70ssqqz9hjdt` | 18742208 | 38 | Aborted; no fee or state change. |
| `at197nejl2gj066r49nx4jhdunm86ckf7crahpf620y89cljc022vpqfsdwep` | 18742421 | 41 | Aborted; no fee or state change. |
| `at1zfcprxyanh2hw3xmlafpjk3kh2e02mskctr6g3ruwxaukrhvqvqqu3gy8r` | 18742478 | 38 | Aborted; no fee or state change. |
| `at1gxsl36z6zdnqyzq6zlrft5j03cas25gt9atwav8r8eawckt5jygs3veylj` | 18742531 | 39 | Aborted; no fee or state change. |
| `at1rqrm39jdkccsgepe9qfmmncu6q6hmnsrn8c8f7ddqt6hj03gzy9sphrqex` | 18742557 | 34 | Aborted; no fee or state change. |
| `at1e57gadlhwu9z7nkr4s4hhpml620rxrrqfywflf766ls3lah6gvxsawdg6q` | 18742799 | 36 | Aborted; no fee or state change. |
| `at1ntx9xsdtg89sswyrdex4qa9gl2l2w2tqe5etm4mlny80jq3tdyrqdnd6p0` | 18743022 | 30 | Aborted; no fee or state change. |

The first two rows used the earlier, slightly larger compatible candidate; the
remaining rows used the final `3481397`-density candidate. Several other
provider calls returned HTTP 522 before a candidate ID was returned. They did
not produce an accepted or aborted ledger transaction and charged no fee.

### Accepted prediction-market upgrade

**Operation:** Upgrade `doo_prediction_market.aleo` from edition 0 to edition
1 while leaving the oracle at edition 0.

- Deployment transaction:
  `at1gxza4mhcrendchvguswhyvjvq3ga5pc3wcl7948qvfgzs3g705yslssaal`
- Fee transition:
  `au1tr36sqgsqnu695pc2097trdv096fmm0hmehgql6lqlj00knyyspscsllzn`
- Fee transaction:
  `at14lfgnn4lwxgq2q6hwlxx4y6nlxqvgmytvyzjkepxsf89m9k4hsrq6g62yx`
- Public fee: `12.687318` credits.
- Accepted deployment edition embedded in the transaction: `1`.

One official provider reported edition 1 immediately while another briefly
reported edition 0; the accepted transaction itself embeds edition 1. After the
upgrade, every retained market field and accounting mapping listed above was
unchanged. `settlement_assertions[187031921field]` returned `null`, which is
correct because that legacy QA market has not settled.

### Final state

Final local verification completed after the source and documentation changes:

| Check | Result |
|---|---|
| Webapp lint, Vitest, TypeScript, production build | Passed; 14/14 tests. |
| Prediction-market lint/static checks, Vitest, TypeScript, production build | Passed; 36/36 tests. |
| Leo 4.4.1 core/oracle and market suites | Passed; 10/10 oracle and 13/13 market tests. |
| Devnet, Testnet, and Mainnet deployment dry runs | Passed; no dry run signed or broadcast a transaction. |
| Production and full dependency audits in both apps | Zero known vulnerabilities. |
| Documentation production build | Passed. |

- Oracle: edition 0; security upgrade is committed and tested but still awaits
  a target block with sufficient certificate capacity.
- Prediction market: accepted edition 1 with the settlement-binding and
  distinct-claim fixes active.
- Dedicated administrator public balance: `949027761u64` after the one
  accepted `12.687318`-credit market fee. Oracle aborts did not reduce it.
- Mainnet: no transaction was signed or broadcast.

To retry the oracle safely, install Leo 4.4.1 and run
`LEO_BIN=/path/to/leo-4.4.1 ./deploy_testnet.sh` from `core`. Confirm edition
1 and the preserved mappings before attempting any later edition.

## 2026-08-15 08:29 EDT — Pages release workflow verification

The GitHub Pages workflow was changed to download the official Leo 4.4.1
x86_64 Linux release archive and verify its pinned SHA-256 before running the
same contract tests and three network deployment dry runs. This replaces a
redundant source compilation in CI; it does not alter contract artifacts or
skip any validation. No Aleo read, proof, signed transaction, or broadcast was
performed by this workflow-only change.

The first Linux run passed frontend lint, 36/36 frontend tests, dependency and
static security checks, and Leo installation, then stopped because the
contract-test entrypoint named the macOS-only `/bin/zsh` path. The entrypoint
and every related deployment/build/Devnet integration script were converted to
portable Bash. Local re-verification with Leo 4.4.1 passed 10/10 oracle tests,
13/13 prediction-market tests, and Devnet, Testnet, and Mainnet deployment
builds. The latter were explicit dry runs: they compiled sources and made only
public program-availability/dependency reads; they did not load a private key,
create a proof, sign, submit, or broadcast a transaction, and spent no credits.

The next Pages run reached the portable Bash harness but confirmed that the
hosted runner does not supply the harness's former `rg` command. The scripts
now use standard `grep`. The exact contract suite then passed in a clean Ubuntu
24.04 amd64 container where both `zsh` and `rg` were absent, and all three
unsigned network deployment builds passed again locally. These CI and container
experiments used public source and read-only dependency endpoints only; no
secret environment file was mounted or loaded and no Aleo transaction was
created.

## 2026-08-15 09:08 EDT — Published Pages smoke test

GitHub Actions run `31886243646` completed successfully for commit `7480068`.
It passed frontend lint, 36/36 frontend tests, dependency and static security
checks, the checksum-verified Leo 4.4.1 installation, 10/10 oracle tests, 13/13
market tests, all three unsigned deployment builds, the production build, and
the Pages deployment.

The published site at
`https://dark-optimistic-oracle.github.io/predmkt/` was then loaded in an
integrated browser. The document completed loading with the expected title,
market, explanation, and documentation sections. Public Testnet reads reported
the current block and both programs as available; Shield remained disconnected,
so every transaction control stayed disabled and no proof, wallet request,
signature, submission, or fee occurred.

## 2026-08-15 09:32 EDT — Initialization upgrade-rule assessment

**Purpose:** Determine whether Aleo prevents changes to a function named
`initialize`, and distinguish that function from the immutable upgrade-policy
constructor.

Read-only Testnet calls confirmed oracle edition 0, fetched its public program,
and confirmed the intended fee collector. The on-chain constructor and freshly
compiled candidate constructor matched byte-for-byte. `initialize` retained
zero inputs, one future output, and the same three finalize-input types; only
its internal signer/caller checks changed. No Testnet proof, signature,
transaction, broadcast, or fee occurred.

A disposable local program then made the following Devnet calls using the
generic local fixture account and non-economic Devnet credits:

| Operation | Public parameters | Result |
|---|---|---|
| Deploy `init_upgrade_probe.aleo` edition 0 | Immutable administrator constructor; unrestricted `initialize` logic | Accepted as `at1kmvyghxp3ap534sjj4rkwf9eppmmuq2upjawa0y7nn4l2hjgtuzsyn36rq`. |
| Upgrade the same program | Constructor unchanged; administrator signer/caller checks added inside `initialize`; interfaces unchanged | Accepted as edition 1 in `at1hwq2gmu4zj4000jfjzkgn5w4sskx5jmldt5v57sqq5yakva3ac8q43djuy`. |
| Execute upgraded `initialize` | No user inputs; caller and signer were the public Devnet administrator | Accepted as `at1jxl4yk280d9yut0gawyqydsy4tustu6xx2zjnkc4w76wurx3tu9qrtapzg`; `initialized_by[0u8]` returned the expected administrator. |

The existing local snarkOS 4.8.1 fixture ran consensus V17 while Leo 4.4.1
warned that it expected V18. That is a local harness-version mismatch, not an
upgrade rejection. The inspected active snarkVM 4.9 rule is the same: the
special constructor is immutable, while compatible function/finalize logic is
mutable. The real public blocker remains the oracle candidate's `3481397`
combined density, which needs at least 47 certificates; attempted Testnet blocks
provided only 30–44.

## 2026-08-15 10:18 EDT — Accepted oracle edition-1 upgrade

**Human-readable summary:** The committed oracle security candidate was
profiled without broadcasting, checked against the live edition-0 interface,
and submitted through the dedicated Testnet administrator. A live 60-block
capacity sample found three blocks at or above the required 47 certificates.
The first controlled submission in this run landed in a 78-certificate block
and was accepted. Existing oracle and prediction-market state was preserved,
and oracle initialization was not repeated. No secret, private record,
signature, or wallet credential is retained here.

### Read-only profiling and preflight calls

| Operation | Public parameters | Result and explanation |
|---|---|---|
| `get_program` / `latest_edition` | `dark_optimistic_oracle.aleo` | Loaded edition `0` and passed Leo's live upgrade-interface check. |
| Offline `leo upgrade --save` | Testnet, canonical `token_registry.aleo`, no broadcast | Generated the real artifact with `3481397` combined density and a `29.406397`-credit accepted fee. One transient state-root failure produced no transaction, broadcast, or fee. |
| `get_block` capacity sample | 60 recent Testnet blocks | Counts ranged from 35 to 82 certificates; three blocks could contain this deployment. |
| Contract tests | Leo 4.4.1 with the local registry fixture | Oracle suite passed 10/10. |

### Accepted upgrade call

| Field | Public value |
|---|---|
| Program | `dark_optimistic_oracle.aleo` |
| Previous / accepted edition | `0` / `1` |
| Deployment transaction | `at1900gz2klm9we2deqarpv2fpqhnjqjr3cvr43stxq4525l6s9zupq6r0v5p` |
| Fee transition | `au1w9s7u95tn5h0lgn9gf5nvvwm4sh3gymjzpzprkvckfg2ypu2qq8q8ap0e4` |
| Fee transaction | `at1ga3x8fmn9cc7e2p8r950cy4w3ncpz54ke6upmwh8r5kvu7g4jyqq8zmrag` |
| Accepted block / certificates | `18745064` / `78` |
| Combined deployment density | `3481397` |
| Public fee | `29406397u64` (`29.406397` credits) |
| Administrator balance | `949027761u64` before; `919621364u64` after |

### Post-upgrade verification calls

| Read | Result and purpose |
|---|---|
| Oracle `latest_edition` | Returned `1`. |
| Accepted deployment body | Embedded edition `1`, the correct program ID, and the formatting-normalized locally compiled instructions. |
| Deployed source | Contains the immutable constructor, both `initialize` administrator guards, and the 10-block voting-right purchase cutoff. |
| Oracle `fee_collector[0u8]` | Still the documented dedicated administrator. |
| Oracle `assertions[187031922field]` and related mappings | Exact assertion, creation height `18703569u32`, QA asserter, absent disputer, and zero vote counts were preserved. |
| Prediction-market program and mappings | Remained edition `1`; this oracle upgrade made no market transaction or state change. |

The deployer detected the existing oracle initialization and skipped it, so the
DOOR registration, initial mint, and mappings were not repeated. Final
prediction-market verification passed lint, static security checks, 36/36
Vitest tests, TypeScript, and the production Vite build. No wallet transaction
was needed for those frontend checks.

## 2026-10-02 — Verity rebrand, unit tests, and Pages publication

The prediction-market product is now Verity Prediction Market (short name:
Verity). Updated the header, footer, console, hero, README, page title, social
metadata, and social illustration. The image-generation skill replaced only
the illustration's heading and subtitle with the agreed name and tagline;
the reviewed image is saved as public/og-verity.png. Existing contract IDs and
tool versions are retained.

Local verification: the first unit run passed 35/36 tests and identified an
expectation for the old console heading. After updating that expectation,
pnpm check passed lint, all 36 unit tests, static security checks, TypeScript,
and the production build. No real wallet execution occurs in these mocked
unit tests. Publishing is initiated by pushing this commit to main; live
deployment and browser results will be recorded in a follow-up entry.

Before publication, Chrome loaded the existing public site twice. Its automatic
Testnet reads requested the latest block height and the deployed programs
dark_optimistic_oracle.aleo and doo_prediction_market.aleo from
https://api.provable.com/v2/testnet. Both programs showed Ready; observed
heights were 20133178 and 20133204. The second tab's exact event order was:
height request, oracle request, market request, oracle HTTP 200 response,
market HTTP 200 response, height HTTP 200 response. These reads used no wallet
request or transaction ID and changed no on-chain state. Shield remained
disconnected and its auto-connect attempt reported that it was locked.

The Download audit LOG.md control was invoked, but the browser download API
timed out and macOS denied access to Downloads even with shell approval.
Consequently the exported file could not be merged at this stage. Public
console evidence and visible outcomes were retained instead; no exported
file or successful download is claimed.

### Publication gate and minimal security patches

GitHub Actions run 37091815846 passed lint and unit tests but failed the
dependency-audit gate, so it did not deploy. Local pnpm audit reproduced five
high advisories in Undici and brace-expansion. Initial patches removed the
high advisories; the follow-up report exposed three remaining moderate
advisories in Vitest/mocker and brace-expansion. The final selected patches are
Undici 8.10.2, brace-expansion 5.0.12, and Vitest 4.1.11. These affect frontend
development dependencies only. Contract, wallet, React, and Aleo tool versions
were not changed. The audit export heading also now identifies Verity; its
existing export unit test was updated accordingly.

After the final patches, pnpm check again passed lint, 36/36 unit tests,
static security checks, TypeScript, and the production build. Full pnpm audit
reported no known vulnerabilities. No Testnet transaction was submitted.

### Baseline console evidence (export retrieval unavailable)

These are the second baseline tab's normalized console entries, in their
original event order. Three requests ran concurrently, so response order
differs from request order. Each response completed successfully with HTTP 200.
No wallet request or transaction ID applies to a public read.

```json
{"schema":"aleo-browser-audit/v1","sequence":1,"timestamp":"2026-10-03T02:58:52.806Z","callId":"aleo-call-1","phase":"request","kind":"read","network":"testnet","description":"Read the latest Aleo Testnet block height","function":"get_latest_block_height","parameters":{"httpMethod":"GET","url":"https://api.provable.com/v2/testnet/block/height/latest"}}
{"schema":"aleo-browser-audit/v1","sequence":2,"timestamp":"2026-10-03T02:58:52.807Z","callId":"aleo-call-2","phase":"request","kind":"read","network":"testnet","description":"Read deployed program dark_optimistic_oracle.aleo","program":"dark_optimistic_oracle.aleo","function":"get_program","parameters":{"programId":"dark_optimistic_oracle.aleo","httpMethod":"GET","url":"https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"}}
{"schema":"aleo-browser-audit/v1","sequence":3,"timestamp":"2026-10-03T02:58:52.807Z","callId":"aleo-call-3","phase":"request","kind":"read","network":"testnet","description":"Read deployed program doo_prediction_market.aleo","program":"doo_prediction_market.aleo","function":"get_program","parameters":{"programId":"doo_prediction_market.aleo","httpMethod":"GET","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"}}
{"schema":"aleo-browser-audit/v1","sequence":4,"timestamp":"2026-10-03T02:58:52.902Z","callId":"aleo-call-2","phase":"response","kind":"read","network":"testnet","description":"Read deployed program dark_optimistic_oracle.aleo","program":"dark_optimistic_oracle.aleo","function":"get_program","parameters":{"programId":"dark_optimistic_oracle.aleo","httpMethod":"GET","url":"https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"},"result":{"httpStatus":200,"ok":true}}
{"schema":"aleo-browser-audit/v1","sequence":5,"timestamp":"2026-10-03T02:58:52.905Z","callId":"aleo-call-3","phase":"response","kind":"read","network":"testnet","description":"Read deployed program doo_prediction_market.aleo","program":"doo_prediction_market.aleo","function":"get_program","parameters":{"programId":"doo_prediction_market.aleo","httpMethod":"GET","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"},"result":{"httpStatus":200,"ok":true}}
{"schema":"aleo-browser-audit/v1","sequence":6,"timestamp":"2026-10-03T02:58:52.990Z","callId":"aleo-call-1","phase":"response","kind":"read","network":"testnet","description":"Read the latest Aleo Testnet block height","function":"get_latest_block_height","parameters":{"httpMethod":"GET","url":"https://api.provable.com/v2/testnet/block/height/latest"},"result":{"httpStatus":200,"ok":true}}
```

The first tab showed both programs Ready and height 20133178. Its later console
retrieval was unavailable after the browser reset, so no missing event order or
timestamp is reconstructed for that tab.

### 2026-10-02 23:08 EDT — Published Verity browser verification

GitHub Actions run 37092030322 deployed commit 9b87f98 successfully. Every gate
passed: frontend unit tests, dependency audit, static security checks, Leo
contract tests, Devnet/Testnet/Mainnet deployment-source dry runs, production
build, and Pages publication. The public URL is
https://dark-optimistic-oracle.github.io/predmkt/.

Chrome then reloaded that URL. Its title, header, footer, explanatory copy,
and console all used Verity. Both programs were Ready at height 20133386.
The tester entered market ID 187031921 and assertion ID 187031922 and selected
Load on-chain state. All eight requested mappings returned HTTP 200. The
interface showed collateral 300000u128, YES supply 200000u128, NO supply
100000u128, oracle status Reported, and market resolution Open. Betting,
dispute, and voting deadlines remained 18703305, 18703670, and 18703770.
The assertion reported YES. No settlement or redemption was requested.

The Trade, Report, Review, and Settle panels rendered; the Shield wallet chooser
showed Shield installed and was closed without connecting. Signed-action
controls were disabled while disconnected. Download audit LOG.md was clicked,
but the exported file remained unavailable to the test tooling as explained
above. The original public console entries were used for the evidence below.
Shield's automatic connection attempt reported a locked wallet. Other baseline
console messages came from installed browser extensions; no new application
read failure occurred. This check covers public reads and interface behavior,
not a new connected-wallet transaction lifecycle. No proof, signature, wallet
request ID, transaction ID, fee, or on-chain state change occurred.

The following normalized evidence groups shared call fields once, while keeping
every request and response in the exact observed order. All calls are GET reads
on Testnet at https://api.provable.com/v2/testnet. Timestamp strings are UTC;
03:08 UTC on October 3 is 23:08 EDT on October 2. Response status is HTTP 200
with ok=true. Each mapping key and full endpoint is retained below.

```json
{
  "network": "testnet",
  "httpMethod": "GET",
  "calls": {
    "1": {"function":"get_latest_block_height","url":"https://api.provable.com/v2/testnet/block/height/latest"},
    "2": {"program":"dark_optimistic_oracle.aleo","function":"get_program","programId":"dark_optimistic_oracle.aleo","url":"https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"},
    "3": {"program":"doo_prediction_market.aleo","function":"get_program","programId":"doo_prediction_market.aleo","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"},
    "4": {"program":"doo_prediction_market.aleo","function":"get_mapping_value","mapping":"markets","key":"187031921field","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/187031921field"},
    "5": {"program":"doo_prediction_market.aleo","function":"get_mapping_value","mapping":"collateral_pool","key":"187031921field","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/187031921field"},
    "6": {"program":"doo_prediction_market.aleo","function":"get_mapping_value","mapping":"yes_supply","key":"187031921field","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/187031921field"},
    "7": {"program":"doo_prediction_market.aleo","function":"get_mapping_value","mapping":"no_supply","key":"187031921field","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/187031921field"},
    "8": {"program":"doo_prediction_market.aleo","function":"get_mapping_value","mapping":"resolved","key":"187031921field","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/187031921field"},
    "9": {"program":"doo_prediction_market.aleo","function":"get_mapping_value","mapping":"resolutions","key":"187031921field","url":"https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/187031921field"},
    "10": {"program":"dark_optimistic_oracle.aleo","function":"get_mapping_value","mapping":"assertions","key":"187031922field","url":"https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/187031922field"},
    "11": {"program":"dark_optimistic_oracle.aleo","function":"get_mapping_value","mapping":"disputers","key":"187031922field","url":"https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/187031922field"}
  },
  "eventColumns": ["sequence","callNumber","phase","timestamp"],
  "events": [
    [1,1,"request","2026-10-03T03:08:39.311Z"],
    [2,2,"request","2026-10-03T03:08:39.312Z"],
    [3,3,"request","2026-10-03T03:08:39.312Z"],
    [4,3,"response","2026-10-03T03:08:39.451Z"],
    [5,2,"response","2026-10-03T03:08:39.466Z"],
    [6,1,"response","2026-10-03T03:08:39.490Z"],
    [7,4,"request","2026-10-03T03:08:45.369Z"],
    [8,5,"request","2026-10-03T03:08:45.370Z"],
    [9,6,"request","2026-10-03T03:08:45.371Z"],
    [10,7,"request","2026-10-03T03:08:45.371Z"],
    [11,8,"request","2026-10-03T03:08:45.371Z"],
    [12,9,"request","2026-10-03T03:08:45.371Z"],
    [13,10,"request","2026-10-03T03:08:45.371Z"],
    [14,11,"request","2026-10-03T03:08:45.372Z"],
    [15,6,"response","2026-10-03T03:08:45.474Z"],
    [16,4,"response","2026-10-03T03:08:45.485Z"],
    [17,10,"response","2026-10-03T03:08:45.486Z"],
    [18,5,"response","2026-10-03T03:08:45.489Z"],
    [19,9,"response","2026-10-03T03:08:45.489Z"],
    [20,7,"response","2026-10-03T03:08:45.494Z"],
    [21,11,"response","2026-10-03T03:08:45.506Z"],
    [22,8,"response","2026-10-03T03:08:45.521Z"]
  ],
  "responseResult": {"httpStatus":200,"ok":true},
  "callIdPrefix": "aleo-call-"
}
```


## Imported frontend journal

<!-- audit-export-sha256: b6d246152018eebbd6e9b670b1d9778fee0ecbf483276d9d44317be6b7f7c644 -->

## Verity Prediction Market Aleo call log

Generated: 2026-10-03T05:53:36.616Z.

> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.

### 1. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:57:21.051Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T02:57:21.051Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 2. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:57:21.051Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T02:57:21.051Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 3. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:57:21.051Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T02:57:21.051Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

### 4. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:57:21.329Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T02:57:21.329Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 5. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:57:21.349Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T02:57:21.349Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 6. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:57:21.349Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T02:57:21.349Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 7. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:58:52.806Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T02:58:52.806Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 8. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:58:52.807Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T02:58:52.807Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 9. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:58:52.807Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T02:58:52.807Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

### 10. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:58:52.902Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T02:58:52.902Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 11. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:58:52.905Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T02:58:52.905Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 12. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:58:52.990Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T02:58:52.990Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 13. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:39.311Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T03:08:39.311Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 14. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:39.312Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T03:08:39.312Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 15. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:39.312Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T03:08:39.312Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

### 16. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:39.451Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T03:08:39.451Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 17. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:39.466Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T03:08:39.466Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 18. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:39.490Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T03:08:39.490Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 19. Read doo_prediction_market.aleo.markets[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.369Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T03:08:45.369Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/187031921field"
  }
}
```

### 20. Read doo_prediction_market.aleo.collateral_pool[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.370Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T03:08:45.370Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/187031921field"
  }
}
```

### 21. Read doo_prediction_market.aleo.yes_supply[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/187031921field"
  }
}
```

### 22. Read doo_prediction_market.aleo.no_supply[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/187031921field"
  }
}
```

### 23. Read doo_prediction_market.aleo.resolved[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/187031921field"
  }
}
```

### 24. Read doo_prediction_market.aleo.resolutions[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/187031921field"
  }
}
```

### 25. Read dark_optimistic_oracle.aleo.assertions[187031922field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[187031922field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/187031922field"
  }
}
```

### 26. Read dark_optimistic_oracle.aleo.disputers[187031922field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[187031922field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.372Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T03:08:45.372Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/187031922field"
  }
}
```

### 27. Read doo_prediction_market.aleo.yes_supply[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.474Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T03:08:45.474Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 28. Read doo_prediction_market.aleo.markets[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.485Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T03:08:45.485Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 29. Read dark_optimistic_oracle.aleo.assertions[187031922field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.486Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T03:08:45.486Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/187031922field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 30. Read doo_prediction_market.aleo.collateral_pool[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.489Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T03:08:45.489Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 31. Read doo_prediction_market.aleo.resolutions[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.489Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T03:08:45.489Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 32. Read doo_prediction_market.aleo.no_supply[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.494Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T03:08:45.494Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 33. Read dark_optimistic_oracle.aleo.disputers[187031922field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.506Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T03:08:45.506Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/187031922field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 34. Read doo_prediction_market.aleo.resolved[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.521Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T03:08:45.521Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 35. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:07.730Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:43:07.730Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 36. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:07.731Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:43:07.731Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 37. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:07.731Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:43:07.731Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

### 38. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:07.826Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:43:07.826Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 39. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:07.844Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:43:07.844Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 40. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:07.860Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:43:07.860Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 41. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:40.971Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:43:40.971Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

### 42. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:40.971Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:43:40.971Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

### 43. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:40.971Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:43:40.971Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

### 44. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:41.074Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:43:41.074Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 45. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:41.082Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:43:41.082Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 46. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:41.083Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:43:41.083Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 47. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.398Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T05:43:46.398Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 48. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.399Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T05:43:46.399Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 49. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 50. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 51. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 52. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 53. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.401Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T05:43:46.401Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 54. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.401Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T05:43:46.401Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

### 55. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.501Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T05:43:46.501Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 56. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.503Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T05:43:46.503Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 57. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T05:43:46.504Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 58. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T05:43:46.504Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 59. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.512Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T05:43:46.512Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 60. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.515Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T05:43:46.515Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 61. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.519Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T05:43:46.519Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 62. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.531Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T05:43:46.531Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 63. Submit doo_prediction_market.aleo.create_market

**What happened:** The frontend prepared doo_prediction_market.aleo.create_market and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:43:56.631Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `doo_prediction_market.aleo`
- Function: `create_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T05:43:56.631Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.create_market",
  "program": "doo_prediction_market.aleo",
  "function": "create_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market",
        "value": "{\n        id: 202610031field,\n        question_hash: 3481789625393402739888395340240929917743009203549756830888972568957464392455field,\n        yes_claim_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        no_claim_hash: 2967417042158376102450225601938321003547211130752879883823781015207720436798field,\n        assertion_id: 2026100304field,\n        yes_token_id: 47542102130958773753794360442534411634158207078581067571747032812316018272field,\n        no_token_id: 6207808296571808278410508335905718647193302544372670956367431273532282847822field,\n        yes_token_name: 27627974637881300243136394033u128,\n        no_token_name: 94670206692189310622380849u128,\n        yes_token_symbol: 27627974637881300243136394033u128,\n        no_token_symbol: 94670206692189310622380849u128,\n        betting_deadline_block_height: 20136440u32\n      }"
      },
      {
        "position": 1,
        "name": "initial_liquidity",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-04"
  }
}
```

### 64. Submit doo_prediction_market.aleo.create_market

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:44:16.116Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `doo_prediction_market.aleo`
- Function: `create_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T05:44:16.116Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.create_market",
  "program": "doo_prediction_market.aleo",
  "function": "create_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market",
        "value": "{\n        id: 202610031field,\n        question_hash: 3481789625393402739888395340240929917743009203549756830888972568957464392455field,\n        yes_claim_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        no_claim_hash: 2967417042158376102450225601938321003547211130752879883823781015207720436798field,\n        assertion_id: 2026100304field,\n        yes_token_id: 47542102130958773753794360442534411634158207078581067571747032812316018272field,\n        no_token_id: 6207808296571808278410508335905718647193302544372670956367431273532282847822field,\n        yes_token_name: 27627974637881300243136394033u128,\n        no_token_name: 94670206692189310622380849u128,\n        yes_token_symbol: 27627974637881300243136394033u128,\n        no_token_symbol: 94670206692189310622380849u128,\n        betting_deadline_block_height: 20136440u32\n      }"
      },
      {
        "position": 1,
        "name": "initial_liquidity",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-04"
  },
  "result": {
    "walletRequestId": "shield_1791006256110_by9dpchdnd"
  }
}
```

### 65. Submit doo_prediction_market.aleo.create_market

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1etkdf8ak0m0mst4tgrepr4ka6ctq9gx70a7dkghyp8ruqat8z5fq9637my.

- Time: 2026-10-03T05:44:40.188Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `doo_prediction_market.aleo`
- Function: `create_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T05:44:40.188Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.create_market",
  "program": "doo_prediction_market.aleo",
  "function": "create_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market",
        "value": "{\n        id: 202610031field,\n        question_hash: 3481789625393402739888395340240929917743009203549756830888972568957464392455field,\n        yes_claim_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        no_claim_hash: 2967417042158376102450225601938321003547211130752879883823781015207720436798field,\n        assertion_id: 2026100304field,\n        yes_token_id: 47542102130958773753794360442534411634158207078581067571747032812316018272field,\n        no_token_id: 6207808296571808278410508335905718647193302544372670956367431273532282847822field,\n        yes_token_name: 27627974637881300243136394033u128,\n        no_token_name: 94670206692189310622380849u128,\n        yes_token_symbol: 27627974637881300243136394033u128,\n        no_token_symbol: 94670206692189310622380849u128,\n        betting_deadline_block_height: 20136440u32\n      }"
      },
      {
        "position": 1,
        "name": "initial_liquidity",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-04"
  },
  "result": {
    "walletRequestId": "shield_1791006256110_by9dpchdnd",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1etkdf8ak0m0mst4tgrepr4ka6ctq9gx70a7dkghyp8ruqat8z5fq9637my",
    "statusPollAttempts": 13,
    "timedOut": false,
    "walletError": null
  }
}
```

### 66. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** The frontend prepared doo_prediction_market.aleo.buy_outcome and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:00.586Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-13`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-05`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T05:45:00.586Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "true"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "20000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-05"
  }
}
```

### 67. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:10.089Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-13`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-05`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T05:45:10.089Z",
  "callId": "aleo-call-13",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "true"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "20000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-05"
  },
  "result": {
    "walletRequestId": "shield_1791006310084_h45pa7nmkjn"
  }
}
```

### 68. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1ngwzavtnaw967kq5j6s6xm5j4eq8v85rfs3vdkzfcrzw76jt0ypqyl9kzj.

- Time: 2026-10-03T05:45:30.336Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-13`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-05`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T05:45:30.336Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "true"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "20000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-05"
  },
  "result": {
    "walletRequestId": "shield_1791006310084_h45pa7nmkjn",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1ngwzavtnaw967kq5j6s6xm5j4eq8v85rfs3vdkzfcrzw76jt0ypqyl9kzj",
    "statusPollAttempts": 11,
    "timedOut": false,
    "walletError": null
  }
}
```

### 69. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** The frontend prepared doo_prediction_market.aleo.buy_outcome and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:39.964Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T05:45:39.964Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "false"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "6207808296571808278410508335905718647193302544372670956367431273532282847822field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 70. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:52.077Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T05:45:52.077Z",
  "callId": "aleo-call-14",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "false"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "6207808296571808278410508335905718647193302544372670956367431273532282847822field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "walletRequestId": "shield_1791006352074_dj2p4ulf1c"
  }
}
```

### 71. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1nea9t05gq4fruz3tl5cr44xfpzu7g0am89tfd4uyguts4ytv7vps6cg7d7.

- Time: 2026-10-03T05:45:58.090Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T05:45:58.090Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "false"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "6207808296571808278410508335905718647193302544372670956367431273532282847822field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "walletRequestId": "shield_1791006352074_dj2p4ulf1c",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1nea9t05gq4fruz3tl5cr44xfpzu7g0am89tfd4uyguts4ytv7vps6cg7d7",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

### 72. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.778Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T05:45:58.778Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 73. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.779Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T05:45:58.779Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 74. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.779Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T05:45:58.779Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 75. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.779Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T05:45:58.779Z",
  "callId": "aleo-call-18",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 76. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-19`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 77. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-20`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 78. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-21",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 79. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-22",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 80. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.881Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T05:45:58.881Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 81. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.883Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T05:45:58.883Z",
  "callId": "aleo-call-18",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 82. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.883Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T05:45:58.883Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 83. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.885Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-19`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T05:45:58.885Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 84. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.891Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T05:45:58.891Z",
  "callId": "aleo-call-21",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 85. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.895Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T05:45:58.895Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 86. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.895Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T05:45:58.895Z",
  "callId": "aleo-call-22",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 87. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.902Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-20`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T05:45:58.902Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 88. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.531Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T05:46:18.531Z",
  "callId": "aleo-call-23",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 89. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.532Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-24`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 49,
  "timestamp": "2026-10-03T05:46:18.532Z",
  "callId": "aleo-call-24",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 90. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.533Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-25`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 50,
  "timestamp": "2026-10-03T05:46:18.533Z",
  "callId": "aleo-call-25",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 91. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.533Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-26`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 51,
  "timestamp": "2026-10-03T05:46:18.533Z",
  "callId": "aleo-call-26",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 92. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.534Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-27`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 52,
  "timestamp": "2026-10-03T05:46:18.534Z",
  "callId": "aleo-call-27",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 93. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.535Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-28`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 53,
  "timestamp": "2026-10-03T05:46:18.535Z",
  "callId": "aleo-call-28",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 94. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.536Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-29`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 54,
  "timestamp": "2026-10-03T05:46:18.536Z",
  "callId": "aleo-call-29",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 95. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.537Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-30`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 55,
  "timestamp": "2026-10-03T05:46:18.537Z",
  "callId": "aleo-call-30",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

### 96. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.635Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 56,
  "timestamp": "2026-10-03T05:46:18.635Z",
  "callId": "aleo-call-23",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 97. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.642Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-27`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 57,
  "timestamp": "2026-10-03T05:46:18.642Z",
  "callId": "aleo-call-27",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 98. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.645Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-25`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 58,
  "timestamp": "2026-10-03T05:46:18.645Z",
  "callId": "aleo-call-25",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 99. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.657Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-29`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 59,
  "timestamp": "2026-10-03T05:46:18.657Z",
  "callId": "aleo-call-29",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 100. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.659Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-26`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 60,
  "timestamp": "2026-10-03T05:46:18.659Z",
  "callId": "aleo-call-26",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 101. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.660Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-30`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 61,
  "timestamp": "2026-10-03T05:46:18.660Z",
  "callId": "aleo-call-30",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 102. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.662Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-28`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 62,
  "timestamp": "2026-10-03T05:46:18.662Z",
  "callId": "aleo-call-28",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 103. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.677Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-24`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 63,
  "timestamp": "2026-10-03T05:46:18.677Z",
  "callId": "aleo-call-24",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 104. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:47:06.771Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-31`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-07`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 64,
  "timestamp": "2026-10-03T05:47:06.771Z",
  "callId": "aleo-call-31",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100304field,\n        title: 202610031field,\n        content_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136480u32,\n        voting_deadline_block_height: 20136520u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-07"
  }
}
```

### 105. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:47:19.601Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-31`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-07`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 65,
  "timestamp": "2026-10-03T05:47:19.601Z",
  "callId": "aleo-call-31",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100304field,\n        title: 202610031field,\n        content_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136480u32,\n        voting_deadline_block_height: 20136520u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-07"
  },
  "result": {
    "walletRequestId": "shield_1791006439599_6s138o4nif5"
  }
}
```

### 106. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1rdmdxp6mthz33r08st5paptejxhq08h05mty37pw8y08chncuyxsendv0r.

- Time: 2026-10-03T05:47:25.619Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-31`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-07`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 66,
  "timestamp": "2026-10-03T05:47:25.619Z",
  "callId": "aleo-call-31",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100304field,\n        title: 202610031field,\n        content_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136480u32,\n        voting_deadline_block_height: 20136520u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-07"
  },
  "result": {
    "walletRequestId": "shield_1791006439599_6s138o4nif5",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1rdmdxp6mthz33r08st5paptejxhq08h05mty37pw8y08chncuyxsendv0r",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

### 107. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.388Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-32`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 67,
  "timestamp": "2026-10-03T05:48:40.388Z",
  "callId": "aleo-call-32",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 108. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.389Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-33`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 68,
  "timestamp": "2026-10-03T05:48:40.389Z",
  "callId": "aleo-call-33",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 109. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.390Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-34`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 69,
  "timestamp": "2026-10-03T05:48:40.390Z",
  "callId": "aleo-call-34",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 110. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.391Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-35`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 70,
  "timestamp": "2026-10-03T05:48:40.391Z",
  "callId": "aleo-call-35",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 111. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.392Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-36`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 71,
  "timestamp": "2026-10-03T05:48:40.392Z",
  "callId": "aleo-call-36",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 112. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.392Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-37`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 72,
  "timestamp": "2026-10-03T05:48:40.392Z",
  "callId": "aleo-call-37",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 113. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.393Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-38`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 73,
  "timestamp": "2026-10-03T05:48:40.393Z",
  "callId": "aleo-call-38",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 114. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.393Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-39`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 74,
  "timestamp": "2026-10-03T05:48:40.393Z",
  "callId": "aleo-call-39",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

### 115. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.500Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-39`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 75,
  "timestamp": "2026-10-03T05:48:40.500Z",
  "callId": "aleo-call-39",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 116. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-35`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 76,
  "timestamp": "2026-10-03T05:48:40.504Z",
  "callId": "aleo-call-35",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 117. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.511Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-37`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 77,
  "timestamp": "2026-10-03T05:48:40.511Z",
  "callId": "aleo-call-37",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 118. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.511Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-32`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 78,
  "timestamp": "2026-10-03T05:48:40.511Z",
  "callId": "aleo-call-32",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 119. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.514Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-38`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 79,
  "timestamp": "2026-10-03T05:48:40.514Z",
  "callId": "aleo-call-38",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 120. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.514Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-33`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 80,
  "timestamp": "2026-10-03T05:48:40.514Z",
  "callId": "aleo-call-33",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 121. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.522Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-36`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 81,
  "timestamp": "2026-10-03T05:48:40.522Z",
  "callId": "aleo-call-36",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 122. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.525Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-34`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 82,
  "timestamp": "2026-10-03T05:48:40.525Z",
  "callId": "aleo-call-34",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 123. Submit doo_prediction_market.aleo.settle_market

**What happened:** The frontend prepared doo_prediction_market.aleo.settle_market and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:49:24.087Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-40`
- Program: `doo_prediction_market.aleo`
- Function: `settle_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 83,
  "timestamp": "2026-10-03T05:49:24.087Z",
  "callId": "aleo-call-40",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.settle_market",
  "program": "doo_prediction_market.aleo",
  "function": "settle_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100304field"
      },
      {
        "position": 2,
        "name": "reported_outcome",
        "value": "true"
      },
      {
        "position": 3,
        "name": "reported_claim_hash",
        "value": "4204338562457074975679592853958942804323265852425148722077598929334955251420field"
      },
      {
        "position": 4,
        "name": "assertion_valid",
        "value": "true"
      },
      {
        "position": 5,
        "name": "betting_deadline_block_height",
        "value": "20136440u32"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-09"
  }
}
```

### 124. Submit doo_prediction_market.aleo.settle_market

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:49:43.527Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-40`
- Program: `doo_prediction_market.aleo`
- Function: `settle_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 84,
  "timestamp": "2026-10-03T05:49:43.527Z",
  "callId": "aleo-call-40",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.settle_market",
  "program": "doo_prediction_market.aleo",
  "function": "settle_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100304field"
      },
      {
        "position": 2,
        "name": "reported_outcome",
        "value": "true"
      },
      {
        "position": 3,
        "name": "reported_claim_hash",
        "value": "4204338562457074975679592853958942804323265852425148722077598929334955251420field"
      },
      {
        "position": 4,
        "name": "assertion_valid",
        "value": "true"
      },
      {
        "position": 5,
        "name": "betting_deadline_block_height",
        "value": "20136440u32"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-09"
  },
  "result": {
    "walletRequestId": "shield_1791006583525_j96g4al49m"
  }
}
```

### 125. Submit doo_prediction_market.aleo.settle_market

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at12kys8n07pd95nj6ezwnwghdzmkpv8gtz69ryuwyk6qs2ncqgtsqqfns8v8.

- Time: 2026-10-03T05:49:57.565Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-40`
- Program: `doo_prediction_market.aleo`
- Function: `settle_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 85,
  "timestamp": "2026-10-03T05:49:57.565Z",
  "callId": "aleo-call-40",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.settle_market",
  "program": "doo_prediction_market.aleo",
  "function": "settle_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100304field"
      },
      {
        "position": 2,
        "name": "reported_outcome",
        "value": "true"
      },
      {
        "position": 3,
        "name": "reported_claim_hash",
        "value": "4204338562457074975679592853958942804323265852425148722077598929334955251420field"
      },
      {
        "position": 4,
        "name": "assertion_valid",
        "value": "true"
      },
      {
        "position": 5,
        "name": "betting_deadline_block_height",
        "value": "20136440u32"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-09"
  },
  "result": {
    "walletRequestId": "shield_1791006583525_j96g4al49m",
    "walletStatus": "accepted",
    "onchainTransactionId": "at12kys8n07pd95nj6ezwnwghdzmkpv8gtz69ryuwyk6qs2ncqgtsqqfns8v8",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 126. Submit doo_prediction_market.aleo.redeem_winning_tokens

**What happened:** The frontend prepared doo_prediction_market.aleo.redeem_winning_tokens and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:50:24.005Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-41`
- Program: `doo_prediction_market.aleo`
- Function: `redeem_winning_tokens`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 86,
  "timestamp": "2026-10-03T05:50:24.005Z",
  "callId": "aleo-call-41",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.redeem_winning_tokens",
  "program": "doo_prediction_market.aleo",
  "function": "redeem_winning_tokens",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "30000u128"
      },
      {
        "position": 3,
        "name": "payout_microcredits",
        "value": "50000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-10"
  }
}
```

### 127. Submit doo_prediction_market.aleo.redeem_winning_tokens

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:50:45.090Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-41`
- Program: `doo_prediction_market.aleo`
- Function: `redeem_winning_tokens`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 87,
  "timestamp": "2026-10-03T05:50:45.090Z",
  "callId": "aleo-call-41",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.redeem_winning_tokens",
  "program": "doo_prediction_market.aleo",
  "function": "redeem_winning_tokens",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "30000u128"
      },
      {
        "position": 3,
        "name": "payout_microcredits",
        "value": "50000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-10"
  },
  "result": {
    "walletRequestId": "shield_1791006645089_1h6wm8tdfcj"
  }
}
```

### 128. Submit doo_prediction_market.aleo.redeem_winning_tokens

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1cc9pxmztszs92yvfemwfpatdspyr5rzkrl2htn375zmcjafrcyqq5f20lk.

- Time: 2026-10-03T05:51:01.135Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-41`
- Program: `doo_prediction_market.aleo`
- Function: `redeem_winning_tokens`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 88,
  "timestamp": "2026-10-03T05:51:01.135Z",
  "callId": "aleo-call-41",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.redeem_winning_tokens",
  "program": "doo_prediction_market.aleo",
  "function": "redeem_winning_tokens",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "30000u128"
      },
      {
        "position": 3,
        "name": "payout_microcredits",
        "value": "50000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-10"
  },
  "result": {
    "walletRequestId": "shield_1791006645089_1h6wm8tdfcj",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1cc9pxmztszs92yvfemwfpatdspyr5rzkrl2htn375zmcjafrcyqq5f20lk",
    "statusPollAttempts": 9,
    "timedOut": false,
    "walletError": null
  }
}
```

### 129. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.084Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-42`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 89,
  "timestamp": "2026-10-03T05:51:02.084Z",
  "callId": "aleo-call-42",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 130. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.085Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-43`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 90,
  "timestamp": "2026-10-03T05:51:02.085Z",
  "callId": "aleo-call-43",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 131. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.085Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-44`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 91,
  "timestamp": "2026-10-03T05:51:02.085Z",
  "callId": "aleo-call-44",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 132. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.086Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-45`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 92,
  "timestamp": "2026-10-03T05:51:02.086Z",
  "callId": "aleo-call-45",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 133. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.087Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-46`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 93,
  "timestamp": "2026-10-03T05:51:02.087Z",
  "callId": "aleo-call-46",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 134. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.088Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-47`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 94,
  "timestamp": "2026-10-03T05:51:02.088Z",
  "callId": "aleo-call-47",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 135. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.088Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-48`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 95,
  "timestamp": "2026-10-03T05:51:02.088Z",
  "callId": "aleo-call-48",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 136. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.089Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-49`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 96,
  "timestamp": "2026-10-03T05:51:02.089Z",
  "callId": "aleo-call-49",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 137. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.189Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-42`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 97,
  "timestamp": "2026-10-03T05:51:02.189Z",
  "callId": "aleo-call-42",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 138. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.196Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-49`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 98,
  "timestamp": "2026-10-03T05:51:02.196Z",
  "callId": "aleo-call-49",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 139. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.198Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-46`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 99,
  "timestamp": "2026-10-03T05:51:02.198Z",
  "callId": "aleo-call-46",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 140. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.201Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-45`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 100,
  "timestamp": "2026-10-03T05:51:02.201Z",
  "callId": "aleo-call-45",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 141. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.202Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-44`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 101,
  "timestamp": "2026-10-03T05:51:02.202Z",
  "callId": "aleo-call-44",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 142. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.206Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-47`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 102,
  "timestamp": "2026-10-03T05:51:02.206Z",
  "callId": "aleo-call-47",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 143. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.213Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-48`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 103,
  "timestamp": "2026-10-03T05:51:02.213Z",
  "callId": "aleo-call-48",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 144. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.222Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-43`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 104,
  "timestamp": "2026-10-03T05:51:02.222Z",
  "callId": "aleo-call-43",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 145. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.306Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-50`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 105,
  "timestamp": "2026-10-03T05:52:00.306Z",
  "callId": "aleo-call-50",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 146. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.307Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-51`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 106,
  "timestamp": "2026-10-03T05:52:00.307Z",
  "callId": "aleo-call-51",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 147. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.308Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-52`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 107,
  "timestamp": "2026-10-03T05:52:00.308Z",
  "callId": "aleo-call-52",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 148. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.309Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-53`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 108,
  "timestamp": "2026-10-03T05:52:00.309Z",
  "callId": "aleo-call-53",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 149. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.309Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-54`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 109,
  "timestamp": "2026-10-03T05:52:00.309Z",
  "callId": "aleo-call-54",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 150. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.310Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-55`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 110,
  "timestamp": "2026-10-03T05:52:00.310Z",
  "callId": "aleo-call-55",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 151. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.310Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-56`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 111,
  "timestamp": "2026-10-03T05:52:00.310Z",
  "callId": "aleo-call-56",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 152. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.312Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-57`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 112,
  "timestamp": "2026-10-03T05:52:00.312Z",
  "callId": "aleo-call-57",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

### 153. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.420Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-55`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 113,
  "timestamp": "2026-10-03T05:52:00.420Z",
  "callId": "aleo-call-55",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 154. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.426Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-50`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 114,
  "timestamp": "2026-10-03T05:52:00.426Z",
  "callId": "aleo-call-50",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 155. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.426Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-54`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 115,
  "timestamp": "2026-10-03T05:52:00.426Z",
  "callId": "aleo-call-54",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 156. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.430Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-53`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 116,
  "timestamp": "2026-10-03T05:52:00.430Z",
  "callId": "aleo-call-53",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 157. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.435Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-56`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 117,
  "timestamp": "2026-10-03T05:52:00.435Z",
  "callId": "aleo-call-56",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 158. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.440Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-51`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 118,
  "timestamp": "2026-10-03T05:52:00.440Z",
  "callId": "aleo-call-51",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 159. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.443Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-52`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 119,
  "timestamp": "2026-10-03T05:52:00.443Z",
  "callId": "aleo-call-52",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 160. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.475Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-57`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 120,
  "timestamp": "2026-10-03T05:52:00.475Z",
  "callId": "aleo-call-57",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```
