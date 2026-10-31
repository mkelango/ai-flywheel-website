import type { Metadata } from "next";
import Link from "next/link";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { siteHref, SITES } from "@flywheel/ui/sites";
import { TRUST_PAGES } from "@/lib/company";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/research/CtaBand";

export const metadata: Metadata = {
  title: "Trust centre",
  description: "Privacy (DPDP and GDPR), responsible AI, security and data sovereignty at AI Flywheel, in one place.",
  alternates: { canonical: "/trust" },
};

const FACTS = [
  { t: "Data in India", d: "AWS Mumbai region (Proposed)." },
  { t: "One login", d: "OIDC single sign-on (Proposed)." },
  { t: "Audit log", d: "Exportable for your auditors (Proposed)." },
  { t: "Consent first", d: "Analytics only after you agree." },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust centre"
        title="What we do with your data, and with AI."
        intro="Four pages, one standard: never a claim without evidence. Items not yet live are marked Proposed."
        crumbs={[{ label: "Home", href: "/" }, { label: "Trust centre" }]}
      />

      <Section eyebrow="At a glance" title="The short version.">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.t} className="rounded-xl bg-surface-2 p-5">
              <dt className="font-semibold text-ink">{f.t}</dt>
              <dd className="mt-1 text-sm text-muted">{f.d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="The four pages" title="Read the detail." className="border-t border-line">
        <ul className="grid gap-4 sm:grid-cols-2">
          {TRUST_PAGES.map((p) => (
            <li key={p.slug}>
              <Link href={`/trust/${p.slug}`} className="card card-hover group block h-full p-6">
                <p className="eyebrow">{p.label}</p>
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink group-hover:text-primary-hover">{p.title}</p>
                <p className="mt-2 text-sm text-muted">{p.intro}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand eyebrow="Children's data" title="Schools have stricter rules." line={`No tracking on ${SITES.schools.name}. Forms there collect adult details only.`}>
        <Button href={siteHref("schools", "/trust")}>Schools trust centre ↗</Button>
        <Button href="/contact?tag=business" variant="secondary">
          Ask a question
        </Button>
      </CtaBand>
    </>
  );
}
