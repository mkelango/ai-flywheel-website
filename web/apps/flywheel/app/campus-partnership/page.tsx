import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { CtaBand, DataTable, StepList } from "@/components/orgs/blocks";
import { PARTNERSHIP_STEPS, TIER_ROWS, TIERS } from "@/lib/orgs";

export const metadata: Metadata = pageMeta("/campus-partnership");

export default function CampusPartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus Partnership"
        title="An AI campus partnership: one MoU for everything."
        intro="Courses, faculty, labs, challenges and reporting, renewed once a year."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Campus Partnership" }]}
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          Book a campus consultation
        </Button>
      </PageHero>

      <Section id="tiers" eyebrow="Three tiers" title="Start as an Associate. Grow into a Centre." intro="Tiers are proposed and fees are quoted per campus.">
        <div className="mb-4">
          <StatusTag status="Proposed" />
        </div>
        <DataTable
          minWidth={680}
          head={["", ...TIERS]}
          rows={TIER_ROWS.map((r) => [r.feature, ...r.values])}
        />
      </Section>

      <Section id="steps" eyebrow="How a partnership runs" title="Start with one department." className="border-t border-line">
        <StepList steps={PARTNERSHIP_STEPS} />
      </Section>


      <QuickAnswers {...ANSWERS["/campus-partnership"]} />

      <CtaBand title="Each partner gets a page in Partner campuses." line="Listed only with written permission." href="/contact?tag=higher-ed" label="Book a campus consultation" secondary={{ href: "/partners", label: "Partner campuses" }} />
    </>
  );
}
