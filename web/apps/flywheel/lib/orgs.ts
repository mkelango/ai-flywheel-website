/**
 * Data for the Higher Education, Business and Government sub-pages (Website Strategy 2.0, pp. 22–23, 25).
 * Prices in rupees, excluding GST. "Proposed" items are not yet final. No invented stats, logos or testimonials.
 */
import { siteHref } from "@flywheel/ui/sites";
import type { StageKey } from "@/lib/programmes";

export type Status = "Real" | "Pilot" | "Illustrative scenario" | "Proposed" | "Ed 1.1";
export type Step = { t: string; d: string; href?: string };

/* ───────── Campus partnership ───────── */

export const PARTNERSHIP_STEPS: Step[] = [
  { t: "Consult", d: "A campus consultation with leadership and IQAC." },
  { t: "Pilot one department", d: "One credit course and one faculty batch." },
  { t: "Sign the MoU", d: "Courses, faculty, challenges and reporting." },
  { t: "Open the labs", d: "Campus Labs set up, each running its studio.", href: "/campus-labs" },
];

export const TIERS = ["Associate", "Partner", "Centre of Excellence"] as const;

export const TIER_ROWS: { feature: string; values: [string, string, string] }[] = [
  { feature: "Credit courses", values: ["One course", "Up to a minor", "Full minor and electives"] },
  { feature: "Faculty Flywheel", values: ["One batch to C1", "Batches to C2", "Batches to C3; Knowledge Partner path"] },
  { feature: "Campus Labs", values: ["—", "One lab", "Two or more labs"] },
  { feature: "Challenges", values: ["Students enter", "Host a campus round", "Host a regional round"] },
  { feature: "Outcome reporting", values: ["Annual", "Each semester", "Live dashboard"] },
  { feature: "Fee", values: ["Quoted per campus", "Quoted per campus", "Quoted per campus"] },
];

/* ───────── Credit courses ───────── */

export const CREDIT_COURSES: { title: string; level: "C2" | "C3"; stage: StageKey; text: string; programme?: string }[] = [
  { title: "AI Foundations", level: "C2", stage: "all", text: "All four stages, CORE basics and the same task done with and without AI.", programme: "generative-ai-practitioner" },
  { title: "Generative AI", level: "C2", stage: "generative", text: "Make text, image and media with AI, with a rights ledger and disclosure.", programme: "generative-ai-practitioner" },
  { title: "Agentic AI Engineering", level: "C3", stage: "agentic", text: "Ship one agent through ADLC: evals, kill switch, oral defence.", programme: "agentic-ai-engineer" },
  { title: "Models and Data", level: "C3", stage: "foundation", text: "Golden sets, bake-offs and Indian-language evaluation through MDLC.", programme: "model-engineer" },
  { title: "Physical AI", level: "C3", stage: "physical", text: "Take a robot cell from simulation to bench test through RDLC.", programme: "physical-ai-robotics-engineer" },
];

export const COURSE_KIT = [
  { t: "Syllabus", d: "Unit plan your board of studies can adopt. Credit value set by your board." },
  { t: "Assessments", d: "Level evidence: quizzes without AI, logged use cases, gate records." },
  { t: "Teaching kits", d: "Slides, lab sheets and studio exercises for each unit." },
];

/* ───────── Faculty ───────── */

export const FACULTY_LEVELS: { level: "C1" | "C2" | "C3"; t: string; d: string }[] = [
  { level: "C1", t: "Aware", d: "Every faculty member explains the four stages and CORE." },
  { level: "C2", t: "Practitioner", d: "Uses AI in teaching and checks every output." },
  { level: "C3", t: "Builder", d: "Redesigns one unit they teach as the capstone, with gate records." },
];

/* ───────── Campus Labs ───────── */

export type Lab = {
  slug: "agentic" | "model" | "generative" | "robotic";
  name: string;
  color: string;
  stage: StageKey;
  runs: string;
  /** When the lab can open: with its studio. */
  opens: "Feb 2027" | "FY28";
  studioPath: string;
  best: string;
  reach: string;
  book: string;
  lifecycle: string;
  builds: string[];
  programme: string;
};

export const LABS: Lab[] = [
  {
    slug: "agentic",
    name: "Agentic Lab",
    color: "#D98B0B",
    stage: "agentic",
    runs: "Agentic Studio",
    opens: "Feb 2027",
    studioPath: "/agentic",
    best: "CS and IT departments, MCA, management",
    reach: "C3 Builder in Agentic",
    book: "The Agentic Studio Playbook",
    lifecycle: "ADLC",
    builds: ["An agent with evals at shipping settings", "A tested kill switch", "A gate log, G1 to G6"],
    programme: "agentic-ai-engineer",
  },
  {
    slug: "model",
    name: "Model Lab",
    color: "#3B4BA8",
    stage: "foundation",
    runs: "Model Studio",
    opens: "FY28",
    studioPath: "/model",
    best: "Data science and AI departments; Indian-language evaluation sets",
    reach: "C3 Builder in Foundation",
    book: "The Foundation Studio Playbook",
    lifecycle: "MDLC",
    builds: ["A golden set in an Indian language", "A blind model bake-off", "A model census card"],
    programme: "model-engineer",
  },
  {
    slug: "generative",
    name: "Generative Lab",
    color: "#B8306F",
    stage: "generative",
    runs: "Generative Studio",
    opens: "FY28",
    studioPath: "/generative",
    best: "Media, design, journalism, commerce and marketing",
    reach: "C3 Builder in Generative",
    book: "The Generative Studio Playbook",
    lifecycle: "GDLC",
    builds: ["A content pipeline others use", "A rights and provenance ledger", "A disclosure policy"],
    programme: "generative-ai-engineer",
  },
  {
    slug: "robotic",
    name: "Robotic Lab",
    color: "#13827F",
    stage: "physical",
    runs: "Robotic Studio + hardware",
    opens: "FY28",
    studioPath: "/robotic",
    best: "Mechanical, ECE, mechatronics; ITIs and polytechnics",
    reach: "C3 Builder in Physical",
    book: "The Robotic Studio Playbook",
    lifecycle: "RDLC",
    builds: ["A cell passed through a simulation gate", "A bench test with logged interventions", "A safety case"],
    programme: "physical-ai-robotics-engineer",
  },
];

export function getLab(slug: string) {
  return LABS.find((l) => l.slug === slug);
}

/* ───────── Challenges ───────── */

export const DRIVE_TURN: Step[] = [
  { t: "Diagnose", d: "Pick a problem statement; set success as a number." },
  { t: "Resource", d: "Data, models and tools; check the data is ready." },
  { t: "Implement", d: "Build in the studio, with CORE gates." },
  { t: "Validate", d: "Evals and a sceptic's test by judges." },
  { t: "Expand", d: "Finalists present at the Inevitable Summit." },
];

/* ───────── Enterprise ───────── */

export const ENTERPRISE_JOURNEY: (Step & { tag?: Status })[] = [
  { t: "Flywheel Check", d: "People by stage and level; your lowest CORE pillar.", href: "/business/check" },
  { t: "Leadership", d: "Executive team at C1, and C4 in DRIVE and CORE.", href: "/programmes/leadership-programme" },
  { t: "Workforce licence", d: "Courses, assessments, reporting. ₹3,000–12,000 per seat a year.", tag: "Ed 1.1", href: "/programmes/workforce-licence" },
  { t: "90-Day Flywheel Start", d: "A cohort on your own use case, gates G1 to G6.", href: "/contact?tag=business" },
  { t: "Studio seats", d: "Teams build on Agentic Studio.", href: siteHref("studio", "/agentic") },
];

/* ───────── Startups ───────── */

export const STARTUP_OFFERS: Step[] = [
  { t: "Founder's Check", d: "A 60-minute review plus a 90-day plan." },
  { t: "Founder cohort", d: "One use case, run as a DRIVE turn with peers." },
  { t: "MSME robotics pilots", d: "With the Robotic Lab, simulation first.", href: "/campus-labs/robotic" },
];

/* ───────── Organisation Flywheel Check ───────── */

export const CHECK_SCAN: Step[] = [
  { t: "People by stage", d: "Foundation, Generative, Agentic, Physical." },
  { t: "People by level", d: "From Aware (C1) to Architect (C5)." },
  { t: "Lowest CORE pillar", d: "The governance gap to close first." },
];

export const CHECK_REPORT = [
  "A stage-by-level map of your people",
  "Your lowest CORE pillar, named",
  "Three candidate use cases, scored",
  "A recommended first programme per team",
  "A 90-day plan",
];

/* ───────── Platform ───────── */

export const PLATFORM_TOOLS: Step[] = [
  { t: "Diagnostic history", d: "Every Flywheel Check, tracked over time." },
  { t: "28 digital tools", d: "Templates, checklists and worksheets from the playbooks." },
  { t: "Agent Operating Model builder", d: "Autonomy levels, owners and escalation for each agent." },
  { t: "CORE governance suite", d: "Tiers, registers, red-team logs and kill-switch drills." },
  { t: "Maturity benchmark", d: "Where you stand, stage by stage." },
];

export const SECURITY_ITEMS = ["SSO", "India data residency", "Audit log", "DPDP processor terms"];

/* ───────── Industries ───────── */

export type Industry = { slug: string; name: string; useCase: string; stage: StageKey; programme: string; extra?: "schools" | "government" };

export const INDUSTRIES: Industry[] = [
  { slug: "manufacturing", name: "Manufacturing", useCase: "Visual quality inspection on one line, tested in simulation first.", stage: "physical", programme: "physical-ai-robotics-engineer" },
  { slug: "bfsi", name: "BFSI", useCase: "Document checks in loan or claims processing, with a human approver.", stage: "agentic", programme: "agentic-ai-engineer" },
  { slug: "healthcare", name: "Healthcare", useCase: "Discharge-summary drafts that a clinician signs off.", stage: "generative", programme: "generative-ai-practitioner" },
  { slug: "retail", name: "Retail", useCase: "Product content and catalogue enrichment, with a rights ledger.", stage: "generative", programme: "generative-ai-engineer" },
  { slug: "telecom", name: "Telecom", useCase: "A service agent that resolves one ticket type end to end.", stage: "agentic", programme: "agentic-ai-engineer" },
  { slug: "education", name: "Education", useCase: "Lesson and assessment drafting for faculty, checked by the teacher.", stage: "generative", programme: "generative-ai-practitioner", extra: "schools" },
  { slug: "energy", name: "Energy", useCase: "Predictive maintenance on one asset class.", stage: "foundation", programme: "model-engineer" },
  { slug: "real-estate", name: "Real estate", useCase: "Lead qualification and site-visit scheduling by an agent.", stage: "agentic", programme: "working-with-ai-agents" },
  { slug: "public-sector", name: "Public sector", useCase: "Citizen-query triage in Tamil and English, under CORE gates.", stage: "core", programme: "core-governance-lead", extra: "government" },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}

/* ───────── Case studies ───────── */

export const CASE_STUDIES: { status: Status; title: string; sector: string; stage: StageKey; text: string }[] = [
  { status: "Illustrative scenario", title: "One inspection line, one DRIVE turn", sector: "Manufacturing", stage: "physical", text: "How a plant team could take a camera cell from simulation to a bench test in 90 days." },
  { status: "Illustrative scenario", title: "A claims agent with a kill switch", sector: "BFSI", stage: "agentic", text: "How an operations team could ship a document-check agent with a human approver and tested stop." },
  { status: "Illustrative scenario", title: "A department pilot on campus", sector: "Higher education", stage: "generative", text: "How one department could run a credit course and a faculty batch before signing an MoU." },
];
