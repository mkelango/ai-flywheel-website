import { Link } from 'react-router-dom'
import { Sparkles, Activity, Wrench, Bot, ShieldCheck, BarChart3, Plug, Lock, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { IMG } from '../lib/images'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'

const MODULES = [
  { id: 'diagnostic', icon: Activity, name: 'Diagnostic & Maturity', color: '#45C3B9', tag: 'The free hook', d: 'The self-assessment and Four-Leaks tools — scored, tracked over time. Freemium top-of-funnel; the front door to everything.' },
  { id: 'toolkit', icon: Wrench, name: 'The Digitized Toolkit', color: '#5E92B3', tag: '28 tools', d: 'Fillable, collaborative versions of every template — the Agent Operating Model builder, Success-Definition one-pager, Validation Scorecard, and more.' },
  { id: 'agent', icon: Bot, name: 'Agent Operating Model', color: '#8E86F0', tag: 'Agentic tooling', d: 'Design, govern, and ship agents with a clear operating model — autonomy levels, tool access, and human-in-the-loop checkpoints.' },
  { id: 'governance', icon: ShieldCheck, name: 'CORE Governance Suite', color: '#1FA877', tag: 'Defensible', d: 'Agent accountability register, autonomy-level guide, decision-traceability and observability — governance-as-software for the 2026 bottleneck.' },
  { id: 'benchmark', icon: BarChart3, name: 'Benchmark & Maturity Index', color: '#E6B968', tag: 'The yardstick', d: 'Compare your maturity and ROI against anonymized peers. Own the metric the field is measured against.' },
  { id: 'integrations', icon: Plug, name: 'Integrations', color: '#F0A95E', tag: 'MCP / A2A', d: 'Vendor-neutral by design. Built on open standards — the HTTP of agents — so you swap models and tools without rebuilding.' },
]

export default function Platform() {
  return (
    <>
      <Seo title="The Platform — the framework as software" path="/platform"
        description="Diagnostic, the digitized toolkit, the Agent Operating Model, the CORE governance suite, and a live benchmark. Built on Claude, MCP-first, vendor-neutral." />
      <PageHero
        eyebrow="The platform · built on Claude"
        title={<>The framework, as <span className="text-shimmer">software you run</span> every day.</>}
        sub="The free diagnostic is the front door to a full, MCP-first platform — the digitized toolkit, the Agent Operating Model, the CORE governance suite, and a live maturity benchmark. The diagnostic and the platform are the same product."
        accent="#8E86F0"
        image={IMG.serverHall}
      >
        <div className="flex flex-wrap gap-3">
          <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> Start with the free diagnostic</Btn>
          <Btn to="/pricing" variant="ghost">See pricing</Btn>
        </div>
      </PageHero>

      <Section>
        <Reveal><Heading center eyebrow="The modules" title="Everything you need to turn the wheel." sub="Each module: a real problem, how it's solved, and the proof. Start free, expand as the wheel turns." /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <div id={m.id} className="group flex h-full flex-col rounded-2xl border border-hairline/70 bg-panel/50 p-7 transition hover:-translate-y-1 hover:border-gold/30">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-hairline/60" style={{ background: `${m.color}1a` }}>
                    <m.icon className="h-5 w-5" style={{ color: m.color }} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: m.color }}>{m.tag}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-cloud">{m.name}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Security */}
      <Section id="security" className="border-t border-hairline/40">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <Heading eyebrow="Security & sovereignty" title="Trust-first, by architecture." sub="Disclosed AI involvement, human-in-the-loop, audited. Built for India-first data residency and global compliance." />
            <div className="mt-7 flex flex-wrap gap-3">
              {['SOC 2 path', 'GDPR / DPDP', 'India residency', 'Sovereign deployment', 'Immutable audit log', 'SSO / SCIM / RBAC'].map((b) => (
                <span key={b} className="chip border-hairline text-mist"><Lock className="h-3 w-3" /> {b}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card p-8">
              <ShieldCheck className="h-8 w-8 text-core" />
              <h3 className="mt-4 font-display text-xl font-bold text-cloud">Your data, models & decisions — in your control.</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                No ads. No tracking. Where it matters, your deployment runs in your jurisdiction. Governance & sovereignty is a cross-cutting layer, not an afterthought.
              </p>
              <Link to="/about" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Read the trust story <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
