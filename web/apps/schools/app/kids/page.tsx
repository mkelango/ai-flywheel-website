import type { Metadata } from "next";
import { ArrowRight, Sun, CalendarDays, Bot, House, ShieldCheck, School } from "lucide-react";
import { Button, Container, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { AskSchool } from "@/components/blocks";
import { KidsArt, Sparkle, Squiggle } from "@/components/art";
import { CampFinder } from "@/components/CampFinder";
import { Photo } from "@flywheel/ui/components/Media";
import { CardThumb, PHOTO, type PhotoKey } from "@/components/photos";
import { KIDS_PRODUCTS, STAGE_META } from "@/lib/data";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

/** Descriptive anchors to each Kids page (one keyword each). */
const PRODUCT_LINK: Record<string, string> = {
  "summer-camp": "AI summer camp for kids",
  "weekend-club": "Weekend AI classes for kids",
  bootcamp: "Robotics camp for kids",
  "at-home": "AI activities for kids at home",
};

export const metadata: Metadata = pageMeta("/kids");

const ICON = { sun: Sun, calendar: CalendarDays, bot: Bot, house: House } as const;

/** Card thumbnails: objects and hands at work, never children. */
const PRODUCT_THUMB: Record<string, PhotoKey> = { "summer-camp": "appleBlocks", "weekend-club": "overheadDesks", bootcamp: "drawings", "at-home": "books" };

const KIDS_SAFETY = ["No AI accounts for Classes 3–5", "Instructor-owned accounts for Classes 6–8", "Parents’ consent first", "No tracking on Kids pages"];

export default function KidsPage() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="kids-sky relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-14">
        <Sparkle className="spin-slow absolute left-[6%] top-10 hidden size-8 md:block" color="var(--kids)" />
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-pill bg-surface/80 px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-[color-mix(in_oklab,var(--kids)_30%,transparent)]">
              <span className="size-2.5 rounded-full bg-[var(--kids)]" aria-hidden />
              AI Flywheel Kids <span className="font-normal text-muted">· by AI Flywheel at Schools</span>
            </p>
            <h1 className="mt-6 font-display text-[2.8rem] font-bold leading-[1.02] text-ink md:text-[4.4rem]">
              <span className="mb-4 block text-[0.42em] font-semibold leading-tight text-ink-2">AI classes for kids, Classes 3–8</span>{" "}
              Make it.
              <br />
              <span className="text-[var(--kids)]">Question it.</span>
              <br />
              Share it.
            </h1>
            <Squiggle className="mt-5 w-36" color="var(--kids)" />
            <p className="mt-5 max-w-xl text-lg text-ink-2 md:text-xl">
              AI classes for kids aged 8 to 14: camps and clubs where children build stories, helper bots and moving robots, and learn when not to trust a machine.
            </p>
            <p className="mt-3 font-display text-lg font-medium text-ink">For you: build a robot, then teach it to be fair.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#find" size="lg" className="!bg-[var(--kids)] !shadow-[0_10px_30px_-12px_var(--kids)] hover:!brightness-110">
                Find a Kids camp <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="#at-home" variant="secondary" size="lg" className="bg-surface/70">
                Get a free Kids at Home pack
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {STAGE_META.map((s) => (
                <span key={s.key} className="inline-flex items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-sm font-semibold text-white" style={{ background: s.key === "agentic" ? "#8F5A00" : s.color }}>
                  {s.verb}
                </span>
              ))}
            </div>
          </div>
          {/* Photo and illustration, layered: the helper-bot drawing floats over a real robot. */}
          <div className="relative isolate mx-auto w-full max-w-[500px] pb-14 sm:pb-20">
            <Photo
              src={PHOTO.robot}
              alt="Friendly white humanoid robot, close up"
              fill
              priority
              kenBurns
              overlay="soft"
              sizes="(min-width: 1280px) 410px, (min-width: 1024px) 34vw, 78vw"
              className="photo-shadow ml-auto aspect-[4/5] w-[82%] !rounded-[32px]"
            />
            <span className="absolute right-3 top-3 rounded-pill bg-surface/90 px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-line backdrop-blur">Ages 8 to 14</span>
            <div className="float-card absolute bottom-0 left-0 w-[60%] rounded-[28px] bg-surface p-3 ring-1 ring-line">
              <KidsArt className="w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <header className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Camps and clubs · Classes 3–8</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.8rem]">Four ways to join.</h2>
            <p className="mt-3 text-lg text-muted">Every one ends with something your child made, and shows you.</p>
          </header>
          <div className="grid gap-5 md:grid-cols-2">
            {KIDS_PRODUCTS.map((p, i) => {
              const I = ICON[p.emoji];
              return (
                <Reveal key={p.id} delay={i * 0.06} className="h-full">
                  <article id={p.id} className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[32px] bg-surface p-7 ring-1 ring-line transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.25)] md:p-8">
                    <CardThumb photo={PRODUCT_THUMB[p.id]} sizes="(min-width: 1280px) 600px, (min-width: 768px) 48vw, 92vw" className="-mx-7 -mt-7 aspect-[16/7] md:-mx-8 md:-mt-8" />
                    <span className="relative -mt-7 inline-flex size-14 items-center justify-center rounded-[20px] text-white ring-4 ring-surface" style={{ background: p.color === "#F2B705" ? "#C98F00" : p.color }}>
                      <I className="size-7" aria-hidden />
                    </span>
                    <h3 className="relative mt-5 font-display text-2xl font-bold text-ink">{p.name}</h3>
                    <p className="relative mt-1 text-ink-2">{p.format}</p>
                    <dl className="relative mt-5 space-y-2 text-[0.95rem]">
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted">Who</dt>
                        <dd className="text-ink">{p.who}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted">Take home</dt>
                        <dd className="text-ink">{p.takeHome}</dd>
                      </div>
                    </dl>
                    <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-6">
                      <span className="font-display text-xl font-semibold text-ink">{p.price}</span>
                      <StatusTag status="Proposed" />
                    </div>
                    <SmartLink href={`/kids/${p.id}`} className="relative mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
                      {PRODUCT_LINK[p.id]} <ArrowRight className="size-4" aria-hidden />
                    </SmartLink>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Finder */}
      <section id="find" className="kids-sky scroll-mt-24 py-16 md:py-24">
        <Container>
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-3">Find a camp near you</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.8rem]">Summer camps fill from February.</h2>
            <p className="mt-3 text-lg text-muted">Pick your city. Join the waitlist to hear first.</p>
          </header>
          <CampFinder />
        </Container>
      </section>

      {/* Safety */}
      <section className="py-16 md:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-3">Same safety rules</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.6rem]">As safe as school.</h2>
            <p className="mt-3 text-lg text-muted">Photos of hands and work, not faces, unless you say yes in writing.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {KIDS_SAFETY.map((s) => (
              <li key={s} className="flex items-center gap-3 rounded-3xl bg-surface p-5 ring-1 ring-line">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--kids)_14%,white)] text-[var(--kids)]">
                  <ShieldCheck className="size-5" aria-hidden />
                </span>
                <span className="font-medium text-ink">{s}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Host */}
      <section id="host" className="scroll-mt-24 pb-6">
        <Container>
          <div className="kids-band flex flex-col gap-6 rounded-[32px] p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex gap-4">
              <School className="size-9 shrink-0" aria-hidden />
              <div>
                <h2 className="font-display text-2xl font-bold">Host a Kids camp at your school</h2>
                <p className="mt-1 max-w-lg text-white/90">For partner schools and centres: training, kit and marketing, on a revenue share.</p>
              </div>
            </div>
            <Button href="/demo?role=host" variant="accent">
              Talk to us about hosting
            </Button>
          </div>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/kids"]} eyebrow="Questions parents ask" />
      <RelatedLinks
        links={[
          { href: "/parents/safety", label: "Is AI safe for children?" },
          { href: "/parents/screen-time", label: "Screen time in AI lessons" },
          { href: "/kids/sampler", label: "Free unplugged AI activities" },
          { href: "/kids/host", label: "Host a kids AI camp" },
        ]}
      />
      <AskSchool />
    </div>
  );
}
