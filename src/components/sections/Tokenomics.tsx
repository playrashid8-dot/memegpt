"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { TOKENOMICS } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Tokenomics() {
  const total = TOKENOMICS.reduce((sum, item) => sum + item.value, 0);

  return (
    <SectionWrapper id="tokenomics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tokenomics"
          title="Supply Distribution"
          subtitle="Fair launch. No team allocation. Community-first tokenomics."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.65 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-neon/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-neon/10"
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-6 rounded-full bg-neon/12 blur-3xl"
            />

            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 relative z-10">
              {TOKENOMICS.reduce<{ elements: ReactNode[]; offset: number }>(
                (acc, item, i) => {
                  const pct = item.value / total;
                  const circumference = 2 * Math.PI * 80;
                  const dashLength = pct * circumference;
                  const dashOffset = -acc.offset * circumference;

                  acc.elements.push(
                    <motion.circle
                      key={item.label}
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="22"
                      strokeLinecap="round"
                      strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                      strokeDashoffset={dashOffset}
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      whileInView={{
                        strokeDasharray: `${dashLength} ${circumference - dashLength}`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      style={{ filter: `drop-shadow(0 0 12px ${item.color}90)` }}
                    />
                  );

                  acc.offset += pct;
                  return acc;
                },
                { elements: [], offset: 0 }
              ).elements}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <span className="font-display text-5xl md:text-6xl font-black gradient-text-shimmer">
                1B
              </span>
              <span className="text-xs text-foreground/45 uppercase tracking-[0.25em] mt-2">
                Total Supply
              </span>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-5">
            {TOKENOMICS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass-card-ultra rounded-xl p-4 sm:p-5 corner-accent holographic-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}` }}
                    />
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <span
                    className="font-display text-xl sm:text-2xl font-bold ticker-glow"
                    style={{ color: item.color }}
                  >
                    {item.value}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-white/[0.04] overflow-hidden border border-white/[0.04]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}70` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
