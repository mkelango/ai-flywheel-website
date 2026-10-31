import type { Metadata } from "next";
import { Activity, ArrowRight, Boxes, DoorOpen, KeyRound, ListChecks, MapPin, ScrollText, Split } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { ARCHITECTURE_QA } from "@/lib/answers";
import { InlineLink, QuickAnswers, RelatedLink } from "@/components/Seo";
import { Band, CtaBand, PageHero, SectionHead, StatusChip, tint, wash } from "@/components/ui";

const TITLE = "AI Agent Platform Architecture";
const DESCRIPTION = "Nine layers, one gateway, a microVM per run, an eval service, a trace per run and a hash-chained ledger. India residency on AWS Mumbai.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/architecture" },
  openGraph: { title: `${TITLE} · AI Flywheel Studio`, description: DESCRIPTION, url: "/architecture" },
};

const AMBER = "#D98B0B";

/** Nine layers (Technical Architecture, 1.8 and 3.1). Layers 3 and 4 are the agentic core. */
const LAYERS = [
  { n: 1, name: "Experience and surfaces", line: "Mission Control on web, mobile, chat, IDE and CLI; an Approvals Inbox." },
  { n: 2, name: "Channels and gateway", line: "API gateway, Intent Gateway and a signed A2A endpoint." },
  { n: 3, name: "Orchestration", line: "Conductor workflows that encode the ADLC; Wave Engine; Gate Service.", core: true },
  { n: 4, name: "Agent runtime", line: "Digital workers from AgentSpecs, each run in a sandbox and worktree.", core: true },
  { n: 5, name: "Tools and integration", line: "Connector Fabric: MCP gateway, connector registry, token vault." },
  { n: 6, name: "Memory and state", line: "Working, session, episodic, semantic and procedural memory." },
  { n: 7, name: "Knowledge and data", line: "System Twin: census, code graph, ontology; Replay Bench datasets." },
  { n: 8, name: "Models", line: "Model Mesh: routing by task class, fallbacks, guard models." },
  { n: 9, name: "Infrastructure", line: "Kubernetes on AWS, GCP or Azure, all defined as code." },
];

/** Four planes that cut across every layer (Technical Architecture, Table 12). */
const PLANES = [
  { name: "Identity and access", line: "An identity per worker; short-lived tokens.", color: "#3B4BA8" },
  { name: "Trust and governance", line: "Policy, gates, ledger, kill switch.", color: "#B8306F" },
  { name: "Observability and evals", line: "A trace per step; the Eval Service.", color: AMBER },
  { name: "Cost and FinOps", line: "Budgets per tenant and run.", color: "#13827F" },
];

const BLOCKS = [
  { icon: DoorOpen, tag: "Layer 2", title: "Gateway", text: "Every request enters through one gateway and is clarified into a spec." },
  { icon: Boxes, tag: "Layer 4", title: "Runtime", text: "One microVM per run, never reused across tenants." },
  { icon: ListChecks, tag: "Evals", title: "Eval Service", text: "Quality gates, a Replay Bench and an Evidence Pack per release." },
  { icon: Activity, tag: "Observability", title: "Tracing", text: "Every step traced with worker identity, model, prompt version, cost and outcome." },
  { icon: ScrollText, tag: "Governance", title: "Policy and register", text: "Limits live in the Policy Engine, never the prompt; an append-only, hash-chained Trust Ledger." },
  { icon: Split, tag: "Tenancy", title: "Tenant isolation", text: "Tenant context comes from the verified token, never the prompt." },
  { icon: MapPin, tag: "Residency", title: "Data residency", text: "A tenant is pinned to a home region; AWS Mumbai (ap-south-1) for India." },
  { icon: KeyRound, tag: "Identity", title: "SSO", text: "Your identity provider via OIDC, with SCIM for joiners and leavers." },
];

const DEPLOY = [
  { name: "Control Plane", does: "Decides and records", holds: "Metadata, policy, gates, the ledger" },
  { name: "Execution Plane", does: "Acts and holds content", holds: "Sandboxes, tenant content, traces" },
  { name: "Customer systems", does: "Reached only through the Connector Fabric", holds: "Repos, SaaS, clouds" },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        crumb="Architecture"
        color={AMBER}
        eyebrow={<StatusChip color={AMBER}>Platform · Agentic Studio</StatusChip>}
        kicker="AI agent platform architecture"
        title="Nine layers. Four planes."
        line="The AI agent platform architecture behind Agentic Studio. A published design, ahead of opening in February 2027."
        updated
      >
        <Button href="/security" variant="secondary" size="lg">
          Security and trust <ArrowRight className="size-4" />
        </Button>
      </PageHero>

      {/* Layered diagram */}
      <Band>
        <SectionHead eyebrow="The stack" title="Every layer reports to every plane." line="Each boundary between layers is a written contract." />
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <ol className="grid gap-2" aria-label="Nine layers">
            {LAYERS.map((l) => (
              <li
                key={l.n}
                className="relative flex items-start gap-4 overflow-hidden rounded-lg border bg-surface px-4 py-3 sm:items-center"
                style={{ borderColor: l.core ? wash(AMBER, 55) : "var(--line)", background: l.core ? `linear-gradient(90deg, ${wash(AMBER, 14)}, var(--surface))` : undefined }}
              >
                <span className="w-6 shrink-0 font-mono text-xs" style={{ color: l.core ? tint(AMBER, 60) : "var(--muted)" }}>
                  {String(l.n).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
                  <p className="font-medium text-ink sm:w-52 sm:shrink-0">{l.name}</p>
                  <p className="text-sm text-muted">{l.line}</p>
                </div>
                {l.core && (
                  <span className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] lg:inline" style={{ color: tint(AMBER, 60) }}>
                    Agentic core
                  </span>
                )}
              </li>
            ))}
          </ol>

          {/* Planes: vertical bars on desktop, a band on mobile */}
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Four planes">
            {PLANES.map((p) => (
              <li
                key={p.name}
                className="flex flex-col justify-between gap-2 rounded-lg border p-3 md:w-[4.25rem] md:items-center md:py-5"
                style={{ borderColor: wash(p.color, 45), background: `linear-gradient(180deg, ${wash(p.color, 18)}, ${wash(p.color, 4)})` }}
              >
                <span className="size-2 rounded-full" style={{ background: p.color }} />
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink md:rotate-180 md:[writing-mode:vertical-rl]">{p.name}</span>
                <span className="text-xs text-muted md:hidden">{p.line}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-muted">Layers 3 and 4, orchestration and the agent runtime, are the agentic core.</p>
      </Band>

      {/* Building blocks */}
      <Band className="border-y border-line bg-surface/40">
        <SectionHead eyebrow="Building blocks" title="The parts you'll rely on." line="One line each. The detail lives in the architecture pack." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BLOCKS.map(({ icon: Icon, tag, title, text }) => (
            <div key={title} className="card p-6">
              <div className="flex items-center justify-between gap-3">
                <Icon className="size-5 text-agentic" aria-hidden />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{tag}</span>
              </div>
              <h3 className="mt-6 font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Deployment planes */}
      <Band>
        <SectionHead eyebrow="Deployment" title="Where does your content live?" line="Prompts carrying your code and data never pass through the Control Plane." />
        <ol className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {DEPLOY.map((d, i) => (
            <li key={d.name} className="contents">
              {i > 0 && (
                <span aria-hidden className="flex items-center justify-center text-muted">
                  <span className="h-6 w-px bg-line md:h-px md:w-8" />
                </span>
              )}
              <div className={`card p-6 ${i === 1 ? "border-primary/50" : ""}`}>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em]" style={{ color: i === 1 ? tint(AMBER, 60) : "var(--muted)" }}>
                  {d.does}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{d.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{d.holds}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted">
          Four deployment views, chosen per tenant: multi-tenant SaaS, dedicated, your cloud, or on-premises. Read about{" "}
          <InlineLink href="/security">India data residency and the kill switch</InlineLink>.
        </p>
      </Band>

      <QuickAnswers items={ARCHITECTURE_QA}>
        <RelatedLink href="/security">AI agent governance and security</RelatedLink>
        <RelatedLink href="/how-it-works">Where evals sit in the ADLC</RelatedLink>
        <RelatedLink href="/for-teams">The platform for enterprise teams</RelatedLink>
      </QuickAnswers>

      <CtaBand />
    </>
  );
}
