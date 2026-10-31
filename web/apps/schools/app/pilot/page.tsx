import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button, Container } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { Timeline } from "@/components/offer/Timeline";
import { PROGRAMMES } from "@/lib/data";
import { PILOT_GETS, PILOT_STEPS } from "@/lib/offer";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/pilot");

export default function PilotPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Pilot" }]}
        eyebrow="Pilot one grade band"
        title="An AI pilot programme for schools: one term, one band."
        intro="Our AI pilot programme for schools is the easiest way to start: one class band, one term, one teacher trained to Aware (C1). See what your children make, then decide."
        actions={
          <>
            <Button href="/demo">Book a school demo</Button>
            <Button href="/pricing" variant="secondary">
              Pricing per student
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="meeting"
            alt="Adults taking notes in a meeting around a long wooden table"
            chip="One term"
            card={
              <>
                <FloatEyebrow>Choose one band</FloatEyebrow>
                <ul className="mt-2.5 grid gap-1.5">
                  {PROGRAMMES.map((p) => (
                    <li key={p.slug} className="flex items-center justify-between gap-3 rounded-xl px-3 py-1.5 text-sm" style={{ background: p.tint }}>
                      <span className="font-semibold text-ink">{p.short}</span>
                      <span className="text-ink-2">{p.classes}</span>
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <SectionHead eyebrow="What you get" title="Everything you need for one term." />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PILOT_GETS.map((g, i) => (
              <Reveal key={g} delay={i * 0.04} className="card flex h-full gap-3 p-5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-highlight text-ink" aria-hidden>
                  <Check className="size-4" />
                </span>
                <span className="text-ink-2">{g}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="How it runs" title="Simple for your timetable." line="Safety rules are the same as the full programme: no AI accounts for Classes 3–5." />
          <Timeline items={PILOT_STEPS.map((s) => ({ when: s.when, title: s.what }))} />
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/pilot"]} />
      <RelatedLinks
        links={[
          { href: "/check", label: "School AI readiness check" },
          { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
          { href: "/partnership", label: "School Flywheel Partnership" },
        ]}
      />
      <DemoBand title="Pilot one grade band next term." line="Start with a demo. We plan the pilot with you." />
    </>
  );
}
