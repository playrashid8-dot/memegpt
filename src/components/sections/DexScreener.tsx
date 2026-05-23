"use client";

import { motion } from "@/lib/motion";
import { TOKEN } from "@/lib/token";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ScanLine from "@/components/effects/ScanLine";
import { useMotionProfile } from "@/lib/useMedia";

const BAR_HEIGHTS = [40, 65, 45, 80, 55, 70];

export default function DexScreener() {
  const { isMobile, canAnimate } = useMotionProfile();

  return (
    <SectionWrapper id="chart" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Market Data"
          title="Live Chart"
          subtitle="Real-time price action and trading volume — powered by DexScreener."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative rounded-2xl overflow-hidden border-neon/20 holographic-border ${
            isMobile ? "glass-lite" : "glass-card-ultra"
          }`}
        >
          <div className="absolute inset-0 pointer-events-none">
            {!isMobile && <ScanLine />}
            {!isMobile && (
              <div
                className="absolute inset-0 animate-gradient-shift opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(0,240,255,0.04) 0%, transparent 45%)",
                }}
              />
            )}
            <div className="absolute inset-0 grid-bg opacity-15" />
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] min-h-[240px] sm:min-h-[320px] flex flex-col items-center justify-center p-6 sm:p-10 md:p-14">
            <div className="absolute inset-x-6 sm:inset-x-10 top-6 sm:top-8 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-display text-sm sm:text-base font-bold text-neon truncate">
                  {TOKEN.symbol}/BNB
                </span>
                <span className="hidden sm:inline text-[10px] font-mono text-foreground/30 uppercase tracking-wider">
                  PancakeSwap
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {BAR_HEIGHTS.map((h, i) =>
                  canAnimate && !isMobile ? (
                    <motion.div
                      key={i}
                      className="w-1 sm:w-1.5 rounded-full bg-neon/25"
                      animate={{ height: [`${h * 0.3}px`, `${h * 0.5}px`, `${h * 0.3}px`] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <div
                      key={i}
                      className="w-1 sm:w-1.5 rounded-full bg-neon/25"
                      style={{ height: `${h * 0.4}px` }}
                    />
                  )
                )}
              </div>
            </div>

            <svg
              className="absolute inset-x-0 bottom-0 w-full h-1/2 opacity-20 pointer-events-none"
              viewBox="0 0 400 120"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path
                d="M0,80 Q50,60 100,70 T200,50 T300,65 T400,30 L400,120 L0,120 Z"
                fill="url(#chartGrad)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              />
              <motion.path
                d="M0,80 Q50,60 100,70 T200,50 T300,65 T400,30"
                fill="none"
                stroke="rgba(0,255,136,0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,255,136,0.15)" />
                  <stop offset="100%" stopColor="rgba(0,255,136,0)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative z-10 text-center max-w-md mx-auto">
              {canAnimate && !isMobile ? (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-card-ultra border-neon/25 mb-5 sm:mb-6"
                >
                  <span className="text-2xl sm:text-3xl">📈</span>
                </motion.div>
              ) : (
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-lite border-neon/25 mb-5 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">📈</span>
                </div>
              )}

              <h3 className={`font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3 ${isMobile ? "gradient-text" : "gradient-text-shimmer"}`}>
                Live Trading Coming Soon
              </h3>
              <p className="text-sm sm:text-base text-foreground/45 mb-6 sm:mb-8 leading-relaxed">
                DexScreener chart embed launching shortly. Trade {TOKEN.symbol} on PancakeSwap now.
              </p>

              <Button href={TOKEN.pancakeswapUrl} external className="min-w-[200px] sm:btn-pulse-ring">
                <span>🥞</span> Buy on PancakeSwap
              </Button>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
