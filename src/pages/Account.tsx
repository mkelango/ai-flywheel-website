import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Loader2, LogOut, ShieldCheck, Sparkles } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { Btn } from '../lib/primitives'
import Flywheel from '../components/Flywheel'
import { Seo } from '../lib/seo'

export default function Account({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const { user, login, signup, logout, loading } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const redirectTo = (loc.state as any)?.from || '/'
  const [tab, setTab] = useState<'signin' | 'signup'>(mode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [consent, setConsent] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr('')
    if (tab === 'signup' && !consent) { setErr('Please accept the privacy terms to continue.'); return }
    setBusy(true)
    try {
      const handoff = tab === 'signup' ? await signup(name, email, password, consent) : await login(email, password)
      // single account: land the user in the admin portal
      if (handoff) { window.location.href = handoff; return }
      nav(redirectTo)
    } catch (e: any) { setErr(e.message || 'Something went wrong.') } finally { setBusy(false) }
  }

  // Logged-in view
  if (user && !loading) {
    return (
      <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
        <div className="grid-texture absolute inset-0 opacity-[0.25]" />
        <div className="container-x relative max-w-2xl">
          <div className="card p-8 sm:p-10">
            <span className="chip border-core/40 text-core"><ShieldCheck className="h-3.5 w-3.5" /> Signed in</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-cloud">Welcome back, {user.name.split(' ')[0]}.</h1>
            <p className="mt-2 text-[15px] text-muted">{user.email}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Link to="/diagnostic" className="rounded-xl border border-hairline/60 bg-panel/50 p-5 transition hover:border-gold/40">
                <Sparkles className="h-5 w-5 text-gold" />
                <h3 className="mt-3 font-display text-base font-semibold text-cloud">Run / review your diagnostic</h3>
                <p className="mt-1 text-[13px] text-muted">Track your blue dot over time.</p>
              </Link>
              <Link to="/pricing" className="rounded-xl border border-hairline/60 bg-panel/50 p-5 transition hover:border-gold/40">
                <ShieldCheck className="h-5 w-5 text-foundation" />
                <h3 className="mt-3 font-display text-base font-semibold text-cloud">Your plan &amp; certifications</h3>
                <p className="mt-1 text-[13px] text-muted">Upgrade, enrol, or book an exam.</p>
              </Link>
            </div>
            <button onClick={() => { logout(); nav('/') }} className="mt-7 inline-flex items-center gap-2 text-sm text-faint transition hover:text-cloud">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-24">
      <Seo title={tab === 'signin' ? 'Sign in' : 'Create your account'} path={`/${tab === 'signin' ? 'signin' : 'signup'}`} noindex />
      <div className="grid-texture absolute inset-0 opacity-[0.25]" />
      <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-agentic/10 blur-[140px]" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="hidden lg:block">
          <Flywheel size={460} className="mx-auto" />
          <p className="mt-8 text-center font-serif text-xl italic text-gold-light">"Add 1. Become the one."</p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="card p-7 sm:p-9">
            <div className="mb-6 inline-flex rounded-full border border-hairline/70 bg-panel/60 p-1">
              {(['signin', 'signup'] as const).map((t) => (
                <button key={t} onClick={() => { setTab(t); setErr('') }}
                  className={`rounded-full px-5 py-1.5 font-display text-[13px] font-semibold transition ${tab === t ? 'bg-gold text-ground' : 'text-faint hover:text-cloud'}`}>
                  {t === 'signin' ? 'Sign in' : 'Create account'}
                </button>
              ))}
            </div>
            <h1 className="font-display text-2xl font-bold text-cloud">{tab === 'signin' ? 'Welcome back.' : 'Join the flywheel.'}</h1>
            <p className="mt-1.5 text-[13.5px] text-muted">{tab === 'signin' ? 'One account for the diagnostic, platform, and academy.' : 'One account, one flywheel — free to start.'}</p>

            <form className="mt-6 space-y-3.5" onSubmit={submit}>
              {tab === 'signup' && (
                <Field label="Full name"><input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className={inputCls} placeholder="Priya Raman" /></Field>
              )}
              <Field label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" autoComplete="email" className={inputCls} placeholder="you@company.com" /></Field>
              <Field label="Password"><input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" autoComplete={tab === 'signup' ? 'new-password' : 'current-password'} minLength={8} className={inputCls} placeholder="At least 8 characters" /></Field>
              {tab === 'signup' && (
                <label className="flex items-start gap-2.5 text-[12.5px] text-muted">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#E6B968]" aria-label="Accept privacy terms" />
                  <span>I agree to the <Link to="/privacy" className="text-gold hover:text-gold-light">Privacy Policy</Link> (GDPR / India DPDP). My data is disclosed, governed, and audited — never sold.</span>
                </label>
              )}
              {err && <p className="rounded-lg border border-physical/40 bg-physical/10 px-3 py-2 text-[13px] text-physical">{err}</p>}
              <Btn className="w-full">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : (tab === 'signin' ? 'Sign in' : 'Create account')}</Btn>
            </form>
            <p className="mt-5 text-center text-[12px] text-faint">No ads, ever. Your data stays yours — disclosed, governed, audited.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const inputCls = 'w-full rounded-xl border border-hairline bg-ground/60 px-4 py-3 text-sm text-cloud placeholder:text-faint focus:border-gold/60 focus:outline-none'
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">{label}</span>{children}</label>
}
