import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button, SmartLink } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { AUDIENCES, STUDIOS, type AudienceKey } from "@/lib/content";
import { AUDIENCE_QA } from "@/lib/answers";
import { Band, CtaBand, GatePills, MonoLabel, PageHero, StatusChip, StudioCard, tint } from "@/components/ui";
import { PhotoStack } from "@/components/Photo";
import { QuickAnswers, RelatedLink } from "@/components/Seo";

const href = (l: { href: string; site?: "flywheel" | "schools" }) => (l.site ? siteHref(l.site, l.href) : l.href);

const AMBER = "#D98B0B";

/** Floating checklist for a hero photo card. Items are existing copy. */
function Checklist({ label, items }: { label: string; items: string[] }) {
  return (
    <>
      <MonoLabel color={AMBER}>{label}</MonoLabel>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="size-3.5 shrink-0 text-agentic" strokeWidth={3} aria-hidden />
            {i}
          </li>
        ))}
      </ul>
    </>
  );
}

/** Hero photography per audience (Unsplash License, self-hosted) and a floating card from existing copy. */
const HERO: Record<AudienceKey, { src: string; alt: string; position?: string; card: ReactNode }> = {
  learners: {
    src: "/images/students-coding-together.jpg",
    alt: "Two young professionals reviewing code on a laptop in a busy workspace, the way a cohort team works to build AI agents",
    position: "50% 35%",
    card: (
      <>
        <MonoLabel color={AMBER}>Gates inside the cohort</MonoLabel>
        <div className="mt-3">
          <GatePills codes={["G1", "G2", "G3", "G4", "G5"]} />
        </div>
        <p className="mt-3 text-sm text-ink-2">G6 at a week-16 review.</p>
      </>
    ),
  },
  campuses: {
    src: "/images/robotics-lab-engineer.jpg",
    alt: "Engineer working on a laptop inside a robotics workcell, the kind of room campus AI lab software runs in",
    card: (
      <>
        <MonoLabel color={AMBER}>A Lab runs a Studio</MonoLabel>
        <ul className="mt-3 space-y-1.5 text-sm">
          {STUDIOS.map((s) => (
            <li key={s.key} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-ink-2">
                <span aria-hidden className="size-2 rounded-full" style={{ background: s.color }} />
                {s.lab}
              </span>
              <span className="font-mono text-[0.68rem]" style={{ color: tint(s.color, 60) }}>
                {s.statusShort}
              </span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  teams: {
    src: "/images/engineers-at-desks.jpg",
    alt: "Two software engineers working at monitors in an office, the people who build on an enterprise AI agent platform",
    card: <Checklist label="One governed gateway" items={["One identity", "One policy", "One trace", "SSO via OIDC"]} />,
  },
  schools: {
    src: "/images/robot-reading.jpg",
    alt: "Humanoid robot sitting on a wooden bench, reading a book",
    position: "50% 40%",
    card: <Checklist label="Student accounts" items={["Teacher-owned", "Verifiable parental consent", "Moves at 18, with consent"]} />,
  },
};

export const audience = (k: AudienceKey) => AUDIENCES.find((a) => a.key === k)!;

/** Unique title and description per audience page, from the keyword map. */
export const audienceMetadata = (k: AudienceKey): Metadata => {
  const a = audience(k);
  return { title: a.seo.title, description: a.seo.description, alternates: { canonical: a.href }, openGraph: { title: `${a.seo.title} · AI Flywheel Studio`, description: a.seo.description, url: a.href } };
};

/** One short template for /for-learners, /for-campuses, /for-teams and /for-schools. */
export function AudiencePage({ k }: { k: AudienceKey }) {
  const a = audience(k);
  const external = (l: { site?: string }) => Boolean(l.site);
  const { card, ...photo } = HERO[k];
  return (
    <>
      <PageHero crumb={a.label} eyebrow={<StatusChip color="#D98B0B">{a.eyebrow}</StatusChip>} kicker={a.seo.kicker}
        title={a.title}
        line={a.line}
        aside={<PhotoStack {...photo} sizes="(min-width: 1024px) 560px, 90vw" priority kenBurns card={card} />}
      >
        <Button href={href(a.cta)} size="lg">
          {a.cta.label} {external(a.cta) ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
        </Button>
        {a.secondary && (
          <Button href={href(a.secondary)} variant="secondary" size="lg">
            {a.secondary.label} {external(a.secondary) && <ArrowUpRight className="size-4" />}
          </Button>
        )}
      </PageHero>

      <Band>
        <ul className="grid gap-4 md:grid-cols-3">
          {a.points.map((p) => (
            <li key={p.title} className="card p-6">
              <span className="grid size-8 place-items-center rounded-lg bg-highlight text-agentic">
                <Check className="size-4" strokeWidth={3} aria-hidden />
              </span>
              <h2 className="mt-6 text-lg font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Band>

      <QuickAnswers items={AUDIENCE_QA[k]}>
        {a.related.map((l) => (
          <RelatedLink key={l.label} href={href(l)}>
            {l.label}
          </RelatedLink>
        ))}
      </QuickAnswers>

      <Band className="border-t border-line">
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "How it works", line: "Ten phases, six signed gates", href: "/how-it-works" },
            { label: "Roadmap", line: "Agentic first, Feb 2027", href: "/roadmap" },
            { label: "FAQ", line: "Opening, access, data", href: "/faq" },
          ].map((l) => (
            <SmartLink key={l.href} href={l.href} className="card card-hover group flex items-center justify-between gap-4 p-5">
              <span>
                <span className="block font-medium text-ink">{l.label}</span>
                <span className="block text-sm text-muted">{l.line}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
            </SmartLink>
          ))}
        </div>
        <p className="eyebrow mb-6">Studios</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STUDIOS.map((s) => (
            <StudioCard key={s.key} studio={s} compact />
          ))}
        </div>
      </Band>

      <CtaBand />
    </>
  );
}
