import type { Metadata } from "next";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { LEVELS, SITES } from "@flywheel/ui/sites";
import { ADLC } from "@/lib/content";
import { HOW_QA } from "@/lib/answers";
import { AdlcTimeline } from "@/components/AdlcTimeline";
import { InlineLink, QuickAnswers, RelatedLink } from "@/components/Seo";
import { PhotoStack } from "@/components/Photo";
import { ArtefactCards, Band, CtaBand, GatePills, MonoLabel, PageHero, SectionHead, StatusChip, tint, wash } from "@/components/ui";

const TITLE = "Agent Development Life Cycle (ADLC)";
const DESCRIPTION = "The ADLC: ten phases from Discover to Learn and evolve, six signed gates G1 to G6, four records per agent. See how each gate works.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/how-it-works" },
  openGraph: { title: `${TITLE} · AI Flywheel Studio`, description: DESCRIPTION, url: "/how-it-works" },
};

const AMBER = "#D98B0B";

const GATES = ADLC.filter((p) => p.gate && p.gate.code.startsWith("G")).map((p) => ({ phase: p.name, evidence: p.does, ...p.gate! }));

const DOORS = [
  { domain: SITES.schools.domain, role: "Teacher-owned account", note: "Under 18. Moves to the learner at 18, with consent.", color: "#B8306F" },
  { domain: SITES.flywheel.domain, role: "Programmes and credentials", note: "Cohorts, levels and verifiable badges.", color: "#3B4BA8" },
  { domain: SITES.studio.domain, role: "Projects and gate records", note: "Where the build happens.", color: AMBER },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        crumb="How it works"
        color={AMBER}
        eyebrow={<StatusChip color={AMBER}>How it works · ADLC</StatusChip>}
        kicker="Agent development life cycle (ADLC)"
        title="Ten phases. Six signed gates."
        line="The agent development life cycle is ten phases and six signed gates. Every Agentic Studio project runs it, and leaves proof behind."
        updated
        aside={
          <PhotoStack
            src="/images/engineers-at-desks.jpg"
            alt="Two software engineers working at monitors, running a project through the agent development life cycle (ADLC)"
            sizes="(min-width: 1024px) 560px, 90vw"
            priority
            kenBurns
            card={
              <>
                <MonoLabel color={AMBER}>ADLC · {ADLC.length} phases</MonoLabel>
                <div className="mt-3">
                  <GatePills />
                </div>
                <p className="mt-3 text-sm text-ink-2">A named human signs each gate.</p>
              </>
            }
          />
        }
      >
        <Button href="/early-access" size="lg">
          Join early access <ArrowRight className="size-4" />
        </Button>
        <Button href="/agentic" variant="secondary" size="lg">
          Agentic Studio
        </Button>
      </PageHero>

      {/* Phases */}
      <Band>
        <SectionHead eyebrow="The life cycle" title="Discover to Learn and evolve." line="Hover or tap a phase to see the work and its gate." />
        <AdlcTimeline />
      </Band>

      {/* Gates */}
      <Band className="border-y border-line bg-surface/40">
        <SectionHead eyebrow="Gates · G1 to G6" title="What does each gate ask?" line="A gate is a signed decision with linked evidence. A named human signs." />
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GATES.map((g) => (
            <li key={g.code} className="card relative flex flex-col overflow-hidden p-6">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${AMBER}, transparent)` }} />
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md px-2 py-0.5 font-mono text-xs font-semibold" style={{ background: wash(AMBER, 22), color: tint(AMBER, 60) }}>
                  {g.code}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">after {g.phase}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-ink">{g.name}</h3>
              <p className="mb-6 mt-2 text-ink-2">“{g.q}”</p>
              <p className="mt-auto flex items-start gap-2 border-t border-line pt-4 text-sm text-muted">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-agentic" aria-hidden />
                <span>Evidence: {g.evidence}</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted">
          Build runs in waves between G4 and G5; each slice must work end to end. G6 needs a tested kill switch: see{" "}
          <InlineLink href="/security">how an agent is stopped</InlineLink>.
        </p>
      </Band>

      {/* Artefacts */}
      <Band>
        <SectionHead eyebrow="Artefacts" title="Four records, every project." line="What you hand over when the agent goes live." />
        <ArtefactCards />
      </Band>

      {/* One login */}
      <Band className="border-t border-line">
        <SectionHead eyebrow="One login" title="Your level follows you." line="One sign-in across all three sites. Level, projects and portfolio travel with it." />
        <div className="relative">
          <ol className="grid gap-4 md:grid-cols-3">
            {DOORS.map((d) => (
              <li key={d.domain} className="card relative overflow-hidden p-6">
                <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${d.color}, transparent)` }} />
                <span className="inline-block max-w-full truncate rounded-pill border border-line px-3 py-1 font-mono text-xs" style={{ color: tint(d.color, 60) }}>
                  {d.domain}
                </span>
                <h3 className="mt-6 font-semibold text-ink">{d.role}</h3>
                <p className="mt-1.5 text-sm text-muted">{d.note}</p>
              </li>
            ))}
          </ol>
          <div aria-hidden className="mx-auto h-8 w-px bg-gradient-to-b from-line to-primary/60" />
          <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-primary/40 bg-surface p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-agentic">One login · OIDC single sign-on</p>
              <p className="font-mono text-[0.65rem] text-muted">Illustrative</p>
            </div>
            <div className="mt-5 flex gap-1.5">
              {LEVELS.map((l) => (
                <span
                  key={l.code}
                  title={l.name}
                  className={`flex-1 rounded-md border py-2 text-center font-mono text-xs ${l.code === "C3" ? "border-primary bg-primary text-on-primary" : "border-line text-muted"}`}
                >
                  {l.code}
                </span>
              ))}
            </div>
            <dl className="mt-5 grid gap-3 border-t border-line pt-5 text-sm sm:grid-cols-3">
              {[
                ["Level", "C1 to C5, one system everywhere"],
                ["Projects", "Every gate record you signed"],
                ["Portfolio", "Kept when an account moves at 18"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{k}</dt>
                  <dd className="mt-1 text-ink-2">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Band>

      <QuickAnswers items={HOW_QA} title="What is the ADLC?">
        <RelatedLink href="/agentic">Agentic Studio, where the ADLC runs</RelatedLink>
        <RelatedLink href="/model">The twelve-phase MDLC in Model Studio</RelatedLink>
        <RelatedLink href="/for-learners">Run the ADLC in a twelve-week cohort</RelatedLink>
      </QuickAnswers>

      <CtaBand />
    </>
  );
}
