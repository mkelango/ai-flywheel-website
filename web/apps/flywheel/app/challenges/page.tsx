import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { CardGrid, CtaBand, StepList } from "@/components/orgs/blocks";
import { DRIVE_TURN } from "@/lib/orgs";

export const metadata: Metadata = pageMeta("/challenges");

export default function ChallengesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hackathons and challenges"
        title="An inter-college AI hackathon, run as one DRIVE turn."
        intro="Inter-college challenges on real problem statements, with finals at the Inevitable Summit."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Challenges" }]}
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          Enter your campus
        </Button>
      </PageHero>

      <Section id="turn" eyebrow="How a challenge runs" title="Diagnose to Expand, judged at each gate.">
        <StepList steps={DRIVE_TURN} cols={5} />
      </Section>

      <Section id="problems" eyebrow="Problem statements" title="Real problems, from the people who own them." className="border-t border-line">
        <CardGrid
          cols={2}
          items={[
            { t: "From industry", d: "Companies set a problem, share data under terms and judge the finals.", href: "/contact?tag=business", kicker: "Set a problem" },
            { t: "From government", d: "Departments bring a public service to improve, under CORE gates.", href: "/contact?tag=government", kicker: "Set a problem" },
          ]}
        />
      </Section>

      <CtaBand title="Host a campus round." line="Partner campuses run their own round; finalists go to the Summit." href="/contact?tag=higher-ed" label="Talk to us" secondary={{ href: "/students", label: "For students" }} />
    </>
  );
}
