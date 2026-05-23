"use client";

import { motion } from "@/lib/motion";
import {
  NETWORK_NAME,
  TOKEN,
  formatSupplyDisplay,
} from "@/lib/token";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import ContractAddress from "@/components/ui/ContractAddress";
import { useMotionProfile } from "@/lib/useMedia";

const STATS = [
  { icon: "◈", label: "Symbol", value: TOKEN.symbol, accent: "text-neon" },
  { icon: "∞", label: "Total Supply", value: formatSupplyDisplay(), accent: "text-neon-bright" },
  { icon: "⬡", label: "Network", value: NETWORK_NAME, accent: "text-cyan" },
  { icon: "✓", label: "Contract", value: "Verified", accent: "text-neon" },
  { icon: "0%", label: "Tax", value: "No Tax", accent: "text-neon-bright" },
  { icon: "🔒", label: "Supply Type", value: "Fixed Supply", accent: "text-neon" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TokenStats() {
  const { canHover, canAnimate, isMobile } = useMotionProfile();
  const surfaceClass = isMobile ? "glass-lite" : "glass-card-ultra";

  return (
    <SectionWrapper id="token">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Live on BSC"
          title={`${TOKEN.name} Token`}
          subtitle={`${TOKEN.symbol} is deployed and trading on PancakeSwap. Transparent, verified, and community-owned.`}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
              whileHover={canHover ? { y: -4, scale: 1.02 } : undefined}
              className={`${surfaceClass} rounded-xl p-4 sm:p-5 md:p-6 text-center corner-accent holographic-border group`}
            >
              {canAnimate ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  className="block text-lg sm:text-xl mb-2 sm:mb-3 opacity-70 group-hover:opacity-100 transition-opacity"
                >
                  {stat.icon}
                </motion.span>
              ) : (
                <span className="block text-lg sm:text-xl mb-2 sm:mb-3 opacity-70">{stat.icon}</span>
              )}
              <p className={`font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 ticker-glow ${stat.accent}`}>
                {stat.value}
              </p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-foreground/40 uppercase tracking-[0.16em] leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <ContractAddress />
      </div>
    </SectionWrapper>
  );
}
