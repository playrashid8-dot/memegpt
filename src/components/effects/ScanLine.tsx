"use client";

import { motion } from "framer-motion";

export default function ScanLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ y: ["-5%", "105%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/25 sm:via-neon/35 to-transparent shadow-[0_0_8px_rgba(0,255,136,0.15)] sm:shadow-[0_0_16px_rgba(0,255,136,0.25)] gpu-layer"
      />
      <motion.div
        animate={{ y: ["-5%", "105%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 4 }}
        className="absolute left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-neon/[0.02] sm:from-neon/[0.03] via-neon/[0.01] to-transparent gpu-layer hidden sm:block"
      />
      <motion.div
        animate={{ y: ["105%", "-5%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 6 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/12 sm:via-cyan/18 to-transparent gpu-layer hidden md:block"
      />
    </div>
  );
}
