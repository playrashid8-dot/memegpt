"use client";

import { motion } from "framer-motion";

export default function NeonBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.08, 0.94, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[100px] bg-neon/8"
      />
      <motion.div
        animate={{
          x: [0, -40, 28, 0],
          y: [0, 28, -28, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-32 w-80 h-80 rounded-full blur-[90px] bg-neon-bright/7"
      />
      <motion.div
        animate={{
          x: [0, 20, -28, 0],
          y: [0, -20, 35, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-[80px] bg-neon-dim/8"
      />
      <motion.div
        animate={{
          x: [0, -16, 24, 0],
          y: [0, 16, -12, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[72px] bg-purple/5"
      />
    </div>
  );
}
