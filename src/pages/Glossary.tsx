import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section } from '../lib/primitives'
import { GLOSSARY } from '../data/glossary'

export default function Glossary() {
  const [q, setQ] = useState('')
  const filtered = useMemo(
    () => GLOSSARY.filter((t) => (t.term + t.def).toLowerCase().includes(q.toLowerCase())),
    [q]
  )
  const letters = useMemo(() => Array.from(new Set(filtered.map((t) => t.term[0].toUpperCase()))), [filtered])

  return (
    <>
      <Seo title="Glossary — every AI term in plain language" path="/glossary"
        description="68 framework terms, each its own page — written for the non-technical reader, no jargon left undefined." />
      <PageHero
        eyebrow="Glossary · the framework's vocabulary"
        title={<>Every key term, in <span className="text-shimmer">plain language</span>.</>}
        sub="No prior knowledge assumed, no jargon left undefined. Each term is its own page — definitions written for the non-technical reader, linked liberally to the ideas around them."
        accent="#45C3B9"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms…" aria-label="Search glossary terms"
            className="w-full rounded-full border border-hairline bg-ground/60 py-3 pl-11 pr-4 text-sm text-cloud placeholder:text-faint focus:border-gold/60 focus:outline-none" />
        </div>
      </PageHero>

      <Section>
        <p className="mb-8 font-mono text-[11px] uppercase tracking-widest text-faint">{filtered.length} terms</p>
        <div className="space-y-10">
          {letters.map((letter) => (
            <div key={letter} id={`l-${letter}`}>
              <div className="mb-4 flex items-center gap-4">
                <span className="font-display text-2xl font-bold text-gold">{letter}</span>
                <span className="h-px flex-1 bg-hairline/50" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.filter((t) => t.term[0].toUpperCase() === letter).map((t) => (
                  <Link key={t.slug} to={`/glossary/${t.slug}`}
                    className="group rounded-2xl border border-hairline/60 bg-panel/40 p-5 transition hover:-translate-y-0.5 hover:border-gold/40">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-[15px] font-semibold text-cloud group-hover:text-gold">{t.term}</h3>
                      {t.tag && <span className="chip border-hairline text-faint">{t.tag}</span>}
                    </div>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{t.def}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-muted">No terms match "{q}".</p>}
        </div>
      </Section>
      <CTABand />
    </>
  )
}
