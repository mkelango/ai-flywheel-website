/**
 * Content for AI Flywheel at Schools (aiflywheel.in/schools), taken from Website Strategy 2.0, section 03.
 * Programme names and price bands are from Ed 1.1; class bands and activities are a proposal.
 */

export { KIDS, WHATSAPP_URL } from "./contact";

export type StageKey = "foundation" | "generative" | "agentic" | "physical";

export const STAGE_META: { key: StageKey; verb: string; name: string; color: string }[] = [
  { key: "foundation", verb: "Know", name: "Foundation", color: "#3B4BA8" },
  { key: "generative", verb: "Make", name: "Generative", color: "#B8306F" },
  { key: "agentic", verb: "Do", name: "Agentic", color: "#D98B0B" },
  { key: "physical", verb: "Move", name: "Physical", color: "#13827F" },
];

export type Programme = {
  slug: "play" | "spark" | "practitioner" | "builders-club";
  name: string;
  short: string;
  classes: string;
  classRange: [number, number];
  line: string;
  stages: Record<StageKey, string>;
  aiUse: string;
  levels?: string;
  time: string;
  price: [number, number];
  tint: string;
  terms: { term: string; make: string }[];
  sample: { title: string; minutes: number; steps: string[]; check: string };
  training: string;
  reporting: string;
};

export const PROGRAMMES: Programme[] = [
  {
    slug: "play",
    name: "Flywheel Play",
    short: "Play",
    classes: "Classes 1–2",
    classRange: [1, 2],
    line: "Unplugged patterns, stories and a floor robot.",
    stages: {
      foundation: "Sort, match and find patterns in pictures",
      generative: "Make stories with picture cards; the teacher shows an AI picture and children spot what's wrong",
      agentic: "“Robot says”: give exact instructions",
      physical: "Move a floor robot along a path",
    },
    aiUse: "Unplugged. No AI accounts.",
    time: "About 20 sessions a year",
    price: [1500, 2000],
    tint: "#FFE39A",
    terms: [
      { term: "Term 1", make: "A pattern book of shapes and colours found around school" },
      { term: "Term 2", make: "A picture-card story, told to the class" },
      { term: "Term 3", make: "A floor-robot path through a paper town" },
    ],
    sample: {
      title: "Robot says: the sandwich game",
      minutes: 35,
      steps: ["Children give the teacher-robot steps to make a pretend sandwich", "The robot follows them exactly, and gets it funny-wrong", "Together they fix the steps and try again"],
      check: "Each child draws the three steps in order, with no screen.",
    },
    training: "One class teacher per section, trained to Aware (C1). Self-paced, in Tamil or English.",
    reporting: "A termly picture report: what each class made, by stage. No marks for Classes 1–2.",
  },
  {
    slug: "spark",
    name: "Flywheel Spark",
    short: "Spark",
    classes: "Classes 3–5",
    classRange: [3, 5],
    line: "Data hunts, robot recipes and block-coded robots. No AI accounts.",
    stages: {
      foundation: "Class data hunts: count, chart, compare",
      generative: "Teacher-led AI drawing and stories; children spot mistakes and unfair pictures",
      agentic: "“Robot recipes”: flowcharts for a helper",
      physical: "Block-coded robots and simple sensors",
    },
    aiUse: "Mostly unplugged. No student AI accounts.",
    time: "1 period a week",
    price: [2000, 3000],
    tint: "#DCEBFB",
    terms: [
      { term: "Term 1", make: "A class chart from a data hunt: favourite fruits, birds, or bus routes" },
      { term: "Term 2", make: "A robot recipe: a flowchart a helper could follow" },
      { term: "Term 3", make: "A block-coded robot that reacts to light or touch" },
    ],
    sample: {
      title: "Spot what's wrong in the AI picture",
      minutes: 40,
      steps: ["The teacher makes an AI picture of “a market in Madurai” on the class screen", "Children list what looks right, wrong or unfair", "They redraw one corner by hand, the way it really looks"],
      check: "A one-page ‘what I noticed’ sheet, done on paper.",
    },
    training: "Teachers trained to Aware (C1) before term one; Practitioner (C2) through the year.",
    reporting: "Termly report by class band and stage, with one piece of work per child for the portfolio.",
  },
  {
    slug: "practitioner",
    name: "Flywheel Practitioner",
    short: "Practitioner",
    classes: "Classes 6–8",
    classRange: [6, 8],
    line: "Make with AI, then check it, cite it and label it.",
    stages: {
      foundation: "Build a class dataset; train a simple image classifier",
      generative: "Make with AI, then check it, cite it and label it",
      agentic: "Design a helper agent on paper, then try it with supervision",
      physical: "Sensor projects: sort, measure, react",
    },
    aiUse: "Teacher-owned Studio accounts.",
    levels: "Aware (C1) → Practitioner (C2)",
    time: "1–2 periods a week",
    price: [2500, 3500],
    tint: "#FBDDEA",
    terms: [
      { term: "Term 1", make: "A class dataset and a simple image classifier that sorts leaves or litter" },
      { term: "Term 2", make: "An AI-assisted poster, checked, cited and labelled" },
      { term: "Term 3", make: "A sensor project that sorts, measures or reacts" },
    ],
    sample: {
      title: "Is the classifier fair?",
      minutes: 45,
      steps: ["Groups train a classifier on 40 photos they took of leaves", "They test it on leaves it has never seen", "They find where it fails, and why the data caused it"],
      check: "Explain one failure aloud, without the tool open.",
    },
    training: "Teachers reach Practitioner (C2): AI in lesson planning, safely, with a logged use.",
    reporting: "Termly report by class, level (C1–C2) and stage. Students earn Aware (C1).",
  },
  {
    slug: "builders-club",
    name: "Flywheel Builders Club",
    short: "Builders Club",
    classes: "Classes 9–12",
    classRange: [9, 12],
    line: "Real projects in AI Flywheel Studio, with a capstone.",
    stages: {
      foundation: "Test AI models in Tamil and English; read a model card",
      generative: "A school media pipeline with permissions and labels",
      agentic: "A supervised agent in Agentic Studio",
      physical: "Robotics with simulation first, then the lab",
    },
    aiUse: "Teacher-owned accounts until 18.",
    levels: "Practitioner (C2) → Builder (C3), school version",
    time: "Club + a capstone DRIVE turn",
    price: [3000, 4000],
    tint: "#D3EEEC",
    terms: [
      { term: "Term 1", make: "A Tamil–English model test, written up like a model card" },
      { term: "Term 2", make: "A supervised helper agent for a real school task" },
      { term: "Term 3", make: "A capstone: one full DRIVE turn, shown at the Annual Showcase" },
    ],
    sample: {
      title: "Does it understand Tamil?",
      minutes: 80,
      steps: ["Students write 20 test questions in Tamil and English", "They run them through two models in Studio", "They score the answers and write a one-page model card"],
      check: "Defend one score in a short oral review.",
    },
    training: "A club lead at Practitioner (C2), working towards Builder (C3).",
    reporting: "Termly report by level (C2–C3), plus capstone records the school can share with parents.",
  },
];

export const getProgramme = (slug: string) => PROGRAMMES.find((p) => p.slug === slug);

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
export const band = ([a, b]: [number, number]) => `${inr(a)}–${b.toLocaleString("en-IN")}`;

export const PROMISES = [
  { title: "Curious", line: "Children make stories, datasets, helper bots and moving robots." },
  { title: "Careful", line: "They check, question and play fair. One check without AI in every project." },
  { title: "Capable", line: "Real projects, real levels (C1 to C3), progress your school can report." },
];

export const SAFETY = [
  { title: "No AI accounts for Classes 3–5", line: "Teachers demonstrate. Children make things offline." },
  { title: "Teacher-owned accounts for older students", line: "Until they turn 18." },
  { title: "Parents’ consent first", line: "Verified, before any child’s data is collected." },
  { title: "Data stays in India", line: "Children’s data is never used to train AI models." },
  { title: "No tracking, profiling or ads", line: "No third-party pixels anywhere on this site." },
  { title: "Photos only with written consent", line: "Showcases show first name and class only." },
];

export const PARTNERSHIP = [
  { icon: "book", title: "Curriculum and lesson kits", line: "For every class band" },
  { icon: "cap", title: "Teacher training", line: "To Practitioner (C2); C1 free for all" },
  { icon: "report", title: "Assessments and a school report", line: "Termly, by class, level and stage" },
  { icon: "trophy", title: "Flywheel Day and the Challenge", line: "One school day, one inter-school event" },
  { icon: "heart", title: "A parent pack", line: "And one parent session a year" },
  { icon: "lab", title: "Optional Spark Lab", line: "Starter, Standard or Advanced" },
] as const;

export const JOURNEY = [
  { n: 1, title: "School Flywheel Check", line: "A 15-minute online check for leaders, with an instant report.", href: "/check", cta: "Take the check" },
  { n: 2, title: "Demo", line: "On site or online. A sample lesson with your own students.", href: "/demo", cta: "Book a demo" },
  { n: 3, title: "Pilot one grade band", line: "One term, one band, with a teacher trained to Aware (C1).", href: "/pilot", cta: "Ask about a pilot" },
  { n: 4, title: "Annual partnership", line: "All bands, teachers to Practitioner (C2), events and a school report.", href: "/partnership", cta: "What’s included" },
  { n: 5, title: "Spark Lab", line: "Add a lab: Starter, Standard or Advanced.", href: "/lab", cta: "See lab tiers" },
  { n: 6, title: "AI Flywheel School mark", line: "Aware, Practitioner, then Builder. Renewed every year.", href: "/mark", cta: "See the criteria" },
];

export const MARK = [
  { level: "Aware", items: ["All teachers at Aware (C1)", "The programme running in at least one class band"] },
  { level: "Practitioner", items: ["Half the teachers at Practitioner (C2)", "Every class band covered", "A yearly Flywheel Day"] },
  { level: "Builder", items: ["A Spark Lab", "A quarter of teachers at Builder (C3)", "A Builders Club capstone showcase"] },
];

export const LAB_TIERS = [
  {
    key: "starter",
    name: "Starter",
    price: "₹1–2 lakh",
    classes: "Classes 1–5",
    line: "Unplugged kits, floor robots and a teacher screen.",
    kit: ["Floor robots and path mats", "Picture and pattern card sets", "One teacher device and projector link", "Printed lesson kits"],
    studio: "Teacher-led demos only",
    offline: false,
  },
  {
    key: "standard",
    name: "Standard",
    price: "₹3–6 lakh",
    classes: "Classes 1–8",
    line: "Block-coded robots, sensors and shared devices.",
    kit: ["Everything in Starter", "Block-coded robot kits and sensors", "Shared student devices (teacher-owned accounts)", "An offline hub for low-connectivity days"],
    studio: "Generative and Model Studio, school version (FY28); teacher demos until then",
    offline: true,
  },
  {
    key: "advanced",
    name: "Advanced",
    price: "₹8–25 lakh",
    classes: "Classes 1–12",
    line: "Robotics, simulation and a Builders Club space.",
    kit: ["Everything in Standard", "Robot arms and mobile robots", "Simulation-ready workstations", "Capstone and showcase corner"],
    studio: "Agentic Studio from Feb 2027; Model, Generative and Robotic Studio in FY28",
    offline: true,
  },
];

export const BOARDS = [
  { board: "CBSE", detail: "Based on Computational Thinking and AI for Classes 3–8 (from 2026–27).", note: "What we cover, and what we add." },
  { board: "ICSE", detail: "Based on CISCE Computer Studies (Classes 1–8) and Computer Applications (Classes 9–10), class by class.", note: "What we cover, and what we add. Proposed." },
  { board: "TN State Board", detail: "Based on the Tamil Nadu State Board syllabus, taught in Tamil or English.", note: "Tamil-first lesson kits." },
];

export const KIDS_PRODUCTS = [
  {
    id: "summer-camp",
    name: "Kids Summer Camp",
    format: "2 weeks in April–May · 2–3 hours a day",
    who: "Classes 3–5 and 6–8, in separate groups",
    takeHome: "A finished project, a printed certificate and a family Showcase Day",
    price: "₹4,000–7,500",
    color: "#F2B705",
    emoji: "sun",
  },
  {
    id: "weekend-club",
    name: "Kids Weekend Club",
    format: "A school term of Saturdays · 2 hours a week",
    who: "Classes 3–8",
    takeHome: "A project each month; Classes 6–8 can earn Aware (C1)",
    price: "₹6,000–9,000 a term",
    color: "#2F7FD8",
    emoji: "calendar",
  },
  {
    id: "bootcamp",
    name: "Kids Holiday Bootcamp",
    format: "3–5 days in the Pongal, Diwali or Christmas break",
    who: "Classes 3–8",
    takeHome: "One themed build: a robot, a story or a helper bot",
    price: "₹2,500–4,000",
    color: "#13827F",
    emoji: "bot",
  },
  {
    id: "at-home",
    name: "Kids at Home",
    format: "Printable, unplugged activity packs with a parent guide",
    who: "Families, in Tamil and English",
    takeHome: "Screen-light activities to do together",
    price: "Free sampler · ₹499–999 a pack",
    color: "#B8306F",
    emoji: "house",
  },
] as const;

export const CITIES = ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"] as const;
export type City = (typeof CITIES)[number];

export const CAMPS: Record<City, { place: string; area: string; product: string; dates: string; classes: string }[]> = {
  Chennai: [
    { place: "A partner school", area: "Adyar", product: "Kids Summer Camp", dates: "14–25 April 2027", classes: "Classes 3–5" },
    { place: "A learning centre", area: "Anna Nagar", product: "Kids Summer Camp", dates: "5–16 May 2027", classes: "Classes 6–8" },
    { place: "A partner school", area: "Velachery", product: "Kids Weekend Club", dates: "Saturdays from June 2027", classes: "Classes 3–8" },
  ],
  Coimbatore: [
    { place: "A partner school", area: "RS Puram", product: "Kids Summer Camp", dates: "21 April – 2 May 2027", classes: "Classes 3–5" },
    { place: "A learning centre", area: "Saravanampatti", product: "Kids Holiday Bootcamp", dates: "Diwali break 2027", classes: "Classes 3–8" },
  ],
  Madurai: [
    { place: "A partner school", area: "KK Nagar", product: "Kids Summer Camp", dates: "28 April – 9 May 2027", classes: "Classes 6–8" },
    { place: "A partner school", area: "Anna Nagar", product: "Kids Holiday Bootcamp", dates: "Pongal break 2028", classes: "Classes 3–8" },
  ],
  Tiruchirappalli: [{ place: "A partner school", area: "Thillai Nagar", product: "Kids Summer Camp", dates: "5–16 May 2027", classes: "Classes 3–5" }],
};

