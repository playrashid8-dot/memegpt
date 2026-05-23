"use client";

import { motion, useInView } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  live?: boolean;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 2,
  className = "",
  live = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: !live });
  const [display, setDisplay] = useState(live ? value : 0);
  const prevValue = useRef(value);

  useEffect(() => {
    if (!isInView && !live) return;

    const startVal = live ? prevValue.current : 0;
    const endVal = value;
    prevValue.current = value;

    const startTime = performance.now();
    const ms = live ? 800 : duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ms, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(startVal + (endVal - startVal) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration, live]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString();

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: live ? 1 : 0 }}
      animate={isInView || live ? { opacity: 1 } : {}}
    >
      {formatted}
      {suffix}
    </motion.span>
  );
}
