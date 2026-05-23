"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 sm:mb-16 md:mb-20 max-w-4xl ${alignClass}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neon/85 border border-neon/22 rounded-full bg-neon/[0.06] shadow-[0_0_20px_rgba(0,255,136,0.06)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse shadow-[0_0_5px_rgba(0,255,136,0.6)]" />
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(2rem,6vw,4.5rem)] font-black tracking-tight mb-4 sm:mb-5 leading-[1.05]"
      >
        <span className="gradient-text-shimmer">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-foreground/50 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
