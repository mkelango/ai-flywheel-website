import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { DemoBand, IconTile, PageHero, SectionHead } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { STAGE_META } from "@/lib/data";
import { INCLUDED, SAMPLE_REPORT } from "@/lib/offer";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/partnership");

const TINTS = ["#FFE39A", "#DCEBFB", "#D3EEEC", "#FDEBC8", "#FBDDEA", "#E3E6F6"];

export default function PartnershipPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Partnership" }]}
        eyebrow="School Flywheel Partnership"
        title="The School Flywheel Partnership: everything, in one."
        intro="The School Flywheel Partnership is one annual partnership for Classes 1–12, priced per student a year."
        actions={
          <>
            <Button href="/pricing">
              See pricing per student <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href="/pilot" variant="secondary">
              Start with a pilot
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="team"
            alt="Four colleagues smiling at a laptop screen together"
            chip="Classes 1–12"
            card={
              <>
                <FloatEyebrow>One annual partnership</FloatEyebrow>
                <p className="mt-1.5 font-display text-xl font-semibold leading-snug text-ink">Priced per student, a year.</p>
              </>
            }
          />
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <h2 className="sr-only">What the partnership includes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((t, i) => (
              <IconTile key={t.title} icon={t.icon} title={t.title} line={t.line} tint={TINTS[i]} delay={i * 0.05} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="The termly report" title="Progress you can show your board and parents." line="By class band, level (C1–C3) and stage. Never a ranking of children." className="!mb-0" />
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-line p-5">
              <p className="font-display font-semibold text-ink">Term 2 report</p>
              <StatusTag status="Illustrative scenario" />
            </div>
            <div className="divide-y divide-line">
              {SAMPLE_REPORT.map((r) => (
                <div key={r.band} className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-semibold text-ink">{r.band}</p>
                    <p className="text-sm text-muted">Students at level: {r.level}</p>
                  </div>
                  <ul className="flex flex-wrap gap-3" aria-label={`Stage progress for ${r.band}`}>
                    {STAGE_META.map((s, i) => (
                      <li key={s.key} className="flex items-center gap-1.5 text-xs text-ink-2">
                        <span className="w-9">{s.verb}</span>
                        <span className="flex gap-0.5" aria-label={`${r.stages[i]} of 3`}>
                          {[0, 1, 2].map((n) => (
                            <span key={n} className="h-2.5 w-3 rounded-sm" style={{ background: n < r.stages[i] ? s.color : "var(--line)" }} />
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/partnership"]} />
      <RelatedLinks
        links={[
          { href: "/pricing", label: "AI curriculum price per student" },
          { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
          { href: "/events", label: "Flywheel Day and the inter-school AI challenge" },
          { href: "/lab", label: "AI lab for schools in Tamil Nadu" },
        ]}
      />
      <DemoBand title="See what a partnership looks like for your school." line="We bring the curriculum map, a sample kit and a price estimate." />
    </>
  );
}
