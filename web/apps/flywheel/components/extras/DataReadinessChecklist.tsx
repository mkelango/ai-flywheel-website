"use client";

import { useState } from "react";
import clsx from "clsx";

type Mark = "ready" | "partial" | "not";

/** The AI Flywheel, Figure 4.3. */
const ITEMS = [
  { name: "Exists", line: "The data is there, and we can legally reach it" },
  { name: "Clean", line: "Accurate, complete, consistent; no gaps or duplicates" },
  { name: "Connected", line: "Joined across the systems that matter, not siloed" },
  { name: "Relevant", line: "Holds the real signal for this problem" },
  { name: "Allowed", line: "Privacy, consent, contracts and, at scale, sovereignty" },
  { name: "Fresh", line: "Current enough to trust, and still flowing" },
];

const MARKS: { key: Mark; label: string }[] = [
  { key: "ready", label: "Ready" },
  { key: "partial", label: "Partial" },
  { key: "not", label: "Not ready" },
];

export function DataReadinessChecklist() {
  const [useCase, setUseCase] = useState("");
  const [marks, setMarks] = useState<(Mark | null)[]>(ITEMS.map(() => null));

  const done = marks.every(Boolean);
  const stops = ITEMS.filter((_, i) => i < 5 && marks[i] === "not").map((it) => it.name);
  const partials = ITEMS.filter((_, i) => marks[i] === "partial").map((it) => it.name);
  const freshNot = marks[5] === "not";

  let result: { tone: "stop" | "go" | "wait"; title: string; line: string };
  if (stops.length) {
    result = { tone: "stop", title: "Stop. Fix the floor before building.", line: `Not ready on ${stops.join(", ")}. You are about to build on sand.` };
  } else if (!done) {
    result = { tone: "wait", title: "Mark all six items.", line: `${marks.filter(Boolean).length} of 6 marked.` };
  } else {
    const notes = [partials.length ? `Partial: ${partials.join(", ")}. Name who owns each fix.` : "", freshNot ? "Fresh is not ready: the data may not be current enough to trust." : ""].filter(Boolean).join(" ");
    result = { tone: "go", title: "The gate is clear on items 1 to 5.", line: notes || "Every item is ready. Build on rock." };
  }

  return (
    <div className="card overflow-hidden print:shadow-none">
      <div className="border-b border-line px-5 py-4">
        <label htmlFor="dr-usecase" className="eyebrow block">
          The one use case, and the exact data it needs
        </label>
        <input
          id="dr-usecase"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          placeholder="e.g. claims triage: motor claims in one state"
          className="mt-2 h-11 w-full rounded-md border border-ink/50 bg-bg px-3 text-ink placeholder:text-muted focus:border-ink"
        />
      </div>
      <ol className="divide-y divide-line">
        {ITEMS.map((it, i) => (
          <li key={it.name} className="grid gap-3 px-5 py-4 sm:grid-cols-12 sm:items-center print-keep">
            <div className="sm:col-span-6">
              <p className="font-display text-lg font-semibold text-ink">
                <span className="mr-2 font-mono text-sm text-muted">{i + 1}</span>
                {it.name}
              </p>
              <p className="text-sm text-muted">{it.line}</p>
            </div>
            <fieldset className="sm:col-span-6">
              <legend className="sr-only">{it.name}</legend>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {MARKS.map((m) => {
                  const on = marks[i] === m.key;
                  return (
                    <label
                      key={m.key}
                      className={clsx(
                        "inline-flex min-h-11 cursor-pointer items-center rounded-pill border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                        on ? (m.key === "not" ? "border-primary bg-primary text-on-primary" : "border-ink bg-ink text-inverse-ink") : "border-ink/40 text-ink hover:border-ink",
                      )}
                    >
                      <input
                        type="radio"
                        name={`dr-${i}`}
                        value={m.key}
                        checked={on}
                        onChange={() => setMarks((prev) => prev.map((x, j) => (j === i ? m.key : x)))}
                        className="sr-only"
                      />
                      {m.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <div
        aria-live="polite"
        className={clsx("border-t px-5 py-5", result.tone === "stop" ? "border-primary bg-primary/10" : result.tone === "go" ? "border-line bg-surface-2" : "border-line")}
      >
        <p className="eyebrow">The gate</p>
        <p className="mt-1 font-display text-xl font-semibold text-ink">{result.title}</p>
        <p className="mt-1 text-sm text-ink-2">{result.line}</p>
        <p className="mt-3 text-xs text-muted">Any “not ready” on items 1 to 5 means stop.</p>
      </div>
    </div>
  );
}
