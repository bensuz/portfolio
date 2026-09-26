import { ImageResponse } from "next/og";

export const alt = "Elif Bensu Zorlu — Full-stack developer. Reliable web products, built end to end.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A flat take on the hero's exploded web page: browser, skeleton content, cards and </>.
const LILAC = "#e9e3ff";
const VIOLET = "#a390ff";
const WARM = "#ffb38a";
const bars = [
  { x: 752, y: 104, w: 170, h: 12, fill: LILAC },
  { x: 752, y: 124, w: 118, h: 12, fill: LILAC },
  { x: 752, y: 148, w: 150, h: 4, fill: VIOLET },
  { x: 752, y: 158, w: 136, h: 4, fill: VIOLET },
  { x: 752, y: 168, w: 96, h: 4, fill: VIOLET },
];
const cards = [746, 869, 992];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#09090b",
          color: "#edeae3",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 560,
            top: -180,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(108,82,255,0.45), rgba(9,9,11,0) 65%)",
          }}
        />
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <rect x="730" y="40" width="400" height="250" rx="14" fill="rgba(19,19,22,0.7)" stroke={VIOLET} strokeWidth="3" />
          <line x1="730" y1="74" x2="1130" y2="74" stroke={VIOLET} strokeWidth="2" />
          <circle cx="750" cy="57" r="5" fill={WARM} />
          <circle cx="766" cy="57" r="5" fill={LILAC} />
          <circle cx="782" cy="57" r="5" fill={LILAC} />
          <rect x="830" y="49" width="190" height="16" rx="8" fill="none" stroke={VIOLET} strokeWidth="2" />
          {bars.map((bar, i) => (
            <rect key={i} x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx="3" fill={bar.fill} opacity={0.9} />
          ))}
          <rect x="752" y="184" width="64" height="20" rx="10" fill="none" stroke={WARM} strokeWidth="2.5" />
          {cards.map((x) => (
            <rect key={x} x={x} y="218" width="115" height="54" rx="8" fill="none" stroke={VIOLET} strokeWidth="2" />
          ))}
          <path d="M1002 104 L978 138 L1002 172" fill="none" stroke={LILAC} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1056 100 L1032 176" fill="none" stroke={WARM} strokeWidth="7" strokeLinecap="round" />
          <path d="M1086 104 L1110 138 L1086 172" fill="none" stroke={LILAC} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a09d96" }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#52e3a0" }} />
          FULL-STACK DEVELOPER · UK
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            Elif Bensu Zorlu
          </div>
          <div style={{ fontSize: 44, marginTop: 22, color: "#a390ff", letterSpacing: -1 }}>
            Reliable web products, built end to end.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a09d96", gap: 28 }}>
          <span>TypeScript</span>
          <span>React</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>PostgreSQL</span>
          <span>Playwright</span>
        </div>
      </div>
    ),
    size,
  );
}
