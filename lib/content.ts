// Single source of truth for the site's copy. Career facts come from the
// September 2026 CV in /public; project details from the live sites and repos.

export const siteUrl = "https://elifbensuzorlu-portfolio.vercel.app";

export const profile = {
  name: "Elif Bensu Zorlu",
  shortName: "Bensu",
  role: "Full-stack developer",
  location: "UK",
  email: "elifbensuaslan@gmail.com",
  linkedin: "https://www.linkedin.com/in/elif-bensu-zorlu/",
  github: "https://github.com/bensuz",
  cv: "/Elif_Bensu_Zorlu_CV.pdf",
  // Set to null to hide the availability badge.
  availability: "Open to new opportunities",
  // First day of commercial development work, used for the live experience counter.
  careerStart: "2023-12-01",
} as const;

export type Lighthouse = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  measured: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  domain: string;
  url: string;
  repo?: string;
  tint: string;
  summary: string;
  highlights: string[];
  tags: string[];
  headline: string;
  overview: string;
  contribution: string;
  context: { label: string; value: string }[];
  sections: { title: string; text: string }[];
  tools: string[];
  // Lighthouse scores for the live site, from the better of the mobile and desktop runs.
  // Only added when every category is 90 or above.
  lighthouse?: Lighthouse;
} & (
  | { layout: "desktop"; image: string }
  | { layout: "mobile"; screens: { src: string; alt: string }[] }
);

export const projects: Project[] = [
  {
    slug: "jordans",
    name: "Jordans Leisure",
    category: "Leisure & automotive",
    domain: "jordansleisure.com",
    url: "https://www.jordansleisure.com/",
    layout: "desktop",
    image: "/projects/jordans.jpg",
    tint: "#ff9f6b",
    summary: "Inventory-driven vehicle discovery for a motorhome specialist.",
    lighthouse: { performance: 97, accessibility: 100, bestPractices: 100, seo: 100, measured: "30 Sep 2026" },
    highlights: [
      "Vehicle search with make, model and budget filters",
      "Hire, finance and aftersales journeys",
      "Alpine.js and Tailwind CSS interface",
    ],
    tags: ["Alpine.js", "Tailwind", "Search"],
    headline: "The next adventure starts with a better search.",
    overview:
      "A website for a Hull-based motorhome and campervan business. Vehicle discovery sits at the heart of the experience, alongside information about hire, finance and aftersales support.",
    contribution:
      "I was the only person on this project and built the site end to end, from vehicle search and listings to the hire, finance and aftersales journeys.",
    context: [
      { label: "Type", value: "Commercial website" },
      { label: "Role", value: "Sole developer, the only person on the project" },
      { label: "Built at", value: "Rix Digital · J.R. Rix & Sons" },
    ],
    sections: [
      {
        title: "Finding the right vehicle",
        text: "The homepage puts vehicle search within easy reach, with routes for motorhomes and campervans and filters for make, model and budget.",
      },
      {
        title: "Connecting discovery and detail",
        text: "Vehicle listings and product information help visitors move from a broad search towards a shortlist, with routes to contact the team or arrange a viewing.",
      },
      {
        title: "Supporting the wider journey",
        text: "Hire, finance and aftersales content support different stages of ownership, with Alpine.js powering the front-end interactions.",
      },
    ],
    tools: ["Alpine.js", "Tailwind CSS", "Vehicle search", "Responsive layouts"],
  },
  {
    slug: "bryn-morfydd",
    name: "Bryn Morfydd",
    category: "Hospitality & property",
    domain: "brynmorfydd.com",
    url: "https://brynmorfydd.com/",
    layout: "desktop",
    image: "/projects/bryn-morfydd.jpg",
    tint: "#d9b27c",
    summary: "A server-rendered home for a luxury lodge park in North Wales.",
    lighthouse: { performance: 95, accessibility: 100, bestPractices: 100, seo: 100, measured: "30 Sep 2026" },
    highlights: [
      "Server-rendered with Node.js, Koa and Nunjucks",
      "Connected to a custom park management system",
      "Alpine.js interactions and a Tailwind CSS interface",
    ],
    tags: ["Node.js", "Koa", "Nunjucks", "Alpine.js", "Tailwind"],
    headline: "A sense of place. A connected platform.",
    overview:
      "A responsive website for a luxury lodge park in North Wales, bringing together the park, its lodges and the surrounding area for prospective lodge owners and holiday visitors.",
    contribution:
      "My work covered the server-rendered build and its integration with a custom park management system that keeps the lodge and park information up to date.",
    context: [
      { label: "Type", value: "Commercial website + integration" },
      { label: "Role", value: "Full-stack developer" },
      { label: "Built at", value: "Rix Digital · J.R. Rix & Sons" },
    ],
    sections: [
      {
        title: "More than a brochure",
        text: "The site connects to a custom park management system so lodge and park details can be updated dynamically, tying the visual experience to the information the business manages day to day.",
      },
      {
        title: "A focused technical stack",
        text: "Koa and Nunjucks provide the server-rendered foundation. Alpine.js supports interactive elements, while Tailwind CSS styles the responsive layouts.",
      },
      {
        title: "Space for the destination",
        text: "Large imagery, lodge listings and local-area content help visitors explore the park, with clear routes to enquiries and tours.",
      },
    ],
    tools: [
      "Node.js",
      "Koa",
      "Nunjucks",
      "Alpine.js",
      "Tailwind CSS",
      "Park management integration",
    ],
  },
  {
    slug: "victory",
    name: "Victory Conversions",
    category: "Specialist vehicles",
    domain: "victoryconversions.com",
    url: "https://www.victoryconversions.com/",
    layout: "desktop",
    image: "/projects/victory-home.jpg",
    tint: "#7fa8ff",
    summary: "Specialist vehicle engineering, organised by the sectors it serves.",
    lighthouse: { performance: 96, accessibility: 100, bestPractices: 100, seo: 100, measured: "30 Sep 2026" },
    highlights: [
      "Server-rendered with Koa and Nunjucks, Alpine.js on the front end",
      "Sector-led navigation for police, ambulance, fire and commercial",
      "Cookiebot consent with GA and Google Tag Manager",
    ],
    tags: ["Koa", "Nunjucks", "Alpine.js", "Tailwind"],
    headline: "Specialist vehicles. A focused digital presence.",
    overview:
      "A commercial website for a UK vehicle-conversion business serving emergency services and specialist commercial sectors, bringing a varied range of vehicles and engineering capabilities into one navigable experience.",
    contribution:
      "I was the only person on this project and built the site end to end, from the sector-led navigation to the product, contact and aftersales journeys.",
    context: [
      { label: "Type", value: "Commercial website" },
      { label: "Role", value: "Sole developer, the only person on the project" },
      { label: "Built at", value: "Rix Digital · J.R. Rix & Sons" },
    ],
    sections: [
      {
        title: "Navigating by sector",
        text: "Dedicated routes for police, ambulance, fire and rescue, and commercial vehicles help visitors find the capabilities relevant to their work.",
      },
      {
        title: "Showing the engineering",
        text: "Vehicle imagery and sector-specific content present the conversion range, from response vehicles to specialist configurations. Reusable Nunjucks components keep the layouts consistent and easy to extend.",
      },
      {
        title: "Supporting the next conversation",
        text: "Contact and aftersales routes sit alongside the product information, giving prospective and existing customers clear ways to reach the team.",
      },
    ],
    tools: ["Koa", "Nunjucks", "Alpine.js", "Tailwind CSS", "JavaScript", "Cookiebot", "GA & GTM"],
  },
  {
    slug: "fuelmate",
    name: "Fuelmate",
    category: "Fuel & fleet",
    domain: "fuelmate.co.uk",
    url: "https://www.fuelmate.co.uk/",
    layout: "desktop",
    image: "/projects/fuelmate.jpg",
    tint: "#39d98a",
    summary: "A clearer route to the right fuel card for UK businesses.",
    highlights: [
      "Custom fuel-card filtering on top of a Webflow CMS",
      "Jotform, JivoChat and Trustpilot integrations",
      "GA4, Google Tag Manager and Cookiebot consent",
    ],
    tags: ["Webflow", "JavaScript", "CMS", "Analytics"],
    headline: "A clearer route to the right fuel card.",
    overview:
      "A commercial website that brings fuel cards and fleet services together for UK businesses. Product information, comparisons and enquiry journeys help visitors find the options that fit their needs.",
    contribution:
      "My work covered the Webflow CMS build, custom JavaScript for the card-filtering tools, and the third-party integrations.",
    context: [
      { label: "Type", value: "Commercial website" },
      { label: "Role", value: "Web developer" },
      { label: "Built at", value: "Rix Digital · J.R. Rix & Sons" },
    ],
    sections: [
      {
        title: "Helping users find their fit",
        text: "Custom fuel-card filtering gives businesses a practical way to navigate the available products. CMS-backed content keeps the product information manageable as the offering changes.",
      },
      {
        title: "Connecting the customer journey",
        text: "Jotform, JivoChat and Trustpilot integrations support enquiries, conversations and customer feedback. GA4, Google Tag Manager and Cookiebot support analytics and consent management.",
      },
      {
        title: "A considered front end",
        text: "Responsive layouts and purposeful animation bring the content together across screen sizes, making a broad range of services straightforward to explore.",
      },
    ],
    tools: [
      "Webflow",
      "JavaScript",
      "CSS",
      "CMS",
      "Jotform",
      "JivoChat",
      "Trustpilot",
      "GA4",
      "Google Tag Manager",
      "Cookiebot",
    ],
  },
];

export const alsoDelivered = [
  "Customer account portals",
  "Quotation workflows",
  "Inventory-driven platforms",
  "Internal business tools",
  "React Native mobile features",
  "Marketing websites",
];

export const stackLayers = [
  {
    id: "interface",
    title: "Interface",
    kicker: "Frontend",
    text: "Accessible, responsive interfaces in React, Next.js, Remix and SvelteKit, or server-rendered with Nunjucks and Alpine.js when that suits the product better.",
    tools: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Remix",
      "SvelteKit",
      "React Native",
      "Nunjucks",
      "Alpine.js",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Webflow",
    ],
  },
  {
    id: "services",
    title: "Services & data",
    kicker: "Backend",
    text: "Node.js services and REST APIs on Koa and Express, connecting PostgreSQL, headless CMS platforms, third-party APIs and the business workflows behind them.",
    tools: [
      "Node.js",
      "Koa",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "MongoDB",
      "Strapi",
      "Headless CMS",
      "Zod",
      "Postmark",
      "Cloudflare Turnstile",
    ],
  },
  {
    id: "quality",
    title: "Quality",
    kicker: "Testing & web quality",
    text: "Playwright end-to-end tests and Jest unit and integration tests, plus the fundamentals users feel: performance, accessibility, technical SEO and analytics.",
    tools: [
      "Playwright",
      "Jest",
      "Unit · Integration · E2E",
      "Accessibility",
      "Performance",
      "Technical SEO",
      "GA4",
      "GTM",
      "Cookiebot",
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    kicker: "DevOps & workflow",
    text: "Git-based releases and deployments across Docker, Nginx, Vercel, Netlify and Render, in Agile teams, with AI-assisted workflows that stay developer-led and tested.",
    tools: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Docker",
      "Nginx",
      "Linux / CLI",
      "Vercel",
      "Netlify",
      "Render",
      "Jira",
      "Claude Code",
      "Codex",
    ],
  },
] as const;

export const marquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Koa",
  "Express",
  "Remix",
  "SvelteKit",
  "Prisma",
  "Supabase",
  "Playwright",
  "Jest",
  "Docker",
  "Nginx",
  "Tailwind CSS",
  "React Native",
  "Accessibility",
  "Technical SEO",
];

export const experience = [
  {
    period: "Dec 2023 — Present",
    role: "Full Stack Developer",
    org: "J.R. Rix & Sons Limited",
    detail: "Rix Digital · United Kingdom",
    current: true,
    points: [
      "Build and maintain production web applications: customer-facing websites, account portals and internal business tools.",
      "Develop Node.js, Koa and Express services and REST APIs, integrating PostgreSQL, headless CMS platforms and third-party APIs.",
      "Deliver quotation workflows, inventory-driven platforms, marketing websites and React Native mobile features.",
      "Write Playwright end-to-end and Jest unit/integration tests; review changes and investigate defects for reliable releases.",
      "Deploy and troubleshoot with Docker, Nginx, Vercel, Netlify and Render; improve performance, accessibility and technical SEO.",
      "Work in Agile/Scrum teams and bring Claude Code and Codex into the workflow, with developer-led testing and validation.",
    ],
  },
  {
    period: "2023",
    role: "Full Stack Web & App Development",
    org: "WBS Coding School",
    detail: "Bootcamp",
    points: [
      "An intensive programme that turned a growing interest in building software into a practical foundation across the stack.",
    ],
  },
  {
    period: "2018 — 2022",
    role: "Contracts & Licensing Specialist",
    org: "TEI — TUSAŞ Engine Industries",
    detail: "Aerospace · Turkey",
    points: [
      "Managed contract and licensing activities with international customers and suppliers in a regulated aerospace environment.",
      "Created VBA and Python automation tools that reduced selected processing time by up to 90%.",
      "Received the Management Appreciation, Technical Expertise, and Customer Relations & Satisfaction awards.",
    ],
  },
  {
    period: "2013 — 2018",
    role: "Bachelor of Business Administration",
    org: "Middle East Technical University",
    detail: "METU · Ankara",
    points: [],
  },
];

export const certifications = [
  { name: "Full Stack Open", issuer: "University of Helsinki", year: "2026" },
  { name: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
  { name: "Agents & Workflows", issuer: "OpenAI Academy", year: "2026" },
  { name: "Google Analytics Certification", issuer: "Google Skillshop", year: "2026" },
  { name: "Technical SEO & AI Search Essentials", issuer: "Semrush Academy", year: "2026" },
  { name: "AEO Fundamentals", issuer: "HubSpot Academy", year: "2026" },
  { name: "CS50: Introduction to Computer Science", issuer: "HarvardX", year: "2023" },
  { name: "Agile Project Management", issuer: "Sabancı University", year: "2021" },
];

export const languages = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "Full professional" },
  { name: "French", level: "Basic" },
];

export const principles = [
  {
    title: "Understand the business first",
    text: "Four years in contracts taught me to ask what a feature is for before asking how to build it.",
  },
  {
    title: "Test what matters",
    text: "Playwright for the journeys users depend on, Jest for the logic underneath, and reviews that catch the rest.",
  },
  {
    title: "Ship, measure, improve",
    text: "Performance, accessibility and SEO aren’t a final pass. They’re part of every release.",
  },
];
