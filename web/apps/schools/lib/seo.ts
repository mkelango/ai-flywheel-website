import type { Metadata } from "next";
import { enAlternates, taMeta } from "./ta";

/**
 * Search and answer-engine metadata for AI Flywheel at Schools (aiflywheel.in/schools).
 * Titles are the short part only: the root layout appends " · AI Flywheel Schools".
 * One primary keyword per page (no two pages compete for the same one).
 */

export const SITE = "https://aiflywheel.in/schools";
export const ORG_ID = `${SITE}/#organization`;
export const SITE_ID = `${SITE}/#website`;
export const UPDATED = { iso: "2026-10", label: "October 2026" } as const;

type Meta = { title: string; description: string; absolute?: boolean };

export const SEO: Record<string, Meta> = {
  "/": {
    title: "AI Curriculum for Schools, Classes 1–12 · AI Flywheel",
    absolute: true,
    description: "Class-by-class AI curriculum, trained teachers and a hands-on lab for CBSE, ICSE and State Board schools, in Tamil and English. Book a demo.",
  },
  "/programmes": {
    title: "AI Syllabus, Class 1 to 12",
    description: "Four programmes from Class 1 to 12: Play, Spark, Practitioner, Builders Club. What children make each term, price bands and board fit. See the map.",
  },
  "/programmes/play": {
    title: "AI for Class 1 and 2: Flywheel Play",
    description: "Unplugged patterns, stories and a floor robot for Classes 1–2. About 20 sessions a year, no screens or marks. See a sample lesson.",
  },
  "/programmes/spark": {
    title: "AI for Classes 3 to 5",
    description: "Data hunts, robot recipes and block-coded robots for Classes 3–5, one period a week. No AI accounts for children. See a sample lesson.",
  },
  "/programmes/practitioner": {
    title: "AI for Classes 6 to 8",
    description: "Classes 6–8 make with AI, then check, cite and label it. 1–2 periods a week; students can earn Aware (C1). Book a demo.",
  },
  "/programmes/builders-club": {
    title: "AI and Robotics Club, Classes 9–12",
    description: "An AI and robotics club for Classes 9–12 with a capstone project, from Practitioner (C2) to Builder (C3). See what students build.",
  },
  "/programmes/boards": {
    title: "CBSE AI Curriculum, Class 3 to 8",
    description: "How our curriculum is based on CBSE Computational Thinking and AI (Classes 3–8, from 2026–27), ICSE and TN State Board. See what we add.",
  },
  "/for-schools": {
    title: "AI Programme for Schools in India",
    description: "Six steps for a school: check, demo, one-term pilot, annual partnership, Spark Lab and the School mark. Priced per student a year. Start here.",
  },
  "/partnership": {
    title: "School AI Partnership, Classes 1–12",
    description: "One annual partnership: lesson kits, teacher training with C1 free, a termly report, Flywheel Day and a parent pack. See what is included.",
  },
  "/lab": {
    title: "AI Lab for Schools in Tamil Nadu",
    description: "Spark Lab, an AI and robotics lab in three tiers: Starter ₹1–2 lakh, Standard ₹3–6 lakh, Advanced ₹8–25 lakh (excl. GST). See the tiers.",
  },
  "/pricing": {
    title: "AI Curriculum Price per Student",
    description: "Ed 1.1 bands per student a year, excl. GST: Play ₹1,500–2,000 to Builders Club ₹3,000–4,000. Quoted per school. Ask for a quote.",
  },
  "/pilot": {
    title: "AI Pilot for Schools: One Term",
    description: "Try AI Flywheel in one class band for one term, with a teacher trained to Aware (C1). See the work and the report, then decide. Ask today.",
  },
  "/demo": {
    title: "Book an AI Lesson Demo",
    description: "See a 45-minute sample AI lesson with your own students, on site or online. No obligation. Book a demo for your school.",
  },
  "/check": {
    title: "School AI Readiness Check",
    description: "Six questions for school leaders on curriculum, teachers, safety, parents, space and timetable. Get an instant report and next step. Free.",
  },
  "/mark": {
    title: "AI School Certification Mark",
    description: "Proposed criteria for the AI Flywheel School mark: Aware, Practitioner, Builder. Renewed each year and shown on your website. See criteria.",
  },
  "/teachers": {
    title: "AI Training for Teachers",
    description: "AI training for school teachers at three levels: Aware (C1), Practitioner (C2), Builder (C3). C1 free in partner schools. Start training.",
  },
  "/teachers/flywheel": {
    title: "AI Teacher Certification C1–C3",
    description: "Teacher Flywheel certification: Aware (C1), Practitioner (C2) and Builder (C3), each assessed without AI. C1 free in partner schools.",
  },
  "/teachers/kits": {
    title: "AI Lesson Plans for Teachers",
    description: "Ready-to-teach AI lesson kits and assessment guides for Classes 1–12, in Tamil and English. Download a sample kit.",
  },
  "/teachers/workshops": {
    title: "AI Workshops for Teachers",
    description: "The termly workshop calendar for partner-school teachers: April–May training, kit walkthroughs, clinics and reviews. See the dates.",
  },
  "/teachers/community": {
    title: "AI Teacher Community",
    description: "Join the AI Flywheel teacher community and grow from Aware (C1) to Knowledge Partner. Share lessons with teachers across Tamil Nadu.",
  },
  "/parents": {
    title: "AI in School: A Parents' Guide",
    description: "What your child makes with AI, class by class, how much screen time it takes and our six safety promises. Read the parents' guide.",
  },
  "/parents/learning": {
    title: "What Children Learn in AI Class",
    description: "Class by class and term by term: what your child makes with AI at school, from Class 1 to Class 12. See your child's class.",
  },
  "/parents/safety": {
    title: "Is AI Safe for Children?",
    description: "Our six safety promises: no AI accounts for Classes 3–5, parent consent first, data in India, never used to train AI. Read how it works.",
  },
  "/parents/screen-time": {
    title: "Screen Time in AI Lessons",
    description: "How much screen time AI lessons take, class by class. Classes 1–5 learn mostly offline, with unplugged activities. See the plan.",
  },
  "/parents/guides": {
    title: "AI Guides for Parents",
    description: "Short guides for parents: talking about AI at dinner, spotting fakes together, homework and honesty, and screens for making. Read one.",
  },
  "/parents/faq": {
    title: "AI in School: Parent FAQs",
    description: "Is it safe? Will my child use ChatGPT? Is it extra cost? Is it in Tamil? Can I delete my child's data? Short answers for parents.",
  },
  "/parents/guide/homework-and-honesty": {
    title: "AI and Homework: Guide for Parents",
    description: "When AI help is fine and when it is not: a short, practical guide to homework and honesty with AI. Read it with your child.",
  },
  "/parents/guide/spotting-fakes": {
    title: "How to Spot AI Fakes with Kids",
    description: "A short family activity for spotting AI-made pictures, voices and stories, and checking before you share. Try it together tonight.",
  },
  "/parents/guide/talking-about-ai-at-dinner": {
    title: "How to Explain AI to Kids",
    description: "Simple questions to talk about AI at the dinner table with your child. A short guide for parents. Start tonight.",
  },
  "/parents/guide/screens-for-making": {
    title: "Creative Screen Time for Kids",
    description: "Screens for making, not just watching: a short guide to turning screen time into building time with your child. Read the guide.",
  },
  "/kids": {
    title: "AI Classes for Kids, Classes 3–8",
    description: "AI camps and clubs for ages 8–14 in Chennai, Coimbatore, Madurai and Trichy. Build stories, helper bots and robots. Join the waitlist.",
  },
  "/kids/summer-camp": {
    title: "AI Summer Camp for Kids, Chennai",
    description: "Two weeks in April–May, 2–3 hours a day, for Classes 3–8. Build a story, a helper bot and a moving robot. Proposed ₹4,000–7,500. Join the waitlist.",
  },
  "/kids/weekend-club": {
    title: "Weekend AI Club for Kids",
    description: "A school term of Saturdays, 2 hours a week, for Classes 3–8. A project each month; Classes 6–8 can earn Aware (C1). Join the waitlist.",
  },
  "/kids/bootcamp": {
    title: "Robotics Camp for Kids: Holidays",
    description: "3–5 days in the Pongal, Diwali or Christmas break for Classes 3–8. One themed build: a robot, a story or a helper bot. Join the waitlist.",
  },
  "/kids/at-home": {
    title: "AI Activities for Kids at Home",
    description: "Printable, unplugged AI activity packs with a parent guide, in Tamil and English, for Classes 3–8. Start with the free sampler.",
  },
  "/kids/sampler": {
    title: "Free Unplugged AI Activities",
    description: "A free printable sampler: three unplugged activities on how machines think, for Classes 3–5 and 6–8, with a parent guide. No screen. Get it.",
  },
  "/kids/find": {
    title: "Kids AI Camp Near You",
    description: "Find AI Flywheel Kids camps and clubs for Classes 3–8 in Chennai, Coimbatore, Madurai and Tiruchirappalli. Pick your city, join the waitlist.",
  },
  "/kids/host": {
    title: "Host a Kids AI Camp at Your School",
    description: "Run AI Flywheel Kids camps for Classes 3–8 at your school or centre. We bring training, kit and marketing, on a revenue share. Talk to us.",
  },
  "/mission": {
    title: "AI Literacy for Government Schools",
    description: "Mission schools, district progress and the Mission Patron route for CSR funders. Tamil-first and built to work offline. Part of Mission 2047.",
  },
  "/mission/schools": {
    title: "AI Curriculum in Tamil, Offline",
    description: "The AI Flywheel curriculum for government and aided schools: in Tamil, built to work offline, with free teacher training to Aware (C1).",
  },
  "/mission/progress": {
    title: "District AI Literacy Progress",
    description: "How Mission districts report progress: teachers by level (C1–C3) and children's work by stage, not enrolment counts. See the format.",
  },
  "/mission/csr": {
    title: "CSR Funding for AI Education",
    description: "Become a Mission Patron: fund AI literacy in government schools, with cost per school, outcomes by level and a termly district report.",
  },
  "/events": {
    title: "Inter-school AI Challenge",
    description: "Flywheel Day, the Inter-school Challenge and the Annual Showcase for partner schools, Classes 1–12. See the year's calendar.",
  },
  "/stories": {
    title: "AI in Schools: School Stories",
    description: "Stories from partner schools, shared with permission and labelled Real, Pilot or Illustrative scenario. First name and class only.",
  },
  "/trust": {
    title: "Child Data Privacy for Schools",
    description: "Privacy notice for children, data processing terms for schools, the AI feature register and our grievance officer, in one place.",
  },
  "/trust/children-privacy": {
    title: "Children's Privacy Notice",
    description: "What we keep, what we never do, where children's data is stored and for how long, and a parent's choices. Data stays in India.",
  },
  "/trust/processing-terms": {
    title: "Data Processing Terms for Schools",
    description: "Our data processing commitments to schools: sub-processors, retention, and what happens if something goes wrong. Read the terms.",
  },
  "/trust/ai-register": {
    title: "AI Feature Register",
    description: "Every AI feature children or teachers may meet, what it does, which class it is for, and what it never does. Read the register.",
  },
  "/trust/grievance": {
    title: "Grievance Officer",
    description: "Raise a concern about a child's data or an AI feature. How to reach our grievance officer and how quickly we reply.",
  },
  "/verify": {
    title: "Verify a Teacher AI Certificate",
    description: "Check a teacher or school credential (Open Badges 3.0) from AI Flywheel at Schools. Children's progress is never public.",
  },
  "/contact": {
    title: "Contact AI Flywheel at Schools",
    absolute: true,
    description: "Talk to us about your school, your child's programme, a Mission or district programme, or CSR funding. Adult details only.",
  },
};

/** Tamil pages, keyed by the English path they mirror. */
export const SEO_TA: Record<string, Meta> = {
  "/": {
    title: "பள்ளிகளுக்கான AI பாடத்திட்டம்",
    description:
      "வகுப்பு வாரியான செயற்கை நுண்ணறிவு (AI) பாடத்திட்டம், பயிற்சி பெற்ற ஆசிரியர்கள், ஆய்வகம். CBSE, ICSE, மாநிலப் பாடத்திட்டப் பள்ளிகளுக்கு, தமிழில். டெமோ பதிவு செய்யுங்கள்.",
  },
  "/programmes": {
    title: "வகுப்பு 1–12 AI பாடத்திட்டம்",
    description: "நான்கு திட்டங்கள், வகுப்பு 1 முதல் 12 வரை. குழந்தைகள் என்ன உருவாக்குகிறார்கள், கட்டண வரம்பு. வரைபடத்தைப் பாருங்கள்.",
  },
  "/programmes/boards": {
    title: "CBSE AI பாடத்திட்டம் வகுப்பு 3–8",
    description: "CBSE கணினிச் சிந்தனை மற்றும் AI (வகுப்பு 3–8), ICSE, தமிழ்நாடு மாநிலப் பாடத்திட்டத்துடன் பொருத்தம். எதைச் சேர்க்கிறோம் பாருங்கள்.",
  },
  "/kids": {
    title: "குழந்தைகளுக்கான AI வகுப்புகள்",
    description: "வகுப்பு 3–8க்கு AI கோடை முகாம்கள், வார இறுதி கிளப்கள். சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி. காத்திருப்புப் பட்டியலில் சேருங்கள்.",
  },
  "/parents/safety": {
    title: "AI குழந்தைகளுக்குப் பாதுகாப்பானதா?",
    description: "ஆறு பாதுகாப்பு வாக்குறுதிகள்: வகுப்பு 3–5க்கு AI கணக்கு இல்லை, பெற்றோர் ஒப்புதல் முதலில், தரவு இந்தியாவில். எப்படி என்று படியுங்கள்.",
  },
  "/mission": {
    title: "அரசுப் பள்ளிகளுக்கு AI அறிவு",
    description: "மிஷன் பள்ளிகள், மாவட்ட முன்னேற்றம், CSR நிதியாளர்களுக்கு மிஷன் புரவலர் வழி. தமிழில், இணையம் இல்லாமலும். Mission 2047-இன் பகுதி.",
  },
};

const OG_IMAGE = ["/opengraph-image"];

/** English page metadata from the SEO map: title, description, canonical (+ hreflang when a Tamil page exists) and Open Graph. */
export function pageMeta(path: string, fallback?: Meta): Metadata {
  const m = SEO[path] ?? fallback;
  if (!m) return { alternates: enAlternates(path) };
  const ogTitle = m.absolute ? m.title : `${m.title} · AI Flywheel Schools`;
  return {
    title: m.absolute ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: enAlternates(path),
    openGraph: { siteName: "AI Flywheel at Schools", locale: "en_IN", type: "website", title: ogTitle, description: m.description, url: path, images: OG_IMAGE },
  };
}

/** Tamil page metadata from SEO_TA, falling back to the page's own Tamil title and description. */
export function taPageMeta(enPath: string, fallbackTitle: string, fallbackDescription: string): Metadata {
  const m = SEO_TA[enPath];
  return taMeta(enPath, m?.title ?? fallbackTitle, m?.description ?? fallbackDescription);
}

