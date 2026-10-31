import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, Button, SmartLink } from "@flywheel/ui/components/primitives";
import { ARTEFACTS, type Studio } from "@/lib/content";
import { SITE_URL, UPDATED } from "@/lib/seo";
import { StudioPhoto } from "@/components/Photo";

/** Lightens a layer colour so it reads at AA on the near-black canvas. */
export const tint = (color: string, pct = 58) => `color-mix(in oklab, ${color} ${pct}%, white)`;
export const wash = (color: string, pct = 14) => `color-mix(in oklab, ${color} ${pct}%, transparent)`;

const LAYERS = ["#3B4BA8", "#B8306F", "#D98B0B", "#13827F"];

/** Soft blurred colour fields behind a section. Purely decorative. */
export function Glow({ colors = LAYERS, className }: { colors?: string[]; className?: string }) {
  const spots = [
    "left-[-10%] top-[-20%] h-[28rem] w-[28rem]",
    "right-[-8%] top-[-10%] h-[24rem] w-[24rem]",
    "left-[30%] top-[20%] h-[22rem] w-[22rem]",
    "right-[20%] top-[45%] h-[20rem] w-[20rem]",
  ];
  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {colors.map((c, i) => (
        <div
          key={c + i}
          className={clsx("glow-drift absolute rounded-full opacity-[0.22] blur-[110px]", spots[i % spots.length])}
          style={{ background: c, animationDelay: `${i * -3.5}s` }}
        />
      ))}
    </div>
  );
}

export function MonoLabel({ children, className, color }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <span className={clsx("font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted", className)} style={color ? { color: tint(color) } : undefined}>
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, line, center, className }: { eyebrow: string; title: ReactNode; line?: ReactNode; center?: boolean; className?: string }) {
  return (
    <header className={clsx("mb-10 max-w-2xl md:mb-14", center && "mx-auto text-center", className)}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-[1.08] text-ink md:text-[2.75rem]">{title}</h2>
      {line && <p className="mt-4 text-lg text-muted">{line}</p>}
    </header>
  );
}

export function Band({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={clsx("relative scroll-mt-24 py-20 md:py-28", className)}>
      <div className="container-site relative">{children}</div>
    </section>
  );
}

/** Inner-page hero: eyebrow, headline, one line, actions. */
export function PageHero({
  eyebrow,
  title,
  line,
  color,
  children,
  aside,
  crumb,
  kicker,
  updated,
}: {
  crumb?: string;
  /** Category phrase (the page's primary keyword), shown above the headline inside the H1. */
  kicker?: string;
  /** Shows "Updated <month year>" on reference pages. */
  updated?: boolean;
  eyebrow: ReactNode;
  title: ReactNode;
  line: ReactNode;
  color?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <Glow colors={color ? [color, color] : undefined} />
      <div className="container-site relative grid grid-cols-1 gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className={aside ? "min-w-0 lg:col-span-6" : "min-w-0 lg:col-span-9"}>
          {crumb && (
            <div className="mb-6">
              <Breadcrumbs base={SITE_URL} items={[{ label: "Studio", href: "/" }, { label: crumb }]} />
            </div>
          )}
          <div className="mb-5">{eyebrow}</div>
          <h1 className="text-gradient font-display text-[2.6rem] font-semibold leading-[1.02] md:text-6xl lg:text-[4.2rem]">
            {kicker && <span className="mb-4 block font-mono text-sm font-medium uppercase leading-snug tracking-[0.14em] text-ink-2 md:text-base">{kicker}</span>}
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2 md:text-xl">{line}</p>
          {updated && <Updated className="mt-5" />}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="min-w-0 lg:col-span-6">{aside}</div>}
      </div>
    </section>
  );
}

export function Updated({ className }: { className?: string }) {
  return (
    <p className={clsx("font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted", className)}>
      Updated <time dateTime={UPDATED.iso}>{UPDATED.label}</time>
    </p>
  );
}

export function StatusChip({ color, children, live }: { color: string; children: ReactNode; live?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-pill border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider"
      style={{ borderColor: wash(color, 45), background: wash(color, 12), color: tint(color, 55) }}
    >
      <span className={clsx("size-1.5 rounded-full", live && "pulse-soft")} style={{ background: color }} />
      {children}
    </span>
  );
}

/** Card thumbnails (home only), tinted with each studio's layer colour. Decorative: the card names the studio. */
const STUDIO_THUMBS: Record<Studio["key"], { src: string; position?: string }> = {
  model: { src: "/images/circuit-board.jpg" },
  generative: { src: "/images/generative-light.jpg", position: "50% 55%" },
  agentic: { src: "/images/code-closeup.jpg" },
  robotic: { src: "/images/robot-helmet.jpg", position: "50% 35%" },
};

export function StudioCard({ studio, compact, thumb }: { studio: Studio; compact?: boolean; /** Small photo header for scanning. */ thumb?: boolean }) {
  const first = studio.key === "agentic";
  const t = STUDIO_THUMBS[studio.key];
  return (
    <SmartLink
      href={studio.href}
      className="card card-hover group relative flex h-full flex-col overflow-hidden p-6"
      style={{ ["--primary" as string]: studio.color }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${studio.color}, transparent)` }} />
      {thumb && (
        <StudioPhoto
          src={t.src}
          alt=""
          sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 90vw"
          color={studio.color}
          position={t.position}
          imgClassName="photo-zoom"
          className="-mx-6 -mt-6 mb-6 aspect-[16/9]"
        />
      )}
      <div aria-hidden className="absolute -right-16 -top-16 size-40 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50" style={{ background: studio.color }} />
      <div className="relative flex items-center justify-between gap-3">
        <span className="font-mono text-sm font-semibold tracking-[0.2em]" style={{ color: tint(studio.color, 62) }}>
          {studio.verb}
        </span>
        <StatusChip color={studio.color} live={first}>
          {first ? "Feb 2027 · Early access" : "FY28"}
        </StatusChip>
      </div>
      <h3 className="relative mt-10 font-display text-2xl font-semibold text-ink">{studio.name}</h3>
      <p className="relative mt-2 text-[0.95rem] text-muted">{studio.line}</p>
      {!compact && (
        <p className="relative mt-6 font-mono text-xs text-muted">
          {studio.cycle} · {studio.phases.length} phases · G1–G6
        </p>
      )}
      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink-2 group-hover:text-ink">
        Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </SmartLink>
  );
}

export function CtaBand({ title = "Sign in. Start a project.", line = "Agentic Studio opens at the Inevitable Summit, February 2027." }: { title?: string; line?: string }) {
  return (
    <Band>
      <div className="relative overflow-hidden rounded-[calc(var(--radius-card)*2)] border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-20">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
        <Glow />
        <div className="relative mx-auto max-w-2xl">
          <p className="eyebrow mb-4">Early access</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted">{line}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/early-access" size="lg">
              Join early access <ArrowRight className="size-4" />
            </Button>
            <Button href="/sign-in" variant="secondary" size="lg">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </Band>
  );
}

/** Ordered phase rail used by every life-cycle section. Server-rendered, wraps on small screens. */
export function PhaseRail({ studio }: { studio: Studio }) {
  return (
    <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
      {studio.phases.map((p) => (
        <li key={p.n} className="relative bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted">{String(p.n).padStart(2, "0")}</span>
            {p.gate && (
              <span className="rounded-md px-1.5 py-0.5 font-mono text-[0.65rem] font-semibold" style={{ background: wash(studio.color, 22), color: tint(studio.color, 60) }}>
                {p.gate}
              </span>
            )}
          </div>
          <p className="mt-3 text-[0.95rem] font-medium leading-snug text-ink">{p.name}</p>
        </li>
      ))}
    </ol>
  );
}

/** The four records a project leaves: file tab, title, a few mono lines. */
export function ArtefactCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ARTEFACTS.map((a) => (
        <div key={a.file} className="card overflow-hidden">
          <div className="truncate border-b border-line bg-surface-2/60 px-4 py-2.5 font-mono text-[0.68rem] text-muted">{a.file}</div>
          <div className="p-5">
            <h3 className="font-semibold text-ink">{a.title}</h3>
            <p className="mt-1 text-sm text-muted">{a.text}</p>
            <ul className="mt-4 space-y-1 border-t border-line pt-3 font-mono text-[0.72rem] text-muted">
              {a.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Compact gate row for floating photo cards: G1 to G6 as small pills, the first `done` ticked. */
export function GatePills({ color = "#D98B0B", done = 0, codes = ["G1", "G2", "G3", "G4", "G5", "G6"] }: { color?: string; done?: number; codes?: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {codes.map((c, i) => (
        <li
          key={c}
          className="rounded-md border px-1.5 py-0.5 font-mono text-[0.68rem] font-semibold"
          style={i < done ? { borderColor: color, background: color, color: "var(--on-primary)" } : { borderColor: wash(color, 45), background: wash(color, 14), color: tint(color, 62) }}
        >
          {c}
        </li>
      ))}
    </ul>
  );
}
