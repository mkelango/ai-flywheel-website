import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { PageHero, StageTag } from "@/components/ui";
import { CtaBand } from "@/components/orgs/blocks";
import { CASE_STUDIES } from "@/lib/orgs";

export const metadata: Metadata = pageMeta("/case-studies");

const LABELS = [
  { s: "Real" as const, d: "A live system, with the client's written permission." },
  { s: "Pilot" as const, d: "A bounded trial, results not yet final." },
  { s: "Illustrative scenario" as const, d: "How a turn could run. Not a client." },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="AI implementation case studies we can prove."
        intro="Every story carries a label. At launch, only illustrative scenarios."
        crumbs={[{ label: "Home", href: "/" }, { label: "Case studies" }]}
      >
        <Button href="/business/check" size="lg">
          Book a Flywheel Check
        </Button>
      </PageHero>

      <Section id="labels" eyebrow="Three labels" title="Read the label first.">
        <dl className="grid gap-4 sm:grid-cols-3">
          {LABELS.map((l) => (
            <div key={l.s} className="border-t-2 border-ink pt-5">
              <dt>
                <StatusTag status={l.s} />
              </dt>
              <dd className="mt-3 text-sm text-muted">{l.d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="stories" eyebrow="Scenarios" title="How a first turn could run." className="border-t border-line">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <li key={c.title} className="card flex flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">{c.sector}</span>
                <StatusTag status={c.status} />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.text}</p>
              <StageTag stage={c.stage} className="mt-auto pt-5" />
            </li>
          ))}
        </ul>
      </Section>


      <QuickAnswers {...ANSWERS["/case-studies"]} />

      <CtaBand title="Be the first real case study." line="Published only with your written permission." href="/contact?tag=business" label="Talk to us" />
    </>
  );
}
