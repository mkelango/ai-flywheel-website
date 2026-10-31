"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Lock, RotateCcw } from "lucide-react";
import clsx from "clsx";
import { LEVELS } from "@flywheel/ui/sites";
import { getProgramme, STAGE_META, type LevelCode } from "@/lib/programmes";
import type { CoreStage } from "@/lib/framework";

type Question = { stage: CoreStage; q: string; options: string[] };

const QUESTIONS: Question[] = [
  { stage: "foundation", q: "When an AI answer is wrong, can you tell if the data or the model caused it?", options: ["Not sure what that means", "I can usually guess", "I've documented a data slice or read a model card", "I decide whether to rent, adapt or build models"] },
  { stage: "foundation", q: "Have you taken a model from idea to evaluation?", options: ["Never", "I've compared a few models side by side", "I've built a golden set and run a bake-off", "I run a model census for a team"] },
  { stage: "generative", q: "How do you use AI to draft text, images or media?", options: ["Rarely", "Daily, and I check every output", "I've shipped a pipeline others use", "I run a governed platform for teams"] },
  { stage: "generative", q: "Do you track rights and provenance for AI-made content?", options: ["Not yet", "I add a disclosure", "I keep a rights ledger", "I set the policy for teams"] },
  { stage: "agentic", q: "Have you delegated a task to an AI agent?", options: ["No", "Yes, and I read its trace", "I've shipped an agent with evals", "I set autonomy levels for many agents"] },
  { stage: "agentic", q: "Could you stop an agent safely if it misbehaved?", options: ["Not sure", "I'd escalate to its owner", "I've built and tested a kill switch", "I run the accountability register"] },
  { stage: "physical", q: "Do you work with robots or machines?", options: ["No", "Beside them, safely, logging interventions", "I've taken a cell through sim and bench test", "I own a fleet's safety case"] },
  { stage: "physical", q: "Do you test machines in simulation before the real thing?", options: ["No", "I've seen it done", "Yes, with a simulation gate", "I replicate cells across sites"] },
];

const ORDER: CoreStage[] = ["agentic", "generative", "foundation", "physical"];
const C2: Record<CoreStage, string> = { foundation: "core-for-every-team", generative: "generative-ai-practitioner", agentic: "working-with-ai-agents", physical: "working-with-ai-agents" };
const C3: Record<CoreStage, string> = { foundation: "model-engineer", generative: "generative-ai-engineer", agentic: "agentic-ai-engineer", physical: "physical-ai-robotics-engineer" };

/** Eight-question diagnostic. Everything stays in the browser. */
export function FlywheelCheck() {
  const [i, setI] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const headRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const done = i >= QUESTIONS.length;

  // Move focus to the new question or result so keyboard users are not dropped to <body>.
  useEffect(() => {
    if (started) headRef.current?.focus();
  }, [i, started]);

  const go = (n: number) => {
    setStarted(true);
    setI(n);
  };

  const answer = (score: number) => {
    const next = [...scores];
    next[i] = score;
    setScores(next);
    go(i + 1);
  };

  const levels = Object.fromEntries(
    ORDER.map((s) => {
      const vals = QUESTIONS.map((q, idx) => (q.stage === s ? scores[idx] : undefined)).filter((v): v is number => v !== undefined);
      const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 1;
      return [s, Math.max(1, Math.floor(avg))];
    }),
  ) as Record<CoreStage, number>;

  const top = ORDER.reduce((best, s) => (levels[s] > levels[best] ? s : best), ORDER[0]);
  const topLevel = levels[top];
  const recSlug = topLevel <= 1 ? "foundation" : topLevel === 2 ? C2[top] : topLevel === 3 ? C3[top] : "drive-implementer";
  const rec = getProgramme(recSlug);

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-4 border-b border-line px-6 py-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-surface-2" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={Math.min(i, QUESTIONS.length)} aria-label="Progress">
          <motion.div className="h-full rounded-pill bg-primary" animate={{ width: `${(Math.min(i, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} transition={{ duration: reduce ? 0 : 0.35 }} />
        </div>
        <span className="font-mono text-xs text-muted">
          {Math.min(i, QUESTIONS.length)}/{QUESTIONS.length}
        </span>
      </div>

      <div className="p-6 md:p-10">
          {!done ? (
            <motion.div key={i} initial={started ? { opacity: 0, x: 24 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.25 }}>
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
                <span className="size-2 rounded-full" style={{ background: STAGE_META[QUESTIONS[i].stage].color }} />
                {STAGE_META[QUESTIONS[i].stage].short} · Question {i + 1}
              </p>
              <h2 ref={headRef} tabIndex={-1} className="mt-3 font-display text-2xl font-semibold leading-snug text-ink outline-none md:text-3xl">{QUESTIONS[i].q}</h2>
              <div className="mt-6 grid gap-2">
                {QUESTIONS[i].options.map((o, idx) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => answer(idx + 1)}
                    aria-pressed={scores[i] === idx + 1}
                    className={clsx(
                      "flex min-h-14 items-center gap-4 rounded-xl border px-4 text-left font-medium transition-colors",
                      scores[i] === idx + 1 ? "border-ink bg-inverse text-inverse-ink" : "border-line bg-bg text-ink hover:border-ink/50",
                    )}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-current font-mono text-xs opacity-60">{String.fromCharCode(65 + idx)}</span>
                    {o}
                  </button>
                ))}
              </div>
              {i > 0 && (
                <button type="button" onClick={() => go(i - 1)} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-ink">
                  <ArrowLeft className="size-4" /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.3 }}>
              <p className="eyebrow">Your Flywheel Check</p>
              <h2 ref={headRef} tabIndex={-1} className="mt-2 font-display text-3xl font-semibold text-ink outline-none md:text-4xl">Your suggested level, by stage.</h2>
              <ul className="mt-6 space-y-4">
                {ORDER.map((s) => {
                  const lv = LEVELS[levels[s] - 1];
                  return (
                    <li key={s} className="grid gap-2 sm:grid-cols-[9rem_1fr_9rem] sm:items-center">
                      <span className="flex items-center gap-2 font-medium text-ink">
                        <span className="size-2.5 rounded-full" style={{ background: STAGE_META[s].color }} /> {STAGE_META[s].short}
                      </span>
                      <span className="flex gap-1" aria-hidden>
                        {LEVELS.map((l, n) => (
                          <span key={l.code} className="h-2.5 flex-1 rounded-pill" style={{ background: n < levels[s] ? STAGE_META[s].color : "var(--surface-2)" }} />
                        ))}
                      </span>
                      <span className="text-sm text-ink sm:text-right">
                        {lv.name} ({lv.code as LevelCode})
                      </span>
                    </li>
                  );
                })}
              </ul>

              {rec && (
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-2 p-5">
                  <div>
                    <p className="text-sm text-muted">Recommended next</p>
                    <p className="font-display text-xl font-semibold text-ink">{rec.title}</p>
                    <p className="text-sm text-ink-2">
                      {rec.formatDetail} · {rec.price} · next batch {rec.nextBatch}
                    </p>
                  </div>
                  <Link href={`/programmes/${rec.slug}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-primary px-5 font-medium text-on-primary hover:bg-primary-hover">
                    See programme <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
              <p className="mt-4 text-xs text-muted">A self-report, not a credential. Levels are earned only with evidence from real work.</p>
              <button
                type="button"
                onClick={() => {
                  setScores([]);
                  go(0);
                }}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-ink"
              >
                <RotateCcw className="size-4" /> Retake
              </button>
            </motion.div>
          )}
      </div>
      <p className="flex items-center gap-2 border-t border-line bg-surface-2/60 px-6 py-3 text-xs text-muted">
        <Lock className="size-3.5" aria-hidden /> Runs in your browser. No answers are stored or sent.
      </p>
    </div>
  );
}
