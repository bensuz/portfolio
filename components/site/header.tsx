"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { ArrowUpRight } from "./icons";
import { setScrollLocked } from "./smooth-scroll";

const navigation = [
  { label: "Work", id: "work" },
  { label: "Stack", id: "stack" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
];

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [observed, setObserved] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onPaper, setOnPaper] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const active = onHome ? observed : "work";

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    setScrollLocked(open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Tuck the header away while reading down the page; bring it back on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Switch to the light bar while a light "paper" section sits under the header.
      const line = 34;
      setOnPaper(
        Array.from(document.querySelectorAll(".paper")).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= line && r.bottom >= line;
        }),
      );
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setObserved(entry.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...navigation.map((item) => item.id), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header
      className={`site-header${hidden && !open ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}${onPaper ? " on-paper" : ""}`}
    >
      <div className="header-bar shell">
        <Link href="/" className="brand" aria-label={`${profile.name}, home`}>
          <span className="brand-mark" aria-hidden="true">
            B<span>Z</span>
          </span>
          <span className="brand-name">
            {profile.name}
            <span>{profile.role}</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={href(item.id)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={active === item.id ? "is-active" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-end">
          <Link href={href("contact")} className="pill pill-light header-cta" data-magnetic>
            Let’s talk
            <ArrowUpRight />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className="menu-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ol>
            {[...navigation, { label: "Contact", id: "contact" }].map((item, index) => (
              <li key={item.id} style={{ "--i": index } as React.CSSProperties}>
                <Link href={href(item.id)} onClick={() => setOpen(false)}>
                  <span className="mono">0{index + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu-foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <div>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.cv} download>
              CV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
