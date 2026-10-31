"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Item = { slug: string; term: string; short: string };

/** A–Z glossary index with instant client-side search. */
export function GlossarySearch({ terms }: { terms: Item[] }) {
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const hits = needle ? terms.filter((t) => t.term.toLowerCase().includes(needle) || t.short.toLowerCase().includes(needle)) : terms;
    const map = new Map<string, Item[]>();
    for (const t of hits) {
      const letter = /[a-z]/i.test(t.term[0]) ? t.term[0].toUpperCase() : "#";
      map.set(letter, [...(map.get(letter) ?? []), t]);
    }
    return [...map.entries()];
  }, [q, terms]);

  const letters = groups.map(([l]) => l);
  const count = groups.reduce((n, [, items]) => n + items.length, 0);

  return (
    <div>
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
        <label htmlFor="glossary-q" className="sr-only">
          Search the glossary
        </label>
        <input
          id="glossary-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms, e.g. kill switch"
          className="h-12 w-full rounded-pill border border-ink/50 bg-surface pl-11 pr-4 text-ink placeholder:text-muted focus:border-ink"
        />
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {count} {count === 1 ? "term" : "terms"}
      </p>

      {letters.length > 1 && (
        <nav aria-label="Jump to letter" className="mt-6 flex flex-wrap gap-1">
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="grid size-9 place-items-center rounded-md border border-line font-mono text-sm text-ink hover:border-ink">
              {l}
            </a>
          ))}
        </nav>
      )}

      {count === 0 ? (
        <p className="mt-10 text-muted">No term matches “{q}”. Try a shorter word.</p>
      ) : (
        <div className="mt-10 space-y-10">
          {groups.map(([letter, items]) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-24 grid gap-4 md:grid-cols-12">
              <h2 className="font-display text-3xl font-semibold text-primary-hover md:col-span-1">{letter}</h2>
              <ul className="grid gap-3 sm:grid-cols-2 md:col-span-11 lg:grid-cols-3">
                {items.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/glossary/${t.slug}`} className="card card-hover group block h-full p-5">
                      <span className="font-semibold text-ink group-hover:text-primary-hover">{t.term}</span>
                      <span className="mt-1 block text-sm text-muted">{t.short}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
