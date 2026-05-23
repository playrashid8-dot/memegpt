"use client";

import { motion } from "@/lib/motion";
import { ROADMAP } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const STATUS_STYLES = {
  complete: {
    dot: "bg-neon shadow-[0_0_20px_rgba(0,255,136,0.7)]",
    badge: "text-neon bg-neon/10 border-neon/35",
    label: "Complete",
  },
  active: {
    dot: "bg-neon-bright shadow-[0_0_25px_rgba(57,255,20,0.8)] animate-pulse",
    badge: "text-neon-bright bg-neon-bright/10 border-neon-bright/35",
    label: "In Progress",
  },
  upcoming: {
    dot: "bg-white/25",
    badge: "text-foreground/45 bg-white/5 border-white/10",
    label: "Upcoming",
  },
};

export default function Roadmap() {
  return (
    <SectionWrapper id="roadmap">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Roadmap"
          title="Mission Timeline"
          subtitle="From launch to global exchange listings — the MEMEGPT journey."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon/70 via-neon/25 to-transparent md:-translate-x-px shadow-[0_0_15px_rgba(0,255,136,0.35)]" />

          {ROADMAP.map((phase, i) => {
            const status = STATUS_STYLES[phase.status];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card-ultra rounded-xl p-5 md:p-6 inline-block w-full md:max-w-sm corner-accent holographic-border"
                  >
                    <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="text-xs font-mono text-neon/65 tracking-wider">{phase.phase}</span>
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${status.badge}`}>
                        {status.label}
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-foreground/55 leading-relaxed">
                      {phase.description}
                    </p>
                  </motion.div>
                </div>

                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                    className={`w-5 h-5 rounded-full border-2 border-black ${status.dot}`}
                  />
                </div>

                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
