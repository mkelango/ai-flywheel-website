import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { LevelPill, PageHero } from "@/components/ui";
import { CardGrid, CtaBand } from "@/components/orgs/blocks";
import { COURSE_KIT, CREDIT_COURSES } from "@/lib/orgs";
import { STAGE_META } from "@/lib/programmes";

export const metadata: Metadata = pageMeta("/credit-courses");

export default function CreditCoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Credit courses and minors"
        title="AI credit courses your board can adopt."
        intro="Mapped to Practitioner (C2) and Builder (C3). Syllabus, assessments and teaching kits included."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Credit courses" }]}
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          Request a syllabus
        </Button>
      </PageHero>

      <Section id="courses" eyebrow="The courses" title="One course per stage, plus foundations.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREDIT_COURSES.map((c) => {
            const s = STAGE_META[c.stage];
            return (
              <li key={c.title} className="card flex flex-col p-6">
                <span className="mb-4 block h-1 w-10 rounded-pill" style={{ background: s.color }} aria-hidden />
                <div className="flex flex-wrap items-center gap-2">
                  <LevelPill level={c.level} />
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">{s.short}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="kit" eyebrow="Included with every course" title="Ready to teach in your next semester." className="border-t border-line">
        <CardGrid items={COURSE_KIT} />
      </Section>


      <QuickAnswers {...ANSWERS["/credit-courses"]} />

      <CtaBand title="Faculty who reach Builder teach these courses." href="/faculty" label="See the Faculty Flywheel" secondary={{ href: "/campus-partnership", label: "Campus Partnership" }} />
    </>
  );
}
