"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { sendEmail } from "@/actions/sendEmail";
import { ArrowRight, ArrowUpRight, Check, Copy, Download } from "@/components/site/icons";
import { profile } from "@/lib/content";

type Status = { type: "error" | "success"; text: string } | null;

export default function Contact() {
  const [copied, setCopied] = useState<"" | "done" | "failed">("");
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    window.setTimeout(() => setCopied(""), 2400);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setStatus(null);
    try {
      const result = await sendEmail(new FormData(event.currentTarget));
      if (result.error) {
        setStatus({ type: "error", text: result.error });
      } else {
        setStatus({ type: "success", text: "Thank you. Your message is on its way to my inbox." });
        form.current?.reset();
      }
    } catch {
      setStatus({
        type: "error",
        text: `Your message couldn’t be sent. Please email me directly at ${profile.email}.`,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="shell contact-inner">
        <p className="eyebrow mono" data-reveal>
          <span>05</span> Contact
        </p>
        <h2 id="contact-title" className="contact-title" data-reveal>
          Let’s build something <em>reliable.</em>
        </h2>
        <p className="contact-intro" data-reveal>
          Hiring for a full-stack role, or building a team where I could make a difference? I’d
          love to hear about it.
        </p>

        <div className="contact-email" data-reveal>
          <a href={`mailto:${profile.email}`} className="big-email">
            {profile.email}
          </a>
          <button type="button" className="copy-button" onClick={copyEmail}>
            {copied === "done" ? <Check /> : <Copy />}
            <span>{copied === "done" ? "Copied" : "Copy"}</span>
            <span className="visually-hidden"> email address</span>
          </button>
          <span className="visually-hidden" role="status">
            {copied === "done" ? "Email address copied" : copied === "failed" ? "Copy failed. Select the address to copy it." : ""}
          </span>
        </div>

        <ul className="contact-links" data-reveal>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="pill pill-ghost" data-magnetic>
              LinkedIn <ArrowUpRight />
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="pill pill-ghost" data-magnetic>
              GitHub <ArrowUpRight />
            </a>
          </li>
          <li>
            <a href={profile.cv} download className="pill pill-accent" data-magnetic>
              Download CV <Download />
            </a>
          </li>
        </ul>

        <details className="contact-form-wrap" data-reveal>
          <summary>
            <span>Prefer a quick message?</span>
            <span className="summary-icon" aria-hidden="true" />
          </summary>
          <form ref={form} onSubmit={submit} className="contact-form">
            <div className="field">
              <label htmlFor="sender-email">Your email</label>
              <input
                id="sender-email"
                name="senderEmail"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@company.com"
              />
            </div>
            <div className="field field-wide">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={4}
                placeholder="Tell me about the role or the team…"
              />
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company-website">Leave this empty</label>
              <input id="company-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="form-foot">
              <p className={`form-status ${status?.type ?? ""}`} role="status" aria-live="polite">
                {status?.text}
              </p>
              <button type="submit" className="pill pill-light" disabled={pending}>
                {pending ? "Sending…" : "Send message"} <ArrowRight />
              </button>
            </div>
          </form>
        </details>
      </div>
    </section>
  );
}
