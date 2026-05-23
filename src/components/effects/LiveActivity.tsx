"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { LIVE_ACTIVITY } from "@/lib/mockData";

export default function LiveActivity() {
  const [values, setValues] = useState<number[]>(() =>
    LIVE_ACTIVITY.map((item) => item.value)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const item = LIVE_ACTIVITY[i];
          const hasDecimals = "decimals" in item && item.decimals;
          const delta = item.live
            ? Math.floor(Math.random() * 4) + 1
            : (Math.random() - 0.4) * (hasDecimals ? 0.25 : 6);
          const next = v + delta;
          if (hasDecimals) {
            return Math.min(99.9, Math.max(85, Math.round(next * 10) / 10));
          }
          return Math.max(0, Math.floor(next));
        })
      );
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-5xl mx-auto">
      {LIVE_ACTIVITY.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02, y: -3 }}
          className="glass-card-ultra rounded-xl p-3 sm:p-4 md:p-5 text-center corner-accent holographic-border relative group"
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon/6 via-transparent to-cyan/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex items-center justify-center gap-1.5 mb-1.5 sm:mb-2">
              <span className="text-base sm:text-lg md:text-xl">{item.icon}</span>
              {item.live && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon shadow-[0_0_6px_rgba(0,255,136,0.6)]" />
                </span>
              )}
            </div>
            <p className="font-display text-lg sm:text-xl md:text-2xl font-bold text-neon mb-0.5 ticker-glow">
              <AnimatedCounter
                value={values[i]}
                suffix={item.suffix}
                decimals={"decimals" in item ? item.decimals : 0}
                duration={1.2}
                live
              />
            </p>
            <p className="text-[9px] sm:text-[10px] text-foreground/40 uppercase tracking-[0.1em] leading-tight">
              {item.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
