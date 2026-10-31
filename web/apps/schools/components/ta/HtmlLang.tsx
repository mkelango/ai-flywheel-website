"use client";

import { useEffect } from "react";

/** Sets <html lang> to Tamil while a /ta page is open, and restores English on the way out. */
export function HtmlLang({ lang = "ta" }: { lang?: string }) {
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
