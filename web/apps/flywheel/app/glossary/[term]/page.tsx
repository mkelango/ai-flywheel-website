import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Button } from "@flywheel/ui/components/primitives";
import { getTerm, GLOSSARY } from "@/lib/research";
import { JsonLd } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
import { AUTHOR_ID, pageMeta, UPDATED } from "@/lib/seo";

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ term: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) return {};
  return pageMeta(`/glossary/${t.slug}`, { title: t.term.length > 24 ? `What is ${t.term}?` : `What is ${t.term}? Meaning`, description: `${definition(t.term, t.short)} Plain-English definition, sourced to ${t.source.book}, ${t.source.chapter}.` });
}

/** Where to learn or use each term, with exact-match anchors (one primary keyword per URL). */
const LEARN: Record<string, { href: string; label: string }[]> = {
  "agentic-ai": [{ href: "/programmes/agentic", label: "Agentic AI learning path" }, { href: "/programmes/agentic-ai-engineer", label: "Agentic AI course in India" }],
  agent: [{ href: "/programmes/working-with-ai-agents", label: "AI agents course with certificate" }],
  "generative-ai": [{ href: "/programmes/generative", label: "Generative AI learning path" }, { href: "/programmes/generative-ai-practitioner", label: "Generative AI course for professionals" }],
  "physical-ai": [{ href: "/programmes/physical", label: "Physical AI learning path" }],
  "foundation-ai": [{ href: "/programmes/foundation-ai", label: "Foundation AI: data and ML courses" }],
  core: [{ href: "/framework/core", label: "CORE governance framework" }, { href: "/programmes/core-governance-lead", label: "AI governance certification" }],
  drive: [{ href: "/framework/drive", label: "The DRIVE method" }, { href: "/programmes/drive-implementer", label: "AI implementation certification" }],
  "data-readiness": [{ href: "/free/data-readiness", label: "Data readiness checklist for AI" }],
  "success-definition": [{ href: "/free/success-definition", label: "AI project success metrics template" }],
  baseline: [{ href: "/free/success-definition", label: "AI project success metrics template" }],
  adlc: [{ href: "/free/sample-gate-log", label: "AI project gate review template" }, { href: "/programmes/agentic-ai-engineer", label: "Agentic AI course in India" }],
  "kill-switch": [{ href: "/programmes/agentic-ai-engineer", label: "Agentic AI course in India" }],
  "agent-accountability-register": [{ href: "/programmes/core-governance-lead", label: "AI governance certification" }],
  "rights-ledger": [{ href: "/programmes/generative-ai-engineer", label: "Generative AI engineering course" }],
  "model-census": [{ href: "/programmes/model-engineer", label: "AI model engineering course" }],
  "sim-to-real-gap": [{ href: "/programmes/physical-ai-robotics-engineer", label: "Physical AI and robotics course" }],
  "data-sovereignty": [{ href: "/trust/sovereignty", label: "Data sovereignty at AI Flywheel" }],
  flywheel: [{ href: "/framework", label: "The AI Flywheel framework" }],
};

/** "Agentic AI is the third stage: ..." when the short definition is a noun phrase; otherwise "Term: definition". */
function definition(term: string, short: string) {
  return /^(A|An|The) /.test(short) && !/ is /.test(short) ? `${term} is ${short.charAt(0).toLowerCase()}${short.slice(1)}` : `${term}: ${short}`;
}

export default async function TermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) notFound();
  const related = t.related.map(getTerm).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <article className="py-10 md:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Glossary", href: "/glossary" }, { label: t.term }]} />
          <p className="eyebrow mb-4 mt-8">Glossary</p>
          <h1 className="font-display text-[2.2rem] font-semibold leading-[1.08] text-ink md:text-5xl">What is {t.term}?</h1>
          <p className="mt-5 text-xl text-ink">{definition(t.term, t.short)}</p>
          <p className="mt-4 text-lg text-muted">{t.body}</p>

          <p className="mt-4 text-xs text-muted">
            Updated <time dateTime={UPDATED.iso}>{UPDATED.label}</time>
          </p>

          <dl className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <dt className="eyebrow">Source</dt>
              <dd className="mt-2 text-ink">
                {t.source.book}, {t.source.chapter}
              </dd>
              <dd className="mt-1">
                <Link href="/books" className="inline-flex min-h-6 items-center text-sm font-medium text-ink hover:text-primary-hover">
                  The books →
                </Link>
              </dd>
            </div>
            {related.length > 0 && (
              <div>
                <dt className="eyebrow">Related terms</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/glossary/${r.slug}`} className="inline-flex min-h-9 items-center rounded-pill border border-line px-3 text-sm text-ink hover:border-ink">
                          {r.term}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>

          {LEARN[t.slug] && (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-1 text-sm">
              {LEARN[t.slug].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center font-medium text-ink hover:text-primary-hover">
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/programmes/foundation">Learn it free (C1)</Button>
            <Button href="/glossary" variant="secondary">
              All terms
            </Button>
          </div>
        </div>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: t.term,
          description: `${definition(t.term, t.short)} ${t.body}`,
          url: `${SITE_URL}/glossary/${t.slug}`,
          inDefinedTermSet: { "@type": "DefinedTermSet", name: "AI Flywheel Glossary", url: `${SITE_URL}/glossary` },
          subjectOf: { "@type": "Book", name: t.source.book, author: { "@id": AUTHOR_ID } },
          dateModified: UPDATED.iso,
        }}
      />
    </>
  );
}
