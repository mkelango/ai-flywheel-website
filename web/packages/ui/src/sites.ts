/**
 * The three doors. AI Flywheel and Schools share aiflywheel.in (Schools at /schools); Studio has
 * aiflywheel.studio. Production builds link to the live URLs; local dev uses ports 3000-3002. NEXT_PUBLIC_*_URL overrides either (e.g. for staging).
 */
export type SiteKey = "flywheel" | "schools" | "studio";

const LIVE = process.env.NODE_ENV === "production";

export const SITES: Record<SiteKey, { name: string; domain: string; url: string; doorLabel: string }> = {
  schools: {
    name: "AI Flywheel at Schools",
    domain: "aiflywheel.in/schools",
    url: process.env.NEXT_PUBLIC_SCHOOLS_URL ?? (LIVE ? "https://aiflywheel.in/schools" : "http://localhost:3000/schools"),
    doorLabel: "For schools",
  },
  flywheel: {
    name: "AI Flywheel",
    domain: "aiflywheel.in",
    url: process.env.NEXT_PUBLIC_FLYWHEEL_URL ?? (LIVE ? "https://aiflywheel.in" : "http://localhost:3000"),
    doorLabel: "For colleges, professionals and business",
  },
  studio: {
    name: "AI Flywheel Studio",
    domain: "aiflywheel.studio",
    url: process.env.NEXT_PUBLIC_STUDIO_URL ?? (LIVE ? "https://aiflywheel.studio" : "http://localhost:3002"),
    doorLabel: "Studio",
  },
};

/** Absolute link to a page on another door, e.g. siteHref("flywheel", "/verify"). */
export function siteHref(site: SiteKey, path = "/") {
  return path === "/" ? SITES[site].url : `${SITES[site].url}${path}`;
}

/** The four stages of the wheel. Colours are fixed across all three brands. */
export const STAGES = [
  { key: "foundation", name: "Foundation", verb: "Know", studio: "Model Studio", color: "#3B4BA8", line: "The floor: know your data and models" },
  { key: "generative", name: "Generative", verb: "Make", studio: "Generative Studio", color: "#B8306F", line: "Table stakes: make with AI, safely" },
  { key: "agentic", name: "Agentic", verb: "Do", studio: "Agentic Studio", color: "#D98B0B", line: "The value frontier: build agents that act" },
  { key: "physical", name: "Physical", verb: "Move", studio: "Robotic Studio", color: "#13827F", line: "The industrial frontier: put intelligence into machines" },
] as const;

export const LEVELS = [
  { code: "C1", name: "Aware", line: "Explains the stage and why it matters", evidence: "Scenario quiz, taken without AI" },
  { code: "C2", name: "Practitioner", line: "Uses AI well, checks every output", evidence: "A logged use case, plus the same task done without AI" },
  { code: "C3", name: "Builder", line: "Ships one real turn through the life cycle", evidence: "Gate records and an oral defence" },
  { code: "C4", name: "Leader", line: "Runs a portfolio and its governance", evidence: "Expansion and accountability records for a live system" },
  { code: "C5", name: "Architect", line: "Designs the system every stage stands on", evidence: "A Handoff Map; teaching a cohort" },
] as const;
