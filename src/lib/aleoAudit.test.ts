import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  beginAleoCall,
  buildAleoAuditMarkdown,
  completeAleoCall,
  formatAleoAuditInputs,
  setAleoDemoStep,
} from './aleoAudit';

describe('persistent Aleo audit journal', () => {
  it('retains the initiating demo step through asynchronous completion', () => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    window.history.replaceState({}, '', '/?demo=demo-20261003');
    setAleoDemoStep('VER-03');
    const call = beginAleoCall({kind: 'read', network: 'testnet', description: 'Read market', function: 'get_mapping_value', parameters: {}});
    setAleoDemoStep('VER-04');
    completeAleoCall(call, 'response', {result: {httpStatus: 200}});
    const exported = buildAleoAuditMarkdown();
    expect(exported.match(/"step": "VER-03"/g)).toHaveLength(2);
    expect(exported).not.toContain('"step": "VER-04"');
  });
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
    window.history.replaceState({}, '', '/');
  });

  it('automatically retains calls and exports human-readable Markdown with JSON evidence', () => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const audit = beginAleoCall({
      kind: 'transaction',
      network: 'testnet',
      description: 'Submit doo_prediction_market.aleo.settle_market',
      program: 'doo_prediction_market.aleo',
      function: 'settle_market',
      parameters: {
        caller: 'aleo1example',
        inputs: [{ position: 0, name: 'market_id', value: '187031921field' }],
        fee: 1_000_000,
        privateFee: false,
      },
    });
    completeAleoCall(audit, 'submitted', {
      result: { walletRequestId: 'shield_example' },
    });
    completeAleoCall(audit, 'response', {
      result: {
        walletRequestId: 'shield_example',
        walletStatus: 'accepted',
        onchainTransactionId: 'at1example',
      },
    });

    const markdown = buildAleoAuditMarkdown();
    expect(markdown).toContain('# Verity Prediction Market Aleo call log');
    expect(markdown).toContain('**What happened:** The frontend prepared');
    expect(markdown).toContain('temporary and does not prove');
    expect(markdown).toContain('The accepted on-chain transaction ID is at1example.');
    expect(markdown).toContain('"market_id"');
  });

  it('persists only the redacted form of a private record', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const privateRecord = '{ owner: aleo1secret, amount: 1000000u128.private }';
    const inputs = await formatAleoAuditInputs(
      [privateRecord, '187031922field'],
      ['payment', 'assertion_id'],
    );

    beginAleoCall({
      kind: 'transaction',
      network: 'testnet',
      description: 'Submit dark_optimistic_oracle.aleo.new_voting_right',
      program: 'dark_optimistic_oracle.aleo',
      function: 'new_voting_right',
      parameters: { inputs },
    });

    const markdown = buildAleoAuditMarkdown();
    expect(markdown).not.toContain(privateRecord);
    expect(markdown).not.toContain('aleo1secret');
    expect(markdown).toContain('private Aleo record');
    expect(markdown).toContain('"redacted": true');
  });
});
