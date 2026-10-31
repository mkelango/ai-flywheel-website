import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { Blob } from "@/components/art";
import { MarkBadge } from "@/components/offer/MarkBadge";
import { MARK } from "@/lib/data";
import { MARK_STEPS } from "@/lib/offer";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/mark");

const LEVELS = ["Aware", "Practitioner", "Builder"] as const;
const TINT = ["#DCEBFB", "#FFE39A", "#D3EEEC"];

export default function MarkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "School mark" }]}
        eyebrow="AI Flywheel School mark"
        title="AI school certification parents can check."
        intro="The AI Flywheel School mark is an AI school certification in three levels, earned with real work and renewed every year. Shown on your website, linked back to us."
        updated
        actions={
          <>
            <Button href="/demo">Book a school demo</Button>
            <Button href="/partnership" variant="secondary">
              The partnership
            </Button>
          </>
        }
        art={
          <div className="relative mx-auto w-full max-w-sm">
            <Blob className="absolute inset-0 -z-10 scale-110 opacity-70" />
            <MarkBadge level="Practitioner" className="float-b w-full drop-shadow-sm" />
          </div>
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <StatusTag status="Proposed" />
            <span className="text-sm text-muted">Criteria to be confirmed before the first marks are awarded.</span>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {MARK.map((m, i) => (
              <Reveal key={m.level} delay={i * 0.08} className="card h-full overflow-hidden">
                <div className="flex items-center gap-4 p-6" style={{ background: TINT[i] }}>
                  <MarkBadge level={LEVELS[i]} className="size-16 shrink-0" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-2">Level {i + 1}</p>
                    <h2 className="font-display text-2xl font-semibold text-ink">{m.level}</h2>
                  </div>
                </div>
                <ul className="space-y-2.5 p-6">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-ink-2">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="How it works" title="Earned each year, not bought once." />
          <ol className="grid gap-4 md:grid-cols-3">
            {MARK_STEPS.map((s, i) => (
              <li key={s.title} className="card flex gap-4 p-6">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-display font-semibold text-on-accent">{i + 1}</span>
                <span>
                  <span className="block font-display font-semibold text-ink">{s.title}</span>
                  <span className="mt-0.5 block text-muted">{s.line}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/mark"]} />
      <RelatedLinks
        links={[
          { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
          { href: "/verify", label: "Verify a school mark or teacher certificate" },
          { href: "/lab", label: "AI lab for schools in Tamil Nadu" },
        ]}
      />
      <DemoBand title="Start towards Aware this year." line="All teachers at C1, and one class band running." />
    </>
  );
}
