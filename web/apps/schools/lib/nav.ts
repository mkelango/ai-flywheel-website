import { siteHref } from "@flywheel/ui/sites";
import type { NavItem } from "@flywheel/ui/components/SiteHeader";
import type { FooterColumn } from "@flywheel/ui/components/SiteFooter";
import { KIDS } from "./contact";

/** Six menus, one big friendly button (Strategy 2.0, p.29). */
export const NAV: NavItem[] = [
  {
    label: "Programmes",
    href: "/programmes",
    columns: [
      {
        title: "By class",
        links: [
          { label: "Flywheel Play", desc: "Classes 1–2", href: "/programmes/play" },
          { label: "Flywheel Spark", desc: "Classes 3–5", href: "/programmes/spark" },
          { label: "Flywheel Practitioner", desc: "Classes 6–8", href: "/programmes/practitioner" },
          { label: "Flywheel Builders Club", desc: "Classes 9–12", href: "/programmes/builders-club" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Curriculum map", href: "/programmes" },
          { label: "Board alignment", href: "/programmes/boards" },
          { label: "Flywheel Day", href: "/events" },
          { label: "Inter-school Challenge", href: "/events" },
          { label: "Annual Showcase", href: "/events" },
        ],
      },
    ],
    featured: { eyebrow: "For coordinators", title: "See a sample lesson for every class.", text: "What children make each term, and how it is checked.", href: "/programmes/spark", cta: "Open a sample" },
  },
  {
    label: "For Schools",
    href: "/for-schools",
    columns: [
      {
        title: "Partner",
        links: [
          { label: "School Flywheel Partnership", href: "/partnership" },
          { label: "Pilot one grade band", href: "/pilot" },
          { label: "Pricing per student", href: "/pricing" },
          { label: "School Flywheel Check", href: "/check" },
        ],
      },
      {
        title: "Grow",
        links: [
          { label: "Spark Lab: Starter, Standard, Advanced", href: "/lab" },
          { label: "AI Flywheel School mark", href: "/mark" },
          { label: "School stories", href: "/stories" },
          { label: "Book a demo", href: "/demo" },
        ],
      },
    ],
    featured: { eyebrow: "15 minutes", title: "School Flywheel Check", text: "Six questions for leaders. An instant report with your next step.", href: "/check", cta: "Take the check" },
  },
  {
    label: "Teachers",
    href: "/teachers",
    columns: [
      {
        title: "Learn",
        links: [
          { label: "Teacher Flywheel: C1, C2, C3", href: "/teachers/flywheel" },
          { label: "Workshops calendar", href: "/teachers/workshops" },
          { label: "Become a Knowledge Partner", href: "/teachers/community" },
        ],
      },
      {
        title: "Teach",
        links: [
          { label: "Lesson kits by class", href: "/teachers/kits" },
          { label: "Assessment guides", href: "/teachers/kits" },
          { label: "Teacher community", href: "/teachers/community" },
          { label: "Teacher login", href: siteHref("studio", "/sign-in") },
        ],
      },
    ],
    featured: { eyebrow: "Free with a partnership", title: "Start Teacher C1", text: "Self-paced, in Tamil or English. No AI expertise needed.", href: "/teachers/flywheel", cta: "See the levels" },
  },
  {
    label: "Parents",
    href: "/parents",
    columns: [
      {
        title: "Understand",
        links: [
          { label: "What your child learns", href: "/parents/learning" },
          { label: "Screen time and unplugged learning", href: "/parents/screen-time" },
          { label: "Safety and privacy", href: "/parents/safety" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Guides: AI at home", href: "/parents/guides" },
          { label: "Parent FAQs", href: "/parents/faq" },
          { label: "Ask your school to join", href: "/parents#ask" },
          { label: "AI for your own work", href: siteHref("flywheel", "/free") },
        ],
      },
    ],
    featured: { eyebrow: "Six lines", title: "Our safety promise", text: "No AI accounts for Classes 3–5. No tracking. Data stays in India.", href: "/parents/safety", cta: "Read the promise" },
  },
  {
    label: "AI Flywheel Kids",
    href: "/kids",
    color: KIDS,
    columns: [
      {
        title: "Join · Classes 3–8",
        links: [
          { label: "Kids Summer Camp", href: "/kids/summer-camp", color: KIDS },
          { label: "Kids Weekend Club", href: "/kids/weekend-club", color: KIDS },
          { label: "Kids Holiday Bootcamp", href: "/kids/bootcamp", color: KIDS },
          { label: "Kids at Home packs", href: "/kids/at-home", color: KIDS },
        ],
      },
      {
        title: "Find",
        links: [
          { label: "Camps near you", href: "/kids/find" },
          { label: "Dates and prices", href: "/kids#products" },
          { label: "Host a camp at your school", href: "/kids/host" },
        ],
      },
    ],
    featured: { eyebrow: "Summer 2027", title: "Find a Kids camp", text: "Chennai, Coimbatore, Madurai and Tiruchirappalli. Join the waitlist.", href: "/kids/find", cta: "Find a camp" },
  },
  {
    label: "Mission & CSR",
    href: "/mission",
    columns: [
      {
        title: "Mission",
        links: [
          { label: "Mission schools", href: "/mission/schools" },
          { label: "Districts and progress", href: "/mission/progress" },
          { label: "Tamil, offline-first delivery", href: "/mission/schools" },
        ],
      },
      {
        title: "Partner",
        links: [
          { label: "Become a Mission Patron (CSR)", href: "/mission/csr" },
          { label: "Mission 2047", href: siteHref("flywheel", "/mission-2047") },
          { label: "Contact the Mission team", href: "/contact?topic=mission" },
        ],
      },
    ],
  },
];

export const FOOTER: FooterColumn[] = [
  {
    title: "Programmes",
    links: [
      { label: "Curriculum map", href: "/programmes" },
      { label: "Play · 1–2", href: "/programmes/play" },
      { label: "Spark · 3–5", href: "/programmes/spark" },
      { label: "Practitioner · 6–8", href: "/programmes/practitioner" },
      { label: "Builders Club · 9–12", href: "/programmes/builders-club" },
    ],
  },
  {
    title: "For schools",
    links: [
      { label: "Partnership", href: "/partnership" },
      { label: "Pricing per student", href: "/pricing" },
      { label: "Spark Lab", href: "/lab" },
      { label: "School Flywheel Check", href: "/check" },
      { label: "Book a demo", href: "/demo" },
      { label: "Trust centre", href: "/trust" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Teachers",
    links: [
      { label: "Teacher Flywheel", href: "/teachers" },
      { label: "Lesson kits", href: "/teachers/kits" },
      { label: "Knowledge Partner", href: siteHref("flywheel", "/partners/knowledge") },
    ],
  },
  {
    title: "Families",
    links: [
      { label: "Parents", href: "/parents" },
      { label: "AI Flywheel Kids", href: "/kids" },
      { label: "Find a Kids camp", href: "/kids/find" },
      { label: "Safety promise", href: "/parents/safety" },
    ],
  },
  {
    title: "Mission",
    links: [
      { label: "Mission & CSR", href: "/mission" },
      { label: "Mission 2047", href: siteHref("flywheel", "/mission-2047") },
      { label: "Verify a credential", href: siteHref("flywheel", "/verify") },
    ],
  },
];

/** Pages where the main button becomes "Find a Kids camp". */
export const FAMILY_PATHS = ["/kids", "/parents"];
