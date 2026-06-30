import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Check, ArrowRight, Loader2, Award } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { findCert, CERTS } from '../data/certifications'
import { startCheckout } from '../lib/checkout'
import { Seo, breadcrumbLd } from '../lib/seo'

export default function Certification() {
  const { slug = '' } = useParams()
  const c = findCert(slug)
  const [region, setRegion] = useState<'global' | 'india'>('global')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  if (!c) return <Section className="pt-32 text-center"><h1 className="h-display text-3xl">Certification not found</h1><div className="mt-6"><Btn to="/academy">All certifications</Btn></div></Section>

  const price = region === 'global' ? c.priceGlobal : c.priceIndia
  const amount = Number(price.replace(/[^0-9.]/g, '')) || 0
  const buy = async () => {
    setBusy(true); setErr('')
    try { await startCheckout({ sku: `cert-${c.slug}`, name: `${c.name} — exam`, amount, currency: region === 'global' ? 'usd' : 'inr', region }) }
    catch (e: any) { setErr(e.message || 'Checkout failed.'); setBusy(false) }
  }

  return (
    <>
      <Seo
        title={`${c.name} certification`}
        description={c.whoFor.slice(0, 155)}
        path={`/certifications/${c.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Course', name: c.name, description: c.whoFor, provider: { '@type': 'Organization', name: 'The AI Flywheel' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
          breadcrumbLd([['Learn & Certify', '/academy'], [c.name, `/certifications/${c.slug}`]]),
        ]}
      />
      <PageHero eyebrow={`Certification · Level ${c.level}`} title={c.name} sub={c.whoFor} accent={c.accent}
        crumbs={[['Learn & Certify', '/academy'], ['Certifications', '/academy#ladder'], [c.name, `/certifications/${c.slug}`]]}>
        {c.flagship && <span className="chip border-gold/40 text-gold"><Award className="h-3.5 w-3.5" /> ★ The flagship credential</span>}
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* left: detail */}
          <div className="space-y-10">
            <Reveal>
              <Heading eyebrow="What you'll be able to do" title="Outcomes, not just a badge." />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-3.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: c.accent }} /><span className="text-[13.5px] text-mist">{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-faint">Syllabus</h3>
              <ol className="space-y-2.5">
                {c.syllabus.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-3.5">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-gold/15 font-mono text-[11px] font-bold text-gold">{i + 1}</span>
                    <span className="text-[14px] text-mist">{s}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-faint">FAQ</h3>
              <div className="space-y-3">
                {c.faq.map((f) => (
                  <div key={f.q} className="rounded-xl border border-hairline/50 bg-panel/40 p-4">
                    <p className="font-display text-[14px] font-semibold text-cloud">{f.q}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{f.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* right: buy card */}
          <Reveal delay={0.1}>
            <aside className="sticky top-24 space-y-4">
              <div className="card p-6">
                <div className="mb-4 inline-flex rounded-full border border-hairline/70 bg-ground/40 p-1">
                  {(['global', 'india'] as const).map((r) => (
                    <button key={r} onClick={() => setRegion(r)} className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition ${region === r ? 'bg-gold text-ground' : 'text-faint hover:text-cloud'}`}>{r}</button>
                  ))}
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-display text-3xl font-bold text-cloud">{price}</span>
                  <span className="mb-1 text-[12px] text-faint">exam</span>
                </div>
                <button onClick={buy} disabled={busy} className="btn-gold mt-5 w-full disabled:opacity-60">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{c.flagship ? 'Book the exam' : 'Enrol now'} <ArrowRight className="h-4 w-4" /></>}
                </button>
                {err && <p className="mt-2 text-[12px] text-physical">{err}</p>}
                <dl className="mt-6 space-y-2.5 text-[13px]">
                  {[['Level', `L${c.level.replace('—', '—')}`], ['Prerequisite', c.prerequisite], ['Exam format', c.exam], ['Validity', c.validity], ['Recertification', c.recert], ['For', c.audience]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-hairline/30 pb-2"><dt className="text-faint">{k}</dt><dd className="text-right text-mist">{v}</dd></div>
                  ))}
                </dl>
                <p className="mt-4 text-[11px] text-faint">Illustrative pricing · includes one free retake · platform access bundled.</p>
              </div>
              <Link to="/academy#ladder" className="block text-center text-sm text-faint transition hover:text-cloud">← See the full ladder</Link>
            </aside>
          </Reveal>
        </div>

        {/* other certs */}
        <div className="mt-14 border-t border-hairline/40 pt-10">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-faint">Continue the climb</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.filter((x) => x.slug !== c.slug).slice(0, 4).map((x) => (
              <Link key={x.slug} to={`/certifications/${x.slug}`} className="group rounded-2xl border border-hairline/60 bg-panel/40 p-5 transition hover:border-gold/40">
                <span className="font-mono text-[11px] text-faint">L{x.level}</span>
                <h3 className="mt-1 font-display text-[14px] font-semibold text-cloud group-hover:text-gold">{x.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
