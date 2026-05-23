"use client";

import Image from "next/image";
import { motion } from "@/lib/motion";
import { useEffect, useState } from "react";
import { useMotionProfile } from "@/lib/useMedia";

const LOGO_SRC = "/logo.png";

const VARIANTS = {
  navbar: {
    width: 180,
    height: 36,
    className: "h-6 w-auto max-w-[min(36vw,120px)] sm:h-8 md:h-9 object-contain",
    sizes: "(max-width: 640px) 100px, 140px",
    priority: true,
  },
  hero: {
    width: 732,
    height: 676,
    className:
      "w-[min(52vw,200px)] sm:w-[min(58vw,360px)] md:w-[min(48vw,420px)] lg:w-[min(38vw,480px)] max-w-full h-auto object-contain",
    sizes: "(max-width: 640px) 52vw, (max-width: 768px) 58vw, (max-width: 1024px) 48vw, 480px",
    priority: true,
  },
  footer: {
    width: 160,
    height: 48,
    className: "h-9 sm:h-10 w-auto max-w-[160px] object-contain",
    sizes: "160px",
    priority: false,
  },
  loading: {
    width: 280,
    height: 250,
    className: "w-[min(52vw,200px)] sm:w-52 max-w-full h-auto object-contain",
    sizes: "(max-width: 640px) 52vw, 208px",
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
  const { isMobile, canParallax, canAnimate } = useMotionProfile();
  const enableParallax = parallax && canParallax;
  const enableAnimation = animated && canAnimate && !isMobile;

  useEffect(() => {
    if (!enableParallax) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enableParallax]);

  const glowClass =
    variant === "navbar"
      ? "logo-glow-navbar group-hover:logo-glow-navbar-hover transition-[filter] duration-500"
      : variant === "hero"
        ? isMobile
          ? "logo-glow-hero"
          : "logo-glow-hero sm:animate-logo-glow-pulse"
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

  if (!enableAnimation && !enableParallax && !showScan) {
    return image;
  }

  const content = (
    <>
      {variant === "hero" && enableAnimation && (
        <>
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-12%] rounded-full bg-neon/8 blur-2xl sm:blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute inset-[-8%] rounded-3xl holographic-border active pointer-events-none opacity-40 sm:opacity-60 hidden sm:block"
          />
        </>
      )}

      {showScan && (
        <div aria-hidden className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-neon/25 via-neon/5 to-transparent animate-logo-scan" />
        </div>
      )}

      <div className={`relative ${variant === "hero" && enableAnimation ? "sm:animate-hologram" : ""}`}>
        {image}
      </div>
    </>
  );

  if (enableParallax) {
    return (
      <motion.div
        className="relative inline-flex items-center justify-center max-w-full"
        style={{ x: offset.x, y: offset.y }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative inline-flex items-center justify-center max-w-full"
          animate={
            enableAnimation
              ? { y: [0, -10, -4, 0], rotate: [0, 0.4, -0.4, 0] }
              : undefined
          }
          transition={enableAnimation ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative inline-flex items-center justify-center max-w-full"
      animate={
        enableAnimation
          ? {
              y: [0, -10, -4, 0],
              rotate: [0, 0.4, -0.4, 0],
            }
          : undefined
      }
      transition={
        enableAnimation ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      {content}
    </motion.div>
  );
}
