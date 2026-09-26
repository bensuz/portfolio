import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";

export default function NotFound() {
  return (
    <main id="main" className="not-found shell">
      <p className="eyebrow mono">
        <span>404</span> A small detour
      </p>
      <h1 className="section-title">
        Nothing here. <em>Plenty elsewhere.</em>
      </h1>
      <p className="section-intro">This page doesn’t exist, but the work does.</p>
      <Link href="/#work" className="pill pill-accent">
        See selected work <ArrowRight />
      </Link>
    </main>
  );
}
