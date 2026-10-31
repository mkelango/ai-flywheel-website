import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { siteHref, SITES } from "@flywheel/ui/sites";
import { getTrustPage, TRUST_PAGES } from "@/lib/company";
import { PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/QuickAnswers";
import { ANSWERS } from "@/lib/answers";
import { SubNav } from "@/components/research/SubNav";
import { CtaBand } from "@/components/research/CtaBand";

export function generateStaticParams() {
  return TRUST_PAGES.map((p) => ({ page: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const p = getTrustPage(page);
  if (!p) return {};
  return pageMeta(`/trust/${p.slug}`, { title: `${p.label} · Trust centre`, description: p.description });
}

export default async function TrustDetailPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const p = getTrustPage(page);
  if (!p) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Trust centre · ${p.label}`}
        title={p.title}
        intro={p.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Trust centre", href: "/trust" }, { label: p.label }]}
        updated
      />
      <SubNav label="Trust centre pages" active={`/trust/${p.slug}`} items={[{ href: "/trust", label: "Overview" }, ...TRUST_PAGES.map((x) => ({ href: `/trust/${x.slug}`, label: x.label }))]} />

      <Section eyebrow="What we do" title="In plain words.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.points.map((pt) => (
            <li key={pt.t} className="card p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-ink">{pt.t}</h2>
                {pt.status && <StatusTag status={pt.status} />}
              </div>
              <p className="mt-2 text-sm text-muted">{pt.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">Last reviewed 30 October 2026. Proposed items describe the platform as designed and will be confirmed before launch.</p>
      </Section>

      {ANSWERS[`/trust/${p.slug}`] && <QuickAnswers {...ANSWERS[`/trust/${p.slug}`]} />}

      <CtaBand eyebrow="Children's data" title={`For schools, see ${SITES.schools.name}.`} line="No tracking, no analytics on child-facing pages, adult details only on forms.">
        <Button href={siteHref("schools", "/trust")}>Schools trust centre ↗</Button>
        <Button href="/contact?tag=business" variant="secondary">
          Contact us about data
        </Button>
      </CtaBand>
    </>
  );
}
