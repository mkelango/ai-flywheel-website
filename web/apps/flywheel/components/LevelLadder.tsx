"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { tabIds } from "@flywheel/ui/components/interactive";
import { LEVELS } from "@flywheel/ui/sites";
import { PROGRAMMES, STAGE_META } from "@/lib/programmes";
import { MATRIX, type CoreStage } from "@/lib/framework";

const STAGES: CoreStage[] = ["foundation", "generative", "agentic", "physical"];

/** Interactive C1–C5 ladder: pick a rung, see what it means in each stage and where to earn it. */
export function LevelLadder() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const level = LEVELS[active];
  const progs = PROGRAMMES.filter((p) => p.level === level.code).slice(0, 3);
  const idBase = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = LEVELS.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? active >= last ? 0 : active + 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? active <= 0 ? last : active - 1
          : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div role="tablist" aria-label="Levels" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible">
        {LEVELS.map((l, i) => {
          const on = i === active;
          return (
            <button
              key={l.code}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabIds(idBase, l.code).tab}
              aria-selected={on}
              aria-controls={tabIds(idBase, l.code).panel}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={clsx(
                "group relative flex min-h-14 shrink-0 items-center gap-4 rounded-[var(--radius-card)] border px-4 text-left transition-colors lg:w-full",
                on ? "border-ink bg-inverse text-inverse-ink" : "border-line bg-surface text-ink hover:border-ink/40",
              )}
            >
              <span className={clsx("font-mono text-sm font-semibold", on ? "text-highlight" : "text-muted")}>{l.code}</span>
              <span className="font-display text-lg font-semibold">{l.name}</span>
              <span className="ml-auto hidden h-1.5 rounded-pill bg-primary lg:block" style={{ width: `${(i + 1) * 12}px` }} aria-hidden />
            </button>
          );
        })}
      </div>

      <div id={tabIds(idBase, level.code).panel} role="tabpanel" aria-labelledby={tabIds(idBase, level.code).tab} className="lg:col-span-8">
          <motion.div
            key={level.code}
            initial={touched ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="card p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display text-2xl font-semibold text-ink md:text-3xl">
                {level.name} <span className="font-mono text-base text-muted">({level.code})</span>
              </p>
              <p className="text-sm text-muted">
                Evidence: <span className="text-ink">{level.evidence}</span>
              </p>
            </div>
            <p className="mt-2 text-ink-2">{level.line}.</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {STAGES.map((s) => (
                <li key={s} className="rounded-xl border border-line bg-bg p-4">
                  <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                    <span className="size-2 rounded-full" style={{ background: STAGE_META[s].color }} />
                    {STAGE_META[s].short}
                  </span>
                  <span className="mt-1.5 block text-[0.92rem] leading-snug text-ink">{MATRIX[s].levels[level.code]}</span>
                </li>
              ))}
            </ul>

            {progs.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                <span className="eyebrow mr-1">Earn it in</span>
                {progs.map((p) => (
                  <Link key={p.slug} href={`/programmes/${p.slug}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-pill border border-line px-3.5 text-sm font-medium text-ink hover:border-ink/50">
                    {p.title} <ArrowRight className="size-3.5" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
      </div>
    </div>
  );
}
