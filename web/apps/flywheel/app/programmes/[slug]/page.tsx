import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CalendarDays, Check, Clock, Flag, IndianRupee, Languages, Layers, ShieldCheck } from "lucide-react";
import { Breadcrumbs, Button } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { COHORT_WEEKS, courseSchema, getProgramme, LEVEL_NAMES, PROGRAMMES, STAGE_META, type Programme, type Week } from "@/lib/programmes";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { BadgeCard, JsonLd, LevelPill, PriceLine } from "@/components/ui";
import { STAGE_PAGES, getStagePage, stageSlug } from "@/lib/learn";
import { StageView } from "@/components/learn/StageView";
import { LABS } from "@/lib/orgs";
import { AUTHOR_ID, ORG_ID, pageMeta, type QA } from "@/lib/seo";
import { CODING, PROGRAMME_EXTRA, PROGRAMME_KEYWORD } from "@/lib/answers";
import { FaqList } from "@/components/QuickAnswers";
import { faqJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return [...PROGRAMMES.map((p) => ({ slug: p.slug })), ...STAGE_PAGES.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stagePage = getStagePage(slug);
  if (stagePage) {
    return pageMeta(`/programmes/${stagePage.slug}`, {
      title: `${stagePage.name} programmes`,
      description: `${stagePage.line} Levels C1 to C5, the life cycle, and programmes in rupees.`,
    });
  }
  const p = getProgramme(slug);
  if (!p) return {};
  return pageMeta(`/programmes/${p.slug}`, {
    title: `${p.title}${p.level ? ` (${p.level})` : ""}`,
    description: `${p.outcome} ${p.formatDetail}, ${p.hours}. ${p.price}${p.price.startsWith("₹") ? " excl. GST" : ""}. Next batch ${p.nextBatch}.`,
  });
}

const STUDIO_PATH: Record<string, string> = { foundation: "/model", generative: "/generative", agentic: "/agentic", physical: "/robotic" };

const ELECTIVE: Record<string, string> = { agentic: "agents", generative: "generation", foundation: "models", physical: "machines" };

function syllabusFor(p: Programme): Week[] {
  if (p.usesCohortSyllabus) {
    return COHORT_WEEKS.map((w) => (w.taught === "Stage elective" ? { ...w, taught: `Stage elective: ${ELECTIVE[p.stage] ?? "your stage"}` } : w));
  }
  return p.modules ?? [];
}

/** "~8 h a week" → "about 8 hours a week". */
function hoursText(h: string) {
  return h.replace(/^~/, "about ").replace(/h/, "hours");
}

const DURATION: Record<string, string> = {
  "ai-for-managers": "Four weeks, at about 3 hours a week. AI for Managers is a cohort-lite course, so you learn beside other managers and apply each week's idea to your own team.",
  "drive-implementer": "Eight weeks. DRIVE Implementer is an 8-week executive cohort in which you run a portfolio of AI turns and earn Leader (C4) in DRIVE.",
  "core-governance-lead": "Eight weeks. CORE Governance Lead is an 8-week cohort with a case review, ending in an accountability records review for Leader (C4) in CORE.",
  "ai-flywheel-strategist": "It runs on an executive schedule. The AI Flywheel Strategist is an executive programme that ends in a panel review for Architect (C5).",
  "leadership-programme": "Two days, then a 90-day follow-up on one decision. Your executive team works together for two days, and progress is checked over the following 90 days.",
  "workforce-licence": "A year at a time. The licence is sold per seat for a year, and each employee takes self-paced C1 and C2 courses at their own pace.",
};

const PRICE_LABEL = { "Ed 1.1": "This band is from Website Strategy Ed. 1.1.", Proposed: "This band is proposed and will be confirmed before launch.", Free: "" } as const;

/** Six answer-first questions in the order searchers ask them: fees, duration, eligibility, coding, validity, mode. */
function faqFor(p: Programme): QA[] {
  const org = p.format === "For organisations";
  const quoted = !p.price.startsWith("₹") && p.priceStatus !== "Free";
  const fee =
    p.priceStatus === "Free"
      ? `${p.title} is free, with no card needed.${p.priceNote ? ` ${p.priceNote}, excluding GST.` : ""} Paid programmes that follow offer EMI and an employer sponsorship letter.`
      : quoted
        ? `${p.title} is ${p.price.toLowerCase()}, excluding GST. ${PRICE_LABEL[p.priceStatus]} Tell us your team size and goals and we will send a written quote with a GST invoice.`
        : `${p.title} costs ${p.price}${p.priceNote ? ` (${p.priceNote.toLowerCase()})` : ""}, excluding GST. ${PRICE_LABEL[p.priceStatus]}${org ? " Invoices include GST." : " EMI, a GST invoice and an employer sponsorship letter are available; student and women-in-tech scholarships are proposed."}`;
  const duration =
    (p.usesCohortSyllabus
      ? `${p.title} is a ${p.formatDetail.replace(" · ", " in ").replace(" + ", " plus ")}, at ${hoursText(p.hours)}. Gates G1 to G5 fall within 12 weeks; G6 and the Builder (C3) award come at week 16.`
      : p.format === "Self-paced"
        ? `${p.title} is self-paced and takes ${hoursText(p.hours)}${/clinic/.test(p.formatDetail) ? `, plus ${p.formatDetail.split("+ ")[1]}` : ""}. You study when it suits you and take one proctored check without AI at the end.`
        : DURATION[p.slug] ?? `${p.formatDetail}, ${hoursText(p.hours)}.`) + ` Next batch: ${p.nextBatch}.`;
  const mode =
    p.format === "Self-paced"
      ? `Online. ${p.title} is self-paced, so you study when it suits you${/clinic/.test(p.formatDetail) ? `, with ${p.formatDetail.split("+ ")[1]}` : ""}. Assessment ends with one proctored check taken without AI. Language: ${p.language}.`
      : p.slug === "workforce-licence"
        ? "Online. Each seat gets self-paced C1 and C2 courses and assessments taken without AI, with reporting by level and stage. Optional Studio seats let builder teams work in AI Flywheel Studio."
        : org
          ? `${p.title} runs for one organisation at a time: ${p.formatDetail.toLowerCase()}. Dates, place and format are agreed with you when we quote. Language: ${p.language}.`
          : `Blended: taught sessions and coaching, with your own ${p.usesCohortSyllabus ? "team's build" : "case work"} in between${p.usesCohortSyllabus ? ", in IST evenings and on Saturdays" : ""}.${/lab/.test(p.formatDetail) ? " Lab days add bench tests on real hardware." : ""} Language: ${p.language}.`;
  return [
    { q: `How much does ${p.title} cost?`, a: fee },
    { q: `How long does ${p.title} take?`, a: duration },
    { q: "Who is it for, and am I eligible?", a: `${p.whoFor} Before you start: ${p.prerequisites}` },
    { q: "Do I need to know coding?", a: CODING[p.slug] ?? p.prerequisites },
    {
      q: "Is the certificate valid, and for how long?",
      a: `Yes, for a year at a time. ${org ? "Each person earns" : "You earn"} ${p.credential}: an Open Badges 3.0 badge with a public verify page, renewed by yearly recertification. It is assessed on what ${org ? "each person builds" : "you build"}, plus one check taken without AI.`,
    },
    { q: "Is it online or offline?", a: mode },
    ...(PROGRAMME_EXTRA[p.slug] ?? []),
  ];
}

/** Offer fields Google asks for, plus the honest price label (Ed 1.1 or Proposed). */
function offerExtras(p: Programme, url: string) {
  return {
    url,
    availability: "https://schema.org/PreOrder",
    areaServed: { "@type": "Country", name: "India" },
    description: p.priceStatus === "Free" ? (p.priceNote ?? "Free") : `${p.priceStatus} price band, excluding GST${p.priceNote ? `; ${p.priceNote.toLowerCase()}` : ""}`,
  };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stagePage = getStagePage(slug);
  if (stagePage) return <StageView s={stagePage} />;
  const p = getProgramme(slug);
  if (!p) notFound();

  const stage = STAGE_META[p.stage];
  const stagePath = stageSlug(p.stage);
  const lab = LABS.find((l) => l.programme === p.slug);
  const keyword = PROGRAMME_KEYWORD[p.slug];
  const url = `${SITE_URL}/programmes/${p.slug}`;
  const weeks = syllabusFor(p);
  const next = p.next ? getProgramme(p.next) : undefined;
  const faq = faqFor(p);
  const schema = courseSchema(p);
  const offer = schema.offers ? { ...schema.offers, ...offerExtras(p, `${SITE_URL}/programmes/${p.slug}`) } : undefined;
  const org = p.format === "For organisations";
  const applyHref = `/contact?tag=${p.format === "For organisations" || p.format === "Executive" ? "business" : "professionals"}&programme=${p.slug}`;
  const applyLabel = p.priceStatus === "Free" ? "Start free" : p.format === "For organisations" ? "Talk to us" : "Apply";

  return (
    <>
      <section className="relative border-b border-line">
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: stage.color }} aria-hidden />
        <div className="container-site pb-12 pt-10 md:pb-16 md:pt-14">
          <Breadcrumbs
            base={SITE_URL}
            items={[
              { label: "Home", href: "/" },
              { label: "Programmes", href: "/programmes" },
              { label: stage.short, href: stagePath ? `/programmes/${stagePath}` : `/programmes?stage=${p.stage}` },
              { label: p.title },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <LevelPill level={p.level} />
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-ink">
                <span className="size-1.5 rounded-full" style={{ background: stage.color }} /> {p.lifecycle}
              </span>
            </div>
            <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-6xl">
              {p.title}
              {keyword && (
                <>
                  <span className="sr-only"> – </span>
                  <span className="mt-3 block font-sans text-lg font-medium leading-snug text-ink-2 md:text-xl">{keyword}</span>
                </>
              )}
            </h1>
            <p className="mt-5 text-xl text-ink-2 md:text-2xl">{p.outcome}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <li className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden /> {p.formatDetail} · {p.hours}
              </li>
              <li className="flex items-center gap-1.5">
                <Languages className="size-4" aria-hidden /> {p.language}
              </li>
              <li className="flex items-center gap-1.5">
                <IndianRupee className="size-4" aria-hidden /> {p.price}
                {p.priceStatus !== "Free" && p.price.startsWith("₹") ? ` (${p.priceStatus}), excl. GST` : ""}
              </li>
              <li className="flex items-center gap-1.5">
                <Layers className="size-4" aria-hidden /> {p.studio}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container-site grid gap-12 py-12 md:py-16 lg:grid-cols-12">
        {/* Sticky side card */}
        <aside className="lg:order-2 lg:col-span-4">
          <div className="card p-6 lg:sticky lg:top-28">
            <p className="eyebrow">Next batch</p>
            <p className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <CalendarDays className="size-5 text-muted" aria-hidden /> {p.nextBatch}
            </p>
            <div className="my-5 border-t border-line" />
            <PriceLine p={p} large />
            <ul className="mt-5 space-y-2 text-sm text-ink-2">
              {p.priceStatus !== "Free" && !org && <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-physical" aria-hidden /> EMI · scholarships (Proposed)</li>}
              {!org && <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-physical" aria-hidden /> Employer sponsorship letter</li>}
              <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-physical" aria-hidden /> {p.credential.split("·")[0].trim()}{org ? "" : " on completion"}</li>
            </ul>
            <Button href={applyHref} className="mt-6 w-full" size="lg">
              {applyLabel}
            </Button>
            {weeks.length > 0 && (
              <Link href="#syllabus" className="mt-3 flex min-h-11 items-center justify-center text-sm font-medium text-ink hover:text-primary-hover">
                See the syllabus
              </Link>
            )}
          </div>
        </aside>

        <div className="space-y-16 lg:order-1 lg:col-span-8">
          {/* C Outcomes */}
          <section aria-labelledby="outcomes">
            <h2 id="outcomes" className="font-display text-3xl font-semibold text-ink">What you&apos;ll be able to do</h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.outcomes.map((o, i) => (
                <li key={o} className="flex gap-4 rounded-xl border border-line bg-surface p-4">
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <span className="text-ink">{o}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* D Who it's for */}
          <section aria-labelledby="who">
            <h2 id="who" className="font-display text-3xl font-semibold text-ink">Who it&apos;s for</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line p-5">
                <dt className="eyebrow">For</dt>
                <dd className="mt-2 text-ink">{p.whoFor}</dd>
              </div>
              <div className="rounded-xl border border-line p-5">
                <dt className="eyebrow">Before you start</dt>
                <dd className="mt-2 text-ink">{p.prerequisites}</dd>
              </div>
            </dl>
          </section>

          {/* E Syllabus */}
          {weeks.length > 0 && (
            <section id="syllabus" aria-labelledby="syl" className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 id="syl" className="font-display text-3xl font-semibold text-ink">Syllabus{p.usesCohortSyllabus ? " by week" : ""}</h2>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <Flag className="size-4 text-primary-hover" aria-hidden /> Gates and checks marked
                </p>
              </div>
              {p.usesCohortSyllabus && <p className="mt-2 text-sm text-muted">About 8 hours a week: 1 taught, 1.5 coaching and peer review, the rest on your team&apos;s build.</p>}
              <ol className="mt-6 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
                {weeks.map((w) => (
                  <li key={w.week + w.taught} className={`grid grid-cols-[4.5rem_1fr] gap-3 p-4 md:grid-cols-[5rem_1fr_auto] md:items-center ${w.gate?.startsWith("G") ? "bg-highlight/25" : ""}`}>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">{/^\d+$/.test(w.week) ? `Week ${w.week}` : w.week}</span>
                    <span>
                      <span className="block font-medium text-ink">{w.taught}</span>
                      <span className="block text-sm text-muted">{w.turn}</span>
                    </span>
                    {w.gate ? (
                      <span className="col-start-2 inline-flex w-fit items-center gap-1.5 rounded-pill border border-ink/15 bg-bg px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-ink md:col-start-auto">
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

          {/* F What you'll build */}
          <section aria-labelledby="build">
            <h2 id="build" className="font-display text-3xl font-semibold text-ink">What you&apos;ll build</h2>
            <p className="mt-2 text-muted">
              Your artefacts{p.studio.includes("Studio") && !p.studio.startsWith("All") ? (
                <>
                  , built in{" "}
                  <a href={siteHref("studio", STUDIO_PATH[p.stage] ?? "/")} className="font-medium text-ink underline decoration-line underline-offset-4">
                    {p.studio}
                  </a>
                </>
              ) : null}
              .
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.build.map((b) => (
                <li key={b} className="rounded-pill border border-line bg-surface px-4 py-2 text-sm text-ink">
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* G Credential */}
          <section aria-labelledby="cred">
            <h2 id="cred" className="font-display text-3xl font-semibold text-ink">Your credential</h2>
            <p className="mt-2 text-muted">{p.credential}. Public verify page; recertify yearly.</p>
            {p.level && (
              <div className="mt-6 max-w-lg">
                <BadgeCard name="Your name" level={p.level} stage={p.stage} programme={p.title} id={`AFW-${p.level}-SAMPLE`} issued="On completion" />
                <Link href="/verify" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
                  <ShieldCheck className="size-4" /> How verification works
                </Link>
              </div>
            )}
          </section>

          {/* I Book chapters */}
          <section aria-labelledby="book" className="flex gap-5 rounded-[var(--radius-card)] bg-surface-2 p-6">
            <BookOpen className="mt-1 size-6 shrink-0 text-ink" aria-hidden />
            <div>
              <h2 id="book" className="font-display text-xl font-semibold text-ink">The book chapters it teaches</h2>
              <p className="mt-1 text-ink-2">{p.book}</p>
            </div>
          </section>

          {/* L Outcomes, real only */}
          <section className="rounded-[var(--radius-card)] border border-dashed border-ink/25 p-6">
            <p className="eyebrow">Cohort outcomes</p>
            <p className="mt-2 text-ink">Published when the first cohort ends. We never fill this with composites.</p>
          </section>

          {/* M FAQ: answer-first, in the order people search: fees, duration, eligibility, coding, validity, mode */}
          <section id="faq" aria-labelledby="faq-h" className="scroll-mt-28">
            <p className="eyebrow mb-2">Quick answers</p>
            <h2 id="faq-h" className="mb-4 font-display text-3xl font-semibold text-ink">
              Questions about {p.title}
            </h2>
            <FaqList items={faq} />
          </section>

          {/* Related pages: stage path, level, lab and fees */}
          <nav aria-label="Related pages" className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-6 text-sm">
            {stagePath && (
              <Link href={`/programmes/${stagePath}`} className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-primary-hover">
                {STAGE_META[p.stage].label} learning path <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            )}
            {p.level && (
              <Link href={`/programmes/level/${p.level.toLowerCase()}`} className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-primary-hover">
                What {p.level} {LEVEL_NAMES[p.level]} means <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            )}
            {lab && (
              <Link href={`/campus-labs/${lab.slug}`} className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-primary-hover">
                {lab.name} for colleges <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            )}
            {p.usesCohortSyllabus && (
              <Link href="/cohorts" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-primary-hover">
                How a cohort works <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            )}
            <Link href="/pricing" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-primary-hover">
              Compare AI course fees <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </nav>

          {next && (
            <section aria-labelledby="nextlvl">
              <h2 id="nextlvl" className="mb-5 flex items-center gap-2 font-display text-3xl font-semibold text-ink">
                Your next level <ArrowRight className="size-6" />
              </h2>
              <div className="max-w-sm">
                <ProgrammeCard p={next} />
              </div>
            </section>
          )}
        </div>
      </div>

      <JsonLd
        data={
          org
            ? {
                "@context": "https://schema.org",
                "@type": "Service",
                name: p.title,
                serviceType: keyword ?? p.focus,
                description: p.outcome,
                url,
                provider: { "@id": ORG_ID },
                areaServed: { "@type": "Country", name: "India" },
                audience: { "@type": "BusinessAudience", name: p.whoFor },
                ...(offer ? { offers: offer } : {}),
              }
            : {
                "@context": "https://schema.org",
                "@type": "Course",
                "@id": `${url}#course`,
                name: p.title,
                description: `${p.outcome} ${p.focus}.`,
                url,
                provider: { "@type": "EducationalOrganization", "@id": ORG_ID, name: "AI Flywheel", sameAs: SITE_URL },
                author: { "@id": AUTHOR_ID },
                educationalLevel: p.level ? `${LEVEL_NAMES[p.level]} (${p.level})` : "Organisation",
                inLanguage: p.language === "English" ? ["en-IN"] : ["en-IN", "ta-IN"],
                teaches: p.outcomes,
                coursePrerequisites: p.prerequisites,
                educationalCredentialAwarded: {
                  "@type": "EducationalOccupationalCredential",
                  name: p.credential.split(" · ")[0],
                  credentialCategory: "certificate",
                  url: `${SITE_URL}/programmes/level/${(p.level ?? "c1").toLowerCase()}`,
                },
                isAccessibleForFree: p.priceStatus === "Free",
                ...schema,
                ...(offer ? { offers: offer } : {}),
              }
        }
      />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
