"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, Briefcase, CornerDownLeft, Search } from "lucide-react";
import { SmartLink } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import type { SearchEntry } from "@/lib/search-index";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[–—]/g, "-");

type Prepared = { e: SearchEntry; title: string; body: string };

const prepare = (index: SearchEntry[]): Prepared[] => index.map((e) => ({ e, title: norm(e.title), body: norm(`${e.section} ${e.line} ${e.keywords ?? ""} ${e.href}`) }));

function search(prepared: Prepared[], q: string): SearchEntry[] {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return prepared.map(({ e, title, body }) => {
    let score = 0;
    for (const t of terms) {
      if (title.startsWith(t)) score += 6;
      else if (title.includes(t)) score += 4;
      else if (body.includes(t)) score += 1;
      else return { e, score: -1 };
    }
    return { e, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => r.e);
}

const SUGGESTED = ["Classes 3–5", "safety", "pricing", "summer camp", "CBSE", "teacher training", "guides"];

/** The index is built on the server and passed in, so content modules stay out of the client bundle. */
export function SiteSearch({ index, adultTerms }: { index: SearchEntry[]; adultTerms: string[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  // Read ?q= once on load (no useSearchParams, so the page stays static).
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q") ?? "";
    if (initial) setQ(initial);
    inputRef.current?.focus();
  }, []);

  // Keep ?q= in the address bar, without adding history entries.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.pathname + url.search);
  }, [q]);

  const prepared = useMemo(() => prepare(index), [index]);
  const results = useMemo(() => search(prepared, q), [prepared, q]);
  const adult = useMemo(() => {
    const n = norm(q);
    return n.length > 2 && adultTerms.some((t) => n.includes(t));
  }, [q, adultTerms]);

  useEffect(() => setActive(0), [q]);

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(results[active].href);
    }
  }

  const optId = (i: number) => `${listId}-opt-${i}`;

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search the site
        </label>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          ref={inputRef}
          id={`${listId}-input`}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
          placeholder="Try ‘Classes 6–8’, ‘safety’ or ‘summer camp’"
          autoComplete="off"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-activedescendant={results.length ? optId(active) : undefined}
          className="min-h-14 w-full rounded-2xl border border-ink/60 bg-surface pl-12 pr-4 text-lg text-ink shadow-sm transition placeholder:text-muted focus:border-ink focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
        />
      </form>

      {adult && (
        <SmartLink href={siteHref("flywheel", "/programmes/foundation")} className="card card-hover mt-5 flex items-start gap-4 bg-highlight/40 p-5">
          <Briefcase className="mt-0.5 size-6 shrink-0 text-ink" aria-hidden />
          <span className="flex-1">
            <span className="block font-display text-lg font-semibold text-ink">Learning AI for your own work?</span>
            <span className="mt-0.5 block text-ink-2">This site is for schools, parents and children. Courses and certificates for adults are on aiflywheel.in.</span>
          </span>
          <ArrowRight className="mt-1 size-5 shrink-0 text-ink" aria-hidden />
        </SmartLink>
      )}

      <div className="mt-6">
        <p className={clsx("mb-3 text-sm text-muted", !q && "sr-only")} aria-live="polite">
          {q ? (results.length ? `${results.length} ${results.length === 1 ? "page" : "pages"}` : "No pages found. Try a class, like ‘Class 5’, or a word like ‘safety’.") : ""}
        </p>
        <ul id={listId} role="listbox" aria-label="Search results" className="space-y-2">
          {results.map((r, i) => (
            <li key={r.href} role="none">
              <SmartLink
                href={r.href}
                id={optId(i)}
                role="option"
                aria-selected={i === active}
                tabIndex={-1}
                onMouseEnter={() => setActive(i)}
                className={clsx("flex items-start gap-4 rounded-2xl border p-4 transition", i === active ? "border-ink bg-surface shadow-sm" : "border-line bg-surface/60 hover:border-ink/50")}
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.7rem] uppercase tracking-widest text-muted">{r.section}</span>
                  <span className="mt-0.5 block font-display text-lg font-semibold text-ink">{r.title}</span>
                  <span className="mt-0.5 block text-ink-2">{r.line}</span>
                </span>
                {i === active && <CornerDownLeft className="mt-1 hidden size-4 shrink-0 text-muted sm:block" aria-hidden />}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>

      {!q && (
        <div className="mt-2">
          <p className="mb-3 text-sm text-muted">Popular searches</p>
          <ul className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => setQ(s)} className="inline-flex min-h-11 items-center rounded-pill border border-line px-4 text-ink transition hover:border-ink/60">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-8 hidden text-sm text-muted sm:block">Use ↑ and ↓ to move, Enter to open.</p>
    </div>
  );
}
