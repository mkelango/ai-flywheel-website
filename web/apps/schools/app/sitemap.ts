import type { MetadataRoute } from "next";
import { PROGRAMMES } from "@/lib/data";
import { TA_PATHS, taPath } from "@/lib/ta";
import { SITE } from "@/lib/seo";

/** Content last reviewed. Bump when pages change. /search is noindex, so it is not listed. */
const LAST_MODIFIED = new Date("2026-10-30");

const url = (p: string) => `${SITE}${p === "/" ? "" : p}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/programmes", ...PROGRAMMES.map((p) => `/programmes/${p.slug}`), "/for-schools", "/lab", "/teachers", "/parents", "/kids", "/mission", "/demo", "/check", "/trust", "/verify", "/contact", "/programmes/boards", "/events", "/partnership", "/mark", "/pricing", "/pilot", "/stories", ...["flywheel", "kits", "workshops", "community"].map((t) => `/teachers/${t}`), ...["learning", "safety", "screen-time", "guides", "faq"].map((t) => `/parents/${t}`), ...["summer-camp", "weekend-club", "bootcamp", "at-home", "find", "host"].map((t) => `/kids/${t}`), ...["schools", "progress", "csr"].map((t) => `/mission/${t}`), ...["children-privacy", "processing-terms", "ai-register", "grievance"].map((t) => `/trust/${t}`), ...["talking-about-ai-at-dinner", "spotting-fakes", "homework-and-honesty", "screens-for-making"].map((t) => `/parents/guide/${t}`), "/kids/sampler"];
  const priority = (p: string) => (p === "/" ? 1 : p === "/kids" || p === "/programmes" || p === "/for-schools" ? 0.9 : 0.7);
  const entry = (p: string, loc: string): MetadataRoute.Sitemap[number] => ({
    url: url(loc),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: loc.startsWith("/ta") ? Math.round((priority(p) - 0.1) * 10) / 10 : priority(p),
    ...(TA_PATHS.includes(p) ? { alternates: { languages: { "en-IN": url(p), "ta-IN": url(taPath(p)) } } } : {}),
  });
  return [...paths.map((p) => entry(p, p)), ...TA_PATHS.map((p) => entry(p, taPath(p)))];
}
