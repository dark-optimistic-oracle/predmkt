import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PredictionMarket from './PredictionMarket';

const executeTransactionMock = vi.fn();
let walletState = {
  address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
  connected: true,
  executeTransaction: executeTransactionMock,
};

vi.mock('@provablehq/aleo-wallet-adaptor-react', () => ({
  useWallet: () => walletState,
}));

describe('PredictionMarket', () => {
  beforeEach(() => {
    executeTransactionMock.mockReset();
    executeTransactionMock.mockResolvedValue({ transactionId: 'mock_transaction' });
    walletState = {
      address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
      connected: true,
      executeTransaction: executeTransactionMock,
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

  it('prevents writes when the wallet is disconnected', () => {
    walletState = { ...walletState, address: '', connected: false };
    render(<PredictionMarket />);

    expect(screen.getByRole('button', { name: /create market/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /mint YES101/i })).toBeDisabled();
    expect(executeTransactionMock).not.toHaveBeenCalled();
  });
});
