import { SITE_URL } from "@/lib/site";
import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { CalendarDays, Clock, Layers } from "lucide-react";
import { Breadcrumbs } from "@flywheel/ui/components/primitives";
import { STAGE_META, type LevelCode, type Programme, type StageKey } from "@/lib/programmes";
import { TA_LEVEL_NAMES, TA_PROGRAMMES, TA_STAGES, TA_TITLES_EN_ONLY, taBatch, taPrice, taProgrammeHref } from "@/lib/ta-content";

/** Status tag in Tamil (same look as the shared StatusTag). */
export function TaTag({ status }: { status: "Proposed" | "Ed 1.1" | "Real" }) {
  const label = status === "Proposed" ? "முன்மொழிவு" : status === "Real" ? "உண்மை" : "Ed 1.1";
  return <span className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wider text-muted">{label}</span>;
}

export function TaLevelPill({ level, className }: { level: LevelCode | null; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1 text-[0.75rem] font-semibold text-ink", className)}>
      {level ? (
        <>
          <span className="font-mono text-primary-hover">{level}</span> {TA_LEVEL_NAMES[level]}
        </>
      ) : (
        "நிறுவனங்களுக்கு"
      )}
    </span>
  );
}

export function TaStageTag({ stage }: { stage: StageKey }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-ink-2">
      <span className="size-2 rounded-full" style={{ background: STAGE_META[stage].color }} aria-hidden />
      {TA_STAGES[stage]}
    </span>
  );
}

export function TaPriceLine({ p, large }: { p: Programme; large?: boolean }) {
  const note = TA_PROGRAMMES[p.slug]?.priceNote;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={clsx("font-semibold text-ink", large ? "font-display text-2xl" : "text-[0.95rem]")}>{taPrice(p)}</span>
        {p.priceStatus !== "Free" && <TaTag status={p.priceStatus} />}
      </div>
      <p className="mt-0.5 text-xs text-muted">
        {note ? `${note} · ` : ""}
        {p.priceStatus === "Free" ? "கார்டு தேவையில்லை" : "GST நீங்கலாக"}
      </p>
    </div>
  );
}

/** Inner-page hero, Tamil: looser leading so Tamil glyphs never clip. */
export function TaPageHero({ eyebrow, title, intro, crumbs, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; crumbs?: { label: string; href?: string }[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-site pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="max-w-3xl">
          {crumbs && (
            <div className="mb-8">
              <Breadcrumbs base={SITE_URL} items={crumbs} />
            </div>
          )}
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="font-display text-[1.75rem] font-semibold leading-[1.3] text-ink [overflow-wrap:anywhere] sm:text-[2rem] md:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/** Section heading block matching the shared Section, with Tamil-safe leading. */
export function TaSection({ id, eyebrow, title, intro, className, children }: { id?: string; eyebrow?: string; title?: ReactNode; intro?: ReactNode; className?: string; children?: ReactNode }) {
  return (
    <section id={id} className={clsx("scroll-mt-20 py-16 md:py-24", className)}>
      <div className="container-site">
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="font-display text-[1.75rem] font-semibold leading-[1.3] text-ink md:text-4xl">{title}</h2>}
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/** Catalogue card in Tamil. Links to the Tamil page when one exists, otherwise to the English page. */
export function TaProgrammeCard({ p }: { p: Programme }) {
  const t = TA_PROGRAMMES[p.slug];
  const fallback = TA_TITLES_EN_ONLY[p.slug];
  const title = t?.title ?? fallback?.title ?? p.title;
  const focus = t?.focus ?? fallback?.focus ?? p.focus;
  return (
    <Link href={taProgrammeHref(p.slug)} className="card card-hover group relative flex h-full flex-col overflow-hidden focus-visible:outline-offset-2">
      <span className="h-1 w-full" style={{ background: STAGE_META[p.stage].color }} aria-hidden />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TaLevelPill level={p.level} />
          {!t && <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">English ↗</span>}
        </div>
        <h3 className="mt-4 font-display text-[1.2rem] font-semibold leading-snug text-ink group-hover:text-primary-hover">{title}</h3>
        <p className="mt-1 text-sm text-muted">{focus}</p>
        <ul className="mt-4 space-y-1.5 text-[0.82rem] text-ink-2">
          <li className="flex items-center gap-2">
            <Layers className="size-3.5 shrink-0 text-muted" aria-hidden />
            <TaStageTag stage={p.stage} />
          </li>
          {t && (
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-3.5 shrink-0 text-muted" aria-hidden />
              {t.format}
            </li>
          )}
          <li className="flex items-center gap-2">
            <CalendarDays className="size-3.5 shrink-0 text-muted" aria-hidden />
            அடுத்த தொகுதி: <span className="font-medium text-ink">{taBatch(p.nextBatch)}</span>
          </li>
        </ul>
        <div className="min-h-5 flex-1" />
        <div className="border-t border-line pt-4">
          <TaPriceLine p={p} />
        </div>
      </div>
    </Link>
  );
}
