import type { MetadataRoute } from "next";
import { PROGRAMMES } from "@/lib/programmes";
import { STAGE_PAGES, LEVEL_SLUGS, TRACK_PAGE_SLUGS } from "@/lib/learn";
import { LABS, INDUSTRIES } from "@/lib/orgs";
import { TRUST_PAGES } from "@/lib/company";
import { TOPICS, INSIGHT_ARTICLES, GLOSSARY } from "@/lib/research";
import { GOV_OFFERS } from "@/lib/government";
import { TA_PATHS } from "@/lib/ta";
import { UPDATED } from "@/lib/seo";

const BASE = "https://aiflywheel.in";

/** Every indexable page. /search is noindex and stays out. */
const PAGES = [
  "", "/programmes", "/professionals", "/higher-education", "/business", "/government", "/framework", "/check", "/verify", "/about", "/contact",
  // Programmes and learners
  "/certifications", "/certifications/exams", "/batches", "/pricing", "/scholarships", "/cohorts", "/portfolio", "/free",
  // Higher Education
  "/campus-partnership", "/credit-courses", "/faculty", "/campus-labs", "/challenges", "/students", "/partners",
  // Business
  "/business/enterprise", "/business/startups", "/business/check", "/business/platform", "/business/industries", "/case-studies",
  // Framework, research and company
  "/books", "/research/report", "/insights", "/glossary", "/mission-2047", "/partners/knowledge", "/trust",
  "/investors", "/careers", "/news", "/terms", "/summit",
  "/free/30-day-path", "/free/success-definition", "/free/data-readiness", "/free/sample-gate-log",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(UPDATED.iso);
  const entry = (path: string, priority = 0.7): MetadataRoute.Sitemap[number] => {
    const twin = TA_PATHS.includes(path || "/");
    return {
      url: `${BASE}${path}`,
      lastModified,
      changeFrequency: "weekly",
      priority,
      ...(twin ? { alternates: { languages: { "en-IN": `${BASE}${path || "/"}`, "ta-IN": `${BASE}/ta${path}` } } } : {}),
    };
  };
  return [
    ...PAGES.map((p) => entry(p, p === "" ? 1 : 0.8)),
    ...PROGRAMMES.map((p) => entry(`/programmes/${p.slug}`, p.featured ? 0.9 : 0.7)),
    ...STAGE_PAGES.map((s) => entry(`/programmes/${s.slug}`)),
    ...LEVEL_SLUGS.map((l) => entry(`/programmes/level/${l}`)),
    ...TRACK_PAGE_SLUGS.map((t) => entry(`/tracks/${t}`)),
    ...LABS.map((l) => entry(`/campus-labs/${l.slug}`)),
    ...INDUSTRIES.map((i) => entry(`/business/industries/${i.slug}`, 0.6)),
    ...GOV_OFFERS.map((o) => entry(`/government/${o.slug}`)),
    ...TOPICS.map((t) => entry(`/framework/${t.slug}`)),
    ...TRUST_PAGES.map((t) => entry(`/trust/${t.slug}`, 0.5)),
    ...INSIGHT_ARTICLES.map((a) => entry(`/insights/${a.slug}`, 0.6)),
    ...GLOSSARY.map((g) => entry(`/glossary/${g.slug}`, 0.5)),
    ...TA_PATHS.map((p) => ({ url: `${BASE}${p === "/" ? "/ta" : `/ta${p}`}`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
