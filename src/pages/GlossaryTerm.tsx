import { useParams, Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Btn } from '../lib/primitives'
import { findTerm, termSlug, GLOSSARY } from '../data/glossary'
import { Seo, breadcrumbLd } from '../lib/seo'

export default function GlossaryTerm() {
  const { slug = '' } = useParams()
  const t = findTerm(slug)
  if (!t) {
    return (
      <Section className="pt-32 text-center">
        <h1 className="h-display text-3xl">Term not found</h1>
        <div className="mt-6"><Btn to="/glossary">Back to the glossary</Btn></div>
      </Section>
    )
  }
  const related = (t.related || []).map((name) => GLOSSARY.find((x) => x.slug === termSlug(name))).filter(Boolean) as typeof GLOSSARY

  const cleanName = t.term.replace(/\s*\(.*?\)/g, '')
  return (
    <>
      <Seo
        title={`${cleanName} — AI Flywheel glossary`}
        description={t.def.slice(0, 155)}
        path={`/glossary/${t.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'DefinedTerm', name: t.term, description: t.def, inDefinedTermSet: 'The AI Flywheel Glossary' },
          breadcrumbLd([['Resources', '/resources'], ['Glossary', '/glossary'], [cleanName, `/glossary/${t.slug}`]]),
        ]}
      />
      <PageHero eyebrow={`Glossary${t.tag ? ' · ' + t.tag : ''}`} title={t.term} accent="#45C3B9"
        crumbs={[['Resources', '/resources'], ['Glossary', '/glossary'], [t.term.replace(/\s*\(.*?\)/g, ''), `/glossary/${t.slug}`]]} />
      <Section>
        <div className="max-w-3xl">
          <p className="font-serif text-xl leading-relaxed text-mist">{t.def}</p>

          {related.length > 0 && (
            <div className="mt-10">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">Related terms</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} to={`/glossary/${r.slug}`} className="group flex items-center justify-between rounded-xl border border-hairline/60 bg-panel/40 px-4 py-3 transition hover:border-gold/40">
                    <span className="text-[14px] text-mist group-hover:text-gold">{r.term}</span>
                    <ArrowRight className="h-4 w-4 text-faint transition group-hover:translate-x-1 group-hover:text-gold" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Btn to="/diagnostic">Run the free diagnostic <ArrowRight className="h-4 w-4" /></Btn>
            <Link to="/glossary" className="inline-flex items-center gap-1.5 text-sm text-faint transition hover:text-cloud"><ArrowLeft className="h-4 w-4" /> All terms</Link>
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
