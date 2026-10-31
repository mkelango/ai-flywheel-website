import type { Metadata } from "next";
import { ArrowRight, Check, Sparkles, Search, Award, Image as ImageIcon } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { ClassJourney } from "@/components/ClassJourney";
import { LabArt, Blob } from "@/components/art";
import { DemoBand, IconTile, KidsBanner, SafetyPromise, SectionHead, StageBadge } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto, SectionPhoto } from "@/components/photos";
import { LAB_TIERS, PARTNERSHIP, PROMISES, STAGE_META } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers, RelatedLinks } from "@/components/seo";

export const metadata: Metadata = pageMeta("/");

const PROMISE_ICON = [Sparkles, Search, Award];
const PROMISE_TINT = ["var(--highlight)", "color-mix(in oklab, var(--primary) 18%, white)", "color-mix(in oklab, var(--kids) 16%, white)"];
const TILE_TINTS = ["#FFE39A", "#DCEBFB", "#D3EEEC", "#FDEBC8", "#FBDDEA", "#E3E6F6"];

export default function Home() {
  return (
    <>
      {/* 01 Hero */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow mb-4">CBSE · ICSE · State Board · Classes 1–12</p>
            <h1 className="font-display text-[2.4rem] font-semibold leading-[1.06] text-ink md:text-[3.6rem]">
              An AI curriculum for schools to be <span className="relative whitespace-nowrap">proud of<svg viewBox="0 0 200 14" className="absolute -bottom-2 left-0 w-full" aria-hidden><path d="M3 9c40-7 90-8 194-2" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" fill="none" /></svg></span>, and for parents to trust.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-2 md:text-xl">
              A class-by-class AI curriculum for schools, Classes 1–12, with trained teachers and a hands-on lab. Children learn to make things with AI, and to question it. In Tamil and English.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" size="lg">
                Book a school demo <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/programmes" variant="secondary" size="lg">
                See the curriculum
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-ink-2">
              {["No AI accounts for Classes 3–5", "No tracking", "Data stays in India"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 text-physical" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <HeroPhoto
            photo="classroom"
            alt="Bright, empty school classroom with rows of desks and a chalkboard"
            chip="Tamil and English"
            card={
              <>
                <FloatEyebrow>Four programmes, one wheel</FloatEyebrow>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {STAGE_META.map((s) => (
                    <StageBadge key={s.key} stage={s.key} />
                  ))}
                </div>
              </>
            }
          />
        </Container>
      </section>

      {/* 02 Three promises */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {PROMISES.map((p, i) => {
              const I = PROMISE_ICON[i];
              return (
                <Reveal key={p.title} delay={i * 0.08} className="card h-full p-7">
                  <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl text-ink" style={{ background: PROMISE_TINT[i] }}>
                    <I className="size-6" aria-hidden />
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-ink">{p.title}</h2>
                  <p className="mt-2 text-ink-2">{p.line}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 03 Class by class */}
      <section id="journey" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Class by class" title="The right step for every age." line="Four programmes, one wheel: Know · Make · Do · Move." />
          <ClassJourney />
        </Container>
      </section>

      {/* 04 Partnership */}
      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead eyebrow="School Flywheel Partnership" title="Everything your school needs, in one partnership." className="!mb-0" />
            <SmartLink href="/pricing" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              Pricing per student <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERSHIP.map((t, i) => (
              <IconTile key={t.title} icon={t.icon} title={t.title} line={t.line} tint={TILE_TINTS[i]} delay={i * 0.05} />
            ))}
          </div>
        </Container>
      </section>

      {/* 05 Teachers */}
      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <SectionPhoto
            photo="workshop"
            alt="Hands gesturing over a laptop during a workshop"
            frameClassName="aspect-[4/3]"
            card={
              <>
                <FloatEyebrow>Teacher Flywheel levels</FloatEyebrow>
                <ol className="mt-3 space-y-1.5">
                  {[
                    ["C1", "Aware"],
                    ["C2", "Practitioner"],
                    ["C3", "Builder"],
                  ].map(([c, n]) => (
                    <li key={c} className="flex items-center gap-3 rounded-xl bg-surface-2/70 px-3 py-2">
                      <span className="font-mono text-xs text-muted">{c}</span>
                      <span className="font-display font-semibold text-ink">{n}</span>
                    </li>
                  ))}
                </ol>
              </>
            }
          />
          <div>
            <SectionHead eyebrow="Teachers" title="Your teachers lead. We train and back them." className="!mb-6" />
            <blockquote className="border-l-4 border-accent pl-5 font-display text-xl text-ink">“No teacher needs to be an AI expert on day one.”</blockquote>
            <p className="mt-6 text-muted">Workshops each term, and a community.</p>
            <Button href="/teachers" variant="secondary" className="mt-6">
              Teacher Flywheel <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </section>

      {/* 06 Spark Lab */}
      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead eyebrow="Spark Lab" title="A lab that grows with your school." line="Starter, Standard and Advanced, from about ₹1 lakh. Ed 1.1 bands; quoted per school." className="!mb-8" />
            <div className="grid gap-3 sm:grid-cols-3">
              {LAB_TIERS.map((t) => (
                <SmartLink key={t.key} href="/lab" className="card card-hover p-5">
                  <span className="block font-display text-lg font-semibold text-ink">{t.name}</span>
                  <span className="mt-1 block text-ink-2">{t.price}</span>
                  <span className="mt-1 block text-sm text-muted">{t.classes}</span>
                </SmartLink>
              ))}
            </div>
          </div>
          <LabArt className="mx-auto w-full max-w-md" />
        </Container>
      </section>

      {/* 07 Safety promise */}
      <SafetyPromise />

      {/* 08 Kids */}
      <KidsBanner />

      {/* 09 School stories */}
      <section id="stories" className="scroll-mt-24 overflow-hidden py-16 md:py-20">
        <Container>
          <SectionHead eyebrow="School stories" title="Real stories only." />
          <div className="relative grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex aspect-[4/3] flex-col items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-line bg-surface/60 p-6 text-center">
                <ImageIcon className="size-7 text-muted" aria-hidden />
                <p className="mt-3 text-sm text-muted">{i === 0 ? "First stories after pilots — with permission." : "Hands and work, never faces."}</p>
              </div>
            ))}
            <Blob className="pointer-events-none absolute -right-10 -top-10 -z-10 w-48 opacity-60" />
          </div>
        </Container>
      </section>

      {/* 10 Parents strip */}
      <section className="py-8">
        <Container>
          <SmartLink href="/parents" className="card card-hover flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="eyebrow block">For parents</span>
              <span className="mt-1 block font-display text-2xl font-semibold text-ink">What your child will learn, class by class.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
              Read the parents’ guide <ArrowRight className="size-4" aria-hidden />
            </span>
          </SmartLink>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/"]} />
      <RelatedLinks
        title="Explore"
        links={[
          { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
          { href: "/programmes/boards", label: "CBSE AI curriculum, Class 3 to 8" },
          { href: "/lab", label: "AI lab for schools in Tamil Nadu" },
          { href: "/teachers", label: "AI training for teachers" },
          { href: "/ta", label: "Read in Tamil (தமிழ்)" },
        ]}
      />

      {/* 11 Demo */}
      <DemoBand />
    </>
  );
}
