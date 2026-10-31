/**
 * Programme catalogue v1, from Website Strategy 2.0 (p. 20).
 * Prices in rupees, excluding GST. "Ed 1.1" bands come from Website Strategy Ed. 1.1 / IM §5.1;
 * "Proposed" bands are to be tested with willingness-to-pay research before launch.
 */

export type StageKey = "foundation" | "generative" | "agentic" | "physical" | "core" | "drive" | "all";
export type LevelCode = "C1" | "C2" | "C3" | "C4" | "C5";
export type Format = "Self-paced" | "Cohort" | "Executive" | "For organisations";
export type PriceStatus = "Proposed" | "Ed 1.1" | "Free";

export const STAGE_META: Record<StageKey, { label: string; short: string; color: string; studio?: string }> = {
  foundation: { label: "Foundation AI", short: "Foundation", color: "#3B4BA8", studio: "Model Studio" },
  generative: { label: "Generative AI", short: "Generative", color: "#B8306F", studio: "Generative Studio" },
  agentic: { label: "Agentic AI", short: "Agentic", color: "#D98B0B", studio: "Agentic Studio" },
  physical: { label: "Physical AI and robotics", short: "Physical", color: "#13827F", studio: "Robotic Studio" },
  core: { label: "CORE: governance and risk", short: "CORE", color: "#5B6472" },
  drive: { label: "DRIVE: strategy and delivery", short: "DRIVE", color: "#D9542A" },
  all: { label: "All four stages", short: "All stages", color: "#0A131F" },
};

export const LEVEL_NAMES: Record<LevelCode, string> = {
  C1: "Aware",
  C2: "Practitioner",
  C3: "Builder",
  C4: "Leader",
  C5: "Architect",
};

export type Week = { week: string; taught: string; turn: string; gate?: string };

export type Programme = {
  slug: string;
  level: LevelCode | null;
  title: string;
  /** Short descriptor after the title (from the catalogue). */
  focus: string;
  stage: StageKey;
  lifecycle: string;
  format: Format;
  formatDetail: string;
  hours: string;
  price: string;
  priceNote?: string;
  priceStatus: PriceStatus;
  studio: string;
  nextBatch: string;
  /** One-line outcome for the hero. */
  outcome: string;
  outcomes: string[];
  whoFor: string;
  prerequisites: string;
  build: string[];
  credential: string;
  book: string;
  modules?: Week[];
  usesCohortSyllabus?: boolean;
  next?: string;
  featured?: boolean;
  language: string;
};

/** Table 45.9 of the Foundation Studio Playbook: the 12-week cohort syllabus, gates marked. */
export const COHORT_WEEKS: Week[] = [
  { week: "1", taught: "The flywheel, the floor, the Four Leaks", turn: "Score three candidates on the Opportunity Selection Matrix", gate: "Aware quiz, without AI" },
  { week: "2", taught: "Diagnose: success as a number", turn: "Measure the baseline; write the One-Pager" },
  { week: "3", taught: "The Data-Readiness Checklist", turn: "Run it on the slice; fix or stop", gate: "G1 Data ready" },
  { week: "4", taught: "CORE I: tiers, fairness, sovereignty", turn: "Set the tier; draft the human role", gate: "Practitioner log due" },
  { week: "5", taught: "Resource: own the road, rent the car", turn: "Design; architecture-neutrality check", gate: "G2" },
  { week: "6", taught: "Stage elective", turn: "Build golden set v1" },
  { week: "7", taught: "Selection and bake-offs", turn: "Blind bake-off; routing card", gate: "G3" },
  { week: "8", taught: "Implement: don't pave the cow path", turn: "Redesign the workflow; change plan", gate: "Implementation Readiness Checklist" },
  { week: "9", taught: "Evals, judges and golden sets", turn: "Run the evals at shipping settings", gate: "G4" },
  { week: "10", taught: "CORE II: owners, black boxes, kill switches", turn: "Red-team; register row; kill-switch drill" },
  { week: "11", taught: "Validate: the sceptic's test", turn: "Validation Scorecard; evidence pack", gate: "Oral defence" },
  { week: "12", taught: "Expand and the Handoff Map", turn: "Go-live decision; Next-Turn Worksheet", gate: "G5; check without AI" },
  { week: "16", taught: "Retrieval session", turn: "Measure against the baseline", gate: "G6; Builder awarded" },
];

const C3_SHARED = {
  level: "C3" as const,
  format: "Cohort" as const,
  hours: "~8 h a week",
  priceStatus: "Ed 1.1" as const,
  usesCohortSyllabus: true,
  language: "English; Tamil support",
  prerequisites: "A C2 course in the same stage, or equivalent work experience. A five-question readiness check before you apply.",
};

export const PROGRAMMES: Programme[] = [
  {
    slug: "foundation",
    level: "C1",
    title: "AI Flywheel Foundation",
    focus: "The four stages, DRIVE, CORE, and where AI fails",
    stage: "all",
    lifecycle: "All four stages · strands",
    format: "Self-paced",
    formatDetail: "Self-paced",
    hours: "~6 h",
    price: "Free",
    priceNote: "Proctored quiz optional, ₹499 (Proposed)",
    priceStatus: "Free",
    studio: "Studio preview",
    nextBatch: "Launch, Dec 2026",
    outcome: "Understand the whole wheel in six hours, and earn Aware (C1).",
    outcomes: [
      "Explain the four stages and why data sets the ceiling",
      "Describe DRIVE: Diagnose, Resource, Implement, Validate, Expand",
      "Apply CORE risk thinking to an everyday AI use",
      "Spot the common ways AI projects fail",
      "Pick your next level and track with confidence",
    ],
    whoFor: "Anyone starting out: students, professionals, managers and officers.",
    prerequisites: "None. No card needed.",
    build: ["A one-page map of where AI could help in your own work", "Your Flywheel Check result by stage"],
    credential: "Aware (C1) · AI Flywheel Foundation, earned through a scenario quiz taken without AI",
    book: "The AI Flywheel (book): the four stages, DRIVE and CORE",
    modules: [
      { week: "1", taught: "The wheel: four stages and the floor", turn: "Map your own work to a stage" },
      { week: "2", taught: "DRIVE: success as a number", turn: "Write one success measure" },
      { week: "3", taught: "CORE: risk tiers and data", turn: "Tier one AI use you know" },
      { week: "4", taught: "Where AI fails", turn: "Scenario practice", gate: "Aware quiz, without AI" },
    ],
    next: "generative-ai-practitioner",
    featured: true,
    language: "English and Tamil",
  },
  {
    slug: "generative-ai-practitioner",
    level: "C2",
    title: "Generative AI Practitioner",
    focus: "Draft with AI daily, check every output",
    stage: "generative",
    lifecycle: "Generative",
    format: "Self-paced",
    formatDetail: "Self-paced + 2 live clinics",
    hours: "15–20 h",
    price: "₹4,999–7,999",
    priceStatus: "Proposed",
    studio: "Studio preview · Generative Studio in FY28",
    nextBatch: "Jan 2027",
    outcome: "Use generative AI well in your daily work, and earn Practitioner (C2).",
    outcomes: [
      "Draft text, images and media with AI, every day",
      "Check every output against a source or a rule",
      "Log what failed and why",
      "Handle rights, provenance and disclosure",
      "Do the same task without AI, to prove the skill is yours",
    ],
    whoFor: "Professionals in marketing, media, operations and any writing-heavy role.",
    prerequisites: "AI Flywheel Foundation (C1), or equivalent.",
    build: ["A logged use case from your own work", "The same task done without AI"],
    credential: "Practitioner (C2) · Generative AI",
    book: "The Generative Studio Playbook: modalities, rights and disclosure",
    modules: [
      { week: "1", taught: "What generation can and cannot do", turn: "Pick a real task" },
      { week: "2", taught: "Drafting and checking", turn: "Run it with AI; log failures", gate: "Live clinic 1" },
      { week: "3", taught: "Rights, provenance and disclosure", turn: "Add a rights note" },
      { week: "4", taught: "The unaided check", turn: "Repeat the task without AI", gate: "Practitioner log" },
    ],
    next: "generative-ai-engineer",
    featured: true,
    language: "English and Tamil",
  },
  {
    slug: "working-with-ai-agents",
    level: "C2",
    title: "Working with AI Agents",
    focus: "Delegate, read a trace, escalate",
    stage: "agentic",
    lifecycle: "Agentic",
    format: "Self-paced",
    formatDetail: "Self-paced + 2 clinics",
    hours: "~15 h",
    price: "₹4,999–7,999",
    priceStatus: "Proposed",
    studio: "Agentic Studio",
    nextBatch: "Feb 2027",
    outcome: "Delegate bounded work to an agent and read what it did. Earn Practitioner (C2).",
    outcomes: [
      "Explain agents, the autonomy dial and \"no owner, no agent\"",
      "Delegate a bounded task to an agent",
      "Read an agent's trace and spot where it went wrong",
      "Know when and how to escalate",
      "Do the same task without the agent",
    ],
    whoFor: "Developers, product people and managers who will work beside agents.",
    prerequisites: "AI Flywheel Foundation (C1), or equivalent.",
    build: ["A delegated task with its trace annotated", "An escalation note"],
    credential: "Practitioner (C2) · Working with AI Agents",
    book: "The Agentic Studio Playbook: the 30-day technical literacy path",
    modules: [
      { week: "1", taught: "Agents and the autonomy dial", turn: "Choose a bounded task" },
      { week: "2", taught: "Delegation that works", turn: "Run it in Agentic Studio", gate: "Clinic 1" },
      { week: "3", taught: "Reading a trace", turn: "Annotate the trace" },
      { week: "4", taught: "Escalate or stop", turn: "Repeat without the agent", gate: "Practitioner log" },
    ],
    next: "agentic-ai-engineer",
    language: "English",
  },
  {
    slug: "core-for-every-team",
    level: "C2",
    title: "CORE for Every Team",
    focus: "Risk tiers, data, incidents",
    stage: "core",
    lifecycle: "CORE strand",
    format: "Self-paced",
    formatDetail: "Self-paced",
    hours: "~8 h",
    price: "₹2,999",
    priceStatus: "Proposed",
    studio: "None needed",
    nextBatch: "Jan 2027",
    outcome: "Apply a risk tier to your own AI use, and earn Practitioner (C2) in CORE.",
    outcomes: [
      "Explain Compliance, Openness, Responsibility, Empowerment",
      "Apply a risk tier to your own AI use",
      "Handle personal data under DPDP basics",
      "Report and log an AI incident",
      "Know who owns each AI system you touch",
    ],
    whoFor: "Every team member who uses AI at work; risk, legal and HR staff.",
    prerequisites: "None. AI Flywheel Foundation helps.",
    build: ["A risk-tiered register row for your own AI use", "An incident drill note"],
    credential: "Practitioner (C2) · CORE for Every Team",
    book: "The AI Flywheel (book): CORE chapters",
    modules: [
      { week: "1", taught: "CORE in one hour", turn: "List the AI you use" },
      { week: "2", taught: "Risk tiers and data", turn: "Tier each use" },
      { week: "3", taught: "Incidents and owners", turn: "Run an incident drill", gate: "Practitioner check" },
    ],
    next: "core-governance-lead",
    language: "English and Tamil",
  },
  {
    slug: "ai-for-managers",
    level: "C2",
    title: "AI for Managers",
    focus: "Success as a number, workflow redesign",
    stage: "drive",
    lifecycle: "DRIVE strand",
    format: "Cohort",
    formatDetail: "Cohort-lite, 4 weeks",
    hours: "3 h a week",
    price: "₹9,999–14,999",
    priceStatus: "Proposed",
    studio: "None needed",
    nextBatch: "Feb 2027",
    outcome: "Lead a team that uses AI safely, with success written as a number.",
    outcomes: [
      "Write success as a number before any build",
      "Score candidate use cases and pick one",
      "Redesign a workflow, not just add a tool",
      "Set a human role and an owner",
      "Plan the change for your team",
    ],
    whoFor: "Managers and non-technical professionals who lead teams.",
    prerequisites: "AI Flywheel Foundation (C1), or equivalent.",
    build: ["A Success-Definition One-Pager", "A workflow redesign and change plan"],
    credential: "Practitioner (C2) · AI for Managers",
    book: "The AI Flywheel (book): DRIVE chapters",
    modules: [
      { week: "1", taught: "Diagnose: success as a number", turn: "Write the One-Pager" },
      { week: "2", taught: "Choosing the use case", turn: "Opportunity Selection Matrix" },
      { week: "3", taught: "Don't pave the cow path", turn: "Redesign the workflow" },
      { week: "4", taught: "Leading the change", turn: "Present the plan", gate: "Peer review" },
    ],
    next: "drive-implementer",
    featured: false,
    language: "English and Tamil",
  },
  {
    ...C3_SHARED,
    slug: "agentic-ai-engineer",
    title: "Agentic AI Engineer",
    focus: "One agent release, G1 to G6",
    stage: "agentic",
    lifecycle: "Agentic · ADLC",
    formatDetail: "12-week cohort · teams of 4 to 6",
    price: "₹35,000–60,000",
    studio: "Agentic Studio",
    nextBatch: "Feb 2027",
    outcome: "Ship your first production agent in 12 weeks, and earn Builder (C3) in Agentic AI.",
    outcomes: [
      "Write a spec and contracts before code",
      "Run evals at shipping settings",
      "Build and test a kill switch",
      "Keep a gate log your reviewers can audit",
      "Ship a release through G6",
    ],
    whoFor: "Developers with Git and API basics, or who have done the 30-day literacy path.",
    prerequisites: "Git and API basics. Not ready? Start with Working with AI Agents (C2).",
    build: ["Gate log", "Eval suite", "Register row", "Tested kill switch"],
    credential: "Builder (C3) · Agentic AI Engineer",
    book: "The Agentic Studio Playbook, Chapters 5 to 10, 23 to 27, 31",
    next: "drive-implementer",
    featured: true,
  },
  {
    ...C3_SHARED,
    slug: "generative-ai-engineer",
    title: "Generative AI Engineer",
    focus: "One pipeline with a rights ledger",
    stage: "generative",
    lifecycle: "Generative · GDLC",
    formatDetail: "12-week cohort · teams of 4 to 6",
    price: "₹35,000–60,000",
    studio: "Generative Studio",
    nextBatch: "FY28 Q1",
    outcome: "Ship one generative pipeline through the GDLC, and earn Builder (C3) in Generative AI.",
    outcomes: [
      "Define the pipeline's success as a number",
      "Keep a rights ledger for every asset",
      "Build evals for generated output",
      "Add disclosure and provenance",
      "Ship the pipeline through its gates",
    ],
    whoFor: "Engineers and technical creatives in media, marketing and commerce.",
    build: ["Pipeline gate log", "Rights ledger", "Eval set", "Provenance record"],
    credential: "Builder (C3) · Generative AI Engineer",
    book: "The Generative Studio Playbook: the GDLC",
    next: "core-governance-lead",
  },
  {
    ...C3_SHARED,
    slug: "model-engineer",
    title: "Model Engineer",
    focus: "Golden set, bake-off, census",
    stage: "foundation",
    lifecycle: "Foundation · MDLC",
    formatDetail: "12-week cohort · teams of 4 to 6",
    price: "₹35,000–60,000",
    studio: "Model Studio",
    nextBatch: "FY28",
    outcome: "Take one model through the MDLC, and earn Builder (C3) in Foundation AI.",
    outcomes: [
      "Ready the data floor for one use case",
      "Build a golden set",
      "Run a blind bake-off and pick a route",
      "Decide rent, adapt or build",
      "Pass evals, red team and risk review",
    ],
    whoFor: "Data scientists, ML and data engineers.",
    build: ["Golden set v1", "Bake-off routing card", "Model card", "Gate log"],
    credential: "Builder (C3) · Model Engineer",
    book: "The Foundation Studio Playbook: the MDLC",
    next: "ai-flywheel-strategist",
  },
  {
    ...C3_SHARED,
    slug: "physical-ai-robotics-engineer",
    title: "Physical AI and Robotics Engineer",
    focus: "Sim gate to bench test",
    stage: "physical",
    lifecycle: "Physical · RDLC",
    formatDetail: "12-week cohort + lab days",
    price: "₹35,000–60,000",
    priceNote: "Plus lab fee",
    priceStatus: "Proposed",
    studio: "Robotic Studio",
    nextBatch: "FY28 H2",
    outcome: "Take one robot cell through the RDLC, and earn Builder (C3) in Physical AI.",
    outcomes: [
      "Run a hazard analysis for one cell",
      "Pass a simulation gate first",
      "Bench-test with safety logs",
      "Log every intervention",
      "Hand over a cell others can repeat",
    ],
    whoFor: "Mechanical, ECE and mechatronics engineers; ITI and polytechnic graduates.",
    build: ["Hazard analysis", "Sim gate report", "Bench test log", "Intervention log"],
    credential: "Builder (C3) · Physical AI and Robotics Engineer",
    book: "The Robotic Studio Playbook: the RDLC",
    next: "drive-implementer",
  },
  {
    slug: "drive-implementer",
    level: "C4",
    title: "DRIVE Implementer",
    focus: "Run a portfolio of turns",
    stage: "drive",
    lifecycle: "DRIVE strand",
    format: "Executive",
    formatDetail: "8-week executive cohort",
    hours: "8 weeks",
    price: "₹60,000–90,000",
    priceStatus: "Proposed",
    studio: "All studios",
    nextBatch: "FY28",
    outcome: "Run a portfolio of AI turns, and earn Leader (C4) in DRIVE.",
    outcomes: [
      "Run several turns as one portfolio",
      "Use the Expansion Checklist",
      "Stop or scale with evidence",
      "Fund the floor from the returns",
      "Coach teams through the gates",
    ],
    whoFor: "Engineering leads, product heads and transformation owners.",
    prerequisites: "Builder (C3) in any stage, or equivalent delivery record.",
    build: ["A portfolio review", "Expansion Checklist for a live system"],
    credential: "Leader (C4) · DRIVE Implementer",
    book: "The AI Flywheel (book): Expand and the Handoff Map",
    modules: [
      { week: "1–2", taught: "Portfolio, not projects", turn: "Map your turns" },
      { week: "3–4", taught: "Expansion and stopping", turn: "Run the Expansion Checklist" },
      { week: "5–6", taught: "Funding the floor", turn: "Portfolio case" },
      { week: "7–8", taught: "Leading through gates", turn: "Present to panel", gate: "Expansion records review" },
    ],
    next: "ai-flywheel-strategist",
    language: "English",
  },
  {
    slug: "core-governance-lead",
    level: "C4",
    title: "CORE Governance Lead",
    focus: "Register, autonomy levels, audits",
    stage: "core",
    lifecycle: "CORE strand",
    format: "Executive",
    formatDetail: "8-week cohort + case review",
    hours: "8 weeks",
    price: "₹60,000–90,000",
    priceStatus: "Proposed",
    studio: "All studios",
    nextBatch: "FY28",
    outcome: "Run AI governance for a live portfolio, and earn Leader (C4) in CORE.",
    outcomes: [
      "Run a Governance Quick Scan",
      "Keep an Accountability Register",
      "Set autonomy levels for agents",
      "Plan and run an AI audit",
      "Map DPDP duties to real systems",
    ],
    whoFor: "Risk, legal, compliance, audit and HR leaders.",
    prerequisites: "CORE for Every Team (C2), or equivalent experience.",
    build: ["Governance Quick Scan", "Accountability Register for a live system"],
    credential: "Leader (C4) · CORE Governance Lead",
    book: "The AI Flywheel (book) and the Studio Playbooks: CORE chapters",
    modules: [
      { week: "1–2", taught: "CORE at scale", turn: "Quick Scan your organisation" },
      { week: "3–4", taught: "Registers and owners", turn: "Build the register" },
      { week: "5–6", taught: "Autonomy levels and audits", turn: "Audit one system" },
      { week: "7–8", taught: "Case review", turn: "Defend your case", gate: "Accountability records review" },
    ],
    next: "ai-flywheel-strategist",
    featured: true,
    language: "English",
  },
  {
    slug: "ai-flywheel-strategist",
    level: "C5",
    title: "AI Flywheel Strategist",
    focus: "Chief AI Officer Programme",
    stage: "all",
    lifecycle: "All stages · Handoff Map",
    format: "Executive",
    formatDetail: "Executive programme + panel review",
    hours: "Executive schedule",
    price: "₹1.5–2.5 lakh",
    priceStatus: "Proposed",
    studio: "All studios",
    nextBatch: "FY28",
    outcome: "Design the system every stage stands on, and earn Architect (C5).",
    outcomes: [
      "Run an AI council, hub and model census",
      "Draw a Handoff Map across the four stages",
      "Lift one binding constraint",
      "Set governance for the whole portfolio",
      "Teach a cohort",
    ],
    whoFor: "Chief AI officers, CTOs, CDOs and senior government officers.",
    prerequisites: "Leader (C4) in DRIVE or CORE, or a panel interview.",
    build: ["A Handoff Map", "A lifted binding constraint, with evidence"],
    credential: "Architect (C5) · AI Flywheel Strategist, awarded by panel",
    book: "The Foundation Studio Playbook, Chapter 46, and The AI Flywheel (book)",
    modules: [
      { week: "Module 1", taught: "Council, hub and census", turn: "Census your models" },
      { week: "Module 2", taught: "The Handoff Map", turn: "Draw your map" },
      { week: "Module 3", taught: "Binding constraints", turn: "Lift one" },
      { week: "Panel", taught: "Defence", turn: "Present to the panel", gate: "Architect panel" },
    ],
    language: "English",
  },
  {
    slug: "leadership-programme",
    level: null,
    title: "Leadership programme",
    focus: "For boards and executive teams",
    stage: "all",
    lifecycle: "C1 in all four · C4 in DRIVE and CORE",
    format: "For organisations",
    formatDetail: "2 days + 90-day follow-up",
    hours: "2 days",
    price: "Quoted per organisation",
    priceStatus: "Proposed",
    studio: "None needed",
    nextBatch: "Jan 2027",
    outcome: "Give your executive team C1 across the wheel and C4 in DRIVE and CORE.",
    outcomes: [
      "Share one language for AI across the board",
      "Write success as a number for one priority",
      "Set your organisation's risk tiers",
      "Choose a first turn and an owner",
      "Review progress at 90 days",
    ],
    whoFor: "Boards, CXOs and department heads.",
    prerequisites: "None.",
    build: ["A board-level AI priority with a number", "A 90-day plan"],
    credential: "Aware (C1) in all four stages; a path to Leader (C4) in DRIVE and CORE",
    book: "The AI Flywheel (book)",
    modules: [
      { week: "Day 1", taught: "The wheel, the floor and DRIVE", turn: "Pick a priority" },
      { week: "Day 2", taught: "CORE and governance", turn: "Set tiers and owners", gate: "C1 check" },
      { week: "Day 90", taught: "Follow-up review", turn: "Measure against the number" },
    ],
    next: "ai-flywheel-strategist",
    featured: true,
    language: "English and Tamil",
  },
  {
    slug: "workforce-licence",
    level: null,
    title: "Workforce licence",
    focus: "Courses, assessments and reporting for every employee",
    stage: "all",
    lifecycle: "All stages",
    format: "For organisations",
    formatDetail: "Annual licence",
    hours: "Per seat, a year",
    price: "₹3,000–12,000",
    priceNote: "Per seat a year",
    priceStatus: "Ed 1.1",
    studio: "Studio seats optional",
    nextBatch: "Dec 2026",
    outcome: "Every employee on the ladder, with reporting by level and stage.",
    outcomes: [
      "Self-paced C1 and C2 courses for every seat",
      "Assessments taken without AI",
      "Reporting by level and stage, not enrolments",
      "SSO and India data residency",
      "Optional Studio seats for builder teams",
    ],
    whoFor: "Enterprises, GCCs and government departments.",
    prerequisites: "None.",
    build: ["A live capability dashboard by stage and level"],
    credential: "Individual levels (C1–C2) for each employee",
    book: "The AI Flywheel (book) and the four Studio Playbooks",
    next: "leadership-programme",
    language: "English and Tamil",
  },
];

export function getProgramme(slug: string) {
  return PROGRAMMES.find((p) => p.slug === slug);
}

export const FEATURED_SLUGS = ["agentic-ai-engineer", "foundation", "generative-ai-practitioner", "core-governance-lead", "leadership-programme"];

export function levelLabel(p: Pick<Programme, "level">) {
  return p.level ? `${LEVEL_NAMES[p.level]} (${p.level})` : "Organisation";
}

/** Rupee amounts in a price string ("₹35,000–₹60,000", "₹1.5 lakh"). */
export function priceRange(price: string) {
  const lakh = price.includes("lakh");
  return (price.match(/[\d.,]+/g) ?? []).map((n) => Number(n.replace(/,/g, "")) * (lakh ? 100000 : 1)).filter((n) => n > 0);
}

/** ISO 8601 total workload for Course JSON-LD, read from hours and formatDetail. */
export function workloadIso(p: Programme): string | undefined {
  const nums = (s: string) => (s.match(/\d+/g) ?? []).map(Number);
  const h = nums(p.hours);
  if (/\bh\b/.test(p.hours) && h.length) {
    const hours = Math.max(...h);
    if (!/a week/.test(p.hours)) return `PT${hours}H`;
    const weeks = nums(p.formatDetail.match(/\d+[- ]weeks?/)?.[0] ?? "")[0];
    return weeks ? `PT${hours * weeks}H` : undefined;
  }
  const w = p.hours.match(/^(\d+) weeks?$/);
  if (w) return `P${w[1]}W`;
  const d = p.hours.match(/^(\d+) days?$/);
  if (d) return `P${d[1]}D`;
  return undefined;
}

/** Course offers and instance shared by the English and Tamil programme pages. */
export function courseSchema(p: Programme) {
  const [min, max] = priceRange(p.price);
  return {
    offers:
      p.priceStatus === "Free"
        ? { "@type": "Offer", price: 0, priceCurrency: "INR", category: "Free" }
        : min
          ? { "@type": "AggregateOffer", lowPrice: min, highPrice: max ?? min, priceCurrency: "INR", category: "Paid" }
          : undefined,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: p.format === "Self-paced" ? "Online" : "Blended",
      inLanguage: p.language === "English" ? "en-IN" : p.language.includes("support") ? "en-IN" : ["en-IN", "ta-IN"],
      ...(workloadIso(p) ? { courseWorkload: workloadIso(p) } : {}),
      ...(startMonth(p.nextBatch) ? { startDate: startMonth(p.nextBatch) } : {}),
    },
  };
}

/** "Feb 2027" or "Launch, Dec 2026" → "2027-02". FY-only dates return undefined (no invented start dates). */
export function startMonth(nextBatch: string): string | undefined {
  const m = nextBatch.replace(/^Launch,\s*/i, "").match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{4})$/i);
  if (!m) return undefined;
  const i = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(m[1].toLowerCase());
  return `${m[2]}-${String(i + 1).padStart(2, "0")}`;
}
