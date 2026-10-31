import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Button, StatusTag } from "@flywheel/ui/components/primitives";
import { LEVEL_NAMES, PROGRAMMES, STAGE_META, levelLabel, type LevelCode } from "@/lib/programmes";
import { CatalogueExplorer } from "@/components/CatalogueExplorer";
import { PageHero } from "@/components/ui";
import { parseFilters } from "@/lib/catalogue";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/programmes");

export default async function ProgrammesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const initial = parseFilters((k) => (typeof sp[k] === "string" ? (sp[k] as string) : null));
  return (
    <>
      <PageHero
        eyebrow="Programme catalogue · v1"
        title="Find your AI certification programme."
        intro="Every AI certification programme sits on one level, C1 to C5, and names the next step. Prices in rupees, excluding GST."
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes" }]}
        aside={
          <HeroPhoto
            photo="tablet"
            alt="Four learners discussing their work on a tablet, choosing the next step in an AI certification programme"
            card={
              <>
                <FloatEyebrow>One ladder · C1 to C5</FloatEyebrow>
                <ol className="mt-3 space-y-1.5">
                  {(["C1", "C2", "C3", "C4", "C5"] as LevelCode[]).map((l, i) => (
                    <li key={l} className="flex items-center gap-2 text-xs text-ink-2">
                      <span className="w-6 font-mono font-semibold text-primary-hover">{l}</span>
                      <span className="h-1.5 rounded-pill bg-ink/80" style={{ width: `${12 + i * 8}%` }} aria-hidden />
                      <span>{LEVEL_NAMES[l]}</span>
                    </li>
                  ))}
                </ol>
              </>
            }
          />
        }
        updated
      >
        <Button href="/check" variant="secondary">
          Not sure? Take the Flywheel Check
        </Button>
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container-site">
          <CatalogueExplorer initial={initial} />
          <p className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted">
            <StatusTag status="Ed 1.1" /> bands come from Website Strategy Ed. 1.1. <StatusTag status="Proposed" /> bands are to be tested before launch.
          </p>
        </div>
      </section>

      <section id="calendar" className="scroll-mt-24 border-t border-line py-16 md:py-20">
        <div className="container-site">
          <p className="eyebrow mb-3">Batch calendar</p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Next batches.</h2>
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-line font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Programme</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="px-4 py-3 font-medium">Format</th>
                  <th className="px-4 py-3 font-medium">First batch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {PROGRAMMES.map((p) => (
                  <tr key={p.slug}>
                    <td className="px-4 py-3">
                      <Link href={`/programmes/${p.slug}`} className="font-medium text-ink hover:text-primary-hover">
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{levelLabel(p)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-ink-2">
                        <span className="size-2 rounded-full" style={{ background: STAGE_META[p.stage].color }} />
                        {STAGE_META[p.stage].short}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{p.formatDetail}</td>
                    <td className="px-4 py-3 font-medium text-ink">{p.nextBatch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <QuickAnswers {...ANSWERS["/programmes"]} />
    </>
  );
}
