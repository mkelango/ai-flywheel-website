import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, ShieldCheck, GraduationCap, ClipboardCheck, PencilLine } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, JsonLd, PageHero, SCHOOLS_ORG, SectionHead, StageBadge } from "@/components/blocks";
import { PROGRAMMES, STAGE_META, band, getProgramme } from "@/lib/data";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { SITE, pageMeta } from "@/lib/seo";

/** H1, lead line and age range per band, so both "Class 4" and "age 9" searches match. */
const HEAD: Record<string, { h1: string; lead: string; ages: string; aud: string }> = {
  play: { h1: "AI for Class 1 and 2: Flywheel Play", lead: "AI for Class 1 and 2 (ages 6–7), fully unplugged: patterns, stories and a floor robot. No screens of their own, no marks.", ages: "6–7", aud: "Classes 1 and 2" },
  spark: { h1: "AI for Classes 3 to 5: Flywheel Spark", lead: "AI for Classes 3, 4 and 5 (ages 8–10): data hunts, robot recipes and block-coded robots. No AI accounts for children.", ages: "8–10", aud: "Classes 3, 4 and 5" },
  practitioner: { h1: "AI for Classes 6 to 8: Flywheel Practitioner", lead: "AI for Classes 6, 7 and 8 (ages 11–13): make with AI, then check it, cite it and label it.", ages: "11–13", aud: "Classes 6, 7 and 8" },
  "builders-club": { h1: "AI and robotics club for Classes 9–12: Flywheel Builders Club", lead: "An AI and robotics club for Classes 9, 10, 11 and 12 (ages 14–17): real projects in AI Flywheel Studio, with a capstone.", ages: "14–17", aud: "Classes 9, 10, 11 and 12" },
};

/** Contextual links per band: boards, lab, teacher kits and the parents' view. */
const RELATED: Record<string, { href: string; label: string }[]> = {
  play: [
    { href: "/parents/screen-time", label: "Screen time in AI lessons" },
    { href: "/lab", label: "Spark Lab Starter for Classes 1–5" },
    { href: "/teachers/kits", label: "AI lesson plans for teachers" },
  ],
  spark: [
    { href: "/programmes/boards", label: "CBSE AI curriculum, Class 3 to 8" },
    { href: "/lab", label: "AI lab for schools in Tamil Nadu" },
    { href: "/kids", label: "AI classes for kids, Classes 3–8" },
    { href: "/parents/safety", label: "Is AI safe for children?" },
  ],
  practitioner: [
    { href: "/programmes/boards", label: "CBSE AI curriculum, Class 3 to 8" },
    { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
    { href: "/parents/guide/homework-and-honesty", label: "AI and homework: a guide for parents" },
    { href: "/kids/weekend-club", label: "Weekend AI club for kids" },
  ],
  "builders-club": [
    { href: siteHref("studio", "/"), label: "AI Flywheel Studio" },
    { href: "/lab", label: "Spark Lab Advanced for Classes 1–12" },
    { href: "/events", label: "Inter-school AI challenge and Annual Showcase" },
    { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
  ],
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROGRAMMES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return {};
  return pageMeta(`/programmes/${p.slug}`, { title: `${p.name}, ${p.classes}`, description: `${p.line} ${p.time}. ${band(p.price)} per student a year (Ed 1.1 band, excl. GST).` });
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const idx = PROGRAMMES.indexOf(p);
  const next = PROGRAMMES[(idx + 1) % PROGRAMMES.length];

  const facts = [
    { I: Clock, k: "Time", v: p.time },
    { I: ShieldCheck, k: "AI use rule", v: p.aiUse },
    { I: GraduationCap, k: "Teacher training", v: p.training },
    { I: ClipboardCheck, k: "Progress report", v: p.reporting },
  ];

  const head = HEAD[p.slug];
  const url = `${SITE}/programmes/${p.slug}`;
  const course = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: `${p.name}: ${head.h1.split(":")[0]}`,
    description: `${head.lead} ${p.time}.`,
    url,
    courseCode: p.slug,
    provider: SCHOOLS_ORG,
    educationalLevel: `${p.classes} (ages ${head.ages})`,
    inLanguage: ["en-IN", "ta-IN"],
    audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: `School students, ${head.aud} (ages ${head.ages})` },
    teaches: STAGE_META.map((s) => `${s.verb} (${s.name} AI): ${p.stages[s.key]}`),
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Onsite", inLanguage: ["en-IN", "ta-IN"], courseWorkload: p.time },
    offers: {
      "@type": "Offer",
      category: "Paid",
      url,
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "INR",
        minPrice: p.price[0],
        maxPrice: p.price[1],
        unitText: "per student a year",
        valueAddedTaxIncluded: false,
        description: "Ed 1.1 price band, excl. GST. Quoted per school.",
      },
    },
  };

  return (
    <>
      <JsonLd data={course} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes", href: "/programmes" }, { label: p.name }]}
        eyebrow={`${p.name} · ${p.classes} · ages ${head.ages}`}
        title={head.h1}
        intro={head.lead}
        actions={
          <>
            <Button href="/demo">Book a demo</Button>
            <Button href="#sample" variant="secondary">
              See a sample lesson
            </Button>
          </>
        }
        art={
          <div className="rounded-[32px] p-7 md:p-9" style={{ background: p.tint }}>
            <p className="eyebrow !text-ink-2">Price band</p>
            <p className="mt-2 font-display text-4xl font-semibold text-ink">{band(p.price)}</p>
            <p className="mt-1 text-ink-2">
              per student a year <StatusTag status="Ed 1.1" />
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {STAGE_META.map((s) => (
                <StageBadge key={s.key} stage={s.key} className="bg-surface" />
              ))}
            </div>
            {p.levels && <p className="mt-6 text-ink-2">Levels: <span className="font-semibold text-ink">{p.levels}</span></p>}
          </div>
        }
      />

      {/* What children make each term */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHead eyebrow="Each term" title="What children make." />
          <ol className="grid gap-4 md:grid-cols-3">
            {p.terms.map((t, i) => (
              <Reveal key={t.term} delay={i * 0.06} className="card relative h-full p-7">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">{t.term}</span>
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">{t.make}</p>
                <span className="absolute right-6 top-6 inline-flex size-9 items-center justify-center rounded-full font-display font-semibold text-ink" style={{ background: p.tint }}>
                  {i + 1}
                </span>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STAGE_META.map((s) => (
              <div key={s.key} className="rounded-2xl bg-surface-2/70 p-4">
                <StageBadge stage={s.key} className="bg-surface" />
                <p className="mt-2 text-[0.95rem] text-ink-2">{p.stages[s.key]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sample lesson */}
      <section id="sample" className="scroll-mt-24 bg-surface-2/60 py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead eyebrow={`Sample lesson · ${p.sample.minutes} minutes`} title={p.sample.title} line="Every lesson ends with one check without AI." />
          <div className="card p-7">
            <ol className="space-y-4">
              {p.sample.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-highlight font-display font-semibold text-ink">{i + 1}</span>
                  <span className="pt-1 text-lg text-ink-2">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex gap-3 rounded-2xl bg-bg p-4 text-ink-2">
              <PencilLine className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
              <span>
                <span className="font-semibold text-ink">Check without AI: </span>
                {p.sample.check}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* Facts */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHead eyebrow="For the timetable" title="How it runs in your school." />
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
          <Link href={`/programmes/${next.slug}`} className="mt-10 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline">
            Next: {next.name}, {next.classes} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      {ANSWERS[`/programmes/${p.slug}`] && <QuickAnswers items={ANSWERS[`/programmes/${p.slug}`]} eyebrow={`Questions about ${p.classes}`} className="bg-surface-2/60" />}
      <RelatedLinks links={[...RELATED[p.slug], { href: "/programmes", label: "AI syllabus, Class 1 to 12" }]} />
      <DemoBand title={`See ${p.short} with your own ${p.classes} students.`} />
    </>
  );
}
