/**
 * Quick answers for hubs and landing pages: answer-first, 35 to 60 words, facts only from the site's own data.
 * Each list renders visibly and as the page's single FAQPage JSON-LD.
 */
import type { QA } from "./seo";

export const ANSWERS: Record<string, { title: string; items: QA[] }> = {
  "/programmes": {
    title: "What people ask about our programmes.",
    items: [
      { q: "Which AI Flywheel programme is right for me?", a: "It depends on your level and stage. New to AI? Start with the free AI Flywheel Foundation (C1). Already use AI at work? Pick a C2 course. Ready to build? Join a 12-week C3 cohort. Leading a portfolio? Look at C4 and C5. The free Flywheel Check suggests one." },
      { q: "How long do AI Flywheel programmes take?", a: "From about 6 hours to 16 weeks. The free C1 course takes about 6 hours, and C2 courses take roughly 8 to 20 hours. C3 cohorts run 12 weeks at about 8 hours a week, with the final gate at week 16. C4 executive cohorts run 8 weeks." },
      { q: "Are AI Flywheel programmes online?", a: "Self-paced courses are online, so you study when it suits you. Cohorts are blended: taught sessions and coaching in IST evenings and on Saturdays, with teams building in AI Flywheel Studio. The Physical AI and Robotics cohort adds lab days for bench tests." },
    ],
  },
  "/professionals": {
    title: "What working professionals ask.",
    items: [
      { q: "Can I take an AI course while working full time?", a: "Yes. The self-paced C1 and C2 courses fit around your job, and cohorts meet in IST evenings and on Saturdays. A 12-week cohort takes about 8 hours a week and is built on one real use case, so the work you do counts twice." },
      { q: "How many hours a week does a cohort need?", a: "About 8 hours a week: roughly 1 hour taught, 1.5 hours of coaching and peer review, and the rest on your team's build. Gates G1 to G5 fall within 12 weeks; G6 and the Builder (C3) award follow at week 16." },
      { q: "Can my employer sponsor the course?", a: "Yes. Every paid programme comes with a ready-made letter asking your employer to sponsor you, and a GST invoice in your name or your employer's. If you pay yourself, EMI is available. All prices are in rupees and exclude GST." },
    ],
  },
  "/higher-education": {
    title: "What colleges ask.",
    items: [
      { q: "How can a college partner with AI Flywheel?", a: "Start with one department. A campus consultation with leadership and IQAC comes first, then a pilot of one credit course and one faculty batch. Next, the college signs one annual MoU for courses, faculty, challenges and reporting, and opens Campus Labs when ready." },
      { q: "What do colleges get from a campus partnership?", a: "One annual MoU covers credit courses mapped to C2 and C3, faculty development to C1, C2 and C3, four Campus Labs (Agentic, Model, Generative and Robotic), inter-college challenges and outcome reporting. Tiers are Associate, Partner and Centre of Excellence (Proposed); fees are quoted per campus." },
      { q: "How are student outcomes reported?", a: "By level and stage, never by enrolments. Reports show how many students and faculty hold each level, C1 to C5, in each AI stage, for accreditation and placement. Every level rests on an artefact from real work and one check taken without AI." },
    ],
  },
  "/business": {
    title: "What companies ask.",
    items: [
      { q: "How do companies start with AI Flywheel?", a: "With the Flywheel Check: a capability scan of your people by AI stage and level that also names your lowest CORE pillar. You get a scored report and a 90-day plan. Leadership, a workforce licence, the 90-Day Flywheel Start and Studio seats follow." },
      { q: "What is the 90-Day Start?", a: "The 90-Day Flywheel Start is a cohort run on your own use case. A team takes one real use case through gates G1 to G6, so people learn while they ship. It is step four of the enterprise path, after the Check, leadership and the licence." },
      { q: "How is corporate AI training priced?", a: "In rupees, excluding GST. The workforce licence costs ₹3,000–12,000 per seat a year (Ed 1.1) and covers courses, assessments and reporting. The leadership programme is quoted per organisation (Proposed). Every invoice includes GST, and reporting is by level and stage." },
    ],
  },
  "/business/enterprise": {
    title: "What enterprises and GCCs ask.",
    items: [
      { q: "How do GCCs upskill teams in agentic AI?", a: "One step at a time, on real work. Start with a Flywheel Check to see people by stage and level, put leaders through the leadership programme, license the workforce for C1 and C2 courses, then run a 90-Day Flywheel Start on one agentic use case." },
      { q: "What does the enterprise path include?", a: "Five steps: the Flywheel Check, a leadership programme, a workforce licence at ₹3,000–12,000 per seat a year (Ed 1.1, excl. GST), the 90-Day Flywheel Start and Studio seats on Agentic Studio. Reporting shows people by level and stage, never enrolments." },
      { q: "Can training be tied to one real use case?", a: "Yes. The 90-Day Flywheel Start is a cohort on your own use case: a team takes it through gates G1 to G6, with success written as a number before the build. People learn by shipping it, not by watching videos." },
    ],
  },
  "/business/startups": {
    title: "What founders ask.",
    items: [
      { q: "How can a small business start using AI?", a: "Pick one use case that pays back, not ten. A Founder's Check reviews your business, data and the one use case worth doing first. You leave with a 90-day plan, then join a founder cohort or run a pilot with the Robotic Lab." },
      { q: "What is the Founder's Check?", a: "The Founder's Check is a 60-minute review with an adviser plus a 90-day plan. It covers your business, your data and the one AI use case worth doing first, with success written as a number, named owners and CORE gates." },
      { q: "Is there a cohort for founders?", a: "Yes. The founder cohort runs one use case as a DRIVE turn with peers: Diagnose, Resource, Implement, Validate, Expand. MSMEs working with machines can instead pilot robotics with the Robotic Lab, simulation first, then the bench." },
    ],
  },
  "/business/check": {
    title: "About the organisation Check.",
    items: [
      { q: "How do I measure my organisation's AI readiness?", a: "Measure people, not tools. The Flywheel Check scans your people by AI stage (Foundation, Generative, Agentic, Physical) and by level, from Aware (C1) to Architect (C5), and names your lowest CORE pillar: the governance gap to close first." },
      { q: "What does the Flywheel Check report include?", a: "Five things: a stage-by-level map of your people, your lowest CORE pillar named, three candidate use cases scored, a recommended first programme for each team, and a 90-day plan. The layout is fixed; it is filled with your data after the Check." },
    ],
  },
  "/check": {
    title: "About the Flywheel Check.",
    items: [
      { q: "How do I know my AI skill level?", a: "Take the Flywheel Check: eight questions in about five minutes. It suggests a level, from Aware (C1) to Architect (C5), for each of the four AI stages. A real level is only earned with an artefact from real work and one check taken without AI." },
      { q: "Which AI course suits my level?", a: "The Check names one programme to start. As a rule, start with the free Foundation course (C1) if you are new, a C2 course if you already use AI at work, and a 12-week C3 cohort if you are ready to build and ship." },
      { q: "Is my data sent anywhere?", a: "No. The Flywheel Check runs in your browser and nothing you enter is sent or stored. Checking a whole team is different: the organisation Flywheel Check is a capability scan with a scored report, booked through a form." },
    ],
  },
  "/government": {
    title: "What departments ask.",
    items: [
      { q: "How can a government department start with AI?", a: "Bring one service to a public-sector use-case clinic, where a team runs one DRIVE turn under CORE gates. In parallel, skill officers through the civil service programme and name a chief AI officer to govern the portfolio. People are reported by level, not enrolments." },
      { q: "Can AI Flywheel be bought through GeM?", a: "GeM is one of three routes, alongside empanelment and an MoU for a multi-year programme. Scope, levels and reporting are written to fit a tender. Ask the government team which routes are open for your department. Prices are in rupees, excl. GST." },
      { q: "Which programmes suit officers?", a: "The civil service programme: C1 Aware in all four AI stages and C3 Builder in CORE governance, in Tamil and English, delivered alongside iGOT Karmayogi. Senior officers who answer for the portfolio take the Chief AI Officer programme, a C5 track." },
    ],
  },
  "/government/chief-ai-officer": {
    title: "About the chief AI officer role.",
    items: [
      { q: "What does a chief AI officer do?", a: "A chief AI officer answers for AI adoption, governance and the portfolio across a department. They work with an AI council that sets decision rights and tier ceilings, a hub that owns the floor and CORE policy, and one census of every model and agent. They never sign a gate on their own team's work." },
      { q: "Is there a chief AI officer course in India?", a: "Yes. The AI Flywheel Chief AI Officer programme is a C5 track for officers who govern a portfolio, not a pilot. It is built on the Foundation Studio Playbook, Chapter 46, and leads to the AI Flywheel Strategist (C5 Architect)." },
      { q: "What does the programme cover?", a: "Five parts: the chief AI officer's role, the AI council, the hub, one census of every model, pipeline, agent and machine with an owner and risk tier, and the Flywheel Handoff Map, which shows which turn feeds which and where a baton dropped." },
    ],
  },
  "/government/civil-service": {
    title: "What officers ask.",
    items: [
      { q: "What AI training is available for government officers?", a: "The civil service programme takes officers to C1 Aware in all four AI stages (Foundation, Generative, Agentic and Physical) and to C3 Builder in CORE governance. It is delivered alongside iGOT Karmayogi, not competing with it, and reports officers by stage and level." },
      { q: "How are officers assessed?", a: "On real work. Each level needs an artefact from the officer's own work plus one proctored check taken without AI. From C3 Builder up, a person holds an oral defence. Credentials are Open Badges 3.0 badges with a public verify page." },
      { q: "Is the training in Tamil?", a: "Yes. The civil service programme is taught and assessed in both Tamil and English, so officers can learn and prove each level in the language they work in. The free C1 Foundation course is also available in Tamil." },
    ],
  },
  "/government/buying": {
    title: "How buying works.",
    items: [
      { q: "Can government buyers procure AI Flywheel on GeM?", a: "GeM listing is one of the routes offered, alongside empanelment on a department's panel and an MoU for a multi-year programme. Ask the government team which routes are open for your department; scope, levels and reporting are written to fit a tender." },
      { q: "What procurement routes are available?", a: "Three routes: buying through the Government e-Marketplace (GeM), empanelment as an approved training provider, and a memorandum of understanding for a multi-year programme. All prices are in rupees and exclude GST, and learner data is planned to stay in India." },
    ],
  },
  "/framework": {
    title: "The framework, answered.",
    items: [
      { q: "What is the AI Flywheel framework?", a: "The AI Flywheel framework, by M. K. Elango, treats AI value as a heavy wheel: hard to start, then self-reinforcing. It has four stages of AI, compounds through the five-phase DRIVE method, is governed by four-pillar CORE, and measures people on five levels, C1 to C5." },
      { q: "What are the four stages of AI?", a: "Foundation AI (data, classical ML and the model layer), Generative AI (AI that produces content), Agentic AI (agents that plan and carry out work) and Physical AI (robotics and embodied systems). Foundation is the floor; it sets the ceiling for every other stage." },
      { q: "How do DRIVE and CORE fit together?", a: "DRIVE is the method at the hub: Diagnose, Resource, Implement, Validate, Expand. CORE is the governance at the rim: Compliance, Openness, Responsibility and Empowerment. Every turn of the wheel runs through DRIVE, and CORE gates decide how far it may go." },
    ],
  },
  "/certifications": {
    title: "About AI Flywheel certificates.",
    items: [
      { q: "Is the AI Flywheel certificate verifiable?", a: "Yes. Every AI Flywheel credential is an Open Badges 3.0 badge with a public verify page. Anyone can enter the credential ID on the Verify page to see the level, the stage and when it was last renewed. Badges use an open standard, so they are never locked to us." },
      { q: "What are the five levels?", a: "C1 Aware, C2 Practitioner, C3 Builder, C4 Leader and C5 Architect. You hold a level separately in each AI stage, so you might be a Builder in Agentic AI and Aware in Physical AI. Each level is defined by the evidence it takes." },
      { q: "How often do I recertify?", a: "Every year. Tools change fast, so each badge shows when it was last renewed. Recertification keeps the evidence current: like the first award, it rests on real work and a check taken without AI rather than on hours attended." },
    ],
  },
  "/pricing": {
    title: "Fees, GST and EMI.",
    items: [
      { q: "How much do AI Flywheel courses cost?", a: "From free to ₹2.5 lakh. The C1 Foundation course is free; C2 courses cost ₹2,999 to ₹14,999 (Proposed); C3 cohorts cost ₹35,000–60,000; C4 cohorts ₹60,000–90,000 (Proposed); and the C5 Strategist ₹1.5–2.5 lakh (Proposed). Each band carries its label: Ed 1.1 or Proposed." },
      { q: "Are prices inclusive of GST?", a: "No. Every AI Flywheel price is in rupees and excludes GST, which is added at checkout. Each payment comes with a GST invoice in your name or your employer's, and EMI is available on every paid programme." },
      { q: "Is EMI available?", a: "Yes. You can pay in monthly instalments on any paid programme. Student and women-in-tech scholarships are proposed and will be confirmed before launch, and a ready-made letter helps you ask your employer to sponsor you." },
    ],
  },
  "/free": {
    title: "Free learning, answered.",
    items: [
      { q: "What can I learn about AI for free?", a: "The whole C1 Foundation course: about 6 hours on the four stages of AI, DRIVE, CORE and where AI fails. Free resources also include the Flywheel Check, the glossary, a 30-day technical literacy path, a Success-Definition One-Pager, a Data-Readiness Checklist and a sample gate log." },
      { q: "Is the free course in Tamil?", a: "Yes. AI Flywheel Foundation (C1) is free in both English and Tamil, self-paced, with no card needed. If you want the C1 Aware credential, the proctored quiz taken without AI is optional and priced at ₹499 (Proposed)." },
    ],
  },
  "/campus-labs": {
    title: "What colleges ask about labs.",
    items: [
      { q: "What does an AI lab for a college include?", a: "Each Campus Lab is a room that runs one AI Flywheel studio, its life cycle and its playbook. The Agentic Lab runs Agentic Studio (ADLC), the Model Lab runs Model Studio (MDLC), the Generative Lab runs Generative Studio (GDLC) and the Robotic Lab adds hardware (RDLC)." },
      { q: "How much does a Campus Lab cost?", a: "Set-up is quoted per campus, because rooms, departments and hardware differ; the Robotic Lab adds robot hardware to its studio. Labs sit inside the annual Campus Partnership MoU, and all prices are in rupees, excluding GST." },
      { q: "Which lab suits our departments?", a: "Agentic suits CS, IT, MCA and management. Model suits data science and AI. Generative suits media, design, journalism, commerce and marketing. Robotic suits mechanical, ECE and mechatronics, plus ITIs and polytechnics. Agentic opens in February 2027; the others in FY28." },
    ],
  },
  "/faculty": {
    title: "What faculty ask.",
    items: [
      { q: "What is a faculty development programme in AI?", a: "The Faculty Flywheel is AI Flywheel's faculty development programme (FDP). It takes faculty to C1 Aware, C2 Practitioner and C3 Builder, and the capstone is a unit they already teach, redesigned with gate records and an oral defence." },
      { q: "Can faculty teach the credit courses?", a: "Yes, once they reach Builder (C3) in a stage, faculty can teach the credit course in that stage. With Leader (C4) and train-the-trainer they can go on to become Knowledge Partners, co-teaching cohorts and contributing to the kits." },
      { q: "What is the capstone?", a: "A unit the faculty member already teaches, redesigned with AI as one real turn. It is recorded with gate records and defended orally, and it earns Builder (C3). Batches run on campus for one department or as open batches across colleges." },
    ],
  },
  "/students": {
    title: "What students ask.",
    items: [
      { q: "Is there student pricing?", a: "A student price on one C3 cohort is proposed as a student scholarship, for students and freshers, and will be confirmed before launch. The C1 Foundation course is free for everyone, in English or Tamil, with no card needed." },
      { q: "How do campus chapters work?", a: "A campus chapter brings students on one campus onto the same path: start free at C1, build a portfolio, then choose a track. Ask us to start one through the higher-education contact form; colleges can also join through a Campus Partnership." },
      { q: "How should a college student start learning AI?", a: "Start with the free AI Flywheel Foundation (C1), about 6 hours. Then build a portfolio, because every turn leaves an artefact you can link to, and choose one track to reach Builder (C3). Recruiters see what you shipped, not just a certificate." },
    ],
  },
  "/cohorts": {
    title: "How cohorts work.",
    items: [
      { q: "How does a 12-week cohort work?", a: "A mixed-role team of four to six ships one real use case over 12 weeks, gate by gate. You spend about 8 hours a week: about 1 taught, 1.5 on coaching and peer review, and the rest on the build. Sessions run in IST evenings and on Saturdays." },
      { q: "What are gates G1 to G6?", a: "Gates are signed decisions with linked evidence, not meetings. G1 comes in week 3, once the data is ready; G2, G3 and G4 follow in weeks 5, 7 and 9; G5 closes week 12. G6, the final gate, comes at week 16, when Builder (C3) is awarded." },
    ],
  },
  "/scholarships": {
    title: "Help paying, answered.",
    items: [
      { q: "Are there scholarships for AI courses?", a: "Two are proposed: a student scholarship giving a student price on one C3 cohort, and a women-in-tech scholarship for women working in, or returning to, technical roles. Eligibility is in draft and both will be confirmed before launch." },
      { q: "Can my employer pay?", a: "Yes. A ready-made letter asks your employer to sponsor you, and every payment comes with a GST invoice in your name or your employer's. If you pay yourself, EMI spreads any paid programme into monthly instalments. Prices are in rupees, excl. GST." },
    ],
  },
  "/batches": {
    title: "About batch dates.",
    items: [
      { q: "When does the next AI Flywheel batch start?", a: "The free C1 Foundation course and the workforce licence launch in December 2026. C2 courses start in January and February 2027, and the Agentic AI Engineer cohort in February 2027. Other C3, C4 and C5 programmes follow in FY28." },
      { q: "Do cohorts run on weekends?", a: "Yes. Cohorts run in IST evenings and on Saturdays, so working professionals can join. A 12-week cohort takes about 8 hours a week, and self-paced courses can be taken at any time. Each programme page shows its next batch." },
    ],
  },
  "/about": {
    title: "About the company.",
    items: [
      { q: "Who is behind AI Flywheel?", a: "AI Flywheel is a brand of Inevitra Advisory, built on the AI Flywheel framework by M. K. Elango, a strategist based in Tamil Nadu. He is the author of The AI Flywheel and the four Studio Playbooks, which together form the curriculum." },
      { q: "Where is AI Flywheel based?", a: "In Tamil Nadu, India. Programmes run in English and Tamil, prices are in rupees and exclude GST, and learner data is planned to stay in India. Government buyers get formats suited to tenders, and the free course is in both languages." },
    ],
  },
  "/books": {
    title: "About the books.",
    items: [
      { q: "Who wrote The AI Flywheel?", a: "M. K. Elango, a strategist based in Tamil Nadu, wrote The AI Flywheel. He also wrote the four Studio Playbooks, for Foundation, Generative, Agentic and Robotic work, and The AI Studio Playbook. Every AI Flywheel programme names the chapter it teaches." },
      { q: "How many books are in the series?", a: "Six: The AI Flywheel, The Foundation Studio Playbook, The Generative Studio Playbook, The Agentic Studio Playbook, The Robotic Studio Playbook and The AI Studio Playbook. The four Studio Playbooks together run to about 2,250 pages of method." },
    ],
  },
  "/summit": {
    title: "About the Summit.",
    items: [
      { q: "When is the Inevitable Summit?", a: "The Inevitable Summit is held in the week of 8 February 2027. Sessions, speakers and the venue will be published on this page first. You can register interest now through the contact page, and we will tell you when details are out." },
      { q: "What happens at the Summit?", a: "Two things are confirmed: Agentic Studio early access opens, and the finals of the inter-college AI challenges are held, where finalist teams present their DRIVE turn. The rest of the programme is to be announced." },
    ],
  },
  "/glossary": {
    title: "Common AI terms, answered.",
    items: [
      { q: "What is agentic AI?", a: "Agentic AI is the third stage of AI: systems built from agents that plan and carry out work, using tools in a loop. It is harder and slower than generative AI and gated by governance, which is what makes it defensible (The AI Flywheel, Ch 6)." },
      { q: "What is MCP?", a: "MCP, the Model Context Protocol, is an open standard for how AI systems connect to tools and data. Use MCP for tools and A2A for peer agents; together they are often called the HTTP of agents (The AI Flywheel, Ch 6)." },
      { q: "What is a kill switch for AI agents?", a: "A kill switch is a tested, pre-approved way to stop an agent quickly. If it has never been tested, it is folklore, not a control. Every row in the Agent Accountability Register records whether it was tested (The AI Flywheel, Ch 17)." },
    ],
  },
  "/case-studies": {
    title: "About our labels.",
    items: [
      { q: "Are these case studies real?", a: "Read the label on each one. Real means a live system, published with the client's written permission. Pilot means a bounded trial whose results are not yet final. At launch, every story here is an Illustrative scenario: how a turn could run, not a client." },
      { q: "What does Illustrative scenario mean?", a: "An Illustrative scenario shows how one AI turn could run in a sector, step by step. It is not a client and carries no results. We never use composite testimonials, and we replace scenarios with real cases only when a client agrees in writing." },
    ],
  },
  "/credit-courses": {
    title: "What boards of studies ask.",
    items: [
      { q: "Can AI Flywheel courses carry academic credit?", a: "Yes. Five semester courses, mapped to Practitioner (C2) and Builder (C3), come with a unit plan your board of studies can adopt. The credit value is set by your board, not by us. They can run as single courses or build up to a minor." },
      { q: "What is in the teaching kit?", a: "Slides, lab sheets and studio exercises for each unit, alongside the syllabus and the assessments: quizzes taken without AI, logged use cases and gate records. Faculty who reach Builder (C3) in a stage can teach its course." },
    ],
  },
  "/framework/stages": {
    title: "The stages, answered.",
    items: [
      { q: "What are the four stages of AI?", a: "Foundation AI (data, classical ML, analytics and models), Generative AI (AI that produces content), Agentic AI (agents that plan and carry out work) and Physical AI (robotics and embodied systems). They are a sequence that compounds, not a menu: each stage produces the fuel for the next." },
      { q: "Which stage should a company start with?", a: "Foundation, because the floor sets the ceiling. Unready data is the number-one cause of AI failure, so run the Data-Readiness Checklist on the slice your first use case needs. Most teams then prove one generative or agentic turn before they scale." },
    ],
  },
  "/framework/drive": {
    title: "DRIVE, answered.",
    items: [
      { q: "What is the DRIVE method?", a: "DRIVE is the AI Flywheel's five-phase method for turning an AI opportunity into value: Diagnose, Resource, Implement, Validate, Expand. It is a cycle, not a line, and every stage's life cycle (MDLC, GDLC, ADLC, RDLC) runs inside it (The AI Flywheel, Ch 3)." },
      { q: "What are the five DRIVE phases?", a: "Diagnose picks the right opportunity, checks the data and writes success first. Resource sets a small, right team and a neutral architecture. Implement redesigns the workflow to production grade. Validate measures honestly. Expand standardises the win and feeds the next turn." },
    ],
  },
  "/framework/core": {
    title: "CORE, answered.",
    items: [
      { q: "What does CORE stand for?", a: "Compliance and Fairness, Openness and Transparency, Responsibility and Safety, and Empowerment and Human Agency. CORE is the four-pillar governance discipline at the rim of the AI Flywheel, and it runs across all four stages of AI (The AI Flywheel, Ch 14)." },
      { q: "What is the trust ceiling?", a: "The trust ceiling is the height of value and autonomy at which an organisation will, and may, deploy AI. The weakest CORE pillar sets it: weak governance keeps it low, mature governance raises it. Governance is the unlock, not the brake." },
    ],
  },
  "/framework/levels": {
    title: "The levels, answered.",
    items: [
      { q: "What are the five AI Flywheel levels?", a: "C1 Aware, C2 Practitioner, C3 Builder, C4 Leader and C5 Architect. Each is defined by the evidence it takes, from a scenario quiz taken without AI at C1 to a Handoff Map and teaching a cohort at C5, and each is held separately in every stage." },
      { q: "How are levels different from courses?", a: "A course is how you learn; a level is what you can prove. Several programmes can lead to the same level, and a level is only awarded on an artefact from real work plus one check taken without AI, never on hours attended." },
    ],
  },
  "/trust/privacy": {
    title: "Your data, answered.",
    items: [
      { q: "How does AI Flywheel handle my data under the DPDP Act?", a: "The site is built for India's Digital Personal Data Protection Act, 2023. Forms ask only for what the next step needs, consent is recorded with a timestamp, and you can access, correct or erase your data, or withdraw consent, through the contact page." },
    ],
  },
  "/campus-partnership": {
    title: "About the MoU.",
    items: [
      { q: "What are the partnership tiers?", a: "Three tiers, all Proposed: Associate (one credit course, one faculty batch to C1, annual reporting), Partner (up to a minor, one lab, a campus challenge round) and Centre of Excellence (a full minor, two or more labs, a live dashboard). Fees are quoted per campus." },
      { q: "What does one MoU cover?", a: "Courses, faculty development, Campus Labs, challenges and outcome reporting, renewed once a year. Students and faculty are reported by level and stage for accreditation and placement, never by enrolments. Partner campuses are named only with written permission." },
    ],
  },
};

/** The keyword line shown under each programme's H1 (one primary keyword per URL). */
export const PROGRAMME_KEYWORD: Record<string, string> = {
  foundation: "Free AI course with certificate",
  "generative-ai-practitioner": "Generative AI course for professionals",
  "working-with-ai-agents": "AI agents course with certificate",
  "core-for-every-team": "Responsible AI course for employees",
  "ai-for-managers": "AI course for managers",
  "agentic-ai-engineer": "Agentic AI course in India",
  "generative-ai-engineer": "Generative AI engineering course",
  "model-engineer": "AI model engineering course",
  "physical-ai-robotics-engineer": "Physical AI and robotics course",
  "drive-implementer": "AI implementation certification",
  "core-governance-lead": "AI governance certification in India",
  "ai-flywheel-strategist": "AI strategy certification",
  "leadership-programme": "AI leadership programme for executives",
  "workforce-licence": "AI training for employees, per seat",
};

/** "Do I need to code?" answers, from each programme's who-for and prerequisites. */
export const CODING: Record<string, string> = {
  foundation: "No. Coding is not needed: the course explains the four stages of AI, DRIVE, CORE and where AI fails, and it has no prerequisites. It is built for anyone starting out, including students, professionals, managers and government officers.",
  "generative-ai-practitioner": "No. Coding is not a prerequisite: you use generative AI tools in your own daily work and check every output, after AI Flywheel Foundation (C1) or equivalent. If you want to build pipelines others use, look at Generative AI Engineer (C3).",
  "working-with-ai-agents": "No. Coding is not a prerequisite: you learn to delegate bounded work to an agent, read its trace and escalate. It suits developers, product people and managers who will work beside agents, after the C1 Foundation course or equivalent.",
  "core-for-every-team": "No. The course is about applying a risk tier to your own AI use and reporting an incident, so there is nothing to code. It suits every team member who uses AI at work, plus risk, legal and HR staff.",
  "ai-for-managers": "No. It is built for managers and non-technical professionals who lead teams, after the C1 Foundation course or equivalent. You learn to lead a team that uses AI safely, with success written as a number, not to write code.",
  "agentic-ai-engineer": "Yes, a little. You need Git and API basics, or to have finished the free 30-day technical literacy path. In the cohort, agents do much of the building while you write specs, run evals and review the work. Not ready? Start with Working with AI Agents (C2).",
  "generative-ai-engineer": "Not necessarily. The entry bar is a C2 course in the same stage, or equivalent work experience, and the cohort is built for engineers and technical creatives in media, marketing and commerce. A five-question readiness check comes before you apply.",
  "model-engineer": "Yes. It is a technical cohort for data scientists and ML and data engineers. You need a C2 course in the same stage, or equivalent work experience, and a five-question readiness check comes before you apply.",
  "physical-ai-robotics-engineer": "Not necessarily. The entry bar is a C2 course in the same stage, or equivalent work experience, and the cohort is built for mechanical, ECE and mechatronics engineers and ITI and polytechnic graduates. A five-question readiness check comes before you apply.",
  "drive-implementer": "No. It is an executive cohort for engineering leads, product heads and transformation owners who run a portfolio of AI turns. You need Builder (C3) in any stage, or an equivalent delivery record, rather than coding skills.",
  "core-governance-lead": "No. It is for risk, legal, compliance, audit and HR leaders, after CORE for Every Team (C2) or equivalent experience. The work is governance: Quick Scans, an Accountability Register, autonomy levels, audits and DPDP duties.",
  "ai-flywheel-strategist": "No. It is for chief AI officers, CTOs, CDOs and senior government officers who design the system every AI stage stands on. You need Leader (C4) in DRIVE or CORE, or a panel interview, rather than coding skills.",
  "leadership-programme": "No. It is for boards, CXOs and department heads, with no prerequisites. Over two days and a 90-day follow-up, it gives the executive team C1 across the wheel and a path to C4 in DRIVE and CORE.",
  "workforce-licence": "No. Seats give every employee self-paced C1 and C2 courses and assessments with no prerequisites, plus reporting by level and stage. Builder teams that will code can add optional Studio seats.",
};

/** Extra programme questions from the keyword map, asked after the six standard ones. */
export const PROGRAMME_EXTRA: Record<string, QA[]> = {
  "agentic-ai-engineer": [
    { q: "What is an agentic AI course?", a: "An agentic AI course teaches you to build agents: AI systems that take a goal and act on it, using tools in a loop. In Agentic AI Engineer you ship one production agent through the ADLC, with evals, a tested kill switch and gates G1 to G6." },
  ],
  "core-governance-lead": [
    { q: "How does the DPDP Act affect AI projects?", a: "India's Digital Personal Data Protection Act, 2023 applies whenever an AI project processes digital personal data. You need consent or another lawful basis, a clear purpose, reasonable security safeguards and a way for people to use their rights. This programme maps those duties to real systems." },
  ],
  "working-with-ai-agents": [
    { q: "How do I read an agent trace?", a: "A trace is the record of what an agent did: each step it planned, each tool it called and each result it saw. Reading it lets you check the work and decide whether to accept, correct or escalate. This course practises that on bounded tasks." },
  ],
};

/** Stage pages (/programmes/<stage>): the H1 keyword line and two quick answers each. */
export const STAGE_ANSWERS: Record<string, { keyword: string; items: QA[] }> = {
  "foundation-ai": {
    keyword: "Data and machine learning courses",
    items: [
      { q: "What is foundation AI?", a: "Foundation AI is the first stage of AI: data, classical machine learning, analytics and the model layer. It is the floor of the wheel, and it decides the ceiling for every stage built on top of it, from generative AI to agents and robots." },
      { q: "Why does data readiness come first?", a: "Because unready data is the number-one cause of AI failure. Before any build, check that the data is present, clean, connected, relevant, legally allowed and current. Any no on that gate means fix the floor first; the free Data-Readiness Checklist walks you through it." },
    ],
  },
  generative: {
    keyword: "Generative AI learning path, C1 to C5",
    items: [
      { q: "What should I learn after a generative AI basics course?", a: "Use it in real work. After the free C1 Foundation, Generative AI Practitioner (C2) has you draft with AI daily, check every output and log what failed. Builders then take Generative AI Engineer (C3) and ship one pipeline through the GDLC with a rights ledger." },
      { q: "Which generative AI course is for me?", a: "Choose by what you will do. If you write, design or market and want AI in your daily work, take Generative AI Practitioner (C2). If you are an engineer or technical creative building pipelines others use, take the 12-week Generative AI Engineer (C3) cohort." },
    ],
  },
  agentic: {
    keyword: "Agentic AI learning path, C1 to C5",
    items: [
      { q: "How do I learn agentic AI step by step?", a: "In three steps. Start with the free C1 Foundation to learn what agents are and the rule of no owner, no agent. Then take Working with AI Agents (C2) to delegate tasks and read traces. Then ship a production agent in the 12-week Agentic AI Engineer (C3) cohort." },
      { q: "Do I need to code to learn agentic AI?", a: "Not to start. C1 and Working with AI Agents (C2) need no coding and suit developers, product people and managers alike. The Agentic AI Engineer (C3) cohort asks for Git and API basics, or the free 30-day technical literacy path, before you apply." },
    ],
  },
  physical: {
    keyword: "Physical AI and robotics learning path",
    items: [
      { q: "What is the fourth stage of AI?", a: "Physical AI: AI that leaves the screen, in robotics, autonomous vehicles and embodied systems. It is the industrial frontier and the deepest moat, because you cannot rent a body. Skills are taught in simulation first, then proven on the bench." },
      { q: "How do I start in robotics and physical AI?", a: "Start free with the C1 Foundation course, which covers all four stages. Then join the Physical AI and Robotics Engineer (C3) cohort: 12 weeks plus lab days, taking one robot cell from simulation to bench test through the RDLC, built in the Robotic Studio." },
    ],
  },
  core: {
    keyword: "CORE governance courses, C2 to C4",
    items: [
      { q: "Which AI governance course should I take first?", a: "CORE for Every Team (C2): self-paced, about 8 hours, at ₹2,999 (Proposed, excl. GST). You learn to apply a risk tier to your own AI use and report an incident. Risk, legal, compliance and audit leaders then take CORE Governance Lead (C4)." },
      { q: "What are the four CORE pillars?", a: "Compliance and Fairness, Openness and Transparency, Responsibility and Safety, and Empowerment and Human Agency. Together they form the governance at the rim of the wheel. The weakest pillar sets the trust ceiling: how far an organisation will, and may, deploy AI." },
    ],
  },
  drive: {
    keyword: "DRIVE method courses: strategy and delivery",
    items: [
      { q: "Where can I learn the DRIVE method?", a: "Start free: the C1 Foundation course explains DRIVE (Diagnose, Resource, Implement, Validate, Expand) and has you write one success measure. AI for Managers (C2) applies it to your team, DRIVE Implementer (C4) runs a portfolio, and the AI Flywheel Strategist (C5) designs the system." },
      { q: "Which DRIVE course fits a manager?", a: "AI for Managers (C2): a 4-week cohort-lite course at about 3 hours a week, ₹9,999–14,999 (Proposed, excl. GST). You learn to lead a team that uses AI safely, with success written as a number. Engineering leads and product heads move on to DRIVE Implementer (C4)." },
    ],
  },
};
