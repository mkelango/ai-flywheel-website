"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, RotateCcw } from "lucide-react";
import clsx from "clsx";
import { siteHref } from "@flywheel/ui/sites";
import { PROGRAMMES, STAGE_META, LEVEL_NAMES } from "@/lib/programmes";
import { EMPTY, FORMAT_OPTS, LEVEL_OPTS, parseFilters, STAGE_OPTS, type Filters } from "@/lib/catalogue";
import { ProgrammeCard } from "./ProgrammeCard";

const SCHOOL_WORDS = /\b(class|school|cbse|icse|kids?|child|children)\b/i;

/** Keeps filters in step with later client-side changes to ?stage=&level=&format=&q=. */
function ParamsSync({ onChange }: { onChange: (f: Filters) => void }) {
  const sp = useSearchParams();
  useEffect(() => {
    onChange(parseFilters((k) => sp.get(k)));
  }, [sp, onChange]);
  return null;
}

function Chip({ on, onClick, children, color }: { on: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={clsx(
        "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-sm font-medium transition-colors",
        on ? "border-ink bg-inverse text-inverse-ink" : "border-line bg-surface text-ink-2 hover:border-ink/40 hover:text-ink",
      )}
    >
      {color && <span className="size-2 rounded-full" style={{ background: color }} aria-hidden />}
      {children}
    </button>
  );
}

/** `initial` comes from the page's searchParams, so pre-filtered links render filtered on the server. */
export function CatalogueExplorer({ initial = EMPTY }: { initial?: Filters }) {
  const [f, setF] = useState<Filters>(initial);

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return PROGRAMMES.filter((p) => {
      if (f.stage && p.stage !== f.stage) return false;
      if (f.level && p.level !== f.level) return false;
      if (f.format && p.format !== f.format) return false;
      if (q) {
        const hay = [p.title, p.focus, p.lifecycle, p.whoFor, p.language, p.studio, STAGE_META[p.stage].label, p.level ?? "", p.level ? LEVEL_NAMES[p.level] : ""].join(" ").toLowerCase();
        return q.split(/\s+/).every((w) => hay.includes(w));
      }
      return true;
    });
  }, [f]);

  const active = !!(f.q || f.stage || f.level || f.format);
  const toggle = <K extends keyof Filters>(key: K, v: Filters[K]) => setF((cur) => ({ ...cur, [key]: cur[key] === v ? null : v }));

  return (
    <div>
      <Suspense fallback={null}>
        <ParamsSync onChange={setF} />
      </Suspense>

      <div className="card p-4 md:p-6">
        <label htmlFor="cat-search" className="sr-only">
          Search programmes
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="cat-search"
            type="search"
            value={f.q}
            onChange={(e) => setF({ ...f, q: e.target.value })}
            placeholder="Search: agents, governance, Tamil, cohort…"
            className="h-13 w-full rounded-pill border border-ink/50 bg-bg pl-12 pr-12 text-base text-ink placeholder:text-muted focus:border-ink"
          />
          {f.q && (
            <button type="button" onClick={() => setF({ ...f, q: "" })} aria-label="Clear search" className="absolute right-1.5 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink">
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-5 space-y-4">
          <fieldset>
            <legend className="eyebrow mb-2">Stage</legend>
            <div className="flex flex-wrap gap-2">
              {STAGE_OPTS.map((s) => (
                <Chip key={s} on={f.stage === s} onClick={() => toggle("stage", s)} color={STAGE_META[s].color}>
                  {STAGE_META[s].short}
                </Chip>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 md:grid-cols-2">
            <fieldset>
              <legend className="eyebrow mb-2">Level</legend>
              <div className="flex flex-wrap gap-2">
                {LEVEL_OPTS.map((l) => (
                  <Chip key={l} on={f.level === l} onClick={() => toggle("level", l)}>
                    {l} <span className="hidden opacity-70 sm:inline">{LEVEL_NAMES[l]}</span>
                  </Chip>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="eyebrow mb-2">Format</legend>
              <div className="flex flex-wrap gap-2">
                {FORMAT_OPTS.map((fm) => (
                  <Chip key={fm} on={f.format === fm} onClick={() => toggle("format", fm)}>
                    {fm}
                  </Chip>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-semibold text-ink">{results.length}</span> of {PROGRAMMES.length} programmes
        </p>
        {active && (
          <button type="button" onClick={() => setF(EMPTY)} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
            <RotateCcw className="size-4" /> Clear filters
          </button>
        )}
      </div>

      {SCHOOL_WORDS.test(f.q) && (
        <a href={siteHref("schools", "/")} className="mt-4 flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-highlight/40 p-5 text-ink">
          <span>
            <span className="block font-semibold">Looking for schools?</span>
            <span className="text-sm text-ink-2">Classes 1 to 12, teachers and parents are on AI Flywheel at Schools.</span>
          </span>
          <span aria-hidden>↗</span>
        </a>
      )}

      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <li key={p.slug}>
            <ProgrammeCard p={p} headingLevel="h2" />
          </li>
        ))}
      </ul>
      {results.length === 0 && (
        <div className="mt-5 rounded-[var(--radius-card)] border border-dashed border-ink/25 p-10 text-center">
          <p className="font-display text-xl text-ink">No programme matches that yet.</p>
          <p className="mt-1 text-muted">Clear a filter, or take the Flywheel Check for a suggestion.</p>
        </div>
      )}
    </div>
  );
}
