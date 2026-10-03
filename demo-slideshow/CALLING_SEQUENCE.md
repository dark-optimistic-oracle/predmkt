# Verity — calling sequence

Run `demo-20261003`, Testnet. Frontend endpoint
`https://api.provable.com/v2`; fallback `https://api.explorer.provable.com/v2`.
Programs: `doo_prediction_market.aleo`, `dark_optimistic_oracle.aleo`,
`token_registry.aleo`, `credits.aleo`. The market's YES/NO assets are not DOOR.

The screenplay gives each click a `VER-*` label. Request/result logs snapshot
this label and record normalized public parameters, wallet request ID and
accepted transaction ID where available. Private records remain redacted.

## Planned contract sequence (not yet executed)

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

Public actions request 1000000 microcredits as the wallet fee setting; actual
fees/acceptance must be read from the wallet and explorer. Private voting uses
private fee credits. Nested transitions are distinguished from separate frontend
requests: do not invent wallet request IDs for nested transitions.

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

The disputed/private extension remains pending. The user authorized private
record preparation and further execution within an additional 10-Testnet-ALEO
budget. No private vote is claimed in this checkpoint.
