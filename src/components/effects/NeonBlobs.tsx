"use client";

import { motion } from "framer-motion";

export default function NeonBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.06, 0.96, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[56px] sm:blur-[100px] bg-neon/6 sm:bg-neon/8 gpu-layer"
      />
      <motion.div
        animate={{
          x: [0, -40, 28, 0],
          y: [0, 28, -28, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-32 w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-[48px] sm:blur-[90px] bg-neon-bright/5 sm:bg-neon-bright/7 gpu-layer"
      />
      <motion.div
        animate={{
          x: [0, 20, -28, 0],
          y: [0, -20, 35, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-52 sm:w-72 h-52 sm:h-72 rounded-full blur-[44px] sm:blur-[80px] bg-neon-dim/6 sm:bg-neon-dim/8 gpu-layer"
      />
      <motion.div
        animate={{
          x: [0, -16, 24, 0],
          y: [0, 16, -12, 0],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-56 h-40 sm:h-56 rounded-full blur-[40px] sm:blur-[72px] bg-purple/4 sm:bg-purple/5 gpu-layer hidden sm:block"
      />
    </div>
  );
}
