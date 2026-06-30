import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Info, TrendingUp, AlertTriangle } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section } from '../lib/primitives'
import { CASES } from '../data/cases'

const ACTORS = ['All', 'Business', 'Government', 'Institution', 'Team'] as const

export default function CaseStudies() {
  const [actor, setActor] = useState<(typeof ACTORS)[number]>('All')
  const filtered = actor === 'All' ? CASES : CASES.filter((c) => c.actor === actor)

  return (
    <>
      <Seo title="Case Studies — Flywheel in Action" path="/case-studies"
        description="The proof library — positive examples and honest cautionary tales, filterable by actor and stage. Illustrative composites, clearly labelled." />
      <PageHero
        eyebrow="Case studies · Flywheel in Action"
        title={<>Proof, by <span className="text-shimmer">actor and stage</span>.</>}
        sub="The proof library — positive examples and honest cautionary tales, filterable by who and by where on the wheel."
        accent="#5E92B3"
      />
      <div className="container-x -mt-6">
        <div className="flex items-start gap-3 rounded-xl border border-hairline/60 bg-panel/50 p-4 text-[13px] text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p><span className="font-semibold text-gold">Honesty note.</span> These are clearly-labelled <span className="text-mist">illustrative composites</span>, not real named organizations or audited results — exactly as the framework's standard requires. Verified, audited cases replace them as they are documented. In a market full of inflated claims, verifiable is the differentiator.</p>
        </div>
      </div>

      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {ACTORS.map((a) => (
            <button key={a} onClick={() => setActor(a)} className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition ${actor === a ? 'border-gold bg-gold text-ground' : 'border-hairline/70 text-faint hover:text-cloud'}`}>{a}</button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((c) => (
            <Link key={c.slug} to={`/case-studies/${c.slug}`} className="group flex h-full flex-col rounded-2xl border border-hairline/60 bg-panel/40 p-6 transition hover:-translate-y-1 hover:border-gold/40">
              <div className="flex items-center justify-between gap-3">
                <span className="chip border-hairline text-faint">{c.actor} · {c.stage}</span>
                <span className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider ${c.outcome === 'positive' ? 'text-core' : 'text-physical'}`}>
                  {c.outcome === 'positive' ? <TrendingUp className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}{c.outcome}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-cloud group-hover:text-gold">{c.title}</h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{c.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Read the case <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  )
}
