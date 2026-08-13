import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PredictionMarket from './PredictionMarket';

const executeTransactionMock = vi.fn();
const transactionStatusMock = vi.fn();
let walletState = {
  address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
  connected: true,
  executeTransaction: executeTransactionMock,
  transactionStatus: transactionStatusMock,
};

vi.mock('@provablehq/aleo-wallet-adaptor-react', () => ({
  useWallet: () => walletState,
}));

describe('PredictionMarket', () => {
  beforeEach(() => {
    executeTransactionMock.mockReset();
    transactionStatusMock.mockReset();
    executeTransactionMock.mockResolvedValue({ transactionId: 'mock_wallet_request' });
    transactionStatusMock.mockResolvedValue({
      status: 'accepted',
      transactionId: 'at1mock_onchain_transaction',
    });
    walletState = {
      address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
      connected: true,
      executeTransaction: executeTransactionMock,
      transactionStatus: transactionStatusMock,
    };
  });

  it('explains that outcome assets and DOOR have separate roles', async () => {
    render(<PredictionMarket />);

    expect(screen.getByRole('heading', { name: /prediction market console/i })).toBeInTheDocument();
    expect(screen.getByText(/DOOR is not used here/i)).toBeInTheDocument();
    expect(screen.getByText(/losing asset redeems for zero/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/YES101/i)).not.toHaveLength(0);
    expect(screen.getAllByText(/NO101/i)).not.toHaveLength(0);
  });

  it('creates two token-registry outcome assets with neutral collateral', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    render(<PredictionMarket />);

    fireEvent.click(screen.getByRole('button', { name: /create market/i }));

    await waitFor(() => expect(executeTransactionMock).toHaveBeenCalledTimes(1));
    expect(executeTransactionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        program: 'doo_prediction_market.aleo',
        function: 'create_market',
        inputs: [
          expect.stringMatching(
            /yes_token_id: \d+field,[\s\S]*no_token_id: \d+field,[\s\S]*yes_token_name: \d+u128,[\s\S]*no_token_name: \d+u128/,
          ),
          '1000000u64',
        ],
      }),
    );
    const auditEntries = consoleSpy.mock.calls
      .filter(([prefix]) => prefix === '[Aleo audit]')
      .map(([, entry]) => JSON.parse(String(entry)));
    expect(auditEntries).toEqual(expect.arrayContaining([
      expect.objectContaining({
        phase: 'request',
        kind: 'transaction',
        program: 'doo_prediction_market.aleo',
        function: 'create_market',
        parameters: expect.objectContaining({
          caller: walletState.address,
          inputs: [
            expect.objectContaining({ position: 0, name: 'market' }),
            expect.objectContaining({ position: 1, name: 'initial_liquidity', value: '1000000u64' }),
          ],
          fee: 1_000_000,
          privateFee: false,
        }),
      }),
      expect.objectContaining({
        phase: 'submitted',
        function: 'create_market',
        result: { walletRequestId: 'mock_wallet_request' },
      }),
      expect.objectContaining({
        phase: 'response',
        function: 'create_market',
        result: expect.objectContaining({
          walletRequestId: 'mock_wallet_request',
          walletStatus: 'accepted',
          onchainTransactionId: 'at1mock_onchain_transaction',
          timedOut: false,
        }),
      }),
    ]));
    consoleSpy.mockRestore();
  });

  it('mints the selected outcome token without spending DOOR', async () => {
    render(<PredictionMarket />);

    fireEvent.click(screen.getByRole('button', { name: /mint YES101/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          program: 'doo_prediction_market.aleo',
          function: 'buy_outcome',
          inputs: ['101field', 'true', expect.stringMatching(/field$/), '25000000u64'],
        }),
      ),
    );
  });

  it('mints the NO outcome token when that side is selected', async () => {
    render(<PredictionMarket />);

    fireEvent.click(screen.getByRole('button', { name: /mint NO101/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          function: 'buy_outcome',
          inputs: ['101field', 'false', expect.stringMatching(/field$/), '25000000u64'],
        }),
      ),
    );
  });

  it('uses DOOR only when reporting through the oracle lifecycle', async () => {
    render(<PredictionMarket />);

    fireEvent.click(screen.getByRole('tab', { name: /report/i }));
    fireEvent.click(screen.getByRole('button', { name: /report YES outcome/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          program: 'dark_optimistic_oracle.aleo',
          function: 'create_assertion',
          inputs: [
            expect.stringMatching(
              /id: 501field,[\s\S]*title: 101field,[\s\S]*cost: 100000000u128,[\s\S]*voter_stake: 1000000u128/,
            ),
          ],
        }),
      ),
    );
  });

  it('supports the full dispute and private-vote transaction path', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    render(<PredictionMarket />);
    fireEvent.click(screen.getByRole('tab', { name: /review/i }));

    fireEvent.click(screen.getByRole('button', { name: /dispute assertion/i }));
    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          function: 'dispute_assertion',
          inputs: ['501field', '100000000u128'],
        }),
      ),
    );

    fireEvent.change(screen.getByLabelText(/private DOOR payment record/i), {
      target: { value: '{ owner: aleo1private, amount: 1000000u128 }' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create voting right/i }));
    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          function: 'new_voting_right',
          inputs: [
            '{ owner: aleo1private, amount: 1000000u128 }',
            '501field',
            '1000000u128',
          ],
        }),
      ),
    );

    fireEvent.change(screen.getByLabelText(/private voting-right record/i), {
      target: { value: '{ owner: aleo1private, assertion_id: 501field }' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^deny$/i }));
    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          function: 'deny',
          inputs: ['{ owner: aleo1private, assertion_id: 501field }'],
        }),
      ),
    );

    const privateAuditEntries = consoleSpy.mock.calls
      .filter(([prefix]) => prefix === '[Aleo audit]')
      .map(([, entry]) => JSON.parse(String(entry)))
      .filter((entry) => entry.phase === 'request' && ['new_voting_right', 'deny'].includes(entry.function));
    expect(JSON.stringify(privateAuditEntries)).not.toContain('aleo1private');
    expect(privateAuditEntries).toHaveLength(2);
    expect(privateAuditEntries[0].parameters.inputs[0].value).toEqual(expect.objectContaining({
      redacted: true,
      classification: 'private Aleo record',
      sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
    }));
    expect(privateAuditEntries[1].parameters.inputs[0].value).toEqual(expect.objectContaining({
      redacted: true,
      sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
    }));
    consoleSpy.mockRestore();
  });

  it('passes the market close height into oracle-gated settlement', async () => {
    render(<PredictionMarket />);
    fireEvent.click(screen.getByRole('tab', { name: /settle/i }));
    fireEvent.click(screen.getByRole('button', { name: /^NO$/i }));
    fireEvent.click(screen.getByRole('button', { name: /settle from oracle/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          function: 'settle_market',
          inputs: [
            '101field',
            '501field',
            'true',
            expect.stringMatching(/field$/),
            'false',
            '1010000u32',
          ],
        }),
      ),
    );
  });

  it('redeems only the selected winning token with an exact payout', async () => {
    render(<PredictionMarket />);
    fireEvent.click(screen.getByRole('tab', { name: /settle/i }));
    fireEvent.change(screen.getByLabelText(/exact payout in microcredits/i), {
      target: { value: '50000000' },
    });
    fireEvent.click(screen.getByRole('button', { name: /burn winner and redeem/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          function: 'redeem_winning_tokens',
          inputs: [
            '101field',
            expect.stringMatching(/field$/),
            '25000000u128',
            '50000000u64',
          ],
        }),
      ),
    );
  });

  it('rejects malformed transaction input before invoking the wallet', async () => {
    render(<PredictionMarket />);
    fireEvent.change(screen.getByLabelText(/^Market ID$/i), { target: { value: '-1' } });
    fireEvent.click(screen.getByRole('button', { name: /create market/i }));

    expect(await screen.findByText(/field values must be unsigned decimal integers/i)).toBeInTheDocument();
    expect(executeTransactionMock).not.toHaveBeenCalled();
  });

  it('surfaces wallet execution failures', async () => {
    executeTransactionMock.mockRejectedValueOnce(new Error('Wallet rejected the request.'));
    render(<PredictionMarket />);
    fireEvent.click(screen.getByRole('button', { name: /mint YES101/i }));

    expect(await screen.findByText(/wallet rejected the request/i)).toBeInTheDocument();
  });

  it('prevents writes when the wallet is disconnected', () => {
    walletState = { ...walletState, address: '', connected: false };
    render(<PredictionMarket />);

    expect(screen.getByRole('button', { name: /create market/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /mint YES101/i })).toBeDisabled();
    expect(executeTransactionMock).not.toHaveBeenCalled();
  });
});
