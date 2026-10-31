import type { Metadata } from "next";
import { ArrowRight, Building2, Briefcase, GraduationCap, MapPin, Power, School, ScrollText, Activity, ListChecks } from "lucide-react";
import { Button, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { LEVELS, SITES } from "@flywheel/ui/sites";
import { AUDIENCES, STUDIOS } from "@/lib/content";
import { siteHref } from "@flywheel/ui/sites";
import { HOME_QA } from "@/lib/answers";
import { softwareLd } from "@/lib/seo";
import { HeroMockup } from "@/components/HeroMockup";
import { StudioPhoto } from "@/components/Photo";
import { AdlcTimeline } from "@/components/AdlcTimeline";
import { InlineLink, JsonLd, QuickAnswers, RelatedLink } from "@/components/Seo";
import { Band, CtaBand, Glow, SectionHead, StatusChip, StudioCard } from "@/components/ui";

const TITLE = "Agentic AI Platform for Builders · AI Flywheel Studio";
const DESCRIPTION = "Build governed AI agents through ten phases and six signed gates. Agentic Studio opens in early access in Feb 2027. Join the list.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/" },
};

const AUDIENCE_ICONS = { learners: GraduationCap, campuses: Building2, teams: Briefcase, schools: School } as const;

const GOVERNANCE = [
  { icon: ListChecks, title: "Evals", text: "Graded test cases from day one." },
  { icon: Activity, title: "Trace", text: "One trace per run." },
  { icon: Power, title: "Kill switch", text: "Tested before go-live." },
  { icon: ScrollText, title: "Accountability register", text: "One named human per row." },
  { icon: MapPin, title: "India data residency", text: "Tenants pinned to AWS Mumbai." },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={softwareLd({
          name: "AI Flywheel Studio",
          path: "/",
          description: "The agentic AI platform of AI Flywheel: build governed AI agents through ten phases and six signed gates. Agentic Studio opens in early access in February 2027.",
        })}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <Glow />
        <div className="container-site relative grid grid-cols-1 gap-14 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <StatusChip color="#D98B0B" live>
              Agentic Studio · Opens Feb 2027
            </StatusChip>
            <h1 className="text-gradient mt-6 font-display text-[3rem] font-semibold leading-[0.98] md:text-7xl lg:text-[5.2rem]">
              <span className="mb-5 block font-mono text-sm font-medium uppercase leading-snug tracking-[0.14em] text-ink-2 md:text-base">The agentic AI platform</span>
              Sign in. Start a project.
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-2 md:text-xl">The agentic AI platform where learning becomes building. Agents, models, media and machines, shipped through signed gates.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/early-access" size="lg">
                Join early access <ArrowRight className="size-4" />
              </Button>
              <Button href="/sign-in" variant="secondary" size="lg">
                Sign in
              </Button>
            </div>
            <p className="mt-8 font-mono text-xs tracking-[0.2em] text-muted">
              <span className="text-[color-mix(in_oklab,var(--color-foundation)_55%,white)]">KNOW</span> ·{" "}
              <span className="text-[color-mix(in_oklab,var(--color-generative)_55%,white)]">MAKE</span> · <span className="text-agentic">DO</span> ·{" "}
              <span className="text-[color-mix(in_oklab,var(--color-physical)_55%,white)]">MOVE</span>
            </p>
          </div>
          <div className="relative min-w-0 pt-16 sm:pl-10 sm:pt-20 lg:col-span-7 lg:pl-14">
            <div className="absolute right-0 top-0 h-[72%] w-[88%]">
              <StudioPhoto
                src="/images/data-centre-engineer.jpg"
                alt="Engineer working on a laptop beside server racks in a data centre, where agentic AI platform workloads run"
                sizes="(min-width: 1024px) 620px, 90vw"
                position="72% 30%"
                priority
                kenBurns
                className="size-full rounded-[calc(var(--radius-card)*1.6)] border border-line"
              />
            </div>
            <div className="relative z-10">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Studios */}
      <Band>
        <SectionHead eyebrow="Four studios" title="One wheel. Four studios." line="Each stage of the wheel gets its own studio and its own life cycle. Agentic Studio opens first." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STUDIOS.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.06} className="h-full">
              <StudioCard studio={s} thumb />
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ADLC */}
      <Band id="how-it-works" className="border-y border-line bg-surface/40">
        <SectionHead eyebrow="How it works · ADLC" title="Ten phases. Six signed gates." line="Every project runs the life cycle. Hover a phase to see the work and the gate." />
        <AdlcTimeline />
        <p className="mt-6 text-sm text-muted">
          Model, Generative and Robotic Studio run twelve-phase cycles with the same six gates.{" "}
          <InlineLink href="/how-it-works">The agent development life cycle, gate by gate</InlineLink>
        </p>
      </Band>

      {/* One login */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHead eyebrow="One login" title="Your level follows you." line="Level, projects and portfolio travel across all three doors." className="mb-0 md:mb-0" />
          <Reveal>
            <div className="card relative overflow-hidden p-6 md:p-8">
              <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
              <div className="relative flex flex-wrap items-center gap-2">
                {[SITES.schools.domain, SITES.flywheel.domain, SITES.studio.domain].map((d, i) => (
                  <span key={d} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden className="h-px w-5 bg-line" />}
                    <span className={`rounded-pill border px-3 py-1.5 font-mono text-xs ${i === 2 ? "border-primary/60 text-ink" : "border-line text-muted"}`}>{d}</span>
                  </span>
                ))}
              </div>
              <div className="relative mt-8 rounded-xl border border-line bg-bg/70 p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Your profile</p>
                <div className="mt-4 flex gap-1.5">
                  {LEVELS.map((l) => (
                    <span
                      key={l.code}
                      className={`flex-1 rounded-md border py-2 text-center font-mono text-xs ${l.code === "C3" ? "border-primary bg-primary text-on-primary" : "border-line text-muted"}`}
                      title={l.name}
                    >
                      {l.code}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-ink-2">
                  Builder (C3) <span className="text-muted">· Agentic</span>
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                  <li className="flex justify-between gap-3">
                    <span className="text-ink">Cohort project</span>
                    <span className="font-mono text-xs text-muted">G5 passed</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-ink">Portfolio</span>
                    <span className="font-mono text-xs text-muted">gate log · eval suite</span>
                  </li>
                </ul>
                <p className="mt-4 font-mono text-[0.65rem] text-muted">Illustrative</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* Who it's for */}
      <Band className="border-t border-line">
        <SectionHead eyebrow="Who builds here" title="Built for builders, everywhere they learn." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => {
            const Icon = AUDIENCE_ICONS[a.key];
            return (
              <SmartLink key={a.key} href={a.href} className="card card-hover group flex flex-col p-6">
                <Icon className="size-6 text-agentic" aria-hidden />
                <h3 className="mt-6 text-lg font-semibold text-ink">{a.label}</h3>
                <p className="mt-1.5 text-sm text-muted">{a.title}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-ink-2 group-hover:text-ink">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </SmartLink>
            );
          })}
        </div>
      </Band>

      {/* Governance strip */}
      <section className="border-y border-line bg-surface/50">
        <div className="container-site py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xs">
              <p className="eyebrow">Governed by design</p>
              <p className="mt-2 font-display text-2xl font-semibold text-ink">You don't deploy an agent. You deploy the system that watches it.</p>
            </div>
            <ul className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:max-w-3xl lg:grid-cols-5">
              {GOVERNANCE.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Icon className="size-5 text-agentic" aria-hidden />
                  <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-xs text-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <SmartLink href="/security" className="mt-8 inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
            AI agent governance and security <ArrowRight className="size-4" />
          </SmartLink>
        </div>
      </section>

      <QuickAnswers items={HOME_QA}>
        <RelatedLink href="/agentic">Agentic Studio, the AI agent builder</RelatedLink>
        <RelatedLink href="/roadmap">Studio roadmap, Feb 2027 to FY28</RelatedLink>
        <RelatedLink href={siteHref("flywheel", "/programmes")}>Programmes that build in Studio</RelatedLink>
      </QuickAnswers>

      <CtaBand />
    </>
  );
}
