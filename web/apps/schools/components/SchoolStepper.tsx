"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import clsx from "clsx";
import { JOURNEY } from "@/lib/data";

/** Check → Demo → Pilot → Partnership → Spark Lab → School mark. */
export function SchoolStepper() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const step = JOURNEY[active];
  const pct = (active / (JOURNEY.length - 1)) * 100;

  return (
    <div className="card p-5 md:p-8">
      <div className="relative">
        {/* track */}
        <div className="absolute left-[22px] top-[22px] hidden h-1 w-[calc(100%-44px)] rounded-full bg-line md:block" aria-hidden>
          <motion.div className="h-full rounded-full bg-accent" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} />
        </div>
        <ol className="relative grid gap-2 md:grid-cols-6 md:gap-0">
          {JOURNEY.map((s, i) => {
            const done = i < active;
            const on = i === active;
            return (
              <li key={s.n} className="md:flex md:justify-center first:md:justify-start last:md:justify-end">
                <button
                  onClick={() => setActive(i)}
                  aria-current={on ? "step" : undefined}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-2xl p-1.5 text-left transition-colors md:w-auto md:flex-col md:items-center md:p-0 md:text-center",
                    on ? "bg-surface-2 md:bg-transparent" : "hover:bg-surface-2/60 md:hover:bg-transparent",
                  )}
                >
                  <span
                    className={clsx(
                      "relative flex size-11 shrink-0 items-center justify-center rounded-full font-display font-semibold ring-4 ring-surface transition-colors",
                      on ? "bg-primary text-on-primary" : done ? "bg-accent text-on-accent" : "bg-surface-2 text-ink",
                    )}
                  >
                    {done ? <Check className="size-5" aria-hidden /> : s.n}
                    {on && <motion.span layoutId={reduce ? undefined : "step-ring"} className="absolute -inset-1.5 rounded-full border-2 border-primary/40" />}
                  </span>
                  <span className={clsx("text-[0.95rem] font-medium md:mt-3 md:max-w-[8.5rem] md:text-sm", on ? "text-ink" : "text-ink-2")}>{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* initial={false}: the first step is server-rendered as is; later steps animate in. */}
      <AnimatePresence initial={false}>
      <motion.div
        key={step.n}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.35 }}
        className="mt-8 flex flex-col gap-5 rounded-[var(--radius-card)] bg-bg p-6 md:flex-row md:items-center md:justify-between md:p-8"
        aria-live="polite"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Step {step.n} of 6</p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">{step.title}</p>
          <p className="mt-2 max-w-xl text-lg text-ink-2">{step.line}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Link href={step.href} className="inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-inverse px-5 font-medium text-inverse-ink hover:opacity-90">
            {step.cta} <ArrowRight className="size-4" aria-hidden />
          </Link>
          {active < JOURNEY.length - 1 && (
            <button onClick={() => setActive(active + 1)} className="inline-flex min-h-11 items-center rounded-pill border border-ink/20 px-5 font-medium text-ink hover:border-ink/60">
              Next step
            </button>
          )}
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
  );
}
