// Bring the website's built-in content into the platform CMS (so it's managed in the admin portal).
// Idempotent upsert by (type, slug) via the service-key /ingest/content endpoint. Re-runnable.
//   PLATFORM_URL=http://localhost:8000 SSO_SHARED_SECRET=phase2-sso-secret node scripts/import-content.mjs
import { build } from 'esbuild'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const PLATFORM = process.env.PLATFORM_URL || 'http://localhost:8000'
const KEY = process.env.SSO_SHARED_SECRET || 'phase2-sso-secret'

// load a TS data module by bundling it to a temp ESM file (esbuild = Vite's bundler)
async function load(rel) {
  const out = join(tmpdir(), `aif-${Date.now()}-${Math.random().toString(36).slice(2)}.mjs`)
  await build({ entryPoints: [resolve(root, rel)], outfile: out, bundle: true, format: 'esm', platform: 'node', logLevel: 'silent' })
  return import(pathToFileURL(out).href)
}

async function push(item) {
  const r = await fetch(`${PLATFORM}/ingest/content`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Service-Key': KEY },
    body: JSON.stringify(item),
  })
  return r.ok
}

const sources = [
  { rel: 'src/data/insights.ts', type: 'insight', pick: (m) => m.POSTS || [], map: (p) => ({ slug: p.slug, title: p.title, summary: p.dek, body: (p.body || []).join('\n\n'), author: 'The AI Flywheel', tags: [p.tag] }) },
  { rel: 'src/data/cases.ts', type: 'case', pick: (m) => m.CASES || m.default || [], map: (c) => ({ slug: c.slug, title: c.title || c.name, summary: c.dek || c.summary || '', body: (c.body || c.paragraphs || []).join?.('\n\n') || '', author: 'The AI Flywheel', tags: [c.sector || 'Case study'] }) },
]

let total = 0, ok = 0
for (const src of sources) {
  let mod
  try { mod = await load(src.rel) } catch (e) { console.log(`skip ${src.rel}: ${e.message}`); continue }
  const items = src.pick(mod)
  for (const raw of items) {
    const item = { type: src.type, status: 'published', ...src.map(raw) }
    if (!item.slug || !item.title) continue
    total++
    if (await push(item)) ok++
  }
  console.log(`  ${src.type}: imported ${items.length} item(s)`)
}
console.log(`done — ${ok}/${total} content items upserted into the portal CMS`)
