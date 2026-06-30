import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles, ArrowRight, Info, Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { Seo } from '../lib/seo'
import { Section, Heading, Reveal, Btn } from '../lib/primitives'
import { TIERS } from '../data/content'
import { CERTS } from '../data/certifications'
import { startCheckout } from '../lib/checkout'

export default function Pricing() {
  const [region, setRegion] = useState<'global' | 'india'>('global')
  const [busy, setBusy] = useState<string | null>(null)
  const [err, setErr] = useState('')

  const currency = region === 'global' ? 'usd' : 'inr'
  const toAmount = (price: string) => Number(price.replace(/[^0-9.]/g, '')) || 0

  const buy = async (sku: string, name: string, amount: number) => {
    if (!amount) return
    setBusy(sku); setErr('')
    try { await startCheckout({ sku, name, amount, currency, region }) }
    catch (e: any) { setErr(e.message || 'Checkout failed.'); setBusy(null) }
  }

  const platformAmt = (name: string) => region === 'india'
    ? ({ Team: 2000, Business: 3500 } as Record<string, number>)[name]
    : ({ Team: 40, Business: 60 } as Record<string, number>)[name]
  return (
    <>
      <Seo title="Pricing — platform tiers + certification" path="/pricing"
        description="Free to Enterprise platform tiers and the certification ladder, with Global and India pricing. A cheap front door; the money on the recurring back end." />
      <PageHero
        eyebrow="Pricing · platform + certification"
        title={<>Price the front door to spread. <span className="text-shimmer">Make the money recurring.</span></>}
        sub="A cheap, wide front door (the free diagnostic + Foundation), an anchored flagship (Agentic), and recurring blades (platform + recertification). Transparent for self-serve, talk-to-us for enterprise and sovereign."
        accent="#E6B968"
      />

      {/* Honesty note */}
      <div className="container-x -mt-6">
        <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-gold/[0.04] p-4 text-[13px] text-mist">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p><span className="font-semibold text-gold">Illustrative &amp; directional.</span> Every price below is a benchmark to anchor on, not a final quote — validated against willingness-to-pay per segment. India is priced for volume; global for value. Same framework, different fuel.</p>
        </div>
      </div>

      {/* Platform tiers */}
      <Section>
        <Reveal><Heading eyebrow="The platform" title="Free → Team → Business → Enterprise." sub="Annual billing saves roughly two months. Every certified practitioner gets platform access included — the two engines pull each other." /></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className={`relative flex h-full flex-col rounded-2xl border p-7 ${t.featured ? 'border-gold/50 bg-gradient-to-b from-gold/[0.07] to-transparent shadow-glow-gold' : 'border-hairline/70 bg-panel/50'}`}>
                {t.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold-light to-gold-deep px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ground">Most popular</span>}
                <h3 className="font-display text-lg font-bold text-cloud">{t.name}</h3>
                <div className="mt-3 flex items-end gap-1.5">
                  <span className="font-display text-3xl font-bold text-cloud">{t.price}</span>
                  <span className="mb-1 text-[12px] text-faint">{t.cadence}</span>
                </div>
                <p className="mt-2 text-[12.5px] text-muted">{t.best}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-mist">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-core" /> {f}
                    </li>
                  ))}
                </ul>
                {t.name === 'Free' ? (
                  <Btn to="/diagnostic" variant="ghost" sm className="mt-6 w-full">{t.cta}</Btn>
                ) : t.name === 'Enterprise' ? (
                  <Btn to="/contact?type=enterprise" variant="ghost" sm className="mt-6 w-full">{t.cta}</Btn>
                ) : (
                  <button onClick={() => buy(`platform-${t.name}`, `Platform — ${t.name} (per seat / mo)`, platformAmt(t.name))}
                    disabled={busy === `platform-${t.name}`}
                    className={`${t.featured ? 'btn-gold' : 'btn-ghost'} btn-sm mt-6 w-full disabled:opacity-60`}>
                    {busy === `platform-${t.name}` ? <Loader2 className="h-4 w-4 animate-spin" /> : t.cta}
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        {err && <p className="mt-4 text-center text-[13px] text-physical">{err}</p>}
        <p className="mt-6 text-center text-[12px] text-faint">Checkout runs in safe demo mode until Stripe / Razorpay keys are configured — no card is charged.</p>
      </Section>

      {/* Certification pricing */}
      <Section className="border-t border-hairline/40">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <Heading eyebrow="The certification ladder" title="Own the standard. Climb the ladder." sub="Each rung priced so the next is an easy step. The Agentic AI Engineer is the hero — everything anchors to it." />
            <div className="inline-flex rounded-full border border-hairline/70 bg-panel/60 p-1">
              {(['global', 'india'] as const).map((r) => (
                <button key={r} onClick={() => setRegion(r)} className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition ${region === r ? 'bg-gold text-ground' : 'text-faint hover:text-cloud'}`}>{r}</button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 overflow-hidden rounded-2xl border border-hairline/60">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-hairline/60 bg-panel/60 font-mono text-[11px] uppercase tracking-wider text-faint">
                  <th className="px-5 py-4 font-medium">Level</th>
                  <th className="px-5 py-4 font-medium">Certification</th>
                  <th className="hidden px-5 py-4 font-medium sm:table-cell">For</th>
                  <th className="hidden px-5 py-4 font-medium md:table-cell">Exam format</th>
                  <th className="px-5 py-4 text-right font-medium">Exam ({region})</th>
                </tr>
              </thead>
              <tbody>
                {CERTS.map((c) => {
                  const p = region === 'global' ? c.priceGlobal : c.priceIndia
                  return (
                  <tr key={c.name} className={`border-b border-hairline/30 transition hover:bg-[rgb(var(--tint)/0.03)] ${c.flagship ? 'bg-gold/[0.04]' : ''}`}>
                    <td className="px-5 py-4 font-mono text-[12px] text-faint">{c.level}</td>
                    <td className="px-5 py-4">
                      <Link to={`/certifications/${c.slug}`} className="font-display font-semibold text-cloud transition hover:text-gold">{c.name}</Link>
                      {c.flagship && <span className="ml-2 chip border-gold/40 text-gold">★ Flagship</span>}
                    </td>
                    <td className="hidden px-5 py-4 text-muted sm:table-cell">{c.audience}</td>
                    <td className="hidden px-5 py-4 text-muted md:table-cell">{c.exam}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="font-mono text-mist">{p}</div>
                      <button
                        onClick={() => buy(`cert-${c.name}`, `${c.name} — exam`, toAmount(p))}
                        disabled={busy === `cert-${c.name}`}
                        className="mt-1 inline-flex items-center gap-1 font-display text-[11px] font-semibold text-gold transition hover:text-gold-light disabled:opacity-60">
                        {busy === `cert-${c.name}` ? <Loader2 className="h-3 w-3 animate-spin" /> : <>{c.flagship ? 'Book the exam' : 'Enrol'} →</>}
                      </button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ['Recurring by design', 'Every credential carries an annual recertification — the model layer moves in weeks; your cert keeps pace.'],
              ['Bundles discount the climb', 'On-Ramp, Agentic Track, Implementer Path, and the full Strategist climb — priced to pull you up.'],
              ['Accredited Training Orgs', 'Others pay to teach your curriculum and run your exams — the ITIL / PMI / SAFe position.'],
            ].map(([t, d]) => (
              <div key={t} className="card p-5"><h3 className="font-display text-[14px] font-semibold text-cloud">{t}</h3><p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{d}</p></div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Enterprise CTA */}
      <Section className="border-t border-hairline/40">
        <div className="relative overflow-hidden rounded-3xl border border-hairline/60 bg-gradient-to-br from-steel/40 to-ink p-8 text-center sm:p-12">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
          <Reveal>
            <h2 className="h-display mx-auto max-w-2xl text-3xl sm:text-4xl">Enterprise, government &amp; sovereign deployment.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted">Custom annual licensing, bundled certification seats, data residency, and dedicated success. Population-scale and in-jurisdiction options for governments.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Btn to="/contact?type=enterprise"><Sparkles className="h-4 w-4" /> Talk to us</Btn>
              <Btn to="/solutions/government" variant="ghost">The Economy Program <ArrowRight className="h-4 w-4" /></Btn>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  )
}

