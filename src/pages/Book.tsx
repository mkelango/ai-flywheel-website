import { BookOpen, Headphones, Smartphone, Quote, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'

const PATHS = [
  { actor: 'The executive', color: '#45C3B9', chapters: '1–3 · 8 · 18 · 14', desc: 'The paradox, the machine, the compounding engine, then your business and governance.' },
  { actor: 'The policymaker', color: '#F0A95E', chapters: '1 · 19 · 21 · 15', desc: 'The gap, the flywheel for government and economies, and sovereignty.' },
  { actor: 'The institution leader', color: '#8E86F0', chapters: '1 · 3 · 20 · 14', desc: 'The argument, the anatomy, the flywheel for institutions, and trust.' },
  { actor: 'The practitioner', color: '#5E92B3', chapters: '4–7 · 9–13 · 22', desc: 'The four stages, the full DRIVE method, then the 90-day start.' },
]

const PARTS = [
  { part: 'Part I', title: 'The Argument', chapters: ['The Great AI Paradox', 'From Tools to Flywheels', 'The Anatomy of the Flywheel'] },
  { part: 'Part II', title: 'The Four Stages', chapters: ['Foundation AI — The Floor', 'Generative AI — Table Stakes', 'Agentic AI — The Value Frontier', 'Physical AI — The Industrial Frontier', 'The Compounding Engine'] },
  { part: 'Part III', title: 'The DRIVE Method', chapters: ['Diagnose', 'Resource', 'Implement', 'Validate', 'Expand'] },
  { part: 'Part IV', title: 'CORE Governance', chapters: ['Why Governance Is the Unlock', 'Compliance, Fairness & Sovereignty', 'Transparency & Accountability', 'Safety, Autonomy & Human Agency'] },
  { part: 'Part V', title: 'The Four Actors', chapters: ['The Flywheel for Businesses', 'For Government', 'For Institutions', 'For Economies'] },
  { part: 'Part VI', title: 'Start', chapters: ['The 90-Day Flywheel Start', 'The Maturity Model & Self-Assessment', 'The Future Flywheel'] },
]

export default function Book() {
  return (
    <>
      <Seo title="The Book — The AI Flywheel" path="/book"
        description="The whole argument in one place — four reading paths, twenty-four chapters, a free excerpt, and the formats." />
      <PageHero
        eyebrow="The book · the front door"
        title={<>The AI <span className="text-shimmer">Flywheel</span>.</>}
        sub="The whole argument in one place — four stages, the DRIVE method, CORE governance, at three scales. Four reading paths so the executive, the policymaker, the institution leader, and the practitioner each find their route."
        accent="#E6B968"
      >
        <div className="flex flex-wrap gap-3">
          <Btn to="/diagnostic">Run the free diagnostic <ArrowRight className="h-4 w-4" /></Btn>
          <Btn href="/downloads/AI-Flywheel-At-a-Glance.md" variant="ghost">Read the free excerpt</Btn>
        </div>
      </PageHero>

      {/* Excerpt */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border border-hairline/60 bg-gradient-to-br from-steel to-ink p-8 shadow-lift">
              <div className="absolute inset-0 grid-texture opacity-30" />
              <div className="relative flex h-full flex-col justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The standard</span>
                <div>
                  <h3 className="font-display text-3xl font-bold leading-tight text-cloud">The AI<br /><span className="text-shimmer">Flywheel</span></h3>
                  <p className="mt-3 text-[12px] text-muted">Turn AI into compounding value — at any scale.</p>
                </div>
                <span className="font-serif text-sm italic text-gold-light">"Add 1. Become the one."</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="h-8 w-8 text-gold/60" />
            <p className="mt-4 font-serif text-xl leading-relaxed text-mist">
              "A ladder is climbed once, rung by rung, and left behind. A flywheel compounds. That is the difference between the organizations that waste their AI budgets and the few that turn them into lasting advantage. Each stage produces the fuel that accelerates the next — and the wheel feeds backward too. The value is not a prize you collect once. The compounding is the product."
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-faint">— from The AI Flywheel at a Glance</p>
          </Reveal>
        </div>
      </Section>

      {/* Reading paths */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="Four reading paths" title="Read it your way." sub="One framework, four routes. Each actor gets the shortest path to their own decision." /></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((p, i) => (
            <Reveal key={p.actor} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-hairline/60 bg-panel/40 p-6">
                <span className="block h-1 w-10 rounded-full" style={{ background: p.color }} />
                <h3 className="mt-4 font-display text-lg font-bold text-cloud">{p.actor}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-faint">Chapters {p.chapters}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Contents */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="Contents" title="Twenty-four chapters, six parts." /></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PARTS.map((part, i) => (
            <Reveal key={part.part} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-hairline/60 bg-panel/40 p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-gold">{part.part}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-cloud">{part.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {part.chapters.map((ch) => <li key={ch} className="text-[13px] text-muted">· {ch}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Formats */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading center eyebrow="Formats" title="However you read." /></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { icon: BookOpen, t: 'Hardcover & ebook', d: 'The full framework, with every diagram and the complete toolkit.' },
            { icon: Headphones, t: 'Audiobook', d: 'The argument narrated — for the commute and the long flight.' },
            { icon: Smartphone, t: 'Field-guide & bulk', d: 'Enterprise and government editions for teams, and translations including Tamil.' },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-hairline/60 bg-panel/40 p-7 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gold/12"><f.icon className="h-6 w-6 text-gold" /></span>
                <h3 className="mt-4 font-display text-base font-semibold text-cloud">{f.t}</h3>
                <p className="mt-2 text-[13px] text-muted">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  )
}
