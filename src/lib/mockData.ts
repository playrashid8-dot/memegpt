export interface MemeCoin {
  id: string;
  name: string;
  symbol: string;
  riskScore: number;
  whaleBuys: number;
  socialHype: number;
  liquidity: "High" | "Medium" | "Low";
  volumeSpike: number;
  scamProbability: number;
  trend: "up" | "down" | "neutral";
}

export const MEME_COINS: MemeCoin[] = [
  {
    id: "1",
    name: "Pepe AI",
    symbol: "PEPEAI",
    riskScore: 23,
    whaleBuys: 47,
    socialHype: 94,
    liquidity: "High",
    volumeSpike: 340,
    scamProbability: 8,
    trend: "up",
  },
  {
    id: "2",
    name: "Doge Terminal",
    symbol: "DOGEAI",
    riskScore: 31,
    whaleBuys: 62,
    socialHype: 87,
    liquidity: "High",
    volumeSpike: 215,
    scamProbability: 12,
    trend: "up",
  },
  {
    id: "3",
    name: "Floki Moon",
    symbol: "FLOKI",
    riskScore: 45,
    whaleBuys: 28,
    socialHype: 72,
    liquidity: "Medium",
    volumeSpike: 180,
    scamProbability: 22,
    trend: "neutral",
  },
  {
    id: "4",
    name: "MemeX Protocol",
    symbol: "MEMEX",
    riskScore: 67,
    whaleBuys: 15,
    socialHype: 91,
    liquidity: "Low",
    volumeSpike: 520,
    scamProbability: 41,
    trend: "up",
  },
  {
    id: "5",
    name: "Shiba GPT",
    symbol: "SHIBGPT",
    riskScore: 38,
    whaleBuys: 33,
    socialHype: 65,
    liquidity: "Medium",
    volumeSpike: 95,
    scamProbability: 18,
    trend: "down",
  },
  {
    id: "6",
    name: "Bonk Intelligence",
    symbol: "BONKAI",
    riskScore: 29,
    whaleBuys: 51,
    socialHype: 78,
    liquidity: "High",
    volumeSpike: 267,
    scamProbability: 11,
    trend: "up",
  },
];

export interface TerminalSignal {
  id: string;
  timestamp: string;
  token: string;
  signal: string;
  type: "bullish" | "whale" | "momentum" | "social" | "warning";
  confidence: number;
}

export const TICKER_ITEMS = [
  { token: "PEPE", change: "+42%", label: "Degen Alpha Detected", positive: true },
  { token: "DOGEAI", change: "Whale Buy", label: "Giga-Whale Accumulation", positive: true },
  { token: "FLOKI", change: "+28%", label: "Momentum Spike", positive: true },
  { token: "MEMEX", change: "+156%", label: "Social Explosion", positive: true },
  { token: "AIPEPE", change: "Smart Money", label: "Smart Money Entry", positive: true },
  { token: "BONKAI", change: "+67%", label: "Viral Momentum", positive: true },
  { token: "WIF", change: "+33%", label: "Bullish Pattern", positive: true },
  { token: "SHIBGPT", change: "-12%", label: "Distribution Alert", positive: false },
  { token: "POPCAT", change: "+89%", label: "CT Trending", positive: true },
  { token: "MEMEGPT", change: "+420%", label: "Alpha Signal Live", positive: true },
] as const;

export const LIVE_ACTIVITY = [
  { icon: "👁", label: "Users Scanning Now", value: 2847, suffix: "", live: true },
  { icon: "🐋", label: "Whale Alerts (24h)", value: 142, suffix: "", live: true },
  { icon: "🔥", label: "Meme Velocity Score", value: 94.2, suffix: "", decimals: 1 as const, live: false },
  { icon: "📡", label: "Signals Generated", value: 12847, suffix: "+", live: false },
] as const;

export const TERMINAL_LOGS = [
  "scanning meme markets...",
  "whale wallet detected...",
  "social velocity increasing...",
  "AI confidence: 97.2%",
  "bullish pattern confirmed...",
  "generating alpha signal...",
  "degen alpha detected...",
  "giga-whale accumulation...",
  "viral momentum exploding...",
  "smart money entering...",
  "narrative strength: HIGH",
  "liquidity depth: OPTIMAL",
] as const;

export const TERMINAL_SIGNALS: TerminalSignal[] = [
  {
    id: "1",
    timestamp: "14:32:01",
    token: "PEPE",
    signal: "Bullish",
    type: "bullish",
    confidence: 92,
  },
  {
    id: "2",
    timestamp: "14:32:04",
    token: "DOGEAI",
    signal: "Whale Accumulation",
    type: "whale",
    confidence: 88,
  },
  {
    id: "3",
    timestamp: "14:32:07",
    token: "FLOKI",
    signal: "Momentum Spike",
    type: "momentum",
    confidence: 76,
  },
  {
    id: "4",
    timestamp: "14:32:11",
    token: "MEMEX",
    signal: "High Social Activity",
    type: "social",
    confidence: 94,
  },
  {
    id: "5",
    timestamp: "14:32:15",
    token: "BONKAI",
    signal: "Volume Breakout",
    type: "momentum",
    confidence: 81,
  },
  {
    id: "6",
    timestamp: "14:32:19",
    token: "SHIBGPT",
    signal: "Distribution Detected",
    type: "warning",
    confidence: 73,
  },
  {
    id: "7",
    timestamp: "14:32:23",
    token: "WIF",
    signal: "Bullish Divergence",
    type: "bullish",
    confidence: 85,
  },
  {
    id: "8",
    timestamp: "14:32:27",
    token: "POPCAT",
    signal: "Whale Entry",
    type: "whale",
    confidence: 79,
  },
];
