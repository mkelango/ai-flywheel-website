"use client";

import { Suspense, useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, Clock, Search } from "lucide-react";
import clsx from "clsx";
import { LEVELS, STAGES } from "../sites";

type StageKey = (typeof STAGES)[number]["key"];
type LevelCode = (typeof LEVELS)[number]["code"];
export type VerifySite = "flywheel" | "schools" | "studio";

type DemoRecord = {
  holder: string; // adults only: a child's credential is never shown here
  level: LevelCode;
  stage: StageKey;
  programme: string;
  issued: string;
  expires: string;
  status: "Valid" | "Expired";
};

/**
 * Demo records only. The live registry will resolve Open Badges 3.0 credentials.
 * Every holder is an adult; children's progress is never public.
 */
const DEMO_RECORDS: Record<string, DemoRecord> = {
  "AFW-C3-DEMO": { holder: "Demo Learner", level: "C3", stage: "agentic", programme: "Agentic AI Engineer · gates G1–G6 signed", issued: "16 Aug 2027", expires: "16 Aug 2028", status: "Valid" },
  "AFS-C2-DEMO": { holder: "Demo Teacher", level: "C2", stage: "generative", programme: "Teacher Flywheel Practitioner", issued: "15 Apr 2027", expires: "15 Apr 2028", status: "Valid" },
  "AFW-C3-STUDIO": { holder: "Demo Builder", level: "C3", stage: "agentic", programme: "Earned by shipping in Agentic Studio", issued: "20 Aug 2027", expires: "20 Aug 2028", status: "Valid" },
  "AFW-C2-EXPIRED": { holder: "Demo Practitioner", level: "C2", stage: "generative", programme: "Generative AI Practitioner", issued: "1 Mar 2027", expires: "1 Mar 2028", status: "Expired" },
};

const SITE_DEMO: Record<VerifySite, string> = {
  flywheel: "AFW-C3-DEMO",
  schools: "AFS-C2-DEMO",
  studio: "AFW-C3-STUDIO",
};

// Literal class names so Tailwind picks them up. Stage colours are fixed across all three themes.
const STAGE_CLASS: Record<StageKey, { bar: string; ring: string }> = {
  foundation: { bar: "bg-foundation", ring: "border-foundation" },
  generative: { bar: "bg-generative", ring: "border-generative" },
  agentic: { bar: "bg-agentic", ring: "border-agentic" },
  physical: { bar: "bg-physical", ring: "border-physical" },
};

const ISSUER = "AI Flywheel · Inevitra Advisory";

type Result = { id: string; record: DemoRecord | null };

function lookup(raw: string): Result | null {
  const id = raw.trim().toUpperCase();
  if (!id) return null;
  return { id, record: DEMO_RECORDS[id] ?? null };
}

/**
 * Public credential lookup, shared by all three sites. Theme-neutral: semantic tokens only.
 * Reads `?id=` from the URL so a badge's verify link opens straight onto its record.
 */
export function VerifyLookup({ site = "flywheel", className }: { site?: VerifySite; className?: string }) {
  return (
    <Suspense fallback={<LookupCore site={site} initialId="" className={className} />}>
      <LookupFromParams site={site} className={className} />
    </Suspense>
  );
}

function LookupFromParams({ site, className }: { site: VerifySite; className?: string }) {
  const params = useSearchParams();
  return <LookupCore site={site} initialId={params.get("id") ?? ""} className={className} />;
}

function LookupCore({ site, initialId, className }: { site: VerifySite; initialId: string; className?: string }) {
  const demoId = SITE_DEMO[site];
  const inputId = useId();
  const hintId = useId();
  const [id, setId] = useState(initialId);
  const [result, setResult] = useState<Result | null>(() => lookup(initialId));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setResult(lookup(id));
  };

  return (
    <div className={clsx("min-w-0", className)}>
      <p className="mb-4 inline-flex max-w-full rounded-pill border border-line bg-surface-2 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-ink-2">
        Demo with sample dates — the live registry opens with the first awards
      </p>

      <form onSubmit={submit} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-end md:p-6">
        <div className="min-w-0 flex-1">
          <label htmlFor={inputId} className="eyebrow mb-2 block">
            Credential ID
          </label>
          <input
            id={inputId}
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setResult(null);
            }}
            placeholder={`e.g. ${demoId}`}
            aria-describedby={hintId}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="h-12 w-full min-w-0 rounded-xl border border-line bg-bg px-4 font-mono text-ink placeholder:text-muted focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
          <p id={hintId} className="mt-2 text-xs text-muted">
            Printed on the certificate or badge. Try{" "}
            <button type="button" onClick={() => { setId(demoId); setResult(lookup(demoId)); }} className="inline-flex min-h-6 items-center font-mono text-ink underline underline-offset-2 hover:text-primary">
              {demoId}
            </button>
            .
          </p>
        </div>
        <button type="submit" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-pill bg-primary px-6 font-medium text-on-primary hover:bg-primary-hover sm:mb-6">
          <Search className="size-4" aria-hidden /> Verify
        </button>
      </form>

      <div className="mt-6" aria-live="polite" aria-atomic="true">
        {result?.record && <BadgeResult id={result.id} r={result.record} />}
        {result && !result.record && (
          <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-ink-2">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
            <p>
              <span className="font-semibold text-ink">Not found.</span> No credential matches <span className="break-all font-mono text-ink">{result.id}</span>. In this demo,
              only the sample IDs return a record.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BadgeResult({ id, r }: { id: string; r: DemoRecord }) {
  const stage = STAGES.find((s) => s.key === r.stage)!;
  const level = LEVELS.find((l) => l.code === r.level)!;
  const c = STAGE_CLASS[r.stage];
  const valid = r.status === "Valid";

  return (
    <article className="card overflow-hidden" aria-label={`Credential ${id}: ${r.status}`}>
      <div className={clsx("h-1.5", c.bar)} />
      <div className="p-5 md:p-6">
        <p className={clsx("mb-4 inline-flex items-center gap-2 rounded-pill px-3 py-1 text-sm font-semibold", valid ? "bg-physical/15 text-ink" : "bg-surface-2 text-ink")}>
          {valid ? <CircleCheck className="size-4 text-physical" aria-hidden /> : <Clock className="size-4 text-ember" aria-hidden />}
          {r.status} · demo record
        </p>
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className={clsx("grid size-20 shrink-0 place-items-center rounded-full border-4", c.ring)} aria-hidden>
            <div className="text-center">
              <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted">{stage.name}</span>
              <span className="block font-display text-2xl font-semibold text-ink">{r.level}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Open Badges 3.0</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">
              {level.name} ({r.level}) · {stage.name}
            </p>
            <p className="text-sm text-ink-2">{r.programme}</p>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-muted">Holder</dt>
              <dd className="text-ink">{r.holder}</dd>
              <dt className="text-muted">Issued</dt>
              <dd className="text-ink">{r.issued}</dd>
              <dt className="text-muted">Expires</dt>
              <dd className="text-ink">
                {r.expires} <span className="text-muted">· recertify yearly</span>
              </dd>
              <dt className="text-muted">Issuer</dt>
              <dd className="text-ink">{ISSUER}</dd>
              <dt className="text-muted">ID</dt>
              <dd className="break-all font-mono text-ink">{id}</dd>
            </dl>
          </div>
        </div>
        <p className="mt-5 border-t border-line pt-4 text-xs text-muted">
          <span className="font-semibold text-ink-2">How verification works:</span> the registry checks the Open Badges 3.0 record signed by the issuer, its expiry date and
          whether it has been revoked. Only the holder&rsquo;s name, level and dates are public.
        </p>
      </div>
    </article>
  );
}
