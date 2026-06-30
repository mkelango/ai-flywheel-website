# The AI Flywheel — Website

A world-class, enterprise-grade marketing site for **The AI Flywheel** framework, built in React.
Design inspiration: dalecarnegie.com (authority + warmth), expressed through the AI Flywheel brand
system (deep-ink premium ground, the turning-flywheel motif, the four stage colours, gold as the
compounding energy, emerald for CORE governance).

> One framework, three scales, four actors — one website. *Add 1. Become the one.*

## Stack
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (brand tokens in `tailwind.config.js`)
- **React Router** (multi-page SPA — ready to sit in front of the future admin/platform backend)
- **Framer Motion** (restrained, one orchestrated hero moment)
- **lucide-react** icons

No HTML pages — everything is componentized React, so the planned **admin portal / platform backend**
can be wired in (the free diagnostic is designed as the freemium tier of that platform).

## Run it
```bash
cd ai-flywheel-website
npm install
cp .env.example .env   # optional — works without it (outbox email + demo checkout)
npm run dev            # web on :5174  +  API on :8787  (concurrently)
npm run build          # type-checks + production build to /dist
npm start              # single-process prod: API serves /dist + SPA fallback
```

## Backend (`server/`)
A real Node/Express API — no native deps, runs offline, production-shaped.

| Endpoint | What it does |
|---|---|
| `POST /api/auth/signup · login` · `GET /api/auth/me` | JWT auth, bcrypt-hashed passwords |
| `POST /api/newsletter` | Subscribe + welcome email |
| `POST /api/diagnostic` | Persist result + email the report (auto-subscribes) |
| `GET /api/credentials/:id` | Verify-a-credential (seeded demo IDs) |
| `POST /api/checkout` · `POST /api/payments/confirm` | Stripe / Razorpay / **demo** checkout |
| `POST /api/contact` | Advisory / programs / enterprise lead capture |

- **Persistence:** file-backed store (`server/db.js`, atomic writes) — swap for SQLite/Postgres in prod; call sites don't change.
- **Email:** `nodemailer` when `SMTP_*` set, else written to `server/data/outbox/`.
- **Payments:** real Stripe (redirect) + Razorpay (order) when keys set; otherwise **safe demo mode** — no card charged. Seeded credential to test verify: `AIF-AGT-2026-0001`.
- Configure everything via `.env` (see `.env.example`). Dev front-end proxies `/api` → `:8787` (see `vite.config.ts`).

## Deploy
- **Single Node service (simplest):** `npm run build && npm start` — Express serves the API + the built SPA with history fallback (deep links resolve).
- **Static host + separate API:** `vercel.json` / `netlify.toml` / `public/_redirects` give SPA fallback; point `/api/*` at your API host.

## Information architecture (from the blueprint)
| Route | Page |
|---|---|
| `/` | Home — flywheel hero, four-actor selector, framework-in-30s, proof, paths, platform + book, CTA |
| `/framework` | The standard — four stages, DRIVE, CORE, layers, maturity model, the Implementation Gap |
| `/diagnostic` | **The free diagnostic** — interactive, scored ("find your blue dot"), email-gated report, next-step routing |
| `/solutions` + `/solutions/:actor` | Business · Government (Economy Program) · Institutions · Teams |
| `/industries/:slug` | 9 sector playbooks (manufacturing, BFSI, healthcare, …) |
| `/platform` · `/pricing` | The SaaS + tiers and certification ladder (Global/India toggle) |
| `/academy` · `/certifications/:slug` | Ladder, cohort, ATO, verify-a-credential + per-cert detail pages |
| `/resources` | Content hub linking to ↓ |
| `/insights` + `/insights/:slug` | Blog — real articles |
| `/case-studies` + `/case-studies/:slug` | Filterable proof library (illustrative composites, clearly labelled) |
| `/glossary` + `/glossary/:slug` | 68 terms, each its own indexable page (programmatic SEO) |
| `/toolkit` | All 28 tools — downloadable templates |
| `/report` · `/book` | State of AI Implementation (+ download) · the book (paths, chapters, excerpt) |
| `/about` · `/signin` · `/signup` · `/checkout/success` · `*` (404) | — |

**Content sources.** Glossary, toolkit, case-study, and framework content are drawn from the
book's own back-matter (real definitions, the 28 tools, the case index). Pricing and cases are
labelled *illustrative* per the framework's honesty principle. Downloadable assets live in
`public/downloads/`. Routes are code-split (`React.lazy`) — main bundle ~111 KB gzip.

## Production hardening
- **SEO.** Per-route `<title>` / description / canonical / Open Graph / Twitter tags via a lightweight
  `src/lib/seo.tsx` `<Seo>` component (no dependency). JSON-LD structured data: Organization (home),
  BreadcrumbList (detail pages), DefinedTerm (glossary), Course + FAQPage (certs), Article (insights).
  `public/robots.txt`, branded `public/og-image.svg`, and a generated `public/sitemap.xml`
  (121 URLs — `npm run gen:sitemap`, also runs in `build`). Auth/checkout/404 are `noindex`.
- **Analytics.** First-party, privacy-respecting (`src/lib/analytics.ts` → `POST /api/track`). No third-party
  trackers, no ad pixels, no fingerprinting. Honours Do-Not-Track / Global Privacy Control (full no-op).
  Auto page-views + diagnostic funnel events (start / answer / complete / email).
- **i18n.** `src/lib/i18n.tsx` — English + **Tamil (தமிழ்)** on key journeys (nav, hero, primary CTAs);
  English fallback elsewhere. Functional language switcher in the nav; persists; sets `<html lang>`.
- **Search.** Cmd/Ctrl-K (or `/`) opens a search modal indexing glossary, certs, industries, cases, posts,
  and pages (lazy-loaded so its index isn't in the initial bundle).
- **Accessibility.** Skip-to-content link, labelled form inputs, aria-labels on icon buttons,
  `prefers-reduced-motion` respected, focus-visible rings. (Run axe/Lighthouse before launch for a full audit.)
- **Trust/legal.** Real `/privacy` (GDPR + DPDP), `/security`, `/terms`, `/responsible-ai`, `/sovereignty`
  pages (`src/data/legal.ts`) — production drafts; have counsel review before launch.

## Key files
- `src/components/Flywheel.tsx` — the signature animated flywheel SVG (reused across pages)
- `src/data/content.ts` — all canonical framework + pricing + nav content (single source of truth)
- `src/lib/primitives.tsx` — design-system primitives (Logo, Section, Heading, Reveal, Btn…)
- `src/components/Nav.tsx` / `Footer.tsx` — mega-menu nav + full sitemap footer
- `src/pages/*` — one file per page

## Brand & content notes
- **Honest & proof-led.** No fake logos, no invented metrics. Pricing is labelled *illustrative & directional*
  per the framework's own honesty principle.
- **Accessibility & performance.** WCAG-minded, keyboard-navigable, `prefers-reduced-motion` respected,
  mobile-first (India-first), fast bundle.
- The free diagnostic is the single most important conversion — persistent in the nav, recurring on every page.
