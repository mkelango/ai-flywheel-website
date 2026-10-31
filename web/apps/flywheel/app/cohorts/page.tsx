import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PROGRAMMES } from "@/lib/programmes";
import { PageHero, StatStrip } from "@/components/ui";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { GateStrip } from "@/components/learn/GateStrip";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/cohorts");

const cohorts = PROGRAMMES.filter((p) => p.format === "Cohort");

export default function CohortsPage() {
  return (
    <>
      <PageHero
        eyebrow="Cohorts"
        title="A cohort-based AI course: twelve weeks, one real turn."
        intro="A mixed-role team of four to six ships one real use case, gate by gate. Evenings (IST) and Saturdays."
        crumbs={[{ label: "Home", href: "/" }, { label: "Cohorts" }]}
        aside={
          <HeroPhoto
            photo="teamLaptop"
            alt="A mixed team of four smiling at a laptop together, the team size of a cohort-based AI course"
            card={
              <>
                <FloatEyebrow>Team of 4–6 · 12 weeks</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold text-ink">Gates G1 to G5</p>
                <p className="text-xs text-ink-2">G6 and the Builder award in week 16</p>
              </>
            }
          />
        }
        updated
      >
        <Button href="/batches">See next batches</Button>
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container-site">
          <StatStrip
            items={[
              { value: "4–6", label: "People per team" },
              { value: "~8 h", label: "A week: 1 taught, 1.5 coaching" },
              { value: "G1–G5", label: "Gates inside 12 weeks" },
              { value: "Week 16", label: "G6 and the Builder award" },
            ]}
          />
        </div>
      </section>

      <Section eyebrow="Week by week" title="Where the gates fall." intro="The rest of each week goes on your team's build." className="border-t border-line">
        <GateStrip />
      </Section>

      <Section eyebrow="Cohort programmes" title="Pick a stage." intro="Prices in rupees, excluding GST." className="border-t border-line">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cohorts.map((p) => (
            <ProgrammeCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      <QuickAnswers {...ANSWERS["/cohorts"]} />
    </>
  );
}
