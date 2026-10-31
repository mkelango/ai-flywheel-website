import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, Clock, Flag, Languages, ShieldCheck } from "lucide-react";
import { Breadcrumbs, Button } from "@flywheel/ui/components/primitives";
import { Accordion } from "@flywheel/ui/components/interactive";
import { courseSchema, getProgramme, STAGE_META } from "@/lib/programmes";
import { TA_LEVEL_NAMES, TA_PROGRAMMES, TA_PROGRAMME_SLUGS, TA_STAGES, taAlternates, taBatch, taFaq, taLanguage, taPrice } from "@/lib/ta-content";
import { JsonLd } from "@/components/ui";
import { clampText } from "@/lib/seo";
import { TaLevelPill, TaPriceLine, TaProgrammeCard } from "@/components/ta/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return TA_PROGRAMME_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  const t = TA_PROGRAMMES[slug];
  if (!p || !t) return {};
  return {
    title: `${t.title}${p.level ? ` (${p.level})` : ""}`,
    description: clampText(`${t.outcome} ${t.format}. ${taPrice(p)}${p.price.startsWith("₹") ? ", GST நீங்கலாக" : ""}. அடுத்த தொகுதி ${taBatch(p.nextBatch)}.`),
    alternates: taAlternates(`/programmes/${slug}`),
  };
}

export default async function TaProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProgramme(slug);
  const t = TA_PROGRAMMES[slug];
  if (!p || !t) notFound();

  const stage = STAGE_META[p.stage];
  const faq = taFaq(p, t);
  const org = p.format === "For organisations";
  const next = p.next ? getProgramme(p.next) : undefined;
  const applyHref = `/contact?tag=${p.format === "For organisations" || p.format === "Executive" ? "business" : "professionals"}&programme=${p.slug}`;
  const applyLabel = p.priceStatus === "Free" ? "இலவசமாகத் தொடங்கு" : p.format === "For organisations" ? "எங்களுடன் பேசுங்கள்" : "விண்ணப்பிக்கவும்";
  const weeks = t.syllabus ?? [];

  return (
    <>
      <section className="relative border-b border-line">
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: stage.color }} aria-hidden />
        <div className="container-site pb-12 pt-10 md:pb-16 md:pt-14">
          <Breadcrumbs
            items={[
              { label: "முகப்பு", href: "/ta" },
              { label: "பாடங்கள்", href: "/ta/programmes" },
              { label: t.title },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <TaLevelPill level={p.level} />
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1 text-[0.75rem] text-ink">
                <span className="size-1.5 rounded-full" style={{ background: stage.color }} /> {TA_STAGES[p.stage]}
              </span>
            </div>
            <h1 className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.3] text-ink [overflow-wrap:anywhere] sm:text-[2rem] md:text-5xl">{t.title}</h1>
            <p className="mt-5 text-lg text-ink-2 md:text-xl">{t.outcome}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <li className="flex items-center gap-1.5">
                <Clock className="size-4 shrink-0" aria-hidden /> {t.format}
              </li>
              <li className="flex items-center gap-1.5">
                <Languages className="size-4 shrink-0" aria-hidden /> {taLanguage(p.language)}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container-site grid gap-12 py-12 md:py-16 lg:grid-cols-12">
        <aside className="lg:order-2 lg:col-span-4">
          <div className="card p-6 lg:sticky lg:top-28">
            <p className="eyebrow">அடுத்த தொகுதி</p>
            <p className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <CalendarDays className="size-5 text-muted" aria-hidden /> {taBatch(p.nextBatch)}
            </p>
            <div className="my-5 border-t border-line" />
            <TaPriceLine p={p} large />
            <ul className="mt-5 space-y-2 text-sm text-ink-2">
              {p.priceStatus !== "Free" && !org && (
                <li className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-physical" aria-hidden /> EMI · உதவித்தொகை (முன்மொழிவு)
                </li>
              )}
              {!org && (
                <li className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-physical" aria-hidden /> நிறுவன நிதியுதவிக் கடிதம்
                </li>
              )}
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-physical" aria-hidden /> முடித்ததும் {t.credential.split("·")[0].split(";")[0].trim()}
              </li>
            </ul>
            <Button href={applyHref} className="mt-6 w-full" size="lg">
              {applyLabel}
            </Button>
            {weeks.length > 0 && (
              <Link href="#syllabus" className="mt-3 flex min-h-11 items-center justify-center text-sm font-medium text-ink hover:text-primary-hover">
                பாடத்திட்டத்தைப் பாருங்கள்
              </Link>
            )}
            <Link href={`/programmes/${p.slug}`} lang="en" className="mt-1 flex min-h-11 items-center justify-center text-xs text-muted hover:text-ink">
              Read in English
            </Link>
          </div>
        </aside>

        <div className="min-w-0 space-y-16 lg:order-1 lg:col-span-8">
          <section aria-labelledby="outcomes">
            <h2 id="outcomes" className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">நீங்கள் செய்யக்கூடியவை</h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.outcomes.map((o, i) => (
                <li key={o} className="flex gap-4 rounded-xl border border-line bg-surface p-4">
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <span className="text-ink">{o}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">யாருக்கு</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line p-5">
                <dt className="eyebrow">யாருக்கு</dt>
                <dd className="mt-2 text-ink">{t.whoFor}</dd>
              </div>
              <div className="rounded-xl border border-line p-5">
                <dt className="eyebrow">தொடங்கும் முன்</dt>
                <dd className="mt-2 text-ink">{t.prerequisites}</dd>
              </div>
            </dl>
          </section>

          {weeks.length > 0 && (
            <section id="syllabus" aria-labelledby="syl" className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 id="syl" className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">பாடத்திட்டச் சுருக்கம்</h2>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <Flag className="size-4 text-primary-hover" aria-hidden /> வாயில்களும் சோதனைகளும் குறிக்கப்பட்டுள்ளன
                </p>
              </div>
              <ol className="mt-6 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
                {weeks.map((w) => (
                  <li key={w.when} className={`grid grid-cols-[5.5rem_1fr] gap-3 p-4 md:grid-cols-[6.5rem_1fr_auto] md:items-center ${w.gate?.startsWith("G") ? "bg-highlight/25" : ""}`}>
                    <span className="text-xs font-medium text-muted">{w.when}</span>
                    <span className="text-ink">{w.what}</span>
                    {w.gate ? (
                      <span className="col-start-2 inline-flex w-fit items-center gap-1.5 rounded-pill border border-ink/15 bg-bg px-2.5 py-1 text-[0.72rem] text-ink md:col-start-auto">
                        <Flag className="size-3 text-primary-hover" aria-hidden /> {w.gate}
                      </span>
                    ) : (
                      <span className="hidden md:block" />
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section aria-labelledby="cred">
            <h2 id="cred" className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">உங்கள் சான்றிதழ்</h2>
            <p className="mt-2 text-muted">{t.credential}. பொதுச் சரிபார்ப்புப் பக்கம்; ஆண்டுதோறும் புதுப்பிப்பு.</p>
            {p.level && (
              <div className="card mt-6 max-w-lg overflow-hidden">
                <div className="h-1.5" style={{ background: stage.color }} />
                <div className="flex items-center gap-5 p-6">
                  <div className="grid size-20 shrink-0 place-items-center rounded-full border-4" style={{ borderColor: stage.color }}>
                    <span className="font-display text-2xl font-semibold text-ink">{p.level}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow">Open Badges 3.0 · மாதிரி</p>
                    <p className="mt-1 font-display text-xl font-semibold text-ink">
                      {TA_LEVEL_NAMES[p.level]} ({p.level})
                    </p>
                    <p className="text-sm text-ink-2">{t.title}</p>
                  </div>
                </div>
              </div>
            )}
            <Link href="/verify" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
              <ShieldCheck className="size-4" /> சரிபார்ப்பு எப்படி
            </Link>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className="mb-4 font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">கேள்விகள்</h2>
            <Accordion items={faq} />
          </section>

          {next && (
            <section aria-labelledby="nextlvl">
              <h2 id="nextlvl" className="mb-5 flex items-center gap-2 font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
                உங்கள் அடுத்த நிலை <ArrowRight className="size-6" />
              </h2>
              <div className="max-w-sm">
                <TaProgrammeCard p={next} />
              </div>
            </section>
          )}
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: t.title,
          description: t.outcome,
          url: `https://aiflywheel.in/ta/programmes/${p.slug}`,
          provider: { "@type": "Organization", name: "AI Flywheel", sameAs: "https://aiflywheel.in" },
          educationalLevel: p.level ?? "Organisation",
          inLanguage: "ta-IN",
          teaches: t.outcomes,
          ...courseSchema(p),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "ta-IN",
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
