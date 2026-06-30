import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, ShieldCheck, Activity, GraduationCap, Boxes, Users2, Quote } from 'lucide-react'
import Flywheel from '../components/Flywheel'
import CTABand from '../components/CTABand'
import { Section, Heading, Reveal, Btn, ArrowLink } from '../lib/primitives'
import { Seo, orgLd } from '../lib/seo'
import { useI18n } from '../lib/i18n'
import { STAGES, DRIVE, CORE, ACTORS, STATS } from '../data/content'

export default function Home() {
  const { t } = useI18n()
  return (
    <>
      <Seo jsonLd={orgLd()} />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
        <div className="grid-texture absolute inset-0 opacity-[0.35]" />
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-foundation/10 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-agentic/10 blur-[140px]" />
        <div className="container-x relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="chip border-gold/30 bg-gold/5 text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t('hero.badge')}
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-tightest text-cloud sm:text-5xl lg:text-[3.7rem]">
                {t('hero.titleA')}<span className="text-shimmer">{t('hero.titleHi')}</span>{t('hero.titleB')}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {t('hero.sub')}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> {t('cta.diagnostic')}</Btn>
                <Btn to="/framework" variant="ghost">{t('cta.explore')} <ArrowRight className="h-4 w-4" /></Btn>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-faint">
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-core" /> {t('hero.t1')}</span>
                <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-foundation" /> {t('hero.t2')}</span>
                <span className="flex items-center gap-2"><Boxes className="h-4 w-4 text-agentic" /> {t('hero.t3')}</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-gold/5 blur-3xl" />
            <Flywheel size={560} />
          </motion.div>
        </div>

        {/* stat band */}
        <div className="container-x relative mt-12">
          <div className="grid grid-cols-2 divide-x divide-hairline/40 rounded-2xl border border-hairline/60 bg-panel/50 backdrop-blur lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-6">
                <div className="font-display text-2xl font-bold text-cloud sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[12.5px] leading-snug text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM, HONESTLY ────────────────────────────── */}
      <Section className="border-t border-hairline/40">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Heading
              eyebrow="The implementation gap"
              title={<>Most AI budgets don't compound. <span className="text-muted">They evaporate.</span></>}
              sub="The problem was never the models — it's that organizations install tools without redesigning the work, skip the data floor, and never prove the value honestly. The AI Flywheel is the engineering discipline that closes that gap."
            />
            <div className="mt-7">
              <ArrowLink to="/framework#gap">Read the thesis — The Implementation Gap</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Pilots that never ship', 'Demos impress; production never arrives because the workflow was never redesigned.'],
                ['Building on sand', 'Generative wins on top of an unowned, messy data foundation can\'t be trusted at stake.'],
                ['Stuck at table stakes', 'Everyone stops at chat and drafting — a commodity — and never reaches agents that act.'],
                ['Claims without proof', 'Inflated numbers, no measurement. In this market, verifiable is the differentiator.'],
              ].map(([t, d], i) => (
                <div key={t} className="card p-5 lift-hover">
                  <div className="font-mono text-xs text-gold">0{i + 1}</div>
                  <h3 className="mt-2 font-display text-base font-semibold text-cloud">{t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── FOUR-ACTOR SELECTOR ──────────────────────────────── */}
      <Section tone="mist">
        <Reveal><Heading center eyebrow="One framework · four actors" title="Find yourself in the flywheel." sub="The same machine runs at every scale. Choose where you stand — we'll route you to the right next turn." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ACTORS.map((a, i) => (
            <Reveal key={a.key} delay={i * 0.07}>
              <Link to={a.href} className="group block h-full overflow-hidden rounded-2xl border border-hairline/70 bg-panel/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lift">
                <span className="block h-1 w-10 rounded-full" style={{ background: a.accent }} />
                <h3 className="mt-5 font-display text-xl font-bold text-cloud">{a.label}</h3>
                <p className="mt-2 font-serif text-[15px] italic text-mist">"{a.question}"</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{a.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold opacity-0 transition group-hover:opacity-100">
                  See the path <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── FRAMEWORK IN 30 SECONDS ──────────────────────────── */}
      <Section tone="dark">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <Flywheel size={520} className="mx-auto" />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <Heading eyebrow="The framework in 30 seconds" title="Four stages. One method. One discipline." />
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Read it as a sentence: <span className="text-mist">the four stages compound into a flywheel; DRIVE turns it; CORE keeps it trustworthy; interoperability and sovereignty let it spin freely and stay yours.</span>
            </p>
            <div className="mt-7 space-y-3">
              {STAGES.map((s) => (
                <div key={s.key} className="flex items-start gap-3.5 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-3.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-[12px] font-bold text-ground" style={{ background: s.color }}>{s.num}</span>
                  <div>
                    <span className="font-display text-[15px] font-semibold text-cloud">{s.name}</span>
                    <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-faint">{s.tagline}</span>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{s.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gold/25 bg-gold/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-gold">DRIVE · the method</p>
                <p className="mt-2 text-[13px] text-muted">{DRIVE.map((d) => d.name).join(' · ')}</p>
              </div>
              <div className="rounded-xl border border-core/25 bg-core/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-core">CORE · the governance</p>
                <p className="mt-2 text-[13px] text-muted">{CORE.map((c) => c.name.split(' ')[0]).join(' · ')}</p>
              </div>
            </div>
            <div className="mt-7"><ArrowLink to="/framework">Go deep on the framework</ArrowLink></div>
          </Reveal>
        </div>
      </Section>

      {/* ── PROOF ────────────────────────────────────────────── */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading center eyebrow="Proof, not promises" title="We engage the failure data — then beat it, honestly." sub="Never a claim without evidence. Audited case studies, original research, and a public benchmark." /></Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="card h-full p-7 lift-hover">
              <Quote className="h-7 w-7 text-gold/70" />
              <p className="mt-4 font-serif text-lg leading-relaxed text-mist">
                "We stopped buying tools and started turning the wheel. The first agent paid for the whole programme — and every turn since has been cheaper."
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-hairline/40 pt-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-generative/20 font-display text-sm font-bold text-generative">M</div>
                <div className="text-[13px]"><div className="font-semibold text-cloud">Head of AI, mid-market manufacturer</div><div className="text-faint">Composite, illustrative</div></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Link to="/report" className="card flex h-full flex-col justify-between p-7 lift-hover">
              <div>
                <span className="chip border-gold/40 text-gold">Flagship research</span>
                <h3 className="mt-4 font-display text-xl font-bold text-cloud">State of AI Implementation</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">Our annual report, built from platform and assessment data — the most-cited yardstick in the field. Ungated summary, gated full report.</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Get the report <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>
          <Reveal delay={0.16}>
            <Link to="/case-studies" className="card flex h-full flex-col justify-between p-7 lift-hover">
              <div>
                <span className="chip border-foundation/40 text-foundation">Flywheel in action</span>
                <h3 className="mt-4 font-display text-xl font-bold text-cloud">Case studies</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">Filterable by actor and by stage — the proof library that shows the wheel turning across industries and scales.</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Browse the library <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── START HERE BY GOAL ───────────────────────────────── */}
      <Section tone="mist">
        <Reveal><Heading center eyebrow="The paths" title="Start here — by what you want next." /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Activity, label: 'Diagnose', desc: 'Run the free diagnostic and find your blue dot.', to: '/diagnostic', color: '#45C3B9' },
            { icon: GraduationCap, label: 'Learn', desc: 'The Academy and the 90-Day Flywheel Start.', to: '/academy', color: '#5E92B3' },
            { icon: ShieldCheck, label: 'Certify', desc: 'The certification ladder — own the scarce skill.', to: '/academy#ladder', color: '#8E86F0' },
            { icon: Boxes, label: 'Build', desc: 'The platform — diagnostic, toolkit, governance.', to: '/platform', color: '#F0A95E' },
            { icon: Users2, label: 'Partner', desc: 'Join the certified ecosystem that delivers.', to: '/about', color: '#E6B968' },
          ].map((p, i) => (
            <Reveal key={p.label} delay={i * 0.06}>
              <Link to={p.to} className="group flex h-full flex-col rounded-2xl border border-hairline/70 bg-panel/50 p-6 transition-all hover:-translate-y-1 hover:border-gold/40">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-hairline/60" style={{ background: `${p.color}1a` }}>
                  <p.icon className="h-5 w-5" style={{ color: p.color }} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-cloud">{p.label}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{p.desc}</p>
                <ArrowRight className="mt-4 h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── PLATFORM TEASER + BOOK ───────────────────────────── */}
      <Section className="border-t border-hairline/40">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-hairline/60 bg-gradient-to-br from-steel/50 to-ink p-8 sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-agentic/15 blur-3xl" />
              <span className="chip border-agentic/40 text-agentic">The platform · built on Claude</span>
              <h3 className="mt-5 font-display text-2xl font-bold text-cloud sm:text-3xl">The framework, as software you run every day.</h3>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-muted">
                The free diagnostic is the front door to a full platform — the digitized toolkit, the Agent Operating Model builder, the CORE governance suite, and a live maturity benchmark. MCP-first and vendor-neutral.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn to="/platform" sm>Explore the platform</Btn>
                <Btn to="/pricing" variant="ghost" sm>See pricing</Btn>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {['Diagnostic', 'Toolkit', 'Governance'].map((m) => (
                  <div key={m} className="rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] py-3 font-mono text-[11px] uppercase tracking-wider text-mist">{m}</div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/book" className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-hairline/60 bg-gradient-to-b from-panel to-ink p-8 lift-hover">
              <div>
                <span className="chip border-gold/40 text-gold">The book · the front door</span>
                <h3 className="mt-5 font-display text-2xl font-bold text-cloud">The AI Flywheel</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">The whole argument in one place — four reading paths for the executive, the policymaker, the institution leader, and the practitioner.</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">About the book <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
