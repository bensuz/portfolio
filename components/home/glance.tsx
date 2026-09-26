import CareerLength from "@/components/site/career-length";
import CountUp from "@/components/site/count-up";
import { certifications, marquee } from "@/lib/content";

const certsThisYear = certifications.filter((c) => c.year === "2026").length;

export default function Glance() {
  return (
    <section id="glance" className="glance" aria-label="At a glance">
      <dl className="shell glance-grid">
        <div className="glance-item" data-reveal>
          <dt>Commercial full-stack experience, and counting</dt>
          <dd className="glance-value">
            <CareerLength />
          </dd>
        </div>
        <div className="glance-item" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <dt>Processing time cut by automation tools I built before becoming a developer</dt>
          <dd className="glance-value">
            <CountUp value={90} />
            <small>%</small>
          </dd>
        </div>
        <div className="glance-item" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
          <dt>Certifications completed in 2026, from Full Stack Open to Claude Code</dt>
          <dd className="glance-value">
            <CountUp value={certsThisYear} />
          </dd>
        </div>
        <div className="glance-item" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
          <dt>Company awards for technical expertise, management appreciation and customer relations</dt>
          <dd className="glance-value">
            <CountUp value={3} />
          </dd>
        </div>
      </dl>

      <div className="shell">
        <div className="marquee" aria-label="Technologies I work with">
          <ul className="marquee-track">
            {[...marquee, ...marquee].map((item, index) => (
              <li key={index} aria-hidden={index >= marquee.length ? true : undefined}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
