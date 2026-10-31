"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import clsx from "clsx";

const QUESTIONS = [
  { area: "Curriculum", q: "Which classes learn about AI today?", options: ["None yet", "One or two classes, informally", "One class band, with a plan", "Every class band"] },
  { area: "Teachers", q: "How confident are your teachers with AI?", options: ["Most have not tried it", "A few use it for their own work", "Some use it in lesson planning", "Most use it, safely, every week"] },
  { area: "Safety", q: "Do you have rules for AI use by students?", options: ["Not yet", "Informal guidance", "A written policy", "A policy, parent consent and a named owner"] },
  { area: "Parents", q: "How do parents hear about AI at school?", options: ["They don’t, yet", "At the occasional meeting", "A termly update", "A parent pack and a yearly session"] },
  { area: "Space", q: "Where would hands-on work happen?", options: ["In the classroom only", "A computer lab we could share", "A room we could set aside", "A lab with robots or sensors already"] },
  { area: "Timetable", q: "How much time could you give next year?", options: ["Not sure yet", "A few sessions a year", "One period a week for some classes", "One to two periods a week, every class"] },
];

const NEXT = [
  { max: 6, title: "Start with a demo", line: "See a sample lesson with your own students, on site or online.", href: "/demo", cta: "Book a school demo" },
  { max: 11, title: "Pilot one grade band", line: "One term, one class band, one teacher trained to Aware (C1).", href: "/demo", cta: "Ask about a pilot" },
  { max: 15, title: "Annual partnership", line: "All bands, teachers to Practitioner (C2), events and a school report.", href: "/partnership", cta: "See the partnership" },
  { max: 18, title: "Partnership, Spark Lab and the School mark", line: "You are close to the Practitioner mark. Add a lab and plan a Flywheel Day.", href: "/mark", cta: "See the mark criteria" },
];

/** School Flywheel Check: six questions, instant report. Runs in the browser; nothing is stored or sent. */
export function SchoolCheck() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const finished = i >= QUESTIONS.length;
  const score = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const next = NEXT.find((n) => score <= n.max) ?? NEXT[NEXT.length - 1];

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clearTimer, []);

  // After the first interaction, move focus to each new question or the report heading as it mounts.
  const interacted = useRef(false);
  const focusOnMount = useCallback((el: HTMLElement | null) => {
    if (el && interacted.current) el.focus();
  }, []);

  // Advance only from the question just answered, so a double click cannot skip the next one.
  const choose = (v: number) => {
    const answered = i;
    interacted.current = true;
    setAnswers((prev) => prev.map((a, k) => (k === answered ? v : a)));
    clearTimer();
    timer.current = setTimeout(() => setI((cur) => (cur === answered ? cur + 1 : cur)), reduce ? 0 : 220);
  };

  if (finished) {
    const weakest = QUESTIONS.map((q, k) => ({ area: q.area, v: answers[k] ?? 0 })).sort((a, b) => a.v - b.v)[0];
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : undefined} className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]" aria-live="polite">
        <div className="card p-7 md:p-9">
          <h2 ref={focusOnMount} tabIndex={-1} className="eyebrow outline-none">
            Your report
          </h2>
          <p className="mt-2 font-display text-3xl font-semibold text-ink">
            {score} <span className="text-xl text-muted">/ 18</span>
          </p>
          <ul className="mt-6 space-y-4">
            {QUESTIONS.map((q, k) => {
              const v = answers[k] ?? 0;
              return (
                <li key={q.area}>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-ink">{q.area}</span>
                    <span className="text-muted">{q.options[v]}</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${((v + 1) / 4) * 100}%` }} transition={reduce ? { duration: 0 } : { duration: 0.6, delay: k * 0.06 }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-ink-2">
            Start with <span className="font-semibold text-ink">{weakest.area.toLowerCase()}</span>: it is where a partnership helps most.
          </p>
        </div>
        <div className="flex flex-col rounded-[var(--radius-card)] bg-inverse p-7 text-inverse-ink md:p-9">
          <p className="font-mono text-xs uppercase tracking-widest opacity-70">Suggested next step</p>
          <p className="mt-3 font-display text-2xl font-semibold leading-snug">{next.title}</p>
          <p className="mt-3 opacity-80">{next.line}</p>
          <Link href={next.href} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-pill bg-accent px-6 font-semibold text-on-accent hover:brightness-105">
            {next.cta} <ArrowRight className="size-4" aria-hidden />
          </Link>
          <button
            onClick={() => {
              clearTimer();
              setAnswers(Array(QUESTIONS.length).fill(null));
              setI(0);
            }}
            className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-pill font-medium text-inverse-ink/85 hover:bg-white/10"
          >
            <RotateCcw className="size-4" aria-hidden /> Start again
          </button>
          <p className="mt-auto pt-6 text-xs opacity-60">Your answers stay in this browser. Nothing is stored or sent.</p>
        </div>
      </motion.div>
    );
  }

  const q = QUESTIONS[i];
  return (
    <div className="card p-6 md:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Question {i + 1} of {QUESTIONS.length} · {q.area}
        </p>
        {i > 0 && (
          <button
            onClick={() => {
              clearTimer();
              interacted.current = true;
              setI(i - 1);
            }}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-pill px-3 text-sm font-medium text-ink hover:bg-ink/[0.05]">
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={i} aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-label="Progress">
        <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${(i / QUESTIONS.length) * 100}%` }} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.fieldset key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: reduce ? 0 : 0.22 }} className="mt-7">
          <legend ref={focusOnMount} tabIndex={-1} className="outline-none font-display text-2xl font-semibold text-ink md:text-3xl">{q.q}</legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {q.options.map((o, v) => (
              <button
                key={o}
                type="button"
                onClick={() => choose(v)}
                aria-pressed={answers[i] === v}
                className={clsx(
                  "flex min-h-14 items-center gap-3 rounded-2xl border-2 p-4 text-left font-medium transition",
                  answers[i] === v ? "border-primary bg-primary/10 text-ink" : "border-line bg-bg text-ink-2 hover:border-primary/50",
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-xs text-ink ring-1 ring-line">{String.fromCharCode(65 + v)}</span>
                {o}
              </button>
            ))}
          </div>
        </motion.fieldset>
      </AnimatePresence>
    </div>
  );
}
