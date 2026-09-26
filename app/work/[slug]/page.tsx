import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LighthousePanel } from "@/components/site/lighthouse";
import ProjectMedia from "@/components/site/project-media";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub } from "@/components/site/icons";
import { projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: project.overview,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — case study by Elif Bensu Zorlu`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images:
        project.layout === "desktop"
          ? [{ url: project.image, width: 1440, height: 1000, alt: `${project.name} website` }]
          : undefined,
    },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" className="case" style={{ "--tint": project.tint } as React.CSSProperties}>
      <section id="top" className="case-hero shell">
        <Link href="/#work" className="text-link case-back">
          <ArrowLeft /> All work
        </Link>
        <p className="eyebrow mono case-eyebrow">
          <span>{String(index + 1).padStart(2, "0")}</span> {project.category}
        </p>
        <h1 className="case-title">
          <span className="line">
            <span>{project.name}</span>
          </span>
        </h1>
        <div className="case-intro">
          <p className="case-headline">{project.headline}</p>
          <div className="case-intro-side">
            <p>{project.overview}</p>
            <div className="case-actions">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="pill pill-accent" data-magnetic>
                Visit live site <ArrowUpRight />
              </a>
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="pill pill-ghost" data-magnetic>
                  View code <GitHub />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className={`case-media case-media-${project.layout} shell`}>
        <ProjectMedia
          project={project}
          sizes="(max-width: 1440px) 94vw, 1328px"
          phoneSizes="(max-width: 900px) 40vw, 300px"
          priority
        />
      </div>

      <section className="case-body shell" aria-label="Project details">
        <aside className="case-facts" data-reveal>
          <dl>
            {project.context.map((item) => (
              <div key={item.label}>
                <dt className="mono">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
            <div>
              <dt className="mono">Stack &amp; tools</dt>
              <dd>
                <ul className="chips">
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>
        <div className="case-story">
          <div className="case-role" data-reveal>
            <p className="eyebrow mono">My role</p>
            <p>{project.contribution}</p>
          </div>
          {project.lighthouse && <LighthousePanel data={project.lighthouse} url={project.url} />}
          {project.sections.map((section, i) => (
            <article key={section.title} className="case-section" data-reveal>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            </article>
          ))}
          <p className="case-note mono">
            Screenshots show the live product at the time of capture. Production sites keep
            evolving.
          </p>
        </div>
      </section>

      <nav className="case-next shell" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="case-next-link">
          <span className="mono">Next project</span>
          <span className="case-next-name">
            {next.name}
            <ArrowRight />
          </span>
          <span className="case-next-summary">{next.summary}</span>
        </Link>
      </nav>
    </main>
  );
}
