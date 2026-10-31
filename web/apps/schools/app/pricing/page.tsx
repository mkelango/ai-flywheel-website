import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button, Container, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { PricingEstimator } from "@/components/PricingEstimator";
import { LAB_TIERS, PROGRAMMES, band } from "@/lib/data";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/pricing");

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        eyebrow="Pricing per student"
        title="AI curriculum price per student, per year."
        intro="One AI curriculum price per student a year, excl. GST, with kits, teacher training, the termly report and events included. Your school is quoted after a demo."
        updated
        actions={
          <>
            <Button href="#estimate">Estimate your year</Button>
            <Button href="/partnership" variant="secondary">
              What’s included
            </Button>
          </>
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <SmartLink href={`/programmes/${p.slug}`} className="card card-hover flex h-full flex-col overflow-hidden">
                  <span className="block p-6" style={{ background: p.tint }}>
                    <span className="block font-display text-xl font-semibold text-ink">{p.short}</span>
                    <span className="block text-ink-2">{p.classes}</span>
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="font-display text-2xl font-semibold text-ink">{band(p.price)}</span>
                    <span className="text-sm text-muted">per student a year</span>
                    <span className="mt-4 text-[0.95rem] text-ink-2">{p.time}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink">
                      See the programme <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </span>
                </SmartLink>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
            <StatusTag status="Ed 1.1" /> Price bands from Ed 1.1, excl. GST. An estimate, not a quote.
          </p>
        </Container>
      </section>

      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Spark Lab · one-time set-up" title="Add a lab when you’re ready." line="Optional. Each tier is quoted per school." />
          <div className="grid gap-4 md:grid-cols-3">
            {LAB_TIERS.map((t, i) => (
              <Reveal key={t.key} delay={i * 0.06} className="card h-full p-6">
                <p className="font-display text-xl font-semibold text-ink">{t.name}</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">{t.price}</p>
                <p className="text-sm text-muted">{t.classes}</p>
                <p className="mt-4 text-ink-2">{t.line}</p>
              </Reveal>
            ))}
          </div>
          <SmartLink href="/lab" className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            What’s in each lab <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </Container>
      </section>

      <section id="estimate" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Estimator" title="Estimate your year." line="Pick your class bands and student numbers. Nothing is sent." />
          <PricingEstimator />
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/pricing"]} />
      <RelatedLinks
        links={[
          { href: "/partnership", label: "School Flywheel Partnership" },
          { href: "/pilot", label: "AI pilot programme for schools" },
          { href: "/lab", label: "AI lab for schools in Tamil Nadu" },
        ]}
      />
      <DemoBand title="Get a quote for your school." line="After a 45-minute demo, on site or online." />
    </>
  );
}
