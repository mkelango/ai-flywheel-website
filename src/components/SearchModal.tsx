import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search as SearchIcon, X, CornerDownLeft } from 'lucide-react'
import { GLOSSARY } from '../data/glossary'
import { CERTS } from '../data/certifications'
import { INDUSTRIES } from '../data/industries'
import { CASES } from '../data/cases'
import { POSTS } from '../data/insights'

interface Item { label: string; sub: string; to: string; kw?: string }

const PAGES: Item[] = [
  { label: 'The Framework', sub: 'Page', to: '/framework', kw: 'stages drive core' },
  { label: 'The free diagnostic', sub: 'Page', to: '/diagnostic', kw: 'blue dot assessment maturity' },
  { label: 'Solutions', sub: 'Page', to: '/solutions', kw: 'business government institutions teams' },
  { label: 'Platform', sub: 'Page', to: '/platform', kw: 'saas software toolkit governance' },
  { label: 'Pricing', sub: 'Page', to: '/pricing', kw: 'cost tiers certification' },
  { label: 'Academy', sub: 'Page', to: '/academy', kw: 'learn certify ladder cohort' },
  { label: 'The Toolkit', sub: 'Page', to: '/toolkit', kw: 'templates tools download' },
  { label: 'State of AI Implementation', sub: 'Page', to: '/report', kw: 'report research data' },
  { label: 'The Book', sub: 'Page', to: '/book', kw: 'read chapters excerpt' },
  { label: 'About / The Standard', sub: 'Page', to: '/about', kw: 'mission company' },
]

function buildIndex(): Item[] {
  return [
    ...PAGES,
    ...GLOSSARY.map((t) => ({ label: t.term, sub: 'Glossary', to: `/glossary/${t.slug}`, kw: t.def })),
    ...CERTS.map((c) => ({ label: c.name, sub: 'Certification', to: `/certifications/${c.slug}`, kw: c.audience })),
    ...INDUSTRIES.map((i) => ({ label: i.name, sub: 'Industry', to: `/industries/${i.slug}`, kw: i.tagline })),
    ...CASES.map((c) => ({ label: c.title, sub: 'Case study', to: `/case-studies/${c.slug}`, kw: c.summary })),
    ...POSTS.map((p) => ({ label: p.title, sub: 'Insight', to: `/insights/${p.slug}`, kw: p.dek })),
  ]
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const nav = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const index = useMemo(buildIndex, [])

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return index.slice(0, 8)
    return index
      .map((it) => {
        const label = it.label.toLowerCase()
        let score = 0
        if (label === query) score = 100
        else if (label.startsWith(query)) score = 60
        else if (label.includes(query)) score = 40
        else if ((it.kw || '').toLowerCase().includes(query)) score = 15
        return { it, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((x) => x.it)
  }, [q, index])

  useEffect(() => { setActive(0) }, [q])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); else setQ('') }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
      else if (e.key === 'Enter' && results[active]) { go(results[active].to) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active])

  const go = (to: string) => { onClose(); nav(to) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ground/80 px-4 pt-24 backdrop-blur-sm" onClick={onClose}
          role="dialog" aria-modal="true" aria-label="Search">
          <motion.div initial={{ opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.18 }} onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-hairline/70 bg-ink/95 shadow-lift">
            <div className="flex items-center gap-3 border-b border-hairline/50 px-5">
              <SearchIcon className="h-4 w-4 text-faint" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the framework, glossary, certifications…"
                aria-label="Search" className="flex-1 bg-transparent py-4 text-[15px] text-cloud placeholder:text-faint focus:outline-none" />
              <button onClick={onClose} aria-label="Close search" className="rounded-md p-1 text-faint hover:text-cloud"><X className="h-4 w-4" /></button>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-faint">No results for "{q}".</li>}
              {results.map((r, i) => (
                <li key={r.to + r.label}>
                  <button onMouseEnter={() => setActive(i)} onClick={() => go(r.to)}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition ${i === active ? 'bg-gold/10' : 'hover:bg-[rgb(var(--tint)/0.04)]'}`}>
                    <span className="truncate text-[14px] text-cloud">{r.label}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{r.sub}</span>
                      {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-gold" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline/50 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-faint">
              ↑↓ navigate · ↵ open · esc close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
