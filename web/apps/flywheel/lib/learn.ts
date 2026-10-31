/**
 * Data for the learner pages: stages, levels, credentials, batches, tracks and free resources.
 * Sources: Website Strategy 2.0 (pp. 09, 10, 20, 21) and the Foundation Studio Playbook, Chapter 45.
 */
import { LEVELS } from "@flywheel/ui/sites";
import { CORE, DRIVE, MATRIX, TRACKS, type CoreStage } from "./framework";
import { PROGRAMMES, type LevelCode, type Programme, type StageKey } from "./programmes";

/* ---------------------------------------------------------------- Stages */

export type StagePageKey = Exclude<StageKey, "all">;

export type StagePage = {
  slug: string;
  stage: StagePageKey;
  name: string;
  tagline: string;
  line: string;
  lifecycle: string;
  /** The life cycle or strand broken into its parts. */
  parts: { letter: string; word: string; line: string }[] | null;
  studio: { name: string; path: string } | null;
  levels: Record<LevelCode, string>;
};

const STUDIO_PATH: Record<CoreStage, string> = { foundation: "/model", generative: "/generative", agentic: "/agentic", physical: "/robotic" };

const STAGE_LINES: Record<CoreStage, string> = {
  foundation: "Know your data and models. The floor sets the ceiling for every other stage.",
  generative: "Make with AI, safely: draft, check, and keep a rights ledger.",
  agentic: "Build agents that act, with an owner, evals and a tested kill switch.",
  physical: "Put intelligence into machines: simulation first, then the bench.",
};

const NAMES: Record<StagePageKey, string> = {
  foundation: "Foundation AI",
  generative: "Generative AI",
  agentic: "Agentic AI",
  physical: "Physical AI and robotics",
  core: "CORE: governance and risk",
  drive: "DRIVE: strategy and delivery",
};

function coreStage(stage: CoreStage, slug: string): StagePage {
  const m = MATRIX[stage];
  return {
    slug,
    stage,
    name: NAMES[stage],
    tagline: m.tagline,
    line: STAGE_LINES[stage],
    lifecycle: m.lifecycle,
    parts: null,
    studio: { name: m.studio, path: STUDIO_PATH[stage] },
    levels: m.levels,
  };
}

export const STAGE_PAGES: StagePage[] = [
  coreStage("foundation", "foundation-ai"),
  coreStage("generative", "generative"),
  coreStage("agentic", "agentic"),
  coreStage("physical", "physical"),
  {
    slug: "core",
    stage: "core",
    name: NAMES.core,
    tagline: "The rim",
    line: "Governance that runs through every stage: risk tiers, owners, and people in charge.",
    lifecycle: "CORE strand · crosses all four stages",
    parts: CORE,
    studio: null,
    levels: {
      C1: "Applies CORE risk thinking to an everyday AI use",
      C2: "Applies a risk tier to their own AI use; reports an incident",
      C3: "Sets the tier, the owner and the kill switch inside a real turn",
      C4: "Runs a Governance Quick Scan and an Accountability Register",
      C5: "Sets governance for the whole portfolio",
    },
  },
  {
    slug: "drive",
    stage: "drive",
    name: NAMES.drive,
    tagline: "The method",
    line: "Diagnose, Resource, Implement, Validate, Expand: the method behind every turn.",
    lifecycle: "DRIVE strand · crosses all four stages",
    parts: DRIVE,
    studio: null,
    levels: {
      C1: "Describes DRIVE and writes one success measure",
      C2: "Writes success as a number; redesigns a workflow",
      C3: "Runs one turn through DRIVE, gate by gate",
      C4: "Runs a portfolio of turns with the Expansion Checklist",
      C5: "Draws a Handoff Map and lifts a binding constraint",
    },
  },
];

export function getStagePage(slug: string) {
  return STAGE_PAGES.find((s) => s.slug === slug);
}

export function stageSlug(stage: StageKey) {
  return STAGE_PAGES.find((s) => s.stage === stage)?.slug;
}

/* ---------------------------------------------------------------- Levels */

export const LEVEL_SLUGS = ["c1", "c2", "c3", "c4", "c5"] as const;

export const LEVEL_MEANS: Record<LevelCode, string> = {
  C1: "You can explain the stage, why it matters and where it fails.",
  C2: "You use AI in your own work, check every output and log what failed.",
  C3: "You ship one real turn through the stage's life cycle, gate by gate.",
  C4: "You run a portfolio of turns and the governance around them.",
  C5: "You design the system every stage stands on, and teach it.",
};

export function getLevel(slug: string) {
  const i = LEVEL_SLUGS.indexOf(slug.toLowerCase() as (typeof LEVEL_SLUGS)[number]);
  if (i < 0) return undefined;
  const l = LEVELS[i];
  const code = l.code as LevelCode;
  return {
    slug: LEVEL_SLUGS[i],
    code,
    name: l.name,
    line: l.line,
    evidence: l.evidence,
    means: LEVEL_MEANS[code],
    next: i < LEVELS.length - 1 ? { slug: LEVEL_SLUGS[i + 1], code: LEVELS[i + 1].code, name: LEVELS[i + 1].name } : null,
    programmes: PROGRAMMES.filter((p) => p.level === code),
  };
}

/* ---------------------------------------------------------- Credentials */

/** Live L1–L4 certificates mapped to C1–C5 (Website Strategy 2.0, p. 10). */
export const CREDENTIAL_MAP: { live: string; becomes: string; earnedBy: string }[] = [
  { live: "L1 AI Flywheel Foundation", becomes: "C1 Aware · AI Flywheel Foundation", earnedBy: "Free course plus a proctored scenario quiz, taken without AI" },
  { live: "L1 Generative AI Practitioner", becomes: "C2 Practitioner · Generative AI", earnedBy: "A logged use case plus the same task done unaided" },
  { live: "New", becomes: "C2 Practitioner · Working with AI Agents", earnedBy: "Delegate, read a trace, escalate" },
  { live: "New", becomes: "C2 Practitioner · CORE for Every Team", earnedBy: "Apply a risk tier to your own use" },
  { live: "L2 Agentic AI Engineer", becomes: "C3 Builder · Agentic AI Engineer", earnedBy: "One agent release through the ADLC, G1 to G6" },
  { live: "New", becomes: "C3 Builder · Model Engineer", earnedBy: "One model through the MDLC" },
  { live: "New", becomes: "C3 Builder · Generative AI Engineer", earnedBy: "One pipeline through the GDLC with a rights ledger" },
  { live: "L2 Physical AI / Robotics", becomes: "C3 Builder · Physical AI and Robotics Engineer", earnedBy: "One cell through the RDLC" },
  { live: "L3 DRIVE Implementer", becomes: "C4 Leader · DRIVE Implementer", earnedBy: "Runs a portfolio of turns; Expansion Checklist" },
  { live: "L3 CORE Governance Specialist", becomes: "C4 Leader · CORE Governance Lead", earnedBy: "Governance Quick Scan; Accountability Register" },
  { live: "L4 AI Flywheel Strategist", becomes: "C5 Architect · AI Flywheel Strategist", earnedBy: "Handoff Map; a lifted binding constraint; panel" },
  { live: "Certified Trainer · ATO", becomes: "Knowledge Partner (outside the levels)", earnedBy: "C4 or above plus train-the-trainer; 15 to 25% revenue share (Ed 1.1)" },
];

/* -------------------------------------------------------------- Batches */

/** Turns the catalogue's "first batch" text into a sortable group. */
export function batchGroup(nextBatch: string): { key: string; label: string; order: number } {
  const t = nextBatch.replace(/^Launch,\s*/i, "");
  const month = t.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{4})$/i);
  if (month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const m = months.findIndex((x) => x.slice(0, 3).toLowerCase() === month[1].slice(0, 3).toLowerCase());
    return { key: t, label: `${months[m]} ${month[2]}`, order: Number(month[2]) * 12 + m };
  }
  if (/FY28 Q1/i.test(t)) return { key: t, label: "FY28 Q1 · April to June 2027", order: 2027 * 12 + 3 };
  if (/FY28 H2/i.test(t)) return { key: t, label: "FY28 H2 · October 2027 to March 2028", order: 2027 * 12 + 9 };
  if (/FY28/i.test(t)) return { key: t, label: "FY28 · dates to be confirmed", order: 2028 * 12 + 6 };
  return { key: t, label: t, order: 99999 };
}

export function applyHref(p: Programme) {
  const tag = p.format === "For organisations" || p.format === "Executive" ? "business" : "professionals";
  return `/contact?tag=${tag}&programme=${p.slug}`;
}

export function applyLabel(p: Programme) {
  return p.priceStatus === "Free" ? "Start free" : p.format === "For organisations" ? "Talk to us" : "Apply";
}

/* --------------------------------------------------------------- Tracks */

export type TrackStep = { phase: "Start" | "Build" | "Lead"; slug: string; note?: string };

/** URL slug → track key in lib/framework TRACKS. */
const TRACK_SLUGS: Record<string, string> = {
  developers: "developers",
  "data-ml": "data",
  product: "product",
  marketing: "marketing",
  risk: "risk",
  manufacturing: "manufacturing",
  students: "students",
};

const STUDIO_LINK: Record<string, string> = { Agentic: "/agentic", Model: "/model", Generative: "/generative", Robotic: "/robotic" };

export const TRACK_PAGE_SLUGS = Object.keys(TRACK_SLUGS);

export function getTrack(slug: string) {
  const key = TRACK_SLUGS[slug];
  const t = TRACKS.find((x) => x.key === key);
  if (!t) return undefined;
  const steps: TrackStep[] = t.programmes.map((s, i) => {
    if (i === 0) return { phase: "Start", slug: s };
    if (t.lead && i === t.programmes.length - 1) return { phase: "Lead", slug: s };
    return { phase: "Build", slug: s };
  });
  if (key === "students") {
    steps[1] = { ...steps[1], note: "Any C2. For example:" };
    steps[2] = { ...steps[2], note: "One C3 cohort, at a student price. For example:" };
  }
  return {
    ...t,
    slug,
    steps,
    roleList: t.roles.split(" · "),
    studioPath: STUDIO_LINK[t.studio] ?? null,
  };
}

export const TRACK_LINKS = TRACK_PAGE_SLUGS.map((slug) => ({ slug, name: TRACKS.find((t) => t.key === TRACK_SLUGS[slug])?.name ?? slug }));

/* -------------------------------------------------------- Free resources */

export const LEAD_MAGNETS: { title: string; kind: string; line: string; href: string }[] = [
  { title: "Success-Definition One-Pager", kind: "Template", line: "Write success as a number before anyone builds.", href: "/free/success-definition" },
  { title: "Data-Readiness Checklist", kind: "Checklist", line: "Check the data slice: fix it, or stop.", href: "/free/data-readiness" },
  { title: "Sample gate log", kind: "Sample", line: "What a turn's gate records look like, G1 to G6.", href: "/free/sample-gate-log" },
  { title: "30-day technical literacy path", kind: "Guide", line: "An hour a day for 30 days. Agentic Studio Playbook, Table 41.9.", href: "/free/30-day-path" },
];
