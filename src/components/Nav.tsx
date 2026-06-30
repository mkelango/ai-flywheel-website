import { useEffect, useState, lazy, Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X, Search, Globe, Sparkles, UserCircle2, Check } from 'lucide-react'
import { NAV } from '../data/content'
import { Logo, Btn } from '../lib/primitives'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../lib/auth'
import { useI18n, LANGS } from '../lib/i18n'
const SearchModal = lazy(() => import('./SearchModal')) // loads (with its content index) only on open

const LABEL_KEY: Record<string, string> = {
  Framework: 'nav.framework', Solutions: 'nav.solutions', Platform: 'nav.platform',
  'Learn & Certify': 'nav.learn', Resources: 'nav.resources',
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const loc = useLocation()
  const { user } = useAuth()
  const { t, lang, setLang } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keyboard shortcut: Cmd/Ctrl-K or "/" opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/input|textarea/i.test((e.target as HTMLElement)?.tagName))) {
        e.preventDefault(); setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => { setMobile(false); setOpen(null); setLangOpen(false) }, [loc.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-hairline/60 bg-ground/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.label)}>
              <Link
                to={item.href}
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium text-mist transition hover:text-cloud"
              >
                {t(LABEL_KEY[item.label] || item.label)}
                <ChevronDown className={`h-3.5 w-3.5 text-faint transition-transform ${open === item.label ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          ))}
        </nav>

        {/* utility */}
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} className="hidden rounded-full p-2 text-faint transition hover:text-cloud md:block" aria-label={t('nav.search')}><Search className="h-4 w-4" /></button>
          <ThemeToggle className="hidden lg:grid" />
          <div className="relative hidden md:block" onMouseLeave={() => setLangOpen(false)}>
            <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 rounded-full p-2 text-faint transition hover:text-cloud" aria-label={t('nav.language')} aria-expanded={langOpen}>
              <Globe className="h-4 w-4" />
              <span className="font-mono text-[10px] uppercase">{lang}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-10 w-40 overflow-hidden rounded-xl border border-hairline/70 bg-ink/95 py-1.5 shadow-lift backdrop-blur-xl">
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <button onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-[13px] text-mist transition hover:bg-[rgb(var(--tint)/0.05)] hover:text-cloud">
                        <span>{l.native}<span className="ml-1.5 text-faint">{l.label !== l.native ? `· ${l.label}` : ''}</span></span>
                        {lang === l.code && <Check className="h-3.5 w-3.5 text-gold" />}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          {user ? (
            <Link to="/signin" className="hidden items-center gap-1.5 text-[13px] font-medium text-mist transition hover:text-cloud md:flex" aria-label="Your account">
              <UserCircle2 className="h-4 w-4 text-gold" /> {user.name.split(' ')[0]}
            </Link>
          ) : (
            <Link to="/signin" className="hidden text-[13px] font-medium text-mist transition hover:text-cloud md:block">{t('nav.signin')}</Link>
          )}
          <Btn to="/diagnostic" sm className="hidden sm:inline-flex"><Sparkles className="h-3.5 w-3.5" /> {t('cta.diagnostic')}</Btn>
          <ThemeToggle className="lg:hidden" />
          <button className="rounded-full p-2 text-cloud lg:hidden" onClick={() => setMobile((v) => !v)} aria-label="Menu">
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mega menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-16 hidden border-b border-hairline/60 bg-ink/95 backdrop-blur-xl lg:block"
          >
            <div className="container-x grid grid-cols-[1fr_2fr] gap-10 py-9">
              {NAV.filter((n) => n.label === open).map((item) => (
                <div key={item.label} className="contents">
                  <div className="rounded-2xl border border-hairline/50 bg-gradient-to-br from-steel/40 to-transparent p-6">
                    <p className="eyebrow mb-2">{item.label}</p>
                    <p className="text-sm leading-relaxed text-muted">{megaBlurb[item.label]}</p>
                    <Link to={item.href} className="mt-4 inline-flex text-sm font-semibold text-gold hover:text-gold-light">
                      Explore {item.label} →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">{col.title}</p>
                        <ul className="space-y-2.5">
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link to={l.href} className="text-[14px] text-mist transition hover:text-gold">{l.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-hairline/60 bg-ink/98 lg:hidden"
          >
            <div className="container-x space-y-1 py-4">
              {NAV.map((item) => (
                <details key={item.label} className="group border-b border-hairline/40 py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 text-[15px] font-medium text-cloud">
                    {t(LABEL_KEY[item.label] || item.label)}
                    <ChevronDown className="h-4 w-4 text-faint transition group-open:rotate-180" />
                  </summary>
                  <div className="pb-3 pl-1">
                    {item.columns.map((col) => (
                      <div key={col.title} className="mb-2">
                        <p className="mb-1.5 mt-2 font-mono text-[10px] uppercase tracking-widest text-faint">{col.title}</p>
                        <ul className="space-y-1.5">
                          {col.links.map((l) => (
                            <li key={l.label}><Link to={l.href} className="text-sm text-mist">{l.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
              <button onClick={() => { setMobile(false); setSearchOpen(true) }} className="mt-3 flex w-full items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-[14px] text-mist">
                <Search className="h-4 w-4" /> {t('nav.search')}
              </button>
              <div className="mt-3 flex gap-2">
                {LANGS.map((l) => (
                  <button key={l.code} onClick={() => setLang(l.code)}
                    className={`flex-1 rounded-full border px-3 py-2 text-[13px] transition ${lang === l.code ? 'border-gold bg-gold/10 text-gold' : 'border-hairline text-mist'}`}>{l.native}</button>
                ))}
              </div>
              <Btn to="/diagnostic" className="mt-4 w-full"><Sparkles className="h-4 w-4" /> {t('cta.diagnostic')}</Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && (
        <Suspense fallback={null}>
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}
    </header>
  )
}

const megaBlurb: Record<string, string> = {
  Framework: 'The canonical, versioned standard — free and authority-building. Four stages, the DRIVE method, CORE governance.',
  Solutions: 'One framework, four actors. See yourself, then route to the right next turn of the flywheel.',
  Platform: 'The SaaS built on the methodology — diagnostic, toolkit, governance, benchmark. Start free.',
  'Learn & Certify': 'The Academy and the certification ladder. Implementation and governance is the scarce skill.',
  Resources: 'The content engine, the proof, and the book — authority before the ask.',
}
