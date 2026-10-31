import type { Metadata } from "next";
import { ArrowRight, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { Container, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { Blob } from "@/components/art";
import { STORY_LABELS } from "@/lib/offer";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/stories");

export default function StoriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "School stories" }]}
        eyebrow="School stories"
        title="AI in schools: real stories only."
        intro="Our AI in schools stories come after the pilots, with permission. Until then, this page stays honest and empty."
      />

      <section className="overflow-hidden pb-16 md:pb-24">
        <Container>
          <div className="relative grid gap-4 sm:grid-cols-3">
            {["First stories after pilots, with permission.", "Hands and work, never faces.", "A new story each term."].map((t) => (
              <div key={t} className="flex aspect-[4/3] flex-col items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-line bg-surface/60 p-6 text-center">
                <ImageIcon className="size-7 text-muted" aria-hidden />
                <p className="mt-3 text-sm text-muted">{t}</p>
              </div>
            ))}
            <Blob className="pointer-events-none absolute -right-10 -top-10 -z-10 w-48 opacity-60" />
          </div>
        </Container>
      </section>

      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Our privacy rule" title="First name and class only." className="!mb-6" />
            <ul className="space-y-3 text-ink-2">
              {["Written consent from a parent before any photo or quote", "First name and class, never a surname", "Hands and work in photos, not faces"].map((t) => (
                <li key={t} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="Labels" title="Every story says what it is." className="!mb-6" />
            <dl className="space-y-3">
              {STORY_LABELS.map((l) => (
                <div key={l.status} className="card flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-4">
                  <dt className="shrink-0 sm:w-44">
                    <StatusTag status={l.status} />
                  </dt>
                  <dd className="text-ink-2">{l.line}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SmartLink href="/contact" className="card card-hover flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="eyebrow block">Partner schools</span>
              <span className="mt-1 block font-display text-2xl font-semibold text-ink">Have a story to share?</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
              Tell us <ArrowRight className="size-4" aria-hidden />
            </span>
          </SmartLink>
        </Container>
      </section>

      <DemoBand title="Be one of the first stories." line="Pilot one grade band next term." />
    </>
  );
}
