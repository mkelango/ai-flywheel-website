"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Tabs, tabIds } from "@flywheel/ui/components/interactive";
import { LEVELS } from "@flywheel/ui/sites";
import { MATRIX, type CoreStage } from "@/lib/framework";
import { PROGRAMMES, STAGE_META } from "@/lib/programmes";

const ORDER: CoreStage[] = ["foundation", "generative", "agentic", "physical"];

/** Stage × level matrix: pick a stage, see what C1 to C5 mean in it. */
export function StageMatrix() {
  const [stage, setStage] = useState<CoreStage>("agentic");
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const m = MATRIX[stage];
  const color = STAGE_META[stage].color;
  const idBase = useId();
  const ids = tabIds(idBase, stage);

  return (
    <div>
      <Tabs
        layoutId="matrix-tab"
        idBase={idBase}
        aria-label="Stages"
        value={stage}
        onChange={(s) => {
          setTouched(true);
          setStage(s);
        }}
        tabs={ORDER.map((s) => ({
          value: s,
          label: (
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: STAGE_META[s].color }} />
              {STAGE_META[s].short}
            </span>
          ),
        }))}
      />
      <div role="tabpanel" id={ids.panel} aria-labelledby={ids.tab} className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4" style={{ boxShadow: `inset 4px 0 0 ${color}` }}>
          <p className="font-display text-xl font-semibold text-ink">
            {STAGE_META[stage].short} <span className="font-sans text-base font-normal text-muted">· {m.tagline}</span>
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {m.lifecycle} · {m.studio}
          </p>
        </div>
        <ol className="divide-y divide-line">
          {LEVELS.map((l, i) => {
            const prog = PROGRAMMES.find((p) => p.level === l.code && p.stage === stage);
            return (
              <motion.li
                key={stage + l.code}
                initial={touched ? { opacity: 0, x: -8 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.04 }}
                className="grid gap-2 px-5 py-4 md:grid-cols-[10rem_1fr_14rem] md:items-center"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold text-ink" style={{ background: `color-mix(in oklab, ${color} ${16 + i * 8}%, transparent)` }}>
                    {l.code}
                  </span>
                  <span className="font-medium text-ink">{l.name}</span>
                </span>
                <span className="text-ink-2">{m.levels[l.code]}</span>
                <span className="text-sm text-muted md:text-right">
                  {prog ? (
                    <Link href={`/programmes/${prog.slug}`} className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                      {prog.title}
                    </Link>
                  ) : (
                    l.evidence
                  )}
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
