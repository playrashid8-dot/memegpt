import { BSCSCAN_TOKEN_URL, TOKEN, formatShortAddress } from "@/lib/token";

export const SITE = {
  name: TOKEN.name,
  tagline: "AI-powered meme coin intelligence.",
  heroSubtitle:
    "Discover trending meme coins, whale activity, and viral opportunities before the market explodes.",
  description:
    `${TOKEN.name} (${TOKEN.symbol}) is live on BNB Smart Chain. Trade on PancakeSwap, verify on BscScan, and join the AI-powered meme coin intelligence platform.`,
  url: "https://memegpt.ai",
  contract: formatShortAddress(),
  contractAddress: TOKEN.address,
  links: {
    telegram: "https://t.me/memegpt",
    twitter: "https://x.com/memegpt",
    buy: TOKEN.pancakeswapUrl,
    pancakeswap: TOKEN.pancakeswapUrl,
    bscscan: BSCSCAN_TOKEN_URL,
  },
} as const;

export const NAV_LINKS = [
  { label: "Token", href: "#token" },
  { label: "Chart", href: "#chart" },
  { label: "Scanner", href: "#scanner" },
  { label: "Terminal", href: "#terminal" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
] as const;

export const HERO_STATS = [
  { label: "Tokens Scanned", value: 12847, suffix: "+" },
  { label: "Whale Alerts", value: 3421, suffix: "+" },
  { label: "AI Accuracy", value: 94.7, suffix: "%", decimals: 1 },
  { label: "Meme Signals", value: 892, suffix: "+" },
] as const;

export const TOKENOMICS = [
  { label: "Total Supply", value: 100, color: "#00ff88" },
  { label: "Liquidity", value: 40, color: "#00ff88" },
  { label: "Community", value: 25, color: "#39ff14" },
  { label: "Marketing", value: 20, color: "#7fff00" },
  { label: "CEX Reserve", value: 15, color: "#00cc6a" },
] as const;

export const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Launch + Community",
    description: "Token launch, website live, community building across Telegram & X.",
    status: "complete" as const,
  },
  {
    phase: "Phase 2",
    title: "AI Scanner Beta",
    description: "Deploy AI meme coin scanner with risk scoring and whale detection.",
    status: "active" as const,
  },
  {
    phase: "Phase 3",
    title: "Telegram Signal Bot",
    description: "Real-time alpha signals delivered directly to your Telegram.",
    status: "upcoming" as const,
  },
  {
    phase: "Phase 4",
    title: "CoinGecko + CMC",
    description: "Listings on major crypto data aggregators for global visibility.",
    status: "upcoming" as const,
  },
  {
    phase: "Phase 5",
    title: "Exchange Listings",
    description: "CEX listings and expanded liquidity pools worldwide.",
    status: "upcoming" as const,
  },
] as const;

export const WHY_CARDS = [
  {
    icon: "🧠",
    title: "AI Narrative",
    description:
      "Our AI reads social sentiment, on-chain data, and meme velocity to surface narratives before they trend.",
  },
  {
    icon: "🐸",
    title: "Meme Community",
    description:
      "Built by degens, for degens. A community that understands culture moves markets.",
  },
  {
    icon: "🐋",
    title: "Whale Tracking",
    description:
      "Real-time whale wallet monitoring with instant alerts when smart money moves.",
  },
  {
    icon: "🔥",
    title: "Viral Detection",
    description:
      "Detect viral meme patterns across TikTok, X, and Telegram before they hit CT.",
  },
  {
    icon: "⚡",
    title: "Early Signals",
    description:
      "Get alpha signals hours before tokens pump. Speed is everything in meme season.",
  },
  {
    icon: "📡",
    title: "Telegram Alerts",
    description:
      "Instant push notifications for high-conviction plays directly to your phone.",
  },
] as const;
