"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { TERMINAL_SIGNALS, TERMINAL_LOGS } from "@/lib/mockData";
import type { TerminalSignal } from "@/lib/mockData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const TYPE_COLORS: Record<TerminalSignal["type"], string> = {
  bullish: "text-neon",
  whale: "text-cyan-400",
  momentum: "text-yellow-400",
  social: "text-purple-400",
  warning: "text-red-400",
};

const TYPE_ICONS: Record<TerminalSignal["type"], string> = {
  bullish: "▲",
  whale: "🐋",
  momentum: "⚡",
  social: "📡",
  warning: "⚠",
};

function TypingLine({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        const delay = text[i - 1] === " " ? 40 : 18 + Math.random() * 22;
        timeout = setTimeout(typeNext, delay);
      } else {
        setDone(true);
        onComplete();
      }
    };

    timeout = setTimeout(typeNext, 120);
    return () => clearTimeout(timeout);
  }, [text, onComplete]);

  return (
    <div className="flex items-start gap-2 text-neon/75 text-[11px] sm:text-sm leading-relaxed">
      <span className="text-neon/40 shrink-0 mt-0.5">&gt;&gt;</span>
      <span className="ticker-glow break-words">
        {displayed}
        {!done && (
          <span className="animate-blink inline-block w-1.5 h-3.5 sm:h-4 bg-neon/75 shadow-[0_0_6px_rgba(0,255,136,0.5)] ml-0.5 align-middle" />
        )}
      </span>
    </div>
  );
}

const MATRIX_CHARS = "ｱｲｳｴｵ0123456789ABCDEF";

function MatrixRain() {
  const columns = 12;
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none" aria-hidden="true">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 text-neon font-mono text-[9px] leading-none whitespace-pre"
          style={{ left: `${(i / columns) * 100}%` }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            duration: 10 + (i % 4) * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.4,
          }}
        >
          {Array.from({ length: 18 }).map((_, j) => (
            <div key={j} className="opacity-50">
              {MATRIX_CHARS[(i * 7 + j * 3) % MATRIX_CHARS.length]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default function LiveTerminal() {
  const [visibleSignals, setVisibleSignals] = useState<TerminalSignal[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [logHistory, setLogHistory] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [confidence, setConfidence] = useState(94.1);
  const [calcValue, setCalcValue] = useState(0);
  const [tokensScanned, setTokensScanned] = useState(12847);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setScanProgress((p) => (p >= 100 ? 0 : p + Math.random() * 5));
      setConfidence((c) => Math.min(99.9, Math.max(90, c + (Math.random() - 0.48) * 1.2)));
      setCalcValue((v) => (v + Math.random() * 800) % 99999);
      setTokensScanned((t) => t + Math.floor(Math.random() * 3));
    }, 800);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (currentIndex >= TERMINAL_SIGNALS.length) {
      const reset = setTimeout(() => {
        setVisibleSignals([]);
        setCurrentIndex(0);
      }, 9000);
      return () => clearTimeout(reset);
    }

    const timer = setTimeout(() => {
      setVisibleSignals((prev) => [TERMINAL_SIGNALS[currentIndex], ...prev.slice(0, 10)]);
      setCurrentIndex((i) => i + 1);
    }, 950);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleLogComplete = useCallback(() => {
    setLogHistory((prev) => {
      const log = TERMINAL_LOGS[logIndex];
      return [log, ...prev.slice(0, 4)];
    });
    setTimeout(() => {
      setLogIndex((i) => (i + 1) % TERMINAL_LOGS.length);
    }, 600);
  }, [logIndex]);

  return (
    <SectionWrapper id="terminal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Live Feed"
          title="Signal Terminal"
          subtitle="Real-time AI alpha streaming from the MEMEGPT neural network. Bloomberg terminal meets degen culture."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden neon-border shadow-[0_0_60px_rgba(0,255,136,0.06)]"
        >
          <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-white/[0.04] border-b border-white/[0.06] backdrop-blur-lg">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/85 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/85 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-neon/85 shadow-[0_0_6px_rgba(0,255,136,0.5)]" />
            </div>
            <span className="text-[9px] sm:text-xs font-mono text-foreground/30 ml-1 truncate">
              memegpt@alpha-terminal ~ signals --live --degen
            </span>
            <div className="ml-auto flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="hidden sm:inline text-[10px] font-mono text-neon/45">
                conf: {confidence.toFixed(1)}%
              </span>
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex rounded-full h-full w-full bg-neon shadow-[0_0_6px_rgba(0,255,136,0.6)]" />
              </span>
              <span className="text-[9px] sm:text-xs font-mono text-neon/75 font-bold tracking-wider">LIVE</span>
            </div>
          </div>

          <div className="relative bg-black/92 p-3 sm:p-5 md:p-6 min-h-[420px] sm:min-h-[500px] terminal-text text-sm scan-overlay matrix-bg">
            <MatrixRain />
            <div className="absolute inset-0 terminal-scan-line opacity-25" />

            <div className="relative z-10">
              <div className="text-neon/65 mb-3 sm:mb-4 text-[10px] sm:text-sm break-all">
                <span className="text-neon ticker-glow">$</span> memegpt scan --live --chain=all --degen-mode
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="glass-card-ultra rounded-lg p-2.5 sm:p-3 border-neon/12 corner-accent">
                  <p className="text-[9px] sm:text-[10px] text-foreground/30 mb-1 uppercase tracking-wider">Scan Progress</p>
                  <div className="h-1.5 sm:h-2 rounded-full bg-white/[0.04] overflow-hidden mb-1 border border-white/[0.03]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon/40 via-neon to-neon-bright rounded-full"
                      animate={{ width: `${Math.min(scanProgress, 100)}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-neon font-mono font-bold">{Math.min(Math.floor(scanProgress), 100)}%</p>
                </div>
                <div className="glass-card-ultra rounded-lg p-2.5 sm:p-3 border-neon/12 corner-accent">
                  <p className="text-[9px] sm:text-[10px] text-foreground/30 mb-1 uppercase tracking-wider">AI Confidence</p>
                  <p className="text-lg sm:text-xl text-neon font-bold ticker-glow">{confidence.toFixed(1)}%</p>
                </div>
                <div className="glass-card-ultra rounded-lg p-2.5 sm:p-3 border-neon/12 corner-accent">
                  <p className="text-[9px] sm:text-[10px] text-foreground/30 mb-1 uppercase tracking-wider">Signal Pulse</p>
                  <div className="flex items-end gap-0.5 h-6 sm:h-7">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-neon/30 to-neon rounded-sm"
                        animate={{ height: [`${20 + (i % 3) * 15}%`, `${35 + (i % 4) * 12}%`] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="glass-card-ultra rounded-lg p-2.5 sm:p-3 border-neon/12 corner-accent col-span-2 sm:col-span-1">
                  <p className="text-[9px] sm:text-[10px] text-foreground/30 mb-1 uppercase tracking-wider">Tokens Scanned</p>
                  <p className="text-xs sm:text-sm text-cyan/65 font-mono truncate">
                    {tokensScanned.toLocaleString()} · 0x{Math.floor(calcValue).toString(16).padStart(6, "0")}
                  </p>
                </div>
              </div>

              <div className="text-foreground/28 mb-3 sm:mb-4 text-[9px] sm:text-xs leading-relaxed border-l-2 border-neon/20 pl-2.5 sm:pl-3">
                [INIT] MEMEGPT Neural Engine v3.2.0 — Connected to 12 chains
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                [INIT] Whale tracker: ACTIVE | Degen mode: ON
              </div>

              <div className="mb-3 space-y-1 min-h-[52px] sm:min-h-[60px]">
                {logHistory.map((log, i) => (
                  <div key={`${log}-${i}`} className="flex items-start gap-2 text-neon/35 text-[10px] sm:text-xs">
                    <span className="text-neon/20 shrink-0">&gt;&gt;</span>
                    <span className="break-words">{log}</span>
                  </div>
                ))}
                <TypingLine key={logIndex} text={TERMINAL_LOGS[logIndex]} onComplete={handleLogComplete} />
              </div>

              <div className="space-y-0 max-h-[200px] sm:max-h-[220px] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {visibleSignals.map((signal) => (
                    <motion.div
                      key={`${signal.id}-${signal.timestamp}`}
                      initial={{ opacity: 0, x: -24, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 py-1.5 sm:py-2 border-b border-white/[0.03] hover:bg-neon/[0.02] px-1.5 sm:px-2 -mx-1.5 sm:-mx-2 rounded transition-colors"
                    >
                      <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-40" />
                        <span className="relative inline-flex rounded-full h-full w-full bg-neon/80" />
                      </span>
                      <span className="text-foreground/22 text-[9px] sm:text-xs font-mono">[{signal.timestamp}]</span>
                      <span className={`font-bold text-[11px] sm:text-sm ${TYPE_COLORS[signal.type]}`}>
                        {TYPE_ICONS[signal.type]} {signal.token}
                      </span>
                      <span className={`text-[10px] sm:text-sm ${TYPE_COLORS[signal.type]} break-words`}>
                        {signal.signal}
                      </span>
                      <span className="text-foreground/22 text-[9px] sm:text-xs ml-auto font-mono shrink-0">
                        {signal.confidence}%
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-4 sm:mt-5 flex items-center text-neon/60">
                <span className="text-neon mr-1 ticker-glow text-xs">$</span>
                <span className="text-foreground/30 text-[10px] sm:text-xs mr-1.5">awaiting signal</span>
                <span className="animate-blink inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-neon/80 shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
