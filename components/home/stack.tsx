"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToY } from "@/components/site/smooth-scroll";
import { stackLayers } from "@/lib/content";

const count = stackLayers.length;

export default function Stack() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const query = window.matchMedia("(min-width: 900px) and (min-height: 640px)");
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    // Desktop: the section is pinned and scroll progress picks the active layer.
    const update = () => {
      frame = 0;
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-el.getBoundingClientRect().top / total, 0), 0.9999);
      el.style.setProperty("--progress", progress.toFixed(4));
      setActive(Math.floor(progress * count));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Mobile: layers are a plain list; whichever sits mid-screen is active.
    const observeLayers = () => {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
          }),
        { rootMargin: "-40% 0px -55% 0px" },
      );
      el.querySelectorAll("[data-index]").forEach((item) => observer?.observe(item));
    };

    const setup = () => {
      window.removeEventListener("scroll", schedule);
      observer?.disconnect();
      setPinned(query.matches);
      if (query.matches) {
        window.addEventListener("scroll", schedule, { passive: true });
        update();
      } else {
        observeLayers();
      }
    };

    setup();
    query.addEventListener("change", setup);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      query.removeEventListener("change", setup);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  function goTo(index: number) {
    const el = section.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + ((index + 0.5) / count) * total);
  }

  return (
    <section
      id="stack"
      ref={section}
      className={`stack${pinned ? " is-pinned" : ""}`}
      data-active={active}
      aria-labelledby="stack-title"
    >
      <div className="stack-sticky">
        <div className="shell stack-grid">
          <div className="stack-copy">
            <p className="eyebrow mono">
              <span>02</span> Capabilities
            </p>
            <h2 id="stack-title" className="section-title">
              The full stack, <em>layer by layer.</em>
            </h2>
            <ol className="layers">
              {stackLayers.map((layer, index) => {
                const open = !pinned || active === index;
                return (
                  <li
                    key={layer.id}
                    data-index={index}
                    className={`layer${active === index ? " is-active" : ""}${open ? " is-open" : ""}`}
                  >
                    {pinned ? (
                      <button
                        type="button"
                        className="layer-head"
                        aria-expanded={open}
                        aria-controls={`layer-${layer.id}`}
                        onClick={() => goTo(index)}
                      >
                        <span className="layer-num mono">0{index + 1}</span>
                        <span className="layer-title">{layer.title}</span>
                        <span className="layer-kicker mono">{layer.kicker}</span>
                      </button>
                    ) : (
                      <h3 className="layer-head">
                        <span className="layer-num mono">0{index + 1}</span>
                        <span className="layer-title">{layer.title}</span>
                        <span className="layer-kicker mono">{layer.kicker}</span>
                      </h3>
                    )}
                    <div className="layer-body" id={`layer-${layer.id}`}>
                      <div>
                        <p>{layer.text}</p>
                        <ul className="chips" aria-label={`${layer.title} tools`}>
                          {layer.tools.map((tool) => (
                            <li key={tool}>{tool}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="stack-legend mono" aria-hidden="true">
            <span className="stack-count">
              <b>0{active + 1}</b> / 0{count}
            </span>
            <span className="stack-bar">
              <span />
            </span>
            <span>{stackLayers[active].title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
