import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { LevelPill, PageHero } from "@/components/ui";
import { CardGrid, CtaBand, StepList } from "@/components/orgs/blocks";
import { LABS } from "@/lib/orgs";
import { FloatEyebrow, HeroPhoto, LAB_PHOTO } from "@/components/photos";
import { getProgramme } from "@/lib/programmes";

export const metadata: Metadata = pageMeta("/students");

export default function StudentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For students · 18 to 22"
        title="AI for college students: start free, build a portfolio, choose a track."
        intro="Show recruiters what you shipped, not just a certificate."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Students" }]}
        aside={
          <HeroPhoto
            photo="studentsCafe"
            alt="Three college students laughing while they work on laptops together at a wooden table"
            card={
              <>
                <FloatEyebrow>Step 1 · free</FloatEyebrow>
                <LevelPill level="C1" className="mt-2" />
                <p className="mt-2 text-xs text-ink-2">About 6 hours · English or Tamil · no card</p>
              </>
            }
          />
        }
      >
        <Button href="/programmes/foundation" size="lg">
          Start free (C1)
        </Button>
        <Button href="/check" variant="secondary" size="lg">
          Take the Flywheel Check
        </Button>
      </PageHero>

      <Section id="path" eyebrow="Your path" title="Three steps. The first one is free.">
        <StepList
          cols={3}
          steps={[
            { t: "Start free", d: "Foundation (C1): about 6 hours, English or Tamil, no card.", href: "/programmes/foundation" },
            { t: "Build a portfolio", d: "Every turn leaves an artefact you can link to." },
            { t: "Choose a track", d: "Go deep in one stage and reach Builder (C3)." },
          ]}
        />
      </Section>

      <Section id="tracks" eyebrow="Pick a track" title="Which kind of AI do you want to build?" className="border-t border-line">
        <CardGrid
          cols={4}
          items={LABS.map((l) => {
            const p = getProgramme(l.programme);
            return { t: p?.title ?? l.reach, d: l.builds[0], href: `/programmes/${l.programme}`, color: l.color, kicker: l.reach, photo: LAB_PHOTO[l.slug] };
          })}
        />
      </Section>

      <Section id="more" eyebrow="On campus" title="Do it with your friends." className="border-t border-line">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-ink">Student price</h3>
              <StatusTag status="Proposed" />
            </div>
            <p className="mt-2 text-sm text-muted">Lower prices and scholarships on paid programmes. All prices exclude GST.</p>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-xl font-semibold text-ink">Campus chapter</h3>
            <p className="mt-2 text-sm text-muted">Start a chapter and build together. Ask your faculty or write to us.</p>
          </div>
          <Link href="/challenges" className="card card-hover p-6">
            <h3 className="font-display text-xl font-semibold text-ink">Challenges →</h3>
            <p className="mt-2 text-sm text-muted">Inter-college rounds, finals at the Inevitable Summit in February.</p>
          </Link>
        </div>
      </Section>


      <QuickAnswers {...ANSWERS["/students"]} />

      <CtaBand title="Six hours to Aware. Free." href="/programmes/foundation" label="Start free" secondary={{ href: "/contact?tag=higher-ed", label: "Start a campus chapter" }} />
    </>
  );
}
