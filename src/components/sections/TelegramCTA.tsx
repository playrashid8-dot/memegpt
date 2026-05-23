"use client";

import { motion } from "@/lib/motion";
import { SITE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScanLine from "@/components/effects/ScanLine";
import ParticleBackground from "@/components/effects/ParticleBackground";
import { useMotionProfile } from "@/lib/useMedia";

export default function TelegramCTA() {
  const { isMobile, canAnimate } = useMotionProfile();

  return (
    <section className="relative py-20 sm:py-28 md:py-32 overflow-hidden section-glow">
      <div className="absolute inset-0 pointer-events-none">
        {!isMobile && canAnimate && <ParticleBackground density="low" />}
        {!isMobile && (
          <div
            className="absolute inset-0 animate-gradient-shift"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.07) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(0,240,255,0.04) 0%, transparent 40%)",
            }}
          />
        )}
        {!isMobile && <ScanLine />}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden sm:light-sweep"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon/12 via-transparent to-cyan/6" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          {!isMobile && <div className="absolute inset-0 noise-overlay opacity-60" />}

          <div className={`relative rounded-2xl p-6 sm:p-10 md:p-16 lg:p-20 text-center border-neon/22 corner-accent holographic-border ${isMobile ? "glass-lite" : "glass-card-ultra"}`}>
            {canAnimate && !isMobile ? (
              <motion.div
                animate={{ scale: [1, 1.06, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 drop-shadow-[0_0_32px_rgba(0,255,136,0.35)]"
              >
                📡
              </motion.div>
            ) : (
              <div className="text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 drop-shadow-[0_0_24px_rgba(0,255,136,0.25)]">
                📡
              </div>
            )}

            <h2 className={`font-display text-[clamp(1.75rem,5vw,4rem)] font-black mb-4 sm:mb-5 leading-tight ${isMobile ? "gradient-text" : "gradient-text-shimmer"}`}>
              Join the MEMEGPT Alpha Army
            </h2>

            <p className="text-foreground/50 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
              Get exclusive alpha signals, whale alerts, and early access to the
              AI scanner. The degen inner circle awaits.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Button href={SITE.links.telegram} external className="w-full sm:w-auto min-w-[220px] sm:btn-pulse-ring">
                Join Telegram
              </Button>
              <Button href={SITE.links.twitter} variant="secondary" external className="w-full sm:w-auto min-w-[220px]">
                Follow X
              </Button>
            </div>

            <p className="text-[10px] sm:text-xs font-mono text-foreground/30">
              <AnimatedCounter value={12847} suffix="+" className="text-neon/60" /> degens already inside · Free to join
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
