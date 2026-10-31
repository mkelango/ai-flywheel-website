/**
 * Static site-search index: every page on aiflywheel.in with a title, path, one-line description and section.
 * Built at compile time from the content modules, so new programmes, terms and articles appear automatically.
 */
import { PROGRAMMES, LEVEL_NAMES } from "./programmes";
import { STAGE_PAGES, LEVEL_SLUGS, getLevel, TRACK_PAGE_SLUGS, getTrack } from "./learn";
import { LABS, INDUSTRIES } from "./orgs";
import { TRUST_PAGES } from "./company";
import { TOPICS, INSIGHT_ARTICLES, GLOSSARY } from "./research";
import { GOV_OFFERS } from "./government";

export type SearchEntry = { title: string; path: string; description: string; section: string };

const STATIC: SearchEntry[] = [
  {title: "About", path: "/about", description: "AI Flywheel is the practical AI learning platform that certifies what you can build. A brand of Inevitra Advisory, built on M. K. Elango's framework.", section: "About"},
  {title: "Batch calendar", path: "/batches", description: "Next batches for every AI Flywheel programme, by month. Filter by stage and apply. Cohorts run evenings (IST) and Saturdays.", section: "Learn"},
  {title: "The books", path: "/books", description: "The six-book series by M. K. Elango: The AI Flywheel, four Studio Playbooks and The AI Studio Playbook. Together they are the curriculum.", section: "Framework and research"},
  {title: "Flywheel Check for organisations", path: "/business/check", description: "A capability scan of your people by stage and level, and your lowest CORE pillar, with a scored report and a 90-day plan.", section: "Business"},
  {title: "Enterprises and GCCs", path: "/business/enterprise", description: "Flywheel Check, leadership, workforce licence, 90-Day Flywheel Start and Studio seats. Reporting by level and stage, never enrolments.", section: "Business"},
  {title: "Industries", path: "/business/industries", description: "Nine industries, each with a first AI use case and a recommended track: manufacturing, BFSI, healthcare, retail, telecom, education, energy, real estate and public sector.", section: "Business"},
  {title: "AI Flywheel for Business", path: "/business", description: "Find where your people stand in each AI stage, move them up one level at a time, and ship a real use case while they learn.", section: "Business"},
  {title: "Platform and toolkit", path: "/business/platform", description: "Diagnostic history, 28 digital tools, the Agent Operating Model builder, the CORE governance suite and a maturity benchmark. Sold inside the licence, priced in rupees.", section: "Business"},
  {title: "Startups and MSMEs", path: "/business/startups", description: "Founder's Check: a 60-minute review plus a 90-day plan. Then a founder cohort, or an MSME robotics pilot with the Robotic Lab.", section: "Business"},
  {title: "Campus Labs", path: "/campus-labs", description: "Four Campus Labs, each running its studio: Agentic, Model, Generative and Robotic. Compare what each runs, who it suits and the level students reach. Set-up quoted per campus.", section: "Higher education"},
  {title: "Campus Partnership", path: "/campus-partnership", description: "One annual MoU for courses, faculty, labs, challenges and reporting. Three tiers: Associate, Partner and Centre of Excellence.", section: "Higher education"},
  {title: "Careers", path: "/careers", description: "Work at AI Flywheel. No open roles are listed right now; trainers can apply as Knowledge Partners.", section: "About"},
  {title: "Case studies", path: "/case-studies", description: "Every case study carries a status label: Real, Pilot or Illustrative scenario. We publish what we can prove.", section: "Business"},
  {title: "Exams and recertification", path: "/certifications/exams", description: "How AI Flywheel assesses: an artefact from real work plus one proctored check taken without AI. Evidence for each level, C1 to C5, and yearly recertification.", section: "Learn"},
  {title: "Certifications", path: "/certifications", description: "One credential ladder, C1 Aware to C5 Architect, earned with evidence from real work. Open Badges 3.0, a public verify page, yearly recertification.", section: "Learn"},
  {title: "Hackathons and challenges", path: "/challenges", description: "Inter-college challenges run as one DRIVE turn, with finals at the Inevitable Summit in February. Problem statements come from industry and government.", section: "Higher education"},
  {title: "Flywheel Check", path: "/check", description: "Eight questions, about five minutes. See a suggested level for each AI stage and the programme that fits. Nothing is sent.", section: "Learn"},
  {title: "How a cohort works", path: "/cohorts", description: "The 12-week AI Flywheel cohort: teams of four to six, one real use case, about 8 hours a week, gates G1 to G5 in 12 weeks and G6 with the Builder award at week 16.", section: "Learn"},
  {title: "Contact", path: "/contact", description: "Talk to an AI Flywheel adviser about programmes, campus partnerships, workforce training or government programmes.", section: "About"},
  {title: "Credit courses and minors", path: "/credit-courses", description: "Semester courses mapped to C2 and C3: AI Foundations, Generative AI, Agentic AI Engineering, Models and Data, Physical AI. Syllabus, assessments and teaching kits included.", section: "Higher education"},
  {title: "Faculty Flywheel (FDP)", path: "/faculty", description: "Faculty development to C1, C2 and C3, with a redesigned unit as the capstone. Faculty who reach Builder can teach the credit courses; at Leader (C4), with train-the-trainer, they can become Knowledge Partners.", section: "Higher education"},
  {title: "The AI Flywheel framework", path: "/framework", description: "Four stages, DRIVE as the method, CORE as the governance, and five levels from Aware (C1) to Architect (C5).", section: "Framework and research"},
  {title: "30-day technical literacy path", path: "/free/30-day-path", description: "An hour a day for 30 days: version control, APIs, data, identity and security, infrastructure, quality, operations and cost. From the Agentic Studio Playbook, Table 41.9.", section: "Free resources"},
  {title: "Data-Readiness Checklist", path: "/free/data-readiness", description: "A free six-item checklist: exists, clean, connected, relevant, allowed, fresh. Run it on the exact data your next AI effort needs before you build.", section: "Free resources"},
  {title: "Free resources", path: "/free", description: "Free AI resources: the AI Flywheel Foundation course (C1, about 6 hours, English and Tamil), the glossary, the 30-day technical literacy path, templates and a sample gate log.", section: "Free resources"},
  {title: "Sample gate log, G1 to G6", path: "/free/sample-gate-log", description: "A sample ADLC gate log: the six gates from thesis to go-live, the question each answers, the evidence reviewed and who signs.", section: "Free resources"},
  {title: "Success-Definition One-Pager", path: "/free/success-definition", description: "A free template: write what winning looks like, as a number, before anyone builds. Opportunity, metric, baseline, target, timeframe, measurement, value and owner.", section: "Free resources"},
  {title: "Glossary", path: "/glossary", description: "Plain-language definitions of AI Flywheel terms, from agents and evals to the reset tax, taken from The AI Flywheel and the four Studio Playbooks.", section: "Framework and research"},
  {title: "AI Flywheel for Government", path: "/government", description: "Skill officers by stage and level, train chief AI officers and deliver AI services under clear governance. Report people by level, not enrolments.", section: "Government"},
  {title: "AI Flywheel for Higher Education", path: "/higher-education", description: "Credit courses, faculty programmes and four Campus Labs under one partnership, with evidence of what your students can do by stage and level.", section: "Higher education"},
  {title: "Insights", path: "/insights", description: "Short insights from The AI Flywheel and the four Studio Playbooks, each tied to a chapter and a programme.", section: "Framework and research"},
  {title: "Investors", path: "/investors", description: "Investor relations for AI Flywheel, a brand of Inevitra Advisory. There is no public fundraising on this site.", section: "About"},
  {title: "Mission 2047", path: "/mission-2047", description: "AI Flywheel's purpose: by India's hundredth year of independence, count people who can build with AI, by level and stage, in every district.", section: "About"},
  {title: "Newsroom", path: "/news", description: "AI Flywheel news and press contact. No press releases yet.", section: "About"},
  {title: "Home", path: "/", description: "Learn it. Build it. Prove it. Practical AI programmes certified on what you can build.", section: "Home"},
  {title: "Knowledge Partners", path: "/partners/knowledge", description: "Teach AI Flywheel programmes as a Knowledge Partner: Leader (C4) or above plus train-the-trainer, with a 15 to 25% revenue share (Ed 1.1).", section: "About"},
  {title: "Partner campuses", path: "/partners", description: "Campuses that partner with AI Flywheel. Partner logos appear only with written permission.", section: "Higher education"},
  {title: "Your portfolio", path: "/portfolio", description: "Your AI Flywheel portfolio: the artefacts you build at each level and stage, your level per stage, and a public verify page employers can check.", section: "Learn"},
  {title: "Pricing", path: "/pricing", description: "Rupee price bands for every AI Flywheel programme, excluding GST. EMI, GST invoices, an employer sponsorship letter, and workforce licences for organisations.", section: "Learn"},
  {title: "For Professionals", path: "/professionals", description: "Seven AI career tracks, from a free C1 course to a 12-week cohort. Your next level in AI, proven on real work.", section: "Learn"},
  {title: "Programmes", path: "/programmes", description: "AI programmes from a free C1 course to a 12-week cohort and executive programmes. Filter by stage, level and format. Prices in rupees.", section: "Learn"},
  {title: "State of AI Implementation", path: "/research/report", description: "An annual report on how organisations in India turn AI into value, measured on the four leaks. First edition in preparation; the summary will be ungated.", section: "Framework and research"},
  {title: "Scholarships", path: "/scholarships", description: "Student and women-in-tech scholarships (Proposed), EMI and an employer sponsorship letter for AI Flywheel programmes. Prices in rupees, excluding GST.", section: "Learn"},
  {title: "For students", path: "/students", description: "Start free, build a portfolio, choose a track. Student pricing, campus chapters and inter-college challenges.", section: "Learn"},
  {title: "The Inevitable Summit", path: "/summit", description: "The Inevitable Summit, week of 8 February 2027: Agentic Studio early access opens and the inter-college challenge finals are held. Programme to be announced.", section: "About"},
  {title: "Terms of use", path: "/terms", description: "Terms of use for aiflywheel.in, a brand of Inevitra Advisory: prices, payments, credentials, your work and acceptable use.", section: "About"},
  {title: "Trust centre", path: "/trust", description: "Privacy (DPDP and GDPR), responsible AI, security and data sovereignty at AI Flywheel, in one place.", section: "Trust"},
  {title: "Verify a credential", path: "/verify", description: "Check an AI Flywheel credential by its ID. Open Badges 3.0.", section: "Learn"},
];

export const SEARCH_INDEX: SearchEntry[] = [
  ...STATIC,
  ...PROGRAMMES.map((p) => ({ title: p.title, path: `/programmes/${p.slug}`, description: `${p.level ? `${p.level} ${LEVEL_NAMES[p.level]} · ` : ""}${p.focus}. ${p.outcome}`, section: "Programmes" })),
  ...STAGE_PAGES.map((s) => ({ title: s.name, path: `/programmes/${s.slug}`, description: `${s.tagline}. ${s.line}`, section: "Stages" })),
  ...LEVEL_SLUGS.map((slug) => {
    const l = getLevel(slug)!;
    return { title: `${l.code} ${l.name}`, path: `/programmes/level/${slug}`, description: l.means, section: "Levels" };
  }),
  ...TRACK_PAGE_SLUGS.map((slug) => {
    const t = getTrack(slug)!;
    return { title: `${t.name} track`, path: `/tracks/${slug}`, description: `Roles: ${t.roleList.join(", ")}.`, section: "Tracks" };
  }),
  ...LABS.map((l) => ({ title: l.name, path: `/campus-labs/${l.slug}`, description: `Runs ${l.runs}. Best for ${l.best}.`, section: "Campus Labs" })),
  ...INDUSTRIES.map((i) => ({ title: `AI in ${i.name}`, path: `/business/industries/${i.slug}`, description: i.useCase, section: "Industries" })),
  ...GOV_OFFERS.map((o) => ({ title: o.name, path: `/government/${o.slug}`, description: o.line, section: "Government" })),
  ...TOPICS.map((t) => ({ title: t.label, path: `/framework/${t.slug}`, description: t.description, section: "Framework" })),
  ...INSIGHT_ARTICLES.map((a) => ({ title: a.title, path: `/insights/${a.slug}`, description: a.dek, section: "Insights" })),
  ...GLOSSARY.map((g) => ({ title: g.term, path: `/glossary/${g.slug}`, description: g.short, section: "Glossary" })),
  ...TRUST_PAGES.map((t) => ({ title: t.label, path: `/trust/${t.slug}`, description: t.description, section: "Trust" })),
];

/** Website Strategy 2.0 routing rule: school-intent searches get a "Looking for schools?" card. */
export const SCHOOL_WORDS = ["class", "school", "cbse", "icse", "kids", "child", "teacher"];
