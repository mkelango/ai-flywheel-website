import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import clsx from "clsx";
import { Button } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { PrintButton } from "@/components/extras/PrintButton";
import { SourceNote } from "@/components/extras/SourceNote";

export const metadata: Metadata = pageMeta("/free/sample-gate-log");

type Decision = "Pass" | "Pass with conditions" | "Pending";

/** Gates, questions, evidence and signers: Agentic Studio Playbook, Table 5.3. Decisions are a sample. */
const GATES: { g: string; name: string; after: string; question: string; evidence: string; signed: string; decision: Decision }[] = [
  { g: "G1", name: "Thesis approved", after: "Define", question: "Is this worth building, and safe to build?", evidence: "Strategy document, research brief, unit economics, risk tier", signed: "Studio lead, product lead", decision: "Pass" },
  { g: "G2", name: "Architecture approved", after: "Design", question: "Will this design meet the targets, risks and rules?", evidence: "TM, architecture pack, ADRs, threat model, data-protection assessment draft", signed: "Agent architect, security, governance lead", decision: "Pass with conditions" },
  { g: "G3", name: "Definition of ready", after: "Specify", question: "Can agents build this without guessing?", evidence: "Approved specs, linted draft contracts, acceptance tests, first cards ready, autonomy limits per agent", signed: "Product lead, core builder", decision: "Pass" },
  { g: "G4", name: "Experience sign-off", after: "Prototype", question: "Do users understand it and want it?", evidence: "Clickable prototype, screen inventory, user-test notes", signed: "Product lead, with users", decision: "Pass" },
  { g: "G5", name: "Quality gate", after: "Verify", question: "Does it work, safely, at load?", evidence: "Test, eval, security, load and accessibility reports", signed: "Eval lead, security lead", decision: "Pending" },
  { g: "G6", name: "Governance and go-live", after: "Release", question: "May it go live, and can we stop it?", evidence: "Release checklist, registry entries, rollback rehearsed, kill switch tested", signed: "Studio lead, governance lead", decision: "Pending" },
];

export default function SampleGateLogPage() {
  return (
    <>
      <PageHero
        eyebrow="Free · Sample"
        title="An AI project gate review log, G1 to G6."
        intro="A gate is a signed decision with linked evidence, not a meeting."
        crumbs={[{ label: "Home", href: "/" }, { label: "Free resources", href: "/free" }, { label: "Sample gate log" }]}
      >
        <PrintButton />
        <Button href="/glossary/adlc" variant="secondary" size="lg" className="print:hidden">
          What the ADLC is
        </Button>
      </PageHero>

      <section className="py-12 md:py-16 print:py-4">
        <div className="container-site">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted">Sample · not a real project</span>
            <span className="font-mono text-xs text-muted">docs/releases/gates.md</span>
          </div>
          <ol className="grid gap-3">
            {GATES.map((r) => (
              <li key={r.g} className="card grid gap-3 p-5 md:grid-cols-12 md:gap-6 print-keep print:shadow-none">
                <div className="flex items-start gap-3 md:col-span-3">
                  <span className={clsx("grid size-9 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold", r.decision === "Pending" ? "border border-line text-muted" : "bg-agentic text-ink")}>{r.g}</span>
                  <div>
                    <p className="font-display text-lg font-semibold leading-tight text-ink">{r.name}</p>
                    <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">After {r.after}</p>
                  </div>
                </div>
                <div className="text-sm md:col-span-5">
                  <p className="text-ink">{r.question}</p>
                  <p className="mt-1 text-muted">Evidence: {r.evidence}</p>
                </div>
                <div className="text-sm md:col-span-2">
                  <span className="eyebrow block">Signed by</span>
                  <span className="text-ink-2">{r.signed}</span>
                </div>
                <div className="text-sm md:col-span-2">
                  <span className="eyebrow block">Decision</span>
                  <span className={clsx("font-medium", r.decision === "Pending" ? "text-muted" : "text-ink")}>{r.decision}</span>
                  {r.decision === "Pass with conditions" && <span className="block text-xs text-muted">Each condition has an owner and a date</span>}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { t: "Three outcomes", d: "Pass, pass with conditions, or fail." },
              { t: "Agents assemble", d: "Agents build the evidence pack; a named human signs." },
              { t: "Separate signer", d: "The person who wrote it does not approve it alone." },
            ].map((x) => (
              <div key={x.t} className="rounded-[var(--radius-card)] bg-surface-2 p-5 print-keep">
                <p className="font-display text-lg font-semibold text-ink">{x.t}</p>
                <p className="mt-1 text-sm text-ink-2">{x.d}</p>
              </div>
            ))}
          </div>
          <SourceNote>Gates and evidence: The Agentic Studio Playbook, Chapter 5, Table 5.3. Decisions shown are a sample.</SourceNote>
        </div>
      </section>
    </>
  );
}
