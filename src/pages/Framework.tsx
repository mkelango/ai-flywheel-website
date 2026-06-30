import { Sparkles, ArrowRight } from 'lucide-react'
import Flywheel from '../components/Flywheel'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { STAGES, DRIVE, CORE, LAYERS } from '../data/content'

const MATURITY = [
  { n: '0', name: 'Ad-hoc', desc: 'Scattered experiments, no data floor, no owner. Most spend leaks here.' },
  { n: '1', name: 'Emerging', desc: 'First generative wins; pilots that impress but rarely ship to production.' },
  { n: '2', name: 'Operational', desc: 'A real data foundation; governed deployments; the wheel turns its first full notch.' },
  { n: '3', name: 'Compounding', desc: 'Agents in production generating fuel for the next turn; DRIVE run repeatably.' },
  { n: '4', name: 'Transformative', desc: 'Physical / embodied frontier; the flywheel is the operating model, not a project.' },
]

export default function Framework() {
  return (
    <>
      <Seo title="The Framework — the AI standard that compounds" path="/framework"
        description="Four stages, the DRIVE method, CORE governance, and two cross-cutting layers — the versioned, governed standard for turning AI into compounding value." />
      <PageHero
        eyebrow="The canonical standard · free"
        title={<>The framework, in full — <span className="text-shimmer">the standard</span> for AI that compounds.</>}
        sub="Not one company's opinion — a versioned, governed, quarterly-refreshed standard. Four stages, the DRIVE method, CORE governance, and two cross-cutting layers. Give it away free; the authority is the moat."
      >
        <div className="flex flex-wrap gap-3">
          <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> Run the free diagnostic</Btn>
          <Btn href="#stages" variant="ghost">Jump to the four stages</Btn>
        </div>
      </PageHero>

      {/* At a glance */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal><Flywheel size={520} className="mx-auto" /></Reveal>
          <Reveal delay={0.1}>
            <Heading eyebrow="At a glance" title="A wheel, not a ladder." sub="A ladder is climbed once and left behind. A flywheel compounds — each stage produces the fuel that accelerates the next, and every turn makes the next one easier." />
            <p className="mt-5 text-[15px] leading-relaxed text-mist">
              Fast wins from Generative justify investment in a real data Foundation. A solid Foundation makes reliable Agents possible. Agents in production generate the telemetry that trains Physical systems. Round it goes — and it feeds backward too: cleaner data, sharper skills, greater trust.
            </p>
            <p className="mt-4 font-serif text-xl italic text-gold-light">The compounding is the product.</p>
          </Reveal>
        </div>
      </Section>

      {/* Four stages */}
      <Section id="stages" className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="① The four stages" title="The wheel that compounds." sub="They are not a menu to pick from — they are a sequence that builds." /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {STAGES.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-hairline/70 bg-panel/50 p-7 transition hover:border-gold/30">
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40" style={{ background: s.color }} />
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl font-display text-lg font-bold text-ground" style={{ background: s.color }}>{s.num}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cloud">{s.name}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: s.color }}>{s.tagline}</span>
                  </div>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">{s.blurb}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-hairline/40 pt-4 font-mono text-[11px] uppercase tracking-wider text-faint">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} /> Where value lives · {s.where}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* DRIVE */}
      <Section id="drive" className="border-t border-hairline/40">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <Heading eyebrow="The operating method" title={<><span className="text-shimmer">DRIVE</span> — the method that turns the wheel.</>} sub="A wheel does not turn itself. DRIVE is the repeatable method you run to move it — at any stage, at any scale. Every turn of the flywheel is one pass through DRIVE." />
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="space-y-3">
              {DRIVE.map((d, i) => (
                <li key={d.letter} className="flex items-start gap-4 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/15 font-display text-base font-bold text-gold">{d.letter}</span>
                  <div>
                    <div className="font-display text-[15px] font-semibold text-cloud">{i + 1}. {d.name}</div>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted">{d.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* CORE */}
      <Section id="core" className="border-t border-hairline/40">
        <Reveal><Heading center eyebrow="The governance discipline" title="CORE — not a brake, the throttle." sub="Speed without control wrecks the machine. CORE is woven through every stage — what earns an organization the right to point AI at high-stakes work." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-core/25 bg-core/[0.04] p-6">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-core/20 font-display text-base font-bold text-core">{c.name[0]}</span>
                <h3 className="mt-4 font-display text-[15px] font-semibold text-cloud">{c.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Layers */}
      <Section id="layers" className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="Cross-cutting layers" title="Two layers run through everything." /></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {LAYERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <div className="card p-7">
                <h3 className="font-display text-lg font-bold text-cloud">{l.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{l.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Maturity model */}
      <Section id="maturity" className="border-t border-hairline/40">
        <Reveal><Heading eyebrow="The maturity model" title="Where are you on the wheel?" sub="Five levels from ad-hoc experiments to the flywheel as your operating model. The diagnostic places you — honestly." /></Reveal>
        <div className="mt-10 grid gap-3 lg:grid-cols-5">
          {MATURITY.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-hairline/60 bg-panel/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-bold text-cloud/30">{m.n}</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: STAGES[Math.min(i, 3)].color }} />
                </div>
                <h3 className="mt-2 font-display text-[15px] font-semibold text-cloud">{m.name}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The Gap — thesis */}
      <Section id="gap" className="border-t border-hairline/40">
        <div className="relative overflow-hidden rounded-3xl border border-hairline/60 bg-gradient-to-br from-steel/40 to-ink p-8 sm:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-physical/10 blur-3xl" />
          <Reveal>
            <span className="chip border-physical/40 text-physical">The thesis</span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-cloud sm:text-4xl">The Implementation Gap</h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mist">
              The gap between AI's promise and its delivered value is not a model problem — it's an implementation problem. Organizations install tools without redesigning work, skip the data floor, govern nothing, and never measure honestly. This is the most-cited, most-shareable page of the framework — because it engages the failure data instead of hiding from it.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
              In a market full of inflated AI claims, <span className="text-gold-light">verifiable is the differentiator.</span> The whole framework exists to close this gap — and to prove the close with real measurement.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn to="/report">Read the State of AI Implementation <ArrowRight className="h-4 w-4" /></Btn>
              <Btn to="/diagnostic" variant="ghost">Measure your own gap</Btn>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
