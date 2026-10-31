import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteHref } from "@flywheel/ui/sites";
import { STUDIOS, type StudioKey } from "@/lib/content";
import { STUDIO_QA } from "@/lib/answers";
import { softwareLd } from "@/lib/seo";
import { NotifyForm } from "@/components/Forms";
import { InlineLink, JsonLd, QuickAnswers, RelatedLink } from "@/components/Seo";
import { PhotoStack } from "@/components/Photo";
import { Band, CtaBand, GatePills, MonoLabel, PageHero, PhaseRail, SectionHead, StatusChip, StudioCard, tint } from "@/components/ui";

/** Hero photography per studio (Unsplash License, self-hosted). */
const HERO_PHOTO: Record<string, { src: string; alt: string; position?: string }> = {
  model: { src: "/images/circuit-board.jpg", alt: "Close-up of a circuit board and chips, the hardware the model development life cycle (MDLC) runs on" },
  generative: { src: "/images/generative-light.jpg", alt: "Person in an immersive digital light installation, the kind of media work the generative AI development life cycle covers", position: "50% 45%" },
  robotic: { src: "/images/robotics-lab-engineer.jpg", alt: "Engineer working on a laptop inside a robotics workcell, the bench stage of the robotic development life cycle (RDLC)" },
};

const UPCOMING: StudioKey[] = ["model", "generative", "robotic"];

export const dynamicParams = false;

export function generateStaticParams() {
  return UPCOMING.map((studio) => ({ studio }));
}

type Props = { params: Promise<{ studio: string }> };

const find = (k: string) => (UPCOMING.includes(k as StudioKey) ? STUDIOS.find((s) => s.key === k) : undefined);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = find((await params).studio);
  return s
    ? {
        title: s.seo.title,
        description: s.seo.description,
        alternates: { canonical: s.href },
        openGraph: { title: `${s.seo.title} · AI Flywheel Studio`, description: s.seo.description, url: s.href },
      }
    : {};
}

export default async function StudioPage({ params }: Props) {
  const studio = find((await params).studio);
  if (!studio) notFound();
  const others = STUDIOS.filter((s) => s.key !== studio.key);
  const qa = STUDIO_QA[studio.key as Exclude<StudioKey, "agentic">];

  return (
    <>
      <JsonLd data={softwareLd({ name: studio.name, path: studio.href, description: `${studio.seo.intro} Planned for FY28.` })} />
      <PageHero
        crumb={studio.name}
        color={studio.color}
        eyebrow={
          <StatusChip color={studio.color}>
            {studio.verb} · {studio.stage}
          </StatusChip>
        }
        kicker={studio.seo.kicker}
        title={studio.name}
        line={studio.seo.intro}
        aside={
          <PhotoStack
            {...HERO_PHOTO[studio.key]}
            color={studio.color}
            sizes="(min-width: 1024px) 560px, 90vw"
            priority
            kenBurns
            card={
              <>
                <MonoLabel color={studio.color}>
                  {studio.cycle} · {studio.phases.length} phases
                </MonoLabel>
                <div className="mt-3">
                  <GatePills color={studio.color} />
                </div>
                <p className="mt-3 text-sm text-ink-2">{studio.builds[3].title}</p>
              </>
            }
          />
        }
      >
        <div className="w-full">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em]" style={{ color: tint(studio.color) }}>
            Coming FY28
          </p>
          <NotifyForm studio={studio.name} color={studio.color} />
        </div>
      </PageHero>

      <Band>
        <SectionHead eyebrow="What you'll build" title={`Four records from every ${studio.verb.toLowerCase()} project.`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studio.builds.map((b, i) => (
            <div key={b.title} className="card relative overflow-hidden p-6">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${studio.color}, transparent)` }} />
              <span className="font-mono text-xs" style={{ color: tint(studio.color) }}>
                0{i + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band className="border-y border-line bg-surface/40">
        <SectionHead eyebrow={studio.cycle} title={`${studio.cycleName}.`} line="Twelve phases, six signed gates, G1 to G6." />
        <PhaseRail studio={studio} />
        <p className="mt-6 text-sm text-muted">
          Built in the <InlineLink href={siteHref("flywheel", `/campus-labs/${studio.labSlug}`)}>{studio.lab}</InlineLink> on campus. Same login, same levels, same
          gate discipline as the <InlineLink href="/how-it-works">agent development life cycle</InlineLink>.
        </p>
      </Band>

      <QuickAnswers items={qa}>
        <RelatedLink href={siteHref("flywheel", `/programmes/${studio.programme.slug}`)}>The {studio.programme.title} programme</RelatedLink>
        <RelatedLink href={siteHref("flywheel", `/campus-labs/${studio.labSlug}`)}>The {studio.lab} on campus</RelatedLink>
        <RelatedLink href="/roadmap">When each studio opens</RelatedLink>
      </QuickAnswers>

      <Band className="border-t border-line">
        <SectionHead eyebrow="The other studios" title="One wheel, four studios." />
        <div className="grid gap-4 md:grid-cols-3">
          {others.map((s) => (
            <StudioCard key={s.key} studio={s} compact />
          ))}
        </div>
      </Band>

      <CtaBand title="Start with Agentic Studio." />
    </>
  );
}
