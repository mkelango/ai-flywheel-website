"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight, ShieldCheck, Search } from "lucide-react";
import clsx from "clsx";
import { SITES, siteHref, type SiteKey } from "../sites";
import { SmartLink, buttonClass } from "./primitives";
import { LanguageLinks, useLanguageLinks } from "./LanguageSwitch";

export { useLanguageLinks };

export type NavLink = { label: string; href: string; desc?: string; color?: string };
export type NavColumn = { title: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  /** Optional colour dot (e.g. Kids magenta) so a menu is findable at a glance. */
  color?: string;
  kicker?: string;
  columns?: NavColumn[];
  featured?: { eyebrow: string; title: string; text: string; href: string; cta: string };
};

export type HeaderCta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" | "accent" };

const isMouse = (e: { pointerType?: string }) => e.pointerType === "mouse";
const visible = (el: Element) => el.getClientRects().length > 0;

/** The shared top bar on all three sites: the current door is highlighted. */
export function DoorBar({ current, taPaths, searchHref }: { current: SiteKey; taPaths?: string[]; searchHref?: string }) {
  const order: SiteKey[] = ["schools", "flywheel", "studio"];
  const lang = useLanguageLinks(taPaths);
  return (
    <div className="hidden whitespace-nowrap border-b border-line bg-surface-2/60 text-[0.8rem] lg:block">
      <div className="container-site flex h-9 items-center justify-between">
        <nav aria-label="AI Flywheel sites" className="flex items-center gap-1">
          {order.map((key) => (
            <a
              key={key}
              href={SITES[key].url}
              aria-current={key === current ? "page" : undefined}
              title={key === "studio" && key !== current ? `Opens ${SITES.studio.domain}` : undefined}
              className={clsx(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors",
                key === current ? "bg-surface font-semibold text-ink shadow-sm" : "text-muted hover:text-ink",
              )}
            >
              {SITES[key].doorLabel}
              {/* Studio is its own product on its own domain: say so before the click. */}
              {key === "studio" && key !== current && (
                <>
                  <ArrowUpRight className="size-3" aria-hidden />
                  <span className="sr-only">(opens {SITES.studio.domain})</span>
                </>
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-muted">
          {searchHref && (
            <Link href={searchHref} className="inline-flex items-center gap-1.5 hover:text-ink">
              <Search className="size-3.5" aria-hidden /> Search
            </Link>
          )}
          <Link href="/verify" className="inline-flex items-center gap-1.5 hover:text-ink">
            <ShieldCheck className="size-3.5" aria-hidden /> Verify a credential
          </Link>
          {lang.tamil && <LanguageLinks taPaths={taPaths} icon />}
          <a href={siteHref("studio", "/sign-in")} className="hover:text-ink">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Header with mega menus that open on hover and click; on mobile each item
 * becomes an accordion and the primary action is pinned to the bottom.
 */
export function SiteHeader({
  current,
  logo,
  items,
  ctas,
  mobileStickyCta,
  taPaths,
  searchHref,
}: {
  current: SiteKey;
  logo: ReactNode;
  items: NavItem[];
  ctas: HeaderCta[];
  mobileStickyCta?: HeaderCta;
  /** English paths that have a Tamil version under /ta. */
  taPaths?: string[];
  /** Adds a Search link to the top bar and the mobile menu. */
  searchHref?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileItem, setMobileItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerTop, setDrawerTop] = useState(64);
  const pathname = usePathname() ?? "/";
  const reduce = useReducedMotion();
  const lang = useLanguageLinks(taPaths);
  const uid = useId();
  const drawerId = `${uid}-menu`;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  const closeAll = () => {
    setOpen(null);
    setMobile(false);
    setMobileItem(null);
  };

  // Back/forward and normal navigation.
  useEffect(() => {
    setOpen(null);
    setMobile(false);
    setMobileItem(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape returns focus to the control that opened the menu; a tap or click outside closes the mega menu.
  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) triggers.current[open]?.focus();
      if (mobile) burgerRef.current?.focus();
      setOpen(null);
      setMobile(false);
      setMobileItem(null);
    };
    const onDown = (e: PointerEvent) => {
      if (open && !headerRef.current?.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, mobile]);

  // Mobile drawer: lock page scroll, make the page behind it inert, keep its height to the viewport.
  useEffect(() => {
    if (!mobile) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const header = headerRef.current;
    const inerted: Element[] = [];
    for (const el of Array.from(document.body.children)) {
      if (!header || el.contains(header) || el.hasAttribute("inert") || el.tagName.includes("-") || ["SCRIPT", "STYLE", "LINK", "TEMPLATE"].includes(el.tagName)) continue;
      el.setAttribute("inert", "");
      inerted.push(el);
    }
    const onResize = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setMobile(false);
      else if (rowRef.current) setDrawerTop(rowRef.current.getBoundingClientRect().bottom);
    };
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = prevOverflow;
      inerted.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("resize", onResize);
    };
  }, [mobile]);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const toggleMobile = () => {
    if (!mobile && rowRef.current) setDrawerTop(rowRef.current.getBoundingClientRect().bottom);
    setMobile(!mobile);
  };

  // Mouse clicks only open (hover already did); keyboard and touch toggle.
  const onTriggerClick = (label: string) => (e: ReactMouseEvent) => {
    const pointer = (e.nativeEvent as PointerEvent).pointerType;
    setOpen(pointer === "mouse" ? label : open === label ? null : label);
  };

  // The panel sits after the whole top row in the DOM, so Tab moves into it from its trigger and out to the next item.
  const onTriggerKey = (label: string) => (e: ReactKeyboardEvent) => {
    if (e.key !== "Tab" || e.shiftKey || open !== label) return;
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    if (!first) return;
    e.preventDefault();
    first.focus();
  };
  const onPanelKey = (e: ReactKeyboardEvent) => {
    if (e.key !== "Tab" || !open || !panelRef.current) return;
    const links = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a"));
    const trigger = triggers.current[open];
    if (e.shiftKey && document.activeElement === links[0]) {
      e.preventDefault();
      trigger?.focus();
    } else if (!e.shiftKey && document.activeElement === links[links.length - 1] && trigger && rowRef.current) {
      const row = Array.from(rowRef.current.querySelectorAll<HTMLElement>("a, button")).filter(visible);
      const next = row[row.indexOf(trigger) + 1];
      if (!next) return;
      e.preventDefault();
      setOpen(null);
      next.focus();
    }
  };

  const active = items.find((i) => i.label === open);
  const isCurrent = (href: string) => (pathname === href ? ("page" as const) : undefined);
  const fade = reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <DoorBar current={current} taPaths={taPaths} searchHref={searchHref} />
      <header
        ref={headerRef}
        className={clsx(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled || open ? "border-line bg-bg/90 backdrop-blur-xl" : "border-transparent bg-bg",
        )}
        onPointerLeave={(e) => isMouse(e) && leave()}
        onFocus={(e) => {
          // Focus moved to anything other than the open trigger or its panel: close.
          if (!open) return;
          const t = e.target as Node;
          if (triggers.current[open]?.contains(t) || panelRef.current?.contains(t)) return;
          setOpen(null);
        }}
        onBlur={(e) => {
          if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
        }}
      >
        <div ref={rowRef} className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-5 px-5 md:h-[72px] md:px-8">
          <Link href="/" className="shrink-0" aria-label={`${SITES[current].name} home`}>
            {logo}
          </Link>

          <nav aria-label="Main" className="hidden min-w-0 flex-1 items-center gap-0.5 xl:flex">
            {items.map((item, i) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <div key={item.label} onPointerEnter={(e) => isMouse(e) && (item.columns ? enter(item.label) : setOpen(null))}>
                  {item.columns ? (
                    <button
                      ref={(el) => {
                        triggers.current[item.label] = el;
                      }}
                      type="button"
                      aria-expanded={open === item.label}
                      aria-controls={`${uid}-mega-${i}`}
                      onClick={onTriggerClick(item.label)}
                      onKeyDown={onTriggerKey(item.label)}
                      className={clsx(
                        "inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-pill px-2.5 text-[0.88rem] font-medium transition-colors",
                        open === item.label || isActive ? "bg-ink/[0.06] text-ink" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      {item.color && <span className="size-2 rounded-full" style={{ background: item.color }} />}
                      {item.label}
                      <ChevronDown className={clsx("size-3.5 opacity-60 transition-transform", open === item.label && "rotate-180")} aria-hidden />
                    </button>
                  ) : (
                    <SmartLink
                      href={item.href}
                      onClick={closeAll}
                      aria-current={isCurrent(item.href)}
                      className={clsx("inline-flex h-10 items-center whitespace-nowrap rounded-pill px-2.5 text-[0.88rem] font-medium", isActive ? "bg-ink/[0.06] text-ink" : "text-ink-2 hover:text-ink")}
                    >
                      {item.label}
                    </SmartLink>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            {ctas.map((c, i) => (
              <SmartLink key={c.label} href={c.href} onClick={closeAll} className={buttonClass(c.variant ?? "primary", "sm", i < ctas.length - 1 ? "max-[1439px]:hidden" : undefined)}>
                {c.label}
              </SmartLink>
            ))}
          </div>

          <button
            ref={burgerRef}
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center rounded-pill text-ink xl:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls={drawerId}
            onClick={toggleMobile}
          >
            {mobile ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>

        {/* Desktop mega menu */}
        <AnimatePresence>
          {active?.columns && (
            <motion.div
              key="mega"
              ref={panelRef}
              id={`${uid}-mega-${items.indexOf(active)}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={fade}
              onPointerEnter={(e) => isMouse(e) && enter(active.label)}
              onKeyDown={onPanelKey}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-bg/97 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] backdrop-blur-xl xl:block"
            >
              <div className="container-site grid grid-cols-12 gap-8 py-9">
                <div className={clsx("grid gap-8", active.featured ? "col-span-9" : "col-span-12")} style={{ gridTemplateColumns: `repeat(${active.columns.length}, minmax(0, 1fr))` }}>
                  {active.columns.map((col) => (
                    <div key={col.title}>
                      <p className="eyebrow mb-4">{col.title}</p>
                      <ul className="space-y-1">
                        {col.links.map((l) => (
                          <li key={l.label}>
                            <SmartLink href={l.href} onClick={closeAll} aria-current={isCurrent(l.href)} className="group -mx-2.5 flex items-start gap-2.5 rounded-lg px-2.5 py-2 hover:bg-ink/[0.04]">
                              {l.color && <span className="mt-[7px] size-2 shrink-0 rounded-full" style={{ background: l.color }} />}
                              <span>
                                <span className="block text-[0.93rem] font-medium text-ink group-hover:text-primary">{l.label}</span>
                                {l.desc && <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{l.desc}</span>}
                              </span>
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {active.featured && (
                  <SmartLink href={active.featured.href} onClick={closeAll} className="group col-span-3 flex flex-col justify-between rounded-[var(--radius-card)] bg-inverse p-6 text-inverse-ink">
                    <div>
                      <p className="font-mono text-[0.7rem] uppercase tracking-widest opacity-60">{active.featured.eyebrow}</p>
                      <p className="mt-3 font-display text-xl font-semibold leading-snug">{active.featured.title}</p>
                      <p className="mt-2 text-sm opacity-75">{active.featured.text}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-inverse-ink underline decoration-[var(--primary)] decoration-2 underline-offset-4">
                      {active.featured.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </SmartLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobile && (
            <motion.div
              id={drawerId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={fade}
              style={{ height: `calc(100dvh - ${drawerTop}px)` }}
              className="overflow-y-auto overscroll-contain border-t border-line bg-bg xl:hidden"
            >
              <nav aria-label="Main" className="container-site pb-32 pt-2">
                {items.map((item) => (
                  <div key={item.label} className="border-b border-line">
                    {item.columns ? (
                      <>
                        <button
                          type="button"
                          className="flex min-h-14 w-full items-center justify-between text-left text-lg font-medium text-ink"
                          aria-expanded={mobileItem === item.label}
                          onClick={() => setMobileItem(mobileItem === item.label ? null : item.label)}
                        >
                          <span className="inline-flex items-center gap-2">
                            {item.color && <span className="size-2.5 rounded-full" style={{ background: item.color }} />}
                            {item.label}
                          </span>
                          <ChevronDown className={clsx("size-5 transition-transform", mobileItem === item.label && "rotate-180")} aria-hidden />
                        </button>
                        {mobileItem === item.label && (
                          <div className="space-y-5 pb-5">
                            {item.columns.map((col) => (
                              <div key={col.title}>
                                <p className="eyebrow mb-2">{col.title}</p>
                                {col.links.map((l) => (
                                  <SmartLink key={l.label} href={l.href} onClick={closeAll} aria-current={isCurrent(l.href)} className="flex min-h-11 items-center text-ink-2 aria-[current=page]:font-semibold aria-[current=page]:text-ink">
                                    {l.label}
                                  </SmartLink>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <SmartLink href={item.href} onClick={closeAll} aria-current={isCurrent(item.href)} className="flex min-h-14 items-center text-lg font-medium text-ink aria-[current=page]:underline aria-[current=page]:underline-offset-8">
                        {item.label}
                      </SmartLink>
                    )}
                  </div>
                ))}
                <div className="mt-4 flex flex-wrap items-center gap-x-6 text-ink-2">
                  {searchHref && (
                    <SmartLink href={searchHref} onClick={closeAll} className="inline-flex min-h-11 items-center gap-2">
                      <Search className="size-4" aria-hidden /> Search
                    </SmartLink>
                  )}
                  <SmartLink href="/verify" onClick={closeAll} className="inline-flex min-h-11 items-center gap-2">
                    <ShieldCheck className="size-4" aria-hidden /> Verify a credential
                  </SmartLink>
                  <a href={siteHref("studio", "/sign-in")} className="inline-flex min-h-11 items-center">
                    Log in
                  </a>
                  {lang.tamil && <LanguageLinks taPaths={taPaths} icon linkClassName="inline-flex min-h-11 items-center" />}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted">
                  {(["schools", "flywheel", "studio"] as SiteKey[]).map((k) => (
                    <a
                      key={k}
                      href={SITES[k].url}
                      aria-current={k === current ? "page" : undefined}
                      className={clsx("inline-flex min-h-11 items-center rounded-pill border border-line px-4", k === current && "bg-surface font-semibold text-ink")}
                    >
                      {SITES[k].name}
                    </a>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {mobileStickyCta && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 p-3 backdrop-blur xl:hidden">
          <SmartLink href={mobileStickyCta.href} className={buttonClass(mobileStickyCta.variant ?? "primary", "md", "w-full")}>
            {mobileStickyCta.label}
          </SmartLink>
        </div>
      )}
    </>
  );
}
