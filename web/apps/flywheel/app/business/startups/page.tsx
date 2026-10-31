import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { CardGrid, CtaBand, StepList } from "@/components/orgs/blocks";
import { STARTUP_OFFERS } from "@/lib/orgs";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/business/startups");

export default function StartupsPage() {
  return (
    <>
      <PageHero
        eyebrow="Startups and MSMEs"
        title="AI for startups and MSMEs: where should it go first?"
        intro="Sixty minutes with an adviser, built for Indian startups, MSMEs and family businesses. A 90-day plan to take away."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Startups and MSMEs" }]}
        aside={
          <HeroPhoto
            photo="coworking"
            alt="A startup team at work in a bright brick-walled coworking space, deciding where AI for startups and MSMEs should go first"
            card={
              <>
                <FloatEyebrow>Founder&apos;s Check</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold text-ink">60 minutes → 90-day plan</p>
                <p className="text-xs text-ink-2">One use case, owners and CORE gates</p>
              </>
            }
          />
        }
      >
        <Button href="/contact?tag=business" size="lg">
          Book a Founder&apos;s Check
        </Button>
      </PageHero>

      <Section id="offers" eyebrow="Three offers" title="Review, then build with peers or a lab.">
        <CardGrid items={STARTUP_OFFERS} />
      </Section>

      <Section id="how" eyebrow="How it runs" title="Check. Plan. Cohort or pilot." className="border-t border-line">
        <StepList
          cols={3}
          steps={[
            { t: "60-minute review", d: "Your business, data and the one use case worth doing first." },
            { t: "90-day plan", d: "Success as a number, owners and CORE gates." },
            { t: "Cohort or pilot", d: "Join a founder cohort, or pilot robotics with the Robotic Lab." },
          ]}
        />
      </Section>


      <QuickAnswers {...ANSWERS["/business/startups"]} />

      <CtaBand title="One hour. One use case. One plan." href="/contact?tag=business" label="Book a Founder's Check" secondary={{ href: "/business/enterprise", label: "For larger teams" }} />
    </>
  );
}
