import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { PrintButton } from "@/components/extras/PrintButton";
import { SourceNote } from "@/components/extras/SourceNote";

export const metadata: Metadata = pageMeta("/free/30-day-path");

type Row = { days: string; focus: string; doThis: string; doneWhen: string };

/** Agentic Studio Playbook, Table 41.9. */
const WEEKS: { week: string; rows: Row[] }[] = [
  {
    week: "Week 1",
    rows: [
      { days: "1–4", focus: "Version control", doThis: "Create the repo, turn on branch protection, ship small changes through PRs, resolve a conflict you plant, run two agents in worktrees.", doneWhen: "Five PRs merged through required checks." },
      { days: "5–9", focus: "Web and APIs", doThis: "Write an OpenAPI contract first, generate a mock server, build two endpoints, call them with curl, add a signed webhook.", doneWhen: "You can explain any request in the Network tab." },
    ],
  },
  {
    week: "Week 2",
    rows: [
      { days: "10–13", focus: "Data", doThis: "Turn a domain model into a schema, write three migrations, add an index, seed 100,000 rows, restore a backup.", doneWhen: "A restore to a fresh database works." },
      { days: "14–18", focus: "Identity and security", doThis: "Add an auth provider, two roles and two tenants with RLS; run /security-review; plant a prompt injection in a test document.", doneWhen: "The cross-tenant test fails safely and the injection is ignored." },
    ],
  },
  {
    week: "Week 3",
    rows: [
      { days: "19–22", focus: "Infrastructure", doThis: "Move config to environment variables and secrets to a manager, add a dev container, deploy preview and staging on HTTPS, add one queued job.", doneWhen: "A fresh clone runs in one command; staging is live." },
    ],
  },
  {
    week: "Week 4",
    rows: [
      { days: "23–26", focus: "Quality", doThis: "CI with types, lint, tests and accessibility checks; 20 eval cases for the agent feature; one load test.", doneWhen: "CI blocks a deliberately broken PR." },
      { days: "27–28", focus: "Operations", doThis: "Structured logs, one trace, one alert and one feature flag; rehearse a rollback.", doneWhen: "Feature off and rollback done in under five minutes." },
      { days: "29–30", focus: "Cost and review", doThis: "Read /usage, work out cost per task card, write a one-page census of the app.", doneWhen: "You can explain its architecture, risks and monthly cost to a colleague." },
    ],
  },
];

export default function ThirtyDayPathPage() {
  return (
    <>
      <PageHero
        eyebrow="Free · Guide"
        title="A 30-day AI learning plan for technical literacy."
        intro="An hour a day. One practice repo. Let the agent build; you direct it and review each PR."
        crumbs={[{ label: "Home", href: "/" }, { label: "Free resources", href: "/free" }, { label: "30-day path" }]}
      >
        <PrintButton />
        <Button href="/programmes/working-with-ai-agents" variant="secondary" size="lg" className="print:hidden">
          Learn it with a cohort
        </Button>
      </PageHero>

      <section className="py-12 md:py-16 print:py-4">
        <div className="container-site space-y-10">
          {WEEKS.map((w) => (
            <div key={w.week} className="print-keep">
              <h2 className="font-display text-2xl font-semibold text-ink">{w.week}</h2>
              <ul className="mt-4 grid gap-3">
                {w.rows.map((r) => (
                  <li key={r.days} className="card grid gap-3 p-5 md:grid-cols-12 md:gap-6 print:shadow-none">
                    <div className="md:col-span-3">
                      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">Days {r.days}</p>
                      <p className="mt-1 font-display text-lg font-semibold text-ink">{r.focus}</p>
                    </div>
                    <p className="text-sm text-ink-2 md:col-span-6">{r.doThis}</p>
                    <p className="text-sm text-ink md:col-span-3">
                      <span className="eyebrow block">Done when</span>
                      {r.doneWhen}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-[var(--radius-card)] bg-surface-2 p-6">
            <p className="eyebrow">After day 30</p>
            <p className="mt-2 text-ink-2">Each week, pick one concept from a real PR and ask the agent to teach it to you on your own code.</p>
          </div>
          <SourceNote>Source: The Agentic Studio Playbook, Chapter 41, Table 41.9</SourceNote>
        </div>
      </section>
    </>
  );
}
