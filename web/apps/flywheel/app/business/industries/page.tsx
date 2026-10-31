import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { CardGrid, CtaBand } from "@/components/orgs/blocks";
import { INDUSTRIES } from "@/lib/orgs";
import { STAGE_META } from "@/lib/programmes";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/business/industries");

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="AI use cases by industry: a first one for your sector."
        intro="AI use cases by industry in India: nine sectors, each naming where to start and which track to take."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Industries" }]}
        aside={
          <HeroPhoto
            photo="planning"
            alt="A hand pinning a card to a project planning board while mapping AI use cases by industry"
            card={
              <>
                <FloatEyebrow>Nine industries</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">One first use case each.</p>
                <p className="text-xs text-ink-2">And the track to get there</p>
              </>
            }
          />
        }
      >
        <Button href="/business/check" size="lg">
          Book a Flywheel Check
        </Button>
      </PageHero>

      <Section id="list" eyebrow="Nine industries" title="Pick yours.">
        <CardGrid
          items={INDUSTRIES.map((i) => ({
            t: i.name,
            d: i.useCase,
            href: `/business/industries/${i.slug}`,
            color: STAGE_META[i.stage].color,
            kicker: STAGE_META[i.stage].short,
          }))}
        />
      </Section>

      <CtaBand title="Not listed? Start with the Check." href="/business/check" label="Book a Flywheel Check" />
    </>
  );
}
