import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Trophy, PartyPopper } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, JsonLd, PageHero, SectionHead, StageBadge } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { SITE, pageMeta } from "@/lib/seo";
import { BOARDS, PROGRAMMES, STAGE_META, band } from "@/lib/data";

export const metadata: Metadata = pageMeta("/programmes");

const FACTS = ["Classes 1–12", "Tamil and English", "CBSE, ICSE and State Board", "Up to 2 periods a week"];

/** The four programmes as a course list. */
const LIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI syllabus, Class 1 to 12",
  itemListElement: PROGRAMMES.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/programmes/${p.slug}`, name: `${p.name}, ${p.classes}` })),
};

const DRIVE = ["Spot a problem", "Gather what we need", "Make it", "Test it and check it’s fair", "Share it and make it better"];

export default function ProgrammesPage() {
  return (
    <>
      <JsonLd data={LIST_LD} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes" }]}
        eyebrow="Curriculum map"
        title="The AI syllabus, Class 1 to 12: four programmes, one wheel."
        intro="Our AI syllabus from Class 1 to 12 runs as four programmes. Every class learns all four stages, Know, Make, Do and Move, at the right step for its age."
        updated
        actions={
          <>
            <Button href="/demo">Book a school demo</Button>
            <Button href="#boards" variant="secondary">
              Board alignment
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="overheadDesks"
            alt="Overhead view of hands working at laptops around a shared project table"
            chip="Classes 1–12"
            card={
              <>
                <FloatEyebrow>Every class, all four stages</FloatEyebrow>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {STAGE_META.map((s) => (
                    <StageBadge key={s.key} stage={s.key} />
                  ))}
                </div>
              </>
            }
          />
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <ul className="mb-6 flex flex-wrap gap-2" aria-label="At a glance">
            {FACTS.map((f) => (
              <li key={f} className="rounded-pill bg-surface px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line">
                {f}
              </li>
            ))}
          </ul>
          {/* Desktop: grid map */}
          <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface lg:block">
            <div className="grid grid-cols-[1.1fr_repeat(4,1fr)_0.9fr] border-b border-line bg-surface-2/60 text-sm">
              <div className="p-4 font-semibold text-ink">Programme</div>
              {STAGE_META.map((s) => (
                <div key={s.key} className="flex items-center gap-2 p-4 font-semibold text-ink">
                  <span className="size-2.5 rounded-full" style={{ background: s.color }} aria-hidden />
                  {s.verb} <span className="font-normal text-muted">· {s.name}</span>
                </div>
              ))}
              <div className="p-4 font-semibold text-ink">Per student a year</div>
            </div>
            {PROGRAMMES.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link href={`/programmes/${p.slug}`} className="group grid grid-cols-[1.1fr_repeat(4,1fr)_0.9fr] border-b border-line last:border-0 hover:bg-bg/60">
                  <div className="p-5">
                    <span className="mb-2 inline-block rounded-pill px-2.5 py-0.5 font-mono text-xs text-ink" style={{ background: p.tint }}>
                      {p.classes}
                    </span>
                    <span className="block font-display text-lg font-semibold text-ink group-hover:underline">{p.name}</span>
                    <span className="mt-1 block text-sm text-muted">{p.time}</span>
                  </div>
                  {STAGE_META.map((s) => (
                    <div key={s.key} className="border-l border-line p-5 text-[0.95rem] text-ink-2">
                      {p.stages[s.key]}
                    </div>
                  ))}
                  <div className="border-l border-line p-5">
                    <span className="block font-semibold text-ink">{band(p.price)}</span>
                    <span className="mt-1 inline-block">
                      <StatusTag status="Ed 1.1" />
                    </span>
                    <span className="mt-3 block text-sm text-muted">{p.aiUse}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Mobile and tablet: cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:hidden">
            {PROGRAMMES.map((p) => (
              <Link key={p.slug} href={`/programmes/${p.slug}`} className="card card-hover overflow-hidden">
                <div className="p-6" style={{ background: p.tint }}>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-2">{p.classes}</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">{p.name}</p>
                  <p className="mt-2 text-ink-2">
                    <span className="font-semibold text-ink">{band(p.price)}</span> a year <StatusTag status="Ed 1.1" />
                  </p>
                </div>
                <ul className="divide-y divide-line">
                  {STAGE_META.map((s) => (
                    <li key={s.key} className="flex gap-3 px-6 py-3 text-[0.95rem] text-ink-2">
                      <span className="mt-2 size-2.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden />
                      <span>
                        <span className="font-semibold text-ink">{s.verb}: </span>
                        {p.stages[s.key]}
                      </span>
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Programme names and price bands are from Ed 1.1. Class bands and activities are a proposal, confirmed with each school.</p>
        </Container>
      </section>

      {/* DRIVE + one check without AI */}
      <section className="bg-surface-2/60 py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Every project runs DRIVE" title="Spot. Gather. Make. Test. Share." className="!mb-6" />
            <ol className="space-y-2">
              {DRIVE.map((d, i) => (
                <li key={d} className="flex items-center gap-3 text-lg text-ink-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-surface font-display text-sm font-semibold text-ink ring-1 ring-line">{i + 1}</span>
                  {d}
                </li>
              ))}
            </ol>
          </div>
          <div className="card self-start p-7">
            <p className="eyebrow">Alongside, CORE</p>
            <p className="mt-3 font-display text-2xl font-semibold text-ink">Play by the rules · Be open · Be responsible · Stay in charge.</p>
            <p className="mt-5 border-t border-line pt-5 text-ink-2">
              <span className="font-semibold text-ink">One check without AI.</span> Each project ends with a short unplugged check, so children show they understood, not just that the tool worked.
            </p>
          </div>
        </Container>
      </section>

      {/* Boards */}
      <section id="boards" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Board alignment" title="Does it fit your board?" line="Each mapping shows what we cover, and what we add." />
          <div className="grid gap-4 md:grid-cols-3">
            {BOARDS.map((b, i) => (
              <Reveal key={b.board} delay={i * 0.06} className="card h-full p-7">
                <p className="font-display text-2xl font-semibold text-ink">{b.board}</p>
                <p className="mt-3 text-ink-2">{b.detail}</p>
                <p className="mt-4 text-sm text-muted">{b.note}</p>
              </Reveal>
            ))}
          </div>
          <Link href="/programmes/boards" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            CBSE AI curriculum, Class 3 to 8: the full map <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-24 pb-8">
        <Container>
          <SectionHead eyebrow="In the school year" title="Three moments to show the work." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { I: CalendarDays, t: "Flywheel Day", l: "One school day a year. Every class shows one thing it made." },
              { I: Trophy, t: "Inter-school Challenge", l: "Teams from Classes 6–12 solve one local problem." },
              { I: PartyPopper, t: "Annual Showcase", l: "Builders Club capstones, shown to families. First names only." },
            ].map(({ I, t, l }) => (
              <div key={t} className="card p-6">
                <I className="size-6 text-ink" aria-hidden />
                <p className="mt-4 font-display text-lg font-semibold text-ink">{t}</p>
                <p className="mt-1 text-muted">{l}</p>
              </div>
            ))}
          </div>
          <Link href="/partnership" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            Included in every partnership <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/programmes"]} eyebrow="Questions coordinators ask" />
      <RelatedLinks
        links={[
          { href: "/pricing", label: "AI curriculum price per student" },
          { href: "/teachers/kits", label: "AI lesson plans for teachers" },
          { href: "/lab", label: "AI lab for schools in Tamil Nadu" },
          { href: "/parents/learning", label: "What children learn in AI class" },
        ]}
      />
      <DemoBand />
    </>
  );
}
