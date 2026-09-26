import { Download } from "@/components/site/icons";
import { certifications, experience, profile } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="experience paper" data-solid aria-labelledby="experience-title">
      <div className="shell experience-grid">
        <header className="experience-head" data-reveal>
          <p className="eyebrow mono">
            <span>03</span> Experience
          </p>
          <h2 id="experience-title" className="section-title">
            From contracts <em>to code.</em>
          </h2>
          <p className="section-intro">
            A business degree and four years in aerospace contracts, then a deliberate move into
            engineering. Now nearly three years shipping production software.
          </p>
          <a href={profile.cv} className="pill pill-dark" download data-magnetic>
            Download full CV <Download />
          </a>
        </header>

        <ol className="timeline">
          {experience.map((item) => (
            <li key={item.role} className="timeline-item" data-reveal>
              <div className="timeline-when mono">
                {item.period}
                {item.current && <span className="now-tag">Now</span>}
              </div>
              <div className="timeline-what">
                <h3>{item.role}</h3>
                <p className="timeline-org">
                  {item.org} <span>· {item.detail}</span>
                </p>
                {item.points.length > 0 && (
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="shell certs" data-reveal>
        <div className="certs-head">
          <h3>Certifications &amp; training</h3>
          <p className="mono">Always learning — {certifications.length} and counting</p>
        </div>
        <ul className="certs-grid">
          {certifications.map((cert) => (
            <li key={cert.name}>
              <span className="mono">{cert.year}</span>
              <strong>{cert.name}</strong>
              <span>{cert.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
