import { useEffect, useMemo, useState } from 'react';
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Binary,
  Blocks,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Flag,
  Gavel,
  KeyRound,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Vote,
  WalletCards,
  X,
} from 'lucide-react';
import {
  MARKET_PROGRAM_ID,
  ORACLE_PROGRAM_ID,
  TESTNET_API_URL,
  TRANSACTION_FEE,
  asciiToU128,
  extractBlockHeight,
  readMapping,
  textToField,
  toField,
  toU128,
  toU32,
} from './lib/aleo';

type Stage = 'trade' | 'report' | 'challenge' | 'settle';
type Notice = { type: 'success' | 'error'; message: string };
type Programs = { oracle: boolean; market: boolean };
type MarketSnapshot = {
  market: string;
  collateral: string;
  yesSupply: string;
  noSupply: string;
  resolved: boolean;
  resolution: boolean | null;
  assertion: string | null;
  disputer: string | null;
};

const DEFAULT_MARKET_ID = '101';
const DEFAULT_ASSERTION_ID = '501';
const DEFAULT_COST = '100000000';
const DEFAULT_STAKE = '1000000';
const DEFAULT_AMOUNT = '25000000';

const stageItems: Array<{
  id: Stage;
  label: string;
  detail: string;
  icon: typeof Binary;
}> = [
  { id: 'trade', label: 'Trade', detail: 'Create or take a position', icon: Binary },
  { id: 'report', label: 'Report', detail: 'Assert the YES outcome', icon: Flag },
  { id: 'challenge', label: 'Review', detail: 'Dispute and vote privately', icon: Vote },
  { id: 'settle', label: 'Settle', detail: 'Resolve and claim', icon: BadgeCheck },
];

const formatAddress = (address?: string | null) =>
  address ? `${address.slice(0, 10)}…${address.slice(-6)}` : 'Not connected';

export default function PredictionMarket() {
  const { address, connected, executeTransaction } = useWallet();
  const [stage, setStage] = useState<Stage>('trade');
  const [height, setHeight] = useState<number | null>(import.meta.env.DEV ? 1_000_000 : null);
  const [programs, setPrograms] = useState<Programs>(
    import.meta.env.DEV
      ? { oracle: true, market: true }
      : { oracle: false, market: false },
  );
  const [notice, setNotice] = useState<Notice | null>(null);
  const [lookupState, setLookupState] = useState<
    { status: 'idle' | 'loading' | 'error'; message?: string } |
    { status: 'loaded'; value: MarketSnapshot }
  >({ status: 'idle' });

  const [marketId, setMarketId] = useState(DEFAULT_MARKET_ID);
  const [assertionId, setAssertionId] = useState(DEFAULT_ASSERTION_ID);
  const [question, setQuestion] = useState(
    'Will the Aleo Testnet reach the stated block height before the market deadline?',
  );
  const [canonicalYesClaim, setCanonicalYesClaim] = useState(
    'The market identified by this market ID resolves YES.',
  );
  const [canonicalNoClaim, setCanonicalNoClaim] = useState(
    'The market identified by this market ID resolves NO.',
  );
  const [questionHash, setQuestionHash] = useState('0field');
  const [yesClaimHash, setYesClaimHash] = useState('0field');
  const [noClaimHash, setNoClaimHash] = useState('0field');
  const [yesTokenId, setYesTokenId] = useState('0field');
  const [noTokenId, setNoTokenId] = useState('0field');
  const [bettingDeadline, setBettingDeadline] = useState('1010000');
  const [disputeDeadline, setDisputeDeadline] = useState('1020000');
  const [votingDeadline, setVotingDeadline] = useState('1030000');
  const [positionAmount, setPositionAmount] = useState(DEFAULT_AMOUNT);
  const [initialLiquidity, setInitialLiquidity] = useState('1000000');
  const [assertionCost, setAssertionCost] = useState(DEFAULT_COST);
  const [voterStake, setVoterStake] = useState(DEFAULT_STAKE);
  const [privatePayment, setPrivatePayment] = useState('');
  const [votingRight, setVotingRight] = useState('');
  const [reportedOutcome, setReportedOutcome] = useState(true);
  const [positionOutcome, setPositionOutcome] = useState(true);
  const [settlementOutcome, setSettlementOutcome] = useState(true);
  const [payoutAmount, setPayoutAmount] = useState('');

  const ready = programs.oracle && programs.market;
  const marketSuffix = marketId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 13) || 'MKT';
  const yesTokenLabel = `YES${marketSuffix}`;
  const noTokenLabel = `NO${marketSuffix}`;

  useEffect(() => {
    Promise.all([
      textToField(question),
      textToField(canonicalYesClaim),
      textToField(canonicalNoClaim),
      textToField(`${marketId.trim()}:YES`),
      textToField(`${marketId.trim()}:NO`),
    ])
      .then(([nextQuestionHash, nextYesClaimHash, nextNoClaimHash, nextYesTokenId, nextNoTokenId]) => {
        setQuestionHash(nextQuestionHash);
        setYesClaimHash(nextYesClaimHash);
        setNoClaimHash(nextNoClaimHash);
        setYesTokenId(nextYesTokenId);
        setNoTokenId(nextNoTokenId);
      })
      .catch(() => {
        setNotice({ type: 'error', message: 'This browser could not hash the market text.' });
      });
  }, [question, canonicalYesClaim, canonicalNoClaim, marketId]);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    const loadNetwork = async () => {
      const [heightResponse, oracleResponse, marketResponse] = await Promise.all([
        fetch(`${TESTNET_API_URL}/testnet/latest/height`),
        fetch(`${TESTNET_API_URL}/testnet/program/${ORACLE_PROGRAM_ID}`),
        fetch(`${TESTNET_API_URL}/testnet/program/${MARKET_PROGRAM_ID}`),
      ]);
      if (!heightResponse.ok) throw new Error('Aleo Testnet is not responding.');
      const nextHeight = Number(await heightResponse.json());
      if (!Number.isSafeInteger(nextHeight)) throw new Error('Aleo returned an invalid block height.');
      setHeight(nextHeight);
      setBettingDeadline(String(nextHeight + 10_000));
      setDisputeDeadline(String(nextHeight + 20_000));
      setVotingDeadline(String(nextHeight + 30_000));
      setPrograms({ oracle: oracleResponse.ok, market: marketResponse.ok });
      if (!oracleResponse.ok || !marketResponse.ok) {
        setNotice({
          type: 'error',
          message: 'The demo programs are not deployed on Aleo Testnet yet. Read-only documentation remains available.',
        });
      }
    };

    loadNetwork().catch((error) => {
      setNotice({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to verify Aleo Testnet.',
      });
    });
  }, []);

  const deadlines = useMemo(
    () => [
      { label: 'Betting closes', value: Number(bettingDeadline), icon: Binary },
      { label: 'Grace period ends', value: Number(disputeDeadline), icon: Clock3 },
      { label: 'Voting closes', value: Number(votingDeadline), icon: Vote },
    ],
    [bettingDeadline, disputeDeadline, votingDeadline],
  );

  const run = async (program: string, functionName: string, inputs: string[]) => {
    if (!connected || !address) {
      setNotice({ type: 'error', message: 'Connect Shield wallet before submitting.' });
      return;
    }
    if (!ready) {
      setNotice({ type: 'error', message: 'The Testnet programs must be deployed before submitting.' });
      return;
    }
    if (!executeTransaction) {
      setNotice({ type: 'error', message: 'The connected wallet cannot execute transactions.' });
      return;
    }

    try {
      const result = await executeTransaction({
        program,
        function: functionName,
        inputs,
        fee: TRANSACTION_FEE,
        privateFee: false,
      });
      setNotice({
        type: 'success',
        message: `${functionName} submitted. Transaction ${result?.transactionId ?? 'is awaiting wallet confirmation'}.`,
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: error instanceof Error ? error.message : `Unable to submit ${functionName}.`,
      });
    }
  };

  const createMarket = () =>
    run(MARKET_PROGRAM_ID, 'create_market', [
      `{
        id: ${toField(marketId)},
        question_hash: ${questionHash},
        yes_claim_hash: ${yesClaimHash},
        no_claim_hash: ${noClaimHash},
        assertion_id: ${toField(assertionId)},
        yes_token_id: ${yesTokenId},
        no_token_id: ${noTokenId},
        yes_token_name: ${asciiToU128(yesTokenLabel)},
        no_token_name: ${asciiToU128(noTokenLabel)},
        yes_token_symbol: ${asciiToU128(yesTokenLabel)},
        no_token_symbol: ${asciiToU128(noTokenLabel)},
        betting_deadline_block_height: ${toU32(bettingDeadline)}
      }`,
      `${initialLiquidity.trim() || '0'}u64`,
    ]);

  const buyPosition = (outcome: boolean) =>
    run(MARKET_PROGRAM_ID, 'buy_outcome', [
      toField(marketId),
      String(outcome),
      outcome ? yesTokenId : noTokenId,
      `${positionAmount.trim() || '0'}u64`,
    ]);

  const reportOutcome = () =>
    run(ORACLE_PROGRAM_ID, 'create_assertion', [
      `{
        id: ${toField(assertionId)},
        title: ${toField(marketId)},
        content_hash: ${reportedOutcome ? yesClaimHash : noClaimHash},
        cost: ${toU128(assertionCost)},
        voter_stake: ${toU128(voterStake)},
        dispute_deadline_block_height: ${toU32(disputeDeadline)},
        voting_deadline_block_height: ${toU32(votingDeadline)}
      }`,
    ]);

  const dispute = () =>
    run(ORACLE_PROGRAM_ID, 'dispute_assertion', [
      toField(assertionId),
      toU128(assertionCost),
    ]);

  const buyVotingRight = () =>
    run(ORACLE_PROGRAM_ID, 'new_voting_right', [
      privatePayment,
      toField(assertionId),
      toU128(voterStake),
    ]);

  const castVote = (outcome: boolean) =>
    run(ORACLE_PROGRAM_ID, outcome ? 'confirm' : 'deny', [votingRight]);

  const settle = () =>
    run(MARKET_PROGRAM_ID, 'settle_market', [
      toField(marketId),
      toField(assertionId),
      String(reportedOutcome),
      reportedOutcome ? yesClaimHash : noClaimHash,
      String(reportedOutcome === settlementOutcome),
    ]);

  const claim = () =>
    run(MARKET_PROGRAM_ID, 'redeem_winning_tokens', [
      toField(marketId),
      positionOutcome ? yesTokenId : noTokenId,
      toU128(positionAmount),
      `${payoutAmount.trim() || '0'}u64`,
    ]);

  const loadMarket = async () => {
    setLookupState({ status: 'loading' });
    const key = toField(marketId);
    try {
      const [market, collateral, yesSupply, noSupply, resolved, resolution, assertion, disputer] =
        await Promise.all([
          readMapping(MARKET_PROGRAM_ID, 'markets', key),
          readMapping(MARKET_PROGRAM_ID, 'collateral_pool', key),
          readMapping(MARKET_PROGRAM_ID, 'yes_supply', key),
          readMapping(MARKET_PROGRAM_ID, 'no_supply', key),
          readMapping(MARKET_PROGRAM_ID, 'resolved', key),
          readMapping(MARKET_PROGRAM_ID, 'resolutions', key),
          readMapping(ORACLE_PROGRAM_ID, 'assertions', toField(assertionId)),
          readMapping(ORACLE_PROGRAM_ID, 'disputers', toField(assertionId)),
        ]);
      if (!market) {
        setLookupState({ status: 'error', message: `No market found for ${key}.` });
        return;
      }
      const didResolve = resolved === 'true';
      setLookupState({
        status: 'loaded',
        value: {
          market,
          collateral: collateral ?? '0u128',
          yesSupply: yesSupply ?? '0u128',
          noSupply: noSupply ?? '0u128',
          resolved: didResolve,
          resolution: didResolve ? resolution === 'true' : null,
          assertion,
          disputer,
        },
      });
      const bettingHeight = extractBlockHeight(market, 'betting_deadline_block_height');
      const disputeHeight = assertion
        ? extractBlockHeight(assertion, 'dispute_deadline_block_height')
        : null;
      const voteHeight = assertion
        ? extractBlockHeight(assertion, 'voting_deadline_block_height')
        : null;
      if (bettingHeight) setBettingDeadline(String(bettingHeight));
      if (disputeHeight) setDisputeDeadline(String(disputeHeight));
      if (voteHeight) setVotingDeadline(String(voteHeight));
    } catch (error) {
      setLookupState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unable to load this market.',
      });
    }
  };

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles aria-hidden="true" size={14} /> Live protocol demonstration</span>
          <h1>Trade the outcome.<br /><em>Verify the truth.</em></h1>
          <p>
            A simple prediction market resolved by the Dark Optimistic Oracle.
            Reports pass after a challenge window—or move to private Aleo voting when disputed.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#market">Open the market <ArrowRight aria-hidden="true" size={18} /></a>
            <a className="text-link" href="#protocol">See the resolution path</a>
          </div>
          <div className="proof-line">
            <span><ShieldCheck aria-hidden="true" size={16} /> Aleo Testnet</span>
            <span><LockKeyhole aria-hidden="true" size={16} /> Private voter records</span>
            <span><FileCheck2 aria-hidden="true" size={16} /> On-chain settlement</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="A market outcome flowing through an oracle">
          <div className="odds-card yes-card">
            <span>YES</span>
            <b>Claim stands</b>
          </div>
          <div className="odds-card no-card">
            <span>NO</span>
            <b>Claim denied</b>
          </div>
          <div className="oracle-core">
            <span className="pulse-ring" />
            <ShieldCheck aria-hidden="true" size={39} />
            <small>ORACLE</small>
            <strong>Truth gate</strong>
          </div>
          <div className="flow-line line-a" />
          <div className="flow-line line-b" />
          <div className="settled-chip"><Check aria-hidden="true" size={14} /> Settled on Aleo</div>
        </div>
      </section>

      <section className="market-section" id="market" aria-labelledby="market-title">
        <div className="section-kicker">
          <div>
            <span className="eyebrow">One complete lifecycle</span>
            <h2 id="market-title">Prediction market console</h2>
          </div>
          <div className={`network-pill ${ready ? 'online' : ''}`}>
            <span />
            {ready ? 'Programs available' : 'Awaiting Testnet deployment'}
          </div>
        </div>

        <div className="network-grid">
          <div><Blocks aria-hidden="true" /><span>Current block</span><strong>{height?.toLocaleString() ?? 'Connecting…'}</strong></div>
          <div><ShieldCheck aria-hidden="true" /><span>Oracle</span><strong>{programs.oracle ? 'Ready' : 'Not deployed'}</strong></div>
          <div><Binary aria-hidden="true" /><span>Market</span><strong>{programs.market ? 'Ready' : 'Not deployed'}</strong></div>
          <div><WalletCards aria-hidden="true" /><span>Shield wallet</span><strong>{formatAddress(address)}</strong></div>
        </div>

        <div className="market-lookup">
          <label>
            Market ID
            <input value={marketId} onChange={(event) => setMarketId(event.target.value)} />
          </label>
          <label>
            Assertion ID
            <input value={assertionId} onChange={(event) => setAssertionId(event.target.value)} />
          </label>
          <button className="secondary-button" type="button" onClick={loadMarket} disabled={!ready || lookupState.status === 'loading'}>
            <Search aria-hidden="true" size={17} />
            {lookupState.status === 'loading' ? 'Loading…' : 'Load on-chain state'}
          </button>
        </div>

        {notice && (
          <div className={`notice ${notice.type}`} role="status">
            {notice.type === 'success'
              ? <CheckCircle2 aria-hidden="true" size={18} />
              : <AlertTriangle aria-hidden="true" size={18} />}
            <span>{notice.message}</span>
          </div>
        )}

        {lookupState.status === 'error' && (
          <div className="notice error" role="alert">
            <AlertTriangle aria-hidden="true" size={18} />
            <span>{lookupState.message}</span>
          </div>
        )}

        {lookupState.status === 'loaded' && (
          <div className="market-snapshot" aria-live="polite">
            <article><span>Collateral pool</span><strong>{lookupState.value.collateral}</strong></article>
            <article><span>{yesTokenLabel} supply</span><strong>{lookupState.value.yesSupply}</strong></article>
            <article><span>{noTokenLabel} supply</span><strong>{lookupState.value.noSupply}</strong></article>
            <article>
              <span>Oracle status</span>
              <strong>{lookupState.value.disputer ? 'Disputed' : lookupState.value.assertion ? 'Reported' : 'Awaiting report'}</strong>
            </article>
            <article>
              <span>Resolution</span>
              <strong>{lookupState.value.resolved ? (lookupState.value.resolution ? 'YES' : 'NO') : 'Open'}</strong>
            </article>
          </div>
        )}

        <div className="stage-tabs" role="tablist" aria-label="Market lifecycle">
          {stageItems.map(({ id, label, detail, icon: Icon }, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={stage === id}
              onClick={() => setStage(id)}
              key={id}
            >
              <span className="step-number">0{index + 1}</span>
              <Icon aria-hidden="true" size={20} />
              <span><b>{label}</b><small>{detail}</small></span>
            </button>
          ))}
        </div>

        <div className="console-panel">
          {stage === 'trade' && (
            <div className="panel-grid">
              <form className="action-card" onSubmit={(event) => event.preventDefault()}>
                <span className="eyebrow">Market creator</span>
                <h3>Define a binary question</h3>
                <label>
                  Human-readable question
                  <textarea rows={3} value={question} onChange={(event) => setQuestion(event.target.value)} />
                </label>
                <div className="two-fields">
                  <label>
                    Canonical YES claim
                    <textarea rows={2} value={canonicalYesClaim} onChange={(event) => setCanonicalYesClaim(event.target.value)} />
                  </label>
                  <label>
                    Canonical NO claim
                    <textarea rows={2} value={canonicalNoClaim} onChange={(event) => setCanonicalNoClaim(event.target.value)} />
                  </label>
                </div>
                <small className="form-help">The question and both canonical claims are hashed locally; those hashes bind oracle settlement.</small>
                <div className="two-fields">
                  <label>Betting deadline block<input value={bettingDeadline} onChange={(event) => setBettingDeadline(event.target.value)} /></label>
                  <label>Initial liquidity per outcome<input value={initialLiquidity} onChange={(event) => setInitialLiquidity(event.target.value)} /></label>
                </div>
                <div className="token-pair">
                  <div><span>{yesTokenLabel}</span><code>{yesTokenId}</code></div>
                  <div><span>{noTokenLabel}</span><code>{noTokenId}</code></div>
                </div>
                <button className="primary-button" type="button" onClick={createMarket} disabled={!connected || !ready}>
                  <Sparkles aria-hidden="true" size={17} /> Create market
                </button>
              </form>
              <form className="action-card trade-card" onSubmit={(event) => event.preventDefault()}>
                <span className="eyebrow">Participant</span>
                <h3>Mint an outcome asset</h3>
                <p>Deposit neutral public Aleo credits and receive the selected market token. DOOR is not used here.</p>
                <label>Collateral in microcredits<input value={positionAmount} onChange={(event) => setPositionAmount(event.target.value)} /></label>
                <div className="outcome-buttons">
                  <button type="button" className="yes-button" onClick={() => buyPosition(true)} disabled={!connected || !ready}>
                    <Check aria-hidden="true" /> Mint {yesTokenLabel}
                  </button>
                  <button type="button" className="no-button" onClick={() => buyPosition(false)} disabled={!connected || !ready}>
                    <X aria-hidden="true" /> Mint {noTokenLabel}
                  </button>
                </div>
                <div className="plain-note">
                  <CircleDollarSign aria-hidden="true" size={19} />
                  <span>After settlement, the losing asset redeems for zero and the winning asset absorbs the combined collateral value.</span>
                </div>
              </form>
            </div>
          )}

          {stage === 'report' && (
            <form className="action-card wide-card" onSubmit={(event) => event.preventDefault()}>
              <div className="card-heading">
                <div><span className="eyebrow">Outcome reporter</span><h3>Assert the observed outcome</h3></div>
                <Flag aria-hidden="true" size={28} />
              </div>
              <p>
                The market accepts only the assertion ID and matching YES or NO claim hash fixed at creation.
                The assertion is optimistic: it becomes usable after its challenge window if nobody disputes it.
              </p>
              <div className="segmented">
                <button type="button" className={reportedOutcome ? 'active yes-choice' : ''} onClick={() => setReportedOutcome(true)}>Report YES</button>
                <button type="button" className={!reportedOutcome ? 'active no-choice' : ''} onClick={() => setReportedOutcome(false)}>Report NO</button>
              </div>
              <div className="three-fields">
                <label>Assertion bond<input value={assertionCost} onChange={(event) => setAssertionCost(event.target.value)} /></label>
                <label>Voter stake<input value={voterStake} onChange={(event) => setVoterStake(event.target.value)} /></label>
                <label>Selected claim hash<input readOnly value={reportedOutcome ? yesClaimHash : noClaimHash} /></label>
              </div>
              <div className="two-fields">
                <label>Dispute deadline block<input value={disputeDeadline} onChange={(event) => setDisputeDeadline(event.target.value)} /></label>
                <label>Voting deadline block<input value={votingDeadline} onChange={(event) => setVotingDeadline(event.target.value)} /></label>
              </div>
              <button className="primary-button" type="button" onClick={reportOutcome} disabled={!connected || !ready}>
                <Flag aria-hidden="true" size={17} /> Report {reportedOutcome ? 'YES' : 'NO'} outcome
              </button>
            </form>
          )}

          {stage === 'challenge' && (
            <div className="panel-grid">
              <form className="action-card" onSubmit={(event) => event.preventDefault()}>
                <span className="eyebrow">Challenge window</span>
                <h3>Dispute an incorrect report</h3>
                <p>A matching bond opens the private voting phase before the grace period expires.</p>
                <label>Dispute bond<input value={assertionCost} onChange={(event) => setAssertionCost(event.target.value)} /></label>
                <button className="danger-button" type="button" onClick={dispute} disabled={!connected || !ready}>
                  <Gavel aria-hidden="true" size={17} /> Dispute assertion
                </button>
              </form>
              <form className="action-card" onSubmit={(event) => event.preventDefault()}>
                <span className="eyebrow">Private Aleo voting</span>
                <h3>Fund and cast a vote</h3>
                <label>
                  Private DOOR payment record
                  <textarea
                    rows={4}
                    value={privatePayment}
                    onChange={(event) => setPrivatePayment(event.target.value)}
                    placeholder="Paste a private token record from Shield wallet"
                  />
                </label>
                <button className="secondary-button" type="button" onClick={buyVotingRight} disabled={!connected || !ready || !privatePayment.trim()}>
                  <KeyRound aria-hidden="true" size={17} /> Create voting right
                </button>
                <label>
                  Private voting-right record
                  <textarea
                    rows={4}
                    value={votingRight}
                    onChange={(event) => setVotingRight(event.target.value)}
                    placeholder="Paste the private output record returned by the transaction"
                  />
                </label>
                <div className="outcome-buttons">
                  <button className="yes-button" type="button" onClick={() => castVote(true)} disabled={!connected || !ready || !votingRight.trim()}>
                    <Check aria-hidden="true" /> Confirm
                  </button>
                  <button className="no-button" type="button" onClick={() => castVote(false)} disabled={!connected || !ready || !votingRight.trim()}>
                    <X aria-hidden="true" /> Deny
                  </button>
                </div>
              </form>
            </div>
          )}

          {stage === 'settle' && (
            <div className="panel-grid">
              <form className="action-card" onSubmit={(event) => event.preventDefault()}>
                <span className="eyebrow">Oracle-gated resolution</span>
                <h3>Settle the market</h3>
                <p>
                  This assertion reported {reportedOutcome ? 'YES' : 'NO'}. Choose the verified market outcome.
                  The contract derives whether the oracle must have accepted or rejected that assertion.
                </p>
                <div className="segmented">
                  <button type="button" className={settlementOutcome ? 'active yes-choice' : ''} onClick={() => setSettlementOutcome(true)}>YES</button>
                  <button type="button" className={!settlementOutcome ? 'active no-choice' : ''} onClick={() => setSettlementOutcome(false)}>NO</button>
                </div>
                <button className="primary-button" type="button" onClick={settle} disabled={!connected || !ready}>
                  <BadgeCheck aria-hidden="true" size={17} /> Settle from oracle
                </button>
              </form>
              <form className="action-card" onSubmit={(event) => event.preventDefault()}>
                <span className="eyebrow">Winning position</span>
                <h3>Redeem the winning asset</h3>
                <div className="segmented">
                  <button type="button" className={positionOutcome ? 'active yes-choice' : ''} onClick={() => setPositionOutcome(true)}>{yesTokenLabel}</button>
                  <button type="button" className={!positionOutcome ? 'active no-choice' : ''} onClick={() => setPositionOutcome(false)}>{noTokenLabel}</button>
                </div>
                <label>
                  Outcome tokens to burn
                  <input value={positionAmount} onChange={(event) => setPositionAmount(event.target.value)} />
                </label>
                <label>
                  Exact payout in microcredits
                  <input value={payoutAmount} onChange={(event) => setPayoutAmount(event.target.value)} placeholder="token amount × settlement collateral ÷ winning supply" />
                </label>
                <button className="secondary-button" type="button" onClick={claim} disabled={!connected || !ready || !payoutAmount.trim()}>
                  <CircleDollarSign aria-hidden="true" size={17} /> Burn winner and redeem
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="deadline-strip" aria-label="Market deadlines">
          {deadlines.map(({ label, value, icon: Icon }) => (
            <div key={label} className={height && value && height > value ? 'passed' : ''}>
              <Icon aria-hidden="true" size={17} />
              <span>{label}</span>
              <strong>{Number.isFinite(value) ? value.toLocaleString() : 'Not set'}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="protocol-section" id="protocol" aria-labelledby="protocol-title">
        <div className="section-heading centered">
          <span className="eyebrow">Resolution, not reputation</span>
          <h2 id="protocol-title">Truth follows a verifiable path</h2>
          <p>The market never decides the outcome itself. It asks the oracle to verify a claim bound to the market at creation.</p>
        </div>
        <div className="resolution-flow">
          <article>
            <span>01</span><Flag aria-hidden="true" />
            <h3>Report</h3>
            <p>A reporter bonds DOOR and submits the market’s canonical YES or NO statement.</p>
          </article>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <article>
            <span>02</span><Clock3 aria-hidden="true" />
            <h3>Wait</h3>
            <p>The grace period gives anyone time to challenge a report they believe is wrong.</p>
          </article>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <article>
            <span>03</span><LockKeyhole aria-hidden="true" />
            <h3>Resolve</h3>
            <p>Undisputed reports pass. Disputed reports wait for private votes and the public aggregate tally.</p>
          </article>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <article>
            <span>04</span><CircleDollarSign aria-hidden="true" />
            <h3>Pay</h3>
            <p>The losing outcome token becomes non-redeemable. Winning tokens divide all collateral proportionally.</p>
          </article>
        </div>
        <div className="privacy-callout">
          <div className="lock-orbit"><LockKeyhole aria-hidden="true" size={30} /></div>
          <div>
            <span className="eyebrow">What stays private</span>
            <h3>Voting power and individual choices are Aleo records.</h3>
            <p>
              A voter converts a private DOOR payment record into a private voting right.
              Casting it consumes that record and returns a private receipt, while only aggregate confirm and deny counts become public.
            </p>
          </div>
          <ul>
            <li><Check aria-hidden="true" /> Private token input</li>
            <li><Check aria-hidden="true" /> Private voting right</li>
            <li><Check aria-hidden="true" /> Private vote receipt</li>
            <li><Check aria-hidden="true" /> Public aggregate tally</li>
          </ul>
        </div>
      </section>

      <section className="docs-section" id="docs" aria-labelledby="docs-title">
        <div className="section-heading">
          <span className="eyebrow">Documentation</span>
          <h2 id="docs-title">Built as one auditable demonstration</h2>
          <p>The frontend and all required Aleo source programs live together in this repository.</p>
        </div>
        <div className="docs-grid">
          <article>
            <span className="doc-icon"><ShieldCheck aria-hidden="true" /></span>
            <h3>Oracle contract</h3>
            <p>Assertions, disputes, private voting records, rewards, and outcome verification use real Testnet block heights.</p>
            <code>{ORACLE_PROGRAM_ID}</code>
          </article>
          <article>
            <span className="doc-icon"><Binary aria-hidden="true" /></span>
            <h3>Market contract</h3>
            <p>Registers YES&lt;x&gt; and NO&lt;x&gt; assets, holds neutral credits, requests oracle verification, and redeems only the winner.</p>
            <code>{MARKET_PROGRAM_ID}</code>
          </article>
          <article>
            <span className="doc-icon"><WalletCards aria-hidden="true" /></span>
            <h3>React client</h3>
            <p>Shield wallet produces and submits Aleo execution proofs behind each transaction confirmation.</p>
            <code>React · Vite · GitHub Pages</code>
          </article>
        </div>
        <div className="technical-note">
          <AlertTriangle aria-hidden="true" size={20} />
          <p>
            This is a Testnet demonstration. Contract source and upgrade policy are public,
            but the checked-in development administrator must be replaced before deployment.
            The deployment script refuses the placeholder.
          </p>
        </div>
        <div className="docs-actions">
          <a className="primary-link" href="https://github.com/dark-optimistic-oracle/predmkt#readme">
            Read the repository guide <ArrowRight aria-hidden="true" size={18} />
          </a>
          <a className="text-link" href="https://github.com/dark-optimistic-oracle/predmkt/tree/main/contracts">
            Inspect Aleo programs
          </a>
        </div>
      </section>
    </main>
  );
}
