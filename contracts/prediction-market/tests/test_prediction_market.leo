import doo_prediction_market.aleo;

program test_prediction_market.aleo {
    @test
    fn accepted_yes_resolves_yes() {
        assert(doo_prediction_market.aleo::resolve_binary_outcome(true, true));
    }

    @test
    fn rejected_yes_report_resolves_no() {
        assert(!doo_prediction_market.aleo::resolve_binary_outcome(true, false));
    }

    @test
    fn accepted_no_report_resolves_no() {
        assert(!doo_prediction_market.aleo::resolve_binary_outcome(false, true));
    }

    @test
    fn rejected_no_report_resolves_yes() {
        assert(doo_prediction_market.aleo::resolve_binary_outcome(false, false));
    }

    @test
    fn full_supply_gets_all_collateral() {
        assert_eq(
            doo_prediction_market.aleo::calculate_redemption(100u128, 250u128, 100u128),
            250u128
        );
    }

    @test
    fn partial_supply_is_proportional() {
        assert_eq(
            doo_prediction_market.aleo::calculate_redemption(40u128, 250u128, 100u128),
            100u128
        );
    }

    @test
    fn redemption_rounds_down() {
        assert_eq(
            doo_prediction_market.aleo::calculate_redemption(1u128, 10u128, 3u128),
            3u128
        );
    }

    @test
    fn max_redemption_is_safe() {
        assert_eq(
            doo_prediction_market.aleo::calculate_redemption(
                18446744073709551615u128,
                18446744073709551615u128,
                18446744073709551615u128
            ),
            18446744073709551615u128
        );
    }

    @test
    @should_fail
    fn rejects_zero_redemption() {
        doo_prediction_market.aleo::calculate_redemption(0u128, 250u128, 100u128);
    }

    @test
    @should_fail
    fn rejects_excess_redemption() {
        doo_prediction_market.aleo::calculate_redemption(101u128, 250u128, 100u128);
    }

    @test
    @should_fail
    fn rejects_oversized_supply() {
        doo_prediction_market.aleo::calculate_redemption(
            1u128,
            250u128,
            18446744073709551616u128
        );
    }

    @noupgrade
    constructor() {}
}
