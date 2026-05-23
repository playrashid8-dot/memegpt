"use client";

import { motion } from "framer-motion";

export default function ScanLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ y: ["-5%", "105%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/35 to-transparent shadow-[0_0_16px_rgba(0,255,136,0.25)]"
      />
      <motion.div
        animate={{ y: ["-5%", "105%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 3 }}
        className="absolute left-0 right-0 h-24 bg-gradient-to-b from-neon/[0.03] via-neon/[0.015] to-transparent"
      />
      <motion.div
        animate={{ y: ["105%", "-5%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/18 to-transparent"
      />
    </div>
  );
}
