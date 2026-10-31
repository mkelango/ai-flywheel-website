import type { ReactNode } from "react";
import { Reveal } from "@flywheel/ui/components/interactive";

/** A vertical, dashed timeline of cards. Used for the school calendar, pilot steps and workshops. */
export function Timeline({ items }: { items: { when: string; title: string; detail?: ReactNode }[] }) {
  return (
    <ol className="relative space-y-3 border-l-2 border-dashed border-line pl-6">
      {items.map((it, i) => (
        <li key={it.when + it.title} className="relative">
          <span className="absolute -left-[33px] top-5 size-4 rounded-full border-4 border-bg bg-accent" aria-hidden />
          <Reveal delay={i * 0.05} className="card flex flex-col gap-1 p-5 sm:flex-row sm:items-start sm:gap-6">
            <span className="shrink-0 pt-0.5 font-mono text-sm text-muted sm:w-32">{it.when}</span>
            <span>
              <span className="block font-display font-semibold text-ink">{it.title}</span>
              {it.detail && <span className="mt-0.5 block text-muted">{it.detail}</span>}
            </span>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
