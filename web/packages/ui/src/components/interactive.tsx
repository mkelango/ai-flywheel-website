"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import clsx from "clsx";

/**
 * Optional app-level wrapper: Motion's JS animations follow prefers-reduced-motion.
 * Shared components already respect it on their own.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Fades and lifts children into view once. Same markup on server and client;
 * under reduced motion base.css shows [data-reveal] at once and the transition is instant.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export type FaqItem = { q: string; a: ReactNode };

/** Accessible accordion, one panel open at a time. */
export function Accordion({ items, className, headingLevel = 3 }: { items: FaqItem[]; className?: string; /** Heading level for each question (default 3). */ headingLevel?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const reduce = useReducedMotion();
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <div className={clsx("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <H className="font-sans">
              <button
                id={`${base}-h${i}`}
                aria-controls={`${base}-p${i}`}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-medium text-ink"
              >
                {item.q}
                <Plus className={clsx("size-5 shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-45 text-primary")} />
              </button>
            </H>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-p${i}`}
                  role="region"
                  aria-labelledby={`${base}-h${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-10 text-muted">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Ids that link a Tabs tab to its panel. Pass the same idBase to Tabs and set these on your role="tabpanel". */
export function tabIds(idBase: string, value: string) {
  return { tab: `${idBase}-tab-${value.replace(/[^\w-]/g, "-")}`, panel: `${idBase}-panel` };
}

/**
 * Pill-style tabs with an animated indicator and the ARIA tabs keyboard pattern
 * (arrow keys, Home, End; one tab stop). Panels are rendered by the caller: pass idBase
 * and give the panel id={tabIds(idBase, value).panel} aria-labelledby={tabIds(idBase, value).tab}.
 */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
  layoutId = "tab-pill",
  idBase,
  "aria-label": ariaLabel,
}: {
  tabs: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  layoutId?: string;
  /** Stable id prefix; when set, each tab gets aria-controls pointing at the caller's panel. */
  idBase?: string;
  "aria-label"?: string;
}) {
  const auto = useId();
  const base = idBase ?? auto;
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.value === value);
    const last = tabs.length - 1;
    const next = e.key === "ArrowRight" ? (i >= last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i <= 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    onChange(tabs[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown} className={clsx("inline-flex flex-wrap gap-1 rounded-pill border border-line bg-surface p-1", className)}>
      {tabs.map((t, i) => {
        const active = t.value === value;
        const ids = tabIds(base, t.value);
        return (
          <button
            key={t.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={ids.tab}
            aria-selected={active}
            aria-controls={idBase ? ids.panel : undefined}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.value)}
            className={clsx("relative min-h-10 rounded-pill px-4 text-sm font-medium transition-colors", active ? "text-on-primary" : "text-muted hover:text-ink")}
          >
            {active && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-pill bg-primary" transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.5 }} />}
            <span className="relative">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
