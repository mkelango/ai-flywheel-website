import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Check, Loader2, ArrowRight, Building2, Landmark, Users2, Newspaper, Sparkles, LifeBuoy } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Reveal, Btn } from '../lib/primitives'
import { Seo, breadcrumbLd } from '../lib/seo'
import { api } from '../lib/api'

const TYPES = [
  { value: 'general', label: 'General enquiry' },
  { value: 'advisory', label: 'Advisory & assessments' },
  { value: 'government', label: 'Government / programs' },
  { value: 'enterprise', label: 'Enterprise & L&D' },
  { value: 'partner', label: 'Partnership / ATO' },
  { value: 'careers', label: 'Careers' },
  { value: 'press', label: 'Press / media' },
]

const ROUTES = [
  { icon: Building2, color: '#45C3B9', t: 'Advisory & assessments', d: 'DRIVE diagnostics, CORE governance audits, maturity roadmaps.' },
  { icon: Landmark, color: '#F0A95E', t: 'Government & programs', d: 'Sovereign-AI, workforce at scale, the Economy Program.' },
  { icon: Users2, color: '#8E86F0', t: 'Partners & ATOs', d: 'Join the certified network or accredit your organization.' },
  { icon: Newspaper, color: '#E6B968', t: 'Press & media', d: 'Interviews, the report, brand assets — see the Newsroom.' },
]

export default function Contact() {
  const [params] = useSearchParams()
  const initialType = TYPES.find((t) => t.value === params.get('type'))?.value || 'general'
  const [form, setForm] = useState({ name: '', email: '', org: '', type: initialType, message: '' })
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setState('busy'); setErr('')
    try { await api.contact(form); setState('done') }
    catch (e: any) { setState('error'); setErr(e.message || 'Could not send. Please try again.') }
  }

  return (
    <>
      <Seo title="Contact — talk to us" path="/contact"
        description="Talk to the AI Flywheel team — advisory, government programs, partnerships, enterprise L&D, careers, or press. We reply fast."
        jsonLd={breadcrumbLd([['Company', '/about'], ['Contact', '/contact']])} />
      <PageHero eyebrow="Contact · talk to us" title={<>Let's turn your <span className="text-shimmer">wheel</span>.</>}
        accent="#E6B968"
        sub="Tell us where you stand and what you're trying to do. The right person — advisory, programs, partnerships, or press — will get back to you. No bots fielding serious questions." />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          {/* form */}
          <Reveal>
            <div className="card p-7 sm:p-9">
              {state === 'done' ? (
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-core/20"><Check className="h-6 w-6 text-core" /></span>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-cloud">Message received.</h2>
                    <p className="mt-2 text-[14px] text-muted">Thank you — we've logged your enquiry and the right person will reply soon. In the meantime, you can run the free diagnostic to get a head start.</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Btn to="/diagnostic" sm><Sparkles className="h-4 w-4" /> Run the free diagnostic</Btn>
                      <Btn to="/" variant="ghost" sm>Back to home</Btn>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name"><input required value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" className={inputCls} placeholder="Priya Raman" /></Field>
                    <Field label="Work email"><input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" className={inputCls} placeholder="you@company.com" /></Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Organization"><input value={form.org} onChange={(e) => set('org', e.target.value)} autoComplete="organization" className={inputCls} placeholder="Company / institution / agency" /></Field>
                    <Field label="What's it about?">
                      <select value={form.type} onChange={(e) => set('type', e.target.value)} className={inputCls + ' appearance-none'}>
                        {TYPES.map((t) => <option key={t.value} value={t.value} className="bg-ink">{t.label}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="How can we help?">
                    <textarea required value={form.message} onChange={(e) => set('message', e.target.value)} rows={5} className={inputCls + ' resize-y'} placeholder="Tell us where you are on the wheel and what you're trying to do…" />
                  </Field>
                  {state === 'error' && <p className="rounded-lg border border-physical/40 bg-physical/10 px-3 py-2 text-[13px] text-physical">{err}</p>}
                  <button disabled={state === 'busy'} className="btn-gold w-full disabled:opacity-60">
                    {state === 'busy' ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send message <ArrowRight className="h-4 w-4" /></>}
                  </button>
                  <p className="text-center text-[12px] text-faint">No ads, ever. We never sell or share your details. Disclosed, governed, audited.</p>
                </form>
              )}
            </div>
          </Reveal>

          {/* routes + support */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {ROUTES.map((r) => (
                <div key={r.t} className="flex items-start gap-3.5 rounded-2xl border border-hairline/60 bg-panel/40 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={{ background: `${r.color}1a` }}><r.icon className="h-5 w-5" style={{ color: r.color }} /></span>
                  <div><div className="font-display text-[15px] font-semibold text-cloud">{r.t}</div><p className="mt-0.5 text-[13px] leading-relaxed text-muted">{r.d}</p></div>
                </div>
              ))}
              <div className="flex items-start gap-3.5 rounded-2xl border border-hairline/60 bg-panel/40 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-core/15"><LifeBuoy className="h-5 w-5 text-core" /></span>
                <div>
                  <div className="font-display text-[15px] font-semibold text-cloud">Existing customer?</div>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted">Sign in for support, or reach your success contact directly.</p>
                  <Link to="/signin" className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-gold hover:text-gold-light">Sign in <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
      <CTABand />
    </>
  )
}

const inputCls = 'w-full rounded-xl border border-hairline bg-ground/60 px-4 py-3 text-sm text-cloud placeholder:text-faint focus:border-gold/60 focus:outline-none'
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">{label}</span>{children}</label>
}
