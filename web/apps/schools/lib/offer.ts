/**
 * Content for the school-offer pages: boards, events, partnership, mark, pricing, pilot,
 * stories, teacher topics and contact. From Website Strategy 2.0, section 03.
 * Board rows are our reading of each syllabus ("based on"), not an accreditation.
 */

export type BoardRow = { board: string; classes: string; basis: string; cover: string[]; add: string[]; status: "Proposed" | "In preparation" };

export const BOARD_ROWS: BoardRow[] = [
  {
    board: "CBSE",
    classes: "Classes 3–8",
    basis: "Computational Thinking and AI, from 2026–27",
    cover: ["Patterns, sorting and data", "Step-by-step instructions and flowcharts", "What AI is, and where it goes wrong"],
    add: ["Robots and sensors (Move)", "One check without AI in every project", "Lesson kits in Tamil and English"],
    status: "Proposed",
  },
  {
    board: "ICSE",
    classes: "Classes 1–10",
    basis: "CISCE Computer Studies (Classes 1–8) and Computer Applications (Classes 9–10)",
    cover: [
      "Classes 1–5: parts of a computer, safe use and step-by-step thinking",
      "Classes 6–8: block coding, algorithms and flowcharts, internet safety",
      "Classes 9–10: programming logic, data and the ethics of computing",
    ],
    add: [
      "Classes 1–5: unplugged AI activities, no student accounts",
      "Classes 6–8: classifier projects and checking AI output for fairness",
      "Classes 9–10: testing AI in Tamil and English, robots and sensors (Move)",
    ],
    status: "Proposed",
  },
  {
    board: "Tamil Nadu State Board",
    classes: "Classes 1–12",
    basis: "State Board computer science and ICT, class by class",
    cover: ["Computer basics and coding concepts", "Digital safety"],
    add: ["Tamil-first lesson kits", "Testing AI in Tamil and English (Classes 9–12)", "Hands-on lab work with Spark Lab"],
    status: "Proposed",
  },
];

export const EVENTS = [
  {
    key: "flywheel-day",
    name: "Flywheel Day",
    when: "Once a year, at your school",
    who: "Classes 1–12",
    line: "Every class band shows what it made. Parents are invited.",
    tint: "#FFE39A",
  },
  {
    key: "challenge",
    name: "Inter-school Challenge",
    when: "Once a year, across partner schools",
    who: "Teams from Classes 6–12",
    line: "One real problem, one day, one check without AI.",
    tint: "#DCEBFB",
  },
  {
    key: "showcase",
    name: "Annual Showcase",
    when: "End of the school year",
    who: "Builders Club, Classes 9–12",
    line: "Capstone projects, shown with first name and class only.",
    tint: "#D3EEEC",
  },
] as const;

export const SCHOOL_CALENDAR = [
  { months: "Oct–Dec", what: "Plan next year", detail: "See the curriculum map, book a demo, take the check." },
  { months: "Jan–Apr", what: "Budgets and decisions", detail: "Per-student pricing, a pilot, a partnership for June." },
  { months: "Apr–May", what: "Teacher training", detail: "Teachers reach Aware (C1) before the June term." },
  { months: "Jun–Sep", what: "Term starts, events planned", detail: "Flywheel Day dates and Challenge sign-ups." },
];

export const INCLUDED = [
  { icon: "book", title: "Curriculum and lesson kits", line: "For every class band, Classes 1–12, in Tamil and English." },
  { icon: "cap", title: "Teacher Flywheel", line: "Aware (C1) free for every teacher. Training to Practitioner (C2)." },
  { icon: "report", title: "A termly school report", line: "By class band, level and stage. No marks for Classes 1–2." },
  { icon: "trophy", title: "Flywheel Day and the Challenge", line: "One day at your school, one inter-school event." },
  { icon: "heart", title: "A parent pack", line: "What each class learns, plus one parent session a year." },
  { icon: "lab", title: "Optional Spark Lab", line: "Starter, Standard or Advanced. Quoted separately." },
] as const;

/** Illustrative termly report rows: class band × level × stage. */
export const SAMPLE_REPORT = [
  { band: "Classes 3–5", level: "—", stages: [3, 3, 2, 2] },
  { band: "Classes 6–8", level: "C1 · 64%", stages: [3, 2, 2, 1] },
  { band: "Classes 9–12", level: "C2 · 22%", stages: [2, 3, 1, 1] },
];

export const MARK_STEPS = [
  { title: "Run the programme", line: "Meet the criteria for a level during the school year." },
  { title: "Share the evidence", line: "Teacher levels, class bands covered and event records." },
  { title: "Show the mark", line: "On your website, linked back to us. Renewed every year." },
];

export const PILOT_GETS = [
  "One class band, for one term",
  "One teacher trained to Aware (C1) before you start",
  "The lesson kits and assessment guide for that term",
  "One period a week, fitted to your timetable",
  "An end-of-term report by class and stage",
  "A review meeting to decide what comes next",
];

export const PILOT_STEPS = [
  { when: "Before term", what: "Train the teacher to C1 and set the timetable." },
  { when: "During term", what: "Teach the kit, one period a week. We support the teacher." },
  { when: "End of term", what: "Get the report, see the work, decide together." },
];

export const STORY_LABELS = [
  { status: "Real", line: "Happened in a partner school, shared with written permission." },
  { status: "Pilot", line: "From a pilot term. Early results, not a promise." },
  { status: "Illustrative scenario", line: "An example to show how something works. Not a real school." },
] as const;

/* ---------- Teacher topics ---------- */

export const TEACHER_TOPICS = ["flywheel", "kits", "workshops", "community"] as const;
export type TeacherTopic = (typeof TEACHER_TOPICS)[number];

export const TEACHER_TOPIC_META: Record<TeacherTopic, { label: string; title: string; intro: string; description: string }> = {
  flywheel: {
    label: "Teacher Flywheel",
    title: "AI teacher certification in three levels. Start at Aware.",
    intro: "Teacher Flywheel is an AI teacher certification in three levels, each earned with real work and assessed without AI, in Tamil or English.",
    description: "Teacher Flywheel levels: Aware (C1), Practitioner (C2) and Builder (C3). C1 is free for every teacher in a partner school.",
  },
  kits: {
    label: "Lesson kits",
    title: "AI lesson plans for teachers: open the kit, teach the lesson.",
    intro: "Ready-to-teach AI lesson plans for teachers, for every class band from Class 1 to 12: slides, printables, a check without AI and a marking guide.",
    description: "Lesson kits and assessment guides for Classes 1–12, in Tamil and English. Download a sample kit.",
  },
  workshops: {
    label: "Workshops",
    title: "AI workshops for teachers, every term.",
    intro: "AI workshops for teachers in partner schools, on site or online. Dates are set with each school, around your exams.",
    description: "The termly workshop calendar for teachers in partner schools: training window, kit walkthroughs, clinics and reviews.",
  },
  community: {
    label: "Community",
    title: "An AI teacher community, so you won’t teach this alone.",
    intro: "A moderated AI teacher community for partner schools across India, in Tamil and English.",
    description: "The AI Flywheel teacher community, and the path from Aware (C1) to Knowledge Partner.",
  },
};

export const TEACHER_LEVELS = [
  { code: "C1", name: "Aware", how: "Self-paced, in Tamil or English.", proof: "A scenario quiz, taken without AI.", cost: "Free for every teacher in a partner school.", tint: "#DCEBFB" },
  { code: "C2", name: "Practitioner", how: "Uses AI in lesson planning, safely.", proof: "A logged use, plus the same task done unaided.", cost: "Included for partnership teachers.", tint: "#FFE39A" },
  { code: "C3", name: "Builder", how: "Redesigns one unit, teaches it, reviews it.", proof: "The unit, taught and reviewed with a mentor.", cost: "For lead teachers and club leads.", tint: "#D3EEEC" },
];

export const KIT_CONTENTS = ["Slides for the class screen", "Printable worksheets", "A check without AI", "A marking guide by level and stage"];

export const WORKSHOP_CALENDAR = [
  { term: "Before Term 1", when: "April–May", items: ["Aware (C1) cohort", "Practitioner (C2) cohort"] },
  { term: "Term 1", when: "June–July", items: ["Kit walkthrough, one per class band"] },
  { term: "Term 2", when: "October", items: ["Mid-year clinic: bring a lesson, leave with a better one"] },
  { term: "Term 3", when: "January", items: ["Builder (C3) unit reviews", "Showcase planning"] },
];

export const COMMUNITY = [
  { title: "Lesson of the month", line: "A free lesson, ready to teach, every month." },
  { title: "Peer review", line: "Share a lesson; get notes from teachers at the same class." },
  { title: "Ask a question", line: "A moderated space, in Tamil and English." },
];

export const PARTNER_PATH = [
  { code: "C1", name: "Aware" },
  { code: "C2", name: "Practitioner" },
  { code: "C3", name: "Builder" },
  { code: "C4", name: "Leader" },
  { code: "KP", name: "Knowledge Partner" },
];

/* ---------- Contact ---------- */

export const CONTACT_TOPICS = [
  { key: "school", label: "My school", hint: "Correspondents, principals and coordinators" },
  { key: "parent", label: "I’m a parent", hint: "Questions about the programme or Kids camps" },
  { key: "mission", label: "Mission or government", hint: "District and state programmes" },
  { key: "csr", label: "CSR funding", hint: "Sponsor schools or labs" },
  { key: "grievance", label: "A concern or complaint", hint: "Goes to the grievance officer" },
] as const;
