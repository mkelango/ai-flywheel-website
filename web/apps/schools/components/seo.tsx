import clsx from "clsx";
import { ArrowRight, Plus } from "lucide-react";
import { Container, SmartLink } from "@flywheel/ui/components/primitives";
import { JsonLd, faqLd } from "./blocks";

export type QA = { q: string; a: string };

/**
 * "Quick answers": short, answer-first Q&A for search and answer engines.
 * Native <details>, so every answer is in the HTML (no script needed), plus one FAQPage JSON-LD.
 * Pass `ld={false}` when the page already emits a FAQPage built from these items.
 */
export function QuickAnswers({
  items,
  title = "Quick answers",
  eyebrow = "Questions schools ask",
  id = "answers",
  ld = true,
  className,
}: {
  items: QA[];
  title?: string;
  eyebrow?: string;
  id?: string;
  ld?: boolean;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={clsx("scroll-mt-24 py-14 md:py-20", className)}>
      {ld && <JsonLd data={faqLd(items)} />}
      <Container className="max-w-3xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 id={`${id}-title`} className="font-display text-3xl font-semibold leading-[1.1] text-ink md:text-[2.4rem]">
          {title}
        </h2>
        <QAList items={items} className="mt-8" />
      </Container>
    </section>
  );
}

/** The Q&A list on its own (native <details>, first one open), for layouts that already have a heading. */
export function QAList({ items, className }: { items: QA[]; className?: string }) {
  return (
    <div className={clsx("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => (
        <details key={it.q} className="group" open={i === 0}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-[1.05rem] font-medium text-ink">{it.q}</h3>
            <Plus className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-primary" aria-hidden />
          </summary>
          <p className="max-w-2xl pb-6 text-ink-2">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** A short row of contextual links to related pages, with descriptive anchors. */
export function RelatedLinks({ links, title = "Related", className }: { links: { href: string; label: string }[]; title?: string; className?: string }) {
  return (
    <nav aria-label={title} className={clsx("py-8", className)}>
      <Container>
        <p className="eyebrow mb-3">{title}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <SmartLink href={l.href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
                {l.label} <ArrowRight className="size-4" aria-hidden />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

/** Visible "Updated" line for reference pages (freshness signal for people and answer engines). */
export function Updated({ date = "2026-10", label = "October 2026", className }: { date?: string; label?: string; className?: string }) {
  return (
    <p className={clsx("text-sm text-muted", className)}>
      Updated <time dateTime={date}>{label}</time>
    </p>
  );
}
