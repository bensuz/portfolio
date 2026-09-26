import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectMedia({
  project,
  sizes,
  phoneSizes = "(max-width: 900px) 42vw, 16vw",
  priority = false,
}: {
  project: Project;
  sizes: string;
  phoneSizes?: string;
  priority?: boolean;
}) {
  if (project.layout === "mobile") {
    return (
      <div className="phones">
        {project.screens.map((screen, index) => (
          <div className="phone" key={screen.src} style={{ "--i": index } as React.CSSProperties}>
            <Image
              src={screen.src}
              alt={screen.alt}
              width={780}
              height={1690}
              sizes={phoneSizes}
              priority={priority}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">{project.domain}</span>
      </div>
      <Image
        src={project.image}
        alt={`${project.name} homepage`}
        width={1440}
        height={1000}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
