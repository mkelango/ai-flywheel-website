import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { STAGES, LEVELS } from "@flywheel/ui/sites";
import { PageHero } from "@/components/ui";
import { CardGrid, CtaBand, DataTable, Dot } from "@/components/orgs/blocks";
import { ENTERPRISE_JOURNEY } from "@/lib/orgs";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/business/enterprise");

export default function EnterprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprises and GCCs"
        title="Enterprise AI training that ships a use case."
        intro="Enterprise AI training for GCCs and large teams in India: five steps, from a capability scan to teams building on Studio."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Enterprises and GCCs" }]}
        aside={
          <HeroPhoto
            photo="openOffice"
            alt="A large open-plan office full of people at desks, the scale of team that enterprise AI training for GCCs serves"
            card={
              <>
                <FloatEyebrow>Reporting</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">People by level and stage.</p>
                <p className="text-xs text-ink-2">Never enrolments.</p>
              </>
            }
          />
        }
      >
        <Button href="/business/check" size="lg">
          Book a Flywheel Check
        </Button>
        <Button href="/programmes/workforce-licence" variant="secondary" size="lg">
          See the workforce licence
        </Button>
      </PageHero>

      <Section id="journey" eyebrow="Five steps" title="Scan. Lead. License. Start. Build.">
        <CardGrid cols={3} items={ENTERPRISE_JOURNEY.map((s, i) => ({ ...s, kicker: `Step ${i + 1}` }))} />
        <p className="mt-4 text-sm text-muted">Prices exclude GST. Invoices with GST.</p>
      </Section>

      <Section id="reporting" eyebrow="Reporting" title="People by level and stage. Never enrolments." intro="The layout of your report. Filled with your data after the Check." className="border-t border-line">
        <DataTable
          minWidth={620}
          head={["Stage", ...LEVELS.map((l) => `${l.code} ${l.name}`)]}
          rows={STAGES.map((s) => [<Dot key={s.key} color={s.color}>{s.name}</Dot>, ...LEVELS.map(() => <span className="text-muted">—</span>)])}
        />
      </Section>


      <QuickAnswers {...ANSWERS["/business/enterprise"]} />

      <CtaBand title="Start with the Flywheel Check." line="A capability scan of your people, with a scored report." href="/business/check" label="Book a Flywheel Check" secondary={{ href: "/business/platform", label: "Platform and security" }} />
    </>
  );
}
