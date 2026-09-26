"use client";

import { useEffect, useRef } from "react";

// Sticky cards that recede slightly as the next one slides over them.
export default function CardStack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const query = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!query.matches) {
        cards.forEach((card) => card.style.removeProperty("--cover"));
        return;
      }
      const vh = window.innerHeight;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        const top = card.getBoundingClientRect().top;
        const nextTop = next.getBoundingClientRect().top;
        const cover = Math.min(Math.max((vh - nextTop) / Math.max(vh - top, 1), 0), 1);
        card.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    query.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      query.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <ol ref={ref} className="cards">
      {children}
    </ol>
  );
}
