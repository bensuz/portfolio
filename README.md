# Elif Bensu Zorlu — Portfolio

The personal site of Elif Bensu Zorlu, a full-stack developer in the UK.
Live at [elifbensuzorlu-portfolio.vercel.app](https://elifbensuzorlu-portfolio.vercel.app).

It presents selected production work, a layered view of the stack, career history and
certifications, with a single WebGL particle system that re-forms as you scroll:

| Section    | Particles form…                                         |
| ---------- | ------------------------------------------------------- |
| Hero       | an exploded web page whose layers drift apart           |
| Work       | a drifting field behind the project cards               |
| Stack      | four stacked layers; the one being read lights up       |
| Contact    | a slow wave horizon                                     |

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Three.js** with custom GLSL shaders, loaded after the page is interactive
- **Lenis** smooth scrolling, IntersectionObserver reveals, CSS-only line animations
- **Resend** + React Email for the contact form (server action)
- **Playwright** end-to-end tests on desktop and mobile, `node:test` unit tests

## Scripts

```sh
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test           # contact action unit tests (provider is stubbed)
npm run test:e2e   # builds, starts on :3100 and runs Playwright
npm run build
```

Run `npx playwright install chromium` once before the first end-to-end run.

## Editing content

Almost everything lives in [`lib/content.ts`](lib/content.ts): profile links, the
availability badge (set it to `null` to hide it), projects and case studies, stack
layers, experience, certifications and languages. Pages and sections read from it,
so there is one place to update.

- Screenshots: `public/projects/` (desktop 1440×1000; mobile 780×1690)
- CV: `public/Elif_Bensu_Zorlu_CV.pdf`
- Portrait: `public/Su.jpg`
- Site URL: `siteUrl` in `lib/content.ts` (used for metadata, sitemap and robots)

The home page regenerates daily so the live experience counter stays accurate.

The hero shape is set by `HERO_VARIANT` in `components/scene/hero-shape.ts`: `"page"` (an
exploded web page, like the 3D layers view in dev tools) or `"git"` (a commit graph).

## Contact form

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` (and optionally
`RESEND_FROM_EMAIL` with a verified sender). Without a key the form tells visitors to
email directly. It never reports success unless Resend accepts the message. The form
has server-side validation and a honeypot field.

## Accessibility and performance

- Content is server-rendered and readable without JavaScript; motion only enhances it.
- `prefers-reduced-motion` turns off smooth scrolling, reveals and particle animation.
- The 3D scene is decorative (`aria-hidden`), skipped behind solid sections, capped
  in pixel ratio, and falls back to a CSS glow if WebGL is unavailable.
- Keyboard-friendly navigation, a skip link, visible focus states and labelled forms.
- Structured data (`schema.org/Person`), Open Graph image, sitemap and robots rules.

Fonts: Bricolage Grotesque, Inter Tight, JetBrains Mono and Instrument Serif via
`next/font` (self-hosted at build time).
