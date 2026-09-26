import { profile } from "@/lib/content";
import { ArrowUpRight } from "./icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <p className="footer-sign">
          Designed and built by {profile.shortName} with Next.js, TypeScript and Three.js.
        </p>
        <ul className="footer-links">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight />
            </a>
          </li>
          <li>
            <a href="https://github.com/bensuz/portfolio" target="_blank" rel="noopener noreferrer">
              Source <ArrowUpRight />
            </a>
          </li>
        </ul>
        <p className="footer-meta mono">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>
            Based in the {profile.location}
          </span>
          <a href="#top">Back to top ↑</a>
        </p>
      </div>
    </footer>
  );
}
