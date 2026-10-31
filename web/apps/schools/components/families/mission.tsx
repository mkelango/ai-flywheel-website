import clsx from "clsx";
import { Container, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { STAGE_META } from "@/lib/data";
import { MISSION_TOPICS, PROGRESS_MOCK, type MissionTopicSlug } from "@/lib/families";

export function MissionTopicNav({ current }: { current: MissionTopicSlug }) {
  return (
    <nav aria-label="Mission topics" className="pb-10">
      <Container>
        <ul className="flex flex-wrap gap-2">
          {MISSION_TOPICS.map((t) => {
            const on = t.slug === current;
            return (
              <li key={t.slug}>
                <SmartLink
                  href={`/mission/${t.slug}`}
                  aria-current={on ? "page" : undefined}
                  className={clsx(
                    "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-[0.95rem] font-medium transition",
                    on ? "border-ink bg-ink text-bg" : "border-line text-ink hover:border-ink/60",
                  )}
                >
                  {t.label}
                  <span lang="ta" className={clsx("hidden text-sm sm:inline", on ? "opacity-80" : "text-muted")}>
                    {t.ta}
                  </span>
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}

/** Illustrative mock of the district dashboard: teachers by level, children's work by stage. */
export function ProgressMock() {
  return (
    <div className="relative rounded-[var(--radius-card)] border-2 border-dashed border-line bg-surface p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StatusTag status="Illustrative scenario" />
        <span className="text-sm text-muted">Sample districts and numbers. Shows the format only.</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {PROGRESS_MOCK.map((d) => (
          <div key={d.district} className="card p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-xl font-semibold text-ink">{d.district}</p>
              <p className="text-sm text-muted">{d.schools} schools</p>
            </div>
            <p className="mt-5 text-sm font-semibold text-ink">Teachers by level</p>
            <dl className="mt-2 grid grid-cols-3 gap-2">
              {Object.entries(d.levels).map(([lv, n]) => (
                <div key={lv} className="rounded-2xl bg-surface-2 p-3 text-center">
                  <dt className="font-mono text-xs text-muted">{lv}</dt>
                  <dd className="font-display text-2xl font-semibold text-ink">{n}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm font-semibold text-ink">Classes 3–8 who finished a project, by stage</p>
            <ul className="mt-2 space-y-2">
              {STAGE_META.map((s) => {
                const pct = d.stages[s.key];
                return (
                  <li key={s.key} className="grid grid-cols-[3.5rem_1fr_2.5rem] items-center gap-2 text-sm">
                    <span className="text-ink-2">{s.verb}</span>
                    <span className="h-2.5 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`${s.verb}: ${pct}%`}>
                      <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                    </span>
                    <span className="text-right text-muted">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
