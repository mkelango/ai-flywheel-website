"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { ADLC } from "@/lib/content";

const DRIVE_COLOR: Record<string, string> = {
  Diagnose: "#3B4BA8",
  Resource: "#B8306F",
  Implement: "#D98B0B",
  Validate: "#D98B0B",
  Expand: "#13827F",
};

/** Interactive ADLC: ten phases on a horizontal rail. Hover, focus or click a phase to see its work and gate. */
export function AdlcTimeline() {
  const [active, setActive] = useState(1);
  const reduce = useReducedMotion();
  const phase = ADLC[active];

  return (
    <div>
      <div className="relative">
        {/* progress rail */}
        <div aria-hidden className="absolute left-[5%] right-[5%] top-[22px] hidden h-px bg-line md:block" />
        <div
          aria-hidden
          className="absolute left-[5%] top-[22px] hidden h-px bg-gradient-to-r from-foundation via-generative to-agentic transition-[width] duration-500 md:block"
          style={{ width: `${(active / (ADLC.length - 1)) * 90}%` }}
        />
        <ol className="relative grid grid-cols-5 gap-2 md:grid-cols-10 md:gap-0" aria-label="ADLC phases">
          {ADLC.map((p, i) => {
            const on = i === active;
            const passed = i < active;
            return (
              <li key={p.n} className="flex justify-center">
                <button
                  type="button"
                  aria-current={on ? "step" : undefined}
                  aria-controls="adlc-detail"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full flex-col items-center gap-2 rounded-lg px-1 py-1 text-center"
                >
                  <span
                    className={clsx(
                      "relative grid size-11 place-items-center rounded-full border font-mono text-sm transition-all duration-300",
                      on ? "scale-110 border-primary bg-primary text-on-primary shadow-[0_0_0_6px_color-mix(in_oklab,var(--primary)_18%,transparent)]" : passed ? "border-primary/60 bg-surface-2 text-ink" : "border-line bg-surface text-muted group-hover:text-ink",
                    )}
                  >
                    {p.n}
                    {p.gate && p.gate.code.startsWith("G") && (
                      <span className={clsx("absolute -right-1.5 -top-1.5 rounded-[5px] border px-1 font-mono text-[0.55rem] leading-4", on ? "border-bg bg-ink text-bg" : "border-line bg-bg text-ink-2")}>
                        {p.gate.code}
                      </span>
                    )}
                  </span>
                  <span className={clsx("text-[0.72rem] leading-tight md:text-[0.78rem]", on ? "font-semibold text-ink" : "text-muted group-hover:text-ink-2")}>{p.name}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div id="adlc-detail" className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={phase.n}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-[1.4fr_1fr]"
          >
            <div className="bg-surface p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: `color-mix(in oklab, ${DRIVE_COLOR[phase.drive]} 55%, white)` }}>
                {phase.drive} · Phase {phase.n}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">{phase.name}</h3>
              <p className="mt-3 text-lg text-ink-2">{phase.does}</p>
            </div>
            <div className="bg-surface-2 p-6 md:p-8">
              {phase.gate ? (
                <>
                  <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-agentic">
                    <ShieldCheck className="size-4" /> {phase.gate.code} · {phase.gate.name}
                  </p>
                  <p className="mt-3 text-lg font-medium text-ink">“{phase.gate.q}”</p>
                  <p className="mt-3 text-sm text-muted">A signed decision with linked evidence. A named human signs.</p>
                </>
              ) : (
                <>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">No gate</p>
                  <p className="mt-3 text-lg text-ink-2">{phase.n === 0 ? "Feeds G1." : phase.n === 9 ? "Closes the loop: feeds the next G1." : "Continuous: monitored, traced, reviewed monthly."}</p>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
