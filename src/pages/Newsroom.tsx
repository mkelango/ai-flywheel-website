import { Link } from 'react-router-dom'
import { ArrowRight, FileText, BookOpen, Activity, Download, Mail, Image } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { Seo, breadcrumbLd } from '../lib/seo'

const ANNOUNCEMENTS = [
  { icon: Activity, color: '#45C3B9', tag: 'The standard', title: 'The AI Flywheel framework, published', body: 'The canonical, versioned framework for turning AI into compounding value — four stages, the DRIVE method, CORE governance — is free and open to read.', to: '/framework', cta: 'Read the framework' },
  { icon: FileText, color: '#E6B968', tag: 'Research', title: 'State of AI Implementation — the annual report', body: 'Our flagship research on what actually closes the gap between AI spend and value, built from platform and assessment data. Ungated summary available.', to: '/report', cta: 'See the report' },
  { icon: BookOpen, color: '#8E86F0', tag: 'The book', title: 'The AI Flywheel — the book', body: 'The whole argument in one place, with four reading paths for the executive, the policymaker, the institution leader, and the practitioner.', to: '/book', cta: 'About the book' },
]

const ASSETS = [
  { label: 'The framework, at a glance (one-pager)', href: '/downloads/AI-Flywheel-At-a-Glance.md' },
  { label: 'Social / share image', href: '/og-image.svg' },
  { label: 'The Flywheel Toolkit (28 tools)', href: '/downloads/AI-Flywheel-Toolkit.md' },
]

export default function Newsroom() {
  return (
    <>
      <Seo title="Newsroom — press & media" path="/newsroom"
        description="News, announcements, and media resources for The AI Flywheel — the standard for turning AI into compounding value. Press contact and brand assets."
        jsonLd={breadcrumbLd([['Company', '/about'], ['Newsroom', '/newsroom']])} />
      <PageHero eyebrow="Newsroom · press & media" title={<>The <span className="text-shimmer">Newsroom</span>.</>}
        accent="#45C3B9"
        sub="Announcements, the research, and everything press needs. We publish only verified, audited proof — and we're glad to talk to journalists, analysts, and policymakers." />

      {/* Announcements */}
      <Section>
        <Reveal><Heading eyebrow="Announcements" title="What's live." /></Reveal>
        <div className="mt-10 space-y-4">
          {ANNOUNCEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <Link to={a.to} className="group grid items-center gap-5 rounded-2xl border border-hairline/60 bg-panel/40 p-6 transition hover:border-gold/40 sm:grid-cols-[auto_1fr_auto]">
                <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${a.color}1a` }}><a.icon className="h-6 w-6" style={{ color: a.color }} /></span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: a.color }}>{a.tag}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-cloud group-hover:text-gold">{a.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{a.body}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 justify-self-start text-sm font-semibold text-gold sm:justify-self-end">{a.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Press contact + assets */}
      <Section className="border-t border-hairline/40">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15"><Mail className="h-5 w-5 text-gold" /></span>
              <h3 className="mt-5 font-display text-xl font-bold text-cloud">Media &amp; press enquiries</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">Interviews with the team, commentary on the moving model layer, data from the report, or speaking requests — we respond quickly to press.</p>
              <div className="mt-6"><Btn to="/contact?type=press">Contact the press team <ArrowRight className="h-4 w-4" /></Btn></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-foundation/15"><Image className="h-5 w-5 text-foundation" /></span>
              <h3 className="mt-5 font-display text-xl font-bold text-cloud">Brand &amp; media assets</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">The one-pager, the share image, and the toolkit — free to use with attribution.</p>
              <ul className="mt-5 space-y-2.5">
                {ASSETS.map((a) => (
                  <li key={a.label}>
                    <a href={a.href} className="group flex items-center justify-between gap-3 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] px-4 py-3 transition hover:border-gold/40">
                      <span className="text-[13.5px] text-mist group-hover:text-gold">{a.label}</span>
                      <Download className="h-4 w-4 text-faint group-hover:text-gold" />
                    </a>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light">About the standard <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
