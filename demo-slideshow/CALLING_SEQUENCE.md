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

Preparation only so far: native wallet access became available after macOS
permissions were granted, and Shield unlocked. No market transition has yet
been submitted in this demo. Append accepted IDs, final state and numbered slide
links here as capture proceeds. Never substitute the plan for execution evidence.
