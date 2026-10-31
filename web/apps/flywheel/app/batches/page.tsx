import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { BatchCalendar } from "@/components/learn/BatchCalendar";

export const metadata: Metadata = pageMeta("/batches");

export default function BatchesPage() {
  return (
    <>
      <PageHero
        eyebrow="Batch calendar"
        title="AI course batch dates."
        intro="AI course batch dates for each programme, by month. Cohorts run evenings (IST) and Saturdays."
        crumbs={[{ label: "Home", href: "/" }, { label: "Batches" }]}
        updated
      />
      <Section>
        <BatchCalendar />
        <p className="mt-8 text-xs text-muted">Dates are first batches from catalogue v1 and may move before launch. FY28 runs April 2027 to March 2028.</p>
      </Section>

      <QuickAnswers {...ANSWERS["/batches"]} />
    </>
  );
}
