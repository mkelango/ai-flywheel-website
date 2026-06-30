import { useLocation, Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Btn } from '../lib/primitives'
import { Seo, breadcrumbLd } from '../lib/seo'
import { findLegal, LEGAL } from '../data/legal'

export default function Legal() {
  const slug = useLocation().pathname.replace(/^\//, '')
  const doc = findLegal(slug)
  if (!doc) return <Section className="pt-32 text-center"><h1 className="h-display text-3xl">Page not found</h1><div className="mt-6"><Btn to="/about">Back to About</Btn></div></Section>

  return (
    <>
      <Seo title={doc.title} description={doc.intro.slice(0, 155)} path={`/${doc.slug}`}
        jsonLd={breadcrumbLd([['Trust', '/about'], [doc.title, `/${doc.slug}`]])} />
      <PageHero eyebrow={doc.eyebrow} title={doc.title} sub={doc.intro} accent="#1FA877">
        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">Last updated {doc.updated}</p>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_3fr]">
          {/* side nav */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">Trust &amp; legal</p>
            <ul className="space-y-1.5">
              {LEGAL.map((d) => (
                <li key={d.slug}>
                  <Link to={`/${d.slug}`} className={`text-[14px] transition ${d.slug === doc.slug ? 'font-semibold text-gold' : 'text-mist hover:text-gold'}`}>{d.title}</Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* content */}
          <div className="max-w-2xl space-y-9">
            {doc.sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-xl font-bold text-cloud">{s.h}</h2>
                <ul className="mt-3 space-y-2.5">
                  {s.body.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold/70" />{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex items-start gap-2.5 rounded-xl border border-hairline/60 bg-panel/40 p-4 text-[12.5px] text-faint">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              This is a plain-language policy draft for the launch site. Have it reviewed by counsel and localized for each jurisdiction before relying on it.
            </div>
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
