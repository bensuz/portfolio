import type { Lighthouse as LighthouseData } from "@/lib/content";
import { ArrowUpRight } from "./icons";

const categories = [
  { key: "performance", label: "Performance", short: "Perf" },
  { key: "accessibility", label: "Accessibility", short: "A11y" },
  { key: "bestPractices", label: "Best Practices", short: "BP" },
  { key: "seo", label: "SEO", short: "SEO" },
] as const;

const summary = (data: LighthouseData) =>
  `Lighthouse scores: ${categories.map((c) => `${c.label} ${data[c.key]}`).join(", ")}`;

function Gauge({ score, size }: { score: number; size: number }) {
  const r = size / 2 - 3;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="gauge">
      <circle cx={size / 2} cy={size / 2} r={r} className="gauge-track" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className="gauge-value"
        strokeDasharray={circumference}
        style={{ "--offset": circumference * (1 - score / 100), "--full": circumference } as React.CSSProperties}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">
        {score}
      </text>
    </svg>
  );
}

// Compact row for project cards.
export function LighthouseBadges({ data }: { data: LighthouseData }) {
  return (
    <div className="lh-badges">
      <span className="mono lh-badges-label">Lighthouse</span>
      <ul aria-label={summary(data)}>
        {categories.map((c) => (
          <li key={c.key} title={`${c.label} ${data[c.key]}`}>
            <Gauge score={data[c.key]} size={34} />
            <span className="mono" aria-hidden="true">
              {c.short}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Full panel for case studies, with a link to verify the scores live.
export function LighthousePanel({ data, url }: { data: LighthouseData; url: string }) {
  const verify = `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`;
  return (
    <section className="lh-panel" data-reveal aria-labelledby="lh-title">
      <div className="lh-head">
        <p id="lh-title" className="eyebrow mono">
          Lighthouse scores
        </p>
        <a href={verify} target="_blank" rel="noopener noreferrer" className="text-link lh-verify">
          Run it yourself on PageSpeed Insights <ArrowUpRight />
        </a>
      </div>
      <ul className="lh-scores" aria-label={summary(data)}>
        {categories.map((c) => (
          <li key={c.key}>
            <Gauge score={data[c.key]} size={64} />
            <span aria-hidden="true">{c.label}</span>
          </li>
        ))}
      </ul>
      <p className="lh-note mono">
        Measured on the live site, {data.measured}. Live scores move as content and third-party
        scripts change.
      </p>
    </section>
  );
}
