import { SITE_URL } from "@/lib/site";
import { UPDATED } from "@/lib/seo";
import type { ReactNode } from "react";
import clsx from "clsx";
import { Breadcrumbs, StatusTag } from "@flywheel/ui/components/primitives";
import { LEVEL_NAMES, STAGE_META, type LevelCode, type Programme, type StageKey } from "@/lib/programmes";

export function LevelPill({ level, className }: { level: LevelCode | null; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-ink", className)}>
      {level ? (
        <>
          <span className="text-primary-hover">{level}</span> {LEVEL_NAMES[level]}
        </>
      ) : (
        "For organisations"
      )}
    </span>
  );
}

export function StageTag({ stage, className }: { stage: StageKey; className?: string }) {
  const s = STAGE_META[stage];
  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-ink-2", className)}>
      <span className="size-2 rounded-full" style={{ background: s.color }} aria-hidden />
      {s.short}
    </span>
  );
}

export function PriceLine({ p, large }: { p: Programme; large?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={clsx("font-semibold text-ink", large ? "font-display text-2xl" : "text-[0.95rem]")}>{p.price}</span>
        {p.priceStatus !== "Free" && <StatusTag status={p.priceStatus} />}
      </div>
      <p className="mt-0.5 text-xs text-muted">
        {p.priceNote ? `${p.priceNote} · ` : ""}
        {p.price.startsWith("₹") ? "Excl. GST" : p.priceStatus === "Free" ? "No card needed" : "Excl. GST"}
      </p>
    </div>
  );
}

/** Top-of-page hero for inner pages. Short by design. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  aside,
  updated,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  aside?: ReactNode;
  /** Shows "Updated <month year>" for reference pages that answer engines cite. */
  updated?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-site grid gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {crumbs && (
            <div className="mb-8">
              <Breadcrumbs base={SITE_URL} items={crumbs} />
            </div>
          )}
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-6xl">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>}
          {updated && (
            <p className="mt-4 text-xs text-muted">
              Updated <time dateTime={UPDATED.iso}>{UPDATED.label}</time>
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}

/** Four layer-colour arcs used as a quiet decorative device. */
export function LayerBar({ className }: { className?: string }) {
  return (
    <div className={clsx("flex h-1 w-full overflow-hidden rounded-pill", className)} aria-hidden>
      <span className="flex-1 bg-foundation" />
      <span className="flex-1 bg-generative" />
      <span className="flex-1 bg-agentic" />
      <span className="flex-1 bg-physical" />
    </div>
  );
}

/** True when a hex fill is light enough that white text would fall below AA (e.g. agentic amber). */
function isLight(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return false;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.2;
}

export function BookCover({ title, sub, color, pages, small }: { title: string; sub: string; color: string; pages: number | null; small?: boolean }) {
  return (
    <div
      className={clsx(
        "relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[6px] p-4 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.5)]",
        isLight(color) ? "text-ink" : "text-white",
        small ? "w-28" : "w-full",
      )}
      style={{ background: color }}
    >
      <span className="absolute inset-y-0 left-0 w-2 bg-black/20" aria-hidden />
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">M. K. Elango</span>
      <div>
        <span className="block font-display text-[0.95rem] font-semibold leading-tight">{title}</span>
        <span className="mt-2 block font-mono text-[0.65rem] uppercase tracking-[0.18em]">
          {sub}
          {pages ? ` · ${pages} pp` : ""}
        </span>
      </div>
    </div>
  );
}

/** A product-UI mockup of a gate log, built from divs. Labelled as a sample. */
export function GateLogCard({ dark, className }: { dark?: boolean; className?: string }) {
  const rows = [
    { g: "G1", name: "Thesis approved", done: true },
    { g: "G2", name: "Architecture approved", done: true },
    { g: "G3", name: "Definition of ready", done: true },
    { g: "G4", name: "Experience sign-off", done: true },
    { g: "G5", name: "Quality gate", done: false },
    { g: "G6", name: "Governance and go-live", done: false },
  ];
  return (
    <div
      className={clsx(
        "rounded-[var(--radius-card)] border p-5 font-mono text-[0.78rem]",
        dark ? "border-white/10 bg-white/[0.04] text-inverse-ink" : "border-line bg-surface text-ink",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="uppercase tracking-widest opacity-60">Gate log · sample</span>
        <span className={clsx("rounded-pill bg-agentic/15 px-2 py-0.5", dark ? "text-agentic" : "text-ink")}>Agentic · ADLC</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.g} className="flex items-center gap-3">
            <span className={clsx("grid size-6 place-items-center rounded-full text-[0.65rem] font-semibold", r.done ? "bg-agentic text-ink" : dark ? "border border-white/20" : "border border-line")}>
              {r.g}
            </span>
            <span className={clsx("flex-1", !r.done && "opacity-50")}>{r.name}</span>
            <span className={clsx(r.done ? "opacity-80" : "opacity-40")}>{r.done ? "signed" : "pending"}</span>
          </li>
        ))}
      </ul>
      <div className={clsx("mt-4 border-t pt-3 opacity-70", dark ? "border-white/10" : "border-line")}>kill_switch.test → passed · evals @ shipping settings</div>
    </div>
  );
}

/** An Open Badges-style credential mockup. */
export function BadgeCard({ name, level, stage, programme, id, issued, className }: { name: string; level: LevelCode; stage: StageKey; programme: string; id: string; issued: string; className?: string }) {
  const s = STAGE_META[stage];
  return (
    <div className={clsx("card overflow-hidden", className)}>
      <div className="h-1.5" style={{ background: s.color }} />
      <div className="flex gap-5 p-6">
        <div className="grid size-20 shrink-0 place-items-center rounded-full border-4" style={{ borderColor: s.color }}>
          <div className="text-center">
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted">{s.short}</span>
            <span className="block font-display text-2xl font-semibold text-ink">{level}</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="eyebrow">Open Badges 3.0</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink">
            {LEVEL_NAMES[level]} ({level})
          </p>
          <p className="text-sm text-ink-2">{programme}</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted">
            <dt>Holder</dt>
            <dd className="text-ink">{name}</dd>
            <dt>Issued</dt>
            <dd className="text-ink">{issued}</dd>
            <dt>ID</dt>
            <dd className="truncate font-mono text-ink">{id}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function StatStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 divide-line border-y border-line md:grid-cols-4 md:divide-x">
      {items.map((i) => (
        <div key={i.label} className="px-1 py-6 md:px-6">
          <dt className="sr-only">{i.label}</dt>
          <dd>
            <span className="block font-display text-3xl font-semibold text-ink md:text-4xl">{i.value}</span>
            <span className="mt-1 block text-sm text-muted">{i.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
