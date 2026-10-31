/**
 * Shared SEO, AEO and GEO helpers for aiflywheel.studio.
 * One entity graph across the three AI Flywheel domains: the Organization
 * node uses the same @id as aiflywheel.in, so answer engines join them up.
 */

export const SITE_URL = "https://aiflywheel.studio";
export const ORG_ID = "https://aiflywheel.in/#organization";
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const STUDIO_APP_ID = `${SITE_URL}/#software`;

/** Shown as "Updated <month year>" on reference pages; keep in step with the sitemap. */
export const UPDATED = { label: "October 2026", iso: "2026-10-30" };

export const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "AI Flywheel",
  url: "https://aiflywheel.in",
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
  slogan: "Learn it. Build it. Prove it.",
  parentOrganization: { "@type": "Organization", name: "Inevitra Advisory" },
  sameAs: ["https://aiflywheel.in", "https://schools.aiflywheel.in", SITE_URL],
} as const;

export const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "AI Flywheel Studio",
  alternateName: "Studio",
  url: SITE_URL,
  inLanguage: "en-IN",
  description: "The agentic AI platform of AI Flywheel: sign in, start a project and ship it through signed gates.",
  publisher: { "@id": ORG_ID },
} as const;

export type QA = { q: string; a: string };

export function faqLd(items: readonly QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** SoftwareApplication node. No offers until a price is published; never a rating. */
export function softwareLd({ name, path, description }: { name: string; path: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": path === "/" ? STUDIO_APP_ID : `${abs(path)}#software`,
    name,
    url: abs(path),
    description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    ...(path === "/" ? {} : { isPartOf: { "@id": STUDIO_APP_ID } }),
  };
}
