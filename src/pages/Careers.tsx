import { ArrowRight, Sparkles, ShieldCheck, Globe2, HeartHandshake, Code2, GraduationCap, Landmark, Users2, PenTool } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { Seo, breadcrumbLd } from '../lib/seo'

const VALUES = [
  { icon: ShieldCheck, color: '#1FA877', t: 'Honest, always', d: 'We engage the failure data and never oversell. Verifiable is the differentiator — inside the company too.' },
  { icon: Globe2, color: '#F0A95E', t: 'India-rooted, global', d: 'Built where the work is, for the world. Sovereignty-first, multilingual, mobile-first.' },
  { icon: HeartHandshake, color: '#8E86F0', t: 'Augment, don\'t replace', d: 'We use AI to make our people more capable — human judgment stays in command.' },
  { icon: Sparkles, color: '#E6B968', t: 'Compounding over heroics', d: 'We scale the recipe, not the hero. Each turn should make the next one easier.' },
]

const AREAS = [
  { icon: Code2, color: '#8E86F0', t: 'Engineering', d: 'Build the platform on Claude — diagnostic, agent tooling, governance, benchmark. MCP-first, vendor-neutral.' },
  { icon: GraduationCap, color: '#5E92B3', t: 'Curriculum & certification', d: 'Design the ladder, the exams, and the 90-Day cohort. Own the standard and keep it current.' },
  { icon: Landmark, color: '#F0A95E', t: 'Government & programs', d: 'Lead population-scale workforce programs and sovereign-AI advisory — the Economy Program.' },
  { icon: Users2, color: '#45C3B9', t: 'Partnerships & success', d: 'Grow and enable the certified partner network; make customers succeed and renew.' },
  { icon: PenTool, color: '#E6B968', t: 'Content & research', d: 'The content engine and the State of AI Implementation report — the widest mouth of the funnel and the moat.' },
]

export default function Careers() {
  return (
    <>
      <Seo title="Careers — build the standard with us" path="/careers"
        description="Help build the standard for turning AI into compounding value. India-rooted, ad-free, trust-first. Engineering, curriculum, government programs, partnerships, content."
        jsonLd={breadcrumbLd([['Company', '/about'], ['Careers', '/careers']])} />
      <PageHero eyebrow="Careers · join us" title={<>Build the <span className="text-shimmer">standard</span> with us.</>}
        accent="#1FA877"
        sub="We're a small, honest team building the canonical framework for the agentic era — and the platform, academy, and network around it. If you'd rather prove things than assert them, you'll fit.">
        <Btn to="/contact?type=careers"><Sparkles className="h-4 w-4" /> Introduce yourself</Btn>
      </PageHero>

      {/* Values */}
      <Section>
        <Reveal><Heading center eyebrow="How we work" title="The values, applied to ourselves." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-hairline/70 bg-panel/50 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${v.color}1a` }}><v.icon className="h-5 w-5" style={{ color: v.color }} /></span>
                <h3 className="mt-4 font-display text-[15px] font-semibold text-cloud">{v.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Areas we hire for */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="Where we hire" title="The roles we grow into." sub="We hire deliberately and lean — most delivery comes from the certified partner network, not headcount. These are the areas we build out as the streams come online." /></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-hairline/60 bg-panel/40 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${a.color}1a` }}><a.icon className="h-5 w-5" style={{ color: a.color }} /></span>
                <h3 className="mt-4 font-display text-lg font-bold text-cloud">{a.t}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{a.d}</p>
                <a href="/contact?type=careers" className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:text-gold-light">Express interest <ArrowRight className="h-4 w-4" /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Open application */}
      <Section className="border-t border-hairline/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-hairline/60 bg-gradient-to-br from-steel/40 to-ink p-8 text-center sm:p-12">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-core/10 blur-3xl" />
            <h2 className="h-display mx-auto max-w-2xl text-3xl sm:text-4xl">No open role that fits? Tell us anyway.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted">We'd rather meet the right person early than miss them. Send us what you're great at and where you'd turn the wheel.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Btn to="/contact?type=careers"><Sparkles className="h-4 w-4" /> Introduce yourself</Btn>
              <Btn to="/about" variant="ghost">Read about the standard <ArrowRight className="h-4 w-4" /></Btn>
            </div>
          </div>
        </Reveal>
      </Section>
      <CTABand />
    </>
  )
}
