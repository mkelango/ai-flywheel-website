import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { CtaBand, DataTable, Dot } from "@/components/orgs/blocks";
import { LABS } from "@/lib/orgs";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/campus-labs");

export default function CampusLabsPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus Labs"
        title="AI labs for engineering colleges, each running a studio."
        intro="Four labs, one per stage. Agentic opens Feb 2027; the others in FY28, with their studios. Set-up is quoted per campus."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Campus Labs" }]}
        aside={
          <HeroPhoto
            photo="robotics"
            alt="An engineer working on a laptop inside a robotics workcell, the kind of room an AI lab for engineering colleges becomes"
            card={
              <>
                <FloatEyebrow>Four labs</FloatEyebrow>
                <ul className="mt-2 space-y-1.5 text-xs text-ink-2">
                  {LABS.map((l) => (
                    <li key={l.slug} className="flex items-center justify-between gap-3">
                      <Dot color={l.color}>{l.name}</Dot>
                      <span className="font-mono text-[0.66rem] text-muted">{l.opens}</span>
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        }
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          Ask for a lab quote
        </Button>
      </PageHero>

      <Section id="compare" eyebrow="Four labs compared" title="Pick the lab that fits your departments.">
        <DataTable
          minWidth={760}
          head={["Lab", "Runs", "Opens", "Best for", "Students reach", "Built from"]}
          rows={LABS.map((l) => [
            <Link key={l.slug} href={`/campus-labs/${l.slug}`} className="hover:text-primary-hover">
              <Dot color={l.color}>{l.name} →</Dot>
            </Link>,
            l.runs,
            l.opens,
            l.best,
            <span key="r" className="font-medium text-ink">
              {l.reach} ({l.lifecycle})
            </span>,
            <span key="b" className="text-muted">
              {l.book}
            </span>,
          ])}
        />
      </Section>


      <QuickAnswers {...ANSWERS["/campus-labs"]} />

      <CtaBand title="Open one lab first." line="Most campuses start with the lab that matches their largest department." href="/contact?tag=higher-ed" label="Book a campus consultation" />
    </>
  );
}
