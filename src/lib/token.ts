const DEFAULTS = {
  name: "MEMEGPT",
  symbol: "MGPT",
  decimals: 18,
  supply: "1000000000",
  address: "0x1dF5b60a0045c2b8221ADAa3a982778157E70749",
  chainId: 56,
  pancakeswapUrl:
    "https://pancakeswap.finance/swap?outputCurrency=0x1dF5b60a0045c2b8221ADAa3a982778157E70749",
} as const;

function env(key: string, fallback: string): string {
  return process.env[key]?.trim() || fallback;
}

function envInt(key: string, fallback: number): number {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const TOKEN = {
  name: env("NEXT_PUBLIC_TOKEN_NAME", DEFAULTS.name),
  symbol: env("NEXT_PUBLIC_TOKEN_SYMBOL", DEFAULTS.symbol),
  decimals: envInt("NEXT_PUBLIC_TOKEN_DECIMALS", DEFAULTS.decimals),
  supply: env("NEXT_PUBLIC_TOKEN_SUPPLY", DEFAULTS.supply),
  address: env("NEXT_PUBLIC_TOKEN_ADDRESS", DEFAULTS.address),
  chainId: envInt("NEXT_PUBLIC_CHAIN_ID", DEFAULTS.chainId),
  pancakeswapUrl: env("NEXT_PUBLIC_PANCAKESWAP_URL", DEFAULTS.pancakeswapUrl),
} as const;

export const NETWORK_NAME = "BNB Smart Chain";

export const BSCSCAN_TOKEN_URL = `https://bscscan.com/token/${TOKEN.address}`;

export function formatShortAddress(
  address: string = TOKEN.address,
  prefixLength = 6,
  suffixLength = 4,
): string {
  if (address.length <= prefixLength + suffixLength + 2) return address;
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}

export function formatSupplyDisplay(supply: string = TOKEN.supply): string {
  const value = Number(supply);
  if (!Number.isFinite(value)) return supply;

  if (value >= 1_000_000_000) {
    const billions = value / 1_000_000_000;
    return Number.isInteger(billions) ? `${billions}B` : `${billions.toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return Number.isInteger(millions) ? `${millions}M` : `${millions.toFixed(1)}M`;
  }
  return value.toLocaleString("en-US");
}
