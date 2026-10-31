import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { MATRIX, type CoreStage } from "@/lib/framework";
import { STAGE_META } from "@/lib/programmes";
import { LEVEL_SLUGS, getLevel, stageSlug } from "@/lib/learn";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { JsonLd, PageHero } from "@/components/ui";
import { ORG_ID, SEO, pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { QuickAnswers } from "@/components/QuickAnswers";

type Props = { params: Promise<{ level: string }> };

export function generateStaticParams() {
  return LEVEL_SLUGS.map((level) => ({ level }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getLevel((await params).level);
  if (!l) return {};
  return pageMeta(`/programmes/level/${l.slug}`, {
    title: `${l.name} (${l.code}) level`,
    description: `${l.means} Evidence: ${l.evidence}. Programmes that award ${l.name} (${l.code}).`,
  });
}

const CORE_STAGES: CoreStage[] = ["foundation", "generative", "agentic", "physical"];

export default async function LevelPage({ params }: Props) {
  const l = getLevel((await params).level);
  if (!l) notFound();
  const keyword = SEO[`/programmes/level/${l.slug}`]?.primary ?? `${l.name} level`;
  const evidence = l.evidence.charAt(0).toLowerCase() + l.evidence.slice(1);

  return (
    <>
      <PageHero
        eyebrow={`Level ${l.code} of 5`}
        title={`${l.code} ${l.name}: ${keyword}.`}
        intro={l.means}
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes", href: "/programmes" }, { label: "Levels", href: "/certifications" }, { label: l.code }]}
        aside={
          <div className="card p-6">
            <p className="eyebrow">The evidence it takes</p>
            <p className="mt-2 font-display text-xl font-semibold text-ink">{l.evidence}</p>
            <p className="mt-2 text-sm text-muted">No level without an artefact from real work and one check taken without AI.</p>
          </div>
        }
      />

      <Section eyebrow="By stage" title={`${l.code} in each stage.`} intro="You hold a level separately in each of the four stages.">
        <ul className="grid gap-3 sm:grid-cols-2">
          {CORE_STAGES.map((k) => (
            <li key={k}>
              <Link href={`/programmes/${stageSlug(k)}`} className="card card-hover flex h-full flex-col p-5">
                <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                  <span className="size-2 rounded-full" style={{ background: STAGE_META[k].color }} aria-hidden /> {STAGE_META[k].short}
                </span>
                <span className="mt-2 text-ink">{MATRIX[k].levels[l.code]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Programmes" title={`Where to earn ${l.code}.`} intro="Prices in rupees, excluding GST." className="border-t border-line">
        {l.programmes.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {l.programmes.map((p) => (
              <ProgrammeCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No programme at this level yet.</p>
        )}
      </Section>

      <QuickAnswers
        title={`${l.code} ${l.name}, answered.`}
        items={[
          {
            q: `What does ${l.code} ${l.name} prove?`,
            a: `${l.means} ${l.code} ${l.name} is earned with evidence, not attendance: ${evidence}. Like every level, it needs an artefact from real work and one check taken without AI, and you hold it separately in each AI stage.`,
          },
          {
            q: `Which programmes lead to ${l.code}?`,
            a: l.programmes.length
              ? `${l.programmes.map((p) => p.title).join(", ")}. Each programme page shows its format, hours, price band (in rupees, excluding GST) and next batch. Your credential is an Open Badges 3.0 badge with a public verify page, renewed every year.`
              : "No programme awards this level yet. Every level is earned with an artefact from real work and one check taken without AI, and credentials are Open Badges 3.0 badges with a public verify page.",
          },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalCredential",
          name: `${l.name} (${l.code})`,
          alternateName: `${l.code} ${l.name}`,
          description: `${l.means} Evidence: ${l.evidence}.`,
          url: `${SITE_URL}/programmes/level/${l.slug}`,
          credentialCategory: "certificate",
          educationalLevel: l.code,
          competencyRequired: l.line,
          recognizedBy: { "@id": ORG_ID },
        }}
      />

      {l.next && (
        <section className="border-t border-line py-16 md:py-20">
          <div className="container-site flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="eyebrow mb-2">Next level</p>
              <p className="font-display text-3xl font-semibold text-ink">
                {l.next.name} ({l.next.code})
              </p>
            </div>
            <Button href={`/programmes/level/${l.next.slug}`} variant="secondary">
              See {l.next.code} <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
