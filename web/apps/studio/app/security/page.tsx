import type { Metadata } from "next";
import { ArrowUpRight, KeyRound, MapPin, ScrollText, Scale, Baby, Power, UserRound } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { KILL_SWITCH } from "@/lib/content";
import { SECURITY_QA } from "@/lib/answers";
import { QuickAnswers, RelatedLink } from "@/components/Seo";
import { Band, CtaBand, PageHero, SectionHead, StatusChip } from "@/components/ui";

const TITLE = "AI Agent Governance and Security";
const DESCRIPTION = "Autonomy limits, a five-level kill switch, SSO via OIDC, a tamper-evident audit log, DPDP readiness and India data residency. Read how.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/security" },
  openGraph: { title: `${TITLE} · AI Flywheel Studio`, description: DESCRIPTION, url: "/security" },
};

const PILLARS = [
  { icon: KeyRound, title: "SSO via OIDC", text: "Sign in through your organisation's identity provider, with SCIM provisioning." },
  { icon: UserRound, title: "An identity per agent", text: "Separate, short-lived agent identities. Nothing long-lived." },
  { icon: MapPin, title: "India data residency", text: "Tenants pinned to a home region: AWS Mumbai (ap-south-1) for India." },
  { icon: ScrollText, title: "Audit log", text: "A hash-chained ledger of every decision, approval and gate." },
  { icon: Scale, title: "DPDP", text: "Built for India's Digital Personal Data Protection rules." },
  { icon: Baby, title: "Child-data rules", text: "Under-18 profiles are school- or teacher-owned, with verifiable parental consent." },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        crumb="Security"
        eyebrow={<StatusChip color="#13827F">Security and trust</StatusChip>}
        kicker="AI agent governance"
        title="Trust, built in."
        line="AI agent governance, built in: your data stays in its region, every action has an owner and every agent can be stopped."
        updated
      >
        <Button href={siteHref("flywheel", "/trust")} variant="secondary" size="lg">
          Trust centre <ArrowUpRight className="size-4" />
        </Button>
      </PageHero>

      <Band>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-surface p-6 md:p-7">
              <Icon className="size-5 text-agentic" aria-hidden />
              <h2 className="mt-5 font-semibold text-ink">{title}</h2>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band className="border-y border-line bg-surface/40">
        <SectionHead eyebrow="Kill switch" title="How do you stop an agent?" line="Five levels, narrowest first. Anyone on the run can stop it; only a human can restore it." />
        <ol className="flex flex-wrap items-center gap-2">
          {KILL_SWITCH.map((lvl, i) => (
            <li key={lvl} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="h-px w-4 bg-line sm:w-8" />}
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg px-4 py-2 font-mono text-sm text-ink">
                <Power className="size-3.5 text-agentic" aria-hidden /> {lvl}
              </span>
            </li>
          ))}
        </ol>
      </Band>

      <Band>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Trust centre", path: "/trust" },
            { title: "Privacy and DPDP", path: "/trust/privacy" },
            { title: "AI Flywheel at Schools", path: "/", site: "schools" as const },
          ].map((l) => (
            <a key={l.title} href={siteHref(l.site ?? "flywheel", l.path)} className="card card-hover group flex items-center justify-between p-6">
              <span className="font-medium text-ink">{l.title}</span>
              <ArrowUpRight className="size-4 text-muted group-hover:text-ink" />
            </a>
          ))}
        </div>
      </Band>

      <QuickAnswers items={SECURITY_QA}>
        <RelatedLink href="/architecture">AI agent platform architecture</RelatedLink>
        <RelatedLink href="/for-teams">SSO and residency for enterprise teams</RelatedLink>
        <RelatedLink href="/for-schools">Teacher-run accounts for under-18s</RelatedLink>
      </QuickAnswers>

      <CtaBand />
    </>
  );
}
