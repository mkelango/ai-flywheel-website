import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowRight, Plus } from "lucide-react";
import { SmartLink } from "@flywheel/ui/components/primitives";
import { faqLd, type QA } from "@/lib/seo";
import { Band, SectionHead } from "@/components/ui";

/** Safe JSON-LD: escapes "<" so a string can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/**
 * Server-rendered question list. Native <details>, so every answer is in the
 * HTML for crawlers and answer engines, and it works without JavaScript.
 */
export function AnswerList({ items, className }: { items: readonly QA[]; className?: string }) {
  return (
    <div className={clsx("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <details key={item.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-[1.05rem] font-medium text-ink">{item.q}</h3>
            <Plus aria-hidden className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-primary" />
          </summary>
          <p className="pb-5 pr-10 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** "Quick answers" band plus the page's one FAQPage JSON-LD. */
export function QuickAnswers({
  items,
  title = "Questions, answered.",
  line,
  className,
  children,
}: {
  items: readonly QA[];
  title?: ReactNode;
  line?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Band id="quick-answers" className={clsx("border-t border-line", className)}>
      <JsonLd data={faqLd(items)} />
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Quick answers" title={title} line={line} className="mb-0 md:mb-0" />
          {children && <div className="mt-6 space-y-2 text-sm">{children}</div>}
        </div>
        <AnswerList items={items} className="lg:col-span-8" />
      </div>
    </Band>
  );
}

/** A short contextual link with a descriptive anchor. */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
      {children}
    </SmartLink>
  );
}

/** Stacked related links for the side of a Quick answers band. */
export function RelatedLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className="group flex min-h-11 items-center gap-1.5 text-ink-2 hover:text-ink">
      {children} <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
    </SmartLink>
  );
}
