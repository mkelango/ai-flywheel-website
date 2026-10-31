"use client";

import { useEffect } from "react";

/** Sets <html lang> for the Tamil subtree after hydration, and restores English on the way out. */
export function DocLang({ lang }: { lang: string }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = lang;
    return () => {
      el.lang = prev || "en-IN";
    };
  }, [lang]);
  return null;
}
