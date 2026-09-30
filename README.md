# Elif Bensu Zorlu — Portfolio

The personal site of Elif Bensu Zorlu, a full-stack developer in the UK.
Live at [elifbensuzorlu-portfolio.vercel.app](https://elifbensuzorlu-portfolio.vercel.app).

## What's inside

- **Selected work**: production websites built at Rix Digital, each with a short case
  study and Lighthouse scores from the live site.
- **Stack**: the tools I work with, grouped into interface, services & data, quality
  and delivery.
- **Experience & about**: career history, certifications and languages.
- **Contact**: a server-side contact form that sends through Resend.

A single WebGL particle system sits behind the page and re-forms as you scroll: an
exploded web page in the hero, a drifting field behind the work, four stacked layers
for the stack and a slow wave horizon at the contact form.

## Built with

- Next.js 16 (App Router) · React 19 · TypeScript
- Three.js with custom GLSL shaders
- Lenis smooth scrolling and CSS animations
- Resend + React Email
- Playwright end-to-end tests and `node:test` unit tests

Content is server-rendered and readable without JavaScript. The site respects
`prefers-reduced-motion`, supports keyboard navigation and ships structured data,
a sitemap and Open Graph images.

## Running locally

```sh
npm install
npm run dev
```
