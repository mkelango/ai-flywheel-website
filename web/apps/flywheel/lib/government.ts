/**
 * Government offer pages. Sources: Website Strategy 2.0 (p. 23, Government offers and Buying)
 * and the Foundation Studio Playbook, Chapter 46 (programme governance).
 * Non-partisan rule (Ed. 1.1): name programmes and departments, never people or parties.
 */

export type GovOffer = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  line: string;
  description: string;
  rows: { t: string; d: string }[];
  link?: { href: string; label: string };
};

export const GOV_OFFERS: GovOffer[] = [
  {
    slug: "civil-service",
    name: "Civil service programme",
    eyebrow: "Government · Civil service programme",
    title: "Officers skilled by stage and level.",
    line: "C1 in all four stages and C3 Builder in CORE, in Tamil and English.",
    description: "A civil service AI programme: C1 Aware in all four stages and C3 Builder in CORE governance, in Tamil and English, delivered alongside iGOT Karmayogi.",
    rows: [
      { t: "C1 in all four stages", d: "Foundation, Generative, Agentic and Physical: what each is, why it matters and where it fails." },
      { t: "C3 Builder in CORE", d: "Set the risk tier, the owner and the kill switch inside a real turn." },
      { t: "Tamil and English", d: "Taught and assessed in both languages." },
      { t: "Alongside iGOT Karmayogi", d: "Delivered next to the national platform, not competing with it." },
      { t: "Reported by level", d: "Officers counted by stage and level, not by course enrolments." },
    ],
    link: { href: "/programmes/foundation", label: "See the free C1 course" },
  },
  {
    slug: "chief-ai-officer",
    name: "Chief AI Officer programme",
    eyebrow: "Government · Chief AI Officer programme",
    title: "Govern a portfolio, not a pilot.",
    line: "The C5 track for the officer who answers for adoption, governance and the portfolio.",
    description: "A C5 track for chief AI officers in government: the AI council, the hub, one census and the Flywheel Handoff Map (Foundation Studio Playbook, Chapter 46).",
    rows: [
      { t: "Chief AI officer", d: "Answers for adoption, governance and the portfolio. Never signs a gate on their own team's work." },
      { t: "AI council", d: "Sets decision rights and tier ceilings; funds turns; decides cross-unit reuse and kills." },
      { t: "The hub", d: "Owns the floor, the gateway, the census, eval standards and CORE policy." },
      { t: "One census", d: "Every model, pipeline, agent and machine, with an owner and a risk tier." },
      { t: "Flywheel Handoff Map", d: "Shows which turn feeds which, and where a baton dropped." },
    ],
    link: { href: "/programmes/ai-flywheel-strategist", label: "See the AI Flywheel Strategist (C5)" },
  },
  {
    slug: "use-case-clinic",
    name: "Public-sector use-case clinic",
    eyebrow: "Government · Use-case clinic",
    title: "Bring one service. Run one turn.",
    line: "Departments bring a service; teams run one DRIVE turn with CORE gates.",
    description: "A public-sector AI use-case clinic: a department brings one service and its team runs one DRIVE turn, with CORE governance gates.",
    rows: [
      { t: "Diagnose", d: "Pick one service with the Opportunity Selection Matrix; run the Data-Readiness Checklist; write success as a number." },
      { t: "Resource", d: "A small, right team and a vendor-neutral architecture." },
      { t: "Implement", d: "Redesign the workflow, with a named owner and a tested kill switch." },
      { t: "Validate", d: "Measure against the baseline, honestly." },
      { t: "Expand", d: "Standardise the win and name the next turn it feeds." },
    ],
    link: { href: "/free/success-definition", label: "Start with the Success-Definition One-Pager" },
  },
  {
    slug: "economy-program",
    name: "The Economy Program",
    eyebrow: "Government · The Economy Program",
    title: "Count Builders, not enrolments.",
    line: "State scale: a public count of Builders by stage, in place of enrolment numbers.",
    description: "The Economy Program: AI capability at state scale, reported as a public count of Builders by stage, such as Builders in Agentic AI in Tamil Nadu.",
    rows: [
      { t: "A public count", d: "For example, Builders in Agentic AI in Tamil Nadu." },
      { t: "By stage and level", d: "People counted on one ladder, C1 to C5, across the four stages." },
      { t: "Verified credentials", d: "Each level is evidence-based and can be checked." },
      { t: "Schools to boardroom", d: "School delivery runs on AI Flywheel at Schools; adults on aiflywheel.in." },
    ],
    link: { href: "/mission-2047", label: "Read Mission 2047" },
  },
  {
    slug: "buying",
    name: "Buying",
    eyebrow: "Government · Buying",
    title: "GeM, empanelment and MoU routes.",
    line: "Formats suited to a tender. Ask which routes are open for your department.",
    description: "How government departments can buy AI Flywheel programmes: GeM listing, empanelment and MoU routes, in formats suited to a tender.",
    rows: [
      { t: "GeM listing", d: "Buy through the Government e-Marketplace." },
      { t: "Empanelment", d: "Join a department's panel of approved training providers." },
      { t: "MoU", d: "A memorandum of understanding for a multi-year programme." },
      { t: "Tender formats", d: "Scope, levels and reporting written to fit a tender." },
    ],
  },
];

export function getGovOffer(slug: string) {
  return GOV_OFFERS.find((o) => o.slug === slug);
}
