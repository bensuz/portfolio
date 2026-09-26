"use client";

import { useEffect, useRef, useState } from "react";

export default function SceneCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Load three.js after the page is interactive so it never delays first paint.
    const hasIdle = "requestIdleCallback" in window;
    const start = async () => {
      try {
        const { createParticleField } = await import("./particle-field");
        if (cancelled || !canvas.current) return;
        dispose = createParticleField(canvas.current, reducedMotion);
        setReady(true);
      } catch {
        // No WebGL: the CSS glow behind the canvas stays as the fallback.
      }
    };
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      dispose?.();
    };
  }, []);

  return (
    <div className={`scene ${ready ? "is-ready" : ""}`} aria-hidden="true">
      <div className="scene-fallback" />
      <canvas ref={canvas} className="scene-canvas" />
    </div>
  );
}
