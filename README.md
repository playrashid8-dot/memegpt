# MEMEGPT Website

Production Next.js marketing site for **MEMEGPT (MGPT)** — AI-powered meme coin intelligence.

## Project layout

```text
.
├── src/                 # Next.js app (pages, components, styles)
├── public/              # Static assets
├── scripts/             # Website asset tooling (logo, brand)
├── package.json         # Website dependencies only
├── next.config.ts
└── memegpt-token/       # BEP20 token (Hardhat) — separate package
```

The **Solidity / Hardhat** token lives in [`memegpt-token/`](./memegpt-token/). It has its own `package.json`, dependencies, and deployment docs. Do not mix Hardhat packages into the root `package.json`.

## Website — quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment (website)

Create `.env.local` at the project root (not committed):

```env
NEXT_PUBLIC_TOKEN_ADDRESS=0xYourDeployedAddress
NEXT_PUBLIC_CHAIN_ID=56
NEXT_PUBLIC_PANCAKESWAP_URL=https://pancakeswap.finance/swap?outputCurrency=0xYourDeployedAddress
```

## Build & deploy (Vercel)

```bash
npm run build
npm run start
```

Deploy the **repository root** to Vercel. Only the Next.js app is built; `memegpt-token/` is excluded from TypeScript and ESLint at the root.

## Token (BSC)

Deploy, verify, and manage the MGPT contract from the token package:

```bash
cd memegpt-token
npm install
cp .env.example .env
# edit .env, then:
npm run compile
npm test
```

See [memegpt-token/README.md](./memegpt-token/README.md) for BSC testnet/mainnet deployment and BscScan verification.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run prepare:logo` | Prepare logo assets |
