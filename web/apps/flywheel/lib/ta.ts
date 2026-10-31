import { TA_PROGRAMME_SLUGS } from "./ta-content";

/** English paths that have a Tamil version under /ta (drives the English | தமிழ் switch). */
export const TA_PATHS: string[] = [
  "/",
  "/professionals",
  "/higher-education",
  "/business",
  "/government",
  "/programmes",
  ...TA_PROGRAMME_SLUGS.map((slug) => `/programmes/${slug}`),
];

/** English canonical, plus en-IN / ta-IN / x-default alternates when a Tamil twin exists. */
export function enAlternates(path: string) {
  if (!TA_PATHS.includes(path)) return { canonical: path };
  const ta = path === "/" ? "/ta" : `/ta${path}`;
  return { canonical: path, languages: { "en-IN": path, "ta-IN": ta, "x-default": path } };
}
