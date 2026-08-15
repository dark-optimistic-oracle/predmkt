# Prediction market Aleo call log

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
