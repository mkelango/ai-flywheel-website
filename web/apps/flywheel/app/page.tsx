import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, Briefcase, Building, GraduationCap, Languages, Lock, Users } from "lucide-react";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { WheelMark } from "@flywheel/ui/components/WheelMark";
import { siteHref, STAGES } from "@flywheel/ui/sites";
import { FEATURED_SLUGS, getProgramme, PROGRAMMES, type Programme } from "@/lib/programmes";
import { BOOKS } from "@/lib/framework";
import { HOME_FAQ, INSIGHTS } from "@/lib/content";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { LevelLadder } from "@/components/LevelLadder";
import { BookCover, GateLogCard, JsonLd, LayerBar } from "@/components/ui";
import { stageSlug } from "@/lib/learn";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { FaqList } from "@/components/QuickAnswers";
import { CardThumb, FloatEyebrow, HeroPhoto, SectionPhoto, type PhotoKey } from "@/components/photos";

export const metadata: Metadata = pageMeta("/");

const STUDIO_PATH = { foundation: "/model", generative: "/generative", agentic: "/agentic", physical: "/robotic" } as const;

const DOORS: { icon: typeof Users; who: string; what: string; href: string; photo: PhotoKey }[] = [
  { icon: GraduationCap, who: "I'm a student or graduate", what: "Career tracks", href: "/tracks/students", photo: "studentsCafe" },
  { icon: Briefcase, who: "I'm a working professional", what: "Programmes by role", href: "/professionals", photo: "laptopPhone" },
  { icon: Building, who: "I lead a college", what: "Campus Partnership", href: "/higher-education", photo: "classroom" },
  { icon: Users, who: "I lead a team, company or department", what: "Flywheel Check", href: "/business", photo: "teamMeeting" },
];

const TRUST = [
  { icon: BadgeCheck, label: "Certified on evidence, not attendance" },
  { icon: Languages, label: "English and Tamil" },
  { icon: Lock, label: "Your data stays in India" },
  { icon: BookOpen, label: "Built on 2,250 pages of method" },
];

export default function Home() {
  const featured = FEATURED_SLUGS.map(getProgramme).filter(Boolean) as Programme[];

  return (
    <>
      {/* 01 Hero */}
      <section className="relative overflow-hidden">
        <div className="container-site grid items-center gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5">Learn it. Build it. Prove it.</p>
              <h1 className="font-display text-[2.7rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-[4.6rem]">
                AI courses from your first prompt to your first <span className="italic text-primary-hover">production agent.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">
                Practical AI courses in India, in English and Tamil, built on M. K. Elango&apos;s AI Flywheel framework. AI Flywheel is the practical AI learning platform that certifies what you can build.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/programmes/foundation" size="lg">
                  Start free <span className="font-normal opacity-80">· C1, 6 hours</span>
                </Button>
                <Button href="/programmes" variant="secondary" size="lg">
                  Find your programme
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <HeroPhoto
              photo="codingPair"
              frameClassName="aspect-[4/3] lg:aspect-[4/5]"
              alt="Two young professionals reviewing code together on a laptop, the hands-on way our AI courses are taught"
              chip={<StageDots />}
              card={
                <>
                  <FloatEyebrow>Badge · sample</FloatEyebrow>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">Builder (C3)</p>
                  <p className="text-xs text-ink-2">Agentic AI · G1–G6 signed</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-surface-2">
                    <div className="h-full w-full bg-agentic" />
                  </div>
                </>
              }
            />
          </div>
        </div>
        <div className="border-y border-line bg-surface/60">
          <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-3 py-5 text-sm text-ink-2 md:grid-cols-4">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-primary-hover" aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 Door chooser */}
      <Section eyebrow="Four front doors" title="Where do you want to start?">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOORS.map(({ icon: Icon, who, what, href, photo }, i) => (
            <Reveal key={who} delay={i * 0.06} className="h-full">
              <Link href={href} className="card card-hover group flex h-full flex-col overflow-hidden">
                <CardThumb photo={photo} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw">
                  <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-surface/95 shadow-sm" aria-hidden>
                    <Icon className="size-4 text-ink" />
                  </span>
                </CardThumb>
                <span className="flex flex-1 flex-col p-6 pt-5">
                  <span className="font-display text-xl font-semibold leading-snug text-ink">{who}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary-hover">
                    {what} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Choosing for a school?{" "}
          <a href={siteHref("schools", "/")} className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            AI Flywheel at Schools ↗
          </a>
        </p>
      </Section>

      {/* 03 The ladder */}
      <section className="border-y border-line bg-surface-2/50 py-16 md:py-24">
        <div className="container-site">
          <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">The ladder · C1 to C5</p>
              <h2 className="font-display text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">Five levels. Each one earned on real work.</h2>
              <p className="mt-4 text-lg text-muted">No level without an artefact from real work, and one check taken without AI.</p>
            </div>
            <Link href="/framework/levels" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
              How levels work <ArrowRight className="size-4" />
            </Link>
          </header>
          <LevelLadder />
        </div>
      </section>

      {/* 04 Featured programmes */}
      <Section eyebrow="Featured programmes" title="Free to start. A cohort at the centre.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} className="h-full">
              <ProgrammeCard p={p} />
            </Reveal>
          ))}
          <Reveal delay={0.25} className="h-full">
            <Link href="/programmes" className="group flex h-full min-h-56 flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-ink/25 p-6 hover:border-ink/60">
              <span className="eyebrow">Catalogue</span>
              <span>
                <span className="block font-display text-5xl font-semibold text-ink">{PROGRAMMES.length}</span>
                <span className="mt-1 block text-muted">programmes, C1 to C5, by stage and format</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                Browse all <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 05 Four stages */}
      <Section eyebrow="Four stages, four tracks" title="One wheel, four stages. Pick your stage." className="pt-0 md:pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="mx-auto lg:col-span-4">
            <WheelMark size={260} animate title="The AI Flywheel: four stages around an ember hub" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {STAGES.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.06}>
                <div className="card relative h-full overflow-hidden p-6">
                  <span className="absolute inset-y-0 left-0 w-1" style={{ background: s.color }} aria-hidden />
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-2">
                    <span className="text-muted">0{i + 1} ·</span> {s.verb}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted">{s.line}.</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-sm">
                    <Link href={`/programmes/${stageSlug(s.key)}`} className="inline-flex min-h-11 items-center font-medium text-ink hover:text-primary-hover">
                      {s.name} AI path
                    </Link>
                    <a href={siteHref("studio", STUDIO_PATH[s.key])} className="inline-flex min-h-11 items-center gap-1 font-medium text-ink-2 hover:text-ink">
                      Build in {s.studio} <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 How you learn */}
      <Section eyebrow="How you learn · 70 / 20 / 10" title="Mostly building. Some coaching. A little class." className="pt-0 md:pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-16 w-full overflow-hidden rounded-[var(--radius-card)] text-sm font-medium md:h-20">
              <div className="flex basis-[70%] items-center bg-inverse px-5 text-inverse-ink">
                <span className="font-display text-2xl md:text-3xl">70%</span>
                <span className="ml-3 hidden sm:inline">your own real turn</span>
              </div>
              <div className="flex basis-[20%] items-center bg-primary px-3 text-on-primary md:px-5">
                <span className="font-display text-xl md:text-2xl">20%</span>
              </div>
              <div className="flex basis-[10%] items-center justify-center bg-highlight text-ink">
                <span className="font-display text-lg md:text-xl">10%</span>
              </div>
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-medium text-ink">70% · Your turn</dt>
                <dd className="text-muted">A real use case, in Studio</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">20% · Coaching</dt>
                <dd className="text-muted">Coaches, gate reviews and peers</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">10% · Taught</dt>
                <dd className="text-muted">About an hour a week</dd>
              </div>
            </dl>
          </Reveal>
          <SectionPhoto
            className="lg:col-span-5"
            photo="workshop"
            alt="A facilitator at a wall of sticky notes while a team works through a problem together"
            sizes="(min-width: 1024px) 440px, 92vw"
            card={
              <>
                <p className="font-display text-base leading-snug text-ink">&ldquo;Every programme ends with something you built, and a check you passed without AI.&rdquo;</p>
                <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-widest text-muted">Foundation Playbook §45.7</p>
              </>
            }
          />
        </div>
      </Section>

      {/* 07 Studio teaser */}
      <section className="bg-inverse py-16 text-inverse-ink md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-inverse-ink/60">AI Flywheel Studio · Early access</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.1] md:text-[2.6rem]">Learn here. Build in AI Flywheel Studio.</h2>
            <p className="mt-4 text-lg text-inverse-ink/75">Agentic Studio opens first. One login: your level, projects and portfolio go with you.</p>
            <div className="mt-8">
              <Button href={siteHref("studio", "/")} size="lg">
                Join early access <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <StudioMock />
          </div>
        </div>
      </section>

      {/* 08 Proof */}
      <Section eyebrow="Proof" title="We publish what we can prove." intro="At launch: the method. After the first cohort: real projects and Builder counts by stage.">
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/books" className="card card-hover flex flex-col p-6">
            <StatusTagRow status="Real" />
            <span className="mt-5 font-display text-4xl font-semibold text-ink">2,250</span>
            <span className="mt-1 text-muted">pages of method in the four Studio Playbooks</span>
          </Link>
          <Link href="/programmes/agentic-ai-engineer#syllabus" className="card card-hover flex flex-col p-6">
            <StatusTagRow status="Real" />
            <span className="mt-5 font-display text-4xl font-semibold text-ink">12 weeks</span>
            <span className="mt-1 text-muted">of cohort syllabus, gates marked, published in full</span>
          </Link>
          <div className="flex flex-col rounded-[var(--radius-card)] border border-dashed border-ink/25 p-6">
            <span className="eyebrow">In preparation</span>
            <span className="mt-5 font-display text-2xl font-semibold text-ink">Cohort outcomes</span>
            <span className="mt-1 text-muted">Published when the first cohort ends. Never composites.</span>
          </div>
        </div>
      </Section>

      {/* 09 For organisations */}
      <section className="pb-16 md:pb-24">
        <div className="container-site grid gap-4 md:grid-cols-2">
          <OrgPanel
            eyebrow="Companies and government"
            title="Know where your people stand by stage and level, then move them."
            cta="Book a Flywheel Check"
            href="/business"
          />
          <OrgPanel eyebrow="Colleges and universities" title="Credit courses, faculty programmes and labs, under one MoU." cta="Campus Partnership" href="/higher-education" />
        </div>
      </section>

      {/* 10 Author and books */}
      <section className="border-y border-line bg-surface-2/50 py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">The author</p>
            <h2 className="font-display text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">The method behind the platform.</h2>
            <div className="mt-6 flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-full bg-inverse font-display text-xl text-inverse-ink" aria-hidden>
                MKE
              </span>
              <div>
                <p className="font-semibold text-ink">M. K. Elango</p>
                <p className="text-sm text-muted">Strategist, Tamil Nadu · Inevitra Advisory</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6">
              <Link href="/framework" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-primary-hover">
                Read the framework <ArrowRight className="size-4" />
              </Link>
              <Link href="/about#elango" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink-2 hover:text-ink">
                About M. K. Elango
              </Link>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:col-span-8">
            {BOOKS.map((b) => (
              <li key={b.title}>
                <Link href="/books" className="group block">
                  <div className="transition-transform duration-300 group-hover:-translate-y-1">
                    <BookCover title={b.title} sub={b.sub} color={b.color} pages={b.pages} />
                  </div>
                  <p className="mt-3 text-sm text-ink-2">{b.line}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11 Insights */}
      <Section id="insights" eyebrow="Research and insights" title="What changed this quarter, and what didn't.">
        <div className="grid gap-4 md:grid-cols-3">
          {INSIGHTS.map((n) => (
            <Link key={n.title} href={n.href} className="card card-hover group flex flex-col p-6">
              <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                <span className="size-2 rounded-full" style={{ background: n.color }} /> {n.tag}
              </span>
              <span className="mt-4 font-display text-xl font-semibold leading-snug text-ink group-hover:text-primary-hover">{n.title}</span>
              <span className="mt-auto pt-6 text-xs text-muted">
                {n.date} · {n.read} read
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 12 Final CTA + FAQ */}
      <section className="pb-20 md:pb-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LayerBar className="mb-8 max-w-40" />
            <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">Start where you are. It&apos;s free.</h2>
            <p className="mt-4 text-lg text-muted">Free to start. Tamil or English. No card needed.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/programmes/foundation" size="lg">
                Start free
              </Button>
              <Button href="/contact?tag=professionals" variant="secondary" size="lg">
                Talk to an adviser
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="eyebrow mb-4">Quick answers</h2>
            <FaqList items={HOME_FAQ} />
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(HOME_FAQ)} />
    </>
  );
}

function StatusTagRow({ status }: { status: "Real" }) {
  return (
    <span>
      <StatusTag status={status} />
    </span>
  );
}

function OrgPanel({ eyebrow, title, cta, href }: { eyebrow: string; title: string; cta: string; href: string }) {
  return (
    <Link href={href} className="card card-hover group flex min-h-64 flex-col justify-between p-8 md:p-10">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <p className="mt-4 max-w-md font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">{title}</p>
      </div>
      <span className="mt-8 inline-flex items-center gap-1.5 font-medium text-primary-hover">
        {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** Four stage dots for the hero chip. */
function StageDots() {
  return (
    <>
      {STAGES.map((st) => (
        <span key={st.key} className="size-2 rounded-full" style={{ background: st.color }} aria-hidden />
      ))}
      <span className="ml-1">Know · Make · Do · Move</span>
    </>
  );
}

function StudioMock() {
  const studios = [
    { n: "Agentic Studio", c: "#D98B0B", on: true },
    { n: "Model Studio", c: "#3B4BA8" },
    { n: "Generative Studio", c: "#B8306F" },
    { n: "Robotic Studio", c: "#13827F" },
  ];
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[0.7rem] text-inverse-ink/50">agentic.aiflywheel.studio</span>
      </div>
      <div className="grid sm:grid-cols-[180px_1fr]">
        <ul className="hidden space-y-1 border-r border-white/10 p-3 text-sm sm:block">
          {studios.map((s) => (
            <li key={s.n} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${s.on ? "bg-white/10" : "opacity-50"}`}>
              <span className="size-2 rounded-full" style={{ background: s.c }} />
              {s.n}
            </li>
          ))}
        </ul>
        <div className="p-4 md:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="font-display text-lg">Invoice triage agent</span>
            <span className="rounded-pill border border-white/15 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-inverse-ink/70">Team of 5 · Week 9</span>
          </div>
          <GateLogCard dark />
        </div>
      </div>
    </div>
  );
}
