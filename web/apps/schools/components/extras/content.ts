/**
 * Content for the Trust centre sub-pages (/trust/[page]) and the printable parent guides (/parents/guide/[slug]).
 * Trust documents are drafts: the DPDP processor model needs a legal opinion before these are published as final.
 */

/* ---------- Trust centre ---------- */

export type TrustSlug = "children-privacy" | "processing-terms" | "ai-register" | "grievance";

export const TRUST_PAGES: { slug: TrustSlug; label: string; title: string; intro: string; description: string }[] = [
  {
    slug: "children-privacy",
    label: "Privacy notice for children",
    title: "Children’s privacy notice, in plain words.",
    intro: "Our children’s privacy notice is for children, and for the grown-ups who look after them. Short sentences. No small print.",
    description: "The AI Flywheel privacy notice for children, in plain words: what we keep, why, for how long, and how parents can see or delete it.",
  },
  {
    slug: "processing-terms",
    label: "Data processing terms for schools",
    title: "Data processing terms for schools: the school decides.",
    intro: "Under our data processing terms for schools, your school is the data fiduciary and AI Flywheel is the school’s data processor. Subject to legal review.",
    description: "Data processing terms for partner schools: the school is the data fiduciary under the DPDP Act and AI Flywheel the processor. Subject to legal review.",
  },
  {
    slug: "ai-register",
    label: "AI feature register",
    title: "AI feature register: every AI feature, listed.",
    intro: "Our AI feature register shows who can use each feature, by class band, what data it uses and where a person stays in charge.",
    description: "The AI feature register for AI Flywheel at Schools: each AI feature, the class bands that can use it, the data it uses and the human oversight.",
  },
  {
    slug: "grievance",
    label: "Grievance officer and incident contact",
    title: "Grievance officer: raise a concern, a person answers.",
    intro: "How to reach our grievance officer when something is wrong, and how quickly we reply.",
    description: "How parents and schools raise a concern with the AI Flywheel grievance officer, report an incident, and the response times we propose.",
  },
];

export const getTrustPage = (slug: string) => TRUST_PAGES.find((p) => p.slug === slug);

export const AI_REGISTER: { feature: string; what: string; bands: { band: string; use: string }[]; data: string; oversight: string }[] = [
  {
    feature: "Teacher demo screen",
    what: "The teacher shows an AI picture or answer on one class screen.",
    bands: [
      { band: "Classes 1–5", use: "Teacher only" },
      { band: "Classes 6–12", use: "Teacher only" },
    ],
    data: "The teacher’s prompt. No child data.",
    oversight: "The teacher chooses every prompt and checks the output before showing it.",
  },
  {
    feature: "Generative Studio (school version)",
    what: "Make pictures, stories and posters with AI, then check and label them.",
    bands: [
      { band: "Classes 1–5", use: "Not available" },
      { band: "Classes 6–8", use: "Teacher-owned accounts" },
      { band: "Classes 9–12", use: "Teacher-owned accounts" },
    ],
    data: "Prompts and the work made. Stored in India; never used to train models.",
    oversight: "Content filters on every prompt. The teacher sees all work and can remove it.",
  },
  {
    feature: "Model Studio",
    what: "Build a small class dataset and train a simple image classifier.",
    bands: [
      { band: "Classes 1–5", use: "Not available" },
      { band: "Classes 6–8", use: "Teacher-led, one class account" },
      { band: "Classes 9–12", use: "Teacher-owned accounts" },
    ],
    data: "Pictures of objects the class collects. No faces.",
    oversight: "The teacher approves the dataset before training. A check without AI follows.",
  },
  {
    feature: "Agentic Studio",
    what: "Design a helper agent on paper, then try it under supervision.",
    bands: [
      { band: "Classes 1–8", use: "Not available" },
      { band: "Classes 9–12", use: "Supervised, teacher-owned accounts" },
    ],
    data: "The agent’s steps and test runs. No personal data in tasks.",
    oversight: "Agents run only in a sandbox. The teacher starts and stops every run.",
  },
  {
    feature: "Lesson planning help for teachers",
    what: "Teachers draft lesson ideas and worksheets with AI.",
    bands: [{ band: "Teachers", use: "Teacher accounts" }],
    data: "The teacher’s planning notes. No student names.",
    oversight: "The teacher edits and owns the final lesson.",
  },
];

/* ---------- Parent guides ---------- */

export type GuideSlug = "talking-about-ai-at-dinner" | "spotting-fakes" | "homework-and-honesty" | "screens-for-making";

export const PARENT_GUIDES: {
  slug: GuideSlug;
  title: string;
  ta: string;
  classes: string;
  line: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string; points?: string[] }[];
  tryThis: string;
}[] = [
  {
    slug: "talking-about-ai-at-dinner",
    title: "Talking about AI at dinner",
    ta: "இரவு உணவின் போது AI பற்றி பேசுவோம்",
    classes: "For Classes 3–12",
    line: "Five questions to ask your child this week.",
    description: "A five-minute guide for parents: five questions to start a calm, curious talk about AI at the dinner table, for Classes 3–12.",
    intro:
      "You do not need to know how AI works to talk about it. Children in Classes 3–5 love explaining what a machine got wrong. By Classes 9–12, they have opinions. Your job is to ask, and to listen.",
    sections: [
      {
        heading: "Five questions to try",
        body: "Pick one a night. Keep it light.",
        points: [
          "What did a machine guess wrong today? (Classes 3–5 enjoy this one.)",
          "Who do you think made that app, and why?",
          "If you trained a robot, what would you teach it first?",
          "When is it better to ask a person than a machine? (Classes 6–8)",
          "Should AI be allowed to write your essay? Why, or why not? (Classes 9–12)",
        ],
      },
      {
        heading: "If you get stuck",
        body:
          "Share one way you use AI yourself: a map, a translator, a phone that fixes your spelling. Children in Classes 1–5 learn mostly offline at school, so a story from your day helps them link the lesson to real life.",
      },
      {
        heading: "What to avoid",
        body: "Avoid testing or quizzing. This is a talk, not homework. If your child in Classes 6–12 says something worrying, stay calm and ask what they saw.",
      },
    ],
    tryThis: "This week: ask question one tonight, and let your child ask you one back.",
  },
  {
    slug: "spotting-fakes",
    title: "Spotting fakes together",
    ta: "போலியைக் கண்டுபிடிப்போம்",
    classes: "For Classes 5–12",
    line: "Pictures, voices and news: what to look for.",
    description: "A short guide for parents and children in Classes 5–12: how to spot AI-made pictures, voices and news, and what to do before sharing.",
    intro:
      "From Class 5, children see AI-made pictures and videos every day. They learn at school to question them. At home, you can practise together, like a puzzle.",
    sections: [
      {
        heading: "Look closely at pictures",
        body: "Children in Classes 5–8 are often better at this than adults.",
        points: ["Hands and fingers: count them.", "Writing in the picture: is it real words?", "Shadows and light: do they match?", "Ears, glasses and jewellery: do both sides match?"],
      },
      {
        heading: "Ask where it came from",
        body: "For Classes 7–12: who posted it first? Is there a name, a date, a real news source? If nobody can say, treat it as unknown.",
      },
      {
        heading: "Voices and calls",
        body:
          "AI can copy a voice. Agree a family code word, and always call back on a number you know. Never share an OTP, even with someone who sounds like family. This one is for every age.",
      },
    ],
    tryThis: "This week: find one picture online together and play ‘real or fake?’. Check one other source before deciding.",
  },
  {
    slug: "homework-and-honesty",
    title: "Homework and honesty",
    ta: "வீட்டுப்பாடமும் நேர்மையும்",
    classes: "For Classes 6–12",
    line: "When AI help is fine, and when it is not.",
    description: "A guide for parents of children in Classes 6–12: when AI help with homework is fine, when it is not, and how to talk about honesty.",
    intro:
      "From Class 6, many children can reach an AI tool at home. At school, every project ends with a check done without AI. At home, the same idea works: the help is fine, the thinking must be theirs.",
    sections: [
      {
        heading: "Usually fine",
        body: "For Classes 6–12, AI can be a patient tutor.",
        points: ["Explaining a hard idea in simpler words", "Giving practice questions to try", "Checking spelling after the work is written"],
      },
      {
        heading: "Not fine",
        body: "Copying an AI answer and handing it in as their own. Asking AI to write the whole essay or solve the whole sum. Teachers in Classes 9–12 will ask students to explain their work aloud.",
      },
      {
        heading: "The honest habit",
        body:
          "If AI helped, say so. Ask your child to show you one part done without AI: a sum worked on paper, a paragraph in their own words. Praise the honesty, not only the answer.",
      },
    ],
    tryThis: "This week: ask your child in Classes 6–12 to explain one homework answer to you without looking at a screen.",
  },
  {
    slug: "screens-for-making",
    title: "Screens for making, not scrolling",
    ta: "திரை படைப்பதற்கே",
    classes: "For Classes 1–12",
    line: "Simple house rules that keep screens useful.",
    description: "A guide for parents: simple house rules so screens are used for making things, not scrolling, with what is right for Classes 1–5, 6–8 and 9–12.",
    intro:
      "At school, Classes 1–5 learn about AI mostly offline, with cards, paper and floor robots. Older classes use screens to make things. Home can follow the same rule: ask what they made, not how long they spent.",
    sections: [
      {
        heading: "By age",
        body: "A rough guide. Your family decides.",
        points: [
          "Classes 1–5: mostly unplugged. Drawing, building, telling stories. A grown-up nearby for any screen time.",
          "Classes 6–8: short screen sessions with a goal, like making a comic or a poster. Devices in shared rooms.",
          "Classes 9–12: longer projects are fine. Agree a stop time, and no phones at meals.",
        ],
      },
      {
        heading: "Making or scrolling?",
        body:
          "A simple test for every age: at the end, is there something to show? A story, a drawing, a short video they planned. If the answer is ‘no, I just watched’, it was scrolling.",
      },
      {
        heading: "Make one thing together",
        body: "Children in Classes 3–8 love teaching a parent. Let them show you how they would build a robot or a picture story. You do the typing; they give the instructions.",
      },
    ],
    tryThis: "This week: at dinner, ask ‘What did you make today?’ instead of ‘How long were you on the phone?’",
  },
];

export const getGuide = (slug: string) => PARENT_GUIDES.find((g) => g.slug === slug);
