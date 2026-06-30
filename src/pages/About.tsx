import { Sparkles, ShieldCheck, RefreshCw, Globe2, HeartHandshake } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { REVENUE_ROLES } from '../data/content'
import { IMG } from '../lib/images'

export default function About() {
  return (
    <>
      <Seo title="About — The Standard" path="/about"
        description="Not one company's opinion — a governed, versioned, quarterly-refreshed standard. India-rooted, built for the world. Ad-free, trust-first, audited." />
      <PageHero
        eyebrow="About · the standard"
        title={<>Not one company's opinion. <span className="text-shimmer">A standard.</span></>}
        sub="The AI Flywheel is governed, versioned, and quarterly-refreshed — ITIL / PMI / SAFe energy for the agentic era. India-rooted, built for the world. Ad-free, human-in-the-loop, audited."
        accent="#1FA877"
        image={IMG.enterpriseOffice}
      >
        <p className="font-serif text-xl italic text-gold-light">"Add 1. Become the one."</p>
      </PageHero>

      {/* Principles */}
      <Section>
        <Reveal><Heading center eyebrow="What we stand for" title="The commitments behind the standard." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, color: '#1FA877', t: 'Honest & proof-led', d: 'We engage the failure data and never oversell. Verifiable is the differentiator.' },
            { icon: RefreshCw, color: '#45C3B9', t: 'Alive & versioned', d: 'A quarterly refresh keeps the standard current as the model layer moves in weeks.' },
            { icon: Globe2, color: '#F0A95E', t: 'Sovereign by design', d: 'India data residency, DPDP / GDPR, sovereign deployment where it matters.' },
            { icon: HeartHandshake, color: '#8E86F0', t: 'Human-in-the-loop', d: 'Disclosed AI involvement, augmentation over replacement, a named owner for every system.' },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-hairline/70 bg-panel/50 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${p.color}1a` }}><p.icon className="h-5 w-5" style={{ color: p.color }} /></span>
                <h3 className="mt-4 font-display text-[15px] font-semibold text-cloud">{p.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it compounds — revenue/flywheel roles */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="The model, honestly" title="One framework, many streams." sub="We don't run separate businesses — we engineer the handoffs so each turn funds the next. The compounding is the product." /></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVENUE_ROLES.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-hairline/70 bg-panel/50 p-6">
                <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: r.color }}>{r.tag}</span>
                <h3 className="mt-2 font-display text-base font-bold text-cloud">{r.name}</h3>
                <p className="mt-2 font-mono text-[12px] text-mist">{r.body}</p>
                <p className="mt-2 text-[12.5px] text-muted">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Mission statement */}
      <Section className="border-t border-hairline/40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-hairline/60 bg-gradient-to-br from-steel/40 to-ink p-8 sm:p-14">
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-core/10 blur-3xl" />
            <div className="relative">
            <p className="eyebrow">The mission</p>
            <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold leading-snug text-cloud sm:text-3xl">
              To make AI pay off — for a team, an enterprise, an institution, and an economy — by giving the world a standard it can trust, and proving every claim with data.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
              The framework is given away free because authority is the moat. The platform, the certification, the partner network, and the data are how it sustains itself — each turn lowering the cost of the next. One framework, three scales, four actors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> Run the free diagnostic</Btn>
              <Btn to="/framework" variant="ghost">Read the framework</Btn>
            </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTABand />
    </>
  )
}
