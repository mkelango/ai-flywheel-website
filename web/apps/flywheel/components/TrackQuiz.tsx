"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import clsx from "clsx";
import { TRACKS } from "@/lib/framework";
import { getProgramme, levelLabel } from "@/lib/programmes";

type Q = { id: string; q: string; options: { label: string; value: string }[] };

const QUESTIONS: Q[] = [
  {
    id: "work",
    q: "What is your work closest to?",
    options: [
      { label: "Writing software", value: "developers" },
      { label: "Data, analytics or ML", value: "data" },
      { label: "Product, business or operations", value: "product" },
      { label: "Marketing, media or design", value: "marketing" },
      { label: "Risk, legal, compliance or HR", value: "risk" },
      { label: "Manufacturing or hardware", value: "manufacturing" },
      { label: "I'm a student or fresher", value: "students" },
    ],
  },
  {
    id: "now",
    q: "How do you use AI today?",
    options: [
      { label: "Not much yet", value: "0" },
      { label: "Most days, for drafts and answers", value: "1" },
      { label: "I've built something with it", value: "2" },
    ],
  },
  {
    id: "next",
    q: "What do you want next?",
    options: [
      { label: "Use AI well and safely", value: "use" },
      { label: "Build and ship real work", value: "build" },
      { label: "Lead a team or portfolio", value: "lead" },
    ],
  },
];

/** Three-question career quiz. Runs in the browser; nothing is sent anywhere. */
export function TrackQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const headRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const done = step >= QUESTIONS.length;

  // Move focus to the new question or result so keyboard users are not dropped to <body>.
  useEffect(() => {
    if (started) headRef.current?.focus();
  }, [step, started]);

  const go = (n: number) => {
    setStarted(true);
    setStep(n);
  };

  const pick = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    go(step + 1);
  };

  const track = TRACKS.find((t) => t.key === answers.work) ?? TRACKS[0];
  // Map experience and ambition to a rung of the track's path.
  const now = Number(answers.now ?? 0);
  const want = answers.next === "lead" ? 3 : answers.next === "build" ? 2 : 1;
  const idx = Math.min(track.programmes.length - 1, now === 0 ? 0 : Math.min(want, now + 1));
  const rec = getProgramme(track.programmes[idx]);

  return (
    <div className="card overflow-hidden">
      <div className="h-1 bg-surface-2">
        <motion.div className="h-full bg-primary" animate={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} transition={{ duration: reduce ? 0 : 0.4 }} />
      </div>
      <div className="p-6 md:p-10">
          {!done ? (
            <motion.div key={step} initial={started ? { opacity: 0, x: 20 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.25 }}>
              <p className="eyebrow">
                Question {step + 1} of {QUESTIONS.length}
              </p>
              <h3 ref={headRef} tabIndex={-1} className="mt-2 font-display text-2xl font-semibold text-ink outline-none md:text-3xl">{QUESTIONS[step].q}</h3>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {QUESTIONS[step].options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => pick(QUESTIONS[step].id, o.value)}
                    aria-pressed={answers[QUESTIONS[step].id] === o.value}
                    className={clsx(
                      "flex min-h-14 items-center justify-between rounded-xl border px-4 text-left font-medium transition-colors",
                      answers[QUESTIONS[step].id] === o.value ? "border-ink bg-inverse text-inverse-ink" : "border-line bg-bg text-ink hover:border-ink/50",
                    )}
                  >
                    {o.label} <ArrowRight className="size-4 opacity-50" aria-hidden />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => go(step - 1)} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-ink">
                  <ArrowLeft className="size-4" /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.3 }}>
              <p className="eyebrow">Your track</p>
              <h3 ref={headRef} tabIndex={-1} className="mt-2 font-display text-3xl font-semibold text-ink outline-none md:text-4xl">{track.name}</h3>
              <p className="mt-2 text-muted">Roles it prepares you for: {track.roles}.</p>

              <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                {track.programmes.map((slug, i) => {
                  const p = getProgramme(slug);
                  if (!p) return null;
                  return (
                    <li key={slug} className="flex items-center gap-2">
                      <span className={clsx("rounded-pill border px-3 py-1.5", i === idx ? "border-primary bg-primary text-on-primary" : "border-line text-ink-2")}>
                        {p.level} · {p.title}
                      </span>
                      {i < track.programmes.length - 1 && <ArrowRight className="size-3.5 text-muted" aria-hidden />}
                    </li>
                  );
                })}
              </ol>

              {rec && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-2 p-5">
                  <div>
                    <p className="text-sm text-muted">Start here</p>
                    <p className="font-display text-xl font-semibold text-ink">
                      {rec.title} <span className="font-mono text-sm text-muted">{levelLabel(rec)}</span>
                    </p>
                    <p className="text-sm text-ink-2">
                      {rec.formatDetail} · {rec.price} · next batch {rec.nextBatch}
                    </p>
                  </div>
                  <Link href={`/programmes/${rec.slug}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-primary px-5 font-medium text-on-primary hover:bg-primary-hover">
                    See programme <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  go(0);
                }}
                className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-ink"
              >
                <RotateCcw className="size-4" /> Start again
              </button>
            </motion.div>
          )}
      </div>
    </div>
  );
}
