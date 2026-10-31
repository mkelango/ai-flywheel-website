import type { Metadata } from "next";
import { ArrowRight, FileText, Scale, ListChecks, UserCheck, Siren, ShieldCheck } from "lucide-react";
import { Container, SmartLink } from "@flywheel/ui/components/primitives";
import { PageHero, SafetyPromise } from "@/components/blocks";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/trust");

const DOCS = [
  { I: FileText, t: "Privacy notice for children", l: "What we collect, why, and for how long. Written for parents, with a version children can read.", href: "/trust/children-privacy" },
  { I: Scale, t: "Data processing terms for schools", l: "The school decides; we process. Our role as the school’s data processor.", href: "/trust/processing-terms" },
  { I: ListChecks, t: "AI feature register", l: "Every AI feature, the classes it is for, the data it uses and who stays in charge.", href: "/trust/ai-register" },
  { I: UserCheck, t: "Grievance officer", l: "A named person who answers within the time the law sets.", href: "/trust/grievance" },
  { I: Siren, t: "Incident contact", l: "How to report a concern, and how we tell schools and parents.", href: "/trust/grievance" },
  { I: ShieldCheck, t: "Consent flow", l: "The school invites, the parent verifies by OTP, then the account is made. Parents can view, download or delete.", href: "/parents/safety" },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Trust centre" }]}
        eyebrow="Trust centre for schools"
        title="Child data privacy for schools, said plainly."
        intro="Child data privacy for schools, built for the DPDP Act’s duties for children’s data. Full documents are published after legal review."
        updated
      />
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOCS.map(({ I, t, l, href }) => (
              <SmartLink key={t} href={href} className="card card-hover flex flex-col p-6">
                <I className="size-7 text-ink" aria-hidden />
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">{t}</h2>
                <p className="mt-1.5 flex-1 text-muted">{l}</p>
                <span className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex w-fit rounded-pill bg-surface-2 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-2">Published after legal review</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                    Read the draft <ArrowRight className="size-4" aria-hidden />
                  </span>
                </span>
              </SmartLink>
            ))}
          </div>
          <div className="mt-8 rounded-[var(--radius-card)] bg-surface-2/70 p-6 text-ink-2">
            <p className="font-semibold text-ink">How this site keeps the promise</p>
            <p className="mt-1">No analytics, cookies or third-party scripts. Forms ask for adult details only. Every page that shows children’s work passes a privacy check before it is published.</p>
          </div>
        </Container>
      </section>
      <SafetyPromise />
      <QuickAnswers items={ANSWERS["/trust"]} eyebrow="Questions parents and schools ask" />
      <RelatedLinks
        links={[
          { href: "/parents/safety", label: "Is AI safe for children?" },
          { href: "/trust/children-privacy", label: "Children’s privacy notice" },
          { href: "/trust/grievance", label: "Grievance officer" },
        ]}
      />
    </>
  );
}
