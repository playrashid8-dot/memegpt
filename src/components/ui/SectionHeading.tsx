"use client";

import { motion } from "@/lib/motion";
import { useMotionProfile } from "@/lib/useMedia";

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
  const { isMobile } = useMotionProfile();
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleClass = isMobile ? "gradient-text" : "gradient-text-shimmer";

  return (
    <div className={`mb-12 sm:mb-16 md:mb-20 max-w-4xl ${alignClass}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neon/85 border border-neon/22 rounded-full bg-neon/[0.06] shadow-[0_0_20px_rgba(0,255,136,0.06)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse shadow-[0_0_5px_rgba(0,255,136,0.6)] motion-reduce:animate-none" />
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(2rem,6vw,4.5rem)] font-black tracking-tight mb-4 sm:mb-5 leading-[1.05]"
      >
        <span className={titleClass}>{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-foreground/50 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
