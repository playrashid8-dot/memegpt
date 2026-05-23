"use client";

import { motion } from "framer-motion";
import { HERO_STATS, SITE } from "@/lib/constants";
import { TOKEN } from "@/lib/token";
import { useIsMobile } from "@/lib/useMedia";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Logo from "@/components/ui/Logo";
import AIOrb from "@/components/effects/AIOrb";
import TickerTape from "@/components/effects/TickerTape";
import LiveActivity from "@/components/effects/LiveActivity";
import ScanLine from "@/components/effects/ScanLine";
import GridBackground from "@/components/effects/GridBackground";

const FLOATING_EMOJIS = ["🐸", "🤖", "🚀", "💎", "🧠", "⚡", "🔥", "📈"];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {!isMobile && <GridBackground animated perspective />}
        {!isMobile && <ScanLine />}
        <div
          className="absolute inset-0 animate-gradient-shift hero-gradient-overlay"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 32%, rgba(0,255,136,0.1) 0%, transparent 55%), radial-gradient(ellipse 45% 40% at 12% 82%, rgba(0,240,255,0.05) 0%, transparent 50%), radial-gradient(ellipse 35% 35% at 88% 18%, rgba(168,85,247,0.04) 0%, transparent 45%)",
          }}
        />
        <div className="absolute inset-0 noise-overlay opacity-30 sm:opacity-50" />
      </div>

      {FLOATING_EMOJIS.map((emoji, i) => (
        <motion.span
          key={`${emoji}-${i}`}
          className="absolute text-lg sm:text-xl md:text-2xl opacity-[0.12] select-none pointer-events-none z-[1] hidden sm:block"
          style={{
            top: `${10 + (i * 11) % 78}%`,
            left: `${4 + (i * 13) % 88}%`,
          }}
          animate={{
            y: [0, -22, 0],
            rotate: [0, 12, -12, 0],
            opacity: [0.05, 0.18, 0.05],
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.span>
      ))}

      <div className="relative z-10 flex-1 flex items-center justify-center pt-[4.5rem] sm:pt-28 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="inline-flex items-center gap-2 mb-4 sm:mb-8 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full glass-card-ultra text-[10px] sm:text-xs font-mono text-neon/85 border-neon/20"
              >
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-neon shadow-[0_0_8px_rgba(0,255,136,0.7)]" />
                </span>
                AI SCANNER LIVE — DEGEN ALPHA DETECTED
              </motion.div>

              <h1 className="sr-only">{SITE.name}</h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
                className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl text-neon/85 font-semibold mb-2 sm:mb-4 tracking-tight leading-snug"
              >
                {SITE.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.43, ease: EASE }}
                className="text-sm sm:text-base md:text-lg text-foreground/50 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-12 leading-relaxed"
              >
                {SITE.heroSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.51, ease: EASE }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-2.5 sm:gap-4 mb-8 sm:mb-14"
              >
                <Button href={TOKEN.pancakeswapUrl} external className="w-full sm:w-auto min-w-[200px] sm:btn-pulse-ring">
                  <span>🚀</span> Buy Token
                </Button>
                <Button href={TOKEN.pancakeswapUrl} variant="secondary" external className="w-full sm:w-auto min-w-[200px]">
                  <span>⚡</span> Launch App
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.63, ease: EASE }}
                className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-lg mx-auto lg:mx-0"
              >
                {HERO_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.07, ease: EASE }}
                    className="glass-card-ultra rounded-xl p-3 sm:p-4 md:p-5 text-center corner-accent holographic-border gpu-layer sm:hover:scale-[1.03] sm:hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neon mb-0.5 sm:mb-1 ticker-glow">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={"decimals" in stat ? stat.decimals : 0}
                      />
                    </p>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-foreground/40 uppercase tracking-[0.14em] leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="order-1 lg:order-2 flex flex-col items-center relative w-full max-w-full min-w-0"
            >
              <div className="w-full max-w-full flex justify-center">
                <Logo variant="hero" animated parallax={!isMobile} showScan={!isMobile} />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
                className="mt-5 sm:mt-10 w-full max-w-[11rem] sm:max-w-sm relative"
              >
                <div className="absolute inset-0 rounded-full bg-neon/5 blur-xl sm:blur-2xl pointer-events-none" />
                <AIOrb lite={isMobile} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, ease: EASE }}
                className="mt-4 sm:mt-8 flex flex-col items-center gap-1.5 sm:gap-2"
              >
                <p className="text-[10px] sm:text-xs font-mono text-neon/55 tracking-[0.22em] uppercase text-center">
                  Neural Engine Active
                </p>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-[9px] sm:text-[10px] font-mono text-neon/45">
                  <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon" />
                  </span>
                  Processing 12 chains
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: EASE }}
            className="mt-8 sm:mt-16 md:mt-20"
          >
            <LiveActivity />
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 mt-auto">
        <TickerTape />
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <div className="w-5 h-9 rounded-full border-2 border-neon/40 flex items-start justify-center p-1.5 shadow-[0_0_16px_rgba(0,255,136,0.18)]">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-neon shadow-[0_0_8px_rgba(0,255,136,0.7)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
