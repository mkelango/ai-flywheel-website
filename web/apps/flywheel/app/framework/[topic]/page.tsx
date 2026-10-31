import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { LEVELS, STAGES } from "@flywheel/ui/sites";
import { MATRIX } from "@/lib/framework";
import { getProgramme } from "@/lib/programmes";
import { CORE_DETAIL, DRIVE_DETAIL, getTopic, STAGE_DETAIL, TOOLKIT, TOPICS, type TopicSlug } from "@/lib/research";
import { PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/QuickAnswers";
import { ANSWERS } from "@/lib/answers";
import { StageMatrix } from "@/components/StageMatrix";
import { SubNav } from "@/components/research/SubNav";
import { CtaBand } from "@/components/research/CtaBand";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const t = getTopic(topic);
  if (!t) return {};
  return pageMeta(`/framework/${t.slug}`, { title: `${t.label} · The AI Flywheel framework`, description: t.description });
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = getTopic(topic);
  if (!t) notFound();

  const i = TOPICS.findIndex((x) => x.slug === t.slug);
  const next = TOPICS[(i + 1) % TOPICS.length];

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Framework", href: "/framework" }, { label: t.label }]}
        updated
      />
      <SubNav label="Framework topics" active={`/framework/${t.slug}`} items={[{ href: "/framework", label: "At a glance" }, ...TOPICS.map((x) => ({ href: `/framework/${x.slug}`, label: x.label }))]} />

      <TopicBody slug={t.slug} />

      {ANSWERS[`/framework/${t.slug}`] && <QuickAnswers {...ANSWERS[`/framework/${t.slug}`]} />}

      <CtaBand eyebrow="Next" title={next.title} line={next.intro}>
        <Button href={`/framework/${next.slug}`}>{next.label} →</Button>
        <Button href="/check" variant="secondary">
          Take the Flywheel Check
        </Button>
      </CtaBand>
    </>
  );
}

function TopicBody({ slug }: { slug: TopicSlug }) {
  switch (slug) {
    case "stages":
      return (
        <Section eyebrow="Know · Make · Do · Move" title="Each stage feeds the next." intro="The race is won in the handoffs.">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((s, n) => {
              const d = STAGE_DETAIL[s.key];
              const p = getProgramme(d.programme);
              return (
                <li key={s.key} className="card flex flex-col overflow-hidden">
                  <div className="h-1.5" style={{ background: s.color }} />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted">
                      0{n + 1} · {MATRIX[s.key].tagline}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{s.name}</h2>
                    <p className="mt-2 text-sm text-ink-2">{d.idea}</p>
                    <p className="mt-4 text-sm text-muted">
                      <span className="font-medium text-ink">Feeds the next: </span>
                      {d.feeds}
                    </p>
                    <dl className="mt-5 space-y-1 border-t border-line pt-4 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                      <div>
                        <dt className="sr-only">Life cycle</dt>
                        <dd>{MATRIX[s.key].lifecycle}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Source</dt>
                        <dd>{d.chapter}</dd>
                      </div>
                    </dl>
                    {p && (
                      <Link href={`/programmes/${p.slug}`} className="mt-auto pt-5 text-sm font-medium text-ink hover:text-primary-hover">
                        {p.title} →
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </Section>
      );

    case "drive":
      return (
        <Section eyebrow="Five phases" title="What each phase does, and the tool you use." intro="From The AI Flywheel, Chapters 9 to 13.">
          <ol className="grid gap-3 lg:grid-cols-5">
            {DRIVE_DETAIL.map((d) => (
              <li key={d.word} className="card flex flex-col p-5">
                <span className="font-display text-4xl font-semibold text-primary-hover">{d.letter}</span>
                <h2 className="mt-2 font-semibold text-ink">{d.word}</h2>
                <p className="mt-1 text-sm text-muted">{d.does}</p>
                <ul className="mt-4 space-y-1 border-t border-line pt-3 text-xs text-ink-2">
                  {d.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <p className="mt-auto pt-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted">{d.chapter}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">
            The four life cycles (MDLC, GDLC, ADLC, RDLC) are DRIVE made specific for each stage. Learn it in{" "}
            <Link href="/programmes/drive-implementer" className="font-medium text-ink underline-offset-4 hover:underline">
              DRIVE Implementer (C4)
            </Link>
            .
          </p>
        </Section>
      );

    case "core":
      return (
        <section className="bg-inverse py-16 text-inverse-ink md:py-24">
          <div className="container-site">
            <header className="mb-10 max-w-2xl md:mb-14">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-inverse-ink/60">Four pillars</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-[2.6rem]">No owner, no system.</h2>
              <p className="mt-4 text-lg text-inverse-ink/70">From The AI Flywheel, Chapters 14 to 17.</p>
            </header>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CORE_DETAIL.map((c) => (
                <li key={c.word} className="flex flex-col rounded-[var(--radius-card)] border border-white/10 p-5">
                  <span className="font-display text-4xl font-semibold text-highlight">{c.letter}</span>
                  <h3 className="mt-2 font-semibold">{c.word}</h3>
                  <p className="mt-1 text-sm text-inverse-ink/70">{c.does}</p>
                  <p className="mt-auto pt-4 text-xs text-inverse-ink/60">
                    Tool: {c.tool} · {c.chapter}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/programmes/core-for-every-team">CORE for Every Team (C2)</Button>
              <Link href="/programmes/core-governance-lead" className="inline-flex min-h-11 items-center rounded-pill border border-white/25 px-5 text-sm font-medium hover:border-white/60">
                CORE Governance Lead (C4)
              </Link>
            </div>
          </div>
        </section>
      );

    case "levels":
      return (
        <Section eyebrow="Stage × level" title="Pick a stage. See what each level means in it." intro="A person holds a level in each stage, not one level overall.">
          <StageMatrix />
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LEVELS.map((l) => (
              <li key={l.code} className="rounded-xl bg-surface-2 p-4">
                <p className="font-mono text-xs text-muted">{l.code}</p>
                <p className="font-semibold text-ink">{l.name}</p>
                <p className="mt-1 text-sm text-ink-2">{l.line}</p>
                <p className="mt-2 text-xs text-muted">Evidence: {l.evidence}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            From The Foundation Studio Playbook, Chapter 45. The framework is proposed and not yet externally validated. It is based on, not aligned to, UNESCO and SFIA.
          </p>
        </Section>
      );

    case "toolkit":
      return (
        <Section eyebrow="Seven groups · 28 tools" title="Orient, diagnose, build, prove, govern, choose, start." intro="Each tool names the chapter it comes from. Interactive versions are available inside the platform.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLKIT.map((g, n) => (
              <section key={g.group} className="card p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  0{n + 1} · {g.tools.length} tools
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">{g.group}</h2>
                <ul className="mt-4 divide-y divide-line">
                  {g.tools.map((tool) => (
                    <li key={tool.name} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                      <span className="text-ink-2">{tool.name}</span>
                      <span className="shrink-0 font-mono text-[0.65rem] uppercase text-muted">{tool.ch}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Source: The AI Flywheel, The Flywheel Toolkit. For organisations, the tools run inside the{" "}
            <Link href="/business" className="font-medium text-ink underline-offset-4 hover:underline">
              platform licence
            </Link>
            .
          </p>
        </Section>
      );
  }
}
