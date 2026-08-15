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

All writes use a public fee of 1,000,000 microcredits and require interactive
Shield approval.

| Program and function | Ordered named inputs | Operation |
|---|---|---|
| `doo_prediction_market.aleo/create_market` | `market`, `initial_liquidity` | Registers independent YES and NO assets, deposits equal neutral collateral for each side, and records the oracle binding. |
| `doo_prediction_market.aleo/buy_outcome` | `market_id`, `outcome`, `outcome_token_id`, `amount` | Deposits public credits and mints only the selected market outcome asset. DOOR is not involved. |
| `dark_optimistic_oracle.aleo/create_assertion` | `assertion` | Bonds public DOOR and reports the market's canonical YES or NO claim. |
| `dark_optimistic_oracle.aleo/dispute_assertion` | `assertion_id`, `assertion_cost` | Bonds matching public DOOR before the grace period ends and opens private voting. |
| `dark_optimistic_oracle.aleo/new_voting_right` | `payment`, `assertion_id`, `voter_stake` | Consumes a private DOOR payment record and creates a private voting right. |
| `dark_optimistic_oracle.aleo/confirm` | `voting_right` | Consumes a private right and adds one public confirm vote while returning a private receipt. |
| `dark_optimistic_oracle.aleo/deny` | `voting_right` | Consumes a private right and adds one public deny vote while returning a private receipt. |
| `doo_prediction_market.aleo/settle_market` | `market_id`, `assertion_id`, `reported_outcome`, `reported_claim_hash`, `assertion_valid`, `betting_deadline_block_height` | Verifies the assertion lifecycle and fixes the winning YES/NO outcome. |
| `doo_prediction_market.aleo/redeem_winning_tokens` | `market_id`, `outcome_token_id`, `amount`, `payout_microcredits` | Burns winning outcome tokens and pays their exact proportional share of all collateral. Losing tokens have no redemption path. |

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
