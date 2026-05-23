"use client";

import { TICKER_ITEMS } from "@/lib/mockData";
import { useMotionProfile } from "@/lib/useMedia";

export default function TickerTape() {
  const { isMobile } = useMotionProfile();
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className={`relative w-full overflow-hidden ticker-surface sm:bg-black/75 sm:backdrop-blur-lg group shadow-[0_0_32px_rgba(0,255,136,0.04)]`}
      aria-label="Live token ticker"
    >
      <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon/15 to-transparent" />

      <div
        className={`flex py-3 sm:py-3.5 group-hover:[animation-play-state:paused] whitespace-nowrap select-none touch-pan-y ${
          isMobile ? "animate-ticker-mobile" : "animate-ticker"
        }`}
      >
        {items.map((item, i) => (
          <span
            key={`${item.token}-${i}`}
            className="inline-flex items-center gap-2 sm:gap-2.5 mx-3 sm:mx-7 text-[11px] sm:text-sm font-mono shrink-0"
          >
            <span className="text-neon/40 ticker-glow text-[8px]">◆</span>
            <span className="text-neon font-bold ticker-glow tracking-wide">{item.token}</span>
            <span
              className={`font-semibold ticker-glow ${item.positive ? "text-neon-bright" : "text-red-400/90"}`}
            >
              {item.change}
            </span>
            <span className="text-foreground/15 hidden sm:inline mx-1">|</span>
            <span className="text-foreground/40 hidden sm:inline uppercase tracking-wider text-[10px]">
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
