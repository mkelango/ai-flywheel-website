"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import clsx from "clsx";

/** English and Tamil links for the current path. Tamil pages live under /ta; paths without a Tamil page fall back to /ta. */
export function useLanguageLinks(taPaths?: string[]) {
  const path = usePathname() ?? "/";
  const isTamil = path === "/ta" || path.startsWith("/ta/");
  const english = isTamil ? path.slice(3) || "/" : path;
  const tamil = taPaths?.includes(english) ? (english === "/" ? "/ta" : `/ta${english}`) : taPaths?.length ? "/ta" : undefined;
  return { isTamil, english, tamil };
}

/**
 * Working "English | தமிழ்" switch. Without taPaths the Tamil link goes to /ta.
 * Sites with no Tamil mirror (Studio) should not render it.
 */
export function LanguageLinks({
  taPaths,
  icon,
  className,
  linkClassName,
  activeClassName = "font-medium text-ink",
  inactiveClassName = "hover:text-ink",
}: {
  taPaths?: string[];
  icon?: boolean;
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  const lang = useLanguageLinks(taPaths);
  const tamil = lang.tamil ?? "/ta";
  return (
    <span className={clsx("inline-flex items-center gap-1.5", className)}>
      {icon && <Globe className="size-3.5" aria-hidden />}
      <Link href={lang.english} hrefLang="en-IN" aria-current={lang.isTamil ? undefined : "true"} className={clsx(linkClassName, lang.isTamil ? inactiveClassName : activeClassName)}>
        English
      </Link>
      <span aria-hidden>|</span>
      <Link href={tamil} lang="ta" hrefLang="ta-IN" aria-current={lang.isTamil ? "true" : undefined} className={clsx(linkClassName, lang.isTamil ? activeClassName : inactiveClassName)}>
        தமிழ்
      </Link>
    </span>
  );
}
