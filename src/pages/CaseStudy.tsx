import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Btn } from '../lib/primitives'
import { findCase } from '../data/cases'
import { Seo, breadcrumbLd } from '../lib/seo'

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const c = findCase(slug)
  if (!c) return <Section className="pt-32 text-center"><h1 className="h-display text-3xl">Case not found</h1><div className="mt-6"><Btn to="/case-studies">All case studies</Btn></div></Section>

  return (
    <>
      <Seo title={c.title} description={c.summary.slice(0, 155)} type="article" path={`/case-studies/${c.slug}`}
        jsonLd={breadcrumbLd([['Resources', '/resources'], ['Case Studies', '/case-studies'], [c.title, `/case-studies/${c.slug}`]])} />
      <PageHero eyebrow={`${c.actor} · ${c.stage}`} title={c.title} sub={c.summary} accent={c.accent}
        crumbs={[['Resources', '/resources'], ['Case Studies', '/case-studies'], [c.actor, `/case-studies/${c.slug}`]]} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="max-w-2xl space-y-8">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-faint">The situation</p>
              <p className="text-[16px] leading-relaxed text-mist">{c.situation}</p>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">What they did</p>
              <ul className="space-y-3">
                {c.whatTheyDid.map((s) => (
                  <li key={s} className="flex items-start gap-3 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: `${c.accent}22` }}><Check className="h-3.5 w-3.5" style={{ color: c.accent }} /></span>
                    <span className="text-[14px] text-mist">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-faint">The result</p>
              <p className="text-[16px] leading-relaxed text-mist">{c.result}</p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border p-6" style={{ borderColor: `${c.accent}55`, background: `${c.accent}0d` }}>
              <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.accent }}>The lesson</p>
              <p className="mt-2 font-serif text-lg italic text-mist">{c.lesson}</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border border-hairline/60 bg-panel/40 p-4 text-[12px] text-faint">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /> Illustrative composite — not a real named organization or audited result.
            </div>
            <Btn to="/diagnostic" className="w-full">Run the free diagnostic <ArrowRight className="h-4 w-4" /></Btn>
          </aside>
        </div>
        <div className="mt-10"><Link to="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-faint transition hover:text-cloud"><ArrowLeft className="h-4 w-4" /> All case studies</Link></div>
      </Section>
      <CTABand />
    </>
  )
}
