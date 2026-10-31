# AI Flywheel — two doors, one wheel

Next.js 16 + React 19 + Tailwind CSS v4 monorepo, built from *AI Flywheel Website Strategy 2.0*.

| Site | Folder | Local URL | Production domain |
| --- | --- | --- | --- |
| AI Flywheel (adult learning, master brand) | `apps/flywheel` | http://localhost:3000 | aiflywheel.in |
| AI Flywheel at Schools (+ AI Flywheel Kids) | `apps/schools` | http://localhost:3000/schools (app runs on 3001) | aiflywheel.in/schools |

Both sites share **aiflywheel.in**. The Schools app is built with `basePath: "/schools"`, and the
AI Flywheel app proxies `/schools/*` to it (Next.js multi-zones). In production, either set
`SCHOOLS_ORIGIN` (build variable on the AI Flywheel app) to where the Schools app runs, or let
the reverse proxy route `/schools` straight to the Schools app. The old `schools.aiflywheel.in`
host redirects to `aiflywheel.in/schools`.

AI Flywheel Studio (aiflywheel.studio) is a separate project and is not in this repository;
both sites link to it, and `/studio` redirects there.

`packages/ui` is the shared design system: one token set with a theme per site
(`theme-flywheel.css`, `theme-schools.css`), the wheel mark, the mega-menu header with the
shared cross-site door bar, the footer, buttons, accordions, tabs, scroll reveals,
the credential lookup and the photo components. Components are shared; each site's
personality comes from its theme.

## Run

```bash
npm install
npm run dev            # both sites at once
npm run dev:flywheel   # or one at a time
npm run dev:schools
npm run build          # production build of both
```

Cross-site links use `NEXT_PUBLIC_FLYWHEEL_URL`, `NEXT_PUBLIC_SCHOOLS_URL` and
`NEXT_PUBLIC_STUDIO_URL` (they default to localhost:3000, 3001 and 3002).

## Design system

| | aiflywheel.in | schools.aiflywheel.in |
| --- | --- | --- |
| Line | Learn it. Build it. Prove it. | Make it. Question it. Share it. |
| Type | Lora headings · Inter · JetBrains Mono | Poppins headings · Inter · Noto Sans Tamil |
| Colour | Ink #0A131F · Paper #F6F1E8 · Ember #BB4824 | Navy #1E2A44 · Cream #FFF7E8 · Sky #2A74CC · Sunshine #F2B705 · Kids #B8306F |
| Main action | Start free | Book a school demo |

Layer colours on both sites: Foundation #3B4BA8 · Generative #B8306F · Agentic #D98B0B · Physical #13827F.

Photos in `apps/*/public/images` are Unsplash License photos; each folder's `manifest.json`
lists what each shows and its source. They are interim until the brand's own photo shoots.

Forms, the Flywheel Check, credential verification and search run in the browser only (no backend yet).
The Schools site loads no analytics or third-party scripts, per the child-safety rules.
