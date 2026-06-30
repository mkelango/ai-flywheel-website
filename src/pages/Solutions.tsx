import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal } from '../lib/primitives'
import { ACTORS } from '../data/content'
import { INDUSTRIES } from '../data/industries'

export default function Solutions() {
  return (
    <>
      <Seo title="Solutions — one framework, four actors" path="/solutions"
        description="Business, government, institutions, and teams — see yourself in the flywheel and route to your next turn. Plus sector playbooks by industry." />
      <PageHero
        eyebrow="Solutions · who we serve"
        title={<>One framework. <span className="text-shimmer">Four actors.</span> See yourself.</>}
        sub="The same flywheel runs at every scale — a team turning one notch, an enterprise of meshing gears, an economy as the engine of growth. Pick where you stand and route to your next turn."
        accent="#45C3B9"
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {ACTORS.map((a, i) => (
            <Reveal key={a.key} delay={i * 0.07}>
              <Link to={a.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline/70 bg-panel/60 p-7 transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift">
                <span className="block h-1.5 w-12 rounded-full" style={{ background: a.accent }} />
                <h3 className="mt-5 font-display text-2xl font-bold text-cloud">{a.label}</h3>
                <p className="mt-2 font-serif text-lg italic text-mist">"{a.question}"</p>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">{a.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Explore the path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="By industry" title="Sector playbooks." sub="A DRIVE + CORE playbook per vertical — the likely first turn, the stage path, where it pays off, and the governance that matters." /></Reveal>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 0.04}>
              <Link to={`/industries/${ind.slug}`} className="group flex h-full flex-col rounded-2xl border border-hairline/70 bg-panel/50 p-6 transition hover:-translate-y-1 hover:border-gold/40">
                <span className="block h-1 w-10 rounded-full" style={{ background: ind.accent }} />
                <h3 className="mt-4 font-display text-lg font-bold text-cloud group-hover:text-gold">{ind.name}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{ind.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold">Open the playbook <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
