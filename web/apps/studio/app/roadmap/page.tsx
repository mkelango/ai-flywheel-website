import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button, SmartLink } from "@flywheel/ui/components/primitives";
import { STUDIOS } from "@/lib/content";
import { siteHref } from "@flywheel/ui/sites";
import { ROADMAP_QA } from "@/lib/answers";
import { QuickAnswers, RelatedLink } from "@/components/Seo";
import { Band, CtaBand, PageHero, SectionHead, StatusChip, tint } from "@/components/ui";

const TITLE = "Studio Roadmap: Feb 2027 to FY28";
const DESCRIPTION = "Agentic Studio opens week of 8 Feb 2027. Model, Generative and Robotic Studio follow in FY28 with their Campus Labs. See what ships when.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/roadmap" },
  openGraph: { title: `${TITLE} · AI Flywheel Studio`, description: DESCRIPTION, url: "/roadmap" },
};

type Status = "Early access" | "Planned";

type Milestone = {
  when: string;
  status: Status;
  color: string;
  title: string;
  line: string;
  items?: { label: string; href?: string; color: string; note: string }[];
};

const [agentic, model, generative, robotic] = ["agentic", "model", "generative", "robotic"].map((k) => STUDIOS.find((s) => s.key === k)!);

const MILESTONES: Milestone[] = [
  {
    when: "Now",
    status: "Early access",
    color: agentic.color,
    title: "Studio home and the early-access list",
    line: "Join the list now; one email when Agentic Studio opens.",
  },
  {
    when: "Week of 8 Feb 2027",
    status: "Early access",
    color: agentic.color,
    title: "Agentic Studio opens at the Inevitable Summit",
    line: "Early access, with single sign-on and credential verification across all three sites.",
    items: [{ label: agentic.name, href: agentic.href, color: agentic.color, note: `${agentic.verb} · ${agentic.cycle}` }],
  },
  {
    when: "After the Summit",
    status: "Planned",
    color: agentic.color,
    title: "First Agentic AI Engineer cohort",
    line: "The 12-week cohort that builds one agent release, G1 to G6, in Agentic Studio.",
  },
  {
    when: "FY28",
    status: "Planned",
    color: model.color,
    title: "Model, Generative and Robotic Studio",
    line: "The other three studios open in turn, each with its own life cycle and the same six gates.",
    items: [model, generative, robotic].map((s) => ({ label: s.name, href: s.href, color: s.color, note: `${s.verb} · ${s.cycle}` })),
  },
  {
    when: "FY28",
    status: "Planned",
    color: robotic.color,
    title: "Campus Labs ship with their studios",
    line: "A Lab is the room; the Studio is the software. Each Lab opens with the studio it runs.",
    items: STUDIOS.map((s) => ({ label: s.lab, color: s.color, note: `Runs ${s.name}` })),
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        crumb="Roadmap"
        eyebrow={<StatusChip color={agentic.color} live>Roadmap</StatusChip>}
        kicker="AI Flywheel Studio roadmap"
        title="Agentic first. Then the wheel."
        line="The AI Flywheel Studio roadmap shows only the dates we have committed to. Nothing beyond them."
        updated
      >
        <Button href="/early-access" size="lg">
          Join early access <ArrowRight className="size-4" />
        </Button>
      </PageHero>

      <Band>
        <SectionHead eyebrow="Timeline" title="From early access to four studios." line="Phase 1 runs to the Summit. Phase 2 is FY28." />
        <ol className="relative max-w-3xl">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-agentic via-foundation to-physical opacity-60" />
          {MILESTONES.map((m, i) => (
            <li key={m.title} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden
                className={`absolute left-0 top-1.5 size-[15px] rounded-full border-2 ${m.status === "Early access" ? "pulse-soft" : ""}`}
                style={{ borderColor: m.color, background: m.status === "Early access" ? m.color : "var(--bg)" }}
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: tint(m.color, 60) }}>
                  {m.when}
                </span>
                <StatusChip color={m.status === "Early access" ? agentic.color : "#8b94a5"} live={m.status === "Early access" && i === 1}>
                  {m.status}
                </StatusChip>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink md:text-2xl">{m.title}</h3>
              <p className="mt-2 text-muted">{m.line}</p>
              {m.items && (
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {m.items.map((it) => {
                    const body = (
                      <>
                        <span className="size-2 shrink-0 rounded-full" style={{ background: it.color }} />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-ink">{it.label}</span>
                          <span className="block font-mono text-[0.68rem] text-muted">{it.note}</span>
                        </span>
                      </>
                    );
                    const cls = "flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3";
                    return (
                      <li key={it.label}>
                        {it.href ? (
                          <SmartLink href={it.href} className={`${cls} card-hover`}>
                            {body}
                          </SmartLink>
                        ) : (
                          <div className={cls}>{body}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Band>

      <QuickAnswers items={ROADMAP_QA}>
        <RelatedLink href="/agentic">Agentic Studio, opening first</RelatedLink>
        <RelatedLink href="/for-campuses">Campus AI lab software</RelatedLink>
        <RelatedLink href={siteHref("flywheel", "/summit")}>The Inevitable Summit</RelatedLink>
      </QuickAnswers>

      <CtaBand />
    </>
  );
}
