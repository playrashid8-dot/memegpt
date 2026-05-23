"use client";

import { motion, useMotionValue, useSpring, useTransform } from "@/lib/motion";
import { type ReactNode, useRef } from "react";
import { useMotionProfile } from "@/lib/useMedia";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  tilt?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
  tilt = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { canHover, isMobile } = useMotionProfile();
  const enableTilt = tilt && canHover;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 26 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 26 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!enableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover && canHover
          ? {
              y: -4,
              boxShadow: "0 16px 48px rgba(0,255,136,0.08), 0 0 32px rgba(0,255,136,0.05)",
            }
          : undefined
      }
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={enableTilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={`${isMobile ? "glass-lite" : "glass-card-ultra"} rounded-xl p-5 sm:p-6 transition-colors duration-300 holographic-border corner-accent relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon/[0.06] via-transparent to-cyan/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {!isMobile && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-neon/8 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
