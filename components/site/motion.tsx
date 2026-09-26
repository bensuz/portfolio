"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Page-wide progressive enhancements. Content stays visible without JavaScript;
// these only add motion when the browser and the visitor's settings allow it.
export default function Motion() {
  const pathname = usePathname();

  // Reveal [data-reveal] elements as they enter the viewport.
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Magnetic pull on [data-magnetic] buttons, for precise pointers only.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const move = (event: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (event.clientX - (r.left + r.width / 2)) * 0.28;
        const y = (event.clientY - (r.top + r.height / 2)) * 0.35;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
