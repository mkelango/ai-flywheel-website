import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, FileText, Download, Mic, Calendar, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { POSTS } from '../data/insights'
import { GLOSSARY } from '../data/glossary'

export default function Resources() {
  const posts = POSTS.slice(0, 4)
  const glossaryPeek = GLOSSARY.filter((t) => ['agentic-ai', 'foundation-ai', 'drive-methodology', 'core-governance-framework', 'maturity-model', 'implementation-gap', 'interoperability', 'sovereign-ai', 'agent-operating-model', 'mcp', 'physical-ai', 'the-trust-ceiling'].includes(t.slug))

  return (
    <>
      <Seo title="Resources — the content engine" path="/resources"
        description="The State of AI Implementation report, insights, case studies, the toolkit, the book, and the glossary. Authority before the ask." />
      <PageHero
        eyebrow="Resources · the content engine"
        title={<>Authority before the ask. <span className="text-shimmer">Proof before the claim.</span></>}
        sub="The widest mouth of the funnel — the free framework, original research, case studies, the toolkit, and the book. Every asset serves before it sells."
        accent="#45C3B9"
      />

      {/* Report — flagship magnet */}
      <Section id="report">
        <Reveal>
          <Link to="/report" className="group relative block overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] to-ink p-8 transition hover:border-gold/50 sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="chip border-gold/40 text-gold"><FileText className="h-3.5 w-3.5" /> Flagship research · annual</span>
                <h2 className="mt-5 font-display text-3xl font-bold text-cloud group-hover:text-gold-light sm:text-4xl">State of AI Implementation</h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist">Our own report, built from platform and assessment data — the most-cited yardstick on what actually works. Ungated summary; full report by email.</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Read the report <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
              <div className="rounded-2xl border border-hairline/60 bg-ground/40 p-6">
                {[['Honest', 'We publish the failure data, then beat it.'], ['Original', 'Proprietary data competitors can\'t copy.'], ['Cited', 'The yardstick the field measures against.']].map(([t, d]) => (
                  <div key={t} className="border-b border-hairline/30 py-3 last:border-0"><div className="font-display text-sm font-semibold text-cloud">{t}</div><div className="text-[12.5px] text-muted">{d}</div></div>
                ))}
              </div>
            </div>
          </Link>
        </Reveal>
      </Section>

      {/* Insights */}
      <Section id="insights" className="border-t border-hairline/40">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <Heading eyebrow="Insights / blog" title="The content engine." sub="Practical 'Apply It Monday' posts, framework explainers, and commentary on the moving model layer." />
            <Link to="/insights" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light sm:inline-flex">All insights <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link to={`/insights/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-hairline/70 bg-panel/50 p-6 transition hover:-translate-y-1 hover:border-gold/30">
                <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: p.color }}>{p.tag}</span>
                <h3 className="mt-3 flex-1 font-display text-[15px] font-semibold leading-snug text-cloud group-hover:text-gold">{p.title}</h3>
                <span className="mt-4 font-mono text-[11px] text-faint">{p.read} read</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Cases + toolkit + book */}
      <Section className="border-t border-hairline/40">
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal>
            <Link to="/case-studies" id="cases" className="card flex h-full flex-col p-7 lift-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-foundation/15"><Sparkles className="h-5 w-5 text-foundation" /></span>
              <h3 className="mt-5 font-display text-lg font-bold text-cloud">Case Studies</h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">Flywheel-in-Action, filterable by actor and stage. Positive examples and honest cautionary tales.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Browse cases <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>
          <Reveal delay={0.07}>
            <Link to="/toolkit" id="toolkit" className="card flex h-full flex-col p-7 lift-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-generative/15"><Download className="h-5 w-5 text-generative" /></span>
              <h3 className="mt-5 font-display text-lg font-bold text-cloud">The Toolkit &amp; Templates</h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">All 28 tools — free to download, ready to use. The Agent Operating Model, the Validation Scorecard, and more.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Get the toolkit <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>
          <Reveal delay={0.14}>
            <Link to="/book" id="book" className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-panel to-ink p-7 lift-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15"><BookOpen className="h-5 w-5 text-gold" /></span>
              <h3 className="mt-5 font-display text-lg font-bold text-cloud">The Book — <span className="text-shimmer">The AI Flywheel</span></h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">The front door. Four reading paths, twenty-four chapters, a free excerpt, and the formats.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">About the book <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Events / podcast / glossary */}
      <Section className="border-t border-hairline/40">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <Heading eyebrow="Audience-building machine" title="Events, podcast & the Summit." />
            <div className="mt-7 space-y-4">
              {[[Calendar, 'Events & The Summit', 'The brand\'s gravitational center — tickets, sponsors, partner showcases, the AI Flywheel Awards.'], [Mic, 'Webinars · Podcast · Videos', 'Long-form with operators, policymakers, and partners. Authority and guest-sourced case studies.']].map(([Icon, t, d]: any) => (
                <div key={t} className="flex items-start gap-4 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/12"><Icon className="h-5 w-5 text-gold" /></span>
                  <div><div className="font-display text-[15px] font-semibold text-cloud">{t}</div><p className="mt-0.5 text-[13px] text-muted">{d}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div id="glossary">
              <div className="flex items-end justify-between gap-4">
                <Heading eyebrow="Programmatic SEO" title="The Glossary." sub="Every framework term, its own page." />
                <Link to="/glossary" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light sm:inline-flex">All {GLOSSARY.length} terms <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {glossaryPeek.map((g) => (
                  <Link key={g.slug} to={`/glossary/${g.slug}`} className="rounded-full border border-hairline/70 bg-[rgb(var(--tint)/0.03)] px-4 py-2 text-[13px] text-mist transition hover:border-gold/40 hover:text-gold">{g.term.replace(/\s*\(.*?\)/g, '')}</Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
