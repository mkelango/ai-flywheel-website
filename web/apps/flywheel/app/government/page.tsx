import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero } from "@/components/ui";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/government");

const OFFERS: { offer: string; what: string; href?: string; external?: boolean }[] = [
  { offer: "Civil service programme", what: "C1 in all four stages and C3 Builder in CORE, in Tamil and English. Delivered alongside iGOT Karmayogi, not competing with it.", href: "/government/civil-service" },
  { offer: "Chief AI Officer programme", what: "C5 track: council, hub, census and Handoff Map (Foundation Playbook, Chapter 46).", href: "/government/chief-ai-officer" },
  { offer: "Public-sector use-case clinic", what: "Departments bring a service; teams run one DRIVE turn with CORE gates.", href: "/government/use-case-clinic" },
  { offer: "The Economy Program", what: "State scale: a public count of Builders by stage, in place of enrolment numbers.", href: "/government/economy-program" },
  { offer: "Mission schools", what: "School delivery runs on AI Flywheel at Schools.", href: siteHref("schools", "/"), external: true },
];

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Flywheel for Government"
        title="AI for government: capability you can count."
        intro="AI for government departments in India: skill officers by stage and level, train chief AI officers, and deliver AI services under clear governance."
        crumbs={[{ label: "Home", href: "/" }, { label: "Government" }]}
        aside={
          <HeroPhoto
            photo="meetingNotes"
            alt="People taking notes in a meeting at a long wooden table, planning AI for government departments in India"
            card={
              <>
                <FloatEyebrow>Reporting</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">People by level, not course enrolments.</p>
                <p className="text-xs text-ink-2">In Tamil and English</p>
              </>
            }
          />
        }
      >
        <Button href="/contact?tag=government" size="lg">
          Talk to the government team
        </Button>
        <Button href="/mission-2047" variant="secondary" size="lg">
          Read Mission 2047
        </Button>
      </PageHero>

      <Section id="offers" eyebrow="Offers" title="Report people by level, not course enrolments." className="scroll-mt-20">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line font-mono text-[0.7rem] uppercase tracking-wider text-muted">
              <tr>
                <th className="w-1/3 px-5 py-3 font-medium">Offer</th>
                <th className="px-5 py-3 font-medium">What it is</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {OFFERS.map((o) => (
                <tr key={o.offer} className="align-top">
                  <th scope="row" className="px-5 py-4 font-display text-base font-semibold text-ink">
                    {o.href ? (
                      o.external ? (
                        <a href={o.href} className="hover:text-primary-hover">
                          {o.offer} ↗
                        </a>
                      ) : (
                        <Link href={o.href} className="hover:text-primary-hover">
                          {o.offer} →
                        </Link>
                      )
                    ) : (
                      o.offer
                    )}
                  </th>
                  <td className="px-5 py-4 text-ink-2">{o.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <section id="buying" className="scroll-mt-20 border-t border-line py-16 md:py-20">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <p className="eyebrow">Buying</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">GeM, empanelment and MoU routes.</h2>
            <p className="mt-2 text-muted">Formats suited to a tender.</p>
            <Link href="/government/buying" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-ink hover:text-primary-hover">
              How buying works →
            </Link>
          </div>
          <div className="rounded-[var(--radius-card)] bg-surface-2 p-8">
            <p className="eyebrow">Non-partisan</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">We name programmes and departments.</h2>
            <p className="mt-2 text-muted">Never people or parties.</p>
          </div>
        </div>
      </section>

      <QuickAnswers {...ANSWERS["/government"]} />
    </>
  );
}
