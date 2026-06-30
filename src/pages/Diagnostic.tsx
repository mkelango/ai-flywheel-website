import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles, ShieldCheck, GraduationCap, Boxes, Loader2 } from 'lucide-react'
import { api } from '../lib/api'
import { track } from '../lib/analytics'
import { Seo } from '../lib/seo'

interface Q { id: string; dim: string; q: string; help: string; options: { label: string; score: number }[] }

const QUESTIONS: Q[] = [
  {
    id: 'foundation', dim: 'Foundation', q: 'How ready and owned is the data your AI would run on?',
    help: 'The floor everything stands on.',
    options: [
      { label: 'Scattered, messy, mostly inaccessible', score: 0 },
      { label: 'Some clean sources, lots of gaps', score: 1 },
      { label: 'A governed, accessible data foundation', score: 2 },
      { label: 'Real-time, owned, feeding models in production', score: 3 },
    ],
  },
  {
    id: 'generative', dim: 'Generative', q: 'Where has AI delivered value so far?',
    help: 'Table stakes — where almost everyone starts.',
    options: [
      { label: 'Nowhere repeatable yet', score: 0 },
      { label: 'Ad-hoc drafting / chat by individuals', score: 1 },
      { label: 'Generative built into a few real workflows', score: 2 },
      { label: 'Past chat — moving to systems that act', score: 3 },
    ],
  },
  {
    id: 'agentic', dim: 'Agentic', q: 'Do you have AI that takes a goal and completes multi-step work?',
    help: 'The value frontier — agents that act.',
    options: [
      { label: 'No — only single prompts / answers', score: 0 },
      { label: 'Experimenting with agent prototypes', score: 1 },
      { label: 'One or two agents in limited production', score: 2 },
      { label: 'Agents in production generating operational data', score: 3 },
    ],
  },
  {
    id: 'workflow', dim: 'Implementation', q: 'When you deploy AI, what actually changes?',
    help: 'The gap is closed by redesigning work, not installing tools.',
    options: [
      { label: 'We bolt a tool onto the existing process', score: 0 },
      { label: 'Minor tweaks around the tool', score: 1 },
      { label: 'We redesign the workflow around the AI', score: 2 },
      { label: 'We standardize the new workflow and scale it', score: 3 },
    ],
  },
  {
    id: 'validate', dim: 'Validation', q: 'How do you know your AI is working?',
    help: 'Prove it honestly, with real measurement.',
    options: [
      { label: 'We don\'t really measure it', score: 0 },
      { label: 'Anecdotes and vendor claims', score: 1 },
      { label: 'Defined success metrics, measured at launch', score: 2 },
      { label: 'Continuous, audited measurement against a baseline', score: 3 },
    ],
  },
  {
    id: 'core', dim: 'Governance', q: 'What governs your AI when stakes are high?',
    help: 'CORE — the throttle that lets you deploy where it matters.',
    options: [
      { label: 'Nothing formal', score: 0 },
      { label: 'Ad-hoc policies, no owner', score: 1 },
      { label: 'Named owners, guardrails, a kill-switch', score: 2 },
      { label: 'Full accountability register + traceability', score: 3 },
    ],
  },
]

const MAX = QUESTIONS.length * 3

function resultFor(pct: number) {
  if (pct < 25) return {
    level: '0 · Ad-hoc', dot: '#E08A3C',
    headline: 'You\'re leaking budget — but the fix is known.',
    stage: 'Start at Foundation',
    body: 'Scattered experiments without a data floor or owner. This is exactly where most AI spend evaporates — and exactly where the flywheel delivers the fastest first turn.',
    steps: [
      { icon: GraduationCap, t: 'AI Flywheel Foundation', d: 'Get the team a shared language and the data-readiness gate.', to: '/academy#ladder' },
      { icon: Sparkles, t: 'A DRIVE Diagnostic', d: 'A fixed-scope assessment to pick the right first opportunity.', to: '/diagnostic' },
    ],
  }
  if (pct < 50) return {
    level: '1 · Emerging', dot: '#5E92B3',
    headline: 'First wins — now make them compound.',
    stage: 'Stage up: Generative → Agentic',
    body: 'You have early generative value but pilots rarely reach production. The next turn is redesigning a real workflow and standing up your first agent.',
    steps: [
      { icon: Boxes, t: 'The platform — Team tier', d: 'Track maturity over time and run the digitized toolkit.', to: '/pricing' },
      { icon: GraduationCap, t: 'Agentic AI Engineer track', d: 'Build the scarce skill: systems that act.', to: '/academy#ladder' },
    ],
  }
  if (pct < 75) return {
    level: '2 · Operational', dot: '#45C3B9',
    headline: 'The wheel is turning. Time to govern and scale.',
    stage: 'Lock in CORE, then Expand',
    body: 'A real foundation and governed deployments. To reach compounding, formalize CORE and standardize the workflows that worked so each turn feeds the next.',
    steps: [
      { icon: ShieldCheck, t: 'CORE Governance suite', d: 'Accountability register, autonomy levels, traceability.', to: '/platform#governance' },
      { icon: Boxes, t: 'Business tier + Benchmark', d: 'Measure yourself against anonymized peers.', to: '/pricing' },
    ],
  }
  return {
    level: '3–4 · Compounding', dot: '#8E86F0',
    headline: 'You\'re in the rare air. Make it the operating model.',
    stage: 'Toward Physical & enterprise scale',
    body: 'Agents in production are generating fuel for the next turn. The frontier is the embodied/industrial stage and turning the flywheel into how the organization runs — at enterprise scale.',
    steps: [
      { icon: ShieldCheck, t: 'Enterprise / Sovereign', d: 'SSO, residency, dedicated success — scale with control.', to: '/pricing' },
      { icon: GraduationCap, t: 'AI Flywheel Strategist', d: 'The capstone for leaders running the whole machine.', to: '/academy#ladder' },
    ],
  }
}

export default function Diagnostic() {
  const [step, setStep] = useState(0) // 0..n-1 questions, n = result
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submittedEmail, setSubmittedEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [emailErr, setEmailErr] = useState('')

  const total = QUESTIONS.length
  const done = step >= total
  const score = useMemo(() => Object.values(answers).reduce((a, b) => a + b, 0), [answers])
  const pct = Math.round((score / MAX) * 100)
  const result = resultFor(pct)

  useEffect(() => { track('diagnostic_start') }, [])
  useEffect(() => { if (done) track('diagnostic_complete', { score, level: result.level }) }, [done])

  const choose = (qid: string, s: number) => {
    setAnswers((a) => ({ ...a, [qid]: s }))
    track('diagnostic_answer', { step: step + 1, dim: QUESTIONS[step]?.dim })
    setTimeout(() => setStep((x) => x + 1), 180)
  }

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true); setEmailErr('')
    try {
      await api.diagnostic({ answers, score, level: result.level, headline: result.headline, email })
      track('diagnostic_email', { score })
      setSubmittedEmail(true)
    } catch (err: any) {
      setEmailErr(err.message || 'Could not send. Please try again.')
    } finally { setSending(false) }
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-24">
      <Seo title="The free diagnostic — find your blue dot" path="/diagnostic"
        description="Six honest questions, no signup to begin. Get an instant, scored read on your AI maturity and the one next step that matters." />
      <div className="grid-texture absolute inset-0 opacity-[0.3]" />
      <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/8 blur-[140px]" />
      <div className="container-x relative max-w-3xl">
        {/* header */}
        <div className="mb-8 text-center">
          <span className="chip border-gold/30 bg-gold/5 text-gold"><Sparkles className="h-3.5 w-3.5" /> The free diagnostic</span>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tightest text-cloud sm:text-4xl">Find your blue dot.</h1>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-muted">Six honest questions. No signup to begin. An instant, scored read on where you are — and the one next step that matters.</p>
        </div>

        {/* progress */}
        {!done && (
          <div className="mb-7">
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-faint">
              <span>{QUESTIONS[step].dim}</span>
              <span>{step + 1} / {total}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-hairline/40">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold-light" animate={{ width: `${((step) / total) * 100}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}
              className="card p-7 sm:p-9">
              <p className="font-mono text-[11px] uppercase tracking-widest text-gold">{QUESTIONS[step].help}</p>
              <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-cloud sm:text-2xl">{QUESTIONS[step].q}</h2>
              <div className="mt-6 space-y-3">
                {QUESTIONS[step].options.map((o) => {
                  const active = answers[QUESTIONS[step].id] === o.score
                  return (
                    <button key={o.label} onClick={() => choose(QUESTIONS[step].id, o.score)}
                      className={`group flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition ${
                        active ? 'border-gold bg-gold/10' : 'border-hairline/60 bg-[rgb(var(--tint)/0.03)] hover:border-gold/40 hover:bg-[rgb(var(--tint)/0.05)]'
                      }`}>
                      <span className="text-[14.5px] text-mist">{o.label}</span>
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition ${active ? 'border-gold bg-gold text-ground' : 'border-hairline text-transparent group-hover:border-gold/60'}`}>
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-7 flex items-center justify-between">
                <button disabled={step === 0} onClick={() => setStep((x) => Math.max(0, x - 1))}
                  className="inline-flex items-center gap-1.5 text-sm text-faint transition enabled:hover:text-cloud disabled:opacity-30">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <span className="font-mono text-[11px] text-faint">Pick the closest — be honest, not aspirational.</span>
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* score card */}
              <div className="card overflow-hidden">
                <div className="grid gap-6 p-7 sm:grid-cols-[auto_1fr] sm:p-9">
                  {/* gauge */}
                  <div className="mx-auto">
                    <Gauge pct={pct} color={result.dot} />
                  </div>
                  <div>
                    <span className="chip border-hairline" style={{ color: result.dot, borderColor: `${result.dot}66` }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: result.dot }} /> Maturity level {result.level}
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-cloud">{result.headline}</h2>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{result.body}</p>
                    <p className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-gold">
                      <ArrowRight className="h-4 w-4" /> {result.stage}
                    </p>
                  </div>
                </div>

                {/* next steps */}
                <div className="border-t border-hairline/40 bg-[rgb(var(--tint)/0.025)] p-7 sm:p-9">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Your next turn of the flywheel</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {result.steps.map((s) => (
                      <Link key={s.t} to={s.to} className="group flex items-start gap-3.5 rounded-xl border border-hairline/60 bg-panel/50 p-4 transition hover:border-gold/40">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/12"><s.icon className="h-5 w-5 text-gold" /></span>
                        <div>
                          <div className="font-display text-[14.5px] font-semibold text-cloud">{s.t}</div>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">{s.d}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* email gate for full report */}
              <div className="mt-5 rounded-2xl border border-gold/25 bg-gold/[0.04] p-7">
                {!submittedEmail ? (
                  <>
                    <h3 className="font-display text-lg font-bold text-cloud">Get the full report + your roadmap.</h3>
                    <p className="mt-1.5 text-[13.5px] text-muted">Your stage-by-stage breakdown, a 90-day roadmap, and the toolkit samples — emailed to you. We never sell or share it.</p>
                    <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={submitEmail}>
                      <label htmlFor="diag-email" className="sr-only">Email address for your report</label>
                      <input id="diag-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                        className="w-full rounded-full border border-hairline bg-ground/60 px-5 py-3 text-sm text-cloud placeholder:text-faint focus:border-gold/60 focus:outline-none" />
                      <button disabled={sending} className="btn-gold whitespace-nowrap disabled:opacity-60">
                        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Email my report <ArrowRight className="h-4 w-4" /></>}
                      </button>
                    </form>
                    {emailErr && <p className="mt-2 text-[12px] text-physical">{emailErr}</p>}
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-core/20"><Check className="h-5 w-5 text-core" /></span>
                    <div>
                      <h3 className="font-display text-base font-bold text-cloud">On its way.</h3>
                      <p className="text-[13px] text-muted">Check your inbox for the full roadmap. Welcome to the flywheel.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button onClick={() => { setAnswers({}); setStep(0); setSubmittedEmail(false) }}
                  className="inline-flex items-center gap-1.5 text-sm text-faint transition hover:text-cloud">
                  <RotateCcw className="h-4 w-4" /> Retake
                </button>
                <span className="text-hairline">·</span>
                <Link to="/framework" className="text-sm text-faint transition hover:text-cloud">Explore the framework</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-widest text-faint">
          The free diagnostic is the freemium tier of the platform · one account, one flywheel
        </p>
      </div>
    </section>
  )
}

function Gauge({ pct, color }: { pct: number; color: string }) {
  const r = 70, c = 2 * Math.PI * r
  const off = c - (pct / 100) * c
  return (
    <svg viewBox="0 0 180 180" className="h-44 w-44">
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--ring-track)" strokeWidth="12" />
      <motion.circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: off }} transition={{ duration: 1, ease: 'easeOut' }}
        transform="rotate(-90 90 90)" />
      <text x="90" y="84" textAnchor="middle" className="font-display" fontSize="34" fontWeight="800" fill="#EEF3F8">{pct}</text>
      <text x="90" y="106" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="2" fill="#9DB1C2">FLYWHEEL SCORE</text>
    </svg>
  )
}
