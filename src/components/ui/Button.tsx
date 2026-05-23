"use client";

import { motion } from "@/lib/motion";
import { type ReactNode } from "react";
import { useMotionProfile } from "@/lib/useMedia";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-neon/18 via-neon/10 to-neon/18 text-neon border border-neon/45 hover:border-neon/70 shadow-[0_0_24px_rgba(0,255,136,0.18),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,255,136,0.32),inset_0_1px_0_rgba(255,255,255,0.14)]",
  secondary:
    "bg-white/[0.04] text-foreground/90 border border-white/10 hover:bg-white/[0.08] hover:border-neon/35 hover:text-neon shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,255,136,0.08)]",
  ghost:
    "bg-transparent text-neon/75 border border-transparent hover:border-neon/30 hover:text-neon hover:bg-neon/6",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const { canHover, canAnimate, isMobile } = useMotionProfile();

  const baseClasses = `relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm tracking-wide transition-colors duration-300 cursor-pointer overflow-hidden touch-manipulation min-h-[44px] ${variants[variant]} ${className}`;

  const motionProps = canHover
    ? {
        whileHover: { scale: 1.03, y: -2 },
        whileTap: { scale: 0.97 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {
        whileTap: { scale: 0.98 },
        transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] as const },
      };

  const inner = (
    <>
      {variant === "primary" && canAnimate && !isMobile && (
        <>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-neon/12 to-transparent -skew-x-12"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="absolute inset-0 rounded-xl btn-pulse-ring pointer-events-none opacity-30" />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`group ${baseClasses}`}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={`group ${baseClasses}`} {...motionProps}>
      {inner}
    </motion.button>
  );
}
