"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOGO_SRC = "/logo.png";

const VARIANTS = {
  navbar: {
    width: 140,
    height: 40,
    className: "h-8 w-auto sm:h-9 md:h-10",
    sizes: "(max-width: 640px) 120px, 140px",
    priority: true,
  },
  hero: {
    width: 520,
    height: 520,
    className: "w-[min(88vw,420px)] sm:w-[min(75vw,480px)] lg:w-[min(42vw,520px)] h-auto",
    sizes: "(max-width: 640px) 88vw, (max-width: 1024px) 75vw, 520px",
    priority: true,
  },
  footer: {
    width: 160,
    height: 48,
    className: "h-10 sm:h-11 w-auto",
    sizes: "160px",
    priority: false,
  },
  loading: {
    width: 200,
    height: 200,
    className: "w-36 h-auto sm:w-44",
    sizes: "176px",
    priority: true,
  },
} as const;

type LogoVariant = keyof typeof VARIANTS;

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  animated?: boolean;
  showScan?: boolean;
  parallax?: boolean;
}

export default function Logo({
  variant = "navbar",
  className = "",
  animated = false,
  showScan = false,
  parallax = false,
}: LogoProps) {
  const config = VARIANTS[variant];
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!parallax) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [parallax]);

  const glowClass =
    variant === "navbar"
      ? "logo-glow-navbar group-hover:logo-glow-navbar-hover transition-[filter] duration-500"
      : variant === "hero"
        ? "logo-glow-hero animate-logo-glow-pulse"
        : variant === "footer"
          ? "logo-glow-footer"
          : "logo-glow-loading animate-logo-glow-pulse";

  const image = (
    <Image
      src={LOGO_SRC}
      alt="MEMEGPT — AI-powered meme coin intelligence"
      width={config.width}
      height={config.height}
      sizes={config.sizes}
      priority={config.priority}
      className={`${config.className} ${glowClass} object-contain select-none ${className}`}
      draggable={false}
    />
  );

  if (!animated && !parallax && !showScan) {
    return image;
  }

  const content = (
    <>
      {variant === "hero" && (
        <>
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-15%] rounded-full bg-neon/10 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute inset-[-8%] rounded-3xl holographic-border active pointer-events-none opacity-60"
          />
        </>
      )}

      {showScan && (
        <div aria-hidden className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-neon/25 via-neon/5 to-transparent animate-logo-scan" />
        </div>
      )}

      <div className={`relative ${variant === "hero" ? "animate-hologram" : ""}`}>{image}</div>
    </>
  );

  if (parallax) {
    return (
      <motion.div
        className="relative inline-flex items-center justify-center"
        style={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <motion.div
          className="relative inline-flex items-center justify-center"
          animate={
            animated
              ? { y: [0, -14, -6, 0], rotate: [0, 0.6, -0.6, 0] }
              : undefined
          }
          transition={animated ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      animate={
        animated
          ? {
              y: [0, -14, -6, 0],
              rotate: [0, 0.6, -0.6, 0],
            }
          : undefined
      }
      transition={
        animated ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      {content}
    </motion.div>
  );
}
