import type { Metadata } from "next";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Button, Container } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, IconTile, PageHero, SectionHead } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { SchoolStepper } from "@/components/SchoolStepper";
import { PricingEstimator } from "@/components/PricingEstimator";
import { WheelMark } from "@flywheel/ui/components/WheelMark";
import { MARK, PARTNERSHIP } from "@/lib/data";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/for-schools");

const TINTS = ["#FFE39A", "#DCEBFB", "#D3EEEC", "#FDEBC8", "#FBDDEA", "#E3E6F6"];
const MARK_TINT = ["#DCEBFB", "#FFE39A", "#D3EEEC"];

export default function ForSchoolsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "For Schools" }]}
        eyebrow="For correspondents and principals"
        title="An AI programme for schools: start small, grow class by class."
        intro="Our AI programme for schools in India runs in six steps, from a 15-minute check to a School mark."
        actions={
          <>
            <Button href="/demo">Book a school demo</Button>
            <Button href="/check" variant="secondary">
              Take the School Flywheel Check
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="boardroom"
            alt="Instructor presenting to professionals at laptops around a boardroom table"
            chip="Six steps"
            card={
              <>
                <FloatEyebrow>Most schools begin with</FloatEyebrow>
                <p className="mt-1.5 font-display text-xl font-semibold leading-snug text-ink">One grade band, for one term.</p>
              </>
            }
          />
        }
      />

      <section id="journey" className="scroll-mt-24 pb-16 md:pb-24">
        <Container>
          <SchoolStepper />
        </Container>
      </section>

      <section id="partnership" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="School Flywheel Partnership" title="What a partnership includes." line="One annual partnership, priced per student." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERSHIP.map((t, i) => (
              <IconTile key={t.title} icon={t.icon} title={t.title} line={t.line} tint={TINTS[i]} delay={i * 0.05} />
            ))}
          </div>
        </Container>
      </section>

      <section id="pricing" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Pricing per student" title="Estimate your year." line="Pick your class bands and student numbers." />
          <PricingEstimator />
        </Container>
      </section>

      <section id="mark" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead eyebrow="AI Flywheel School mark · proposed criteria" title="A mark parents can check." line="Renewed every year. Shown on your website, linked back to us." className="!mb-0" />
            <WheelMark size={72} className="hidden md:block" title="AI Flywheel School mark" />
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {MARK.map((m, i) => (
              <Reveal key={m.level} delay={i * 0.08} className="card h-full overflow-hidden">
                <div className="flex items-center gap-3 p-6" style={{ background: MARK_TINT[i] }}>
                  <BadgeCheck className="size-7 text-ink" aria-hidden />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-2">Level {i + 1}</p>
                    <p className="font-display text-2xl font-semibold text-ink">{m.level}</p>
                  </div>
                </div>
                <ul className="space-y-2.5 p-6">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-ink-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
          <Button href="/lab" variant="secondary" className="mt-8">
            Spark Lab tiers <ArrowRight className="size-4" aria-hidden />
          </Button>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/for-schools"]} eyebrow="Questions principals ask" />
      <RelatedLinks
        links={[
          { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
          { href: "/pilot", label: "AI pilot programme for schools" },
          { href: "/pricing", label: "AI curriculum price per student" },
          { href: "/teachers", label: "AI training for teachers" },
        ]}
      />
      <DemoBand title="Pilot one grade band next term." line="One term, one band, one teacher trained to Aware (C1)." />
    </>
  );
}
