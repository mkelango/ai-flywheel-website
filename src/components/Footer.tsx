import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Youtube, Linkedin, Instagram, Twitter, ArrowRight, Check, Loader2 } from 'lucide-react'
import { Logo } from '../lib/primitives'
import { api } from '../lib/api'
import { useI18n } from '../lib/i18n'

function NewsletterForm() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setState('busy'); setMsg('')
    try { await api.newsletter(email, 'footer'); setState('done') }
    catch (err: any) { setState('error'); setMsg(err.message || 'Please try again.') }
  }

  if (state === 'done') {
    return (
      <div className="flex items-center gap-3 rounded-full border border-core/40 bg-core/10 px-5 py-3 text-sm text-cloud">
        <Check className="h-4 w-4 text-core" /> {t('foot.subscribed')}
      </div>
    )
  }
  return (
    <form className="flex w-full flex-col gap-3 sm:flex-row" onSubmit={submit}>
      <label htmlFor="footer-email" className="sr-only">Email address for the newsletter</label>
      <input
        id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
        className="w-full rounded-full border border-hairline bg-[rgb(var(--tint)/0.04)] px-5 py-3 text-sm text-cloud placeholder:text-faint focus:border-gold/60 focus:outline-none"
      />
      <button disabled={state === 'busy'} className="btn-gold whitespace-nowrap disabled:opacity-60">
        {state === 'busy' ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{t('foot.subscribe')} <ArrowRight className="h-4 w-4" /></>}
      </button>
      {state === 'error' && <span className="self-center text-[12px] text-physical">{msg}</span>}
    </form>
  )
}

const cols = [
  { title: 'Framework', key: 'foot.col.framework', links: [['At a Glance', '/framework'], ['The Four Stages', '/framework#stages'], ['DRIVE', '/framework#drive'], ['CORE', '/framework#core'], ['The Implementation Gap', '/framework#gap']] },
  { title: 'Solutions', key: 'foot.col.solutions', links: [['For Business', '/solutions/business'], ['For Government', '/solutions/government'], ['For Institutions', '/solutions/institutions'], ['For Teams', '/solutions/teams'], ['The Economy Program', '/solutions/government']] },
  { title: 'Platform & Learn', key: 'foot.col.platform', links: [['Platform', '/platform'], ['Pricing', '/pricing'], ['Academy', '/academy'], ['Certification', '/academy#ladder'], ['Become an ATO', '/academy#ato']] },
  { title: 'Resources', key: 'foot.col.resources', links: [['Insights', '/insights'], ['State of AI Report', '/report'], ['Case Studies', '/case-studies'], ['Toolkit', '/toolkit'], ['The Book', '/book'], ['Glossary', '/glossary']] },
  { title: 'Company', key: 'foot.col.company', links: [['About / The Standard', '/about'], ['Government & Economy', '/solutions/government'], ['Careers', '/careers'], ['Contact', '/contact'], ['Newsroom', '/newsroom']] },
]

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative border-t border-hairline/60 bg-ink/60">
      {/* newsletter band */}
      <div className="border-b border-hairline/40">
        <div className="container-x grid items-center gap-8 py-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">{t('foot.news.eyebrow')}</p>
            <h3 className="h-display text-2xl sm:text-3xl">{t('foot.news.title')}</h3>
            <p className="mt-2 max-w-md text-sm text-muted">{t('foot.news.sub')}</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* sitemap */}
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t('foot.tagline')}</p>
          <p className="mt-5 font-serif text-base italic text-gold-light">"Add 1. Become the one."</p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Youtube, href: 'https://www.youtube.com/@aiflywheel', label: 'YouTube' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/company/aiflywheel', label: 'LinkedIn' },
              { Icon: Instagram, href: 'https://www.instagram.com/aiflywheel', label: 'Instagram' },
              { Icon: Twitter, href: 'https://x.com/aiflywheel', label: 'X' },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-faint transition hover:border-gold/50 hover:text-gold">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">{t(col.key)}</p>
            <ul className="space-y-2.5">
              {col.links.map(([label, href]) => (
                <li key={label}><Link to={href} className="text-[13.5px] text-mist transition hover:text-gold">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* trust bar */}
      <div className="border-t border-hairline/40">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-[12px] text-faint sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} The AI Flywheel</span>
            <Link to="/security" className="hover:text-mist">Security</Link>
            <Link to="/privacy" className="hover:text-mist">Privacy (GDPR / DPDP)</Link>
            <Link to="/sovereignty" className="hover:text-mist">Sovereignty</Link>
            <Link to="/responsible-ai" className="hover:text-mist">Responsible AI</Link>
            <Link to="/terms" className="hover:text-mist">Terms</Link>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
            <span className="chip border-core/40 text-core">SOC 2 path</span>
            <span className="chip border-foundation/40 text-foundation">India residency</span>
            <span className="chip border-hairline text-muted">Human-in-the-loop</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
