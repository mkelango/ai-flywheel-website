import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { LevelPill, PageHero, PriceLine, StageTag } from "@/components/ui";
import { CtaBand } from "@/components/orgs/blocks";
import { getIndustry, INDUSTRIES } from "@/lib/orgs";
import { getProgramme, levelLabel, STAGE_META } from "@/lib/programmes";
import { stageSlug } from "@/lib/learn";
import { pageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/QuickAnswers";

type Props = { params: Promise<{ industry: string }> };

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = getIndustry((await params).industry);
  if (!ind) return {};
  return pageMeta(`/business/industries/${ind.slug}`, {
    title: `AI in ${ind.name}: First Use Case`,
    description: `First use case: ${ind.useCase} Recommended track and programme for ${ind.name} teams in India.`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const ind = getIndustry((await params).industry);
  if (!ind) notFound();
  const prog = getProgramme(ind.programme);

  return (
    <>
      <PageHero
        eyebrow={`Industries · ${ind.name}`}
        title={`AI in ${ind.name}: a first use case`}
        intro={`${ind.useCase} One track to get there.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Industries", href: "/business/industries" }, { label: ind.name }]}
      >
        <Button href="/business/check" size="lg">
          Book a Flywheel Check
        </Button>
      </PageHero>

      <Section id="start" eyebrow="Start here" title="First use case and track.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-6 md:p-8">
            <p className="eyebrow">First use case</p>
            <p className="mt-3 font-display text-2xl font-semibold text-ink">{ind.useCase}</p>
            <StageTag stage={ind.stage} className="mt-4" />
          </div>
          {prog && (
            <div className="card flex flex-col p-6 md:p-8">
              <p className="eyebrow">Recommended programme</p>
              <div className="mt-3">
                <LevelPill level={prog.level} />
              </div>
              <p className="mt-3 font-display text-2xl font-semibold text-ink">{prog.title}</p>
              <div className="mt-4">
                <PriceLine p={prog} />
              </div>
              <Button href={`/programmes/${prog.slug}`} variant="secondary" className="mt-6 self-start">
                See the programme
              </Button>
            </div>
          )}
        </div>
        {ind.extra === "schools" && (
          <p className="mt-6 text-sm text-ink-2">
            Schools?{" "}
            <a href={siteHref("schools", "/")} className="font-medium underline underline-offset-4">
              AI Flywheel at Schools ↗
            </a>
          </p>
        )}
        {ind.extra === "government" && (
          <p className="mt-6 text-sm text-ink-2">
            Departments and ministries:{" "}
            <Link href="/government" className="font-medium underline underline-offset-4">
              AI Flywheel for Government →
            </Link>
          </p>
        )}
      </Section>

      <nav aria-label="Related pages" className="container-site flex flex-wrap gap-x-6 gap-y-1 pb-4 text-sm">
        {stageSlug(ind.stage) && (
          <Link href={`/programmes/${stageSlug(ind.stage)}`} className="inline-flex min-h-11 items-center font-medium text-ink hover:text-primary-hover">
            {STAGE_META[ind.stage].label} learning path →
          </Link>
        )}
        <Link href="/case-studies" className="inline-flex min-h-11 items-center font-medium text-ink hover:text-primary-hover">
          AI implementation case studies →
        </Link>
        <Link href="/business/enterprise" className="inline-flex min-h-11 items-center font-medium text-ink hover:text-primary-hover">
          Enterprise AI training →
        </Link>
      </nav>

      {prog && (
        <QuickAnswers
          title={`AI in ${ind.name}, answered.`}
          items={[
            {
              q: `What is a good first AI use case for ${ind.name}?`,
              a: `${ind.useCase} It sits in the ${STAGE_META[ind.stage].label} stage: small enough to prove with a baseline and a named owner, and useful enough to feed the next turn. Start with a Flywheel Check to see where your teams stand.`,
            },
            {
              q: `Which programme fits ${ind.name} teams?`,
              a: `${prog.title}, at ${levelLabel(prog)}. ${prog.outcome} It costs ${prog.price}${prog.priceStatus !== "Free" && prog.price.startsWith("₹") ? ` (${prog.priceStatus})` : ""}, excluding GST, and the next batch is ${prog.nextBatch}.`,
            },
          ]}
        />
      )}

      <CtaBand title="Scan your teams first." href="/business/check" label="Book a Flywheel Check" secondary={{ href: "/business/industries", label: "All industries" }} />
    </>
  );
}
