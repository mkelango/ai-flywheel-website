import clsx from "clsx";
import { COHORT_WEEKS } from "@/lib/programmes";

/** Week-by-week strip of the 12-week cohort, with gates G1–G6 marked. */
export function GateStrip() {
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {COHORT_WEEKS.map((w) => {
        const gate = w.gate?.match(/^G\d/)?.[0];
        return (
          <li
            key={w.week}
            className={clsx(
              "flex flex-col rounded-xl border p-3",
              gate ? "border-ink/20 bg-highlight/25" : "border-line bg-surface",
              w.week === "16" && "border-dashed",
            )}
          >
            <span className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              Week {w.week}
              {gate && <span className="rounded-pill bg-inverse px-2 py-0.5 font-semibold text-inverse-ink">{gate}</span>}
            </span>
            <span className="mt-2 text-sm font-medium leading-snug text-ink">{w.taught}</span>
            {w.gate && !gate && <span className="mt-1 text-xs text-muted">{w.gate}</span>}
            {gate && w.gate && w.gate !== gate &&<span className="mt-1 text-xs text-muted">{w.gate.replace(/^G\d;?\s*/, "")}</span>}
          </li>
        );
      })}
    </ol>
  );
}
