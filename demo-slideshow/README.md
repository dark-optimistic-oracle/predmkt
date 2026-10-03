# Verity Prediction Market demo: viewing and verification

This folder contains a 20-slide capture of actual Aleo Testnet operations from
the published frontend, recorded on 2026-10-03 as run `demo-20261003`.
It demonstrates complete settlement/redemption lifecycles for the two exercised
market scenarios. It does not prove every protocol path or replace a security audit.

## View the slideshow

Download or clone this repository and open [index.html](index.html) in a browser,
keeping all neighboring images in this folder. Scroll through the numbered
slides. No wallet, server or new transaction is needed. GitHub's HTML source
view is not the presentation; download the whole folder rather than HTML alone.
Alternatively open [DEMO_SLIDESHOW.pdf](DEMO_SLIDESHOW.pdf) in a PDF viewer and
use full-screen/presentation mode. Original screenshots are `slideN.jpg` and
`slideN.png`; each presentation caption identifies its screenplay/call step.

## Trace the calls

- [DEMO_SCREENPLAY.md](DEMO_SCREENPLAY.md): clicks, explanations and demo markers.
- [CALLING_SEQUENCE.md](CALLING_SEQUENCE.md): exact execution sequence, public
  inputs, asset IDs, deadlines, wallet/chain IDs and expected state changes.
- [../LOG.md](../LOG.md): consolidated ordered journal with human explanations
  and normalized request/submission/response JSON.
- [AUDIT_EXPORT.md](AUDIT_EXPORT.md) and
  [AUDIT_PRIVATE_FINAL.md](AUDIT_PRIVATE_FINAL.md): browser-export snapshots.
  They can overlap; duplicate journal entries are not new transactions.
- [../AUDIT.md](../AUDIT.md): security findings and remaining improvements.

Match slide markers `VER-*` or `VER-DISPUTED-*` to log entries, then match wallet
request IDs to terminal responses containing chain transaction IDs. Use callId
and timestamp within each snapshot; counters may restart after reloads.
Approval/submission is not acceptance. Read responses can arrive out of request
order; early indexed state must not be mistaken for the final readback.

Open `https://testnet.explorer.provable.com/transaction/<transaction-ID>` with
each exact accepted ID. Check Testnet, accepted status, program/function,
available public inputs, block and nested transitions. Settlement calls
`doo_prediction_market.aleo/settle_market` with the nested Oracle
`verify_assertion_outcome`; redemption includes registry burning and credits
payment. Match those transitions to the subsequent mapping state in LOG.md.
Explorer cannot reveal private voting plaintext; fingerprints are retained in
logs, not secret record contents.

Public reads use `https://api.provable.com/v2`, with fallback
`https://api.explorer.provable.com/v2`; each journal entry identifies its actual
endpoint. Shield's submission endpoint is not exposed by the adapter. Wallet
record loading is not a blockchain execution; wallet connection, local hashing
and log export are not transactions.

## Evidence of the market semantics

The initial market 202610031 demonstrates creation, separate YES/NO purchases,
an undisputed YES report, Oracle-gated settlement after grace, and redemption.
The second market 202610032 demonstrates a NO report, dispute, private deny and
confirm votes, and an additional deny in the Oracle frontend. Its assertion
2026100305 ended with 1 confirm and 2 deny votes. After voting closed, settlement
used reported NO=false and assertion_valid=false; the contract derived YES.
There is no direct requested-YES input bypassing Oracle verification.

For the second market, all 30000 winning YES units redeemed for the entire
50000-microcredit collateral pool. Final readback shows YES and pool 0; supply
mappings retain historical settlement denominators. Losing NO units have no
payout entitlement. DOOR voter stakes are independent of both outcome tokens
and ALEO collateral. Cross-app additional voting and Oracle rewards are recorded
in [the webapp repository](https://github.com/dark-optimistic-oracle/webapp/tree/main/demo-slideshow)
and its root LOG.md; they are not falsely attributed to this frontend's journal.

## Review limits and completeness

All roles use one QA wallet, not independent participants. Screenshots and logs
support the exercised mechanics, not independent consensus or objective truth.
The current UI requires a manually calculated exact redemption payout. It does
not pre-disable the losing asset selector; eligibility is contract-enforced.
No losing redemption was submitted just to burn fees. Admin/upgrade paths,
all adversarial cases and all deadline boundaries are not captured in these
slides. Earlier captions refer to their checkpoint; the later private extension
and consolidated log establish completion of the disputed scenario.
At completion, 39 unit tests, lint, static security checks and production build
passed. These are complementary checks, not evidence of exhaustive correctness.
No credentials, private keys or private record plaintext are published.
