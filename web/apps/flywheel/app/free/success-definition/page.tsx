import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { PrintButton } from "@/components/extras/PrintButton";
import { SourceNote } from "@/components/extras/SourceNote";

export const metadata: Metadata = pageMeta("/free/success-definition");

/** The AI Flywheel, Figure 9.4. */
const FIELDS = [
  { label: "The opportunity", hint: "One workflow, chosen by the matrix" },
  { label: "The metric(s)", hint: "What you will count" },
  { label: "The baseline", hint: "Measured today, not guessed" },
  { label: "The target", hint: "The number you must hit" },
  { label: "The timeframe", hint: "The deadline" },
  { label: "How measured", hint: "Exactly how, and by whom" },
  { label: "What it's worth", hint: "The value of hitting it" },
  { label: "Who owns it", hint: "One named human" },
];

export default function SuccessDefinitionPage() {
  return (
    <>
      <PageHero
        eyebrow="Free · Template"
        title="An AI project success metrics template."
        intro="Write success as a number: fill in every line before any build. If you cannot, you are not ready yet."
        crumbs={[{ label: "Home", href: "/" }, { label: "Free resources", href: "/free" }, { label: "Success-Definition One-Pager" }]}
      >
        <PrintButton />
        <Button href="/framework/drive" variant="secondary" size="lg" className="print:hidden">
          See where it sits in DRIVE
        </Button>
      </PageHero>

      <section className="py-12 md:py-16 print:py-4">
        <div className="container-site max-w-3xl">
          <div className="card overflow-hidden print:shadow-none" role="group" aria-label="Success-Definition One-Pager">
            <div className="border-b border-line px-5 py-4">
              <p className="eyebrow">Success-Definition One-Pager</p>
            </div>
            <ol className="divide-y divide-line">
              {FIELDS.map((f, i) => (
                <li key={f.label} className="grid gap-2 px-5 py-4 sm:grid-cols-12 sm:gap-4 print-keep">
                  <label htmlFor={`sd-${i}`} className="sm:col-span-4">
                    <span className="block font-display text-lg font-semibold text-ink">{f.label}</span>
                    <span className="block text-sm text-muted">{f.hint}</span>
                  </label>
                  <textarea
                    id={`sd-${i}`}
                    rows={2}
                    className="w-full resize-y rounded-md border border-ink/50 bg-bg px-3 py-2 text-ink focus:border-ink sm:col-span-8 print:border-0 print:border-b print:rounded-none"
                  />
                </li>
              ))}
            </ol>
            <div className="border-t border-line bg-surface-2 px-5 py-4">
              <p className="eyebrow">The test</p>
              <p className="mt-1 text-ink-2">Could a stranger read this and know, on the deadline, whether you succeeded, without asking you? If not, it isn't specific enough yet.</p>
            </div>
          </div>
          <SourceNote>Source: The AI Flywheel, Chapter 9, Figure 9.4</SourceNote>
        </div>
      </section>
    </>
  );
}
