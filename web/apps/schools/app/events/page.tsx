import type { Metadata } from "next";
import { CalendarDays, Users } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { Sparkle } from "@/components/art";
import { Timeline } from "@/components/offer/Timeline";
import { EVENTS, SCHOOL_CALENDAR } from "@/lib/offer";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/events");

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        eyebrow="Events for partner schools"
        title="Flywheel Day and the inter-school AI challenge."
        intro="Three events a year for partner schools: Flywheel Day at your school, an inter-school AI challenge, and a showcase at the end of the year. Included in every partnership."
        actions={<Button href="/partnership">What a partnership includes</Button>}
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {EVENTS.map((e, i) => (
              <Reveal key={e.key} delay={i * 0.08} className="card relative h-full overflow-hidden">
                <div className="relative p-6" style={{ background: e.tint }}>
                  <Sparkle className="absolute right-5 top-5 size-6 float-a" color="var(--ink)" />
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-2">Event {i + 1}</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{e.name}</h2>
                </div>
                <div className="space-y-3 p-6">
                  <p className="text-lg text-ink">{e.line}</p>
                  <p className="flex items-center gap-2 text-ink-2">
                    <Users className="size-4 shrink-0" aria-hidden /> {e.who}
                  </p>
                  <p className="flex items-center gap-2 text-muted">
                    <CalendarDays className="size-4 shrink-0" aria-hidden /> {e.when}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
            <StatusTag status="Proposed" /> Dates are set each June with partner schools. Photos only with written consent; first name and class only.
          </p>
        </Container>
      </section>

      <section id="calendar" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="The school year" title="We plan around your calendar." line="The June academic year is decided in January. Planning starts now." />
          <Timeline items={SCHOOL_CALENDAR.map((c) => ({ when: c.months, title: c.what, detail: c.detail }))} />
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/events"]} />
      <RelatedLinks
        links={[
          { href: "/programmes/builders-club", label: "AI and robotics club for Classes 9–12" },
          { href: "/stories", label: "AI in schools: school stories" },
          { href: "/partnership", label: "School Flywheel Partnership" },
        ]}
      />
      <DemoBand title="Plan next year’s Flywheel Day." line="Start with a demo this term. 45 minutes, no obligation." />
    </>
  );
}
