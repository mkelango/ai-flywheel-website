/** About-section content: Mission 2047, partners, trust centre, investors, careers, news, terms. */

export type TrustSlug = "privacy" | "responsible-ai" | "security" | "sovereignty";

type Status = "Real" | "Pilot" | "Proposed" | "Ed 1.1";

export type TrustPage = {
  slug: TrustSlug;
  label: string;
  title: string;
  intro: string;
  description: string;
  points: { t: string; d: string; status?: Status }[];
};

export const TRUST_PAGES: TrustPage[] = [
  {
    slug: "privacy",
    label: "Privacy (DPDP / GDPR)",
    title: "Privacy: ask only for what the next step needs.",
    intro: "Built for India's Digital Personal Data Protection Act, 2023, and the GDPR for learners outside India.",
    description: "How AI Flywheel handles personal data under the DPDP Act 2023 and the GDPR: minimal forms, recorded consent, India data residency and your rights.",
    points: [
      { t: "Minimal forms", d: "Every form asks only for what the next step needs. Nothing more." },
      { t: "Recorded consent", d: "Consent is stored with a timestamp and travels with your record to our CRM." },
      { t: "Analytics with consent", d: "Product analytics on aiflywheel.in run only after you agree in the consent banner. Session recording is off by default.", status: "Proposed" },
      { t: "Your rights", d: "Access, correct or erase your data, or withdraw consent, through the contact page. One reply, from one person." },
      { t: "Processor terms", d: "Organisations that buy seats get DPDP processor terms with their licence.", status: "Proposed" },
      { t: "Children", d: "Children's learning runs on AI Flywheel at Schools, under stricter rules. This site is for adults." },
    ],
  },
  {
    slug: "responsible-ai",
    label: "Responsible AI",
    title: "Responsible AI: we run CORE on ourselves.",
    intro: "The governance we teach is the governance we use. Never a claim without evidence.",
    description: "How AI Flywheel applies CORE governance to its own platform, assessments and marketing: disclosure, human review and honest claims.",
    points: [
      { t: "Say what is AI", d: "Where AI drafts, grades or suggests, the page says so." },
      { t: "Humans grade levels", d: "From Builder (C3) up, an oral defence is held by a person. Every level includes one check taken without AI." },
      { t: "Honest claims", d: "Every story is labelled Real, Pilot or Illustrative scenario. No composite testimonials." },
      { t: "Honest framework", d: "The C1 to C5 framework is proposed and not yet externally validated. It is based on, not aligned to, UNESCO and SFIA." },
      { t: "Named owners", d: "Every AI feature on the platform has a named owner and a tested way to switch it off.", status: "Proposed" },
      { t: "Dated tool facts", d: "Tools change fast. Course pages date tool facts, as of October 2026, and refresh them each quarter." },
    ],
  },
  {
    slug: "security",
    label: "Security",
    title: "Security: one login, a full audit trail.",
    intro: "What organisations ask first, answered in one place.",
    description: "AI Flywheel security: single sign-on, audit log, India hosting on AWS Mumbai, role-based access and payment handling.",
    points: [
      { t: "Single sign-on", d: "One OIDC login across the platform and Studio. Enterprise SSO for organisations.", status: "Proposed" },
      { t: "Audit log", d: "Admin and assessment actions are logged and exportable for your auditors.", status: "Proposed" },
      { t: "Hosting", d: "AWS Mumbai region, with India data residency.", status: "Proposed" },
      { t: "Payments", d: "Handled by Razorpay. We never see or store card details." },
      { t: "Least privilege", d: "Staff access is role-based and reviewed. Learner work is visible only to you, your assessors and, if you choose, your employer." },
      { t: "Report a problem", d: "Found a vulnerability? Tell us through the contact page and we will reply." },
    ],
  },
  {
    slug: "sovereignty",
    label: "Sovereignty",
    title: "Sovereignty: your data keeps its home in India.",
    intro: "Data has a legal home. Ours is India.",
    description: "AI Flywheel data sovereignty: India data residency on AWS Mumbai, an India-region CRM and the rules for cross-border processing.",
    points: [
      { t: "India data residency", d: "Learner, portfolio and assessment data are stored in AWS Mumbai.", status: "Proposed" },
      { t: "India-region CRM", d: "Enquiries go to a CRM in an India data centre.", status: "Proposed" },
      { t: "Government buyers", d: "Formats suited to tenders, and data kept in India by design." },
      { t: "Portable credentials", d: "Badges use the open Open Badges 3.0 standard, so your proof is never locked to us." },
      { t: "Own the road", d: "We follow our own rule: the models are rented, the data is owned." },
    ],
  },
];

export function getTrustPage(slug: string) {
  return TRUST_PAGES.find((p) => p.slug === slug);
}

export const MISSION = {
  pillars: [
    { t: "Count builders", d: "The public count is people by level and stage, not enrolments." },
    { t: "Every district", d: "Tamil and English, rupee prices, delivery that reaches beyond the metros." },
    { t: "From school to state", d: "Schools on AI Flywheel at Schools; colleges, professionals and government here." },
    { t: "Non-partisan", d: "We name programmes and departments, never people or parties." },
  ],
  count: [
    { stage: "Foundation", color: "#3B4BA8" },
    { stage: "Generative", color: "#B8306F" },
    { stage: "Agentic", color: "#D98B0B" },
    { stage: "Physical", color: "#13827F" },
  ],
};

export const KNOWLEDGE_PARTNER = {
  requirements: [
    { t: "Leader (C4) or above", d: "In the stage you will teach, earned on evidence like every other level." },
    { t: "Train-the-trainer", d: "Complete the programme and co-teach one cohort with our team." },
    { t: "Teach the method", d: "DRIVE, CORE and the life cycle, from the books, not your own slides alone." },
  ],
  offer: [
    { t: "15 to 25% revenue share", d: "On the cohorts you lead.", status: "Ed 1.1" as const },
    { t: "Listed on our site", d: "A partner profile, linked from the programmes you teach." },
    { t: "Course materials", d: "Syllabus, gate templates and assessment rubrics." },
  ],
};

export const CAREERS = {
  values: [
    { t: "Proof over promise", d: "We ship real work and label every claim." },
    { t: "Method over tools", d: "We teach what outlasts this year's model." },
    { t: "Built in Tamil Nadu", d: "Tamil and English, for learners across India." },
  ],
};

export const TERMS = [
  { t: "Who we are", d: "AI Flywheel is a brand of Inevitra Advisory." },
  { t: "Prices", d: "Prices are in rupees and exclude GST. Prices marked Proposed may change before launch." },
  { t: "Payments and refunds", d: "Payments run through Razorpay with a GST invoice. Refund terms are stated on each programme page before you pay." },
  { t: "Credentials", d: "Levels are awarded on evidence. We may withdraw a credential earned through misconduct." },
  { t: "Your work", d: "You keep the rights to the work you build. You let us assess it and, if you choose, show it on your public portfolio." },
  { t: "Acceptable use", d: "No misuse of the platform, other learners' work or the AI tools inside it." },
  { t: "Privacy", d: "How we handle personal data is set out in the Trust centre." },
];
