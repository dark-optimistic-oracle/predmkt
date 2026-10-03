# Verity Prediction Market — screenshot screenplay

Run: `demo-20261003`. Open the published site with `?demo=demo-20261003`.
Set **Demo step** to the identifier below before every action. Capture only
public forms, results and wallet approval details; never private record inputs.
Each numbered slide must identify its step and corresponding calling-sequence
entry. This is a planned walkthrough until linked to accepted transactions.

Use a fresh market (suggested `202610031`) and assertion (`2026100304`), first
checking that they do not exist. Preserve older QA state. Choose block deadlines
from the live Testnet height, allowing time for proofs and approvals. Do not use
wall-clock estimates as evidence that an on-chain deadline has passed.

| Step | Where to click and what to show | Aleo calls |
| --- | --- | --- |
| VER-01 | Open the home page; show Verity branding, purpose, token illustration and documentation links. | Startup height and deployed-program reads. |
| VER-02 | Click Connect Wallet, select Shield; show Testnet QA account connected. | Wallet connection, no contract transition. |
| VER-03 | Set Market ID and Assertion ID; click Load on-chain state. | Market and oracle mapping reads; verify fresh IDs. |
| VER-04 | Trade: enter a binary question and distinct canonical YES/NO claims, betting deadline, and liquidity 10000 microcredits per outcome. Click Create market; approve in Shield. | `doo_prediction_market.aleo/create_market`; nested token registration, minting and credits escrow transfer. |
| VER-05 | Trade: collateral 20000; click Mint YES. Approve and show accepted result. | Market `buy_outcome`, YES token mint and credits deposit. |
| VER-06 | Trade: collateral 10000; click Mint NO. Approve, then Load on-chain state. | Market `buy_outcome`, NO token mint; mapping reads. Expected pool 50000, YES supply 30000, NO supply 20000. |
| VER-07 | Wait until chain height is strictly past betting close. Report: select Report YES, bond 1000 DOOR units, voter stake 100; choose fresh dispute and vote deadlines (at least 10 blocks apart). Click Report YES outcome; approve. | Oracle `create_assertion`; bonded DOOR burn. |
| VER-08 | Review: explain dispute and private voting. For the undisputed branch, do not click Dispute. Wait until grace deadline is past and refresh chain evidence. | Reads only. No vote or dispute is falsely claimed. |
| VER-09 | Settle: select YES; click Settle from oracle and approve. Show accepted transaction. | Market `settle_market` calls oracle `verify_assertion_outcome`; registry winning/losing assets remain distinct from DOOR. |
| VER-10 | Settle: choose YES token, burn 30000, exact payout 50000 microcredits. Click Burn winner and redeem; approve. | Market `redeem_winning_tokens`, winning-token burn and credits payment. |
| VER-11 | Click Load on-chain state; show resolved YES, zero remaining collateral, and the NO asset with no redeemable value. | Mapping reads. Losing tokens do not gain a claim on DOOR. |
| VER-12 | Open accepted transaction IDs in the blockchain explorer. Show program, nested transitions and public parameters. | Explorer reads only. |
| VER-13 | Click Download audit LOG.md and View demo audit log; show step-tagged human-readable explanations and normalized JSON. | No new transition. Save exported evidence. |

## Disputed extension — remaining frontend features

Use a second fresh market/assertion and repeat VER-03 through VER-06. After
betting closes, report NO even though the documented observed outcome is YES.
Set an ample voting deadline; do not shorten it to fit a video recording.

| Step | Where to click | Aleo calls |
| --- | --- | --- |
| VER-14 | Review: bond 1000; click Dispute assertion before grace closes. | Oracle `dispute_assertion`, matched DOOR bond burn. |
| VER-15 | Review: enter a private DOOR payment record, click Create voting right; clear private input before capture. Requires private DOOR and private fee credits. | Oracle `new_voting_right`, private-token burn, private right/change outputs. |
| VER-16 | Enter the returned private right; click Deny, then clear private input. Show only aggregate tally and accepted result. | Oracle `deny`, private receipt output and public deny tally. |
| VER-17 | After voting closes, select YES under Settle while reported outcome remains NO. Click Settle from oracle. | `settle_market` with `assertion_valid=false`; oracle rejects the NO assertion, market resolves YES. |
| VER-18 | Redeem the YES asset as above and inspect the final state. Explain Confirm would support the reported outcome instead. Demonstrate Confirm in a separate disputed assertion in the Oracle demo; never spend the same right twice. | Winning-token redemption and state reads. |

Oracle incentive collection and unused voting-right refunds have no buttons in
this app: demonstrate them through the Oracle frontend, not invented market UI.
Admin initialization/deployment are not participant features. Report any wallet,
proof, fee, timing or record-access blocker explicitly in the captured sequence.
