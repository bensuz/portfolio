"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let instance: Lenis | null = null;

export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
}

export function scrollToY(top: number) {
  if (instance) instance.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    instance = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: { offset: -24 },
    });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);
  return null;
}
