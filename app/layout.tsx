import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import CursorLabel from "@/components/site/cursor-label";
import Footer from "@/components/site/footer";
import Header from "@/components/site/header";
import Motion from "@/components/site/motion";
import SmoothScroll from "@/components/site/smooth-scroll";
import { certifications, profile, siteUrl, stackLayers } from "@/lib/content";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  display: "swap",
});
const body = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

const description =
  "Elif Bensu Zorlu is a full-stack developer in the UK, building reliable, accessible web products with TypeScript, React, Next.js, Node.js and PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Elif Bensu Zorlu — Full-stack developer",
    template: "%s — Elif Bensu Zorlu",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Elif Bensu Zorlu",
    title: "Elif Bensu Zorlu — Full-stack developer",
    description: "Reliable web products, built end to end. Selected work, capabilities and experience.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  jobTitle: "Full Stack Developer",
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  worksFor: { "@type": "Organization", name: "J.R. Rix & Sons Limited" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Middle East Technical University" },
    { "@type": "EducationalOrganization", name: "WBS Coding School" },
  ],
  hasCredential: certifications.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert.name,
    recognizedBy: { "@type": "Organization", name: cert.issuer },
  })),
  knowsAbout: stackLayers.flatMap((layer) => layer.tools),
  knowsLanguage: ["tr", "en", "fr"],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
      // The inline script below adds a "js" class before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide not-yet-revealed content only when JavaScript can reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <Motion />
        <Header />
        {children}
        <Footer />
        <CursorLabel />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
