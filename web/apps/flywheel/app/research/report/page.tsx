import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { REPORT } from "@/lib/research";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/research/CtaBand";

export const metadata: Metadata = pageMeta("/research/report");

export default function ReportPage() {
  return (
    <>
      <PageHero
        eyebrow="Research · annual report"
        title="State of AI Implementation in India"
        intro="Why AI spend does or does not turn into value, measured on the four leaks. The summary will always be free."
        crumbs={[{ label: "Home", href: "/" }, { label: "Research", href: "/insights" },{ label: "State of AI Implementation" }]}
        aside={
          <div className="card p-6">
            <p className="eyebrow">Status</p>
            <p className="mt-2 font-display text-2xl font-semibold text-ink">{REPORT.status}</p>
            <p className="mt-2 text-sm text-muted">No findings are published yet. We will not publish a number without its sample and date.</p>
          </div>
        }
      >
        <Button href="/contact?tag=business">Request the full report</Button>
      </PageHero>

      <Section eyebrow="Ungated summary · what we measure" title="Four leaks. Four questions." intro="From the Four-Leaks Diagnostic in The AI Flywheel, Chapter 1.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REPORT.questions.map((q, i) => (
            <li key={q.leak} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{q.leak}</h3>
              <p className="mt-1 text-sm text-muted">{q.q}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Method" title="How the first edition will work." className="border-t border-line">
        <ul className="grid gap-3 md:grid-cols-3">
          {REPORT.method.map((m) => (
            <li key={m} className="card p-5 text-sm text-ink-2">
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <StatusTag status="Proposed" /> Publication date to be announced.
        </p>
      </Section>

      <CtaBand eyebrow="Get it first" title="Request the full report." line="Tell us your organisation. We will send the first edition when it is out, and ask if you want to take part.">
        <Button href="/contact?tag=business">Request the report</Button>
        <Button href="/business" variant="secondary">
          For organisations
        </Button>
      </CtaBand>
    </>
  );
}
