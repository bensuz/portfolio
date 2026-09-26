import Link from "next/link";
import { LighthouseBadges } from "@/components/site/lighthouse";
import ProjectMedia from "@/components/site/project-media";
import { ArrowRight, ArrowUpRight, GitHub } from "@/components/site/icons";
import { alsoDelivered, projects } from "@/lib/content";
import CardStack from "./card-stack";

export default function Work() {
    return (
        <section id="work" className="work" aria-labelledby="work-title">
            <header className="shell section-head" data-reveal>
                <p className="eyebrow mono">
                    <span>01</span> Selected work
                </p>
                <h2 id="work-title" className="section-title">
                    Shipped for <em>real businesses.</em>
                </h2>
                <p className="section-intro">
                    Production websites I built at Rix Digital, plus an
                    individual product. Each has a short case study on the
                    problem, the stack and how I built it.
                </p>
            </header>

            <div className="shell">
                <CardStack>
                    {projects.map((project, index) => (
                        <li
                            key={project.slug}
                            className="card"
                            style={
                                {
                                    "--i": index,
                                    "--tint": project.tint,
                                } as React.CSSProperties
                            }
                        >
                            <article
                                className="card-inner"
                                aria-labelledby={`card-${project.slug}`}
                            >
                                <div className="card-info">
                                    <p className="card-meta mono">
                                        <span>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span>{project.category}</span>
                                    </p>
                                    <h3
                                        id={`card-${project.slug}`}
                                        className="card-title"
                                    >
                                        <Link href={`/work/${project.slug}`}>
                                            {project.name}
                                        </Link>
                                    </h3>
                                    <p className="card-summary">
                                        {project.summary}
                                    </p>
                                    <ul className="card-points">
                                        {project.highlights.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                    <ul
                                        className="chips"
                                        aria-label="Technologies"
                                    >
                                        {project.tags.map((tag) => (
                                            <li key={tag}>{tag}</li>
                                        ))}
                                    </ul>
                                    {project.lighthouse && (
                                        <LighthouseBadges
                                            data={project.lighthouse}
                                        />
                                    )}
                                    <div className="card-links">
                                        <Link
                                            href={`/work/${project.slug}`}
                                            className="pill pill-light"
                                        >
                                            Case study <ArrowRight />
                                        </Link>
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-link"
                                        >
                                            Live site <ArrowUpRight />
                                            <span className="visually-hidden">
                                                {" "}
                                                for {project.name} (opens in a
                                                new tab)
                                            </span>
                                        </a>
                                        {project.repo && (
                                            <a
                                                href={project.repo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-link"
                                            >
                                                Code <GitHub />
                                                <span className="visually-hidden">
                                                    {" "}
                                                    for {project.name} (opens in
                                                    a new tab)
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <Link
                                    href={`/work/${project.slug}`}
                                    className={`card-media card-media-${project.layout}`}
                                    data-cursor="View case study"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                >
                                    <ProjectMedia
                                        project={project}
                                        sizes="(max-width: 899px) 110vw, (max-width: 1440px) 60vw, 864px"
                                    />
                                </Link>
                            </article>
                        </li>
                    ))}
                </CardStack>
            </div>

            <div className="shell">
                <div className="also" data-reveal>
                    <div className="also-copy">
                        <p className="eyebrow mono">Not everything is public</p>
                        <p className="also-text">
                            At Rix Digital I also build and maintain:
                        </p>
                    </div>
                    <ul className="chips chips-lg">
                        {alsoDelivered.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
