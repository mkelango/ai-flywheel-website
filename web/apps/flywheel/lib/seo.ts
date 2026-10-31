/**
 * Search and answer-engine metadata: one primary keyword per URL (Website Strategy 2.0 keyword clusters).
 * Titles are the segment before the root template's " · AI Flywheel" (46 characters or fewer).
 * Descriptions keep the site's price labels: Ed 1.1 or Proposed, rupees, excl. GST.
 */
import type { Metadata } from "next";
import { BASE_OG, SITE_URL } from "./site";
import { enAlternates } from "./ta";

export type SeoEntry = { title: string; description: string; primary: string };

/** The one canonical brand sentence, repeated verbatim on /, /about and llms.txt. */
export const BRAND_LINE = "AI Flywheel is the practical AI learning platform that certifies what you can build.";

/** Content review date shown on key reference pages. */
export const UPDATED = { label: "October 2026", iso: "2026-10-30" };

const E = (title: string, description: string, primary: string): SeoEntry => ({ title, description, primary });

export const SEO: Record<string, SeoEntry> = {
  "/": E("AI Courses and Certification in India", "Learn AI by building real work. Start with the free C1 course, then earn C2 to C5 on what you ship. English and Tamil, rupee prices. Start free.", "AI courses in India"),
  "/programmes": E("AI Certification Programmes, C1 to C5", "Every AI Flywheel programme by level and stage, from a free C1 course to C5 Architect. Compare format, hours and prices (excl. GST). Find your fit.", "AI certification programmes"),
  "/professionals": E("AI Courses for Working Professionals", "Evening and Saturday AI cohorts (IST), about 8 hours a week, built on one real use case. EMI and employer sponsorship letters. Start with the free C1.", "AI courses for working professionals"),
  "/higher-education": E("AI Programmes for Colleges and Universities", "Credit courses, faculty development, Campus Labs and challenges under one annual MoU. Outcomes reported by level and stage. Book a consultation.", "AI programmes for colleges"),
  "/business": E("AI Upskilling Programme for Companies", "Scan, lead, license, start, build: one path for enterprises, GCCs, startups and MSMEs. Prices in rupees, excl. GST. Take the Flywheel Check.", "AI upskilling programme for companies"),
  "/business/enterprise": E("Enterprise AI Training for GCCs", "For enterprises and GCCs in India: a capability scan, a leadership session, a workforce licence and a 90-Day Start on one real use case. Talk to us.", "enterprise AI training for GCCs"),
  "/business/startups": E("AI for Startups and MSMEs", "A Founder's Check, then a cohort or a pilot on one use case that pays back. Built for Indian startups, MSMEs and family businesses. Start the Check.", "AI for startups and MSMEs"),
  "/business/check": E("AI Readiness Assessment for Organisations", "Scan your people by AI stage and level and find your lowest CORE pillar. Get a scored report and a 90-day plan. Request the organisation Check.", "AI readiness assessment for organisations"),
  "/check": E("Free AI Skills Test: Find Your Level", "Eight questions, about five minutes. See a suggested level for each AI stage and the programme that fits. Nothing is sent. Take the Check.", "AI skills test"),
  "/business/platform": E("AI Governance and Diagnostic Toolkit", "28 digital tools, the Agent Operating Model builder, the CORE governance suite and a maturity benchmark, inside the licence. Priced in rupees. See it.", "AI governance and diagnostic toolkit"),
  "/business/industries": E("AI Use Cases by Industry in India", "One first AI use case for each of nine sectors, from BFSI to the public sector, with the stage and programme that fit. Find yours and start.", "AI use cases by industry India"),
  "/business/industries/bfsi": E("AI in BFSI: First Use Case", "Document checks in loan or claims processing, with a human approver. The agentic stage and Agentic AI Engineer programme that fit. See the path.", "AI in BFSI use case"),
  "/business/industries/manufacturing": E("AI Visual Quality Inspection", "Visual quality inspection on one line, tested in simulation first. The physical AI stage and programme that fit manufacturers in India. See the path.", "AI visual quality inspection"),
  "/case-studies": E("AI Implementation Case Studies", "Every case study carries a status label: Real, Pilot or Illustrative scenario. We publish only what we can prove. Read the cases.", "AI implementation case studies"),
  "/government": E("AI for Government Departments in India", "AI programmes for departments and officers: civil service training, a Chief AI Officer programme, use-case clinics and GeM routes. Request a meeting.", "AI for government India"),
  "/government/civil-service": E("AI Training for Government Officers", "Officers skilled by AI stage and level, assessed on real work and one check taken without AI. Tamil and English. Request a meeting for your department.", "AI training for government officers"),
  "/government/chief-ai-officer": E("Chief AI Officer Course", "Govern a portfolio, not a pilot. A Chief AI Officer programme for departments: CORE governance, an accountability register and DRIVE. Ask for details.", "chief AI officer course"),
  "/government/use-case-clinic": E("Public-Sector AI Use-Case Clinic", "Bring one service. Run one turn. A clinic that takes one public-sector AI use case through DRIVE, under CORE gates. Book a clinic.", "public sector AI use case clinic"),
  "/government/economy-program": E("State AI Skilling Programme", "Count Builders, not enrolments. A state-scale AI skilling programme reported by level, stage and district. Request a meeting.", "state AI skilling programme"),
  "/government/buying": E("Buy AI Training on GeM", "GeM, empanelment and MoU routes for buying AI Flywheel programmes. Rupee prices, excl. GST. See the routes and talk to us.", "buy AI training on GeM"),
  "/programmes/foundation": E("Free AI Course with Certificate (C1)", "The AI Flywheel Foundation: free, self-paced, about 6 hours, English and Tamil. Optional proctored quiz ₹499 (Proposed) for C1. Start free.", "free AI course with certificate"),
  "/programmes/generative-ai-practitioner": E("Generative AI Course for Professionals", "Use generative AI in your own work, check every output and earn C2 Practitioner. Self-paced, 15–20 h, 2 live clinics. ₹4,999–7,999 (Proposed). Apply.", "generative AI course for professionals"),
  "/programmes/working-with-ai-agents": E("AI Agents Course with Certificate (C2)", "Learn to delegate to an AI agent, read its trace and escalate. Self-paced, about 15 h, 2 clinics. C2 Practitioner. ₹4,999–7,999 (Proposed). Apply.", "AI agents course with certificate"),
  "/programmes/core-for-every-team": E("Responsible AI Course for Employees", "Apply a risk tier to your own AI use and earn C2 Practitioner. Self-paced, about 8 hours. ₹2,999 (Proposed), excl. GST. Start your team.", "responsible AI course for employees"),
  "/programmes/ai-for-managers": E("AI Course for Managers", "A 4-week cohort-lite course, 3 hours a week, on leading AI in your team. C2 Practitioner. ₹9,999–14,999 (Proposed), excl. GST. Apply now.", "AI course for managers"),
  "/programmes/agentic-ai-engineer": E("Agentic AI Course in India (C3 Builder)", "Ship your first production agent in 12 weeks in a team of 4–6, gate by gate (ADLC). Earn C3 Builder. ₹35,000–60,000 (Ed 1.1), excl. GST. Apply for Feb 2027.", "agentic AI course India"),
  "/programmes/generative-ai-engineer": E("Generative AI Engineering Course (C3)", "Ship one generative AI pipeline through the GDLC with a rights ledger. 12-week team cohort, C3 Builder. ₹35,000–60,000 (Ed 1.1), excl. GST. Join the list.", "generative AI engineering course"),
  "/programmes/model-engineer": E("AI Model Engineering Course (C3)", "Take one model through the MDLC: golden sets, bake-offs and Indian-language evaluation. 12-week cohort, C3 Builder. ₹35,000–60,000 (Ed 1.1), excl. GST.", "AI model engineering course"),
  "/programmes/physical-ai-robotics-engineer": E("Physical AI and Robotics Course (C3)", "Take one robot cell from simulation to bench test through the RDLC. 12-week cohort plus lab days. ₹35,000–60,000 plus lab fee (Proposed), excl. GST.", "physical AI and robotics course"),
  "/programmes/drive-implementer": E("AI Implementation Certification (C4)", "Run a portfolio of AI turns with the DRIVE method and earn C4 Leader. 8-week executive cohort. ₹60,000–90,000 (Proposed), excl. GST. Apply.", "AI implementation certification"),
  "/programmes/core-governance-lead": E("AI Governance Certification in India", "Lead AI governance with CORE: a Quick Scan, an Accountability Register, DPDP-aware controls. 8 weeks, C4 Leader. ₹60,000–90,000 (Proposed), excl. GST.", "AI governance certification India"),
  "/programmes/ai-flywheel-strategist": E("AI Strategy Certification (C5 Architect)", "Design the system every AI stage stands on. Executive programme with panel review. C5 Architect. ₹1.5–2.5 lakh (Proposed), excl. GST. Apply.", "AI strategy certification"),
  "/programmes/leadership-programme": E("AI Leadership Programme for Executives", "Two days for your leadership team, then a 90-day follow-up on one decision. Quoted per organisation (Proposed). Talk to us.", "AI leadership programme for executives"),
  "/programmes/workforce-licence": E("AI Training for Employees, Per Seat", "Courses, assessments and reporting for your whole workforce. ₹3,000–12,000 per seat a year (Ed 1.1), excl. GST. Ask for a licence quote.", "AI training for employees"),
  "/programmes/foundation-ai": E("Foundation AI: Data and ML Courses", "The floor every AI stage stands on: data, classical ML, analytics and models. Courses from C1 to C5 for this stage. See the path.", "foundation AI: data and machine learning"),
  "/programmes/generative": E("Generative AI Learning Path, C1 to C5", "Every generative AI course on one ladder, from free C1 to C3 Engineer and beyond, with the studio you build in. Pick your next step.", "generative AI learning path"),
  "/programmes/agentic": E("Agentic AI Learning Path, C1 to C5", "Learn agentic AI step by step: C2 Working with AI Agents, then C3 Agentic AI Engineer in a 12-week cohort. See the full path.", "agentic AI learning path"),
  "/programmes/physical": E("Physical AI Learning Path", "AI that leaves the screen. Courses for robotics and physical AI, from C1 to C3 Builder in a robot cell, with the Robotic Studio. See the path.", "physical AI learning path"),
  "/programmes/core": E("CORE Governance Courses, C2 to C4", "Governance and risk on one ladder: CORE for Every Team at C2, CORE Governance Lead at C4. Find the governance course for your role.", "CORE governance courses"),
  "/programmes/drive": E("DRIVE Method Courses: Strategy and Delivery", "Strategy and delivery on one ladder: AI for Managers, DRIVE Implementer and AI Flywheel Strategist. Find your level and apply.", "DRIVE method courses"),
  "/programmes/level/c1": E("C1 Aware: AI Awareness Certificate", "C1 Aware: you can explain an AI stage, why it matters and where it fails. Earned with the free Foundation course and a quiz taken without AI.", "AI awareness certificate"),
  "/programmes/level/c2": E("C2 Practitioner: AI Practitioner Certification", "C2 Practitioner: you use AI in your own work, check every output and log what failed. See the courses that lead to C2 and start one.", "AI practitioner certification"),
  "/programmes/level/c3": E("C3 Builder: AI Builder Certification", "C3 Builder: you ship one real turn through a stage's life cycle, gate by gate, with an oral defence. See the four Builder cohorts.", "AI builder certification"),
  "/programmes/level/c4": E("C4 Leader: AI Leader Certification", "C4 Leader: you run a portfolio of AI turns and the governance around them. Earned through DRIVE Implementer or CORE Governance Lead.", "AI leader certification"),
  "/programmes/level/c5": E("C5 Architect: AI Architect Certification", "C5 Architect: you design the system every AI stage stands on, and teach it. Earned through the AI Flywheel Strategist with a panel review.", "AI architect certification"),
  "/tracks/developers": E("AI Course for Software Developers", "A start, build and lead path for developers: free C1, C2 agents, then the 12-week Agentic AI Engineer cohort. See your track.", "AI course for software developers"),
  "/tracks/data-ml": E("AI Course for Data and ML Professionals", "A track for data and ML roles: foundation AI, the Model Engineer cohort and evaluation in Indian languages. See your path.", "AI course for data scientists"),
  "/tracks/product": E("AI Course for Product Managers", "A track for product managers: start free, lead AI in your team, work with AI agents, then DRIVE to ship turns. See your path.", "AI course for product managers"),
  "/tracks/marketing": E("AI Course for Marketers", "A track for marketing teams: generative AI with a rights ledger and disclosure, from free C1 to C3. See your path.", "AI course for marketers"),
  "/tracks/risk": E("AI Course for Risk and Compliance", "A track for risk, audit and compliance: CORE for Every Team, then CORE Governance Lead at C4. See your path.", "AI course for risk and compliance professionals"),
  "/tracks/manufacturing": E("AI Course for Manufacturing Engineers", "A track for plant and manufacturing engineers: free C1, AI agents, then physical AI and robotics from simulation to bench test. See your path.", "AI course for manufacturing engineers"),
  "/tracks/students": E("AI Career Path for Students", "Start free at C1, build a portfolio, then choose a Builder track. A step-by-step AI path for college students. See your track.", "AI career path for students"),
  "/students": E("AI Programmes for College Students", "Start free, build a portfolio and choose a track. Student pricing, campus chapters and inter-college challenges. Start with C1.", "AI programmes for college students"),
  "/faculty": E("AI Faculty Development Programme (FDP)", "Faculty development to C1, C2 and C3, with a redesigned unit as the capstone. Builders can teach the credit courses. Plan an FDP for your campus.", "AI faculty development programme"),
  "/campus-labs": E("AI Lab for Engineering Colleges", "Four Campus Labs: Agentic, Model, Generative and Robotic, each running its studio. Compare what each runs. Set-up quoted per campus. Ask for a quote.", "AI lab for engineering colleges"),
  "/campus-labs/agentic": E("Agentic AI Lab for Colleges", "An Agentic Lab on campus, running the Agentic Studio: students ship agents gate by gate toward C3 Builder. Set-up quoted per campus.", "agentic AI lab for colleges"),
  "/campus-labs/robotic": E("Robotics Lab for Engineering Colleges", "A Robotic Lab running the Robotic Studio: simulation first, then bench tests through the RDLC. Set-up quoted per campus. Ask for a quote.", "robotics lab for engineering colleges"),
  "/campus-labs/generative": E("Generative AI Lab for Colleges", "A Generative Lab running the Generative Studio: pipelines with a rights ledger and disclosure. Set-up quoted per campus. Ask for a quote.", "generative AI lab for colleges"),
  "/campus-labs/model": E("AI Model Lab for Colleges", "A Model Lab running the Model Studio: golden sets, bake-offs and Indian-language evaluation. Set-up quoted per campus. Ask for a quote.", "AI model lab for colleges"),
  "/credit-courses": E("AI Credit Courses and Minors", "Five semester courses mapped to C2 and C3, from AI Foundations to Physical AI, with syllabus, assessments and teaching kits. See the courses.", "AI credit courses for universities"),
  "/campus-partnership": E("AI Campus Partnership (MoU)", "One annual MoU for courses, faculty, labs, challenges and reporting. Associate, Partner or Centre of Excellence (Proposed). Book a consultation.", "AI campus partnership"),
  "/challenges": E("Inter-College AI Hackathon", "Inter-college AI challenges run as one DRIVE turn, with finals at the Inevitable Summit, week of 8 February 2027. See the challenges.", "inter-college AI hackathon"),
  "/certifications": E("Verifiable AI Certificates, C1 to C5", "One credential ladder, C1 Aware to C5 Architect, earned with evidence from real work. Open Badges 3.0, public verify page, yearly recertification.", "verifiable AI certificate"),
  "/certifications/exams": E("AI Certification Exams and Recertification", "An artefact from real work plus one proctored check taken without AI, for every level C1 to C5. Yearly recertification. See the evidence.", "AI certification exam"),
  "/verify": E("Verify an AI Flywheel Credential", "Check any AI Flywheel credential. Every level is an Open Badges 3.0 badge with a public verify page. Enter a credential ID.", "verify AI Flywheel certificate"),
  "/pricing": E("AI Course Fees in India", "Every AI Flywheel price in rupees, excl. GST, from free C1 to C5, each labelled Proposed or Ed 1.1. EMI and scholarships (Proposed). Compare prices.", "AI course fees in India"),
  "/scholarships": E("AI Course Scholarships and EMI", "Student and women-in-tech scholarships (Proposed), EMI and an employer sponsorship letter. Prices in rupees, excl. GST. See if you qualify.", "AI course scholarship"),
  "/batches": E("AI Course Batch Dates 2026-27", "Next batches for every AI Flywheel programme, by month, from December 2026. Evenings (IST) and Saturdays. Filter by stage and apply.", "AI course batch dates"),
  "/cohorts": E("How a Cohort-Based AI Course Works", "12 weeks, teams of four to six, one real use case, about 8 hours a week. Gates G1 to G5, then G6 and the Builder award at week 16. See how.", "cohort-based AI course"),
  "/portfolio": E("Your AI Project Portfolio", "The artefacts you build at each level and stage, your level per stage, and a public verify page employers can check. Start building yours.", "AI project portfolio"),
  "/free": E("Free AI Resources and Templates", "The free C1 Foundation course (about 6 hours, English and Tamil), the glossary, a 30-day literacy path, templates and a sample gate log. Start free.", "free AI resources"),
  "/free/30-day-path": E("30-Day AI Learning Plan (Free)", "A free 30-day technical literacy path for AI, one short step a day. Download the plan and start today.", "30-day AI learning plan"),
  "/free/success-definition": E("AI Project Success Metrics Template", "The Success-Definition One-Pager: baseline, target, metric, date and a named owner, written before you build. Free template. Download it.", "AI project success metrics template"),
  "/free/data-readiness": E("Data Readiness Checklist for AI", "Is your data present, clean, connected, relevant, legally allowed and current? A free checklist. Any no means fix the floor first. Get it.", "data readiness checklist for AI"),
  "/free/sample-gate-log": E("AI Project Gate Review Template", "A sample gate log showing what is recorded at each sign-off gate, G1 to G6, on one AI turn. Free to view and copy.", "AI project gate review template"),
  "/framework": E("The AI Flywheel Framework", "Four stages of AI, compounding through DRIVE and governed by CORE, with five levels from C1 to C5. The framework in one page. Read it.", "AI Flywheel framework"),
  "/framework/stages": E("The Four Stages of AI", "Foundation, generative, agentic and physical AI: what each stage is, why it matters and where it fails. Read the stages.", "four stages of AI"),
  "/framework/drive": E("The DRIVE Method for AI Delivery", "Diagnose, Resource, Implement, Validate, Expand: the five-phase method for turning an AI opportunity into value. Read the method.", "DRIVE method"),
  "/framework/core": E("CORE: An AI Governance Framework", "Compliance, Openness, Responsibility and Empowerment: four pillars of AI governance. The weakest pillar sets the trust ceiling. Read CORE.", "CORE governance framework"),
  "/framework/levels": E("AI Competency Framework: C1 to C5", "Five levels, Aware, Practitioner, Builder, Leader and Architect, defined by evidence, for every AI stage. Read the ladder.", "AI competency framework"),
  "/framework/toolkit": E("AI Implementation Toolkit", "The worksheets, checklists and registers behind each DRIVE phase and CORE pillar. See the toolkit.", "AI implementation toolkit"),
  "/glossary": E("AI Glossary: Plain-English Terms", "Plain-English definitions of AI terms, from agent and MCP to kill switch and rights ledger, each sourced to a book chapter. Look up a term.", "AI glossary"),
  "/glossary/agentic-ai": E("What Is Agentic AI? Definition", "Agentic AI is AI built from agents that plan and carry out work. Harder than generative AI and gated by governance. Read the definition.", "what is agentic AI"),
  "/insights": E("AI Implementation Insights", "Short articles on turning AI into value, each tied to a book chapter and a programme. Two a month. Read the latest.", "AI implementation insights"),
  "/books": E("The AI Flywheel Book Series by M. K. Elango", "Six books by M. K. Elango: The AI Flywheel, four Studio Playbooks and The AI Studio Playbook. Together they are the curriculum. See the books.", "The AI Flywheel book"),
  "/research/report": E("State of AI Implementation in India", "An annual report on how organisations in India turn AI into value, measured on the four leaks. First edition in preparation; summary ungated.", "State of AI Implementation report India"),
  "/mission-2047": E("Mission 2047: AI Builders for India", "By India's hundredth year of independence, count people who can build with AI, by level and stage, in every district. Read the mission.", "AI skills for India 2047"),
  "/partners/knowledge": E("Become an AI Trainer: Knowledge Partners", "Teach AI Flywheel programmes: Leader (C4) or above plus train-the-trainer, with a 15 to 25% revenue share (Ed 1.1). Apply to partner.", "become an AI trainer"),
  "/trust/privacy": E("Privacy and the DPDP Act", "How AI Flywheel collects, uses and protects learner data under India's DPDP Act, and how to exercise your rights. Read the notice.", "DPDP Act privacy notice"),
  "/trust/sovereignty": E("Data Sovereignty: Keeping Data in India", "Where AI Flywheel plans to store learner data (AWS Mumbai, Proposed) and why it stays in India. See our data residency commitments.", "data kept in India"),
  "/summit": E("The Inevitable Summit, February 2027", "Week of 8 February 2027: Agentic Studio early access opens and inter-college challenge finals are held. Programme to be announced.", "Inevitable Summit 2027"),
  "/about": E("About AI Flywheel and M. K. Elango", "The AI learning platform that certifies what you can build. A brand of Inevitra Advisory, built on M. K. Elango's framework, in Tamil Nadu.", "about AI Flywheel"),
  "/ta": E("தமிழில் AI பாடங்கள் · AI Course in Tamil", "தமிழிலும் ஆங்கிலத்திலும் நடைமுறை AI பாடங்கள். இலவச C1 பாடத்தில் தொடங்குங்கள். Practical AI courses in Tamil; start free.", "AI course in Tamil"),
};

/**
 * Page metadata from the SEO map, with a fallback for routes outside it.
 * Keeps en-IN / ta-IN alternates where a Tamil twin exists, and fills openGraph so shares match the title.
 */
/** Trim text at a word boundary so meta descriptions stay within what search results show. */
export function clampText(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

export function pageMeta(path: string, fallback?: { title: string; description: string }, extra?: Metadata): Metadata {
  const s = SEO[path] ?? fallback;
  if (!s) return { alternates: enAlternates(path), ...extra };
  const full = `${s.title} · AI Flywheel`;
  return {
    title: path === "/" || path === "/ta" ? { absolute: full } : s.title,
    description: clampText(s.description),
    alternates: enAlternates(path),
    openGraph: { ...BASE_OG, type: "website", url: path, title: full, description: clampText(s.description) },
    ...extra,
  };
}

export const ORG_ID = `${SITE_URL}/#organization`;
export const AUTHOR_ID = `${SITE_URL}/#mk-elango`;

/** M. K. Elango, as described on /about. Referenced by @id from books, insights and the organisation. */
export const AUTHOR = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: "M. K. Elango",
  jobTitle: "Strategist",
  description: "Strategist based in Tamil Nadu. Author of The AI Flywheel and the four Studio Playbooks.",
  url: `${SITE_URL}/about#elango`,
  worksFor: { "@type": "Organization", name: "Inevitra Advisory" },
  homeLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" } },
} as const;

export type QA = { q: string; a: string };

export function faqJsonLd(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
