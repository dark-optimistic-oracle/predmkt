import credits.aleo;
import dark_optimistic_oracle.aleo;
import token_registry.aleo;

const ZERO_ADDRESS: address = aleo1ezamst4pjgj9zfxqq0fwfj8a4cjuqndmasgata3hggzqygggnyfq6kmyd4;
const MAX_OUTCOME_SUPPLY: u128 = 18446744073709551615u128; // u64::MAX
const MAX_INITIAL_LIQUIDITY: u64 = 9223372036854775807u64; // floor(u64::MAX / 2)
const MAX_COLLATERAL: u128 = 18446744073709551615u128; // u64::MAX, matching credits balances

struct Market {
    id: field,
    question_hash: field,
    yes_claim_hash: field,
    no_claim_hash: field,
    assertion_id: field,
    yes_token_id: field,
    no_token_id: field,
    yes_token_name: u128,
    no_token_name: u128,
    yes_token_symbol: u128,
    no_token_symbol: u128,
    betting_deadline_block_height: u32,
}

fn resolve_binary_outcome_logic(reported_outcome: bool, assertion_valid: bool) -> bool {
    return reported_outcome == assertion_valid;
}

fn claims_are_distinct_logic(yes_claim_hash: field, no_claim_hash: field) -> bool {
    return yes_claim_hash != no_claim_hash;
}

fn calculate_redemption_logic(
    amount: u128,
    total_collateral: u128,
    winning_supply: u128
) -> u128 {
    assert(amount > 0u128);
    assert(winning_supply > 0u128);
    assert(winning_supply <= MAX_OUTCOME_SUPPLY);
    assert(amount <= winning_supply);
    assert(total_collateral <= MAX_COLLATERAL);
    return amount * total_collateral / winning_supply;
}

program doo_prediction_market.aleo {
    // Development admin. Public deployment scripts must replace this address.
    // Leo 4 upgrade policy: only this admin can deploy upgrades.
    @admin(address="aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px")
    constructor() {}

    mapping markets: field => Market;
    mapping market_creators: field => address;
    mapping collateral_pool: field => u128;
    mapping yes_supply: field => u128;
    mapping no_supply: field => u128;
    mapping resolved: field => bool;
    mapping resolutions: field => bool;
    mapping settlement_collateral: field => u128;
    // Records the valid post-close oracle assertion that actually settled a
    // market. The legacy Market.assertion_id remains a suggested UI default so
    // existing stored Market values keep the exact same layout.
    mapping settlement_assertions: field => field;

    // Pure helpers are shared by settlement/finalize logic and Leo unit tests.
    fn resolve_binary_outcome(public reported_outcome: bool, public assertion_valid: bool) -> bool {
        return resolve_binary_outcome_logic(reported_outcome, assertion_valid);
    }

    fn calculate_redemption(
        public amount: u128,
        public total_collateral: u128,
        public winning_supply: u128
    ) -> u128 {
        return calculate_redemption_logic(amount, total_collateral, winning_supply);
    }

    fn claims_are_distinct(public yes_claim_hash: field, public no_claim_hash: field) -> bool {
        return claims_are_distinct_logic(yes_claim_hash, no_claim_hash);
    }

    // Registers YES<x> and NO<x> as independent token-registry assets and
    // seeds both sides with an equal amount of public Aleo credits. DOOR is
    // not used by the market; it remains exclusive to oracle incentives.
    fn create_market(public market: Market, public initial_liquidity: u64) -> Final {
        let creator: address = self.caller;
        let initial_supply: u128 = initial_liquidity as u128;
        let combined_liquidity: u64 = initial_liquidity * 2u64;

        let deposit: Final = credits.aleo::transfer_public_as_signer(
            self.address,
            combined_liquidity
        );
        let register_yes: Final = token_registry.aleo::register_token(
            market.yes_token_id,
            market.yes_token_name,
            market.yes_token_symbol,
            6u8,
            MAX_OUTCOME_SUPPLY,
            false,
            self.address
        );
        let register_no: Final = token_registry.aleo::register_token(
            market.no_token_id,
            market.no_token_name,
            market.no_token_symbol,
            6u8,
            MAX_OUTCOME_SUPPLY,
            false,
            self.address
        );
        let mint_yes: Final = token_registry.aleo::mint_public(
            market.yes_token_id,
            creator,
            initial_supply,
            0u32
        );
        let mint_no: Final = token_registry.aleo::mint_public(
            market.no_token_id,
            creator,
            initial_supply,
            0u32
        );

        return final {
            assert_eq(Mapping::get_or_use(market_creators, market.id, ZERO_ADDRESS), ZERO_ADDRESS);
            assert(claims_are_distinct_logic(market.yes_claim_hash, market.no_claim_hash));
            assert_neq(market.yes_token_id, market.no_token_id);
            assert_neq(market.yes_token_name, 0u128);
            assert_neq(market.no_token_name, 0u128);
            assert_neq(market.yes_token_symbol, 0u128);
            assert_neq(market.no_token_symbol, 0u128);
            assert(market.betting_deadline_block_height > block.height);
            assert(initial_liquidity > 0u64);
            assert(initial_liquidity <= MAX_INITIAL_LIQUIDITY);

            Mapping::set(markets, market.id, market);
            Mapping::set(market_creators, market.id, creator);
            Mapping::set(collateral_pool, market.id, combined_liquidity as u128);
            Mapping::set(yes_supply, market.id, initial_supply);
            Mapping::set(no_supply, market.id, initial_supply);
            Mapping::set(resolved, market.id, false);

            deposit.run();
            register_yes.run();
            register_no.run();
            mint_yes.run();
            mint_no.run();
        };
    }

    // Deposits neutral market collateral (public Aleo credits) and mints the
    // selected outcome asset. Neither outcome token is the oracle's DOOR token.
    fn buy_outcome(
        public market_id: field,
        public outcome: bool,
        public outcome_token_id: field,
        public amount: u64
    ) -> Final {
        let bettor: address = self.caller;
        let token_amount: u128 = amount as u128;

        let deposit: Final = credits.aleo::transfer_public_as_signer(
            self.address,
            amount
        );
        let mint: Final = token_registry.aleo::mint_public(
            outcome_token_id,
            bettor,
            token_amount,
            0u32
        );

        return final {
            let market: Market = Mapping::get(markets, market_id);
            let expected_token_id: field = outcome ? market.yes_token_id : market.no_token_id;
            assert_eq(outcome_token_id, expected_token_id);
            assert(block.height <= market.betting_deadline_block_height);
            assert(amount > 0u64);
            assert(!Mapping::get_or_use(resolved, market_id, false));

            let current_collateral: u128 = Mapping::get_or_use(collateral_pool, market_id, 0u128);
            let next_collateral: u128 = current_collateral + token_amount;
            assert(next_collateral <= MAX_COLLATERAL);
            Mapping::set(collateral_pool, market_id, next_collateral);

            if outcome {
                let current_yes: u128 = Mapping::get_or_use(yes_supply, market_id, 0u128);
                let next_yes: u128 = current_yes + token_amount;
                assert(next_yes <= MAX_OUTCOME_SUPPLY);
                Mapping::set(yes_supply, market_id, next_yes);
            } else {
                let current_no: u128 = Mapping::get_or_use(no_supply, market_id, 0u128);
                let next_no: u128 = current_no + token_amount;
                assert(next_no <= MAX_OUTCOME_SUPPLY);
                Mapping::set(no_supply, market_id, next_no);
            }

            deposit.run();
            mint.run();
        };
    }

    // The assertion states either the canonical YES or canonical NO claim.
    // If the oracle accepts the assertion, the stated outcome wins. If private
    // voting rejects it, the opposite binary outcome wins.
    fn settle_market(
        public market_id: field,
        public assertion_id: field,
        public reported_outcome: bool,
        public reported_claim_hash: field,
        public assertion_valid: bool,
        public betting_deadline_block_height: u32
    ) -> Final {
        let verify: Final = dark_optimistic_oracle.aleo::verify_assertion_outcome(
            assertion_id,
            market_id,
            reported_claim_hash,
            assertion_valid,
            betting_deadline_block_height
        );

        return final {
            let market: Market = Mapping::get(markets, market_id);
            let expected_claim_hash: field = reported_outcome
                ? market.yes_claim_hash
                : market.no_claim_hash;
            let outcome: bool = resolve_binary_outcome_logic(reported_outcome, assertion_valid);
            assert_eq(reported_claim_hash, expected_claim_hash);
            assert_eq(market.betting_deadline_block_height, betting_deadline_block_height);
            assert(block.height > market.betting_deadline_block_height);
            assert(!Mapping::get_or_use(resolved, market_id, false));

            let collateral: u128 = Mapping::get(collateral_pool, market_id);
            let winning_supply: u128 = outcome
                ? Mapping::get(yes_supply, market_id)
                : Mapping::get(no_supply, market_id);
            assert(winning_supply > 0u128);
            assert(winning_supply <= MAX_OUTCOME_SUPPLY);

            Mapping::set(resolved, market_id, true);
            Mapping::set(resolutions, market_id, outcome);
            Mapping::set(settlement_collateral, market_id, collateral);
            Mapping::set(settlement_assertions, market_id, assertion_id);
            verify.run();
        };
    }

    // Burns winning YES<x> or NO<x> tokens and releases their proportional
    // share of all collateral. The losing token has no redemption path and is
    // therefore worth zero to this contract after settlement.
    fn redeem_winning_tokens(
        public market_id: field,
        public outcome_token_id: field,
        public amount: u128,
        public payout_microcredits: u64
    ) -> Final {
        let claimant: address = self.caller;
        let burn: Final = token_registry.aleo::burn_public(
            outcome_token_id,
            claimant,
            amount
        );
        let pay: Final = credits.aleo::transfer_public(
            claimant,
            payout_microcredits
        );

        return final {
            assert(Mapping::get(resolved, market_id));
            let market: Market = Mapping::get(markets, market_id);
            let outcome: bool = Mapping::get(resolutions, market_id);
            let winning_token_id: field = outcome ? market.yes_token_id : market.no_token_id;
            let winning_supply: u128 = outcome
                ? Mapping::get(yes_supply, market_id)
                : Mapping::get(no_supply, market_id);
            let total_collateral: u128 = Mapping::get(settlement_collateral, market_id);
            let payout: u128 = calculate_redemption_logic(
                amount,
                total_collateral,
                winning_supply
            );

            assert_eq(outcome_token_id, winning_token_id);
            assert_eq(payout_microcredits as u128, payout);

            let remaining_collateral: u128 = Mapping::get(collateral_pool, market_id);
            Mapping::set(collateral_pool, market_id, remaining_collateral - payout);
            burn.run();
            pay.run();
        };
    }
}
