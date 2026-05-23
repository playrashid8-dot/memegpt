"use client";

import { motion } from "framer-motion";

const ORBIT_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  deg: i * 36,
  delay: i * 0.3,
  radius: 95 + (i % 3) * 12,
}));

const LITE_ORBIT = ORBIT_PARTICLES.filter((_, i) => i % 2 === 0);

const EASE = [0.22, 1, 0.36, 1] as const;

interface AIOrbProps {
  lite?: boolean;
}

export default function AIOrb({ lite = false }: AIOrbProps) {
  const particles = lite ? LITE_ORBIT : ORBIT_PARTICLES;
  const rings = lite ? [0, 2] : [0, 1, 2, 3];

  return (
    <div
      className={`relative mx-auto gpu-layer ${
        lite
          ? "w-36 h-36 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
          : "w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
      } ${lite ? "" : "animate-hologram"}`}
      aria-hidden="true"
    >
      {!lite && (
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="orb-distort">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}

      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -inset-4 sm:-inset-6 rounded-full bg-neon/10 gpu-layer ${
          lite ? "blur-[32px] sm:blur-[64px]" : "blur-[64px]"
        }`}
      />
      {!lite && (
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute -inset-3 rounded-full bg-cyan/8 blur-[48px] gpu-layer hidden sm:block"
        />
      )}

      {rings.map((ring) => (
        <motion.div
          key={ring}
          animate={{ scale: [1, 1 + ring * 0.04 + 0.03, 1], opacity: [0.45, 0.22, 0.45] }}
          transition={{ duration: 4 + ring * 0.5, repeat: Infinity, ease: "easeInOut", delay: ring * 0.35 }}
          className="absolute rounded-full border gpu-layer"
          style={{
            inset: `${ring * (lite ? 12 : 10)}px`,
            borderColor: `rgba(0, 255, 136, ${0.2 - ring * 0.04})`,
          }}
        />
      ))}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: lite ? 20 : 14, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full gpu-layer"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(0,255,136,0.35) 12%, transparent 28%, rgba(0,240,255,0.22) 48%, transparent 62%, rgba(168,85,247,0.14) 78%, transparent 100%)",
        }}
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: lite ? 32 : 26, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-dashed border-neon/22 gpu-layer"
      />
      {!lite && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-6 rounded-full border border-dotted border-neon/12 gpu-layer hidden sm:block"
        />
      )}

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 1.5, -1.5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute rounded-full overflow-hidden gpu-layer ${
          lite ? "inset-8 sm:inset-11" : "inset-10 sm:inset-11"
        }`}
        style={{
          filter: lite ? undefined : "url(#orb-distort)",
          background:
            "radial-gradient(circle at 35% 30%, rgba(0,255,136,0.45), rgba(0,200,100,0.18) 35%, rgba(0,80,50,0.3) 55%, rgba(0,0,0,0.88) 75%)",
          boxShadow: lite
            ? "inset 0 0 32px rgba(0,255,136,0.2), 0 0 40px rgba(0,255,136,0.12)"
            : "inset 0 0 48px rgba(0,255,136,0.28), 0 0 64px rgba(0,255,136,0.18), 0 0 96px rgba(0,240,255,0.08)",
        }}
      >
        <div
          className="absolute inset-0 opacity-30 sm:opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "10px 10px",
          }}
        />
        {!lite && (
          <motion.div
            animate={{ x: ["-120%", "220%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: EASE }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 hidden sm:block"
          />
        )}
      </motion.div>

      <motion.div
        animate={{ opacity: [0.8, 1, 0.8], scale: [0.97, 1.02, 0.97] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center gpu-layer"
      >
        <span className={`drop-shadow-[0_0_16px_rgba(0,255,136,0.55)] ${lite ? "text-2xl sm:text-4xl md:text-5xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
          🧠
        </span>
      </motion.div>

      {particles.map(({ deg, delay, radius }) => (
        <motion.div
          key={deg}
          className="absolute w-1.5 h-1.5 rounded-full gpu-layer"
          style={{ top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 18 + (deg % 60) / 10, repeat: Infinity, ease: "linear", delay }}
        >
          <motion.span
            className="absolute block w-1.5 h-1.5 rounded-full bg-neon/70 shadow-[0_0_6px_rgba(0,255,136,0.5)]"
            style={{ transform: `translateX(${lite ? radius * 0.75 : radius}px)` }}
            animate={{ opacity: [0.3, 0.75, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay }}
          />
        </motion.div>
      ))}

      {!lite && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-neon/20 gpu-layer hidden sm:block"
        />
      )}
    </div>
  );
}
