// Prerender-lite: after `vite build`, emit a static HTML file per key route with the correct
// per-route <title>/description/OG/canonical AND a <noscript> summary + crawlable links. Modern
// crawlers run JS, but this guarantees correct meta + content for those that don't, with zero SSR
// runtime. Static hosts serve `/framework/index.html` for `/framework` before the SPA fallback.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const dist = resolve(here, '..', 'dist')
const ORIGIN = process.env.SITE_ORIGIN || 'https://www.theaiflywheel.example'
const SITE = 'The AI Flywheel'

const ROUTES = {
  '/': { t: 'Turn AI into compounding value, at any scale', d: 'The standard for turning AI into compounding value — four stages, the DRIVE method, CORE governance. Run the free diagnostic and find your blue dot.' },
  '/framework': { t: 'The Framework', d: 'The Four Stages, the DRIVE method, and CORE governance — the standard for AI implementation, at any scale.' },
  '/diagnostic': { t: 'The free AI Flywheel diagnostic', d: 'A scored, honest read of where you are on the flywheel — your blue dot and your single next move. Free.' },
  '/solutions': { t: 'Solutions', d: 'For teams, enterprises, institutions and economies — one framework, three scales, four actors.' },
  '/platform': { t: 'The Platform', d: 'The AI Revenue & Transformation Operating System — built on Claude, MCP-first, vendor-neutral, sovereign by design.' },
  '/pricing': { t: 'Pricing — platform tiers + certification', d: 'Free to Enterprise platform tiers and the certification ladder, with Global and India pricing. Illustrative & directional.' },
  '/academy': { t: 'Academy & Certification', d: 'Courses, the 90-Day Flywheel Start, proctored exams, and verifiable badges. Own the standard; climb the ladder.' },
  '/resources': { t: 'Resources', d: 'The glossary, toolkit, insights, case studies, the book, and industry guides — the framework, in depth.' },
  '/about': { t: 'About', d: 'The standard for turning AI into compounding value. Evidence over assertion; the compounding is the product.' },
  '/toolkit': { t: 'The Flywheel Toolkit', d: 'All 28 tools from the book — diagnostics, gates, scorecards and checklists, downloadable.' },
  '/glossary': { t: 'Glossary', d: 'The AI Flywheel glossary — every term in the framework, defined plainly.' },
  '/book': { t: 'The Book', d: 'The AI Flywheel — the standard for turning AI into compounding value.' },
  '/contact': { t: 'Contact', d: 'Talk to us about your flywheel — teams, enterprises, governments and partners.' },
}

const NAV = ['/framework', '/diagnostic', '/solutions', '/platform', '/pricing', '/academy', '/resources', '/about']

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
function setBetween(html, open, close, value) {
  const i = html.indexOf(open)
  if (i < 0) return html
  const j = html.indexOf(close, i + open.length)
  if (j < 0) return html
  return html.slice(0, i + open.length) + value + html.slice(j)
}
function setMeta(html, marker, value) {
  // marker like '<meta name="description" content="' ; replace up to the next '"'
  return setBetween(html, marker, '"', esc(value))
}

const base = readFileSync(resolve(dist, 'index.html'), 'utf8')
let count = 0

for (const [path, { t, d }] of Object.entries(ROUTES)) {
  const title = path === '/' ? `${SITE} — ${t}` : `${t} · ${SITE}`
  const canonical = ORIGIN + path
  let html = base
  html = setBetween(html, '<title>', '</title>', esc(title))
  html = setMeta(html, '<meta name="description" content="', d)
  html = setMeta(html, '<meta property="og:title" content="', title)
  html = setMeta(html, '<meta property="og:description" content="', d)
  html = html.replace('</head>',
    `<link rel="canonical" href="${canonical}"/><meta property="og:url" content="${canonical}"/></head>`)

  const links = NAV.filter((n) => n !== path)
    .map((n) => `<a href="${n}">${esc(ROUTES[n]?.t || n)}</a>`).join(' · ')
  const noscript = `<noscript><main><h1>${esc(t)}</h1><p>${esc(d)}</p>` +
    `<p>Add 1. Become the one. — the compounding is the product.</p><nav>${links}</nav></main></noscript>`
  html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscript}`)

  const out = path === '/' ? resolve(dist, 'index.html') : resolve(dist, path.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  count++
}
console.log(`prerendered ${count} routes (per-route meta + noscript fallback)`)
