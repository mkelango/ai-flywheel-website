import type { Metadata } from "next";
import { ArrowRight, BookOpen, CalendarDays, Users, Handshake, ClipboardList, Languages } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { PROGRAMMES } from "@/lib/data";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/teachers");

const LEVELS = [
  { code: "C1", name: "Aware", line: "Self-paced, in Tamil or English.", proof: "Free for every teacher in a partner school.", tint: "#DCEBFB" },
  { code: "C2", name: "Practitioner", line: "Uses AI in lesson planning, safely.", proof: "A logged use, plus the same task done unaided.", tint: "#FFE39A" },
  { code: "C3", name: "Builder", line: "Redesigns one unit, teaches it, reviews it.", proof: "The unit, taught and reviewed with a mentor.", tint: "#D3EEEC" },
];

const WORKSHOPS = [
  { when: "April–May", what: "Teacher training window", note: "C1 and C2 cohorts before the June term" },
  { when: "June–July", what: "Term 1 kit walkthrough", note: "One session per class band" },
  { when: "October", what: "Mid-year clinic", note: "Bring a lesson; leave with a better one" },
  { when: "January", what: "Showcase and Builder reviews", note: "C3 units, reviewed by peers" },
];

export default function TeachersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Teachers" }]}
        eyebrow="Teacher Flywheel"
        title="AI training for teachers: your teachers lead, we back them."
        intro="Teacher Flywheel is AI training for teachers in three levels, Aware (C1) to Builder (C3), with C1 free in partner schools. No teacher needs to be an AI expert on day one."
        actions={
          <>
            <Button href="#levels">Start Teacher C1</Button>
            <Button href="#kits" variant="secondary">
              See lesson kits
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="trainingRoom"
            alt="Adults at a training session facing a presenter and screen, the workshop format of our AI training for teachers"
            chip="C1 free in partner schools"
            card={
              <>
                <FloatEyebrow>Three levels</FloatEyebrow>
                <ol className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">
                  {LEVELS.map((l, i) => (
                    <li key={l.code} className="flex items-center gap-1.5">
                      {i > 0 && <ArrowRight className="size-3.5 text-muted" aria-hidden />}
                      <span className="rounded-pill px-2.5 py-1 font-semibold text-ink" style={{ background: l.tint }}>
                        {l.code} {l.name}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            }
          />
        }
      />

      <section id="levels" className="scroll-mt-24 pb-16 md:pb-24">
        <Container>
          <SectionHead eyebrow="Three levels" title="Aware, Practitioner, Builder." line="The same level words learners use, from C1 to C3." />
          <SmartLink href="/teachers/flywheel" className="-mt-6 mb-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            How AI teacher certification works <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
          <ol className="grid gap-4 md:grid-cols-3">
            {LEVELS.map((l, i) => (
              <Reveal key={l.code} delay={i * 0.08} className="card h-full overflow-hidden">
                <div className="flex items-baseline justify-between p-6" style={{ background: l.tint }}>
                  <p className="font-display text-2xl font-semibold text-ink">{l.name}</p>
                  <p className="font-mono text-sm text-ink-2">{l.code}</p>
                </div>
                <div className="p-6">
                  <p className="text-lg text-ink">{l.line}</p>
                  <p className="mt-3 text-muted">{l.proof}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section id="kits" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Lesson kits and assessment guides" title="Open the kit. Teach the lesson." line="Every kit has slides, printables, a check without AI and a marking guide." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map((p) => (
              <SmartLink key={p.slug} href={`/programmes/${p.slug}#sample`} className="card card-hover p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl text-ink" style={{ background: p.tint }}>
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <span className="mt-4 block font-display text-lg font-semibold text-ink">{p.short} kit</span>
                <span className="block text-sm text-muted">{p.classes}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Sample lesson <ArrowRight className="size-4" aria-hidden />
                </span>
              </SmartLink>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
            <li className="inline-flex items-center gap-2">
              <ClipboardList className="size-4" aria-hidden /> Assessment guide per class band
            </li>
            <li className="inline-flex items-center gap-2">
              <Languages className="size-4" aria-hidden /> Tamil and English
            </li>
          </ul>
        </Container>
      </section>

      <section id="workshops" className="scroll-mt-24 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Workshops calendar" title="A workshop every term." line="On site or online. Dates are set with each school." />
          <ol className="relative space-y-3 border-l-2 border-dashed border-line pl-6">
            {WORKSHOPS.map((w) => (
              <li key={w.when} className="relative">
                <span className="absolute -left-[33px] top-5 size-4 rounded-full border-4 border-bg bg-accent" aria-hidden />
                <div className="card flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6">
                  <span className="flex shrink-0 items-center gap-2 font-mono text-sm text-muted sm:w-32">
                    <CalendarDays className="size-4" aria-hidden /> {w.when}
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-ink">{w.what}</span>
                    <span className="block text-muted">{w.note}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface-2/60 py-16 md:py-20">
        <Container className="grid gap-4 md:grid-cols-2">
          <div id="community" className="card scroll-mt-24 p-8">
            <Users className="size-7 text-ink" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Teacher community</h2>
            <p className="mt-2 text-muted">A free lesson of the month, peer reviews and a space to ask. Moderated, in Tamil and English.</p>
            <Button href={siteHref("studio", "/sign-in")} variant="secondary" className="mt-6">
              Teacher login
            </Button>
          </div>
          <div id="partner" className="scroll-mt-24 rounded-[var(--radius-card)] bg-inverse p-8 text-inverse-ink">
            <Handshake className="size-7" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-semibold">Become a Knowledge Partner</h2>
            <p className="mt-2 opacity-80">Teachers at Leader (C4), with train-the-trainer, can train others and co-write kits, through AI Flywheel.</p>
            <Button href={siteHref("flywheel", "/partners/knowledge")} variant="accent" className="mt-6">
              Find out more <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/teachers"]} eyebrow="Questions teachers ask" />
      <RelatedLinks
        links={[
          { href: "/teachers/kits", label: "AI lesson plans for teachers" },
          { href: "/teachers/workshops", label: "AI workshops for teachers" },
          { href: "/teachers/community", label: "AI teacher community" },
          { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
        ]}
      />
      <DemoBand title="Train your teachers before the June term." line="C1 is free for every teacher in a partner school." />
    </>
  );
}
