import type { LevelCode } from "./programmes";

export type CoreStage = "foundation" | "generative" | "agentic" | "physical";

/** The stage × level matrix (Foundation Playbook, Table 45.3; Website Strategy 2.0, p. 09). */
export const MATRIX: Record<CoreStage, { tagline: string; lifecycle: string; studio: string; levels: Record<LevelCode, string> }> = {
  foundation: {
    tagline: "The floor",
    lifecycle: "MDLC · 12 phases",
    studio: "Model Studio",
    levels: {
      C1: "Explains the floor and why data decides the ceiling",
      C2: "Finds and documents a data slice; reads a model card",
      C3: "Takes one model through the MDLC",
      C4: "Runs the model census and decides rent, adapt or build",
      C5: "Designs the floor every stage stands on",
    },
  },
  generative: {
    tagline: "Table stakes",
    lifecycle: "GDLC · 12 phases",
    studio: "Generative Studio",
    levels: {
      C1: "Explains what generation can and cannot do",
      C2: "Drafts with AI daily; checks every output; logs what failed",
      C3: "Ships one pipeline through the GDLC with a rights ledger",
      C4: "Turns pipelines into a governed platform",
      C5: "Designs how generative returns fund the floor",
    },
  },
  agentic: {
    tagline: "The value frontier",
    lifecycle: "ADLC · 10 phases · G1–G6",
    studio: "Agentic Studio",
    levels: {
      C1: "Explains agents, the autonomy dial and “no owner, no agent”",
      C2: "Delegates bounded tasks to an agent; reads its trace",
      C3: "Ships one agent release through the ADLC with evals and a kill switch",
      C4: "Sets autonomy levels and runs the Agent Accountability Register",
      C5: "Designs how agent telemetry seeds the next stage",
    },
  },
  physical: {
    tagline: "The industrial frontier",
    lifecycle: "RDLC · 12 phases",
    studio: "Robotic Studio",
    levels: {
      C1: "Explains world models and “practice in a dream”",
      C2: "Works safely beside robots; logs interventions",
      C3: "Takes one cell through the RDLC: hazard analysis, sim gate, bench test",
      C4: "Owns a fleet's safety case; replicates a cell across sites",
      C5: "Designs how real-world data flows back",
    },
  },
};

export const DRIVE = [
  { letter: "D", word: "Diagnose", line: "Write success as a number before you build." },
  { letter: "R", word: "Resource", line: "Own the road, rent the car." },
  { letter: "I", word: "Implement", line: "Redesign the work, don't pave the cow path." },
  { letter: "V", word: "Validate", line: "Pass the sceptic's test, with evidence." },
  { letter: "E", word: "Expand", line: "Scale what works; hand over the next turn." },
];

export const CORE = [
  { letter: "C", word: "Compliance", line: "Risk tiers, DPDP and the rules that apply." },
  { letter: "O", word: "Openness", line: "Say what is AI, and show how it decided." },
  { letter: "R", word: "Responsibility", line: "No owner, no system. A kill switch you've tested." },
  { letter: "E", word: "Empowerment", line: "People stay in charge, and get better at the work." },
];

/** The book series as the curriculum (Foundation Playbook, Table 45.8). */
export const BOOKS = [
  { title: "The AI Flywheel", sub: "The book", pages: null, levels: "C1–C4 in the strands", line: "DRIVE, CORE and the four stages.", color: "var(--primary)" },
  { title: "The Foundation Studio Playbook", sub: "MDLC", pages: 571, levels: "C3–C5 in Foundation", line: "Models and data: rent, adapt or build.", color: "#3B4BA8" },
  { title: "The Generative Studio Playbook", sub: "GDLC", pages: 550, levels: "C3–C4 in Generative", line: "Pipelines with a rights ledger.", color: "#B8306F" },
  { title: "The Agentic Studio Playbook", sub: "ADLC", pages: 559, levels: "C2–C4 in Agentic", line: "Agents that act, gated G1 to G6.", color: "#D98B0B" },
  { title: "The Robotic Studio Playbook", sub: "RDLC", pages: 570, levels: "C3–C4 in Physical", line: "Simulation first, then the bench.", color: "#13827F" },
  { title: "The AI Studio Playbook", sub: "Specialist", pages: null, levels: "Specialist", line: "AI film craft.", color: "#0A131F" },
];

export type Track = {
  key: string;
  name: string;
  start: string;
  build: string[];
  lead?: string;
  roles: string;
  source: string;
  studio: string;
  programmes: string[];
};

/** Seven career tracks (Website Strategy 2.0, p. 21). Programme slugs in order start → lead. */
export const TRACKS: Track[] = [
  {
    key: "developers",
    name: "Developers and software engineers",
    start: "C1 Foundation",
    build: ["Working with AI Agents", "Agentic AI Engineer"],
    lead: "DRIVE Implementer",
    roles: "Context and harness engineer · eval and quality engineer · forward deployed engineer · agent architect",
    source: "Agentic Playbook, Table 40.1",
    studio: "Agentic",
    programmes: ["foundation", "working-with-ai-agents", "agentic-ai-engineer", "drive-implementer"],
  },
  {
    key: "data",
    name: "Data and ML",
    start: "C1 Foundation",
    build: ["CORE for Every Team", "Model Engineer"],
    lead: "AI Flywheel Strategist",
    roles: "Model engineer · data lead · ontology engineer · decision scientist · ML platform engineer",
    source: "Foundation Playbook, Table 42.1",
    studio: "Model",
    programmes: ["foundation", "core-for-every-team", "model-engineer", "ai-flywheel-strategist"],
  },
  {
    key: "product",
    name: "Product and business",
    start: "C1 Foundation",
    build: ["AI for Managers", "Working with AI Agents"],
    lead: "DRIVE Implementer",
    roles: "Agentic product lead · studio lead · domain expert",
    source: "Agentic Playbook",
    studio: "Agentic",
    programmes: ["foundation", "ai-for-managers", "working-with-ai-agents", "drive-implementer"],
  },
  {
    key: "marketing",
    name: "Marketing, media and design",
    start: "C1 Foundation",
    build: ["Generative AI Practitioner", "Generative AI Engineer"],
    roles: "Creative director · pipeline TD · generative artist · eval lead · rights and provenance lead",
    source: "Generative Playbook, Table 42.1",
    studio: "Generative",
    programmes: ["foundation", "generative-ai-practitioner", "generative-ai-engineer"],
  },
  {
    key: "risk",
    name: "Risk, legal, compliance and HR",
    start: "C1 Foundation",
    build: ["CORE for Every Team"],
    lead: "CORE Governance Lead",
    roles: "AI governance lead · rights and provenance lead · model risk lead",
    source: "Studio Playbooks",
    studio: "None needed",
    programmes: ["foundation", "core-for-every-team", "core-governance-lead"],
  },
  {
    key: "manufacturing",
    name: "Manufacturing and engineering",
    start: "C1 Foundation",
    build: ["Working with AI Agents", "Physical AI and Robotics Engineer"],
    roles: "Controls, perception, robot-learning, simulation and test engineers",
    source: "Robotic Playbook, Table 41.1",
    studio: "Robotic",
    programmes: ["foundation", "working-with-ai-agents", "physical-ai-robotics-engineer"],
  },
  {
    key: "students",
    name: "Students and freshers",
    start: "C1 free",
    build: ["Any C2", "One C3 cohort, at a student price"],
    roles: "Entry roles in any track above, with a verified portfolio for interviews",
    source: "All tracks",
    studio: "Any",
    programmes: ["foundation", "generative-ai-practitioner", "agentic-ai-engineer"],
  },
];
