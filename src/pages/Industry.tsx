import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { findIndustry, INDUSTRIES } from '../data/industries'
import { Seo, breadcrumbLd } from '../lib/seo'
import { IMG } from '../lib/images'

// A relevant framed photo in the hero, by industry.
const HERO_IMG: Record<string, typeof IMG[keyof typeof IMG]> = {
  manufacturing: IMG.factoryFloor,
  healthcare: IMG.pharmaLab,
  bfsi: IMG.analytics,
  retail: IMG.warehouse,
  telecom: IMG.serverHall,
  energy: IMG.robotArm,
  'public-sector': IMG.enterpriseOffice,
}

export default function Industry() {
  const { slug = '' } = useParams()
  const ind = findIndustry(slug)
  if (!ind) return <Section className="pt-32 text-center"><h1 className="h-display text-3xl">Industry not found</h1><div className="mt-6"><Btn to="/solutions">All solutions</Btn></div></Section>
  const hero = HERO_IMG[ind.slug]

  return (
    <>
      <Seo title={`AI in ${ind.name} — implementation playbook`} description={ind.intro.slice(0, 155)} path={`/industries/${ind.slug}`}
        jsonLd={breadcrumbLd([['Solutions', '/solutions'], [ind.name, `/industries/${ind.slug}`]])} />
      <PageHero eyebrow={`Industry · ${ind.name}`} title={ind.tagline} sub={ind.intro} accent={ind.accent}
        image={hero}
        crumbs={[['Solutions', '/solutions'], ['Industries', '/solutions'], [ind.name, `/industries/${ind.slug}`]]}>
        <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> Run the free diagnostic</Btn>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <Heading eyebrow="Start here" title="Your likely first turn." />
              <p className="mt-4 rounded-2xl border p-5 text-[15px] text-mist" style={{ borderColor: `${ind.accent}55`, background: `${ind.accent}0d` }}>{ind.startHere}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-10 mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">Where the wheel turns</h3>
              <div className="flex flex-wrap items-center gap-3">
                {ind.stagePath.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="rounded-xl border border-hairline/70 bg-panel/50 px-4 py-2.5 font-display text-[14px] font-semibold text-cloud">{s}</span>
                    {i < ind.stagePath.length - 1 && <ArrowRight className="h-4 w-4 text-gold" />}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <h3 className="mt-10 mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">Where it pays off</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {ind.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-2.5 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-3.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ind.accent }} /><span className="text-[13.5px] text-mist">{u}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <aside className="space-y-5">
              <div className="card p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-core">Governance</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{ind.governance}</p>
              </div>
              <div className="card p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Other sectors</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {INDUSTRIES.filter((x) => x.slug !== ind.slug).slice(0, 6).map((x) => (
                    <Link key={x.slug} to={`/industries/${x.slug}`} className="rounded-full border border-hairline/70 px-3 py-1.5 text-[12px] text-mist transition hover:border-gold/40 hover:text-gold">{x.name}</Link>
                  ))}
                </div>
              </div>
              <Btn to="/diagnostic" className="w-full">Find your blue dot <ArrowRight className="h-4 w-4" /></Btn>
            </aside>
          </Reveal>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
