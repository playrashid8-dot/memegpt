"use client";

import { motion } from "@/lib/motion";
import { MEME_COINS } from "@/lib/mockData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useMotionProfile } from "@/lib/useMedia";

function RiskBadge({ score }: { score: number }) {
  const color =
    score < 35 ? "text-neon bg-neon/10 border-neon/35 shadow-[0_0_12px_rgba(0,255,136,0.2)]" :
    score < 60 ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/35" :
    "text-red-400 bg-red-400/10 border-red-400/35";

  return (
    <span className={`inline-flex px-2.5 py-0.5 text-xs font-mono rounded-md border ${color}`}>
      {score}/100
    </span>
  );
}

function MetricBar({ label, value, max = 100, color = "bg-neon" }: { label: string; value: number; max?: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-foreground/45">{label}</span>
        <span className="text-foreground/75 font-mono">{value}{max === 100 && label !== "Volume Spike" ? "" : "%"}</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/[0.04] overflow-hidden border border-white/[0.04]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${color} shadow-[0_0_12px_rgba(0,255,136,0.4)]`}
        />
      </div>
    </div>
  );
}

function LiquidityBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    High: "text-neon border-neon/35 bg-neon/10",
    Medium: "text-yellow-400 border-yellow-400/35 bg-yellow-400/10",
    Low: "text-red-400 border-red-400/35 bg-red-400/10",
  };
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${colors[status] || colors.Medium}`}>
      {status}
    </span>
  );
}

export default function AIScanner() {
  const { isMobile, canAnimate } = useMotionProfile();

  return (
    <SectionWrapper id="scanner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="AI Scanner"
          title="Meme Coin Intelligence"
          subtitle="Real-time analysis powered by AI. Bloomberg terminal meets degen culture."
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 rounded-xl px-4 sm:px-6 py-4 sm:py-5 max-w-2xl mx-auto border-neon/15 corner-accent ${isMobile ? "glass-lite" : "glass-card-ultra"}`}
        >
          {canAnimate && !isMobile ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-7 h-7 border-2 border-neon/30 border-t-neon rounded-full shrink-0 shadow-[0_0_15px_rgba(0,255,136,0.3)]"
            />
          ) : (
            <div className="w-7 h-7 border-2 border-neon/30 border-t-neon rounded-full shrink-0" />
          )}
          <div className="text-center sm:text-left">
            <p className="text-sm font-mono text-neon/90">
              Scanning <AnimatedCounter value={12847} suffix="+" className="text-neon font-bold ticker-glow" /> tokens across 12 chains...
            </p>
            <p className="text-xs text-foreground/40 mt-1">Degen alpha detected • Giga-whale accumulation • Smart money active</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-full bg-neon/5 border border-neon/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
            </span>
            <span className="text-xs font-mono text-neon/70 font-bold tracking-wider">LIVE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {MEME_COINS.map((coin, i) => (
            <GlassCard key={coin.id} delay={i * 0.08} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-lg sm:text-xl ticker-glow">
                      {coin.symbol}
                    </h3>
                    <span className={`text-sm ${coin.trend === "up" ? "text-neon" : coin.trend === "down" ? "text-red-400" : "text-foreground/40"}`}>
                      {coin.trend === "up" ? "▲" : coin.trend === "down" ? "▼" : "●"}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/45">{coin.name}</p>
                </div>
                <RiskBadge score={coin.riskScore} />
              </div>

              <div className="space-y-4">
                <MetricBar label="Social Hype" value={coin.socialHype} />
                <MetricBar label="Whale Buys" value={coin.whaleBuys} max={100} color="bg-neon-bright" />
                <MetricBar label="Volume Spike" value={coin.volumeSpike} max={600} color="bg-neon-dim" />

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground/45">Liquidity</span>
                    <LiquidityBadge status={coin.liquidity} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-foreground/45">Scam Risk </span>
                    <span className={`text-xs font-mono font-bold ${coin.scamProbability > 30 ? "text-red-400" : "text-neon"}`}>
                      {coin.scamProbability}%
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
