# MEMEGPT (MGPT) — BEP20 Token

Production-ready, **no-tax** BEP20 token for **BNB Smart Chain (BSC)**.

| Property | Value |
| --- | --- |
| Name | MEMEGPT |
| Symbol | MGPT |
| Decimals | 18 |
| Total Supply | 1,000,000,000 (fixed) |
| Network | BNB Smart Chain (BEP20) |

---

## Security Summary

This contract is intentionally minimal and transparent:

- **No buy/sell/transfer tax**
- **No reflection, auto-liquidity, or honeypot logic**
- **No blacklist, whitelist, or trading cooldowns**
- **No hidden mint** — full supply minted once in the constructor
- **No upgradeability or proxy**
- **Public burn** — any holder can burn their own tokens
- **Ownable** — supports `renounceOwnership()` for trustless launch
- **Optional anti-whale** — transparent max wallet / max tx, permanently removable

---

## Project Structure

This package lives at **`/memegpt-token`** in the MEMEGPT monorepo (sibling to the Next.js website). It is fully independent: own dependencies, env, and scripts.

```text
memegpt-token/
├── contracts/
│   └── MEMEGPT.sol
├── scripts/
│   ├── deploy-testnet.ts
│   ├── deploy-mainnet.ts
│   └── verify.ts
├── test/
│   └── MEMEGPT.test.ts
├── ignition/
│   ├── modules/MEMEGPT.ts
│   └── parameters/
├── hardhat.config.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Prerequisites

1. [Node.js 18+](https://nodejs.org/)
2. A BSC wallet with BNB for gas
3. A [BscScan API key](https://bscscan.com/myapikey) (for verification)

---

## 1. Install

```bash
cd memegpt-token
npm install
```

---

## 2. Configure Environment

Copy the example env file:

```bash
cp .env.example .env
```

Copy and edit env (from this directory):

```bash
cp .env.example .env
```

Required keys: `DEPLOYER_PRIVATE_KEY`, `BSCSCAN_API_KEY`, `BSC_MAINNET_RPC_URL` (or defaults). After deploy, set `CONTRACT_ADDRESS` and `TOKEN_OWNER_ADDRESS` if the owner is not the deployer.

> **Never commit `.env` or share your private key.**

---

## 3. Compile

```bash
npm run compile
```

---

## 4. Test

```bash
npm test
```

---

## 5. Deploy

### BSC Testnet (recommended first)

1. Fund your deployer wallet with test BNB from a faucet.
2. Deploy:

```bash
npm run deploy:testnet
```

3. Save the printed contract address to `.env`:

```env
CONTRACT_ADDRESS=0xYourDeployedAddress
```

4. Verify on BscScan:

```bash
npm run verify:testnet
```

### BSC Mainnet

1. Fund deployer wallet with real BNB for gas.
2. Deploy:

```bash
npm run deploy:mainnet
```

3. Set `CONTRACT_ADDRESS` in `.env`.
4. Verify:

```bash
npm run verify:mainnet
```

### Hardhat Ignition (alternative)

Update `ignition/parameters/bscTestnet.json` or `bscMainnet.json` with your owner address, then:

```bash
npm run ignition:deploy:testnet
# or
npm run ignition:deploy:mainnet
```

---

## 6. Verify on BscScan

Verification uses the same owner address passed to the constructor.

If you used a custom owner:

```env
TOKEN_OWNER_ADDRESS=0xYourOwnerAddress
CONTRACT_ADDRESS=0xYourTokenAddress
```

Then run:

```bash
npm run verify:mainnet
```

Manual verification on [BscScan](https://bscscan.com/verifyContract):

- Compiler: `0.8.24`
- Optimization: enabled, 200 runs
- Constructor argument: ABI-encoded owner address

---

## 7. Import into MetaMask

1. Open MetaMask → **Assets** → **Import tokens**
2. Select **BNB Smart Chain**
3. Paste your **contract address**
4. Symbol `MGPT` and decimals `18` should auto-fill
5. Confirm import

---

## 8. Add PancakeSwap Liquidity

Use [PancakeSwap](https://pancakeswap.finance/):

1. Go to **Liquidity** → **Add Liquidity**
2. Token A: **BNB**
3. Token B: paste **MGPT contract address**
4. Choose amounts (example: 5 BNB + matching MGPT allocation)
5. Approve MGPT spending if prompted
6. Confirm add liquidity transaction
7. Save your **LP token** address and amount

### LP Locking (recommended)

Lock LP to build community trust:

- [PinkSale PinkLock](https://www.pinksale.finance/pinklock)
- [Team Finance](https://team.finance/)
- [UNCX](https://uncx.network/)

Lock **80–100%** of LP for **6–12+ months** and publish the lock proof in your social channels.

---

## 9. DEX Screener Setup

1. After liquidity is live, open [DEX Screener](https://dexscreener.com/)
2. Search your contract address — the pair usually appears automatically
3. If not listed within ~30 minutes, submit/update at [DEX Screener Update Request](https://docs.dexscreener.com/token-listing)

### Logo & Links

Prepare:

- **Logo**: 256×256 PNG (transparent background recommended)
- **Website**: your Vercel site URL
- **Telegram / X / Discord** links
- **Contract address** (BSC)

Update token info on DEX Screener once the pair is indexed.

---

## 10. CoinGecko Preparation

CoinGecko requires a live, verifiable project. Prepare before applying:

1. **Verified contract** on BscScan
2. **Public liquidity** on PancakeSwap
3. **Locked LP** proof
4. **Website** (Vercel deployment)
5. **Active community** (Telegram, X)
6. **Logo** (200×200 min, PNG/SVG)
7. **Transparent tokenomics** page

Apply via [CoinGecko Request Form](https://www.coingecko.com/en/coins/new) when criteria are met.

---

## Vercel Website Integration

Add these values to your frontend env (example for the MEMEGPT site):

```env
NEXT_PUBLIC_TOKEN_NAME=MEMEGPT
NEXT_PUBLIC_TOKEN_SYMBOL=MGPT
NEXT_PUBLIC_TOKEN_DECIMALS=18
NEXT_PUBLIC_TOKEN_SUPPLY=1000000000
NEXT_PUBLIC_TOKEN_ADDRESS=0xYourDeployedAddress
NEXT_PUBLIC_CHAIN_ID=56
NEXT_PUBLIC_PANCAKESWAP_URL=https://pancakeswap.finance/swap?outputCurrency=0xYourDeployedAddress
NEXT_PUBLIC_BSCSCAN_URL=https://bscscan.com/token/0xYourDeployedAddress
NEXT_PUBLIC_DEXSCREENER_URL=https://dexscreener.com/bsc/0xYourPairAddress
```

Use `chainId=97` and testnet URLs when testing on BSC Testnet.

---

## Owner Actions After Launch

Typical trustless launch flow:

1. Deploy token
2. Verify on BscScan
3. Add liquidity on PancakeSwap
4. Lock LP tokens
5. (Optional) `disableAntiWhalePermanently()` if anti-whale was enabled
6. `renounceOwnership()` when admin actions are no longer needed

```javascript
// Example using Hardhat console or ethers.js
await token.disableAntiWhalePermanently(); // optional
await token.renounceOwnership();
```

After renouncing ownership:

- No one can enable anti-whale again (if already disabled)
- No admin controls remain
- Supply stays fixed; only user burns reduce supply

---

## Contract Functions (Public)

| Function | Description |
| --- | --- |
| `transfer` / `transferFrom` | Standard ERC20 transfers (0% tax) |
| `approve` / `allowance` | Standard ERC20 approvals |
| `burn(amount)` | Burn caller's tokens |
| `enableAntiWhale(maxWallet, maxTx)` | Owner-only, optional launch protection |
| `disableAntiWhalePermanently()` | Owner-only, irreversible |
| `renounceOwnership()` | Owner-only, removes admin control |

---

## Network Reference

| Network | Chain ID | RPC |
| --- | --- | --- |
| BSC Mainnet | 56 | `https://bsc-dataseed.binance.org` |
| BSC Testnet | 97 | `https://data-seed-prebsc-1-s1.binance.org:8545` |

---

## Disclaimer

This codebase is provided as-is. Review the contract, test on testnet, and consult legal/financial advisors before mainnet launch. You are responsible for deployment, liquidity, marketing, and regulatory compliance.

---

## License

MIT
