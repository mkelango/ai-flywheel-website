import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/ui";
import { ORG_ID } from "@/lib/seo";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero } from "@/components/ui";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/summit");

const WHAT = [
  { eyebrow: "Opens here", title: "Agentic Studio early access", line: "Agentic Studio opens at the Summit. Teams build on one gateway.", href: siteHref("studio", "/"), cta: "Visit AI Flywheel Studio" },
  { eyebrow: "Colleges", title: "Challenge finals", line: "Inter-college challenges run as one DRIVE turn; finals are held at the Summit.", href: "/challenges", cta: "See the challenges" },
  { eyebrow: "Everyone", title: "Programme to be announced", line: "Sessions, speakers and venue will be published here first.", href: "/contact?tag=professionals", cta: "Register interest" },
];

export default function SummitPage() {
  return (
    <>
      <PageHero
        eyebrow="The Inevitable Summit · Week of 8 February 2027"
        title="The Inevitable Summit 2027: make the impossible inevitable."
        intro="Agentic Studio early access opens at the Summit, and college challenge finals are held there."
        crumbs={[{ label: "Home", href: "/" }, { label: "Summit" }]}
        aside={
          <HeroPhoto
            photo="lectureHall"
            alt="A speaker addressing a packed lecture hall, the kind of room planned for the Inevitable Summit 2027"
            card={
              <>
                <FloatEyebrow>Week of 8 February 2027</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">Agentic Studio early access opens</p>
                <p className="text-xs text-ink-2">Plus college challenge finals</p>
              </>
            }
          />
        }
      >
        <Button href="/contact?tag=professionals" size="lg">
          Register interest
        </Button>
        <Button href="/challenges" variant="secondary" size="lg">
          College challenges
        </Button>
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container-site">
          <ul className="grid gap-4 md:grid-cols-3">
            {WHAT.map((w) => (
              <li key={w.title}>
                <Link href={w.href} className="card card-hover flex h-full flex-col p-6">
                  <p className="eyebrow">{w.eyebrow}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink">{w.title}</h2>
                  <p className="mt-1 text-sm text-ink-2">{w.line}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-ink">
                    {w.cta} <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuickAnswers {...ANSWERS["/summit"]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "The Inevitable Summit 2027",
          description: "Held in the week of 8 February 2027: Agentic Studio early access opens and the inter-college AI challenge finals take place. Programme, speakers and venue to be announced.",
          startDate: "2027-02-08",
          eventStatus: "https://schema.org/EventScheduled",
          url: `${SITE_URL}/summit`,
          organizer: { "@id": ORG_ID },
          location: { "@type": "Place", name: "Venue to be announced" },
        }}
      />
    </>
  );
}
