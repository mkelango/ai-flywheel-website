import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, BadgeCheck, RefreshCw, ShieldCheck } from "lucide-react";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { LEVELS } from "@flywheel/ui/sites";
import { CREDENTIAL_MAP } from "@/lib/learn";
import { PageHero } from "@/components/ui";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/certifications");

const FACTS = [
  { icon: BadgeCheck, title: "Open Badges 3.0", text: "A portable, standard badge that shows your level and stage." },
  { icon: ShieldCheck, title: "Public verify page", text: "Employers enter the badge ID and see who holds it, and when it was issued." },
  { icon: RefreshCw, title: "Recertify yearly", text: "AI changes fast. Recertify every year to keep the level current." },
];

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications"
        title="Verifiable AI certificates for work, not attendance."
        intro="Every verifiable AI certificate here is one of five levels, held separately in each stage. No level without an artefact from real work and one check taken without AI."
        crumbs={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
        updated
        aside={
          <HeroPhoto
            photo="highFive"
            alt="Two professionals high-fiving across a meeting table, celebrating finished work"
            card={
              <>
                <span className="mb-3 block h-1 w-10 rounded-pill bg-agentic" aria-hidden />
                <FloatEyebrow>Open Badges 3.0 · sample</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold text-ink">Builder (C3)</p>
                <p className="text-xs text-ink-2">Agentic AI Engineer · verify page included</p>
              </>
            }
          />
        }
      >
        <Button href="/certifications/exams">How assessment works</Button>
        <Button href="/verify" variant="secondary">
          Verify a credential
        </Button>
      </PageHero>

      <Section eyebrow="The ladder" title="C1 to C5." intro="Each rung names the evidence it takes.">
        <ol className="grid gap-3 md:grid-cols-5">
          {LEVELS.map((l) => (
            <li key={l.code}>
              <Link href={`/programmes/level/${l.code.toLowerCase()}`} className="card card-hover flex h-full flex-col p-5">
                <span className="font-mono text-sm font-semibold text-primary-hover">{l.code}</span>
                <span className="mt-1 font-display text-xl font-semibold text-ink">{l.name}</span>
                <span className="mt-2 text-sm text-ink-2">{l.line}</span>
                <span className="mt-auto pt-4 text-xs text-muted">Evidence: {l.evidence}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="One ladder replaces two" title="Live certificates, mapped." intro="If you hold an L1 to L4 certificate today, this is the level it becomes." className="border-t border-line">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="hidden border-b border-line font-mono text-[0.7rem] uppercase tracking-wider text-muted md:table-header-group">
              <tr>
                <th className="px-4 py-3 font-medium">Live today</th>
                <th className="px-4 py-3 font-medium">Becomes</th>
                <th className="px-4 py-3 font-medium">Earned by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {CREDENTIAL_MAP.map((r) => (
                <tr key={r.becomes} className="grid gap-1 px-4 py-3 md:table-row md:p-0">
                  <td className={`font-mono text-xs uppercase tracking-wider md:px-4 md:py-3 ${r.live === "New" ? "text-primary-hover" : "text-muted"}`}>{r.live}</td>
                  <td className="font-medium text-ink md:px-4 md:py-3">{r.becomes}</td>
                  <td className="text-ink-2 md:px-4 md:py-3">{r.earnedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Your credential" title="Proof an employer can check." className="border-t border-line">
        <div className="grid gap-4 md:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.title} className="card p-6">
              <f.icon className="size-5 text-primary-hover" aria-hidden />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{f.text}</p>
            </div>
          ))}
        </div>
        <Link href="/portfolio" className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
          See how your portfolio holds them <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Section>

      <QuickAnswers {...ANSWERS["/certifications"]} />
    </>
  );
}
