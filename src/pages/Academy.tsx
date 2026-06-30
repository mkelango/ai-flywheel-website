import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Award, Users, Building2, BadgeCheck, Check, X, Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { CERTS } from '../data/certifications'
import { api } from '../lib/api'

function VerifyForm() {
  const [id, setId] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'none' | 'error'>('idle')
  const [cred, setCred] = useState<any>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setState('busy')
    try {
      const r: any = await api.verifyCredential(id.trim())
      if (r.found) { setCred(r.credential); setState('ok') } else { setState('none') }
    } catch { setState('error') }
  }

  return (
    <div className="w-full">
      <form className="flex w-full gap-3" onSubmit={submit}>
        <label htmlFor="verify-id" className="sr-only">Credential ID to verify</label>
        <input id="verify-id" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. AIF-AGT-2026-0001"
          className="w-full rounded-full border border-hairline bg-ground/60 px-5 py-3 text-sm text-cloud placeholder:text-faint focus:border-gold/60 focus:outline-none sm:w-72" />
        <button disabled={state === 'busy' || !id.trim()} className="btn-gold whitespace-nowrap disabled:opacity-60">
          {state === 'busy' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
        </button>
      </form>
      {state === 'ok' && cred && (
        <div className={`mt-4 rounded-xl border p-4 ${cred.status === 'active' ? 'border-core/40 bg-core/[0.06]' : 'border-physical/40 bg-physical/[0.06]'}`}>
          <div className="flex items-center gap-2">
            {cred.status === 'active' ? <Check className="h-4 w-4 text-core" /> : <X className="h-4 w-4 text-physical" />}
            <span className="font-display text-[14px] font-semibold text-cloud">{cred.status === 'active' ? 'Verified — active' : 'Found — expired'}</span>
          </div>
          <p className="mt-2 text-[13px] text-mist"><span className="text-faint">Holder:</span> {cred.holder}</p>
          <p className="text-[13px] text-mist"><span className="text-faint">Credential:</span> {cred.cert}</p>
          <p className="text-[13px] text-mist"><span className="text-faint">Issued:</span> {cred.issued} · <span className="text-faint">Valid to:</span> {cred.expires}</p>
        </div>
      )}
      {state === 'none' && <p className="mt-3 text-[13px] text-physical">No credential found with that ID. Try <span className="font-mono text-mist">AIF-AGT-2026-0001</span>.</p>}
      {state === 'error' && <p className="mt-3 text-[13px] text-physical">Verification service unavailable — please try again.</p>}
    </div>
  )
}

const LEVEL_COLORS: Record<string, string> = { L1: '#5E92B3', L2: '#8E86F0', L3: '#1FA877', L4: '#E6B968', '—': '#F0A95E' }

export default function Academy() {
  return (
    <>
      <Seo title="Learn & Certify — the Academy" path="/academy"
        description="The certification ladder, the 90-Day Flywheel Start, ATO accreditation, and verify-a-credential. Implementation and governance is the scarce skill." />
      <PageHero
        eyebrow="Learn & Certify · the Academy"
        title={<>Implementation and governance is <span className="text-shimmer">the scarce skill</span>.</>}
        sub="Anyone can prompt a model. Almost no one can turn AI into compounding value, safely. The Academy and the certification ladder build — and certify — exactly that."
        accent="#8E86F0"
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="#ladder">Browse certifications</Btn>
          <Btn to="/diagnostic" variant="ghost"><Sparkles className="h-4 w-4" /> Start with the free diagnostic</Btn>
        </div>
      </PageHero>

      {/* Ladder */}
      <Section id="ladder">
        <Reveal><Heading eyebrow="The certification ladder" title="A ladder people pay to climb." sub="Tiered and instantly legible to HR — the Six Sigma lesson. The Agentic AI Engineer is the flagship everyone anchors to." /></Reveal>
        <div className="mt-12 space-y-3">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.04}>
              <div className={`group grid items-center gap-4 rounded-2xl border p-5 transition sm:grid-cols-[auto_1fr_auto] ${c.flagship ? 'border-gold/50 bg-gold/[0.05]' : 'border-hairline/70 bg-panel/50 hover:border-gold/30'}`}>
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl font-display text-sm font-bold text-ground" style={{ background: LEVEL_COLORS[c.level] }}>{c.level}</span>
                  <div>
                    <Link to={`/certifications/${c.slug}`} className="font-display text-lg font-bold text-cloud transition hover:text-gold">{c.name}</Link>
                    {c.flagship && <span className="ml-1.5 chip border-gold/40 text-gold">★ Hero SKU</span>}
                    <p className="text-[13px] text-muted">{c.audience} · {c.exam}</p>
                  </div>
                </div>
                <div />
                <Btn to={`/certifications/${c.slug}`} variant={c.flagship ? 'gold' : 'ghost'} sm className="justify-self-start sm:justify-self-end">
                  {c.flagship ? 'Book the exam' : 'View details'} <ArrowRight className="h-4 w-4" />
                </Btn>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Programs */}
      <Section className="border-t border-hairline/40">
        <Reveal><Heading center eyebrow="Beyond exams" title="Cohorts, teams, and the trainer network." /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 'cohort', icon: Award, color: '#45C3B9', t: 'The 90-Day Flywheel Start', d: 'The capstone, productized into a paid cohort. Outcomes, schedule, and a real first turn of your wheel.', cta: 'Apply to a cohort', to: '/contact?type=general' },
            { id: 'teams', icon: Users, color: '#5E92B3', t: 'For Teams & Enterprise L&D', d: 'All-Access licensing — your whole workforce gets the courses, tools, and assessments. The recurring annuity.', cta: 'Talk to L&D', to: '/contact?type=enterprise' },
            { id: 'ato', icon: Building2, color: '#1FA877', t: 'Become an Accredited Training Org', d: 'Pay to teach the curriculum and run the exams — accreditation fee + per-seat royalty. Infinite leverage.', cta: 'Apply to accredit', to: '/contact?type=partner' },
          ].map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <div id={p.id} className="flex h-full flex-col rounded-2xl border border-hairline/70 bg-panel/50 p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${p.color}1a` }}><p.icon className="h-5 w-5" style={{ color: p.color }} /></span>
                <h3 className="mt-5 font-display text-lg font-bold text-cloud">{p.t}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{p.d}</p>
                <Link to={p.to} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">{p.cta} <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Verify credential */}
      <Section className="border-t border-hairline/40">
        <div className="rounded-3xl border border-hairline/60 bg-gradient-to-br from-steel/30 to-ink p-8 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <Reveal>
              <span className="chip border-core/40 text-core"><BadgeCheck className="h-3.5 w-3.5" /> Trust tool</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-cloud sm:text-3xl">Verify a credential.</h2>
              <p className="mt-3 max-w-xl text-[14px] text-muted">Public, verifiable digital badges. Employers and clients can confirm any practitioner's certification in seconds — the registry that protects the standard's meaning.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <VerifyForm />
            </Reveal>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
