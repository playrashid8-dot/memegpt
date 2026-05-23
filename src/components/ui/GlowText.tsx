"use client";

import { motion } from "@/lib/motion";
import { type ReactNode } from "react";

interface GlowTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  animate?: boolean;
}

export default function GlowText({
  children,
  as: Tag = "span",
  className = "",
  animate = true,
}: GlowTextProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Tag className={`gradient-text ${className}`}>{children}</Tag>
    </motion.div>
  );
}
