import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Figure from './Figure'
import type { Img } from '../lib/images'

export default function PageHero({ eyebrow, title, sub, children, accent = '#E6B968', crumbs, image, imageAlt }: {
  eyebrow: string; title: ReactNode; sub?: ReactNode; children?: ReactNode; accent?: string; crumbs?: [string, string][]
  image?: Img; imageAlt?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline/40 pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div className="grid-texture absolute inset-0 opacity-[0.3]" />
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full blur-[120px]" style={{ background: `${accent}1f` }} />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-12">
        <div className={image ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl'}>
          {crumbs && (
            <nav className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-faint">
              {crumbs.map(([label, href], i) => (
                <span key={label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-hairline">/</span>}
                  <Link to={href} className="transition hover:text-gold">{label}</Link>
                </span>
              ))}
            </nav>
          )}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: accent }} />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: accent }}>{eyebrow}</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-cloud sm:text-5xl lg:text-[3.4rem]">{title}</h1>
            {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{sub}</p>}
            {children && <div className="mt-8">{children}</div>}
          </motion.div>
        </div>

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <Figure img={image} ratio="photo" eager accent={accent} scrim="soft"
                className="border border-hairline/70 shadow-lift" />
              {/* small accent corner plate, echoing the Trueline framing */}
              <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-20 w-20 rounded-xl border border-hairline/70 bg-panel/80 backdrop-blur sm:block" />
              <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-20 w-20 rounded-xl sm:block" style={{ boxShadow: `inset 0 0 0 1px ${accent}33` }} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
