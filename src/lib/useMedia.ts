"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouch;
}

/** Combined motion/performance profile for mobile + reduced-motion fallbacks. */
export function useMotionProfile() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  const lite = isMobile || reducedMotion;
  const canAnimate = !reducedMotion;
  const canHover = !isTouch && !isMobile;
  const canParallax = !isTouch && !isMobile && canAnimate;

  return { isMobile, reducedMotion, isTouch, lite, canAnimate, canHover, canParallax };
}
