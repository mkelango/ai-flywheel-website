"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { AUTONOMY } from "@/lib/content";

/** Slide from L0 to L5: what the agent may do, and the controls that must exist first (cumulative). */
export function AutonomyDial() {
  const [level, setLevel] = useState(3);
  const id = useId();
  const cur = AUTONOMY[level];
  const sweet = level === 3 || level === 4;
  const required = AUTONOMY.slice(1, level + 1).reduce((n, a) => n + a.controls.length, 0);

  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line lg:grid-cols-[1.1fr_1fr]">
      <div className="bg-surface p-6 md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Autonomy level
          </label>
          {sweet && <span className="rounded-pill bg-highlight px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-agentic">2026 sweet spot</span>}
        </div>
        <p className="mt-4 flex items-baseline gap-3">
          <span className="font-mono text-5xl font-semibold text-agentic md:text-6xl">{cur.code}</span>
          <span className="font-display text-2xl font-semibold text-ink md:text-3xl">{cur.name}</span>
        </p>
        <p className="mt-3 text-lg text-ink-2">{cur.product}</p>

        <input
          id={id}
          type="range"
          min={0}
          max={AUTONOMY.length - 1}
          step={1}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          aria-valuetext={`${cur.code} ${cur.name}`}
          className="mt-6 h-6 w-full cursor-pointer appearance-none rounded-full accent-[var(--primary)]"
          style={{ background: `linear-gradient(90deg, var(--primary) ${(level / (AUTONOMY.length - 1)) * 100}%, color-mix(in oklab, var(--ink) 10%, transparent) 0) center / 100% 8px no-repeat` }}
        />
        <div className="mt-3 grid grid-cols-6 font-mono text-[0.68rem] text-muted" aria-hidden>
          {AUTONOMY.map((a, i) => (
            <button key={a.code} type="button" tabIndex={-1} onClick={() => setLevel(i)} className={clsx("min-h-6 text-left first:text-left last:text-right", i === level && "text-ink")}>
              {a.code}
            </button>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">When in doubt, set the dial one notch lower. Raise it as trust is earned.</p>
      </div>

      <div className="bg-surface-2 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Controls required first</p>
        <p className="sr-only" aria-live="polite">
          At {cur.code}: {required} controls required.
        </p>
        <ul className="mt-5 space-y-2.5">
          {AUTONOMY.slice(1).flatMap((a, idx) =>
            a.controls.map((c) => {
              const on = idx + 1 <= level;
              return (
                <li key={c} className="flex items-start gap-3 text-[0.95rem]">
                  <span className={clsx("mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-300", on ? "border-agentic bg-agentic text-on-primary" : "border-dashed border-muted/60")}>
                    {on && <Check className="size-3.5" strokeWidth={3} />}
                  </span>
                  <span className={on ? "text-ink" : "text-muted"}>
                    <span className="sr-only">{on ? "Required: " : "Not yet required: "}</span>
                    {c} <span className="font-mono text-[0.7rem] text-muted">· {a.code}</span>
                  </span>
                </li>
              );
            }),
          )}
        </ul>
      </div>
    </div>
  );
}
