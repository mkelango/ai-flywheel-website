/**
 * Framework & Research content: framework topic pages, the toolkit, insights,
 * glossary and the State of AI Implementation report.
 * Sources: The AI Flywheel (M. K. Elango) and the four Studio Playbooks.
 */

export const FLYWHEEL_BOOK = "The AI Flywheel";
export const FOUNDATION_BOOK = "The Foundation Studio Playbook";
export const GENERATIVE_BOOK = "The Generative Studio Playbook";
export const AGENTIC_BOOK = "The Agentic Studio Playbook";
export const ROBOTIC_BOOK = "The Robotic Studio Playbook";

/* ------------------------------------------------------------------ */
/* Framework topics                                                    */
/* ------------------------------------------------------------------ */

export type TopicSlug = "stages" | "drive" | "core" | "levels" | "toolkit";

export const TOPICS: { slug: TopicSlug; label: string; eyebrow: string; title: string; intro: string; description: string }[] = [
  {
    slug: "stages",
    label: "Four stages",
    eyebrow: "The four stages",
    title: "The four stages of AI: a sequence that compounds.",
    intro: "Foundation, then Generative, then Agentic, then Physical. Each stage produces the fuel for the next.",
    description: "The four stages of the AI Flywheel: Foundation (the floor), Generative (table stakes), Agentic (the value frontier) and Physical (the industrial frontier).",
  },
  {
    slug: "drive",
    label: "DRIVE",
    eyebrow: "The hub · method",
    title: "The DRIVE method: five phases from idea to value.",
    intro: "Diagnose, Resource, Implement, Validate, Expand. A cycle, not a line. Every life cycle runs inside it.",
    description: "DRIVE, the AI Flywheel method: Diagnose, Resource, Implement, Validate and Expand, with the tools used in each phase.",
  },
  {
    slug: "core",
    label: "CORE",
    eyebrow: "The rim · governance",
    title: "CORE, an AI governance framework: the unlock, not the brake.",
    intro: "Four pillars that run across every stage. The weakest pillar sets your trust ceiling.",
    description: "CORE, the AI Flywheel governance framework: Compliance and Fairness, Openness and Transparency, Responsibility and Safety, Empowerment and Human Agency.",
  },
  {
    slug: "levels",
    label: "Levels C1–C5",
    eyebrow: "Learning framework · C1 to C5",
    title: "An AI competency framework: five levels in each stage.",
    intro: "From Aware (C1) to Architect (C5). Each level is earned only with evidence from real work.",
    description: "The AI Flywheel Learning Framework: five competence levels, C1 Aware to C5 Architect, held separately for each of the four stages.",
  },
  {
    slug: "toolkit",
    label: "Toolkit",
    eyebrow: "The Flywheel Toolkit",
    title: "An AI implementation toolkit: 28 tools, in order of use.",
    intro: "Every template, checklist and diagnostic from The AI Flywheel, grouped from orient to start.",
    description: "The Flywheel Toolkit: 28 templates, checklists and diagnostics from The AI Flywheel, grouped in the order you use them.",
  },
];

export function getTopic(slug: string) {
  return TOPICS.find((t) => t.slug === slug);
}

/** Stage detail (The AI Flywheel, Ch 4–8; Studio Playbooks). */
export const STAGE_DETAIL: Record<string, { chapter: string; book: string; idea: string; feeds: string; programme: string }> = {
  foundation: {
    chapter: "The AI Flywheel, Ch 4",
    book: FOUNDATION_BOOK,
    idea: "Data, classical ML, analytics and the model layer. The floor decides the ceiling.",
    feeds: "Clean, connected data and a model census the next stage can trust.",
    programme: "model-engineer",
  },
  generative: {
    chapter: "The AI Flywheel, Ch 5",
    book: GENERATIVE_BOOK,
    idea: "AI that produces content directly. Fast, useful and no longer a lasting edge on its own.",
    feeds: "Early returns, governed pipelines and the trust to let AI act.",
    programme: "generative-ai-practitioner",
  },
  agentic: {
    chapter: "The AI Flywheel, Ch 6",
    book: AGENTIC_BOOK,
    idea: "Agents that plan and act through tools. Harder, gated by governance, and so defensible.",
    feeds: "Telemetry and decision traces that seed the next stage.",
    programme: "agentic-ai-engineer",
  },
  physical: {
    chapter: "The AI Flywheel, Ch 7",
    book: ROBOTIC_BOOK,
    idea: "Robotics, vehicles and embodied systems. The deepest moat: you cannot rent a body.",
    feeds: "Real-world data that flows back to the floor.",
    programme: "physical-ai-robotics-engineer",
  },
};

/** DRIVE in detail (The AI Flywheel, Ch 3 and Ch 9–13). */
export const DRIVE_DETAIL = [
  { letter: "D", word: "Diagnose", chapter: "Ch 9", does: "Pick the right opportunity, pass the data gate and write success first.", tools: ["Opportunity Selection Matrix", "Data-Readiness Checklist", "Success-Definition One-Pager"] },
  { letter: "R", word: "Resource", chapter: "Ch 10", does: "A small, right team and a neutral architecture. Own the road, rent the car.", tools: ["Build-vs-Buy Decision Aid", "Architecture-Neutrality Checklist"] },
  { letter: "I", word: "Implement", chapter: "Ch 11", does: "Redesign the workflow and build to production grade. Bring the people along.", tools: ["Implementation Readiness Checklist", "Agent Operating Model"] },
  { letter: "V", word: "Validate", chapter: "Ch 12", does: "Measure honestly against the baseline. For agents, keep watching.", tools: ["Validation Scorecard", "Honest-ROI Horizon"] },
  { letter: "E", word: "Expand", chapter: "Ch 13", does: "Standardise the win and feed the next turn. Scale the recipe, not the hero.", tools: ["Pilot-to-Platform Expansion Checklist", "Next-Turn Worksheet"] },
];

/** CORE in detail (The AI Flywheel, Ch 14–17). */
export const CORE_DETAIL = [
  { letter: "C", word: "Compliance and Fairness", chapter: "Ch 15", does: "Lawful and fair by design: risk tiers, fairness tests, data residency.", tool: "Compliance and Sovereignty Readiness Checklist" },
  { letter: "O", word: "Openness and Transparency", chapter: "Ch 16", does: "Disclose the AI, document it with model and agent cards, keep a trace.", tool: "Model card / Agent card" },
  { letter: "R", word: "Responsibility and Safety", chapter: "Ch 16–17", does: "A named owner, guardrails and a kill switch you have tested.", tool: "Agent Accountability Register" },
  { letter: "E", word: "Empowerment and Human Agency", chapter: "Ch 17", does: "Human judgment stays in command. Autonomy is a dial, not a switch.", tool: "Autonomy-Level Decision Guide" },
];

/** The Flywheel Toolkit (The AI Flywheel, back matter): 28 tools in seven groups. */
export const TOOLKIT: { group: string; tools: { name: string; ch: string }[] }[] = [
  {
    group: "Orient and locate",
    tools: [
      { name: "Four-Leaks Diagnostic", ch: "Ch 1" },
      { name: "Locate Your Organisation on the Flywheel", ch: "Ch 3" },
      { name: "AI Flywheel Maturity Model", ch: "Ch 23" },
      { name: "AI Flywheel Self-Assessment", ch: "Ch 23" },
    ],
  },
  {
    group: "Diagnose",
    tools: [
      { name: "Opportunity Selection Matrix", ch: "Ch 9" },
      { name: "Data-Readiness Checklist (the Gate)", ch: "Ch 4, 9" },
      { name: "Success-Definition One-Pager", ch: "Ch 9" },
      { name: "Fast-First-Value Selection Grid", ch: "Ch 5" },
      { name: "Physical AI Candidate Screen", ch: "Ch 7" },
    ],
  },
  {
    group: "Resource and build",
    tools: [
      { name: "Build-vs-Buy Decision Aid", ch: "Ch 10" },
      { name: "Architecture-Neutrality Checklist", ch: "Ch 10" },
      { name: "Agent Operating Model", ch: "Ch 6" },
      { name: "Implementation Readiness Checklist", ch: "Ch 11" },
    ],
  },
  {
    group: "Validate and expand",
    tools: [
      { name: "Validation Scorecard", ch: "Ch 12" },
      { name: "Honest-ROI Horizon", ch: "Ch 12" },
      { name: "Pilot-to-Platform Expansion Checklist", ch: "Ch 13" },
      { name: "Flywheel Handoff Map", ch: "Ch 8" },
      { name: "Next-Turn Worksheet", ch: "Ch 2" },
    ],
  },
  {
    group: "Govern with CORE",
    tools: [
      { name: "Governance Maturity Quick Scan", ch: "Ch 14" },
      { name: "Compliance and Sovereignty Readiness Checklist", ch: "Ch 15" },
      { name: "Agent Accountability Register", ch: "Ch 16" },
      { name: "Autonomy-Level Decision Guide", ch: "Ch 17" },
    ],
  },
  {
    group: "Choose your starting point",
    tools: [
      { name: "Business Starting-Point Selector", ch: "Ch 18" },
      { name: "Public-Sector Use-Case Prioritiser", ch: "Ch 19" },
      { name: "Mission-Impact Use-Case Selector", ch: "Ch 20" },
      { name: "Economic Flywheel Design Template", ch: "Ch 21" },
    ],
  },
  {
    group: "Start and sustain",
    tools: [
      { name: "90-Day Flywheel Start Plan", ch: "Ch 22" },
      { name: "Quarterly Refresh Cadence", ch: "Ch 24" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Books                                                               */
/* ------------------------------------------------------------------ */

/** Extra detail for the six-book series (Website Strategy 2.0, p. 10; Foundation Playbook, Table 45.8). */
export const BOOK_DETAIL: Record<string, { lifecycle: string; powers: string; programmes: string[] }> = {
  "The AI Flywheel": { lifecycle: "DRIVE · CORE", powers: "The free C1 course, leadership and government programmes", programmes: ["foundation", "leadership-programme"] },
  "The Foundation Studio Playbook": { lifecycle: "MDLC · 12 phases", powers: "Model Engineer, Model Lab, Model Studio", programmes: ["model-engineer"] },
  "The Generative Studio Playbook": { lifecycle: "GDLC · 12 phases", powers: "Generative AI Engineer, media and marketing tracks", programmes: ["generative-ai-engineer"] },
  "The Agentic Studio Playbook": { lifecycle: "ADLC · 10 phases", powers: "Agentic AI Engineer cohort, developer track, Agentic Lab", programmes: ["agentic-ai-engineer"] },
  "The Robotic Studio Playbook": { lifecycle: "RDLC · 12 phases", powers: "Physical AI and Robotics Engineer, ITI and engineering colleges", programmes: ["physical-ai-robotics-engineer"] },
  "The AI Studio Playbook": { lifecycle: "Specialist", powers: "Creative elective; AI film craft", programmes: [] },
};

/* ------------------------------------------------------------------ */
/* State of AI Implementation                                          */
/* ------------------------------------------------------------------ */

export const REPORT = {
  title: "State of AI Implementation",
  status: "First edition in preparation",
  /** What the first edition will measure. No findings are published yet. */
  questions: [
    { leak: "Data readiness", q: "Is the data ready, clean and connected?" },
    { leak: "Undefined success", q: "Was success agreed, as a number, before the build?" },
    { leak: "Workflow integration", q: "Is the AI built into real work, or bolted on?" },
    { leak: "Governance", q: "Is there a named owner and a tested kill switch?" },
  ],
  method: [
    "Built on the Four-Leaks Diagnostic and the Maturity Model from The AI Flywheel.",
    "Levels counted by stage, from C1 to C5, not by enrolments.",
    "Every figure dated and sourced. No figure without a sample size.",
  ],
};

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  stage: "foundation" | "generative" | "agentic" | "physical" | "drive" | "core";
  tag: string;
  color: string;
  date: string; // ISO
  read: string;
  source: { book: string; chapter: string };
  programme: string;
  body: string[];
};

export const INSIGHT_ARTICLES: Insight[] = [
  {
    slug: "the-reset-tax",
    title: "The reset tax: why pilot after pilot adds up to nothing",
    dek: "Treat AI as a tool and every effort starts from zero.",
    stage: "drive",
    tag: "Method",
    color: "#D9542A",
    date: "2026-10-02",
    read: "2 min",
    source: { book: FLYWHEEL_BOOK, chapter: "Chapter 2, From Tools to Flywheels" },
    programme: "foundation",
    body: [
      "Most organisations treat AI as a tool: pick it up, use it, put it down. Each pilot gets its own vendor, its own team and its own data pull. When it ends, nothing carries over. The next pilot starts from zero.",
      "The AI Flywheel calls this the reset tax: the hidden cost of treating each effort as a separate one-off. It is paid quietly, every quarter, and often called innovation.",
      "The alternative is to treat AI value as cumulative. Every real win makes deposits into three accounts. Data: better, cleaner data for next time. Capability: new things your people and systems can now do. Trust: what stakeholders will now allow. Banked well, those deposits make the next turn easier.",
      "The test is simple. Before you close a project, fill in the Next-Turn Worksheet. Write down this win. Write what it deposited into each of the three accounts. Then name the next turn those deposits unlock. A win that feeds nothing has paid the reset tax.",
      "This is the first idea in the free course. It changes how a team picks its next project: not the most exciting one, but the one the last win made easier.",
    ],
  },
  {
    slug: "write-success-as-a-number",
    title: "Write success as a number before you build",
    dek: "The single highest-leverage habit in the method.",
    stage: "drive",
    tag: "DRIVE",
    color: "#D9542A",
    date: "2026-10-07",
    read: "2 min",
    source: { book: FLYWHEEL_BOOK, chapter: "Chapter 9, Diagnose" },
    programme: "drive-implementer",
    body: [
      "Undefined success is one of the four leaks that drain AI value. If nobody agreed what good looks like before the build, any result can be called a win, and none can be proven.",
      "The Success-Definition One-Pager fixes this in five fields: the baseline, the target, the one metric, the date and a named owner. If you cannot fill it in, the book's advice is to think harder before you build.",
      "Two traps sit nearby. The first is the vanity metric: a number that measures activity, not value, such as queries handled. The honest question is always what got measurably better. The second is a missing baseline. Without the starting point, a later improvement cannot be shown.",
      "Write the page during Diagnose, alongside the data gate. Then use it again at Validate, where the Validation Scorecard records the baseline, the target, the actual result, the verdict and who audited it. The sceptic's test closes the loop: would the finance manager accept this as proof?",
      "In the DRIVE Implementer programme, every turn in your portfolio starts with this one page.",
    ],
  },
  {
    slug: "rent-adapt-or-build",
    title: "Rent, adapt or build: the model census on one page",
    dek: "The model is rented. The data is owned.",
    stage: "foundation",
    tag: "Foundation",
    color: "#3B4BA8",
    date: "2026-10-13",
    read: "2 min",
    source: { book: FOUNDATION_BOOK, chapter: "Chapter 6 and Chapter 28" },
    programme: "model-engineer",
    body: [
      "Every model decision comes down to three choices. Rent a model through an API. Adapt one with your own data. Or build one from scratch. The Foundation Studio Playbook's rule is short: rent first. Adapt when your evaluation fails and you own the data. Pre-train only when sovereignty or a real moat demands it.",
      "The decision does not end at launch. Models are retired, repriced and replaced. That is why the playbook asks for a model census: every model has an owner, a card, a licence, an eval record and an expiry date.",
      "The census is a practice, not a tool. A spreadsheet kept honestly beats a platform nobody updates. What matters is that someone can answer, for each model in production: who owns it, what it is allowed to do, how it last scored, and when it must be reviewed.",
      "This is the floor every other stage stands on. Generative pipelines, agents and robots all call models. If you cannot see your models, you cannot govern what is built on them.",
      "Model Engineer learners run one model through the MDLC and leave with a census entry as part of their portfolio.",
    ],
  },
  {
    slug: "verification-is-the-bottleneck",
    title: "Verification is the bottleneck, so automate it",
    dek: "When agents write the code, checking it becomes the job.",
    stage: "agentic",
    tag: "Agentic",
    color: "#D98B0B",
    date: "2026-10-16",
    read: "2 min",
    source: { book: AGENTIC_BOOK, chapter: "Chapters 25, 30 and 31" },
    programme: "agentic-ai-engineer",
    body: [
      "Agents can now write most of the code in a product. That moves the hard part. Writing is cheap; knowing that what was written is right is not. The Agentic Studio Playbook makes this its fifth law: verification is the bottleneck, so automate it.",
      "In practice that means every change meets types, tests, evals and review before it merges. Acceptance criteria are written as tests or eval cases before work starts, so an agent can check its own work against them.",
      "Evals deserve special care. An evaluation is a set of known-good cases you run again and again, to catch mistakes before users do. A demo shows that something worked once. An eval suite shows that it keeps working.",
      "A related law: the harness beats the prompt. Tools, permissions, hooks and checks make agents dependable; clever wording does not. Teams that invest in the harness ship faster, because they trust what comes out.",
      "In the Agentic AI Engineer cohort, the quality gate (G5) cannot be signed without an eval record.",
    ],
  },
  {
    slug: "no-owner-no-agent",
    title: "No owner, no agent",
    dek: "One row per agent, or it is not deployed.",
    stage: "core",
    tag: "CORE",
    color: "#0A131F",
    date: "2026-10-21",
    read: "2 min",
    source: { book: FLYWHEEL_BOOK, chapter: "Chapter 16 and Chapter 17" },
    programme: "core-governance-lead",
    body: [
      "Accountability in AI means a specific, named human is responsible for what a system does. The AI Flywheel compresses it into four words: no owner, no agent.",
      "The Agent Accountability Register puts the rule to work. It keeps one row per agent: its owner, its permissions, whether it is traceable, its escalation path, and whether its kill switch was tested. No row, no deployment.",
      "The kill switch matters most. It is a tested, pre-approved way to stop an agent quickly. If it has never been tested, the book calls it folklore, not a control. The same goes for guardrails: an untested guardrail is a hope.",
      "Traceability completes the picture. Like a flight recorder, it lets you rebuild exactly what an agent did and why, which makes incidents survivable.",
      "None of this is meant to slow teams down. Governance raises the trust ceiling: the height of value and autonomy at which an organisation is willing, and allowed, to deploy AI. Teams with a clean register get to give their agents more room.",
      "CORE Governance Lead learners build and run a register for a live system.",
    ],
  },
  {
    slug: "measure-the-sim-to-real-gap",
    title: "Measure the sim-to-real gap. Count interventions, not demos.",
    dek: "A robot that works in simulation has passed one test, not all of them.",
    stage: "physical",
    tag: "Physical",
    color: "#13827F",
    date: "2026-10-27",
    read: "2 min",
    source: { book: ROBOTIC_BOOK, chapter: "Chapter 8 and Chapter 13" },
    programme: "physical-ai-robotics-engineer",
    body: [
      "Physical AI trains in simulation first. The AI Flywheel calls it practice in a dream: a robot learns inside a virtual world before it acts in the real one. It is faster, cheaper and safer.",
      "But a dream is not a factory floor. The Robotic Studio Playbook's sixth law is to measure the sim-to-real gap: every simulated skill is proven, and scored, in reality. In the RDLC, the sim gate asks whether the task passes in the twin; the bench test asks whether it still passes on real hardware.",
      "The playbook's ninth law sets the metric: count interventions, not demos. A polished video shows one good run. Mean time between interventions (MTBI) shows how long the machine runs before a human has to step in. Autonomy rate and cost per task sit beside it.",
      "Humans stay in command throughout. An e-stop, a teleoperation fallback, the autonomy dial and a named owner for every machine are designed in from the start.",
      "Physical AI and Robotics Engineer learners take one cell through the RDLC: hazard analysis, sim gate, bench test.",
    ],
  },
];

export function getInsight(slug: string) {
  return INSIGHT_ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/* ------------------------------------------------------------------ */
/* Glossary                                                            */
/* ------------------------------------------------------------------ */

export type GlossaryTerm = {
  slug: string;
  term: string;
  short: string;
  body: string;
  related: string[];
  source: { book: string; chapter: string };
};

const F = FLYWHEEL_BOOK;

export const GLOSSARY: GlossaryTerm[] = [
  { slug: "a2a", term: "A2A (Agent2Agent)", short: "An open protocol for agents from different vendors to find each other and pass work.", body: "Use MCP for tools and A2A for peer agents. Together they are often called the HTTP of agents, because they let systems work together without one vendor in the middle.", related: ["mcp", "interoperability", "agent"], source: { book: F, chapter: "Ch 6" } },
  { slug: "accountability", term: "Accountability", short: "A specific, named human is responsible for what an AI system does.", body: "The book's rule is no owner, no agent. A team is not an owner; a person is. Accountability is what lets an organisation deploy AI where the stakes are real.", related: ["agent-accountability-register", "kill-switch", "core"], source: { book: F, chapter: "Ch 16" } },
  { slug: "adlc", term: "ADLC (Agentic Development Life Cycle)", short: "A ten-phase method for taking a product to production with agents doing most of the building.", body: "It is DRIVE made specific for agents, with six sign-off gates from G1 (thesis approved) to G6 (governance and go-live). No standards body defines the term; this is how the playbook uses it.", related: ["drive", "agent", "evaluation"], source: { book: AGENTIC_BOOK, chapter: "Ch 5" } },
  { slug: "agent", term: "Agent", short: "An AI system that takes a goal and acts on it, using tools in a loop.", body: "An agent plans, acts, observes the result and tries again until the work is done. Selling an ordinary chatbot as an agent is called agent washing.", related: ["agentic-ai", "agent-operating-model", "autonomy-boundary"], source: { book: F, chapter: "Ch 6" } },
  { slug: "agent-accountability-register", term: "Agent Accountability Register", short: "One row per live agent: owner, permissions, traceability, escalation, kill switch tested.", body: "A row with a blank means the agent is not deployed; it is exposed. No row, no deployment.", related: ["accountability", "kill-switch", "traceability"], source: { book: AGENTIC_BOOK, chapter: "Section 33.6; The AI Flywheel, Ch 16" } },
  { slug: "agent-operating-model", term: "Agent Operating Model", short: "A one-page contract for how one agent may behave.", body: "It names the agent and its human owner, then sets six fields: goal, tools, permissions and limits, human checkpoints, escalation path and kill switch. Plan for deployment, not for the demo.", related: ["agent", "kill-switch", "human-in-the-loop"], source: { book: F, chapter: "Ch 6" } },
  { slug: "agentic-ai", term: "Agentic AI", short: "The third stage: AI built from agents that plan and carry out work. The value frontier.", body: "It is harder and slower than generative AI and gated by governance, which is exactly what makes it defensible.", related: ["agent", "generative-ai", "physical-ai"], source: { book: F, chapter: "Ch 6" } },
  { slug: "autonomy-boundary", term: "Autonomy boundary", short: "A set limit on what an AI system may do on its own.", body: "Set the autonomy dial by stakes, reversibility and ambiguity. When in doubt, set it one notch lower. The goal is the right level of autonomy, not the most.", related: ["deterministic-guardrail", "human-in-the-loop", "agent"], source: { book: F, chapter: "Ch 17" } },
  { slug: "baseline", term: "Baseline", short: "The measured starting point used to judge whether anything improved.", body: "Without a baseline, a later success cannot be proven. It is the first field on the Success-Definition One-Pager.", related: ["success-definition", "vanity-metric", "validation"], source: { book: F, chapter: "Ch 12" } },
  { slug: "build-vs-buy", term: "Build-vs-buy", short: "The choice to build in-house, buy off the shelf, or partner.", body: "The rule is build and own the road, rent the car, and partner for the build. Ask what lock-in will cost and how fast you reach value.", related: ["lock-in", "vendor-neutral", "drive"], source: { book: F, chapter: "Ch 10" } },
  { slug: "compounding", term: "Compounding", short: "Each win produces data, capability, trust and capital that make the next win easier.", body: "The core mechanic of the flywheel. The book's line: the compounding is the product.", related: ["flywheel", "three-accounts", "reset-tax"], source: { book: F, chapter: "Ch 8" } },
  { slug: "core", term: "CORE", short: "The four-part governance discipline at the rim of the wheel.", body: "Compliance and Fairness, Openness and Transparency, Responsibility and Safety, Empowerment and Human Agency. The weakest pillar sets the trust ceiling.", related: ["drive", "trust-ceiling", "accountability"], source: { book: F, chapter: "Ch 14" } },
  { slug: "data-readiness", term: "Data readiness", short: "Whether the data an effort needs exists and is usable.", body: "Present, clean, connected, relevant, legally allowed and current. When it is missing, it is the number-one cause of AI failure. Any no on the gate means fix the floor first.", related: ["foundation-ai", "data-sovereignty", "implementation-gap"], source: { book: F, chapter: "Ch 4" } },
  { slug: "data-sovereignty", term: "Data sovereignty", short: "Data is subject to the laws of the place where it is collected and stored.", body: "Data has a legal home. Data localisation, or residency, rules can require that certain data stays inside a country's borders.", related: ["data-readiness", "core", "sovereign-ai"], source: { book: F, chapter: "Ch 15" } },
  { slug: "demo-grade-vs-production-grade", term: "Demo-grade vs production-grade", short: "Works once under perfect conditions, versus works reliably every day in real work.", body: "The gap is mostly organisational, not technical. Passing only the first item on the Implementation Readiness Checklist means you have a demo.", related: ["pilot-purgatory", "workflow-redesign", "evaluation"], source: { book: F, chapter: "Ch 11" } },
  { slug: "deterministic-guardrail", term: "Deterministic guardrail", short: "A hard, rule-based limit an agent cannot cross, whatever its reasoning suggests.", body: "A fence enforced from outside the model's own judgment. An untested guardrail is not a guardrail; it is a hope.", related: ["autonomy-boundary", "kill-switch", "agent"], source: { book: F, chapter: "Ch 17" } },
  { slug: "digital-twin", term: "Digital twin", short: "A detailed virtual model of a real object or process.", body: "Used to test and improve safely before acting in the physical world. In the RDLC, the sim gate asks whether a task passes in the twin.", related: ["simulation", "sim-to-real-gap", "physical-ai"], source: { book: F, chapter: "Ch 7" } },
  { slug: "drive", term: "DRIVE", short: "The five-phase method for turning an AI opportunity into value.", body: "Diagnose (right opportunity, data gate, success written first), Resource (small right team, neutral architecture), Implement (redesign the workflow, production grade), Validate (measure honestly), Expand (standardise the win, feed the next turn).", related: ["core", "success-definition", "flywheel"], source: { book: F, chapter: "Ch 3" } },
  { slug: "evaluation", term: "Evaluation (evals)", short: "Testing an AI system again and again against known-good cases.", body: "Evals catch mistakes before users do. A demo shows something worked once; an eval suite shows it keeps working.", related: ["validation", "demo-grade-vs-production-grade", "adlc"], source: { book: F, chapter: "Ch 12" } },
  { slug: "flywheel", term: "Flywheel (AI Flywheel)", short: "AI value as a heavy wheel: hard to start, then self-reinforcing.", body: "Four stages, compounding through DRIVE, governed by CORE. Tools expire. Layers endure.", related: ["compounding", "drive", "core"], source: { book: F, chapter: "Ch 3" } },
  { slug: "foundation-ai", term: "Foundation AI", short: "The first stage: data, classical ML, analytics and the model layer.", body: "The floor. It decides the ceiling for every stage built on top of it.", related: ["data-readiness", "model-census", "generative-ai"], source: { book: F, chapter: "Ch 4" } },
  { slug: "generative-ai", term: "Generative AI", short: "The second stage: AI that produces content directly.", body: "Table stakes. Fast and useful, but no longer a source of lasting advantage on its own. Generative AI is the ante, not the edge.", related: ["foundation-ai", "agentic-ai", "rights-ledger"], source: { book: F, chapter: "Ch 5" } },
  { slug: "human-in-the-loop", term: "Human-in-the-loop", short: "A design in which a human reviews or steps in at set points.", body: "Especially at high-stakes points. The book treats it as a multiplier of capability, not a sign of weak AI.", related: ["autonomy-boundary", "agent-operating-model", "core"], source: { book: F, chapter: "Ch 17" } },
  { slug: "implementation-gap", term: "Implementation gap", short: "The chasm between money spent on AI and value gained.", body: "It is almost never the model. It is unready data, undefined success, workflows never redesigned and missing governance: the four leaks.", related: ["data-readiness", "success-definition", "workflow-redesign"], source: { book: F, chapter: "Ch 1" } },
  { slug: "interoperability", term: "Interoperability", short: "AI systems working together without being locked in to one vendor.", body: "Achieved through open standards such as MCP and A2A.", related: ["mcp", "a2a", "vendor-neutral"], source: { book: F, chapter: "Ch 3" } },
  { slug: "kill-switch", term: "Kill switch", short: "A tested, pre-approved way to stop an agent quickly.", body: "If it has never been tested, it is folklore, not a control. Every row in the Agent Accountability Register records whether it was tested.", related: ["agent-accountability-register", "deterministic-guardrail", "accountability"], source: { book: F, chapter: "Ch 17" } },
  { slug: "lock-in", term: "Lock-in", short: "Being unable to leave a vendor without great cost.", body: "The decision made by not making it. Countered by owning the road and renting the car, and by costing your exit up front.", related: ["build-vs-buy", "vendor-neutral", "interoperability"], source: { book: F, chapter: "Ch 10" } },
  { slug: "mcp", term: "MCP (Model Context Protocol)", short: "An open standard for how AI systems connect to tools and data.", body: "With A2A, it forms the HTTP of agents. Use MCP for tools and A2A for peer agents.", related: ["a2a", "interoperability", "agent"], source: { book: F, chapter: "Ch 6" } },
  { slug: "model-census", term: "Model census", short: "A record of every model in use, each with an owner, card, licence, eval record and expiry date.", body: "A practice, not a tool. It is how the floor stays visible as models are retired, repriced and replaced.", related: ["foundation-ai", "model-card", "accountability"], source: { book: FOUNDATION_BOOK, chapter: "Ch 28" } },
  { slug: "model-card", term: "Model card / Agent card", short: "A standard document stating what an AI system is for, its limits and how to use it.", body: "Like a nutrition label. Part of the Openness pillar of CORE.", related: ["model-census", "core", "traceability"], source: { book: F, chapter: "Ch 16" } },
  { slug: "mtbi", term: "MTBI (mean time between interventions)", short: "The average running time between moments a human has to step in.", body: "The playbook's measure of real autonomy: count interventions, not demos. Autonomy rate and cost per task sit beside it.", related: ["sim-to-real-gap", "physical-ai", "vanity-metric"], source: { book: ROBOTIC_BOOK, chapter: "Ch 13" } },
  { slug: "physical-ai", term: "Physical AI", short: "The fourth stage: AI that leaves the screen.", body: "Robotics, autonomous vehicles and embodied systems. The industrial frontier and the deepest moat, because you cannot rent a body.", related: ["simulation", "world-model", "digital-twin"], source: { book: F, chapter: "Ch 7" } },
  { slug: "pilot-purgatory", term: "Pilot purgatory", short: "When dazzling pilots never reach production.", body: "A pilot is a small trial before full deployment. Purgatory is what happens when nothing is standardised and every pilot pays the reset tax.", related: ["reset-tax", "demo-grade-vs-production-grade", "compounding"], source: { book: F, chapter: "Ch 1" } },
  { slug: "reset-tax", term: "Reset tax", short: "The hidden cost of treating each AI effort as a separate one-off.", body: "Nothing builds up, so every project starts from zero. The Next-Turn Worksheet is the antidote: name what each win feeds next.", related: ["compounding", "three-accounts", "pilot-purgatory"], source: { book: F, chapter: "Ch 2" } },
  { slug: "rights-ledger", term: "Rights ledger", short: "A record of every input to a generative pipeline, with its source, licence and approval.", body: "A ledger row for every input and a signed release for every person. It is what lets generated work ship without rights surprises.", related: ["generative-ai", "core", "model-card"], source: { book: GENERATIVE_BOOK, chapter: "Ch 7 and Ch 38" } },
  { slug: "sim-to-real-gap", term: "Sim-to-real gap", short: "The difference between how a skill scores in simulation and in reality.", body: "The Robotic Studio Playbook's sixth law: measure it. Every simulated skill is proven, and scored, in reality.", related: ["simulation", "digital-twin", "mtbi"], source: { book: ROBOTIC_BOOK, chapter: "Ch 8" } },
  { slug: "simulation", term: "Simulation", short: "Teaching a robot inside a virtual world before it acts in reality.", body: "The book calls it practice in a dream. Synthetic data from simulation helps where real-world data is scarce or risky to collect.", related: ["digital-twin", "world-model", "sim-to-real-gap"], source: { book: F, chapter: "Ch 7" } },
  { slug: "sovereign-ai", term: "Sovereign AI", short: "Keeping data, models and decisions inside a nation's own legal jurisdiction.", body: "Owning the road at national scale.", related: ["data-sovereignty", "build-vs-buy", "core"], source: { book: F, chapter: "Ch 19" } },
  { slug: "success-definition", term: "Success definition", short: "A written statement of what an effort must achieve, set before building.", body: "Baseline, target, metric, date and a named owner. The single highest-leverage habit in the method.", related: ["baseline", "vanity-metric", "drive"], source: { book: F, chapter: "Ch 9" } },
  { slug: "three-accounts", term: "Three accounts", short: "What every AI win deposits: Data, Capability and Trust.", body: "Better data for next time, new things you can do, and what stakeholders will now allow. Banked well, they make the next turn easier.", related: ["compounding", "reset-tax", "flywheel"], source: { book: F, chapter: "Ch 2" } },
  { slug: "traceability", term: "Traceability", short: "The ability to rebuild exactly what an agent did and why.", body: "Like an aircraft's flight recorder, it makes incidents survivable. Paired with observability, it is the machinery of continuous validation.", related: ["agent-accountability-register", "model-card", "validation"], source: { book: F, chapter: "Ch 16" } },
  { slug: "trust-ceiling", term: "Trust ceiling", short: "The height of value and autonomy at which an organisation will, and may, deploy AI.", body: "Weak governance keeps it low; mature governance raises it. Governance is the unlock, not the brake.", related: ["core", "accountability", "autonomy-boundary"], source: { book: F, chapter: "Ch 14" } },
  { slug: "validation", term: "Validation", short: "Proving that an effort worked, against its success definition.", body: "On a realistic time horizon. For agents it is continuous: you keep a watch.", related: ["success-definition", "evaluation", "baseline"], source: { book: F, chapter: "Ch 12" } },
  { slug: "vanity-metric", term: "Vanity metric", short: "A number that measures activity, not value.", body: "For example, one million queries handled. The honest question is always what got measurably better.", related: ["baseline", "success-definition", "mtbi"], source: { book: F, chapter: "Ch 12" } },
  { slug: "vendor-neutral", term: "Vendor-neutral", short: "Designed so that no single vendor's products are essential.", body: "The foundation of owning your road. Check that the model is swappable, data is portable and the exit is costed.", related: ["lock-in", "build-vs-buy", "interoperability"], source: { book: F, chapter: "Ch 10" } },
  { slug: "workflow-redesign", term: "Workflow redesign", short: "Rebuilding how work flows around an AI capability.", body: "Instead of laying technology over an old process. The book's line: don't pave the cow path.", related: ["implementation-gap", "demo-grade-vs-production-grade", "drive"], source: { book: F, chapter: "Ch 11" } },
  { slug: "world-model", term: "World model", short: "An AI system's inner understanding of how the physical world behaves.", body: "It lets a system plan, and create realistic training simulations.", related: ["simulation", "physical-ai", "digital-twin"], source: { book: F, chapter: "Ch 7" } },
  { slug: "ai-architecture", term: "Architecture (AI architecture)", short: "How the pieces of an AI system connect: to data, to tools and to the model.", body: "When it is chosen by accident, most organisations quietly lock themselves in. Choose it on purpose: own the road, rent the car.", related: ["lock-in", "vendor-neutral", "build-vs-buy"], source: { book: F, chapter: "Ch 10" } },
  { slug: "autonomous-vehicle", term: "Autonomous vehicle (AV)", short: "A vehicle that drives itself using AI and sensors.", body: "A leading example of Physical AI, and of why simulation and a measured sim-to-real gap matter before anything moves in the real world.", related: ["physical-ai", "simulation", "world-model"], source: { book: F, chapter: "Ch 7" } },
  { slug: "bias-and-fairness-testing", term: "Bias and fairness testing", short: "Measuring an AI system's results across the groups it affects, before and after deployment.", body: "It catches unfair patterns inherited from historical data. A test you run, not a value statement you post.", related: ["core", "evaluation", "validation"], source: { book: F, chapter: "Ch 15" } },
  { slug: "change-management", term: "Change management", short: "Bringing along the people whose work will change.", body: "The most neglected, and most decisive, part of implementation. A redesigned workflow nobody adopts is still a demo.", related: ["workflow-redesign", "implementation-gap", "demo-grade-vs-production-grade"], source: { book: F, chapter: "Ch 11" } },
  { slug: "data-localisation", term: "Data localisation (data residency)", short: "Legal rules that require certain data to be stored and processed inside a country's borders.", body: "One practical form of data sovereignty. Check it on the Data-Readiness Checklist under Allowed.", related: ["data-sovereignty", "sovereign-ai", "data-readiness"], source: { book: F, chapter: "Ch 15" } },
  { slug: "disclosure", term: "Disclosure (of AI)", short: "Being open about when a person is dealing with an AI system rather than a human.", body: "Hiding the AI erodes trust; naming it protects trust. Part of the Openness pillar of CORE.", related: ["core", "model-card", "trust-ceiling"], source: { book: F, chapter: "Ch 16" } },
  { slug: "embodied-ai", term: "Embodied AI", short: "AI that acts on the physical world through a body, such as a robot or a vehicle.", body: "The source of Physical AI's moat: you can rent a model, but you cannot rent a body.", related: ["physical-ai", "simulation", "world-model"], source: { book: F, chapter: "Ch 7" } },
  { slug: "eu-ai-act", term: "EU AI Act", short: "The European Union's AI law, which sorts AI uses into risk tiers with real penalties.", body: "The book treats it as a specification to design for, not a threat to fear.", related: ["core", "data-sovereignty", "trust-ceiling"], source: { book: F, chapter: "Ch 15" } },
  { slug: "four-stage-evolution", term: "Four-stage evolution", short: "Foundation, then Generative, then Agentic, then Physical.", body: "Not a menu but a sequence that compounds, with each stage producing fuel for the next.", related: ["foundation-ai", "generative-ai", "agentic-ai"], source: { book: F, chapter: "Ch 3" } },
  { slug: "governance", term: "Governance (AI governance)", short: "The disciplines that make AI trustworthy enough to deploy where it matters.", body: "Put into practice as CORE. The book's line: governance is the unlock, not the brake.", related: ["core", "trust-ceiling", "accountability"], source: { book: F, chapter: "Ch 14" } },
  { slug: "guardrail", term: "Guardrail", short: "Any control that keeps an AI system within safe limits.", body: "An untested guardrail is not a guardrail; it is a hope. The hardest kind is the deterministic guardrail.", related: ["deterministic-guardrail", "autonomy-boundary", "kill-switch"], source: { book: F, chapter: "Ch 17" } },
  { slug: "inference", term: "Inference", short: "An already-trained model producing an output.", body: "Inference cost has been falling sharply, which is part of why the model layer is now a commodity. Training teaches a model; inference uses it.", related: ["foundation-ai", "model-census", "build-vs-buy"], source: { book: F, chapter: "Ch 4" } },
  { slug: "large-language-model", term: "Large language model (LLM)", short: "A model trained on huge amounts of text to understand and produce language.", body: "The engine behind most generative and agentic AI. Commodity fuel, not a source of advantage.", related: ["generative-ai", "agentic-ai", "foundation-ai"], source: { book: F, chapter: "Ch 5" } },
  { slug: "leading-vs-lagging-indicators", term: "Leading vs lagging indicators", short: "A lagging indicator is a final result; a leading indicator is an early signal that points toward it.", body: "Manage by leading indicators while you wait for the lagging ones, such as revenue, to arrive.", related: ["baseline", "vanity-metric", "validation"], source: { book: F, chapter: "Ch 12" } },
  { slug: "maturity-model", term: "Maturity model (AI Flywheel Maturity Model)", short: "Five levels, from Absent to Compounding, across three pillars: Stages, DRIVE and CORE.", body: "Your true level is your lowest pillar. Raise the weakest one first.", related: ["core", "drive", "flywheel"], source: { book: F, chapter: "Ch 23" } },
  { slug: "ai-model", term: "Model (AI model)", short: "The trained system at the heart of an AI capability.", body: "The model is not the variable: it is rarely the cause of success or failure, and never the moat.", related: ["model-census", "model-card", "implementation-gap"], source: { book: F, chapter: "Ch 1" } },
  { slug: "multi-agent-system", term: "Multi-agent system", short: "Software in which several specialised agents hand work to one another.", body: "Together they do a task that none could do alone. Open protocols such as A2A let agents from different vendors take part.", related: ["agent", "a2a", "agentic-ai"], source: { book: F, chapter: "Ch 13" } },
  { slug: "multimodal", term: "Multimodal", short: "An AI system that works with more than one kind of input or output.", body: "Text, images, audio or video. Every input still needs a row in the rights ledger.", related: ["generative-ai", "rights-ledger", "foundation-ai"], source: { book: F, chapter: "Ch 5" } },
  { slug: "observability", term: "Observability", short: "The ability to see what an AI system is doing while it runs.", body: "Paired with traceability, it is the working machinery of continuous validation.", related: ["traceability", "validation", "agent-accountability-register"], source: { book: F, chapter: "Ch 16" } },
  { slug: "production", term: "Production (in production)", short: "Live and doing real work for real users, as opposed to a demo or a pilot.", body: "Reaching production is where value starts to count. Most of the gap is organisational, not technical.", related: ["demo-grade-vs-production-grade", "pilot-purgatory", "workflow-redesign"], source: { book: F, chapter: "Ch 11" } },
  { slug: "robotics", term: "Robotics", short: "Machines that sense, decide and act in the physical world.", body: "A core form of Physical AI. Taught in simulation first, then proven on the bench and scored in reality.", related: ["physical-ai", "simulation", "sim-to-real-gap"], source: { book: F, chapter: "Ch 7" } },
  { slug: "roi", term: "ROI (return on investment)", short: "The value returned compared with the cost.", body: "The book stresses honest ROI, measured against a baseline on a realistic time horizon.", related: ["baseline", "validation", "vanity-metric"], source: { book: F, chapter: "Ch 12" } },
  { slug: "standardisation", term: "Standardisation (reusable building block)", short: "Turning a proven win into a documented, governed, reusable component.", body: "The book's line: don't scale the hero; scale the recipe. It is how Expand feeds the next turn.", related: ["compounding", "reset-tax", "drive"], source: { book: F, chapter: "Ch 13" } },
  { slug: "synthetic-data", term: "Synthetic data", short: "Data made artificially, often from simulation.", body: "Used when real-world data is scarce or risky to collect. It still has to pass the data-readiness gate.", related: ["simulation", "data-readiness", "digital-twin"], source: { book: F, chapter: "Ch 7" } },
  { slug: "telemetry", term: "Telemetry", short: "The operating data a system gives off as it runs.", body: "Capturing it is how one stage seeds the next, and how a win deposits into the Data account.", related: ["compounding", "three-accounts", "traceability"], source: { book: F, chapter: "Ch 8" } },
  { slug: "vla", term: "VLA (vision-language-action model)", short: "A model that links what a machine sees and is told to the physical actions it takes.", body: "A key enabler of Physical AI, alongside world models and simulation.", related: ["physical-ai", "world-model", "simulation"], source: { book: F, chapter: "Ch 7" } },
].sort((a, b) => a.term.localeCompare(b.term));

export function getTerm(slug: string) {
  return GLOSSARY.find((t) => t.slug === slug);
}
