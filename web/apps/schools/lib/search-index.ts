/**
 * Static index of every page of AI Flywheel at Schools (aiflywheel.in/schools), for /search.
 * Built from the same data the pages use, so titles stay in sync.
 */
import { PARENT_GUIDES, TRUST_PAGES } from "@/components/extras/content";
import { KIDS_PRODUCTS, PROGRAMMES } from "./data";
import { MISSION_TOPICS, PARENT_TOPICS } from "./families";
import { TEACHER_TOPICS, TEACHER_TOPIC_META } from "./offer";

export type SearchEntry = { title: string; href: string; section: string; line: string; keywords?: string };

const STATIC: SearchEntry[] = [
  { title: "Home", href: "/", section: "Schools", line: "AI literacy for Classes 1 to 12: make with AI, and question it.", keywords: "home start schools" },
  { title: "Curriculum map", href: "/programmes", section: "Programmes", line: "Four programmes, four stages, one wheel from Class 1 to 12.", keywords: "curriculum syllabus classes stages know make do move" },
  { title: "Board alignment", href: "/programmes/boards", section: "Programmes", line: "CBSE, ICSE and Tamil Nadu State Board: what we cover, and what we add.", keywords: "cbse icse cisce state board samacheer syllabus mapping" },
  { title: "Events", href: "/events", section: "Programmes", line: "Flywheel Day, the Inter-school Challenge and the Annual Showcase.", keywords: "flywheel day challenge showcase competition" },
  { title: "For schools", href: "/for-schools", section: "For schools", line: "Partnership, pricing, pilot and the School mark.", keywords: "principal correspondent school leaders" },
  { title: "School Flywheel Partnership", href: "/partnership", section: "For schools", line: "Curriculum, teacher training, reports and events for the whole school.", keywords: "partnership annual contract" },
  { title: "Pilot one grade band", href: "/pilot", section: "For schools", line: "One class band, one term, one trained teacher, then decide.", keywords: "pilot trial try" },
  { title: "Pricing per student", href: "/pricing", section: "For schools", line: "Price bands per student a year, by programme.", keywords: "price cost fees budget estimate" },
  { title: "AI Flywheel School mark", href: "/mark", section: "For schools", line: "Aware, Practitioner and Builder marks for schools.", keywords: "mark badge recognition" },
  { title: "Spark Lab", href: "/lab", section: "For schools", line: "Starter, Standard or Advanced: an AI and robotics lab.", keywords: "lab robotics robots kit atl" },
  { title: "School stories", href: "/stories", section: "For schools", line: "Real, pilot and illustrative stories, clearly labelled.", keywords: "case studies stories examples" },
  { title: "School Flywheel Check", href: "/check", section: "For schools", line: "Six questions for leaders, with an instant next step.", keywords: "check quiz assessment readiness" },
  { title: "Book a school demo", href: "/demo", section: "For schools", line: "See a lesson with your own students. 45 minutes.", keywords: "demo book meeting visit" },
  { title: "Teachers", href: "/teachers", section: "Teachers", line: "Teacher Flywheel C1 to C3, lesson kits and workshops.", keywords: "teachers training" },
  { title: "Parents", href: "/parents", section: "Parents", line: "What your child learns, screen time and the safety promise.", keywords: "parents family child" },
  { title: "AI Flywheel Kids", href: "/kids", section: "Kids", line: "Summer camps and weekend clubs for Classes 3–8.", keywords: "kids camp children holiday" },
  { title: "Find a Kids camp", href: "/kids/find", section: "Kids", line: "Camps in Chennai, Coimbatore, Madurai and Tiruchirappalli.", keywords: "near me city waitlist chennai coimbatore madurai trichy" },
  { title: "Host a Kids camp", href: "/kids/host", section: "Kids", line: "Training, kit and marketing for schools and centres.", keywords: "host centre revenue share" },
  { title: "Kids at Home free sampler", href: "/kids/sampler", section: "Kids", line: "Three printable, unplugged activities for Classes 3–8.", keywords: "free sampler printable activity worksheet unplugged home pack" },
  { title: "Mission & CSR", href: "/mission", section: "Mission", line: "AI literacy for government schools, Tamil first.", keywords: "government csr mission district" },
  { title: "Trust centre", href: "/trust", section: "Trust", line: "Privacy, data processing, the AI feature register and grievances.", keywords: "privacy dpdp data safety policy legal" },
  { title: "Contact", href: "/contact", section: "Contact", line: "Schools, parents, Mission and CSR enquiries.", keywords: "contact email phone whatsapp" },
];

export const SEARCH_INDEX: SearchEntry[] = [
  ...STATIC,
  ...PROGRAMMES.map((p) => ({ title: p.name, href: `/programmes/${p.slug}`, section: "Programmes", line: `${p.classes}. ${p.line}`, keywords: `${p.short} sample lesson` })),
  ...TEACHER_TOPICS.map((t) => ({ title: TEACHER_TOPIC_META[t].label, href: `/teachers/${t}`, section: "Teachers", line: TEACHER_TOPIC_META[t].description })),
  ...PARENT_TOPICS.map((t) => ({ title: t.label, href: `/parents/${t.slug}`, section: "Parents", line: t.description })),
  ...PARENT_GUIDES.map((g) => ({ title: g.title, href: `/parents/guide/${g.slug}`, section: "Parent guides", line: `${g.classes}. ${g.line}`, keywords: "guide printable pdf" })),
  ...KIDS_PRODUCTS.map((p) => ({ title: p.name, href: `/kids/${p.id}`, section: "Kids", line: `${p.format}. ${p.who}.` })),
  ...MISSION_TOPICS.map((t) => ({ title: t.label, href: `/mission/${t.slug}`, section: "Mission", line: t.description })),
  ...TRUST_PAGES.map((p) => ({ title: p.label, href: `/trust/${p.slug}`, section: "Trust", line: p.description })),
];

/** Adult / career-focused queries get a pointer to aiflywheel.in. */
export const ADULT_TERMS = ["job", "career", "college", "course for me", "certificate", "certification", "professional", "upskill", "placement", "resume", "my work"];
