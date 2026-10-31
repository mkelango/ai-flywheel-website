import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero } from "@/components/ui";
import { CardGrid, CtaBand } from "@/components/orgs/blocks";
import { getLab, LABS } from "@/lib/orgs";
import { getProgramme } from "@/lib/programmes";
import { SEO, pageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/QuickAnswers";
import { FloatEyebrow, HeroPhoto, LAB_PHOTO } from "@/components/photos";

type Props = { params: Promise<{ lab: string }> };

const LAB_ALT: Record<string, string> = {
  agentic: "Two software engineers working at monitors in a light office, the build work of an agentic AI lab for colleges",
  model: "An engineer with a laptop in a data centre corridor, the compute side of an AI model lab for colleges",
  generative: "A person standing inside an immersive digital light installation, the creative edge of a generative AI lab for colleges",
  robotic: "An engineer working on a laptop inside a robotics workcell, as in a robotics lab for engineering colleges",
};

export function generateStaticParams() {
  return LABS.map((l) => ({ lab: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lab = getLab((await params).lab);
  if (!lab) return {};
  return pageMeta(`/campus-labs/${lab.slug}`, {
    title: `${lab.name} · Campus Labs`,
    description: `The ${lab.name} runs ${lab.runs}, opening ${lab.opens}. Best for ${lab.best}. Students reach ${lab.reach}. Set-up quoted per campus.`,
  });
}

export default async function LabPage({ params }: Props) {
  const lab = getLab((await params).lab);
  if (!lab) notFound();
  const prog = getProgramme(lab.programme);

  const facts = [
    { t: "Runs", d: lab.runs, href: siteHref("studio", lab.studioPath) },
    { t: "Best for", d: lab.best },
    { t: "Students reach", d: `${lab.reach}, through ${lab.lifecycle}.` },
    { t: "Built from", d: lab.book },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Campus Labs · ${lab.lifecycle}`}
        title={
          <>
            {lab.name}
            {SEO[`/campus-labs/${lab.slug}`] && (
              <>
                <span className="sr-only"> – </span>
                <span className="mt-3 block font-sans text-lg font-medium leading-snug text-ink-2 md:text-xl">
                  {SEO[`/campus-labs/${lab.slug}`].primary.charAt(0).toUpperCase() + SEO[`/campus-labs/${lab.slug}`].primary.slice(1)}
                </span>
              </>
            )}
          </>
        }
        intro={`An AI lab for your campus that runs ${lab.runs}. Opens ${lab.opens === "FY28" ? "in FY28, with its studio" : lab.opens}. Set-up is quoted per campus.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Campus Labs", href: "/campus-labs" }, { label: lab.name }]}
        aside={
          <HeroPhoto
            photo={LAB_PHOTO[lab.slug] ?? "robotics"}
            alt={LAB_ALT[lab.slug] ?? `Inside the ${lab.name}`}
            card={
              <>
                <span className="mb-3 block h-1 w-10 rounded-pill" style={{ background: lab.color }} aria-hidden />
                <FloatEyebrow>Students reach</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{lab.reach}</p>
                <p className="text-xs text-ink-2">Opens {lab.opens}</p>
              </>
            }
          />
        }
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          Ask for a lab quote
        </Button>
        <Button href={siteHref("studio", lab.studioPath)} variant="secondary" size="lg">
          See {lab.runs.replace(" + hardware", "")} ↗
        </Button>
      </PageHero>

      <Section id="facts" eyebrow="At a glance" title="What the lab is.">
        <div className="mb-6 h-1 w-16 rounded-pill" style={{ background: lab.color }} aria-hidden />
        <CardGrid items={facts} cols={4} />
      </Section>

      <Section id="builds" eyebrow="What students build" title="Evidence for a Builder award." className="border-t border-line">
        <CardGrid items={lab.builds.map((b, i) => ({ t: b, d: `Artefact ${i + 1} of the ${lab.lifecycle} turn.` }))} />
      </Section>

      <QuickAnswers
        title={`The ${lab.name}, answered.`}
        items={[
          {
            q: `What do students build in the ${lab.name}?`,
            a: `Three artefacts from one ${lab.lifecycle} turn in ${lab.runs.replace(" + hardware", "")}: ${lab.builds.map((b) => b.charAt(0).toLowerCase() + b.slice(1)).join("; ")}. Together they are the evidence for ${lab.reach}, alongside one check taken without AI and an oral defence.`,
          },
          {
            q: "Which level do students reach, and what does it cost?",
            a: `Students reach ${lab.reach} through the ${lab.lifecycle}${prog ? `, matched to the ${prog.title} programme` : ""}. The lab is best for ${lab.best.charAt(0).toLowerCase() + lab.best.slice(1)}, and opens ${lab.opens === "FY28" ? "in FY28" : `in ${lab.opens}`}. Set-up is quoted per campus, in rupees, excluding GST.`,
          },
        ]}
      />

      <CtaBand
        title="Open this lab on your campus."
        line={prog ? `Matching programme: ${prog.title}.` : undefined}
        href="/contact?tag=higher-ed"
        label="Book a campus consultation"
        secondary={prog ? { href: `/programmes/${prog.slug}`, label: prog.title } : { href: "/campus-labs", label: "Compare all four labs" }}
      />
    </>
  );
}
