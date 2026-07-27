export type AssertionLifecycle = {
  title: bigint;
  contentHash: bigint;
  createdAt: number;
  disputeDeadline: number;
  votingDeadline: number;
  disputed: boolean;
  confirmVotes: bigint;
  denyVotes: bigint;
};

export function verifyAssertionOutcome(
  assertion: AssertionLifecycle,
  expectedTitle: bigint,
  expectedContentHash: bigint,
  expectedValidity: boolean,
  minimumCreationHeight: number,
  currentHeight: number,
) {
  if (assertion.title !== expectedTitle) throw new Error('Assertion title mismatch.');
  if (assertion.contentHash !== expectedContentHash) {
    throw new Error('Assertion content hash mismatch.');
  }
  if (assertion.createdAt <= minimumCreationHeight) {
    throw new Error('Assertion predates market close.');
  }

  if (!assertion.disputed) {
    if (currentHeight <= assertion.disputeDeadline) {
      throw new Error('Grace period is still open.');
    }
    if (!expectedValidity) throw new Error('Undisputed assertions resolve as valid.');
    return true;
  }

  if (currentHeight <= assertion.votingDeadline) {
    throw new Error('Voting period is still open.');
  }
  const actualValidity = assertion.confirmVotes > assertion.denyVotes;
  if (actualValidity !== expectedValidity) throw new Error('Vote result mismatch.');
  return actualValidity;
}

export function resolveBinaryOutcome(reportedOutcome: boolean, assertionValid: boolean) {
  return reportedOutcome === assertionValid;
}

const MAX_CREDITS_BALANCE = 18_446_744_073_709_551_615n;

export function redemptionPayout(
  tokenAmount: bigint,
  settlementCollateral: bigint,
  winningSupply: bigint,
) {
  if (tokenAmount <= 0n) throw new Error('Redemption amount must be positive.');
  if (winningSupply <= 0n) throw new Error('Winning supply must be positive.');
  if (winningSupply > MAX_CREDITS_BALANCE) {
    throw new Error('Winning supply exceeds the safe arithmetic bound.');
  }
  if (tokenAmount > winningSupply) throw new Error('Redemption exceeds winning supply.');
  if (settlementCollateral < 0n || settlementCollateral > MAX_CREDITS_BALANCE) {
    throw new Error('Collateral is outside the credits balance range.');
  }
  return (tokenAmount * settlementCollateral) / winningSupply;
}

export class RedemptionLedger {
  readonly settlementCollateral: bigint;
  readonly winningSupply: bigint;
  #remainingCollateral: bigint;
  #balances = new Map<string, bigint>();

  constructor(
    settlementCollateral: bigint,
    winningSupply: bigint,
    balances: Record<string, bigint>,
  ) {
    const supplied = Object.values(balances).reduce((total, amount) => total + amount, 0n);
    if (supplied !== winningSupply) throw new Error('Balances must equal winning supply.');
    this.settlementCollateral = settlementCollateral;
    this.winningSupply = winningSupply;
    this.#remainingCollateral = settlementCollateral;
    for (const [owner, amount] of Object.entries(balances)) this.#balances.set(owner, amount);
  }

  redeem(owner: string, amount: bigint) {
    const balance = this.#balances.get(owner) ?? 0n;
    if (amount > balance) throw new Error('Insufficient winning tokens.');
    const payout = redemptionPayout(amount, this.settlementCollateral, this.winningSupply);
    if (payout > this.#remainingCollateral) throw new Error('Insufficient market collateral.');
    this.#balances.set(owner, balance - amount);
    this.#remainingCollateral -= payout;
    return payout;
  }

  get remainingCollateral() {
    return this.#remainingCollateral;
  }
}
