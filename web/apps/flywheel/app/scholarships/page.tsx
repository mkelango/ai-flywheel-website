import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Check } from "lucide-react";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = pageMeta("/scholarships");

const OFFERS = [
  { title: "Student scholarship", text: "A student price on one C3 cohort, for students and freshers.", proposed: true },
  { title: "Women in tech", text: "For women working in, or returning to, technical roles.", proposed: true },
  { title: "EMI", text: "Monthly instalments on any paid programme." },
  { title: "Employer letter", text: "A ready-made letter asking your employer to sponsor you, with a GST invoice." },
];

const ELIGIBILITY = [
  "You have finished the free AI Flywheel Foundation course (C1)",
  "Students: enrolled now, or graduated within the last year",
  "Women in tech: in, or returning to, a technical role",
  "A short note on the use case you want to build",
];

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Scholarships"
        title="AI course scholarships, EMI and help paying."
        intro="Scholarships, EMI and an employer letter. Scholarships are proposed and confirmed before launch."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }, { label: "Scholarships" }]}
        updated
      >
        <Button href="/contact?tag=professionals">Apply for a scholarship</Button>
      </PageHero>

      <Section eyebrow="What's offered" title="Four ways in.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((o) => (
            <li key={o.title} className="card p-6">
              <h3 className="font-display text-xl font-semibold text-ink">{o.title}</h3>
              <p className="mt-2 text-sm text-ink-2">{o.text}</p>
              {o.proposed && (
                <span className="mt-3 inline-block">
                  <StatusTag status="Proposed" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Eligibility" title="Who can apply." intro="Draft criteria, to be confirmed before launch." className="border-t border-line">
        <ul className="max-w-2xl space-y-3">
          {ELIGIBILITY.map((e) => (
            <li key={e} className="flex gap-3 text-ink">
              <Check className="mt-1 size-4 shrink-0 text-physical" aria-hidden /> {e}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact?tag=professionals">Apply</Button>
          <Button href="/pricing" variant="secondary">
            See pricing
          </Button>
        </div>
      </Section>

      <QuickAnswers {...ANSWERS["/scholarships"]} />
    </>
  );
}
