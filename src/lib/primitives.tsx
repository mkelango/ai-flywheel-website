import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// ── Wordmark / logo ──────────────────────────────────────────────────────────
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="The AI Flywheel — home">
      <span className="relative grid h-8 w-8 place-items-center">
        <svg viewBox="0 0 40 40" className="h-8 w-8">
          <circle cx="20" cy="20" r="18" fill="none" stroke="var(--ring-track)" strokeWidth="1.5" />
          {[270, 0, 90, 180].map((a, i) => {
            const color = ['#5E92B3', '#45C3B9', '#8E86F0', '#F0A95E'][i]
            const rad = (a * Math.PI) / 180
            const x1 = 20 + 7 * Math.cos(rad), y1 = 20 + 7 * Math.sin(rad)
            const x2 = 20 + 16 * Math.cos(rad), y2 = 20 + 16 * Math.sin(rad)
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          })}
          <circle cx="20" cy="20" r="5.5" fill="#0C1A29" stroke="#E6B968" strokeWidth="1.5" />
        </svg>
      </span>
      <span className="font-display text-[15px] font-bold tracking-tight text-cloud">
        The AI <span className="text-shimmer">Flywheel</span>
      </span>
    </Link>
  )
}

// ── Section wrapper ──────────────────────────────────────────────────────────
// tone: 'paper' (warm white, default) · 'mist' (subtle tint, alternation) · 'dark' (obsidian band).
// A 'dark' band scopes the `.dark` class locally → all tokens + the flywheel re-theme to dark.
export function Section({ children, className = '', id, tone = 'paper' }: {
  children: ReactNode; className?: string; id?: string; tone?: 'paper' | 'mist' | 'dark'
}) {
  const dark = tone === 'dark'
  const toneCls = dark
    ? 'dark band-obsidian border-y border-hairline/60 text-mist'
    : tone === 'mist'
      ? 'bg-slate2/70'
      : ''
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${toneCls} ${className}`}>
      {dark && (
        <>
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />
        </>
      )}
      <div className="container-x relative">{children}</div>
    </section>
  )
}

// ── Scroll reveal ────────────────────────────────────────────────────────────
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ── Eyebrow ──────────────────────────────────────────────────────────────────
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-gold/60" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

// ── Section heading ──────────────────────────────────────────────────────────
export function Heading({ eyebrow, title, sub, center = false, className = '' }: {
  eyebrow?: string; title: ReactNode; sub?: ReactNode; center?: boolean; className?: string
}) {
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">{eyebrow}</span>
          {center && <span className="h-px w-8 bg-gold/60" />}
        </div>
      )}
      <h2 className="h-display text-3xl sm:text-4xl lg:text-[2.9rem] leading-[1.05]">{title}</h2>
      {sub && <p className="mt-5 text-lg leading-relaxed text-muted">{sub}</p>}
    </div>
  )
}

// ── CTA link with arrow ──────────────────────────────────────────────────────
export function ArrowLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-gold transition hover:text-gold-light ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

// ── Pill button (Link) ───────────────────────────────────────────────────────
export function Btn({ to, href, variant = 'gold', children, className = '', sm = false }: {
  to?: string; href?: string; variant?: 'gold' | 'ghost'; children: ReactNode; className?: string; sm?: boolean
}) {
  const cls = `${variant === 'gold' ? 'btn-gold' : 'btn-ghost'} ${sm ? 'btn-sm' : ''} ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <button className={cls}>{children}</button>
}
