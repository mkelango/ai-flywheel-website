"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Check, CircleDot, Pause, Play, Power } from "lucide-react";
import clsx from "clsx";
import { GATES } from "@/lib/content";

const TRACE: { t: string; k: string; v: string; tone?: "ok" | "warn" | "human" }[] = [
  { t: "00.000", k: "run.start", v: "agent=intake  autonomy=L4" },
  { t: "00.214", k: "policy.check", v: "tools=scoped  egress=allow-list", tone: "ok" },
  { t: "00.611", k: "tool.call", v: "mcp://docs.extract  claim_0193.pdf" },
  { t: "01.402", k: "model.route", v: "task=extract  residency=in" },
  { t: "02.087", k: "eval.case", v: "golden/intake#41  pass", tone: "ok" },
  { t: "02.310", k: "handoff", v: "coverage  autonomy=L3" },
  { t: "02.944", k: "approval.req", v: "named human signs the decision", tone: "human" },
  { t: "03.120", k: "ledger.append", v: "gate=G5  evidence linked", tone: "ok" },
  { t: "03.305", k: "trace.saved", v: "one trace per run  region=ap-south-1" },
];

const EVAL_TARGET = 94;

/** Illustrative product mockup: a run trace streams, gates tick, an eval score fills. */
export function HeroMockup() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState(3);
  const [gates, setGates] = useState(2);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) {
      setLines(TRACE.length);
      setGates(GATES.length);
      setScore(EVAL_TARGET);
      return;
    }
    let l = 3;
    let g = 2;
    const tick = setInterval(() => {
      l += 1;
      if (l > TRACE.length + 3) {
        l = 3;
        g = 2;
      }
      if (l % 2 === 0 && g < GATES.length) g += 1;
      setLines(Math.min(l, TRACE.length));
      setGates(g);
    }, 900);
    let s = 0;
    const fill = setInterval(() => {
      s = Math.min(EVAL_TARGET, s + 2);
      setScore(s);
      if (s >= EVAL_TARGET) clearInterval(fill);
    }, 40);
    return () => {
      clearInterval(tick);
      clearInterval(fill);
    };
  }, [reduce, paused]);

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(60%_60%_at_60%_40%,color-mix(in_oklab,var(--primary)_30%,transparent),transparent)] blur-2xl" />
      <figure
        className={clsx("glass relative overflow-hidden rounded-2xl border border-line shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]", paused && "anim-paused")}
        aria-label="Illustrative Agentic Studio screen: a run trace, gate checklist and eval score"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-surface-2/70 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-ink/15" />
            <span className="size-2.5 rounded-full bg-ink/15" />
            <span className="size-2.5 rounded-full bg-ink/15" />
          </div>
          <p className="min-w-0 truncate font-mono text-[0.7rem] text-muted">agentic.aiflywheel.studio / tessera-claims / run 0142</p>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <span className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-muted sm:inline">Illustrative</span>
            <button
              type="button"
              aria-label="Pause animation"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
              className="grid size-6 place-items-center rounded-md border border-line text-muted transition-colors hover:text-ink"
            >
              {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          {/* Trace */}
          <div className="min-w-0 border-b border-line p-4 md:border-b-0 md:border-r">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Trace</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-agentic">
                <span className="pulse-soft size-1.5 rounded-full bg-agentic" /> live
              </span>
            </div>
            <ol className="h-[236px] space-y-1.5 overflow-hidden font-mono text-[0.7rem] leading-relaxed sm:text-[0.72rem]" aria-live="off">
              {TRACE.slice(0, lines).map((row, i) => (
                <li key={row.k + i} className="flex gap-2.5 motion-safe:animate-[fadeIn_.4s_ease-out]">
                  <span className="shrink-0 text-muted">{row.t}</span>
                  <span
                    className={clsx(
                      "shrink-0",
                      row.tone === "ok" && "text-[color-mix(in_oklab,var(--color-physical)_55%,white)]",
                      row.tone === "human" && "text-agentic",
                      !row.tone && "text-ink",
                    )}
                  >
                    {row.k}
                  </span>
                  <span className="min-w-0 truncate text-muted">{row.v}</span>
                </li>
              ))}
              <li aria-hidden className="text-ink">
                <span className="caret">▍</span>
              </li>
            </ol>
          </div>

          {/* Gates + eval */}
          <div className="flex min-w-0 flex-col gap-4 p-4">
            <div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Gates</span>
              <ul className="mt-3 space-y-1.5">
                {GATES.map((g, i) => {
                  const done = i < gates;
                  const next = i === gates;
                  return (
                    <li key={g.code} className="flex items-center gap-2.5 text-[0.78rem]">
                      <span
                        className={clsx(
                          "grid size-4 shrink-0 place-items-center rounded-[5px] border transition-colors duration-500",
                          done ? "border-agentic bg-agentic text-on-primary" : "border-line text-muted",
                        )}
                      >
                        {done ? <Check className="size-3" strokeWidth={3} /> : next ? <CircleDot className="pulse-soft size-2.5" /> : null}
                      </span>
                      <span className={clsx("font-mono", done ? "text-ink" : "text-muted")}>{g.code}</span>
                      <span className={clsx("truncate", done ? "text-ink-2" : "text-muted")}>{g.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-lg border border-line bg-bg/60 p-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Eval suite</span>
                <span className="font-mono text-lg font-semibold tabular-nums text-ink">
                  0.{String(score).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-gradient-to-r from-foundation via-generative to-agentic transition-[width] duration-300" style={{ width: `${score}%` }} />
              </div>
              <p className="mt-2 font-mono text-[0.65rem] text-muted">threshold 0.90 · 0 critical</p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-bg/60 px-3 py-2">
              <span className="inline-flex items-center gap-2 text-[0.78rem] text-ink-2">
                <Power className="size-3.5 text-agentic" /> Kill switch
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">{gates >= GATES.length ? "tested" : "armed"}</span>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}
