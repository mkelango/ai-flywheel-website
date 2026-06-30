import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section } from '../lib/primitives'
import { POSTS } from '../data/insights'
import { api } from '../lib/api'

// A post card shape merged from the built-in content + the platform CMS.
type Card = { slug: string; title: string; dek: string; tag: string; color: string; read: string }
const STATIC: Card[] = POSTS.map((p) => ({ slug: p.slug, title: p.title, dek: p.dek, tag: p.tag, color: p.color, read: p.read }))

export default function Insights() {
  const [posts, setPosts] = useState<Card[]>(STATIC)

  useEffect(() => {
    // Pull anything published in the admin-portal CMS and show it first (newest), then the built-ins.
    api.content('insight').then((r) => {
      const cms: Card[] = (r.items || []).map((c: any) => ({
        slug: c.slug, title: c.title, dek: c.summary || '', tag: (c.tags && c.tags[0]) || 'Insight',
        color: '#E6B968', read: '5 min',
      }))
      const seen = new Set<string>()
      const merged = [...cms, ...STATIC].filter((p) => (seen.has(p.slug) ? false : seen.add(p.slug)))
      setPosts(merged)
    }).catch(() => { /* keep the static baseline */ })
  }, [])

  const [feature, ...rest] = posts
  return (
    <>
      <Seo title="Insights — practical, honest, refreshed weekly" path="/insights"
        description="Apply It Monday practicals, framework explainers, and commentary on the moving model layer. No hype." />
      <PageHero
        eyebrow="Insights · the content engine"
        title={<>Practical, honest, and <span className="text-shimmer">refreshed weekly</span>.</>}
        sub="'Apply It Monday' practicals, framework explainers, and commentary on the moving model layer. No hype — engage the failure data, then beat it."
        accent="#45C3B9"
      />
      <Section>
        <Link to={`/insights/${feature.slug}`} className="group block overflow-hidden rounded-3xl border border-hairline/60 bg-gradient-to-br from-steel/40 to-ink p-8 transition hover:border-gold/40 sm:p-10">
          <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: feature.color }}>{feature.tag} · featured</span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-cloud group-hover:text-gold sm:text-4xl">{feature.title}</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{feature.dek}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Read the post <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </Link>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to={`/insights/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-hairline/60 bg-panel/40 p-6 transition hover:-translate-y-1 hover:border-gold/40">
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: p.color }}>{p.tag}</span>
              <h3 className="mt-3 font-display text-[16px] font-semibold leading-snug text-cloud group-hover:text-gold">{p.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{p.dek}</p>
              <span className="mt-4 font-mono text-[11px] text-faint">{p.read} read</span>
            </Link>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  )
}
