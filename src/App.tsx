import { useMemo } from 'react';
import { DecryptPermission } from '@provablehq/aleo-wallet-adaptor-core';
import { AleoWalletProvider } from '@provablehq/aleo-wallet-adaptor-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@provablehq/aleo-wallet-adaptor-react-ui';
import { ShieldWalletAdapter } from '@provablehq/aleo-wallet-adaptor-shield';
import { Network } from '@provablehq/aleo-types';
import { Github, ShieldCheck } from 'lucide-react';
import '@provablehq/aleo-wallet-adaptor-react-ui/dist/styles.css';
import './App.css';
import PredictionMarket from './PredictionMarket';

export default function App() {
  const wallets = useMemo(() => [new ShieldWalletAdapter()], []);

  return (
    <AleoWalletProvider
      autoConnect
      decryptPermission={DecryptPermission.UponRequest}
      network={Network.TESTNET}
      wallets={wallets}
    >
      <WalletModalProvider>
        <div className="site-shell">
          <header className="site-header">
            <a className="brand" href="#top" aria-label="Dark Prediction Market home">
              <span className="brand-icon"><ShieldCheck aria-hidden="true" size={18} /></span>
              <span>Dark <b>Prediction Market</b></span>
            </a>
            <div className="header-actions">
              <nav aria-label="Primary navigation">
                <a href="#market">Market</a>
                <a href="#protocol">How it works</a>
                <a href="#docs">Docs</a>
              </nav>
              <a
                className="icon-link"
                href="https://github.com/dark-optimistic-oracle/predmkt"
                aria-label="Source code on GitHub"
              >
                <Github aria-hidden="true" size={19} />
              </a>
              <WalletMultiButton />
            </div>
          </header>

          <PredictionMarket />

          <footer>
            <a className="brand footer-brand" href="#top">
              <span className="brand-icon"><ShieldCheck aria-hidden="true" size={16} /></span>
              Dark Prediction Market
            </a>
            <p>Open-source demonstration on Aleo Testnet. Not financial advice.</p>
            <div>
              <a href="#market">App</a>
              <a href="#docs">Documentation</a>
              <a href="https://github.com/dark-optimistic-oracle/predmkt">Source</a>
            </div>
          </footer>
        </div>
      </WalletModalProvider>
    </AleoWalletProvider>
  );
}
