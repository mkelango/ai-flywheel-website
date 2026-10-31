import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Breadcrumbs, Button, Section } from "@flywheel/ui/components/primitives";
import { LEVELS, siteHref } from "@flywheel/ui/sites";
import { PROGRAMMES, STAGE_META, getProgramme, type LevelCode } from "@/lib/programmes";
import type { StagePage } from "@/lib/learn";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { QuickAnswers } from "@/components/QuickAnswers";
import { STAGE_ANSWERS } from "@/lib/answers";
import { LABS } from "@/lib/orgs";

const GLOSSARY_TERM: Record<string, { slug: string; label: string }> = {
  foundation: { slug: "foundation-ai", label: "What is foundation AI?" },
  generative: { slug: "generative-ai", label: "What is generative AI?" },
  agentic: { slug: "agentic-ai", label: "What is agentic AI?" },
  physical: { slug: "physical-ai", label: "What is physical AI?" },
  core: { slug: "core", label: "What is CORE?" },
  drive: { slug: "drive", label: "What is DRIVE?" },
};

/** The /programmes/<stage> page: stage line, studio, life cycle, C1–C5 and its programmes. */
export function StageView({ s }: { s: StagePage }) {
  const meta = STAGE_META[s.stage];
  const progs = PROGRAMMES.filter((p) => p.stage === s.stage);
  const free = getProgramme("foundation");
  const qa = STAGE_ANSWERS[s.slug];
  const lab = LABS.find((l) => l.stage === s.stage);
  const term = GLOSSARY_TERM[s.stage];

  return (
    <>
      <section className="relative border-b border-line">
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: meta.color }} aria-hidden />
        <div className="container-site pb-12 pt-10 md:pb-16 md:pt-14">
          <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Programmes", href: "/programmes" }, { label: meta.short }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: meta.color }} aria-hidden /> {s.tagline} · {s.lifecycle}
            </p>
            <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-6xl">
              {s.name}
              {qa && (
                <>
                  <span className="sr-only"> – </span>
                  <span className="mt-3 block font-sans text-lg font-medium leading-snug text-ink-2 md:text-xl">{qa.keyword}</span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">{s.line}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/programmes?stage=${s.stage}`}>See {progs.length} programmes</Button>
              {s.studio && (
                <Button href={siteHref("studio", s.studio.path)} variant="secondary">
                  Build in {s.studio.name} <ArrowUpRight className="size-4" aria-hidden />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {s.parts && (
        <Section eyebrow={s.lifecycle} title={s.stage === "core" ? "Four parts of CORE." : "Five steps of DRIVE."} intro="A level in this strand sits beside your level in each stage.">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {s.parts.map((p) => (
              <li key={p.word} className="card p-5">
                <span className="font-display text-3xl font-semibold" style={{ color: s.stage === "drive" ? "var(--primary)" : meta.color }}>
                  {p.letter}
                </span>
                <p className="mt-2 font-medium text-ink">{p.word}</p>
                <p className="mt-1 text-sm text-muted">{p.line}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section eyebrow="Levels in this stage" title="What C1 to C5 mean here." intro="Each level is earned with an artefact from real work and one check taken without AI." className={s.parts ? "border-t border-line" : undefined}>
        <ol className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          {LEVELS.map((l) => (
            <li key={l.code} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-4 md:p-5">
              <span className="font-mono text-sm">
                <span className="font-semibold text-primary-hover">{l.code}</span> <span className="text-ink">{l.name}</span>
              </span>
              <span className="text-ink">{s.levels[l.code as LevelCode]}</span>
              <Link href={`/programmes/level/${l.code.toLowerCase()}`} className="inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-ink">
                About {l.code} <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Programmes" title={`Where to earn it in ${meta.short}.`} intro="Prices in rupees, excluding GST." className="border-t border-line">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {free && <ProgrammeCard p={free} />}
          {progs.map((p) => (
            <ProgrammeCard key={p.slug} p={p} />
          ))}
        </div>
        <nav aria-label="Related pages" className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {term && (
            <Link href={`/glossary/${term.slug}`} className="inline-flex min-h-11 items-center gap-1 font-medium text-ink hover:text-primary-hover">
              {term.label} <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          )}
          <Link href={s.parts ? `/framework/${s.stage}` : "/framework/stages"} className="inline-flex min-h-11 items-center gap-1 font-medium text-ink hover:text-primary-hover">
            {s.parts ? `The ${s.stage.toUpperCase()} framework` : "The four stages of AI"} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
          {lab && (
            <Link href={`/campus-labs/${lab.slug}`} className="inline-flex min-h-11 items-center gap-1 font-medium text-ink hover:text-primary-hover">
              {lab.name} for colleges <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          )}
          <Link href="/batches" className="inline-flex min-h-11 items-center gap-1 font-medium text-ink hover:text-primary-hover">
            AI course batch dates <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </nav>
      </Section>

      {qa && <QuickAnswers items={qa.items} title={`Questions about ${s.name.split(":")[0]}.`} />}
    </>
  );
}
