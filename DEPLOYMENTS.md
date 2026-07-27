# Network addresses and deployments

Last verified: 2026-07-27

No private key is recorded here. Real keys remain only in the ignored,
mode-`600` `.env.private` file.

## Testnet

### Accounts

| Address | Role |
| --- | --- |
| `aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf` | Dedicated shared deployer and `@admin` upgrade authority for the oracle and prediction market; also the oracle fee collector and initial DOOR recipient. Fund this address for later Testnet deployments or upgrades. Its key is `TESTNET_PRIVATE_KEY`. |
| `aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px` | Retained generic devnet account that temporarily received faucet credits and relayed them to the dedicated Testnet account. It is not a public-network administrator. Its retained key is `DEVNET_PRIVATE_KEY`. |
| Connected Shield wallet address | The current application user: market creator, trader, reporter, disputer, voter, settler, or redeemer according to the submitted transition. This address is selected by the browser extension and is never configured in the repository. Fund it separately when testing user transactions. |

After deployment, the dedicated account had `11.723278` public credits and the
relay account had `0.538849` public credits. These are point-in-time values.

### Programs

| Program | Deterministic program address | Testnet state |
| --- | --- | --- |
| `dark_optimistic_oracle.aleo` | `aleo1nyflwg9mjfkfp2n9mtng0snxj9qrhahkjxp5l9pag4zxm3qrssrqwv8tml` | Deployed at edition `0` and initialized. |
| `doo_prediction_market.aleo` | `aleo1mrr7u3lyqmgewq4gy878m35fugqzth9lvqr5vmhsrzek49ra4cxqh27v3n` | Deployed at edition `0`. |
| `token_registry.aleo` | Canonical Aleo program; not deployed or administered by this project. | Existing public dependency, edition `1` when deployment was performed. |

Program addresses belong to program IDs and have no user-held private key. The
account administrator above controls upgrades through each program's Leo
`@admin` constructor. The source-level sentinel address
`aleo1ezamst4pjgj9zfxqq0fwfj8a4cjuqndmasgata3hggzqygggnyfq6kmyd4`
represents an absent mapping value; it is not an account to fund.

### Accepted Testnet transactions

| Operation | Transaction ID |
| --- | --- |
| Transfer `40` public credits from the relay account to the dedicated deployer | `at1tetgzhg9rpgdvwhwt3mtvn28a5kjw5m5j3s0p9h869j4jgdgrvpqe7kw0g` |
| Deploy `dark_optimistic_oracle.aleo` | `at1lm5mwg6427uhnpqpps6n6jcxz7qvec0d6srsxnl3r93y7cydxvgszcauw8` |
| Initialize the oracle and register DOOR | `at13teruy8sz5y3awfhlxhz45caz4er85eaed4ga4g5x7f6545rwupqd3a4vv` |
| Deploy `doo_prediction_market.aleo` | `at1vfruryar6rztzd3ex45cmhyda2h2pxzm8x6acd43lferxusfaq8sget384` |

The DOOR token ID is
`346688784394585735039324415800163929700021701423791533632764818774905958305field`.
Outcome-token IDs are derived independently from each market ID. They do not
share the DOOR token ID and require no fixed user address.

## Local devnet

The local deployment and complete integration lifecycle use the generic account
`aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px` as the
registry, oracle, and market deployer/administrator and as the scripted local
participant. Its key is `DEVNET_PRIVATE_KEY`.

Local balances are created by the Leo-managed devnet genesis and are unrelated
to Testnet faucet balances. No local address needs Testnet funds. Cleaning the
devnet discards its ledger state.

The program IDs and deterministic program addresses shown above are the same on
devnet and Testnet, but their deployments and mappings live on different
ledgers. Browser users may also connect any separately funded local-compatible
wallet if their wallet and node setup supports the local endpoint.
