# Verity — calling sequence

Run `demo-20261003`, Testnet. Frontend endpoint
`https://api.provable.com/v2`; fallback `https://api.explorer.provable.com/v2`.
Programs: `doo_prediction_market.aleo`, `dark_optimistic_oracle.aleo`,
`token_registry.aleo`, `credits.aleo`. The market's YES/NO assets are not DOOR.

The screenplay gives each click a `VER-*` label. Request/result logs snapshot
this label and record normalized public parameters, wallet request ID and
accepted transaction ID where available. Private records remain redacted.

## Contract sequence (see captured evidence for actual execution)

1. VER-01 startup height and program reads; VER-03 lookup requests: `markets`,
   `collateral_pool`, `yes_supply`, `no_supply`, `resolved`, `resolutions`, then
   oracle `assertions` and `disputers`. Parallel responses can arrive out of order.
2. VER-04 `create_market(MarketConfig,10000u64)`. Config includes market ID,
   question/YES/NO claim hashes, assertion ID, YES/NO token IDs, encoded token
   names/symbols and betting deadline. Registry registers/mints both assets;
   credits funding supplies the combined collateral escrow.
3. VER-05 `buy_outcome(market_id,true,yes_token_id,20000u64)`.
4. VER-06 `buy_outcome(market_id,false,no_token_id,10000u64)`; reload mappings.
5. VER-07 oracle `create_assertion({id,title:market_id,content_hash:yes_claim_hash,
   cost:1000u128,voter_stake:100u128,dispute_deadline,voting_deadline})`.
6. VER-09 `settle_market(market_id,assertion_id,true,yes_claim_hash,true,
   betting_deadlineu32)` after grace. Nested oracle verification checks binding
   and deadlines; a report created before betting closed is unusable.
7. VER-10 `redeem_winning_tokens(market_id,yes_token_id,30000u128,50000u64)`;
   winning asset burns and escrow pays credits. Reload state.
8. Disputed extension VER-14 oracle `dispute_assertion(assertion_id,1000u128)`;
   VER-15 `new_voting_right([private payment],assertion_id,100u128)`;
   VER-16 `deny([private right])`. After voting, VER-17 market settlement supplies
   reported NO, NO claim hash, and `assertion_valid=false`, yielding YES.

Initial public actions request 1000000 microcredits as the wallet fee setting;
the resumed `demoTools=1` QA run requests 10000 microcredits as priority fee. Actual
fees/acceptance must be read from the wallet and explorer. Private voting uses
private fee credits. Nested transitions are distinguished from separate frontend
requests: do not invent wallet request IDs for nested transitions.

## Disputed market capture — 2026-10-03

Market 202610032 binds assertion 2026100305 and closes betting at block 20145500.
Its canonical NO hash is
`4741842763327789793443202599311949015653958488398250129402681099262262086862field`.
The NO report was created only after a fresh height read returned 20145501.
Grace closes at 20145750 and voting at 20145800. This is controlled QA: the
same dedicated account exercises multiple roles and votes; it does not represent
independent real-world voters or a security proof.

| Actual order / marker | Execution and accepted transaction |
| --- | --- |
| VER-DISPUTED-01 | `create_market`, liquidity 10000 per outcome: `at1cmtdvknh4nyue9wufsuw5k3s6m2p4ufsql0gyw64shcfxjgmp5qqv95jsx` |
| VER-DISPUTED-02 | `buy_outcome`, YES 20000: `at1z9sk6jnwkvdn4522ugny4eygtt22gzf458v9e38wq4k94r2chqrqlac4av` |
| VER-DISPUTED-03 | `buy_outcome`, NO 10000: `at1wsly2sa6gdcghf9ev2wm69e4jk6hrrxnx4595ljn2pvm662grvzsqr08e4` |
| VER-DISPUTED-04 | Oracle `create_assertion`, canonical NO, bond 1000, stake 100: `at1ff6uje9lf30zudyw9x8cgxy4afgl0xl6u5usnvskpnjezx4hugrqpre7ll` |
| VER-DISPUTED-05 | Oracle matching `dispute_assertion`: `at13ncaf8tc226d8e9j76edvgdgy7hh03el99ya4lym24hsek6tgy9sq2s5v0` |
| VER-DISPUTED-06 | Private `new_voting_right`, stake 100: `at13p9s4l60uzhyjm5kl6xfzlkrmgtgseq7edegtgmtfm7c7hhymq8q8nwdrv` |
| VER-DISPUTED-07 | Private `deny`: `at1msm0mlalq83dpmgasvwv7nex8pl0lh596qtkuaqddymedm3deq9spy3srg` |
| VER-DISPUTED-08-right | Second private `new_voting_right`: `at1r2unamsrkq4dkl49xraknvdsuzk6zc226ey379layyv5l5335cqq7pzmz2` |
| VER-DISPUTED-08-confirm | Private `confirm`, exercising the other vote control: `at1xjs6ff590g6nwda7j9xreeqf4jq8pj4vret28a06dy87l4c4c5psravql5` |
| DOO-16-right / DOO-16-deny, in webapp | Additional right `at1c2gafx0tlzs5cf48px9gn2e9gengm0rar94dx7f53zjrnle8fufqcjy56h`, then deny `at18863kgtdk6kfa8nv4uqx6s2yu4dguv9urpqxk8hhnr5wh0fudyys7jylk6`; exact browser evidence lives in webapp LOG.md. |

Public readback confirmed confirm=1 and deny=2, so the canonical NO report was
rejected after voting. Settlement used report validity false, derived YES,
and the winning YES asset was redeemed. Actual acceptance is recorded below.
Every wallet endpoint is
Shield-managed and not exposed by the adapter; provider read URLs are logged.

## Captured evidence

Native permissions now work. Slides 1-16 capture an actual undisputed lifecycle.
All six executions below were accepted from the published frontend using the
QA wallet. The complete ordered browser journal is AUDIT_EXPORT.md, imported
into root LOG.md. Exact config/hashes and public inputs are preserved there.

| Step | Execution | Wallet request | Accepted transaction |
| --- | --- | --- | --- |
| VER-04 | `create_market` for 202610031; initial liquidity 10000 per asset, close 20136440 | `shield_1791006256110_by9dpchdnd` | [creation](https://testnet.explorer.provable.com/transaction/at1etkdf8ak0m0mst4tgrepr4ka6ctq9gx70a7dkghyp8ruqat8z5fq9637my) |
| VER-05 | `buy_outcome`, YES, 20000 | `shield_1791006310084_h45pa7nmkjn` | [YES purchase](https://testnet.explorer.provable.com/transaction/at1ngwzavtnaw967kq5j6s6xm5j4eq8v85rfs3vdkzfcrzw76jt0ypqyl9kzj) |
| VER-06 | `buy_outcome`, NO, 10000 | `shield_1791006352074_dj2p4ulf1c` | [NO purchase](https://testnet.explorer.provable.com/transaction/at1nea9t05gq4fruz3tl5cr44xfpzu7g0am89tfd4uyguts4ytv7vps6cg7d7) |
| VER-07 | Oracle `create_assertion` 2026100304, title 202610031, canonical YES hash, bond 1000, stake 100, deadlines 20136480/20136520 | `shield_1791006439599_6s138o4nif5` | [report](https://testnet.explorer.provable.com/transaction/at1rdmdxp6mthz33r08st5paptejxhq08h05mty37pw8y08chncuyxsendv0r) |
| VER-09 | `settle_market`, reported YES, valid=true, close 20136440 | `shield_1791006583525_j96g4al49m` | [settlement](https://testnet.explorer.provable.com/transaction/at12kys8n07pd95nj6ezwnwghdzmkpv8gtz69ryuwyk6qs2ncqgtsqqfns8v8) |
| VER-10 | `redeem_winning_tokens`, YES, burn 30000, payout 50000 | `shield_1791006645089_1h6wm8tdfcj` | [redemption](https://testnet.explorer.provable.com/transaction/at1cc9pxmztszs92yvfemwfpatdspyr5rzkrl2htn375zmcjafrcyqq5f20lk) |

Final refreshed state: resolved YES, collateral_pool=0u128, yes_supply=30000u128,
no_supply=20000u128. Supply mappings retain settlement pricing denominators;
registry tokens are burned by redemption. Explorer confirms settlement in block
20136497 with nested `verify_assertion_outcome`, and redemption in block
20136518. NO retains no redemption entitlement and DOOR was never collateral.

Initial state reads briefly lagged accepted transactions; later reads confirmed
50000 collateral before settlement and zero after redemption. Do not rewrite
earlier responses to conceal indexing lag. The captured client displayed its
startup height throughout; a tested fix now refreshes height during state lookup
without overwriting user-entered deadlines. Future lookups include that extra
height read before the eight mapping requests.

At the original public checkpoint, the private extension was pending. The user authorized private
record preparation and further execution within an additional 10-Testnet-ALEO
budget. Accepted private votes and settlement now follow below.
## Accepted disputed settlement and redemption, 2026-10-03

After live height 20145803 exceeded voting deadline 20145800, the frontend
called `doo_prediction_market.aleo/settle_market` with market 202610032, assertion 2026100305,
reported outcome false (NO), its NO claim hash, assertion_valid=false, and
betting-close height 20145500. YES is derived from rejecting the NO assertion.

- VER-DISPUTED-09: wallet `shield_1791035882179_1r94xlyo1fs`, accepted
  `at1n7yxmuapsxglda0vf7w6htgj4lv8vksxw3dzu9pm2yj9twsnvcps9kwaxs`.
- VER-DISPUTED-10: redeem all 30000 winning YES units for 50000 microcredits;
  wallet `shield_1791035970344_qn3zzbs9n3`, accepted
  `at1xm9yy862jflngkv4sqcc5pzhhent0v5h7054urxmz9ncr27daupqdlqfaw`.
- VER-DISPUTED-11: public readback at height 20145854: resolution YES, pool
  0, historical YES/NO supply denominators 30000/20000. NO has no entitlement.

The payout is entered manually using pool × burned winning units ÷ winning
supply; it is not auto-calculated by the current UI. The losing-side selector
is not UI-disabled: the contract enforces eligibility. No losing redemption
was submitted to burn fees. Do not describe that branch as tested live.
Slides 17-20 show private-right review, deny review, exact settlement inputs,
and final accepted redemption/readback. Exact ordered browser entries are in
AUDIT_PRIVATE_FINAL.md and root LOG.md; cross-app rewards are recorded by webapp.
