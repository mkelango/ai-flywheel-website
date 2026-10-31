import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, ShieldCheck, GraduationCap, ClipboardCheck, PencilLine } from "lucide-react";
import { Button, Container } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { PageHero, SectionHead } from "@/components/blocks";
import { TaDemoBand, TaStageBadge, TaStatus } from "@/components/ta/blocks";
import { PROGRAMMES, STAGE_META, band, getProgramme } from "@/lib/data";
import { taMeta } from "@/lib/ta";
import { TA_PROGRAMMES, taClasses } from "@/lib/ta-content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRAMMES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProgramme((await params).slug);
  if (!p) return {};
  const t = TA_PROGRAMMES[p.slug];
  return taMeta(`/programmes/${p.slug}`, `${taClasses(p.classRange)}க்கு AI: ${p.name}`, `${t.line} ${t.time}. ஒரு மாணவருக்கு ஆண்டுக்கு ${band(p.price)} (Ed 1.1 வரம்பு, GST தவிர).`);
}

export default async function TaProgrammePage({ params }: Props) {
  const p = getProgramme((await params).slug);
  if (!p) notFound();
  const t = TA_PROGRAMMES[p.slug];
  const cls = taClasses(p.classRange);
  const next = PROGRAMMES[(PROGRAMMES.indexOf(p) + 1) % PROGRAMMES.length];

  const facts = [
    { I: Clock, k: "நேரம்", v: t.time },
    { I: ShieldCheck, k: "AI பயன்பாட்டு விதி", v: t.aiUse },
    { I: GraduationCap, k: "ஆசிரியர் பயிற்சி", v: t.training },
    { I: ClipboardCheck, k: "முன்னேற்ற அறிக்கை", v: t.reporting },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "திட்டங்கள்", href: "/ta/programmes" }, { label: p.name }]}
        eyebrow={cls}
        title={`${cls}க்கு AI: ${p.name}`}
        intro={t.line}
        actions={
          <>
            <Button href="/demo">டெமோ பதிவு செய்யுங்கள்</Button>
            <Button href="#sample" variant="secondary">
              மாதிரிப் பாடம்
            </Button>
          </>
        }
        art={
          <div className="rounded-[32px] p-7 md:p-9" style={{ background: p.tint }}>
            <p className="eyebrow !text-ink-2">கட்டண வரம்பு</p>
            <p className="mt-2 font-display text-4xl font-semibold text-ink">{band(p.price)}</p>
            <p className="mt-1 text-ink-2">
              ஒரு மாணவருக்கு, ஆண்டுக்கு <TaStatus status="Ed 1.1" />
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {STAGE_META.map((s) => (
                <TaStageBadge key={s.key} stage={s.key} className="bg-surface" />
              ))}
            </div>
            {t.levels && (
              <p className="mt-6 text-ink-2">
                நிலைகள்: <span className="font-semibold text-ink">{t.levels}</span>
              </p>
            )}
          </div>
        }
      />

      {/* Each term */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHead eyebrow="ஒவ்வொரு பருவமும்" title="குழந்தைகள் என்ன உருவாக்குகிறார்கள்." />
          <ol className="grid gap-4 md:grid-cols-3">
            {t.terms.map((make, i) => (
              <Reveal key={make} delay={i * 0.06} className="card relative h-full p-7">
                <span className="text-sm font-semibold text-muted">பருவம் {i + 1}</span>
                <p className="mt-3 pr-10 font-display text-xl font-semibold leading-snug text-ink">{make}</p>
                <span className="absolute right-6 top-6 inline-flex size-9 items-center justify-center rounded-full font-display font-semibold text-ink" style={{ background: p.tint }} aria-hidden>
                  {i + 1}
                </span>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STAGE_META.map((s) => (
              <div key={s.key} className="rounded-2xl bg-surface-2/70 p-4">
                <TaStageBadge stage={s.key} className="bg-surface" />
                <p className="mt-2 text-[0.95rem] text-ink-2">{t.stages[s.key]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sample lesson */}
      <section id="sample" className="scroll-mt-24 bg-surface-2/60 py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead eyebrow={`மாதிரிப் பாடம் · ${p.sample.minutes} நிமிடம்`} title={t.sample.title} line="ஒவ்வொரு பாடமும் AI இல்லாத ஒரு சரிபார்ப்புடன் முடிகிறது." />
          <div className="card p-7">
            <ol className="space-y-4">
              {t.sample.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-highlight font-display font-semibold text-ink">{i + 1}</span>
                  <span className="pt-1 text-lg text-ink-2">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex gap-3 rounded-2xl bg-bg p-4 text-ink-2">
              <PencilLine className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
              <span>
                <span className="font-semibold text-ink">AI இல்லாத சரிபார்ப்பு: </span>
                {t.sample.check}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* Facts */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHead eyebrow="கால அட்டவணைக்கு" title="உங்கள் பள்ளியில் இது எப்படி நடக்கிறது." />
          <dl className="grid gap-4 sm:grid-cols-2">
            {facts.map(({ I, k, v }) => (
              <div key={k} className="card flex gap-4 p-6">
                <I className="mt-1 size-6 shrink-0 text-ink" aria-hidden />
                <div>
                  <dt className="font-display font-semibold text-ink">{k}</dt>
                  <dd className="mt-1 text-ink-2">{v}</dd>
                </div>
              </div>
            ))}
          </dl>
          <Link href={`/ta/programmes/${next.slug}`} className="mt-10 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline">
            அடுத்து: {next.name}, {taClasses(next.classRange)} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      <TaDemoBand title={`உங்கள் ${cls} மாணவர்களுடன் ${p.name} பாருங்கள்.`} />
    </>
  );
}
