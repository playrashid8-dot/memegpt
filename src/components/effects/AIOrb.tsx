"use client";

import { motion } from "framer-motion";

const ORBIT_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  deg: i * 36,
  delay: i * 0.3,
  radius: 95 + (i % 3) * 12,
}));

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AIOrb() {
  return (
    <div
      className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto animate-hologram"
      aria-hidden="true"
    >
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="orb-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-6 rounded-full bg-neon/12 blur-[64px]"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -inset-3 rounded-full bg-cyan/8 blur-[48px]"
      />

      {[0, 1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          animate={{ scale: [1, 1 + ring * 0.04 + 0.03, 1], opacity: [0.5, 0.25, 0.5] }}
          transition={{ duration: 3.5 + ring * 0.5, repeat: Infinity, ease: "easeInOut", delay: ring * 0.35 }}
          className="absolute rounded-full border"
          style={{
            inset: `${ring * 10}px`,
            borderColor: `rgba(0, 255, 136, ${0.22 - ring * 0.04})`,
          }}
        />
      ))}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(0,255,136,0.4) 12%, transparent 28%, rgba(0,240,255,0.28) 48%, transparent 62%, rgba(168,85,247,0.18) 78%, transparent 100%)",
        }}
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-dashed border-neon/28"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6 rounded-full border border-dotted border-neon/12"
      />

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-10 sm:inset-11 rounded-full overflow-hidden"
        style={{
          filter: "url(#orb-distort)",
          background:
            "radial-gradient(circle at 35% 30%, rgba(0,255,136,0.5), rgba(0,200,100,0.2) 35%, rgba(0,80,50,0.35) 55%, rgba(0,0,0,0.88) 75%)",
          boxShadow:
            "inset 0 0 48px rgba(0,255,136,0.28), 0 0 64px rgba(0,255,136,0.18), 0 0 96px rgba(0,240,255,0.08)",
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "10px 10px",
          }}
        />
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: EASE }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.75, 1, 0.75], scale: [0.96, 1.03, 0.96] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_0_24px_rgba(0,255,136,0.7)]">🧠</span>
      </motion.div>

      {ORBIT_PARTICLES.map(({ deg, delay, radius }) => (
        <motion.div
          key={deg}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 16 + (deg % 60) / 10, repeat: Infinity, ease: "linear", delay }}
        >
          <motion.span
            className="absolute block w-1.5 h-1.5 rounded-full bg-neon/80 shadow-[0_0_8px_rgba(0,255,136,0.6)]"
            style={{ transform: `translateX(${radius}px)` }}
            animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.75, 1.2, 0.75] }}
            transition={{ duration: 2.5, repeat: Infinity, delay }}
          />
        </motion.div>
      ))}

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-neon/25"
      />
    </div>
  );
}
