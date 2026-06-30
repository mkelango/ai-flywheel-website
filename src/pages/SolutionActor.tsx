import { useParams, Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { Seo } from '../lib/seo'

interface ActorData {
  label: string; accent: string; eyebrow: string
  title: string; sub: string
  why: string; stagePath: string[]
  outcomes: string[]; proof: string; cta: string; ctaTo: string
  pillars?: { t: string; d: string }[]
}

const DATA: Record<string, ActorData> = {
  business: {
    label: 'For Business', accent: '#45C3B9', eyebrow: 'Solutions · for business',
    title: 'From pilots to compounding advantage.',
    sub: 'Startup to unicorn to decacorn — stop buying tools and start turning the wheel. The first agent should pay for the programme; every turn after gets cheaper.',
    why: 'Most companies are stuck at table-stakes generative AI — a commodity. Durable advantage now lives in agentic systems built on an owned data foundation, governed by CORE. The flywheel is how you get there without burning the budget.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Physical'],
    outcomes: ['A scored maturity baseline and a 90-day roadmap', 'A redesigned workflow — not a bolted-on tool', 'Your first governed agent in production', 'A repeatable DRIVE cadence your teams own'],
    proof: 'Actor-matched case studies, the State of AI Implementation report, and a public maturity benchmark.',
    cta: 'Run the free diagnostic', ctaTo: '/diagnostic',
  },
  government: {
    label: 'For Government', accent: '#F0A95E', eyebrow: 'Solutions · the economy program',
    title: 'Sovereign AI, citizen services, and jobs — at population scale.',
    sub: 'The Tamil Nadu / India flagship, productized and replicable. Workforce, industrial productivity, and sovereignty — aligned to IndiaAI, grounded in honest delivery.',
    why: 'An economy is the flywheel at its largest scale: capability → compute → deployment → value → reinvestment. We help states and nations design the engine, train the workforce, and deploy multilingual, agentic public services — sovereignty-first.',
    stagePath: ['Workforce', 'Foundation', 'Agentic services', 'Physical / industry'],
    outcomes: ['A population-scale workforce-training program (co-funded where possible)', 'Sovereign-AI architecture and governance', 'Multilingual citizen-service deployments via partners', 'An exportable, master-licensable model'],
    proof: 'IndiaAI / state alignment, sovereign-AI advisory credentials, audited outcomes.',
    cta: 'Talk to the programs team', ctaTo: '/contact?type=government',
    pillars: [
      { t: 'Workforce', d: 'Train tens of thousands of practitioners — the 50,000 target — under co-funded programs.' },
      { t: 'Industry & Physical AI', d: 'Manufacturing productivity and the embodied frontier — the largest economic lever.' },
      { t: 'Sovereignty', d: 'Governed, in-jurisdiction deployment of data, models, and decisions.' },
    ],
  },
  institutions: {
    label: 'For Institutions', accent: '#8E86F0', eyebrow: 'Solutions · for institutions',
    title: 'Mission impact per dollar — proven.',
    sub: 'Universities, healthcare, and nonprofits run the same wheel as enterprises — with mission, not margin, as the measure. We help you prove impact honestly.',
    why: 'Institutions face the sharpest version of the implementation gap: high stakes, tight budgets, and a duty of care. CORE governance and honest validation are not optional here — they are the whole point.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Governed scale'],
    outcomes: ['A maturity baseline tied to mission outcomes', 'CORE governance for high-stakes, regulated work', 'A roadmap your board and funders can trust', 'Credential pathways for your people'],
    proof: 'Institution-matched case studies and an academic-grade evidence base.',
    cta: 'Run the free diagnostic', ctaTo: '/diagnostic',
  },
  teams: {
    label: 'For Teams', accent: '#5E92B3', eyebrow: 'Solutions · for teams',
    title: 'The smallest unit of the flywheel.',
    sub: 'Every transformation starts with one team turning one workflow one notch. The diagnostic, the toolkit, and the Team tier are built for exactly that first turn.',
    why: 'You don\'t need a transformation office to start. You need one workflow, the data-readiness gate, a redesign, and honest measurement. Do that once and you have proof — proof is what unlocks the next turn.',
    stagePath: ['Diagnose one workflow', 'Redesign', 'Validate', 'Expand'],
    outcomes: ['A free diagnostic and a clear first opportunity', 'The digitized toolkit for your team', 'A redesigned, measured workflow', 'A case you can take to leadership'],
    proof: 'The free diagnostic, the toolkit samples, and team-tier benchmarking.',
    cta: 'Run the free diagnostic', ctaTo: '/diagnostic',
  },
}

export default function SolutionActor() {
  const { actor = '' } = useParams()
  const d = DATA[actor]
  if (!d) {
    return (
      <Section className="pt-32 text-center">
        <Heading center title="Not found" sub="That actor doesn't exist yet." />
        <div className="mt-6"><Btn to="/solutions">Back to Solutions</Btn></div>
      </Section>
    )
  }
  return (
    <>
      <Seo title={`${d.label} — The AI Flywheel`} description={d.sub.slice(0, 155)} path={`/solutions/${actor}`} />
      <PageHero eyebrow={d.eyebrow} title={d.title} sub={d.sub} accent={d.accent}
        crumbs={[['Solutions', '/solutions'], [d.label, `/solutions/${actor}`]]}>
        <div className="flex flex-wrap gap-3">
          <Btn to={d.ctaTo}><Sparkles className="h-4 w-4" /> {d.cta}</Btn>
          <Btn to="/framework" variant="ghost">Explore the framework</Btn>
        </div>
      </PageHero>

      {/* Why */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal><Heading eyebrow="Why the flywheel" title="The shift that matters for you." /></Reveal>
          <Reveal delay={0.1}><p className="text-[16px] leading-relaxed text-mist">{d.why}</p></Reveal>
        </div>
      </Section>

      {/* Stage path */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="Your stage path" title="Where the wheel turns for you." /></Reveal>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          {d.stagePath.map((s, i) => (
            <Reveal key={s} delay={i * 0.06}>
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-hairline/70 bg-panel/60 px-5 py-3 font-display text-[15px] font-semibold text-cloud">{s}</span>
                {i < d.stagePath.length - 1 && <ArrowRight className="h-4 w-4 text-gold" />}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pillars (gov only) */}
      {d.pillars && (
        <Section className="border-t border-hairline/40">
          <Reveal><Heading eyebrow="The three pillars" title="How an economy turns the wheel." /></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {d.pillars.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-hairline/70 bg-panel/50 p-7">
                  <span className="block h-1 w-10 rounded-full" style={{ background: d.accent }} />
                  <h3 className="mt-4 font-display text-lg font-bold text-cloud">{p.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Outcomes + proof */}
      <Section className="border-t border-hairline/40">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <Heading eyebrow="What you walk away with" title="Outcomes, not slideware." />
            <ul className="mt-7 space-y-3">
              {d.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-4">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: `${d.accent}22` }}>
                    <Check className="h-3.5 w-3.5" style={{ color: d.accent }} />
                  </span>
                  <span className="text-[14px] text-mist">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-8">
              <span className="chip border-gold/40 text-gold">Proof</span>
              <p className="mt-5 font-serif text-xl leading-relaxed text-mist">{d.proof}</p>
              <p className="mt-6 text-[13px] text-muted">Never a claim without evidence. In a market full of inflated AI claims, verifiable is the differentiator.</p>
              <div className="mt-7"><Btn to={d.ctaTo} sm>{d.cta} <ArrowRight className="h-4 w-4" /></Btn></div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
