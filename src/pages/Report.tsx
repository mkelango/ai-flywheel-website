import { useState } from 'react'
import { FileText, FileDown, Check, Loader2, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { api } from '../lib/api'

const FINDINGS = [
  { stat: 'The gap is real', body: 'The distance between AI spend and value realized remains the defining problem — and it is never the model. It is unready data, undefined success, un-redesigned workflows, and absent governance.' },
  { stat: 'Data readiness leads', body: 'Organizations that pass a hard data-readiness gate before building dramatically outperform those that rush to a demo on unready data.' },
  { stat: 'Agentic is the divider', body: 'The leaders have moved past commoditized generative AI into governed agentic systems — the durable, hard-to-copy advantage.' },
  { stat: 'Governance raises the ceiling', body: 'Mature CORE governance correlates with deploying AI at higher stakes — the unlock, not the brake.' },
  { stat: 'Compounding compounds', body: 'Teams that design each win to feed the next pull steadily ahead of those paying the reset tax on disconnected pilots.' },
]

export default function Report() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setState('busy')
    try { await api.newsletter(email, 'report'); setState('done') } catch { setState('done') }
  }

  return (
    <>
      <Seo title="State of AI Implementation — the report" path="/report"
        description="Our annual report on what actually closes the gap between AI spend and value. Ungated summary; full report by email." />
      <PageHero
        eyebrow="Flagship research · annual"
        title={<>The <span className="text-shimmer">State of AI Implementation</span>.</>}
        sub="Our own report, built from platform and assessment data — the most-cited yardstick on what actually works. We publish the failure data, then beat it. Ungated summary below; full report by email."
        accent="#E6B968"
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="/downloads/State-of-AI-Implementation-Summary.md"><FileDown className="h-4 w-4" /> Download the summary</Btn>
          <Btn to="/framework#gap" variant="ghost">Read the implementation-gap thesis</Btn>
        </div>
      </PageHero>

      <Section>
        <Reveal><Heading eyebrow="The ungated summary" title="Five findings, honestly." sub="The headline numbers are a standard to prove, not a slogan to assert — which is why the report leads with method, not marketing." /></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FINDINGS.map((f, i) => (
            <Reveal key={f.stat} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-hairline/60 bg-panel/40 p-6">
                <FileText className="h-6 w-6 text-gold/70" />
                <h3 className="mt-3 font-display text-[15px] font-semibold text-cloud">{f.stat}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline/40">
        <div className="grid items-center gap-8 rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/[0.07] to-ink p-8 lg:grid-cols-[1.3fr_1fr] sm:p-10">
          <div>
            <h2 className="h-display text-2xl sm:text-3xl">Get the full report.</h2>
            <p className="mt-3 max-w-md text-[14px] text-muted">The complete methodology, the data tables, and the sector breakdowns — emailed to you. We never sell or share your details. No ads, ever.</p>
          </div>
          {state === 'done' ? (
            <div className="flex items-center gap-3 rounded-2xl border border-core/40 bg-core/10 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-core/20"><Check className="h-5 w-5 text-core" /></span>
              <div><p className="font-display font-bold text-cloud">On its way.</p><p className="text-[13px] text-muted">Check your inbox for the full report.</p></div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="report-email" className="sr-only">Email address for the report</label>
              <input id="report-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                className="w-full rounded-full border border-hairline bg-ground/60 px-5 py-3 text-sm text-cloud placeholder:text-faint focus:border-gold/60 focus:outline-none" />
              <button disabled={state === 'busy'} className="btn-gold whitespace-nowrap disabled:opacity-60">
                {state === 'busy' ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Get the report <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}
        </div>
      </Section>
      <CTABand />
    </>
  )
}
