"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// A small label that follows the pointer over [data-cursor] elements.
export default function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    const tick = () => {
      x += (tx - x) * (reduced ? 1 : 0.2);
      y += (ty - y) * (reduced ? 1 : 0.2);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        el.textContent = target.dataset.cursor ?? "";
        el.classList.add("is-visible");
      } else {
        el.classList.remove("is-visible");
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
      el.classList.remove("is-visible");
    };
  }, [pathname]);

  return <div ref={ref} className="cursor-label" aria-hidden="true" />;
}
