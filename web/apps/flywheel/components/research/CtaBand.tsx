import type { ReactNode } from "react";

/** Closing call to action: headline, one line, buttons. */
export function CtaBand({ eyebrow, title, line, children }: { eyebrow: string; title: string; line?: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="container-site grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">{title}</h2>
          {line && <p className="mt-3 text-muted">{line}</p>}
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">{children}</div>
      </div>
    </section>
  );
}
