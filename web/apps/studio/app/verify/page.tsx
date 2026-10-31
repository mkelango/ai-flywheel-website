import type { Metadata } from "next";
import { VerifyLookup } from "@flywheel/ui/components/VerifyLookup";
import { siteHref } from "@flywheel/ui/sites";
import { VERIFY_QA } from "@/lib/answers";
import { QuickAnswers, RelatedLink } from "@/components/Seo";
import { Band, PageHero, StatusChip } from "@/components/ui";

const TITLE = "Verify an Open Badges 3.0 Credential";
const DESCRIPTION = "Check an AI Flywheel credential earned by shipping in Studio. Every level is a signed Open Badges 3.0 badge, recertified yearly. Enter the ID.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/verify" },
  openGraph: { title: `${TITLE} · AI Flywheel Studio`, description: DESCRIPTION, url: "/verify" },
};

const STEPS = [
  { t: "Earned by shipping", d: "Gates signed in Studio become evidence for the level." },
  { t: "Open Badges 3.0", d: "A signed record any employer or client can check." },
  { t: "Recertified yearly", d: "Tools move fast. Each badge shows when it expires." },
];

export default function VerifyPage() {
  return (
    <>
      <PageHero
        crumb="Verify a credential"
        eyebrow={<StatusChip color="#D98B0B">Open Badges 3.0</StatusChip>}
        title="Verify an Open Badges 3.0 credential."
        line="Verify an AI Flywheel credential earned by shipping in Studio. Enter the ID on the badge."
      />
      <Band>
        <div className="max-w-3xl">
          <VerifyLookup site="studio" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.t} className="bg-surface p-5">
                <h2 className="font-semibold text-ink">{s.t}</h2>
                <p className="mt-1.5 text-sm text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Band>
      <QuickAnswers items={VERIFY_QA}>
        <RelatedLink href="/how-it-works">The gates behind every badge</RelatedLink>
        <RelatedLink href="/for-learners">Earn Builder (C3) in a cohort</RelatedLink>
        <RelatedLink href={siteHref("flywheel", "/certifications")}>AI Flywheel certifications</RelatedLink>
      </QuickAnswers>
    </>
  );
}
