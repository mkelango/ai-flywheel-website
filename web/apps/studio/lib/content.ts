/**
 * Studio content, drawn from the Studio Playbooks (Agentic, Foundation,
 * Generative, Robotic) and the Agentic Studio technical pack. Keep copy short.
 */

export type StudioKey = "agentic" | "model" | "generative" | "robotic";

export type Phase = { n: number; name: string; gate?: string };

export type Studio = {
  key: StudioKey;
  name: string;
  verb: "KNOW" | "MAKE" | "DO" | "MOVE";
  stage: string;
  color: string;
  status: string;
  statusShort: string;
  line: string;
  cycle: string;
  cycleName: string;
  lab: string;
  href: string;
  /** Matching C3 programme on aiflywheel.in and its Campus Lab page. */
  programme: { title: string; slug: string };
  labSlug: string;
  /** Search: unique title, description, category phrase and answer-first intro. */
  seo: { title: string; description: string; kicker: string; intro: string };
  builds: { title: string; text: string }[];
  phases: Phase[];
};

export const STUDIOS: Studio[] = [
  {
    key: "agentic",
    name: "Agentic Studio",
    verb: "DO",
    stage: "Agentic · the value frontier",
    color: "#D98B0B",
    status: "Opens Feb 2027 · Early access",
    statusShort: "Feb 2027",
    line: "Build agents that act, with the system that watches them.",
    cycle: "ADLC",
    cycleName: "Agentic Development Life Cycle",
    lab: "Agentic Lab",
    href: "/agentic",
    programme: { title: "Agentic AI Engineer", slug: "agentic-ai-engineer" },
    labSlug: "agentic",
    seo: {
      title: "AI Agent Builder: Agentic Studio",
      description: "Build one bounded AI agent with evals, a gate log and a tested kill switch. Model-agnostic, MCP gateway. Opens Feb 2027. Join early access.",
      kicker: "The AI agent builder",
      intro: "Agentic Studio is the AI agent builder of AI Flywheel: build agents that act, with the system that watches them.",
    },
    builds: [
      { title: "One bounded workflow", text: "An agent with a named owner, a risk tier and autonomy limits." },
      { title: "Eval suite", text: "Graded test cases that grow with every spec." },
      { title: "Gate log", text: "Six signed decisions, G1 to G6, with linked evidence." },
      { title: "Tested kill switch", text: "Proved to stop the agent before go-live." },
    ],
    phases: [
      { n: 0, name: "Discover" },
      { n: 1, name: "Define", gate: "G1" },
      { n: 2, name: "Design", gate: "G2" },
      { n: 3, name: "Specify", gate: "G3" },
      { n: 4, name: "Prototype", gate: "G4" },
      { n: 5, name: "Build" },
      { n: 6, name: "Verify", gate: "G5" },
      { n: 7, name: "Govern and release", gate: "G6" },
      { n: 8, name: "Operate" },
      { n: 9, name: "Learn and evolve" },
    ],
  },
  {
    key: "model",
    name: "Model Studio",
    verb: "KNOW",
    stage: "Foundation · the floor",
    color: "#3B4BA8",
    status: "Coming FY28",
    statusShort: "FY28",
    line: "Know your data and models: rent, adapt or build, on evidence.",
    cycle: "MDLC",
    cycleName: "Model Development Life Cycle",
    lab: "Model Lab",
    href: "/model",
    programme: { title: "Model Engineer", slug: "model-engineer" },
    labSlug: "model",
    seo: {
      title: "Model Development Life Cycle (MDLC)",
      description: "Know your data and models: rent, adapt or build, on evidence. Twelve phases, six gates, a blind bake-off and a model card. Coming FY28.",
      kicker: "Model development life cycle (MDLC)",
      intro: "Model Studio runs the model development life cycle: know your data and models, then rent, adapt or build, on evidence.",
    },
    builds: [
      { title: "Data-readiness checklist", text: "Run on every slice the use case needs." },
      { title: "Blind bake-off", text: "Three or more candidates scored on a golden set." },
      { title: "Eval record", text: "Thresholds met at the settings that will ship." },
      { title: "Model card and census entry", text: "With a tested kill switch and rehearsed rollback." },
    ],
    phases: [
      { n: 0, name: "Discover" },
      { n: 1, name: "Decide" },
      { n: 2, name: "Ready the floor", gate: "G1" },
      { n: 3, name: "Design", gate: "G2" },
      { n: 4, name: "Select", gate: "G3" },
      { n: 5, name: "Adapt or train" },
      { n: 6, name: "Evaluate", gate: "G4" },
      { n: 7, name: "Secure and align" },
      { n: 8, name: "Govern and approve", gate: "G5" },
      { n: 9, name: "Deploy and serve", gate: "G6" },
      { n: 10, name: "Operate and monitor" },
      { n: 11, name: "Learn and renew" },
    ],
  },
  {
    key: "generative",
    name: "Generative Studio",
    verb: "MAKE",
    stage: "Generative · table stakes",
    color: "#B8306F",
    status: "Coming FY28",
    statusShort: "FY28",
    line: "Make with AI, safely: rights in, credentials out.",
    cycle: "GDLC",
    cycleName: "Generative Development Life Cycle",
    lab: "Generative Lab",
    href: "/generative",
    programme: { title: "Generative AI Engineer", slug: "generative-ai-engineer" },
    labSlug: "generative",
    seo: {
      title: "Generative AI Development Life Cycle",
      description: "Make with AI, safely: a rights ledger in, C2PA content credentials out. Twelve phases, six gates, golden sets. Coming FY28. Get notified.",
      kicker: "Generative AI development life cycle (GDLC)",
      intro: "Generative Studio runs the generative AI development life cycle: a rights ledger in, C2PA content credentials out.",
    },
    builds: [
      { title: "Style lock and pipeline", text: "A working pipeline on real briefs." },
      { title: "Rights ledger", text: "Licences, releases and consents behind every input." },
      { title: "Golden set and prompt cards", text: "Versioned, scored by people and model judges." },
      { title: "Content credentials", text: "C2PA labels on every output that ships." },
    ],
    phases: [
      { n: 0, name: "Discover" },
      { n: 1, name: "Define", gate: "G1" },
      { n: 2, name: "Design" },
      { n: 3, name: "Source data and rights", gate: "G2" },
      { n: 4, name: "Select", gate: "G3" },
      { n: 5, name: "Prototype" },
      { n: 6, name: "Adapt", gate: "G4" },
      { n: 7, name: "Evaluate" },
      { n: 8, name: "Govern and approve", gate: "G5" },
      { n: 9, name: "Ship", gate: "G6" },
      { n: 10, name: "Operate" },
      { n: 11, name: "Learn and scale" },
    ],
  },
  {
    key: "robotic",
    name: "Robotic Studio",
    verb: "MOVE",
    stage: "Physical · the industrial frontier",
    color: "#13827F",
    status: "Coming FY28",
    statusShort: "FY28",
    line: "Put intelligence into machines, with a safety case behind it.",
    cycle: "RDLC",
    cycleName: "Robotic Development Life Cycle",
    lab: "Robotic Lab",
    href: "/robotic",
    programme: { title: "Physical AI and Robotics Engineer", slug: "physical-ai-robotics-engineer" },
    labSlug: "robotic",
    seo: {
      title: "Robotic Development Life Cycle (RDLC)",
      description: "Put intelligence into machines with a safety case: digital twin, sim results and bench integration first. Twelve phases, six gates. Coming FY28.",
      kicker: "Robotic development life cycle (RDLC)",
      intro: "Robotic Studio runs the robotic development life cycle: put intelligence into machines, with a safety case behind it.",
    },
    builds: [
      { title: "Digital twin", text: "A scenario library and sim results before metal." },
      { title: "Safety case", text: "An evidence-backed argument, inside a defined ODD." },
      { title: "Robotic census", text: "Parts, firmware, models and datasets, kept by machine." },
      { title: "Bench integration", text: "Proof it works on the bench before the site." },
    ],
    phases: [
      { n: 0, name: "Discover" },
      { n: 1, name: "Define", gate: "G1" },
      { n: 2, name: "Design", gate: "G2" },
      { n: 3, name: "Simulate", gate: "G3" },
      { n: 4, name: "Prototype" },
      { n: 5, name: "Teach (data)" },
      { n: 6, name: "Train" },
      { n: 7, name: "Integrate", gate: "G4" },
      { n: 8, name: "Verify and validate", gate: "G5" },
      { n: 9, name: "Certify and release", gate: "G6" },
      { n: 10, name: "Deploy and operate" },
      { n: 11, name: "Learn and scale" },
    ],
  },
];

export const studioByKey = (k: StudioKey) => STUDIOS.find((s) => s.key === k)!;

/** ADLC: ten phases, six gates (Agentic Studio Playbook, Ch 5). */
export const ADLC = [
  { n: 0, name: "Discover", drive: "Diagnose", does: "Pick the work to agentify, against a baseline.", gate: null },
  { n: 1, name: "Define", drive: "Diagnose", does: "Strategy, unit economics and a risk tier.", gate: { code: "G1", name: "Thesis approved", q: "Is this worth building, and safe to build?" } },
  { n: 2, name: "Design", drive: "Resource", does: "Technical memo, architecture pack, threat model.", gate: { code: "G2", name: "Architecture approved", q: "Will this design meet the targets, risks and rules?" } },
  { n: 3, name: "Specify", drive: "Resource", does: "Specs, contracts, acceptance tests, autonomy limits per agent.", gate: { code: "G3", name: "Definition of ready", q: "Can agents build this without guessing?" } },
  { n: 4, name: "Prototype", drive: "Implement", does: "Every screen on fixtures; tested with users.", gate: { code: "G4", name: "Experience sign-off", q: "Do users understand it and want it?" } },
  { n: 5, name: "Build", drive: "Implement", does: "Vertical slices in waves, agents behind flags.", gate: { code: "Waves", name: "Wave gates", q: "Does each slice work end to end?" } },
  { n: 6, name: "Verify", drive: "Validate", does: "Test, eval, security, load and accessibility reports.", gate: { code: "G5", name: "Quality gate", q: "Does it work, safely, at load?" } },
  { n: 7, name: "Govern & release", drive: "Validate", does: "Registry entries, rollback rehearsed, kill switch tested.", gate: { code: "G6", name: "Governance and go-live", q: "May it go live, and can we stop it?" } },
  { n: 8, name: "Operate", drive: "Expand", does: "Dashboards, incidents, cost, one trace per run.", gate: null },
  { n: 9, name: "Learn & evolve", drive: "Expand", does: "Every release feeds evals and the next G1.", gate: null },
] as const;

export const GATES = [
  { code: "G1", name: "Thesis approved" },
  { code: "G2", name: "Architecture approved" },
  { code: "G3", name: "Definition of ready" },
  { code: "G4", name: "Experience sign-off" },
  { code: "G5", name: "Quality gate" },
  { code: "G6", name: "Kill switch tested · go-live" },
] as const;

/** Six autonomy levels and the controls each needs first (Agentic Studio Playbook, Table 3.3). */
export const AUTONOMY = [
  { code: "L0", name: "Manual", product: "Rules and scripts only.", controls: ["Normal engineering controls"] },
  { code: "L1", name: "Assist", product: "Suggestions shown to the user.", controls: ["Normal review"] },
  { code: "L2", name: "Pair", product: "Drafts that a person sends.", controls: ["A person reads every output"] },
  { code: "L3", name: "Delegate", product: "Proposes actions; a person approves.", controls: ["Tests, evals and AI review before human review", "Scoped permissions"] },
  {
    code: "L4",
    name: "Supervise",
    product: "Acts within policy; escalates exceptions.",
    controls: ["Sandbox and outbound limits", "Agent identity", "Audit log", "Sampled review", "Kill switch"],
  },
  { code: "L5", name: "Autonomous", product: "Runs a bounded domain end to end.", controls: ["A long eval record", "Instant rollback", "Regulator-ready records"] },
] as const;

/** Five kill-switch levels, narrowest first (Technical Architecture, 15.8). */
export const KILL_SWITCH = ["Run", "Agent", "System", "Tenant", "Global"] as const;

export type AudienceKey = "learners" | "campuses" | "teams" | "schools";

export const AUDIENCES: {
  key: AudienceKey;
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  line: string;
  /** Search: unique title and description, plus the category phrase shown in the H1. */
  seo: { title: string; description: string; kicker: string };
  /** A few contextual links with descriptive anchors. */
  related: { label: string; href: string; site?: "flywheel" | "schools" }[];
  points: { title: string; text: string }[];
  cta: { label: string; href: string; site?: "flywheel" | "schools" };
  secondary?: { label: string; href: string; site?: "flywheel" | "schools" };
}[] = [
  {
    key: "learners",
    label: "Cohort learners",
    href: "/for-learners",
    eyebrow: "For learners",
    title: "Your cohort builds here.",
    line: "Build AI agents with your cohort: twelve weeks, one real use case, a team of four to six. The Studio is where the build happens.",
    seo: {
      title: "Build AI Agents in Your Cohort",
      description: "Twelve weeks, one real use case, a team of four to six. Build an AI agent through gates G1 to G5 and keep your Builder (C3) evidence.",
      kicker: "Build AI agents in your cohort",
    },
    related: [{ label: "The Agentic AI Engineer programme", href: "/programmes/agentic-ai-engineer", site: "flywheel" }, { label: "Agentic Studio, the AI agent builder", href: "/agentic" }, { label: "The agent development life cycle", href: "/how-it-works" }],
    points: [
      { title: "Build in teams", text: "Mixed-role teams run one real use case through the life cycle." },
      { title: "Gates inside the cohort", text: "G1 to G5 fall inside the 12 weeks; G6 at a week-16 review." },
      { title: "Your level travels", text: "Builder (C3) evidence and your portfolio stay with your login." },
    ],
    cta: { label: "Join early access", href: "/early-access" },
    secondary: { label: "Find a programme", href: "/programmes", site: "flywheel" },
  },
  {
    key: "campuses",
    label: "Campus Labs",
    href: "/for-campuses",
    eyebrow: "For campuses",
    title: "A lab runs a studio.",
    line: "Campus AI lab software: a Lab is the room, the Studio is the software. Every Campus Lab runs one.",
    seo: {
      title: "Campus AI Lab Software: Agentic Lab",
      description: "A Lab is the room; the Studio is the software. Every Campus Lab runs one, starting with Agentic Lab. Students reach Builder (C3) on gate records.",
      kicker: "Campus AI lab software",
    },
    related: [{ label: "Agentic Lab for engineering colleges", href: "/campus-labs/agentic", site: "flywheel" }, { label: "Agentic Studio, the software it runs", href: "/agentic" }, { label: "Studio roadmap and Lab dates", href: "/roadmap" }],
    points: [
      { title: "Agentic Lab", text: "Runs Agentic Studio, the first studio to open." },
      { title: "Model, Generative, Robotic Lab", text: "Ship with their studios in FY28." },
      { title: "Credit-bearing builds", text: "Students reach Builder (C3) with gate records, not slides." },
    ],
    cta: { label: "Join early access", href: "/early-access" },
    secondary: { label: "Campus partnerships", href: "/higher-education", site: "flywheel" },
  },
  {
    key: "teams",
    label: "Enterprise teams",
    href: "/for-teams",
    eyebrow: "For teams",
    title: "Studio seats. One gateway.",
    line: "An enterprise AI agent platform for your teams: build on one governed gateway, with one identity, one policy and one trace.",
    seo: {
      title: "Enterprise AI Agent Platform for Teams",
      description: "Studio seats on one governed gateway: one identity, one policy, one trace. SSO via OIDC, tenant pinned to its home region. Join early access.",
      kicker: "Enterprise AI agent platform",
    },
    related: [{ label: "AI agent governance and security", href: "/security" }, { label: "AI agent platform architecture", href: "/architecture" }, { label: "Workforce programmes on aiflywheel.in", href: "/business", site: "flywheel" }],
    points: [
      { title: "Studio seats", text: "Seats for the people who build, sign and operate agents." },
      { title: "One gateway", text: "Model calls and tools routed through one policy layer." },
      { title: "Your IdP", text: "SSO via OIDC; a tenant pinned to its home region." },
    ],
    cta: { label: "Join early access", href: "/early-access" },
    secondary: { label: "Workforce programmes", href: "/business", site: "flywheel" },
  },
  {
    key: "schools",
    label: "Schools",
    href: "/for-schools",
    eyebrow: "For schools",
    title: "Teacher-run accounts.",
    line: "Teacher-run student AI accounts: under-18s build in Studio only through accounts their teacher or school owns.",
    seo: {
      title: "Teacher-Run AI Accounts for Schools",
      description: "Under-18s build in Studio through accounts their school or teacher owns, with verifiable parental consent and no marketing. Visit the Schools site.",
      kicker: "Teacher-run student AI accounts",
    },
    related: [{ label: "AI Flywheel at Schools", href: "/", site: "schools" }, { label: "Child-data rules and DPDP", href: "/security" }, { label: "Studio FAQ for schools and parents", href: "/faq" }],
    points: [
      { title: "Teacher-owned", text: "The school or teacher owns every student profile." },
      { title: "Parental consent", text: "Verifiable parental consent. Student data is never used for marketing." },
      { title: "Moves at 18", text: "With consent, the account moves to the learner, portfolio kept." },
    ],
    cta: { label: "Visit AI Flywheel at Schools", href: "/", site: "schools" },
    secondary: { label: "Join early access", href: "/early-access" },
  },
];

/** The four records every Agentic Studio project leaves behind (Agentic Studio Playbook). */
export const ARTEFACTS = [
  { file: "docs/releases/gates.md", title: "Gate log", text: "Six signed decisions, each with linked evidence.", lines: ["G5  quality gate   pass", "signed  eval lead", "evidence  #evals #security"] },
  { file: "evals/intake.yaml", title: "Eval suite", text: "Graded cases that grow with every spec.", lines: ["cases  golden/intake", "threshold  0.90", "critical  0"] },
  { file: "registry/agents.csv", title: "Register row", text: "One agent, one named human owner.", lines: ["agent  intake", "owner  named human", "autonomy  L3 · tier 2"] },
  { file: "ops/kill-switch.md", title: "Tested kill switch", text: "Proved to stop the agent before go-live.", lines: ["level  agent", "drill  passed", "restore  human only"] },
] as const;
