"use client";

import GridBackground from "./GridBackground";
import NeonBlobs from "./NeonBlobs";
import ParticleBackground from "./ParticleBackground";
import { useMotionProfile } from "@/lib/useMedia";

export default function CinematicBackground() {
  const { lite, canAnimate } = useMotionProfile();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden fixed-viewport-layer"
      aria-hidden="true"
    >
      {lite ? (
        <>
          <div className="absolute inset-0 static-gradient-bg" />
          <div
            className="absolute bottom-0 inset-x-0 h-1/4"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
            }}
          />
        </>
      ) : (
        <>
          <GridBackground animated />
          <NeonBlobs />
          {canAnimate && <ParticleBackground density="low" />}

          <div className="absolute inset-0 noise-overlay opacity-20 sm:opacity-100" />
          <div className="absolute inset-0 scan-overlay opacity-30 sm:opacity-50" />

          <div
            className="absolute inset-0 animate-gradient-shift hero-gradient-overlay"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.08) 0%, transparent 50%), radial-gradient(ellipse at 18% 100%, rgba(0,240,255,0.04) 0%, transparent 38%)",
            }}
          />

          <div
            className="absolute top-1/4 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-neon/15 sm:via-neon/25 to-transparent opacity-40 sm:opacity-60 hidden sm:block"
            style={{ animation: "light-sweep 14s ease-in-out infinite" }}
          />

          <div
            className="absolute bottom-0 inset-x-0 h-1/4"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
            }}
          />
        </>
      )}
    </div>
  );
}
