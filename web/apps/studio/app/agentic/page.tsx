import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Network, Plug, ListChecks, Inbox, ScrollText, Power } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { ADLC, KILL_SWITCH, studioByKey } from "@/lib/content";
import { AGENTIC_QA } from "@/lib/answers";
import { softwareLd } from "@/lib/seo";
import { AutonomyDial } from "@/components/AutonomyDial";
import { StudioPhoto } from "@/components/Photo";
import { InlineLink, JsonLd, QuickAnswers, RelatedLink } from "@/components/Seo";
import { ArtefactCards, Band, CtaBand, PageHero, PhaseRail, SectionHead, StatusChip } from "@/components/ui";

const studio = studioByKey("agentic");

export const metadata: Metadata = {
  title: studio.seo.title,
  description: studio.seo.description,
  alternates: { canonical: "/agentic" },
  openGraph: { title: `${studio.seo.title} · AI Flywheel Studio`, description: studio.seo.description, url: "/agentic" },
};

const CAPABILITIES = [
  { icon: Network, title: "Model Mesh", text: "Model-agnostic routing by task, with residency rules. Bring your own key." },
  { icon: Plug, title: "Connector Fabric", text: "An MCP gateway, a connector registry and a token vault." },
  { icon: ListChecks, title: "Eval Service", text: "Quality gates, a replay bench and an evidence pack per release." },
  { icon: Inbox, title: "Policy and approvals", text: "Autonomy limits enforced at run time; an approvals inbox for people." },
  { icon: ScrollText, title: "Trust Ledger", text: "A hash-chained record of who decided what, and on what evidence." },
  { icon: Power, title: "Kill-switch hierarchy", text: `${KILL_SWITCH.join(" → ")}. The narrowest stop is always there.` },
];


const SPEC = [
  ["agent", "intake"],
  ["owner", "a named human"],
  ["risk_tier", "2"],
  ["autonomy", "L3  # proposes; a person approves"],
  ["tools", "[mcp://docs.extract]"],
  ["evals", "golden/intake  >= 0.90"],
  ["kill_switch", "tested"],
];

export default function AgenticPage() {
  return (
    <>
      <JsonLd
        data={softwareLd({
          name: "Agentic Studio",
          path: "/agentic",
          description: "A model-agnostic AI agent builder with an MCP gateway, an eval service, run-time policy limits and a tested kill switch. Opens in early access in February 2027.",
        })}
      />
      <PageHero
        crumb="Agentic Studio"
        color={studio.color}
        eyebrow={
          <StatusChip color={studio.color} live>
            DO · Opens Feb 2027 · Early access
          </StatusChip>
        }
        kicker={studio.seo.kicker}
        title="Agentic Studio"
        line={studio.seo.intro}
        aside={
          <div className="relative pt-14 sm:pl-10 sm:pt-16">
            <div className="absolute right-0 top-0 h-[78%] w-[86%]">
              <StudioPhoto
                src="/images/code-closeup.jpg"
                alt="Close-up of code on a dark monitor, the kind of spec an AI agent builder works from"
                sizes="(min-width: 1024px) 520px, 85vw"
                color={studio.color}
                priority
                kenBurns
                className="size-full rounded-[calc(var(--radius-card)*1.6)] border border-line"
              />
            </div>
          <Reveal className="relative z-10 sm:mr-12">
            <div className="glass overflow-hidden rounded-2xl border border-line shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="font-mono text-[0.7rem] text-muted">agentspec.yaml</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">Illustrative</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-7">
                {SPEC.map(([k, v]) => (
                  <div key={k}>
                    <span className="text-agentic">{k}</span>
                    <span className="text-muted">: </span>
                    <span className="text-ink-2">{v}</span>
                  </div>
                ))}
              </pre>
            </div>
          </Reveal>
          </div>
        }
      >
        <Button href="/early-access" size="lg">
          Join early access <ArrowRight className="size-4" />
        </Button>
        <Button href="/sign-in" variant="secondary" size="lg">
          Sign in
        </Button>
      </PageHero>

      {/* What you build */}
      <Band>
        <SectionHead eyebrow="What you build" title="One agent. One bounded workflow." line="Start with the wedge chosen at G1, then expand by reuse." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studio.builds.map((b, i) => (
            <div key={b.title} className="card p-6">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ADLC + gates */}
      <Band className="border-y border-line bg-surface/40">
        <SectionHead eyebrow="ADLC" title="Ten phases, six gates." line="A gate is a signed decision with linked evidence, not a meeting." />
        <PhaseRail studio={studio} />
        <p className="mt-6 text-sm text-muted">
          <InlineLink href="/how-it-works">The agent development life cycle (ADLC), phase by phase</InlineLink>
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADLC.filter((p) => p.gate && p.gate.code.startsWith("G")).map((p) => (
            <div key={p.n} className="rounded-[var(--radius-card)] border border-line bg-bg/50 p-5">
              <p className="font-mono text-xs text-agentic">
                {p.gate!.code} · after {p.name}
              </p>
              <p className="mt-2 font-medium text-ink">{p.gate!.name}</p>
              <p className="mt-1 text-sm text-muted">{p.gate!.q}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Capabilities */}
      <Band>
        <SectionHead
          eyebrow="Inside the studio"
          title="The platform under every project."
          line={
            <>
              Designed in from day one. See the <InlineLink href="/architecture">platform architecture</InlineLink> and how we handle{" "}
              <InlineLink href="/security">AI agent governance</InlineLink>.
            </>
          }
        />
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-surface p-6 md:p-7">
              <Icon className="size-5 text-agentic" aria-hidden />
              <h3 className="mt-5 font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Artefacts */}
      <Band className="border-t border-line">
        <SectionHead eyebrow="Artefacts" title="Proof you can hand over." line="Every project leaves four records behind." />
        <ArtefactCards />
      </Band>

      {/* Autonomy dial */}
      <Band className="border-y border-line bg-surface/40">
        <SectionHead eyebrow="Autonomy dial" title="Optimal autonomy, not maximum." line="Slide the dial. Each level needs its controls in place first." />
        <AutonomyDial />
      </Band>

      {/* Programme */}
      <Band>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[calc(var(--radius-card)*1.6)] border border-line">
            <div className="absolute inset-0 -z-10">
              <StudioPhoto
                src="/images/students-coding-together.jpg"
                alt="Two learners reviewing code together on a laptop, as an Agentic AI Engineer cohort team does"
                sizes="(min-width: 1240px) 1176px, 95vw"
                color={studio.color}
                position="50% 35%"
                className="size-full"
              />
            </div>
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--bg)_92%,transparent)_0%,color-mix(in_oklab,var(--bg)_70%,transparent)_55%,color-mix(in_oklab,var(--bg)_25%,transparent)_100%)]" />
            <div className="flex flex-col gap-6 p-8 md:min-h-72 md:flex-row md:items-end md:justify-between md:p-12">
              <div>
                <p className="eyebrow text-ink-2">Learn it in a cohort</p>
                <p className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Agentic AI Engineer</p>
              </div>
              <Button href={siteHref("flywheel", "/programmes/agentic-ai-engineer")} variant="secondary">
                View the programme <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Band>

      <QuickAnswers items={AGENTIC_QA}>
        <RelatedLink href={siteHref("flywheel", "/campus-labs/agentic")}>The Agentic Lab on campus</RelatedLink>
        <RelatedLink href="/for-teams">Agentic Studio for enterprise teams</RelatedLink>
        <RelatedLink href="/early-access">Join Agentic Studio early access</RelatedLink>
      </QuickAnswers>

      <CtaBand />
    </>
  );
}
