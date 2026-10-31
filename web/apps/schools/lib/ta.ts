import type { Metadata } from "next";

/** English paths that have a Tamil version under /ta (drives the English | தமிழ் switch). */
export const TA_PATHS: string[] = [
  "/",
  "/programmes",
  "/programmes/play",
  "/programmes/spark",
  "/programmes/practitioner",
  "/programmes/builders-club",
  "/programmes/boards",
  "/parents",
  "/parents/learning",
  "/parents/safety",
  "/parents/screen-time",
  "/parents/guides",
  "/parents/faq",
  "/mission",
  "/mission/schools",
  "/mission/progress",
  "/mission/csr",
  "/kids",
];

/** The /ta path for an English path. */
export const taPath = (en: string) => (en === "/" ? "/ta" : `/ta${en}`);

/** Tamil page metadata: Tamil title/description, canonical /ta URL, en-IN and ta-IN alternates. */
/** Trim text at a word boundary so meta descriptions stay within what search results show. */
export function clampText(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

export function taMeta(en: string, title: string, description: string): Metadata {
  const ta = taPath(en);
  description = clampText(description);
  return {
    title,
    description,
    alternates: { canonical: ta, languages: { "en-IN": en, "ta-IN": ta, "x-default": en } },
    openGraph: { siteName: "AI Flywheel at Schools", locale: "ta_IN", type: "website", title, description, url: ta, images: ["/opengraph-image"] },
  };
}

/** English page alternates: its own canonical, plus en-IN, ta-IN and x-default when a Tamil version exists. */
export function enAlternates(en: string): Metadata["alternates"] {
  if (!TA_PATHS.includes(en)) return { canonical: en };
  return { canonical: en, languages: { "en-IN": en, "ta-IN": taPath(en), "x-default": en } };
}
