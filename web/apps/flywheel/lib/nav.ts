import type { NavItem, HeaderCta } from "@flywheel/ui/components/SiteHeader";
import type { FooterColumn } from "@flywheel/ui/components/SiteFooter";
import { siteHref } from "@flywheel/ui/sites";

/** Main menu: six items, Programmes first (Website Strategy 2.0, pp. 16–17). */
export const NAV: NavItem[] = [
  {
    label: "Programmes",
    href: "/programmes",
    columns: [
      {
        title: "By stage",
        links: [
          { label: "Foundation AI", desc: "Models and data · Model Studio", href: "/programmes/foundation-ai", color: "#3B4BA8" },
          { label: "Generative AI", desc: "Generative Studio", href: "/programmes/generative", color: "#B8306F" },
          { label: "Agentic AI", desc: "Agentic Studio", href: "/programmes/agentic", color: "#D98B0B" },
          { label: "Physical AI and robotics", desc: "Robotic Studio", href: "/programmes/physical", color: "#13827F" },
          { label: "CORE: governance and risk", href: "/programmes/core" },
          { label: "DRIVE: strategy and delivery", href: "/programmes/drive" },
        ],
      },
      {
        title: "By level",
        links: [
          { label: "C1 Aware", desc: "Start free", href: "/programmes/level/c1" },
          { label: "C2 Practitioner", desc: "Use AI well", href: "/programmes/level/c2" },
          { label: "C3 Builder", desc: "Ship one real turn", href: "/programmes/level/c3" },
          { label: "C4 Leader", desc: "Run a portfolio", href: "/programmes/level/c4" },
          { label: "C5 Architect", desc: "Design the system", href: "/programmes/level/c5" },
        ],
      },
      {
        title: "By format",
        links: [
          { label: "Self-paced courses", href: "/programmes?format=Self-paced" },
          { label: "12-week cohorts", href: "/programmes?format=Cohort" },
          { label: "Executive programmes", href: "/programmes?format=Executive" },
          { label: "Credit courses (for colleges)", href: "/credit-courses" },
          { label: "Workshops and bootcamps", href: "/programmes?format=For+organisations" },
          { label: "In Tamil", href: "/programmes?q=Tamil" },
        ],
      },
      {
        title: "Plan",
        links: [
          { label: "Certifications and exams", href: "/certifications" },
          { label: "Batch calendar", href: "/batches" },
          { label: "Pricing and scholarships", href: "/pricing" },
          { label: "Not sure? Take the Flywheel Check", href: "/check" },
        ],
      },
    ],
    featured: {
      eyebrow: "Flagship · C3 · Feb 2027",
      title: "Agentic AI Engineer",
      text: "Twelve weeks. One real use case. Gates G1 to G6.",
      href: "/programmes/agentic-ai-engineer",
      cta: "See the next batch",
    },
  },
  {
    label: "Higher Education",
    href: "/higher-education",
    columns: [
      {
        title: "For institutions",
        links: [
          { label: "Campus Partnership (MoU)", href: "/campus-partnership" },
          { label: "Credit courses and minors", href: "/credit-courses" },
          { label: "Faculty Flywheel (FDP)", href: "/faculty" },
          { label: "Hackathons and challenges", href: "/challenges" },
          { label: "How a partnership runs", href: "/campus-partnership" },
        ],
      },
      {
        title: "Campus Labs",
        links: [
          { label: "Agentic Lab", href: "/campus-labs/agentic", color: "#D98B0B" },
          { label: "Model Lab", href: "/campus-labs/model", color: "#3B4BA8" },
          { label: "Generative Lab", href: "/campus-labs/generative", color: "#B8306F" },
          { label: "Robotic Lab", href: "/campus-labs/robotic", color: "#13827F" },
          { label: "Compare labs", href: "/campus-labs" },
        ],
      },
      {
        title: "For students",
        links: [
          { label: "Start free (C1)", href: "/programmes/foundation" },
          { label: "Student pricing", href: "/students" },
          { label: "Build your portfolio", href: "/portfolio" },
          { label: "Book a campus consultation", href: "/contact?tag=higher-ed" },
        ],
      },
    ],
    featured: {
      eyebrow: "For universities, colleges, ITIs",
      title: "Campus Partnership",
      text: "Credit courses, faculty programmes and labs, under one MoU.",
      href: "/campus-partnership",
      cta: "See how it works",
    },
  },
  {
    label: "Professionals",
    href: "/professionals",
    columns: [
      {
        title: "Career tracks",
        links: [
          { label: "Developers and engineers", href: "/tracks/developers" },
          { label: "Data and ML", href: "/tracks/data-ml" },
          { label: "Product and business", href: "/tracks/product" },
          { label: "Marketing, media and design", href: "/tracks/marketing" },
          { label: "Risk, legal, compliance and HR", href: "/tracks/risk" },
          { label: "Manufacturing and engineering", href: "/tracks/manufacturing" },
          { label: "Students and freshers", href: "/tracks/students" },
        ],
      },
      {
        title: "Learn",
        links: [
          { label: "Cohorts", href: "/cohorts" },
          { label: "Self-paced courses", href: "/programmes?format=Self-paced" },
          { label: "Certifications and exams", href: "/certifications" },
          { label: "Recertification", href: "/certifications/exams" },
        ],
      },
      {
        title: "Prove",
        links: [
          { label: "Your portfolio", href: "/portfolio" },
          { label: "Verify a credential", href: "/verify" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Free resources", href: "/free" },
        ],
      },
    ],
    featured: {
      eyebrow: "Three questions",
      title: "Find my track",
      text: "Pick your role. We'll show where to start and what you'll build.",
      href: "/professionals#find-my-track",
      cta: "Take the quiz",
    },
  },
  {
    label: "Business & Government",
    href: "/business",
    columns: [
      {
        title: "Enterprises and GCCs",
        links: [
          { label: "Flywheel Check (capability scan)", href: "/business/check" },
          { label: "Leadership programme", href: "/programmes/leadership-programme" },
          { label: "Workforce licence", href: "/programmes/workforce-licence" },
          { label: "90-Day Flywheel Start", href: "/business/enterprise" },
          { label: "Studio seats for teams", href: siteHref("studio", "/") },
        ],
      },
      {
        title: "Startups and MSMEs",
        links: [
          { label: "Founder's Check", href: "/business/startups" },
          { label: "Founder cohort", href: "/business/startups" },
          { label: "MSME pilots", href: "/business/startups" },
        ],
      },
      {
        title: "Government",
        links: [
          { label: "Civil service programme", href: "/government/civil-service" },
          { label: "Chief AI Officer programme", href: "/government/chief-ai-officer" },
          { label: "Public-sector use-case clinic", href: "/government/use-case-clinic" },
          { label: "The Economy Program", href: "/government/economy-program" },
          { label: "Buy through GeM", href: "/government/buying" },
        ],
      },
      {
        title: "Proof and tools",
        links: [
          { label: "Industries (9)", href: "/business/industries" },
          { label: "Platform and toolkit", href: "/business/platform" },
          { label: "Security and sovereignty", href: "/trust/sovereignty" },
          { label: "Case studies", href: "/case-studies" },
          { label: "Talk to us", href: "/contact?tag=business" },
        ],
      },
    ],
    featured: {
      eyebrow: "For organisations",
      title: "Book a Flywheel Check",
      text: "Know where your people stand by stage and level, then move them.",
      href: "/business/check",
      cta: "Book a Check",
    },
  },
  {
    label: "Framework & Research",
    href: "/framework",
    columns: [
      {
        title: "The framework",
        links: [
          { label: "The AI Flywheel at a glance", href: "/framework" },
          { label: "Four stages", href: "/framework/stages" },
          { label: "DRIVE: the method", href: "/framework/drive" },
          { label: "CORE: the governance", href: "/framework/core" },
          { label: "Learning framework C1 to C5", href: "/framework/levels" },
          { label: "Toolkit (28 tools)", href: "/framework/toolkit" },
        ],
      },
      {
        title: "Books and research",
        links: [
          { label: "The AI Flywheel (book)", href: "/books" },
          { label: "The four Studio Playbooks", href: "/books" },
          { label: "State of AI Implementation", href: "/research/report" },
          { label: "Insights", href: "/insights" },
          { label: "Glossary", href: "/glossary" },
          { label: "Inevitable Summit · Feb 2027", href: "/summit" },
        ],
      },
    ],
    featured: {
      eyebrow: "Free · 8 questions",
      title: "Flywheel Check",
      text: "See your level in each stage, and the programme that fits.",
      href: "/check",
      cta: "Start the Check",
    },
  },
  {
    label: "About",
    href: "/about",
    columns: [
      {
        title: "Who we are",
        links: [
          { label: "Our story", href: "/about" },
          { label: "M. K. Elango", href: "/about#elango" },
          { label: "Mission 2047", href: "/mission-2047" },
          { label: "Inevitra Advisory", href: "/about#inevitra" },
        ],
      },
      {
        title: "Work with us",
        links: [
          { label: "Knowledge Partners", href: "/partners/knowledge" },
          { label: "Campus and industry partners", href: "/partners" },
          { label: "Careers", href: "/careers" },
          { label: "Investors", href: "/investors" },
          { label: "Newsroom", href: "/news" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];

export const HEADER_CTAS: HeaderCta[] = [
  { label: "Talk to us", href: "/contact", variant: "ghost" },
  { label: "Start free", href: "/programmes/foundation", variant: "primary" },
];

export const FOOTER: FooterColumn[] = [
  {
    title: "Learn",
    links: [
      { label: "Programmes", href: "/programmes" },
      { label: "Certifications", href: "/certifications" },
      { label: "Batch calendar", href: "/batches" },
      { label: "Pricing", href: "/pricing" },
      { label: "Start free", href: "/programmes/foundation" },
      { label: "Free resources", href: "/free" },
    ],
  },
  {
    title: "Organisations",
    links: [
      { label: "Higher Education", href: "/higher-education" },
      { label: "Business", href: "/business" },
      { label: "Government", href: "/government" },
      { label: "Flywheel Check", href: "/business/check" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Framework",
    links: [
      { label: "The AI Flywheel", href: "/framework" },
      { label: "Books", href: "/books" },
      { label: "Research", href: "/research/report" },
      { label: "Insights", href: "/insights" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Mission 2047", href: "/mission-2047" },
      { label: "Inevitable Summit", href: "/summit" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Trust centre", href: "/trust" },
      { label: "Privacy (DPDP)", href: "/trust/privacy" },
      { label: "Verify a credential", href: "/verify" },
      { label: "Security and data", href: "/trust/security" },
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const CRM_TAGS = [
  { value: "professionals", label: "Professionals" },
  { value: "higher-ed", label: "Higher Education" },
  { value: "business", label: "Business" },
  { value: "government", label: "Government" },
  { value: "studio", label: "Studio" },
  { value: "schools", label: "Schools" },
  { value: "kids", label: "Kids" },
  { value: "partners", label: "Partners" },
  { value: "investors", label: "Investors" },
  { value: "press", label: "Press" },
] as const;
