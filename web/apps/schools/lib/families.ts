/**
 * Data for the Families and Mission subpages: /parents/[topic], /kids/[product], /kids/find, /kids/host, /mission/[topic].
 * Prices are Proposed bands (Strategy 2.0, p.33). Progress and cost figures are illustrative until the first district pilot.
 */
import type { StageKey } from "./data";

/* ---------- Parents ---------- */

export type ParentTopicSlug = "learning" | "safety" | "screen-time" | "guides" | "faq";

export const PARENT_TOPICS: { slug: ParentTopicSlug; label: string; title: string; intro: string; description: string }[] = [
  {
    slug: "learning",
    label: "What your child learns",
    title: "What children learn in AI class, class by class.",
    intro: "What children learn in AI class changes with each class band. Three terms a year, and each term ends with something your child made.",
    description: "Class by class and term by term: what your child makes with AI at school, from Class 1 to Class 12.",
  },
  {
    slug: "safety",
    label: "Safety and privacy",
    title: "Is AI safe for children?",
    intro: "Yes, when the rules are built in. Here are our six promises, in plain words. Your consent comes first, and you can see, download or delete your child’s data at any time.",
    description: "Our six safety promises for children, and how parent consent works: the school invites, you verify, and you stay in control.",
  },
  {
    slug: "screen-time",
    label: "Screen time",
    title: "Screen time in AI lessons: for making, not scrolling.",
    intro: "Screen time in AI lessons is small for young children: Classes 1–5 learn mostly offline, with cards, paper and floor robots.",
    description: "How much screen time AI lessons take, class by class. Classes 1–5 learn mostly offline.",
  },
  {
    slug: "guides",
    label: "Guides: AI at home",
    title: "AI guides for parents, one short read at a time.",
    intro: "Short AI guides for parents, for AI at home. Five minutes to read. Free, in Tamil and English.",
    description: "Short guides for parents: talking about AI at dinner, spotting fakes together, and homework and honesty.",
  },
  {
    slug: "faq",
    label: "Parent FAQs",
    title: "AI in school: what parents ask us.",
    intro: "Short answers to the AI in school questions parents ask most. If yours is not here, ask us on WhatsApp.",
    description: "Answers to parents’ questions: is it safe, will my child use ChatGPT, is it extra cost, is it in Tamil, can I delete my child’s data.",
  },
];

export const getParentTopic = (slug: string) => PARENT_TOPICS.find((t) => t.slug === slug);

/** Six promises, re-said for parents in everyday words. */
export const PLAIN_PROMISES = [
  { title: "No AI accounts for Classes 3–5", plain: "Your child does not log in to any AI. The teacher shows it on one screen; children make things on paper." },
  { title: "Teacher-owned accounts from Class 6", plain: "From Class 6 to 12, the teacher owns and controls every student account until your child turns 18." },
  { title: "Your consent first", plain: "Nothing about your child is saved until you have said yes, and we have checked it is really you." },
  { title: "Data stays in India", plain: "Your child’s work is stored in India. It is never used to train any AI model." },
  { title: "No tracking or ads", plain: "No ads, no profiling, and no third-party trackers on this site or in lessons." },
  { title: "Photos only with written consent", plain: "We show hands and work, not faces. Showcases use first name and class only." },
];

export const CONSENT_STEPS = [
  { title: "Your school invites you", line: "You get a message from the school, not from us." },
  { title: "You verify with an OTP", line: "A one-time code to your phone, and a consent record you can keep." },
  { title: "The account is created", line: "Only then. For Classes 6–12, the teacher owns it." },
  { title: "You stay in control", line: "View, download or delete your child’s data at any time." },
];

export const SCREEN_BANDS = [
  { classes: "Classes 1–2", unplugged: 95, line: "Cards, stories and a floor robot. The teacher may show one picture on a screen." },
  { classes: "Classes 3–5", unplugged: 85, line: "Paper first. The teacher demonstrates AI on one screen; children have no accounts." },
  { classes: "Classes 6–8", unplugged: 55, line: "Short screen sessions to make something, on teacher-owned accounts." },
  { classes: "Classes 9–12", unplugged: 35, line: "Real projects in Studio, always with a check done without AI." },
];

export const HOME_TIPS = [
  "Ask what they made this week, not how long they spent on a screen.",
  "Let them teach you one thing they learned.",
  "Keep devices in shared rooms for Classes 1–8.",
];

export const GUIDES = [
  {
    slug: "dinner",
    title: "Talking about AI at dinner",
    classes: "For Classes 3–12",
    steps: ["Ask: what did a machine get wrong today?", "Ask: who made it, and why?", "Share one way you use AI yourself."],
  },
  {
    slug: "fakes",
    title: "Spotting fakes together",
    classes: "For Classes 5–12",
    steps: ["Look at hands, text and shadows in pictures.", "Ask: who posted this first?", "Check one other source before sharing."],
  },
  {
    slug: "homework",
    title: "Homework and honesty",
    classes: "For Classes 6–12",
    steps: ["AI can explain. Your child does the work.", "Ask them to show the check they did without AI.", "If AI helped, say so. That is honest."],
  },
  {
    slug: "voices",
    title: "Voices and calls that sound real",
    classes: "For the whole family",
    steps: ["Agree a family code word.", "Call back on a number you know.", "Never share an OTP, even with ‘family’."],
  },
];

export const PARENT_FAQ = [
  { q: "Is it safe?", a: "Yes. Children in Classes 3–5 have no AI accounts. From Class 6, the teacher owns every account until your child turns 18. Data stays in India and never trains AI models." },
  { q: "Will my child use ChatGPT at school?", a: "Not on their own account. In Classes 3–5 the teacher demonstrates on one screen. From Class 6, students use AI Flywheel Studio through accounts their teacher controls." },
  { q: "Is the AI programme an extra cost?", a: "Your school decides whether it is part of the annual fee or charged separately. AI Flywheel Kids camps are separate, and optional." },
  { q: "Is it taught in Tamil?", a: "Yes. Lesson kits, parent guides and the Kids at Home packs come in Tamil and English." },
  { q: "Can I delete my child’s data?", a: "Yes. After you give consent, you can view, download or delete your child’s data at any time, from the parent view your school sets up." },
  { q: "How much screen time is it?", a: "Classes 1–5 learn mostly offline. From Class 6, screens are used to make things, never to scroll." },
];

/* ---------- AI Flywheel Kids ---------- */

export type KidsProductId = "summer-camp" | "weekend-club" | "bootcamp" | "at-home";

export const KIDS_DETAIL: Record<
  KidsProductId,
  {
    title: string;
    description: string;
    kidLine: string;
    makes: { stage: StageKey; what: string }[];
    schedule: string[];
    note?: string;
  }
> = {
  "summer-camp": {
    title: "Two weeks of making, ending in a Showcase Day.",
    description: "Kids Summer Camp: two weeks in April–May, 2–3 hours a day, for Classes 3–8. Your child builds a story, a helper bot and a moving robot, then shows the family.",
    kidLine: "For you: build a robot, teach it a trick, and show everyone on Showcase Day.",
    makes: [
      { stage: "foundation", what: "Sort pictures and find where a machine guesses wrong" },
      { stage: "generative", what: "A picture story, made with AI and checked by hand" },
      { stage: "agentic", what: "A helper bot that follows clear, fair steps" },
      { stage: "physical", what: "A small robot that moves along a paper town" },
    ],
    schedule: ["Week 1: explore, sort and make a story", "Week 2: build the bot and the robot", "Last day: family Showcase Day"],
  },
  "weekend-club": {
    title: "A term of Saturdays. A project every month.",
    description: "Kids Weekend Club: a school term of Saturdays, 2 hours a week, for Classes 3–8. A project each month; Classes 6–8 can earn Aware (C1).",
    kidLine: "For you: a new thing to make every month, with friends from other schools.",
    makes: [
      { stage: "foundation", what: "Month 1: a ‘real or fake?’ card game" },
      { stage: "generative", what: "Month 2: a comic, story or song you direct" },
      { stage: "agentic", what: "Month 3: a helper bot for a family job" },
      { stage: "physical", what: "Month 4: a sensor or robot build" },
    ],
    schedule: ["Every Saturday, 2 hours", "Classes 3–5 and 6–8 in separate groups", "Classes 6–8 can earn Aware (C1) at the end of term"],
  },
  bootcamp: {
    title: "Three to five days. One big build.",
    description: "Kids Holiday Bootcamp: 3–5 days in the Pongal, Diwali or Christmas break, for Classes 3–8. One themed build: a robot, a story or a helper bot.",
    kidLine: "For you: pick a robot, a story or a helper bot, and finish it before the holiday ends.",
    makes: [
      { stage: "generative", what: "A themed story, poster or song" },
      { stage: "agentic", what: "Or a helper bot for the festival" },
      { stage: "physical", what: "Or a robot that moves and lights up" },
    ],
    schedule: ["Pongal (January), Diwali (October–November) or Christmas (December)", "3–5 mornings, 2–3 hours each", "Ends with a short family show-and-tell"],
  },
  "at-home": {
    title: "Unplugged packs to do together at home.",
    description: "Kids at Home: printable, unplugged activity packs for Classes 3–8 with a parent guide, in Tamil and English. Start with a free sampler.",
    kidLine: "For you: games and puzzles about how machines think, no screen needed.",
    makes: [
      { stage: "foundation", what: "Sorting and pattern puzzles: how machines learn" },
      { stage: "generative", what: "A ‘spot the fake’ picture hunt" },
      { stage: "agentic", what: "‘Robot says’ instruction games for the family" },
    ],
    schedule: ["Print at home, about 30 minutes an activity", "A parent guide with every pack", "Tamil and English"],
    note: "Screen-light by design. No account, no app.",
  },
};

export const KIDS_SAFETY_RULES = ["No AI accounts for Classes 3–5", "Instructor-owned accounts for Classes 6–8", "Parents’ consent first", "No tracking on Kids pages", "Hands and work in photos, not faces"];

export const HOST_OFFER = [
  { title: "Training", line: "Your teachers or instructors trained to run the camp, in Tamil or English. They reach Aware (C1)." },
  { title: "Kit", line: "Lesson plans, printed cards, robot kits and a Showcase Day pack for each group." },
  { title: "Marketing", line: "Posters, WhatsApp messages and a camp page for your parents. No tracking." },
  { title: "Revenue share", line: "You host and enrol; we share the camp fee. Terms in a simple agreement." },
];

export const HOST_STEPS = [
  { title: "Talk to us", line: "By February for summer camps." },
  { title: "Train and prepare", line: "Two short sessions for your staff." },
  { title: "Run the camp", line: "We support every day, on call." },
  { title: "Grow into a partnership", line: "Parents who loved camp ask for it all year." },
];

/* ---------- Mission & CSR ---------- */

export type MissionTopicSlug = "schools" | "progress" | "csr";

export const MISSION_TOPICS: { slug: MissionTopicSlug; label: string; ta: string; title: string; intro: string; description: string }[] = [
  {
    slug: "schools",
    label: "Mission schools",
    ta: "மிஷன் பள்ளிகள்",
    title: "An AI curriculum in Tamil, for government schools.",
    intro: "An AI curriculum in Tamil first, offline first, Classes 3–8 first. Teachers trained free.",
    description: "Mission schools: the AI Flywheel curriculum for government and aided schools, in Tamil, built to work offline, with free teacher training.",
  },
  {
    slug: "progress",
    label: "Districts and progress",
    ta: "மாவட்ட முன்னேற்றம்",
    title: "District AI literacy progress, by level and stage.",
    intro: "District AI literacy progress is reported by what teachers can do and what children made, not by enrolments.",
    description: "How Mission districts report progress: teachers by level (C1–C3) and children’s work by stage, not enrolment counts.",
  },
  {
    slug: "csr",
    label: "Become a Mission Patron",
    ta: "மிஷன் புரவலர் ஆகுங்கள்",
    title: "CSR funding for AI education: fund a district, see what changes.",
    intro: "CSR funding for AI education, with cost per school published and outcomes reported by level, every term.",
    description: "Become a Mission Patron: fund AI literacy in government schools, with cost per school, outcomes by level and a district report each term.",
  },
];

export const getMissionTopic = (slug: string) => MISSION_TOPICS.find((t) => t.slug === slug);

export const MISSION_DELIVERY = [
  { title: "Tamil-first lessons", ta: "தமிழில் முதலில்", line: "Written in Tamil for Classes 3–8, not translated after." },
  { title: "Offline-first kits", ta: "இணையம் இல்லாமலும்", line: "Printed cards and worksheets for Classes 3–5. A local offline hub for each school cluster." },
  { title: "Teacher training, free", ta: "ஆசிரியர் பயிற்சி", line: "Every Mission teacher reaches Aware (C1), self-paced, in Tamil." },
];

export const MISSION_PARTNERS = ["School Education Department", "Samagra Shiksha", "District education offices", "Teacher training institutes (DIETs)"];

/** Illustrative only: the reporting format, not real results. */
export const PROGRESS_MOCK = [
  { district: "District A", schools: 24, levels: { C1: 52, C2: 14, C3: 3 }, stages: { foundation: 80, generative: 62, agentic: 35, physical: 18 } },
  { district: "District B", schools: 18, levels: { C1: 38, C2: 9, C3: 1 }, stages: { foundation: 72, generative: 50, agentic: 24, physical: 10 } },
];

/** Illustrative split of a Patron’s funds; actual cost per school is published in each district plan. */
export const PATRON_SPLIT = [
  { label: "Printed kits and robot sets", share: 35 },
  { label: "Teacher training and coaching", share: 30 },
  { label: "Offline hubs for school clusters", share: 20 },
  { label: "Reporting and independent checks", share: 15 },
];

export const PATRON_OUTCOMES = [
  { level: "Aware (C1)", line: "Teachers who can explain AI and run a lesson safely." },
  { level: "Practitioner (C2)", line: "Teachers who design lessons and check children’s work." },
  { level: "Builder (C3)", line: "Lead teachers who coach a cluster of schools." },
];
