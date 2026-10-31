import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { Button, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import type { Status } from "@/lib/orgs";
import { CardThumb, type PhotoKey } from "@/components/photos";

export type CardItem = { t: string; d: string; href?: string; tag?: Status; kicker?: string; color?: string; /** Decorative thumbnail on top of the card. */ photo?: PhotoKey };

const THUMB_SIZES = { 2: "(min-width: 640px) 45vw, 92vw", 3: "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw", 4: "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw" } as const;

/** Hairline cards in a responsive grid. Linked cards get a hover state and an arrow; cards with a photo get a thumbnail. */
export function CardGrid({ items, cols = 3 }: { items: CardItem[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={clsx("grid gap-4 sm:grid-cols-2", cols === 3 && "lg:grid-cols-3", cols === 4 && "lg:grid-cols-4")}>
      {items.map((c, i) => {
        const text = (
          <>
            {c.color && !c.photo && <span className="mb-4 block h-1 w-10 rounded-pill" style={{ background: c.color }} aria-hidden />}
            <div className="flex items-start justify-between gap-3">
              {c.kicker ? <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">{c.kicker}</span> : <span />}
              {c.tag && <StatusTag status={c.tag} />}
            </div>
            <h3 className={clsx("font-display text-xl font-semibold text-ink", (c.kicker || c.tag) && "mt-3")}>{c.t}</h3>
            <p className="mt-2 text-sm text-muted">{c.d}</p>
            {c.href && <ArrowRight className="mt-auto size-4 self-end text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden />}
          </>
        );
        const body = c.photo ? (
          <>
            <CardThumb photo={c.photo} sizes={THUMB_SIZES[cols]}>
              {c.color && <span className="absolute inset-x-0 bottom-0 h-1" style={{ background: c.color }} aria-hidden />}
            </CardThumb>
            <div className="flex flex-1 flex-col p-6">{text}</div>
          </>
        ) : (
          text
        );
        const pad = c.photo ? "overflow-hidden" : "p-6";
        return (
          <Reveal key={c.t} delay={(i % 3) * 0.05} className="h-full">
            {c.href ? (
              <SmartLink href={c.href} className={clsx("card card-hover group flex h-full flex-col gap-0", pad)}>
                {body}
              </SmartLink>
            ) : (
              <div className={clsx("card flex h-full flex-col", pad)}>{body}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

/** Numbered steps with an ink rule on top, as on the hub pages. */
export function StepList({ steps, cols = 4 }: { steps: { t: string; d: string; href?: string }[]; cols?: 3 | 4 | 5 }) {
  return (
    <ol className={clsx("grid gap-6 sm:grid-cols-2", cols === 3 && "md:grid-cols-3", cols === 4 && "md:grid-cols-4", cols === 5 && "md:grid-cols-5")}>
      {steps.map((s, i) => (
        <li key={s.t}>
          <Reveal delay={i * 0.06} className="h-full border-t-2 border-ink pt-5">
            <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              {s.href ? (
                <SmartLink href={s.href} className="hover:text-primary-hover">
                  {s.t} →
                </SmartLink>
              ) : (
                s.t
              )}
            </h3>
            <p className="mt-1 text-sm text-muted">{s.d}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** A table that scrolls inside its own box on small screens. */
export function DataTable({ head, rows, minWidth = 640 }: { head: string[]; rows: ReactNode[][]; minWidth?: number }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
      <table className="w-full text-left text-sm" style={{ minWidth }}>
        <thead className="border-b border-line font-mono text-[0.7rem] uppercase tracking-wider text-muted">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-5 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r, i) => (
            <tr key={i} className="align-top">
              {r.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-5 py-4 font-semibold text-ink">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-5 py-4 text-ink-2">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Dark closing band with one call to action. */
export function CtaBand({ title, line, href, label, secondary }: { title: string; line?: string; href: string; label: string; secondary?: { href: string; label: string } }) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-inverse p-8 text-inverse-ink md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-display text-2xl font-semibold md:text-3xl">{title}</p>
            {line && <p className="mt-2 text-inverse-ink/70">{line}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={href} size="lg">
              {label}
            </Button>
            {secondary && (
              <Link href={secondary.href} className="inline-flex min-h-11 items-center px-2 font-medium text-inverse-ink/80 underline-offset-4 hover:underline">
                {secondary.label} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** A coloured dot plus label. */
export function Dot({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-2.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden /> {children}
    </span>
  );
}
