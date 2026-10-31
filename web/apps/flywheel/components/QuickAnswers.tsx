import clsx from "clsx";
import { Plus } from "lucide-react";
import { JsonLd } from "@/components/ui";
import { faqJsonLd, type QA } from "@/lib/seo";

/**
 * Answer-first questions as native <details>: compact, keyboard accessible, no JS,
 * and every answer is in the HTML so it matches the FAQPage JSON-LD.
 */
export function FaqList({ items, className }: { items: QA[]; className?: string }) {
  return (
    <div className={clsx("divide-y divide-line border-y border-line", className)}>
      {items.map((f, i) => (
        <details key={f.q} className="group" open={i === 0}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-[1.05rem] font-medium text-ink">{f.q}</h3>
            <Plus className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-primary" aria-hidden />
          </summary>
          <p className="pb-5 pr-10 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** A "Quick answers" block plus its FAQPage JSON-LD. Use once per page; merge any other FAQ into `items`. */
export function QuickAnswers({ items, title = "Common questions.", id = "quick-answers", className }: { items: QA[]; title?: string; id?: string; className?: string }) {
  if (!items.length) return null;
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={clsx("scroll-mt-24 border-t border-line py-16 md:py-20", className)}>
      <div className="container-site grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">Quick answers</p>
          <h2 id={`${id}-h`} className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
