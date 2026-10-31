# AI Flywheel — three doors, one wheel

Next.js 16 + React 19 + Tailwind CSS v4 monorepo, built from *AI Flywheel Website Strategy 2.0*.

| Site | Folder | Local URL | Production domain |
| --- | --- | --- | --- |
| AI Flywheel (adult learning, master brand) | `apps/flywheel` | http://localhost:3000 | aiflywheel.in |
| AI Flywheel at Schools (+ AI Flywheel Kids) | `apps/schools` | http://localhost:3001 | schools.aiflywheel.in |
| AI Flywheel Studio (build platforms) | `apps/studio` | http://localhost:3002 | aiflywheel.studio |

`packages/ui` is the shared design system: one token set with three themes
(`theme-flywheel.css`, `theme-schools.css`, `theme-studio.css`), the wheel mark, the
mega-menu header with the shared cross-site door bar, the footer, buttons, accordions,
tabs and scroll reveals. Components are shared; each site's personality comes from its theme.

## Run

```bash
npm install
npm run dev            # all three at once
npm run dev:flywheel   # or one at a time
npm run dev:schools
npm run dev:studio
npm run build          # production build of all three
```

Cross-site links use `NEXT_PUBLIC_FLYWHEEL_URL`, `NEXT_PUBLIC_SCHOOLS_URL` and
`NEXT_PUBLIC_STUDIO_URL` (default to the localhost ports above).

## Design system

| | aiflywheel.in | schools.aiflywheel.in | aiflywheel.studio |
| --- | --- | --- | --- |
| Line | Learn it. Build it. Prove it. | Make it. Question it. Share it. | Sign in. Start a project. |
| Type | Lora headings · Inter · JetBrains Mono | Poppins headings · Inter · Noto Sans Tamil | Inter · JetBrains Mono |
| Colour | Ink #0A131F · Paper #F6F1E8 · Ember #D9542A | Navy #1E2A44 · Cream #FFF7E8 · Sky #2F7FD8 · Sunshine #F2B705 · Kids #B8306F | Dark canvas; each studio's layer colour is its accent |
| Main action | Start free | Book a school demo | Join early access |

Layer colours on every site: Foundation #3B4BA8 · Generative #B8306F · Agentic #D98B0B · Physical #13827F.

Forms, the Flywheel Check, credential verification and sign-in are front-end only (no backend yet).
The Schools site loads no analytics or third-party scripts, per the child-safety rules.
