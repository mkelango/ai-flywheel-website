import type { Metadata } from "next";
import { Breadcrumbs } from "@flywheel/ui/components/primitives";
import { EARLY_ACCESS_QA } from "@/lib/answers";
import { SITE_URL } from "@/lib/seo";
import { EarlyAccessForm } from "@/components/Forms";
import { InlineLink, QuickAnswers, RelatedLink } from "@/components/Seo";
import { Glow, StatusChip } from "@/components/ui";

const TITLE = "Agentic Studio Early Access, Feb 2027";
const DESCRIPTION = "Be first into Agentic Studio when it opens at the Inevitable Summit, week of 8 February 2027. One email when it opens. Join the list.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/early-access" },
  openGraph: { title: `${TITLE} · AI Flywheel Studio`, description: DESCRIPTION, url: "/early-access" },
};

export default function EarlyAccessPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Glow colors={["#D98B0B", "#B8306F"]} />
        <div className="container-site relative grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-6">
              <Breadcrumbs base={SITE_URL} items={[{ label: "Studio", href: "/" }, { label: "Early access" }]} />
            </div>
            <StatusChip color="#D98B0B" live>
              Opens Feb 2027
            </StatusChip>
            <h1 className="text-gradient mt-6 font-display text-5xl font-semibold leading-[1.02] md:text-6xl">Join Agentic Studio early access.</h1>
            <p className="mt-5 max-w-md text-lg text-ink-2">
              Agentic Studio early access opens at the Inevitable Summit, week of 8 February 2027. Model, Generative and Robotic follow in FY28.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li>· One email when your studio opens.</li>
              <li>· No marketing to under-18s, ever.</li>
              <li>
                · Schools join through <InlineLink href="/for-schools">teacher-run accounts</InlineLink>.
              </li>
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <div className="glass rounded-2xl border border-line p-6 md:p-10">
              <EarlyAccessForm />
            </div>
          </div>
        </div>
      </section>
      <QuickAnswers items={EARLY_ACCESS_QA}>
        <RelatedLink href="/agentic">What you build in Agentic Studio</RelatedLink>
        <RelatedLink href="/roadmap">Studio roadmap, Feb 2027 to FY28</RelatedLink>
        <RelatedLink href="/faq">Studio FAQ</RelatedLink>
      </QuickAnswers>
    </>
  );
}
