"use client";

import { useCallback, useState } from "react";
import { motion } from "@/lib/motion";
import {
  BSCSCAN_TOKEN_URL,
  TOKEN,
  formatShortAddress,
} from "@/lib/token";

interface ContractAddressProps {
  variant?: "inline" | "card";
  className?: string;
}

export default function ContractAddress({
  variant = "card",
  className = "",
}: ContractAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(TOKEN.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const shortAddress = formatShortAddress();

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap items-center gap-2 min-w-0 ${className}`}>
        <code className="font-mono text-xs sm:text-sm text-neon/80 break-all">
          {shortAddress}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy contract address"
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 rounded-lg glass-card-ultra text-foreground/55 hover:text-neon hover:border-neon/35 transition-colors touch-manipulation"
        >
          {copied ? "✓" : "Copy"}
        </button>
        <a
          href={BSCSCAN_TOKEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-[44px] px-3 rounded-lg glass-card-ultra text-foreground/55 hover:text-neon hover:border-neon/35 transition-colors text-xs font-medium"
        >
          BscScan
        </a>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card-ultra rounded-2xl p-5 sm:p-6 md:p-8 border-neon/20 holographic-border corner-accent ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-neon/70 mb-1.5">
            Contract Address
          </p>
          <p className="text-sm text-foreground/45">
            Verified on BNB Smart Chain · {TOKEN.symbol}
          </p>
        </div>
        <span className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-neon/[0.08] border border-neon/25 text-[10px] font-mono uppercase tracking-wider text-neon/85">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon" />
          </span>
          Live
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative rounded-xl bg-black/40 border border-white/[0.06] px-4 py-3.5 sm:py-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/[0.04] via-transparent to-cyan/[0.03] pointer-events-none" />
          <code className="relative block font-mono text-sm sm:text-base md:text-lg text-neon/90 break-all sm:break-normal sm:truncate text-center sm:text-left">
            {TOKEN.address}
          </code>
          <p className="relative mt-2 sm:hidden font-mono text-xs text-foreground/35 text-center">
            {shortAddress}
          </p>
        </div>

        <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy contract address to clipboard"
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl glass-card-ultra text-sm font-semibold text-foreground/80 hover:text-neon hover:border-neon/40 transition-all duration-300 touch-manipulation active:scale-[0.98]"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {copied ? "Copied!" : "Copy Address"}
          </button>
          <a
            href={BSCSCAN_TOKEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl bg-neon/[0.1] border border-neon/35 text-sm font-semibold text-neon hover:bg-neon/[0.16] hover:border-neon/55 transition-all duration-300 touch-manipulation active:scale-[0.98]"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View on BscScan
          </a>
        </div>
      </div>
    </motion.div>
  );
}
