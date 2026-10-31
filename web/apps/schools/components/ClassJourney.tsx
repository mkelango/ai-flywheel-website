"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Tabs, tabIds } from "@flywheel/ui/components/interactive";
import { StatusTag } from "@flywheel/ui/components/primitives";
import { PROGRAMMES, STAGE_META, band, type Programme } from "@/lib/data";

/** The right step for every age: four programmes as tabs, each showing its four stages. */
export function ClassJourney() {
  const [slug, setSlug] = useState<Programme["slug"]>("spark");
  const reduce = useReducedMotion();
  const p = PROGRAMMES.find((x) => x.slug === slug)!;
  const ids = tabIds("journey", p.slug);

  return (
    <div>
      <div>
        <Tabs
          layoutId="journey-pill"
          idBase="journey"
          aria-label="Programmes by class"
          className="!grid w-full grid-cols-2 !rounded-[22px] sm:!inline-flex sm:w-auto sm:!rounded-pill"
          value={slug}
          onChange={setSlug}
          tabs={PROGRAMMES.map((x) => ({
            value: x.slug,
            label: (
              <span className="flex flex-col items-center leading-tight sm:flex-row sm:gap-1.5">
                <span>{x.short}</span>
                <span className="text-[0.72rem] opacity-80">{x.classes.replace("Classes ", "")}</span>
              </span>
            ),
          }))}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={p.slug}
          role="tabpanel"
          id={ids.panel}
          aria-labelledby={ids.tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div className="flex flex-col rounded-[var(--radius-card)] p-7" style={{ background: p.tint }}>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-2">{p.classes}</p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-ink">{p.name}</h3>
            <p className="mt-3 text-lg text-ink-2">{p.line}</p>
            <ul className="mt-6 space-y-2 text-ink-2">
              <li className="flex items-start gap-2 [&>svg]:mt-1">
                <Clock className="size-4 shrink-0" aria-hidden /> {p.time}
              </li>
              <li className="flex items-start gap-2 [&>svg]:mt-1">
                <ShieldCheck className="size-4 shrink-0" aria-hidden /> {p.aiUse}
              </li>
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
              <span className="text-sm text-ink-2">
                <span className="font-semibold text-ink">{band(p.price)}</span> per student a year <StatusTag status="Ed 1.1" />
              </span>
              <Link href={`/programmes/${p.slug}`} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
                See {p.short} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {STAGE_META.map((s, i) => (
              <motion.li
                key={s.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.05 * i + 0.1, duration: 0.35 }}
                className="card relative overflow-hidden p-5"
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: s.color }} aria-hidden />
                <p className="font-display text-sm font-semibold text-ink">
                  <span className="mr-2 inline-block size-2.5 rounded-full align-middle" style={{ background: s.color }} aria-hidden />
                  {s.verb}
                </p>
                <p className="mt-2 text-ink-2">{p.stages[s.key]}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
