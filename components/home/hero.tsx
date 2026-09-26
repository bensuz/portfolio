import { profile } from "@/lib/content";
import { ArrowDown, Download } from "@/components/site/icons";

const lines = ["Reliable", "web products,", "built end to end."];

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-inner">
        <div className="hero-top mono">
          {profile.availability ? (
            <p className="status">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </p>
          ) : (
            <span />
          )}
          <p className="hero-where">
            {profile.role} — {profile.location}
          </p>
        </div>

        <h1 id="hero-title" className="hero-title">
          <span className="hero-kicker">
            <span className="hero-kicker-inner">
              {profile.name}, {profile.role.toLowerCase()}.
            </span>
          </span>
          {lines.map((line, index) => (
            <span className="line" key={line}>
              <span style={{ "--i": index } as React.CSSProperties}>
                {index === 2 ? (
                  <>
                    built <em>end to end.</em>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-bottom">
          <p className="hero-lede">
            I turn business needs into accessible, high-performing web products, from requirements
            and design through testing, deployment and the improvements that follow.
          </p>
          <div className="hero-actions">
            <a href="#work" className="pill pill-accent" data-magnetic>
              See selected work
              <ArrowDown />
            </a>
            <a href={profile.cv} className="pill pill-ghost" download data-magnetic>
              Download CV
              <Download />
            </a>
          </div>
          <p className="hero-now mono">
            <span>Currently</span>
            Full Stack Developer at Rix Digital
          </p>
        </div>
      </div>
    </section>
  );
}
