// Generates public/sitemap.xml from the content data files (kept in sync via regex
// extraction of the term/name/title fields). Run: npm run gen:sitemap
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const ORIGIN = process.env.SITE_ORIGIN || 'https://aiflywheel.example'

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/\s*\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function extract(file, field) {
  try {
    const txt = fs.readFileSync(path.join(root, 'src/data', file), 'utf8')
    const re = new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g')
    const out = []
    let m
    while ((m = re.exec(txt))) out.push(m[1].replace(/\\'/g, "'"))
    return out
  } catch { return [] }
}

const staticRoutes = [
  '/', '/framework', '/diagnostic', '/solutions', '/platform', '/pricing', '/academy',
  '/resources', '/glossary', '/insights', '/case-studies', '/toolkit', '/report', '/book',
  '/about', '/contact', '/careers', '/newsroom',
  '/security', '/privacy', '/terms', '/responsible-ai', '/sovereignty',
  '/solutions/business', '/solutions/government', '/solutions/institutions', '/solutions/teams',
]

const glossary = extract('glossary.ts', 'term').map((t) => `/glossary/${slugify(t)}`)
const certs = extract('certifications.ts', 'name').map((t) => `/certifications/${slugify(t)}`)
const industries = extract('industries.ts', 'name').map((t) => `/industries/${slugify(t)}`)
const cases = extract('cases.ts', 'title').map((t) => `/case-studies/${slugify(t)}`)
const posts = extract('insights.ts', 'title').map((t) => `/insights/${slugify(t)}`)

const all = [...new Set([...staticRoutes, ...glossary, ...certs, ...industries, ...cases, ...posts])]
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((u) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod><changefreq>${u === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${u === '/' ? '1.0' : u.split('/').length > 2 ? '0.6' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`

fs.mkdirSync(path.join(root, 'public'), { recursive: true })
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml written: ${all.length} URLs (${glossary.length} glossary, ${certs.length} certs, ${industries.length} industries, ${cases.length} cases, ${posts.length} posts)`)
