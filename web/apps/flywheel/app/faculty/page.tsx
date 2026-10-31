import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { LevelPill, PageHero } from "@/components/ui";
import { CardGrid, CtaBand, StepList } from "@/components/orgs/blocks";
import { FACULTY_LEVELS } from "@/lib/orgs";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/faculty");

export default function FacultyPage() {
  return (
    <>
      <PageHero
        eyebrow="Faculty Flywheel · FDP"
        title="An AI faculty development programme: build, then teach."
        intro="Development to Aware, Practitioner and Builder. The capstone is a unit you already teach, redesigned."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Faculty" }]}
        aside={
          <HeroPhoto
            photo="boardroom"
            alt="An instructor presenting to colleagues at laptops, the build-then-teach format of an AI faculty development programme"
            card={
              <>
                <FloatEyebrow>Three levels</FloatEyebrow>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <LevelPill level="C1" />
                  <LevelPill level="C2" />
                  <LevelPill level="C3" />
                </div>
              </>
            }
          />
        }
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          Ask for the next faculty batch
        </Button>
      </PageHero>

      <Section id="levels" eyebrow="Three levels" title="From aware to builder.">
        <ol className="grid gap-4 md:grid-cols-3">
          {FACULTY_LEVELS.map((l) => (
            <li key={l.level} className="card p-6">
              <LevelPill level={l.level} />
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{l.t}</h3>
              <p className="mt-2 text-sm text-muted">{l.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="path" eyebrow="After Builder" title="A path to Knowledge Partner." className="border-t border-line">
        <StepList
          steps={[
            { t: "Redesign a unit", d: "Your capstone, with gate records and an oral defence." },
            { t: "Teach a credit course", d: "Builders can teach the course in their stage.", href: "/credit-courses" },
            { t: "Reach Leader (C4)", d: "Plus train-the-trainer." },
            { t: "Become a Knowledge Partner", d: "Co-teach cohorts and contribute to the kits.", href: "/partners/knowledge" },
          ]}
        />
      </Section>

      <Section id="batch" eyebrow="Next faculty batch" title="Scheduled with your academic calendar." className="border-t border-line">
        <CardGrid
          items={[
            { t: "On campus", d: "A batch for one department, inside a partnership or pilot.", href: "/campus-partnership" },
            { t: "Open batch", d: "Faculty from several colleges together. Dates on request.", href: "/contact?tag=higher-ed" },
          ]}
          cols={2}
        />
      </Section>


      <QuickAnswers {...ANSWERS["/faculty"]} />

      <CtaBand title="Start with one department's faculty." href="/contact?tag=higher-ed" label="Book a campus consultation" />
    </>
  );
}
