import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Lightbulb } from "lucide-react";
import { Breadcrumbs, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Squiggle } from "@/components/art";
import { ParentLinks } from "@/components/families/parents";
import { PaperDoodle } from "@/components/extras/bits";
import { PARENT_GUIDES, getGuide } from "@/components/extras/content";
import { PrintButton, PrintStyles } from "@/components/extras/print";
import { JsonLd } from "@/components/blocks";
import { QuickAnswers } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { SITE, UPDATED, pageMeta } from "@/lib/seo";

/** H1 and a one-line, answer-first lead per guide (cards elsewhere keep the short title). */
const HEAD: Record<string, { h1: string; lead: string }> = {
  "talking-about-ai-at-dinner": { h1: "How to explain AI to kids, over dinner", lead: "The easiest way to explain AI to kids is to ask good questions, then listen." },
  "spotting-fakes": { h1: "How to spot AI fakes with your kids", lead: "Spotting AI fakes with kids works best as a puzzle you solve together." },
  "homework-and-honesty": { h1: "Should children use AI for homework?", lead: "Yes, to understand an idea; no, to do the work for them." },
  "screens-for-making": { h1: "Creative screen time: screens for making, not scrolling", lead: "Creative screen time means using screens to make things, not just to watch." },
};

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PARENT_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return pageMeta(`/parents/guide/${g.slug}`, { title: `${g.title}: a guide for parents`, description: g.description });
}

export default async function ParentGuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const others = PARENT_GUIDES.filter((x) => x.slug !== g.slug);
  const head = HEAD[g.slug] ?? { h1: g.title, lead: "" };
  const crumbs = [{ label: "Home", href: "/" }, { label: "Parents", href: "/parents" }, { label: "Guides", href: "/parents/guides" }, { label: g.title }];
  const qa = ANSWERS[`/parents/guide/${g.slug}`];
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: head.h1,
    description: g.description,
    url: `${SITE}/parents/guide/${g.slug}`,
    inLanguage: "en-IN",
    audience: { "@type": "Audience", audienceType: "Parents" },
    dateModified: "2026-10-30",
    author: { "@id": `${SITE}/#organization` },
    publisher: { "@id": `${SITE}/#organization` },
  };
  return (
    <>
      <JsonLd data={article} />
      <PrintStyles />
      <article data-print-area className="pb-14 pt-10 md:pb-20 md:pt-14">
        <Container className="max-w-3xl">
          <div className="mb-6 print:hidden">
            <Breadcrumbs items={crumbs} base={SITE} />
          </div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Guides: AI at home · {g.classes}</p>
              <h1 className="font-display text-[2.1rem] font-semibold leading-[1.08] text-ink md:text-[3rem]">{head.h1}</h1>
              <p lang="ta" className="mt-2 font-display text-lg text-ink-2">
                {g.ta}
              </p>
              <Squiggle className="mt-4 w-24" />
            </div>
            <PaperDoodle className="hidden w-28 shrink-0 sm:block md:w-36" />
          </div>
          <p className="mt-6 text-lg text-ink-2 md:text-xl">
            {head.lead && <strong className="font-semibold text-ink">{head.lead} </strong>}
            {g.intro}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 print:hidden">
            <PrintButton />
            <span className="text-sm text-muted">
              Five minutes to read. Free to share. Updated <time dateTime={UPDATED.iso}>{UPDATED.label}</time>.
            </span>
          </div>

          <div className="mt-10 space-y-8">
            {g.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-2xl font-semibold text-ink">{s.heading}</h2>
                <p className="mt-2 text-ink-2">{s.body}</p>
                {s.points && (
                  <ul className="mt-4 space-y-2.5">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-ink-2">
                        <Check className="mt-1 size-4 shrink-0 text-ink" aria-hidden /> {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside data-print-card className="card mt-10 flex gap-4 bg-highlight/40 p-6">
            <Lightbulb className="mt-0.5 size-6 shrink-0 text-ink" aria-hidden />
            <div>
              <p className="font-display text-lg font-semibold text-ink">Try this</p>
              <p className="mt-1 text-ink-2">{g.tryThis}</p>
            </div>
          </aside>
          <p className="mt-6 text-sm text-muted">From AI Flywheel at Schools · aiflywheel.in/schools/parents/guide/{g.slug}</p>
        </Container>
      </article>

      {qa && <QuickAnswers items={qa} eyebrow="Questions parents ask" className="print:hidden" />}
      <section className="pb-14 print:hidden">
        <Container className="max-w-3xl">
          <p className="eyebrow mb-4">More guides</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <SmartLink href={`/parents/guide/${o.slug}`} className="card card-hover flex h-full min-h-11 flex-col p-4">
                  <span className="font-display font-semibold text-ink">{o.title}</span>
                  <span className="mt-1 text-sm text-muted">{o.classes}</span>
                </SmartLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6">
            <SmartLink href="/parents/guides" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              All AI guides for parents <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
            <SmartLink href="/parents/safety" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              Is AI safe for children? <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
            <SmartLink href="/kids/sampler" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              Free unplugged AI activities <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </div>
        </Container>
      </section>
      <ParentLinks />
    </>
  );
}
