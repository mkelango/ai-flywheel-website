"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, Search } from "lucide-react";
import type { SearchEntry } from "@/lib/search-index";

const SCHOOL_RE = /\b(class(?!ic|if)|school|cbse|icse|kid|child|teacher)/i;

const POPULAR = [
  { label: "Free C1 course", href: "/programmes/foundation" },
  { label: "Flywheel Check", href: "/check" },
  { label: "Programmes", href: "/programmes" },
  { label: "Glossary", href: "/glossary" },
  { label: "Free resources", href: "/free" },
];

function score(e: SearchEntry, tokens: string[]) {
  const title = e.title.toLowerCase();
  const hay = `${title} ${e.description.toLowerCase()} ${e.section.toLowerCase()} ${e.path}`;
  let s = 0;
  for (const t of tokens) {
    if (!hay.includes(t)) return 0;
    if (title.startsWith(t)) s += 12;
    else if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(title)) s += 8;
    else if (title.includes(t)) s += 5;
    else s += 1;
  }
  return s;
}

/** Instant, keyboard-navigable search over the static site index. Keeps ?q= in the URL. */
export function SiteSearch({ index, schoolsHref }: { index: SearchEntry[]; schoolsHref: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(() => params.get("q") ?? "");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    return index
      .map((e) => ({ e, s: score(e, tokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.e.title.localeCompare(b.e.title))
      .slice(0, 40)
      .map((x) => x.e);
  }, [q, index]);

  const schools = SCHOOL_RE.test(q);

  // Keep ?q= in step with the box, without adding history entries.
  useEffect(() => {
    const t = setTimeout(() => {
      const next = q.trim() ? `${pathname}?q=${encodeURIComponent(q.trim())}` : pathname;
      window.history.replaceState(null, "", next);
    }, 250);
    return () => clearTimeout(t);
  }, [q, pathname]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(results[active].path);
    }
  }

  return (
    <div>
      <div className="relative max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <label htmlFor="site-q" className="sr-only">
          Search aiflywheel.in
        </label>
        <input
          id="site-q"
          type="search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="site-results"
          aria-autocomplete="list"
          aria-activedescendant={results.length ? `site-r-${active}` : undefined}
          autoFocus
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search programmes, terms, pages…"
          className="h-14 w-full rounded-pill border border-ink/50 bg-surface pl-12 pr-4 text-lg text-ink placeholder:text-muted focus:border-ink"
        />
      </div>

      {schools && (
        <a href={schoolsHref} className="mt-6 flex max-w-2xl items-center justify-between gap-4 rounded-[var(--radius-card)] border-2 border-primary bg-primary/10 p-5 hover:bg-primary/15">
          <span>
            <span className="eyebrow block">AI Flywheel at Schools</span>
            <span className="mt-1 block font-display text-xl font-semibold text-ink">Looking for schools?</span>
            <span className="mt-0.5 block text-sm text-ink-2">Classes, camps and teacher programmes live on our schools site.</span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-ink" aria-hidden />
        </a>
      )}

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {q.trim() ? `${results.length} ${results.length === 1 ? "result" : "results"}${results.length === 40 ? " (top 40)" : ""}` : "Type to search every page."}
      </p>

      {!q.trim() && (
        <div className="mt-6">
          <p className="eyebrow mb-3">Popular</p>
          <ul className="flex flex-wrap gap-2">
            {POPULAR.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="inline-flex min-h-11 items-center rounded-pill border border-line px-4 text-sm text-ink hover:border-ink">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {q.trim() && results.length === 0 && <p className="mt-8 text-muted">Nothing matches “{q.trim()}”. Try a shorter word, or browse the glossary.</p>}

      <ul id="site-results" role="listbox" ref={listRef} aria-label="Search results" className={clsx("mt-6 max-w-3xl divide-y divide-line border-y border-line", !results.length && "hidden")}>
        {results.map((r, i) => (
          <li key={r.path} role="none" data-i={i}>
            <Link
              href={r.path}
              id={`site-r-${i}`}
              role="option"
              aria-selected={i === active}
              tabIndex={-1}
              onMouseEnter={() => setActive(i)}
              className={clsx("block px-3 py-4 transition-colors", i === active ? "bg-surface-2" : "hover:bg-surface-2")}
            >
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg font-semibold text-ink">{r.title}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">{r.section}</span>
              </span>
              <span className="mt-1 line-clamp-2 block text-sm text-ink-2">{r.description}</span>
              <span className="mt-1 block truncate font-mono text-xs text-muted">{r.path}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
