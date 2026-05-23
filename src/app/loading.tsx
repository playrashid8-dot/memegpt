"use client";

import { motion, AnimatePresence } from "@/lib/motion";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

const BOOT_SEQUENCE = [
  "INITIALIZING MEMEGPT AI...",
  "SCANNING MEME NETWORK...",
  "CONNECTING TO ALPHA TERMINAL...",
  "LOADING SIGNAL ENGINE...",
  "CALIBRATING NEURAL ENGINE...",
  "SYSTEM READY.",
];

export default function Loading() {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex((i) => (i < BOOT_SEQUENCE.length - 1 ? i + 1 : i));
    }, 480);
    return () => clearInterval(lineTimer);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let frame: number;

    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / duration) * 100);
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const glitchTimer = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 2400);
    return () => clearInterval(glitchTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-15 sm:opacity-20" />
      <div className="absolute inset-0 scan-overlay opacity-30 sm:opacity-60" />
      <div className="absolute inset-0 terminal-scan-line opacity-25 sm:opacity-40 hidden sm:block" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-6 sm:gap-8 px-6 max-w-md w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`relative ${glitch ? "animate-glitch" : ""}`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-5 sm:-inset-6 rounded-full border-2 border-neon/12 sm:border-neon/15 border-t-neon shadow-[0_0_16px_rgba(0,255,136,0.12)] sm:shadow-[0_0_24px_rgba(0,255,136,0.15)] gpu-layer"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-neon/20 sm:border-neon/25 gpu-layer hidden sm:block"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-6 sm:-inset-8 rounded-full bg-neon/8 blur-lg sm:blur-xl gpu-layer"
          />
          <Logo variant="loading" showScan={false} animated />
        </motion.div>

        <div className="w-full loading-terminal text-left space-y-1.5 min-h-[120px]">
          {BOOT_SEQUENCE.slice(0, lineIndex + 1).map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: i === lineIndex ? 1 : 0.45, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.15em] uppercase"
            >
              <span className="text-neon/40 shrink-0">&gt;</span>
              <span className={i === lineIndex ? "text-neon/90 ticker-glow" : "text-neon/40"}>
                {line}
              </span>
              {i === lineIndex && lineIndex < BOOT_SEQUENCE.length - 1 && (
                <span className="animate-blink inline-block w-1.5 h-3.5 bg-neon/70 ml-0.5" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="w-full space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-neon/40 tracking-wider">
            <span>BOOT SEQUENCE</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-1 rounded-full loading-bar-track overflow-hidden">
            <motion.div
              className="h-full rounded-full loading-bar-fill"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <AnimatePresence>
          {lineIndex >= BOOT_SEQUENCE.length - 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] font-mono text-neon/50 tracking-[0.3em] uppercase"
            >
              Launching interface...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
