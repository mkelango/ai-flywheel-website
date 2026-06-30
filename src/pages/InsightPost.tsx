import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Btn } from '../lib/primitives'
import { findPost, POSTS } from '../data/insights'
import { api } from '../lib/api'
import { Seo, breadcrumbLd } from '../lib/seo'

function render(p: string) {
  // Escape HTML first (defense-in-depth), then apply minimal **bold** / *em*.
  const esc = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const html = esc
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-cloud font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-mist">$1</em>')
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export default function InsightPost() {
  const { slug = '' } = useParams()
  const staticPost = findPost(slug)
  const [remote, setRemote] = useState<any>(null)
  const [loading, setLoading] = useState(!staticPost)

  useEffect(() => {
    if (staticPost) return
    api.contentItem('insight', slug)
      .then((r) => setRemote(r.found ? r.item : null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug, staticPost])

  // Normalise a platform CMS item to the post shape this page renders.
  const p: any = staticPost || (remote && {
    title: remote.title, dek: remote.summary || '', tag: (remote.tags && remote.tags[0]) || 'Insight',
    color: '#E6B968', date: (remote.publish_at || '').slice(0, 10), read: '5 min',
    body: String(remote.body || '').split(/\n{2,}|\n/).filter(Boolean), takeaway: '',
  })

  if (!p && loading) return <Section className="pt-32 text-center"><p className="text-faint">Loading…</p></Section>
  if (!p) return <Section className="pt-32 text-center"><h1 className="h-display text-3xl">Post not found</h1><div className="mt-6"><Btn to="/insights">All insights</Btn></div></Section>
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={p.title} description={p.dek.slice(0, 155)} type="article" path={`/insights/${p.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.dek, datePublished: p.date, author: { '@type': 'Organization', name: 'The AI Flywheel' } },
          breadcrumbLd([['Resources', '/resources'], ['Insights', '/insights'], [p.title, `/insights/${p.slug}`]]),
        ]}
      />
      <PageHero eyebrow={p.tag} title={p.title} sub={p.dek} accent={p.color}
        crumbs={[['Resources', '/resources'], ['Insights', '/insights'], [p.tag, `/insights/${p.slug}`]]}>
        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">{p.date} · {p.read} read</p>
      </PageHero>

      <Section>
        <article className="max-w-2xl">
          <div className="space-y-5 text-[16px] leading-[1.8] text-muted">
            {p.body.map((para: string, i: number) => <p key={i}>{render(para)}</p>)}
          </div>
          {p.takeaway && (
            <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/[0.05] p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-gold">The takeaway</p>
              <p className="mt-2 font-serif text-lg italic text-mist">{p.takeaway}</p>
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Btn to="/diagnostic">Run the free diagnostic <ArrowRight className="h-4 w-4" /></Btn>
            <Link to="/insights" className="inline-flex items-center gap-1.5 text-sm text-faint transition hover:text-cloud"><ArrowLeft className="h-4 w-4" /> All insights</Link>
          </div>
        </article>
      </Section>

      <Section className="border-t border-hairline/40 pt-0">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-faint">Keep reading</p>
        <div className="grid gap-5 sm:grid-cols-3">
          {more.map((m) => (
            <Link key={m.slug} to={`/insights/${m.slug}`} className="group rounded-2xl border border-hairline/60 bg-panel/40 p-5 transition hover:border-gold/40">
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: m.color }}>{m.tag}</span>
              <h3 className="mt-2 font-display text-[14px] font-semibold text-cloud group-hover:text-gold">{m.title}</h3>
            </Link>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  )
}
