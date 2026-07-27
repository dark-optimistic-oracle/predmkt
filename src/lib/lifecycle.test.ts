import { describe, expect, it } from 'vitest';
import {
  RedemptionLedger,
  redemptionPayout,
  resolveBinaryOutcome,
  verifyAssertionOutcome,
  type AssertionLifecycle,
} from './lifecycle';

const assertion = (
  overrides: Partial<AssertionLifecycle> = {},
): AssertionLifecycle => ({
  title: 101n,
  contentHash: 202n,
  createdAt: 111,
  disputeDeadline: 120,
  votingDeadline: 140,
  disputed: false,
  confirmVotes: 0n,
  denyVotes: 0n,
  ...overrides,
});

describe('oracle-to-market lifecycle', () => {
  it('settles an undisputed report only after its grace period', () => {
    expect(verifyAssertionOutcome(assertion(), 101n, 202n, true, 110, 121)).toBe(true);
    expect(() => verifyAssertionOutcome(assertion(), 101n, 202n, true, 110, 120)).toThrow(
      /grace period/i,
    );
  });

  it('rejects assertions created at or before betting closed', () => {
    expect(() =>
      verifyAssertionOutcome(assertion({ createdAt: 110 }), 101n, 202n, true, 110, 121),
    ).toThrow(/predates market close/i);
  });

  it('binds settlement to the market ID and canonical claim hash', () => {
    expect(() => verifyAssertionOutcome(assertion(), 999n, 202n, true, 110, 121)).toThrow(
      /title mismatch/i,
    );
    expect(() => verifyAssertionOutcome(assertion(), 101n, 999n, true, 110, 121)).toThrow(
      /content hash mismatch/i,
    );
  });

  it('uses the private-vote aggregate after a dispute and rejects early settlement', () => {
    const disputed = assertion({ disputed: true, confirmVotes: 3n, denyVotes: 2n });
    expect(() => verifyAssertionOutcome(disputed, 101n, 202n, true, 110, 140)).toThrow(
      /voting period/i,
    );
    expect(verifyAssertionOutcome(disputed, 101n, 202n, true, 110, 141)).toBe(true);
    expect(() => verifyAssertionOutcome(disputed, 101n, 202n, false, 110, 141)).toThrow(
      /vote result/i,
    );
  });

  it('treats a tie as rejection and inverts the reported binary outcome', () => {
    const tied = assertion({ disputed: true, confirmVotes: 2n, denyVotes: 2n });
    expect(verifyAssertionOutcome(tied, 101n, 202n, false, 110, 141)).toBe(false);
    expect(resolveBinaryOutcome(true, false)).toBe(false);
    expect(resolveBinaryOutcome(false, false)).toBe(true);
  });

  it.each([
    [true, true, true],
    [true, false, false],
    [false, true, false],
    [false, false, true],
  ])(
    'maps reported=%s and valid=%s to YES=%s',
    (reportedOutcome, assertionValid, expected) => {
      expect(resolveBinaryOutcome(reportedOutcome, assertionValid)).toBe(expected);
    },
  );
});

describe('prediction-market redemption invariants', () => {
  it('makes only the winning supply a claim on the complete collateral pool', () => {
    expect(redemptionPayout(40n, 250n, 100n)).toBe(100n);
    expect(redemptionPayout(60n, 250n, 100n)).toBe(150n);
  });

  it('conserves collateral across complete multi-holder redemption', () => {
    const ledger = new RedemptionLedger(250n, 100n, { alice: 40n, bob: 60n });
    expect(ledger.redeem('alice', 40n)).toBe(100n);
    expect(ledger.redeem('bob', 60n)).toBe(150n);
    expect(ledger.remainingCollateral).toBe(0n);
  });

  it('prevents double redemption and over-redemption', () => {
    const ledger = new RedemptionLedger(250n, 100n, { alice: 100n });
    expect(ledger.redeem('alice', 100n)).toBe(250n);
    expect(() => ledger.redeem('alice', 1n)).toThrow(/insufficient winning tokens/i);
  });

  it('rounds each payout down and leaves only bounded dust', () => {
    const ledger = new RedemptionLedger(10n, 3n, { alice: 1n, bob: 1n, carol: 1n });
    expect(ledger.redeem('alice', 1n)).toBe(3n);
    expect(ledger.redeem('bob', 1n)).toBe(3n);
    expect(ledger.redeem('carol', 1n)).toBe(3n);
    expect(ledger.remainingCollateral).toBe(1n);
  });

  it('handles the maximum supported supply and collateral without overflow', () => {
    const maximum = 18_446_744_073_709_551_615n;
    expect(redemptionPayout(maximum, maximum, maximum)).toBe(maximum);
  });

  it('rejects invalid redemption parameters', () => {
    expect(() => redemptionPayout(0n, 100n, 10n)).toThrow(/positive/i);
    expect(() => redemptionPayout(11n, 100n, 10n)).toThrow(/exceeds/i);
    expect(() => redemptionPayout(1n, 18_446_744_073_709_551_616n, 10n)).toThrow(
      /credits balance range/i,
    );
    expect(() => redemptionPayout(1n, 100n, 18_446_744_073_709_551_616n)).toThrow(
      /arithmetic bound/i,
    );
  });
});
