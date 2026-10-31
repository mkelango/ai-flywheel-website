"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { StatusTag } from "@flywheel/ui/components/primitives";
import { LAB_TIERS, PROGRAMMES, band, inr } from "@/lib/data";

const LAKH = 100000;
const fmtLakh = (n: number) => (n >= LAKH ? `₹${(n / LAKH).toLocaleString("en-IN", { maximumFractionDigits: 1 })} lakh` : inr(Math.round(n)));

/** Pick class bands and student counts; see an annual range. Client-side only, nothing is sent. */
export function PricingEstimator() {
  const id = useId();
  const [counts, setCounts] = useState<Record<string, number>>({ play: 0, spark: 120, practitioner: 120, "builders-club": 0 });
  const [lab, setLab] = useState<string>("none");

  const set = (slug: string, v: number) => setCounts((c) => ({ ...c, [slug]: Math.max(0, Math.min(5000, Math.round(v) || 0)) }));
  const lo = PROGRAMMES.reduce((s, p) => s + (counts[p.slug] ?? 0) * p.price[0], 0);
  const hi = PROGRAMMES.reduce((s, p) => s + (counts[p.slug] ?? 0) * p.price[1], 0);
  const students = Object.values(counts).reduce((a, b) => a + b, 0);
  const tier = LAB_TIERS.find((t) => t.key === lab);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="card divide-y divide-line">
        {PROGRAMMES.map((p) => {
          const n = counts[p.slug] ?? 0;
          const on = n > 0;
          return (
            <div key={p.slug} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className={clsx("size-3 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-surface transition", on ? "ring-primary" : "ring-line")} style={{ background: p.tint }} aria-hidden />
                <div>
                  <label htmlFor={`${id}-${p.slug}`} className="font-display font-semibold text-ink">
                    {p.short} <span className="font-sans font-normal text-muted">· {p.classes}</span>
                  </label>
                  <p className="text-sm text-muted">{band(p.price)} per student</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => set(p.slug, n - 10)} className="flex size-11 items-center justify-center rounded-full border border-line text-ink hover:bg-surface-2" aria-label={`10 fewer ${p.short} students`}>
                  <Minus className="size-4" aria-hidden />
                </button>
                <input
                  id={`${id}-${p.slug}`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={5000}
                  step={10}
                  value={n}
                  onChange={(e) => set(p.slug, Number(e.target.value))}
                  className="h-11 w-24 rounded-xl border border-ink/60 bg-bg text-center font-semibold text-ink"
                  aria-describedby={`${id}-unit`}
                />
                <button type="button" onClick={() => set(p.slug, n + 10)} className="flex size-11 items-center justify-center rounded-full border border-line text-ink hover:bg-surface-2" aria-label={`10 more ${p.short} students`}>
                  <Plus className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          );
        })}
        <div className="p-5">
          <p id={`${id}-unit`} className="sr-only">
            Number of students
          </p>
          <fieldset>
            <legend className="font-display font-semibold text-ink">Add a Spark Lab? <span className="font-sans text-sm font-normal text-muted">(one-time set-up)</span></legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {[{ key: "none", name: "No lab yet", price: "" }, ...LAB_TIERS].map((t) => (
                <label key={t.key} className={clsx("inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--primary)]", lab === t.key ? "border-ink bg-ink text-inverse-ink" : "border-line text-ink-2 hover:border-ink/40")}>
                  <input type="radio" name={`${id}-lab`} value={t.key} checked={lab === t.key} onChange={() => setLab(t.key)} className="sr-only" />
                  {t.name} {t.price && <span className="opacity-75">{t.price}</span>}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex flex-col rounded-[var(--radius-card)] bg-inverse p-7 text-inverse-ink lg:sticky lg:top-28 lg:self-start" aria-live="polite">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-75">
          Estimate <StatusTag status="Ed 1.1" />
        </p>
        <p className="mt-4 text-sm opacity-80">{students.toLocaleString("en-IN")} students · per year</p>
        <p className="mt-1 font-display text-3xl font-semibold leading-tight md:text-4xl">{students ? `${fmtLakh(lo)} – ${fmtLakh(hi)}` : "Add students"}</p>
        {tier && (
          <p className="mt-4 border-t border-white/15 pt-4 text-sm opacity-90">
            Plus {tier.name} lab set-up: <span className="font-semibold">{tier.price}</span>, one time.
          </p>
        )}
        <p className="mt-5 text-sm opacity-75">An estimate from Ed 1.1 bands, not a quote. Your price is set per school after a demo.</p>
        <Link href="/demo" className="mt-6 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-pill bg-accent px-5 font-semibold text-on-accent hover:brightness-105">
          Get a quote for your school <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
