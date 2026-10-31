"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@flywheel/ui/components/primitives";
import { PROGRAMMES, STAGE_META, levelLabel, type StageKey } from "@/lib/programmes";
import { applyHref, applyLabel, batchGroup } from "@/lib/learn";

const STAGES: StageKey[] = ["foundation", "generative", "agentic", "physical", "core", "drive", "all"];

/** Next batches from the catalogue, grouped by month, filterable by stage. */
export function BatchCalendar() {
  const [stage, setStage] = useState<StageKey | null>(null);

  const groups = useMemo(() => {
    const map = new Map<string, { label: string; order: number; items: typeof PROGRAMMES }>();
    for (const p of PROGRAMMES) {
      if (stage && p.stage !== stage) continue;
      const g = batchGroup(p.nextBatch);
      if (!map.has(g.key)) map.set(g.key, { label: g.label, order: g.order, items: [] });
      map.get(g.key)!.items.push(p);
    }
    return [...map.values()].sort((a, b) => a.order - b.order);
  }, [stage]);

  return (
    <div>
      <div role="group" aria-label="Filter by stage" className="flex flex-wrap gap-2">
        {[null, ...STAGES].map((k) => {
          const on = stage === k;
          return (
            <button
              key={k ?? "any"}
              type="button"
              aria-pressed={on}
              onClick={() => setStage(k)}
              className={clsx(
                "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-sm font-medium transition-colors",
                on ? "border-ink bg-inverse text-inverse-ink" : "border-line bg-surface text-ink-2 hover:border-ink/40 hover:text-ink",
              )}
            >
              {k && <span className="size-2 rounded-full" style={{ background: STAGE_META[k].color }} aria-hidden />}
              {k ? STAGE_META[k].short : "All"}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {groups.reduce((n, g) => n + g.items.length, 0)} batches{stage ? ` in ${STAGE_META[stage].short}` : ""}
      </p>
      <div className="mt-10 space-y-10">
        {groups.length === 0 && <p className="text-muted">No batches in this stage yet.</p>}
        {groups.map((g) => (
          <section key={g.label} aria-label={g.label}>
            <h2 className="eyebrow mb-3">{g.label}</h2>
            <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
              {g.items.map((p) => (
                <li key={p.slug} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
                  <div className="min-w-0">
                    <Link href={`/programmes/${p.slug}`} className="font-display text-lg font-semibold text-ink hover:text-primary-hover">
                      {p.title}
                    </Link>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full" style={{ background: STAGE_META[p.stage].color }} aria-hidden />
                        {STAGE_META[p.stage].short}
                      </span>
                      <span>· {levelLabel(p)}</span>
                      <span>· {p.formatDetail}</span>
                      <span>· {p.nextBatch}</span>
                    </p>
                  </div>
                  <Button href={applyHref(p)} size="sm" variant={p.priceStatus === "Free" ? "primary" : "secondary"} className="self-start sm:self-auto">
                    {applyLabel(p)}
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
