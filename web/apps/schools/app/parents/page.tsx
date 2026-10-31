import type { Metadata } from "next";
import { ArrowRight, Check, MessagesSquare, ScanEye, BookCheck, Scissors, Monitor } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { AskSchool, KidsBanner, PageHero, SafetyPromise, SectionHead } from "@/components/blocks";
import { CardThumb, FloatEyebrow, HeroPhoto, type PhotoKey } from "@/components/photos";
import { PROGRAMMES } from "@/lib/data";
import { PARENT_GUIDES, type GuideSlug } from "@/components/extras/content";
import { QAList, RelatedLinks } from "@/components/seo";
import { JsonLd, faqLd } from "@/components/blocks";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/parents");

const SCREEN = [
  { classes: "Classes 1–5", unplugged: 85, line: "Mostly offline. Cards, paper, floor robots. Teachers demonstrate AI on one screen." },
  { classes: "Classes 6–8", unplugged: 55, line: "Screens for making, not scrolling. Teacher-owned accounts." },
  { classes: "Classes 9–12", unplugged: 35, line: "Real projects in Studio, with a check without AI each time." },
];

const GUIDE_ICONS: Record<GuideSlug, typeof MessagesSquare> = {
  "talking-about-ai-at-dinner": MessagesSquare,
  "spotting-fakes": ScanEye,
  "homework-and-honesty": BookCheck,
  "screens-for-making": Monitor,
};

const FAQ = ANSWERS["/parents"];

const PARENT_CHECKS = ["No AI accounts for Classes 3–5", "No tracking", "Data stays in India"];

/** Card thumbnails: objects and hands only. */
const PROGRAMME_THUMB: Record<string, PhotoKey> = { play: "appleBlocks", spark: "books", practitioner: "overheadDesks", "builders-club": "drawings" };

export default function ParentsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Parents" }]}
        eyebrow="For parents"
        title="AI in school: a parents’ guide."
        intro="AI in school means your child learns to make with AI, and to question it. Class by class, mostly unplugged when they are young. Safe by design."
        actions={
          <>
            <Button href="/kids/find" className="!bg-[var(--kids)] hover:!brightness-110">
              Find a Kids camp
            </Button>
            <Button href="#safety" variant="secondary">
              Read the safety promise
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="loveToLearn"
            alt="Pencil-shaped sign reading “Love to learn”"
            card={
              <>
                <FloatEyebrow>Safe by design</FloatEyebrow>
                <ul className="mt-2.5 space-y-1.5 text-[0.95rem] text-ink">
                  {PARENT_CHECKS.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-physical" aria-hidden /> {t}
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        }
      />

      <section id="learning" className="scroll-mt-24 pb-16 md:pb-24">
        <Container>
          <SectionHead eyebrow="What your child learns" title="One step for every age." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <SmartLink href={`/programmes/${p.slug}`} className="group card card-hover flex h-full flex-col overflow-hidden">
                  <CardThumb photo={PROGRAMME_THUMB[p.slug]} sizes="(min-width: 1024px) 290px, (min-width: 640px) 46vw, 92vw" className="aspect-[16/9]" />
                  <span className="block p-5" style={{ background: p.tint }}>
                    <span className="block font-mono text-xs uppercase tracking-widest text-ink-2">{p.classes}</span>
                    <span className="mt-1 block font-display text-xl font-semibold text-ink">{p.short}</span>
                  </span>
                  <span className="block flex-1 p-5 text-ink-2">{p.terms[0].make}.</span>
                </SmartLink>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="screen-time" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Screen time and unplugged learning" title="Screens are for making things, not scrolling." />
          <ul className="space-y-4">
            {SCREEN.map((s) => (
              <li key={s.classes} className="card p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display font-semibold text-ink">{s.classes}</span>
                  <span className="text-sm text-muted">about {s.unplugged}% unplugged</span>
                </div>
                <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`About ${s.unplugged}% unplugged, ${100 - s.unplugged}% on screen`}>
                  <span className="h-full bg-accent" style={{ width: `${s.unplugged}%` }} />
                  <span className="h-full flex-1 bg-primary/50" />
                </div>
                <p className="mt-3 text-ink-2">{s.line}</p>
              </li>
            ))}
            <li className="flex flex-wrap gap-x-5 gap-y-1 px-1 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Scissors className="size-4" aria-hidden /> <span className="inline-block size-2.5 rounded-full bg-accent" aria-hidden /> Unplugged
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Monitor className="size-4" aria-hidden /> <span className="inline-block size-2.5 rounded-full bg-primary/50" aria-hidden /> On screen
              </span>
              <span>Illustrative proportions; your school’s timetable decides.</span>
            </li>
          </ul>
        </Container>
      </section>

      <SafetyPromise />

      <section id="guides" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Guides: AI at home" title="A short guide each month." line="Free to read and print, with Tamil headings." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARENT_GUIDES.map((g) => {
              const I = GUIDE_ICONS[g.slug];
              return (
                <SmartLink key={g.slug} href={`/parents/guide/${g.slug}`} className="card card-hover flex h-full flex-col p-6">
                  <I className="size-7 text-ink" aria-hidden />
                  <span className="mt-4 block font-display text-lg font-semibold text-ink">{g.title}</span>
                  <span className="mt-1 block flex-1 text-muted">{g.line}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    Read and print <ArrowRight className="size-4" aria-hidden />
                  </span>
                </SmartLink>
              );
            })}
          </div>
          <p className="mt-6 text-muted">
            Want AI for your own work?{" "}
            <SmartLink href={siteHref("flywheel", "/free")} className="font-semibold text-ink underline underline-offset-4">
              Start free on aiflywheel.in
            </SmartLink>
          </p>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <JsonLd data={faqLd(FAQ)} />
          <div>
            <SectionHead eyebrow="Quick answers" title="What parents ask us." className="!mb-6" />
            <SmartLink href="/parents/faq" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              All parent FAQs <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </div>
          <QAList items={FAQ} />
        </Container>
      </section>

      <KidsBanner />
      <AskSchool />
      <RelatedLinks
        className="pb-16"
        links={[
          { href: "/parents/safety", label: "Is AI safe for children?" },
          { href: "/parents/learning", label: "What children learn in AI class" },
          { href: "/kids", label: "AI classes for kids, Classes 3–8" },
          { href: "/parents/guide/homework-and-honesty", label: "AI and homework" },
          { href: "/trust", label: "Child data privacy for schools" },
        ]}
      />
    </>
  );
}
