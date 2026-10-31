import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { LEVELS } from "@flywheel/ui/sites";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = pageMeta("/certifications/exams");

const STEPS = [
  { n: "01", title: "Build the artefact", text: "Real work: a logged use case, a gate log, an eval suite or a register row." },
  { n: "02", title: "Take one check without AI", text: "Proctored. You show the skill is yours, not the tool's." },
  { n: "03", title: "Get the badge", text: "Open Badges 3.0, with a public verify page." },
];

export default function ExamsPage() {
  return (
    <>
      <PageHero
        eyebrow="Exams and recertification"
        title="AI certification exams: one artefact, one check without AI."
        intro="Every level is assessed the same way: what you built, plus a proctored check you take on your own."
        crumbs={[{ label: "Home", href: "/" }, { label: "Certifications", href: "/certifications" }, { label: "Exams" }]}
        updated
      />

      <Section eyebrow="How assessment works" title="Three steps.">
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="card p-6">
              <span className="font-mono text-sm text-muted">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Evidence by level" title="What each check asks for." className="border-t border-line">
        <ol className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          {LEVELS.map((l) => (
            <li key={l.code} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4 md:p-5">
              <span className="font-mono text-sm">
                <span className="font-semibold text-primary-hover">{l.code}</span> <span className="text-ink">{l.name}</span>
              </span>
              <span className="text-ink">{l.evidence}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          The C1 proctored quiz is optional with the free course: ₹499 excl. GST <StatusTag status="Proposed" />
        </p>
      </Section>

      <Section eyebrow="Recertification" title="Every year." intro="Your level stays current with a yearly check. The verify page shows the date." className="border-t border-line">
        <div className="flex flex-wrap gap-3">
          <Button href="/certifications">See the ladder</Button>
          <Button href="/verify" variant="secondary">
            Verify a credential
          </Button>
        </div>
      </Section>
    </>
  );
}
