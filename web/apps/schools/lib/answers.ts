/**
 * "Quick answers": short, answer-first Q&A for people, search and answer engines.
 * Each answer is 35–60 words and states only what the site already says (prices are Ed 1.1 bands or Proposed).
 * Keyed by path; a page renders its set with <QuickAnswers> and one FAQPage JSON-LD.
 */
import type { QA } from "@/components/seo";

export const ANSWERS: Record<string, QA[]> = {
  "/": [
    {
      q: "What is the best AI curriculum for schools in India?",
      a: "Look for one that runs class by class, fits your board, trains your teachers and keeps children safe. AI Flywheel covers Classes 1–12 for CBSE, ICSE and State Board schools, in Tamil and English, with lesson kits, teacher training from Aware (C1) and no AI accounts for Classes 3–5.",
    },
    {
      q: "Which classes can learn AI at school?",
      a: "Every class, from Class 1 to 12, at the right level. Classes 1–2 learn unplugged with patterns, stories and a floor robot. Classes 3–5 run data hunts and code robots. Classes 6–8 make with AI on teacher-owned accounts. Classes 9–12 build real projects in a club, with a capstone.",
    },
    {
      q: "Is the AI curriculum available in Tamil?",
      a: "Yes. Lesson kits, worksheets, parent guides and Aware (C1) teacher training come in Tamil and English. For Tamil Nadu State Board and Mission schools, lessons are written in Tamil first, not translated after. Builders Club students in Classes 9–12 also test AI models in Tamil and English.",
    },
    {
      q: "How does a school start an AI programme?",
      a: "Take the free 15-minute School Flywheel Check, then book a 45-minute demo lesson with your own students. Most schools then pilot one grade band for one term, with a teacher trained to Aware (C1), before moving to the annual School Flywheel Partnership for Classes 1–12.",
    },
  ],

  "/programmes": [
    {
      q: "What do children learn in AI from Class 1 to 12?",
      a: "All four stages at every age: Know, Make, Do and Move. Classes 1–2 find patterns and steer a floor robot. Classes 3–5 chart data and code robots. Classes 6–8 train a simple classifier and check AI output. Classes 9–12 test AI models and build a capstone project.",
    },
    {
      q: "How many periods a week does AI need?",
      a: "It depends on the class. Flywheel Play (Classes 1–2) is about 20 sessions a year. Spark (Classes 3–5) takes one period a week, and Practitioner (Classes 6–8) one or two. Builders Club (Classes 9–12) runs as a club plus a capstone. We fit it to your timetable.",
    },
    {
      q: "What are the four stages of the AI Flywheel?",
      a: "Know, Make, Do and Move. Know is Foundation AI: data, patterns and how machines learn. Make is Generative AI: making with AI, then checking it. Do is Agentic AI: clear, fair steps for a helper. Move is Physical AI: robots and sensors. Every class from 1 to 12 learns all four.",
    },
  ],

  "/programmes/play": [
    {
      q: "Should Class 1 children learn AI?",
      a: "Yes, in a playful, unplugged way. In Classes 1 and 2 (ages 6–7), children sort and match patterns, tell picture-card stories and give exact steps to a floor robot. They learn that machines follow instructions and can get things wrong, long before they use any AI tool themselves.",
    },
    {
      q: "Do Class 1–2 children use screens for AI?",
      a: "No. Flywheel Play is unplugged: cards, paper and a floor robot, with no AI accounts. At most, the teacher shows one AI picture on the class screen so children can spot what is wrong. Children in Classes 1–2 never log in to any AI tool.",
    },
    {
      q: "Are there marks for AI in Classes 1–2?",
      a: "No. There are no marks for Classes 1–2. Instead, the school gets a termly picture report showing what each class made, by stage. Each lesson still ends with a simple check done without AI, such as each child drawing three robot steps in order on paper.",
    },
  ],

  "/programmes/spark": [
    {
      q: "What should Class 3 to 5 students learn about AI?",
      a: "How machines use data and follow steps, and how to spot when AI gets it wrong. Children in Classes 3, 4 and 5 (ages 8–10) run class data hunts, draw flowcharts as robot recipes, code block-based robots with sensors, and find mistakes and unfairness in AI pictures their teacher makes.",
    },
    {
      q: "Do Classes 3–5 use AI accounts?",
      a: "No. Children in Classes 3, 4 and 5 have no AI accounts. The teacher demonstrates AI on one class screen, and children make things on paper and with robots. Each lesson ends with a short check done without AI, such as a one-page ‘what I noticed’ sheet.",
    },
    {
      q: "How many periods a week for AI in Class 3?",
      a: "One period a week for Classes 3–5. Each term ends with something children made: a class chart from a data hunt in Term 1, a robot recipe in Term 2 and a block-coded robot that reacts to light or touch in Term 3. Teachers reach Aware (C1) before term one.",
    },
  ],

  "/programmes/practitioner": [
    {
      q: "What AI projects can Class 6–8 students do?",
      a: "Students in Classes 6, 7 and 8 (ages 11–13) build a class dataset and train a simple image classifier, make an AI-assisted poster that they check, cite and label, and finish a sensor project that sorts, measures or reacts. They also design a helper agent on paper, then try it with supervision.",
    },
    {
      q: "Can middle school students use generative AI safely?",
      a: "Yes, with the right rules. Classes 6–8 use AI Flywheel Studio on teacher-owned accounts, only after verified parent consent. Data stays in India and is never used to train AI models. Students learn to check, cite and label anything AI helped make, and every project ends with one check without AI.",
    },
    {
      q: "What is the Aware (C1) level for students?",
      a: "Aware (C1) is the first of three levels: Aware (C1), Practitioner (C2) and Builder (C3). Students in Classes 6–8 can earn it in Flywheel Practitioner, using the same level words as their teachers. The school’s termly report shows students by level and stage, never as a ranking.",
    },
  ],

  "/programmes/builders-club": [
    {
      q: "What is a school AI club?",
      a: "A school AI club is a regular space where older students build real AI projects. Flywheel Builders Club runs for Classes 9–12 (ages 14–17) in AI Flywheel Studio, led by a teacher at Practitioner (C2), and ends with a capstone project shown to families at the Annual Showcase.",
    },
    {
      q: "What AI capstone projects can Class 9–12 students build?",
      a: "A capstone is one full DRIVE turn: spot a real problem, gather what is needed, make it, test it for fairness, then share it. Students build on their club work, such as testing AI models in Tamil and English, a supervised helper agent for a school task, or a robot simulated first.",
    },
    {
      q: "How do students reach Builder (C3)?",
      a: "Builders Club moves students in Classes 9–12 from Practitioner (C2) towards Builder (C3), school version. They earn it with real work: a model test, a supervised agent and a capstone, each ending with a check without AI, such as defending a score in a short oral review.",
    },
  ],

  "/programmes/boards": [
    {
      q: "What is the CBSE Computational Thinking and AI curriculum?",
      a: "It is CBSE’s subject for Classes 3–8, from the 2026–27 session. It teaches patterns, data, step-by-step thinking and what AI is. News reports say CBSE developed it with an expert committee including IIT Madras. Always check CBSE’s own published documents for the final syllabus.",
    },
    {
      q: "When does CBSE AI for Classes 3–8 start?",
      a: "From the 2026–27 academic session, for Classes 3 to 8 in CBSE schools. Our Spark programme (Classes 3–5) and Practitioner programme (Classes 6–8) are mapped to it, so a school can start with one class band for a term and add the rest from the next June.",
    },
    {
      q: "Is AI part of the ICSE or TN State Board syllabus?",
      a: "Both boards teach computing, and we add the AI. For ICSE we build on CISCE Computer Studies (Classes 1–8) and Computer Applications (Classes 9–10). For the Tamil Nadu State Board we build on computer science and ICT, with Tamil-first kits. Both maps are Proposed until your coordinator reviews them.",
    },
    {
      q: "How does AI Flywheel map to CBSE?",
      a: "For CBSE Classes 3–8 we cover patterns, sorting and data, step-by-step instructions and flowcharts, and what AI is and where it goes wrong. We add robots and sensors, one check without AI in every project, and lesson kits in Tamil and English. The map is based on the syllabus, not an accreditation.",
    },
  ],

  "/for-schools": [
    {
      q: "How can a school introduce AI education?",
      a: "In six steps: a 15-minute School Flywheel Check, a 45-minute demo lesson, a one-term pilot in one grade band, the annual School Flywheel Partnership, an optional Spark Lab, then the AI Flywheel School mark. Most schools start small, with one class band and one trained teacher.",
    },
    {
      q: "What does an AI programme for schools include?",
      a: "The School Flywheel Partnership includes lesson kits for every class band, Classes 1–12, in Tamil and English; teacher training with Aware (C1) free for every teacher; a termly school report; Flywheel Day and the Inter-school Challenge; and a parent pack. Spark Lab is optional and quoted separately.",
    },
    {
      q: "How long does it take to start AI in a school?",
      a: "A pilot takes one term. Schools usually plan in October–December, set budgets in January–April and train teachers to Aware (C1) in April–May, ready for the June term. A pilot can start next term with one class band and one teacher trained before it begins.",
    },
  ],

  "/partnership": [
    {
      q: "What is included in the School Flywheel Partnership?",
      a: "Curriculum and lesson kits for Classes 1–12 in Tamil and English, Teacher Flywheel training, a termly school report by class band, level and stage, Flywheel Day and the Inter-school Challenge, and a parent pack with one parent session a year. It is priced per student a year.",
    },
    {
      q: "Is teacher training included?",
      a: "Yes. Aware (C1) is free for every teacher in a partner school, self-paced in Tamil or English. Training to Practitioner (C2) is included for partnership teachers. Workshops run every term, starting with an April–May training window before the June term.",
    },
    {
      q: "Do parents get a report?",
      a: "The termly report goes to the school, by class band, level and stage, never ranking children. Parents get a parent pack explaining what each class learns, one parent session a year, and, for Classes 9–12, capstone records the school can share with families.",
    },
  ],

  "/lab": [
    {
      q: "How much does an AI lab for a school cost?",
      a: "Spark Lab comes in three tiers (Ed 1.1 bands, excl. GST): Starter ₹1–2 lakh for Classes 1–5, Standard ₹3–6 lakh for Classes 1–8 and Advanced ₹8–25 lakh for Classes 1–12. These are one-time set-up estimates. We quote each school after a visit to see rooms, power and network.",
    },
    {
      q: "What is the difference between an AI lab and a robotics lab?",
      a: "A robotics lab holds robots and kits. Spark Lab adds AI: as well as floor robots, block-coded robots and sensors, it has devices that run AI Flywheel Studio for data, generative AI and agents. Agentic Studio arrives from February 2027; until each studio arrives, teachers demonstrate.",
    },
    {
      q: "Which lab tier suits Classes 1–5?",
      a: "Starter, at ₹1–2 lakh (excl. GST). It has floor robots and path mats, picture and pattern cards, one teacher device with a projector link and printed lesson kits. Children in Classes 1–5 have no AI accounts, so a teacher screen is enough. Upgrade to Standard when Classes 6–8 join.",
    },
  ],

  "/pricing": [
    {
      q: "How much does an AI curriculum cost per student?",
      a: "Per student a year (Ed 1.1 bands, excl. GST): Flywheel Play ₹1,500–2,000 for Classes 1–2, Spark ₹2,000–3,000 for Classes 3–5, Practitioner ₹2,500–3,500 for Classes 6–8 and Builders Club ₹3,000–4,000 for Classes 9–12. Kits, teacher training, the termly report and events are included.",
    },
    {
      q: "Is GST included in the price?",
      a: "No. Every price on this site is shown excluding GST, which is added to the invoice at the rate that applies. That covers the per-student bands for each programme and the one-time Spark Lab set-up bands of ₹1–2 lakh, ₹3–6 lakh and ₹8–25 lakh.",
    },
    {
      q: "How is a school quoted?",
      a: "After a 45-minute demo, on site or online. Your quote depends on the class bands you choose and the number of students in each, plus a Spark Lab tier if you want one. The estimator on this page gives a first figure; nothing you enter is sent.",
    },
  ],

  "/pilot": [
    {
      q: "Can a school try AI education before committing?",
      a: "Yes. The pilot runs AI Flywheel in one class band for one term, with one teacher trained to Aware (C1) before you start. You see what your children make and get a report, then decide together whether to move to the annual School Flywheel Partnership.",
    },
    {
      q: "How long is the pilot?",
      a: "One school term, one period a week, fitted to your timetable. Before term, we train the teacher to Aware (C1) and set the timetable. During term, the teacher teaches the kit with our support. At the end of term, you get the report and see the work.",
    },
    {
      q: "What does the school get at the end of the pilot?",
      a: "An end-of-term report by class and stage, the work your children made, and a review meeting to decide what comes next. The pilot includes the lesson kits and assessment guide for that term. Safety rules are the same as the full programme: no AI accounts for Classes 3–5.",
    },
  ],

  "/demo": [
    {
      q: "How long is an AI lesson demo?",
      a: "About 45 minutes. We teach a sample lesson for the class band you choose, from Classes 1–2 to Classes 9–12, with your own students. Every sample lesson ends with one check done without AI, so you can see what children understood, not just what a tool did.",
    },
    {
      q: "Is the demo on site or online?",
      a: "Either. We can come to your school or run the sample lesson online, whichever suits your timetable. We bring the class-by-class curriculum map for your board, a sample lesson kit and a price estimate per student, so leaders can decide what to try next.",
    },
    {
      q: "Is there any obligation after the demo?",
      a: "No. There is no obligation. Many schools follow it with a one-term pilot in one grade band, but that is your choice. The booking form asks for adult details only, never a child’s, and there is no tracking on this site.",
    },
  ],

  "/check": [
    {
      q: "How do I know if my school is ready for AI?",
      a: "Take the School Flywheel Check. Six questions for principals and correspondents give an instant report on where your school stands and a suggested next step. You do not need a lab or AI experts to start: most schools begin with one class band for one term.",
    },
    {
      q: "What does the School Flywheel Check cover?",
      a: "Six areas a school leader can answer quickly: curriculum, teachers, safety, parents, space and timetable. The report shows how ready each area is and what to do next, such as booking a demo lesson, piloting one grade band or training teachers to Aware (C1).",
    },
    {
      q: "How long does the check take?",
      a: "About 15 minutes, with no sign-up. You answer six questions and see your report straight away on the page. Nothing is tracked. If you want to talk it through, book a 45-minute demo lesson with your own students, on site or online.",
    },
  ],

  "/mark": [
    {
      q: "How can a school be recognised for AI education?",
      a: "With the AI Flywheel School mark. A partner school earns it by meeting the criteria for a level during the school year, sharing the evidence, then showing the mark on its website, linked back to us. The criteria are Proposed and will be confirmed before the first marks are awarded.",
    },
    {
      q: "What are the Aware, Practitioner and Builder levels?",
      a: "Aware: all teachers at Aware (C1) and the programme running in at least one class band. Practitioner: half the teachers at Practitioner (C2), every class band covered and a yearly Flywheel Day. Builder: a Spark Lab, a quarter of teachers at Builder (C3) and a Builders Club capstone showcase.",
    },
    {
      q: "How often is the mark renewed?",
      a: "Every year. The mark is earned each school year, not bought once. Each record shows when it was issued and when it must be renewed, and parents can check a school’s mark on our verify page. A school can move up a level as more teachers and classes join.",
    },
  ],

  "/teachers": [
    {
      q: "How can teachers learn to teach AI?",
      a: "Through Teacher Flywheel. Teachers start at Aware (C1), self-paced in Tamil or English, then teach from ready-made lesson kits for their class band. Workshops run every term, from an April–May training window to mid-year clinics, and a moderated community shares a free lesson every month.",
    },
    {
      q: "Is AI training free for teachers?",
      a: "Aware (C1) is free for every teacher in a partner school. Practitioner (C2) is included for teachers in a School Flywheel Partnership. Builder (C3) is for lead teachers and club leads. No teacher needs to be an AI expert on day one.",
    },
    {
      q: "Can teachers train in Tamil?",
      a: "Yes. Aware (C1) is self-paced in Tamil or English, and the lesson kits, worksheets and assessment guides come in both languages. Workshops and the teacher community also run in Tamil and English, so teachers in Tamil-medium and State Board schools can train in their own language.",
    },
  ],

  "/teachers/flywheel": [
    {
      q: "What AI certification can a school teacher get?",
      a: "Teacher Flywheel has three levels: Aware (C1), Practitioner (C2) and Builder (C3). Each is earned with real work and issued as an Open Badges 3.0 credential that anyone can verify on this site. It is AI Flywheel’s own certification, not a CBSE or NCERT one.",
    },
    {
      q: "How is the Aware (C1) level assessed?",
      a: "By a scenario quiz taken without AI. Teachers study Aware (C1) at their own pace, in Tamil or English, then take the quiz on their own, with no AI tool open. C1 is free for every teacher in a partner school, and the credential is an Open Badges 3.0 badge.",
    },
    {
      q: "How does a teacher go from C1 to C3?",
      a: "Aware (C1) comes first. Practitioner (C2) shows safe use of AI in lesson planning: a logged use, plus the same task done unaided. Builder (C3) means redesigning one unit, teaching it and reviewing it with a mentor. Teachers at Leader (C4) can become Knowledge Partners.",
    },
  ],

  "/parents": [
    {
      q: "Why are schools teaching AI to children?",
      a: "Because children already meet AI in apps, videos and homework help. At school they learn to make things with it and to question it: check facts, spot fakes and use it honestly. CBSE is also bringing Computational Thinking and AI into Classes 3–8 from 2026–27.",
    },
    {
      q: "What will my child make with AI?",
      a: "Something real each term. Classes 1–2 make a pattern book and a floor-robot path. Classes 3–5 make a class chart and a block-coded robot. Classes 6–8 train a simple image classifier and make a checked, labelled poster. Classes 9–12 test AI in Tamil and English and build a capstone.",
    },
    {
      q: "How much does the school programme cost parents?",
      a: "Your school decides. We charge the school a yearly band per student, from ₹1,500–2,000 for Classes 1–2 to ₹3,000–4,000 for Classes 9–12 (excl. GST). The school chooses whether that is part of the annual fee or charged separately. AI Flywheel Kids camps are separate and optional.",
    },
    {
      q: "Is it safe for my child?",
      a: "Yes, by design. Children in Classes 3–5 have no AI accounts. Older students use teacher-owned accounts until 18, only after your verified consent. Data stays in India and is never used to train AI models. There is no tracking, profiling or ads, and photos need written consent.",
    },
  ],

  "/parents/learning": [
    {
      q: "What will my child learn about AI in Class 4?",
      a: "Class 4 is in Flywheel Spark (Classes 3–5), one period a week with no AI accounts. Your child runs a class data hunt and makes a chart, draws a robot recipe as a flowchart, codes a robot that reacts to light or touch, and spots mistakes in AI pictures the teacher shows.",
    },
    {
      q: "What do children make with AI each term?",
      a: "Three terms, three finished pieces of work. For example, Classes 6–8 make a class dataset and image classifier in Term 1, a checked and labelled AI-assisted poster in Term 2 and a sensor project in Term 3. Every class band from 1 to 12 has its own three makes.",
    },
    {
      q: "Does AI replace other subjects?",
      a: "No. It takes a small, fixed slot: about 20 sessions a year in Classes 1–2, one period a week in Classes 3–5 and one or two in Classes 6–8. Projects often use maths, language and science, such as charting data or writing in Tamil and English.",
    },
  ],

  "/parents/safety": [
    {
      q: "Is AI safe for children?",
      a: "Yes, when the rules are built in. In our programme, children in Classes 3–5 have no AI accounts, older students use teacher-owned accounts until 18, nothing starts before verified parent consent, and data stays in India. Every lesson also teaches children to question AI and check it without AI.",
    },
    {
      q: "Will my child have an AI account?",
      a: "Not in Classes 1–5: the teacher demonstrates on one screen and children make things on paper. From Class 6, your school can create a Studio account, but only after you verify consent with a one-time code. The teacher owns and controls that account until your child turns 18.",
    },
    {
      q: "Is my child’s data used to train AI?",
      a: "No. Your child’s work is stored in India and is never used to train any AI model. We do not track, profile or show ads to children, and there are no third-party trackers on this site or in lessons. You can view, download or delete your child’s data at any time.",
    },
    {
      q: "How does parent consent work?",
      a: "Four steps. Your school invites you, not us. You verify with a one-time code to your phone and keep a consent record. Only then is an account created, owned by the teacher for Classes 6–12. You stay in control and can view, download or delete the data whenever you like.",
    },
  ],

  "/parents/screen-time": [
    {
      q: "How much screen time do AI lessons need?",
      a: "Very little for young children. Classes 1–2 are almost all unplugged, and Classes 3–5 learn mostly on paper while the teacher shows AI on one screen. From Class 6, short screen sessions are used to make something on teacher-owned accounts, never to scroll. Your school’s timetable decides the exact time.",
    },
    {
      q: "Can children learn AI without screens?",
      a: "Yes. Children learn how machines think with picture cards, data hunts, ‘robot says’ games and floor robots. Every AI Flywheel lesson ends with a check done without AI, and our free Kids at Home sampler has three unplugged activities for Classes 3–8 that need no screen at all.",
    },
    {
      q: "Which classes learn mostly offline?",
      a: "Classes 1–5. Classes 1–2 use cards, stories and a floor robot; the teacher may show one picture on a screen. Classes 3–5 work on paper first and have no AI accounts. From Class 6, screen time grows a little, always for making things, with a check done without AI.",
    },
  ],

  "/parents/guide/homework-and-honesty": [
    {
      q: "Should children use AI for homework?",
      a: "For understanding, yes; for doing the work, no. AI can explain an idea or quiz your child, but the answers, essays and drawings they hand in should be their own. If AI helped, they should say so. Our programme starts student AI use only from Class 6, on teacher-owned accounts.",
    },
    {
      q: "When is using AI for homework cheating?",
      a: "When AI does the thinking your child is meant to show, and the work is handed in as theirs. Copying an AI answer, essay or picture without saying so is not honest. Asking AI to explain a step, then doing the task alone, is usually fine. Your child’s teacher sets the rules.",
    },
    {
      q: "How can parents check AI-assisted homework?",
      a: "Ask your child to explain the work aloud, without the tool open. Ask which parts AI helped with and how they checked it. Every AI Flywheel lesson ends with one check done without AI, so children in Classes 6–12 get used to showing they understood.",
    },
  ],

  "/kids": [
    {
      q: "What is the right age for AI classes?",
      a: "AI Flywheel Kids is for Classes 3–8, ages 8 to 14, in two groups: Classes 3–5 and Classes 6–8. Younger children learn best unplugged, so Classes 3–5 have no AI accounts. Classes 6–8 use instructor-owned accounts and can earn Aware (C1) in the Weekend Club.",
    },
    {
      q: "Are there AI classes for kids in Chennai and Coimbatore?",
      a: "Yes, they are planned. Kids camps and clubs are planned in Chennai, Coimbatore, Madurai and Tiruchirappalli, at partner schools and learning centres. Summer camps fill from February. Pick your city in the camp finder and join the waitlist to hear confirmed dates first.",
    },
    {
      q: "What do children build in an AI class?",
      a: "Something real every time: a picture story made with AI and checked by hand, a helper bot that follows clear, fair steps, and a small robot that moves along a paper town. Children also learn when not to trust a machine, and show families what they made.",
    },
    {
      q: "How much do Kids camps and clubs cost?",
      a: "Proposed prices: Summer Camp ₹4,000–7,500 for two weeks in April–May; Weekend Club ₹6,000–9,000 for a term of Saturdays; Holiday Bootcamp ₹2,500–4,000 for 3–5 days; Kids at Home free sampler, then ₹499–999 a pack. Final fees are set with each host school or centre.",
    },
  ],

  "/kids/summer-camp": [
    {
      q: "When are AI summer camps in Chennai?",
      a: "In April–May, before the June school term. Each Kids Summer Camp runs for two weeks, 2–3 hours a day, for Classes 3–5 and 6–8 in separate groups. Camps are planned in Chennai, Coimbatore, Madurai and Tiruchirappalli; join the waitlist to hear confirmed 2027 dates first.",
    },
    {
      q: "What does a summer camp cost?",
      a: "The proposed fee is ₹4,000–7,500 for the two weeks. The final fee is set with each host school or learning centre. Kids at Home packs are a lower-cost option: a free sampler, then ₹499–999 a pack, to do together at home.",
    },
    {
      q: "What does my child take home?",
      a: "A finished project, a printed certificate and a family Showcase Day. Over two weeks, children in Classes 3–8 build a picture story checked by hand, a helper bot that follows clear steps and a small robot that moves along a paper town, then show the family.",
    },
  ],

  "/kids/weekend-club": [
    {
      q: "Are there weekend AI classes for kids?",
      a: "Yes. The Kids Weekend Club runs on Saturdays for a school term, for Classes 3–8 in two groups: Classes 3–5 and 6–8. Children make a new project every month, with friends from other schools. The proposed fee is ₹6,000–9,000 a term.",
    },
    {
      q: "How many hours a week is the Weekend Club?",
      a: "Two hours every Saturday, for one school term. Each month has its own project: a ‘real or fake?’ card game, then a comic, story or song your child directs, then a helper bot for a family job, then a sensor or robot build in the fourth month.",
    },
    {
      q: "Can my child earn a certificate?",
      a: "Yes, in Classes 6–8. At the end of the term, children in Classes 6–8 can earn Aware (C1), the first AI Flywheel level, the same one teachers start with. Children in Classes 3–5 finish a project each month and show it to the family.",
    },
  ],

  "/kids/bootcamp": [
    {
      q: "Are there robotics camps in the Diwali or Pongal holidays?",
      a: "Yes. The Kids Holiday Bootcamp runs in the Pongal (January), Diwali (October–November) and Christmas (December) breaks, for Classes 3–8. Each bootcamp has one themed build, such as a robot that moves and lights up. The proposed fee is ₹2,500–4,000.",
    },
    {
      q: "How many days is the holiday bootcamp?",
      a: "Three to five days, depending on the break: 3–5 mornings of 2–3 hours each. It ends with a short family show-and-tell, so children in Classes 3–8 finish what they started before the holiday ends. Join the waitlist to hear the dates for your city.",
    },
    {
      q: "What will my child build?",
      a: "One themed build, chosen at the start: a robot that moves and lights up, a themed story, poster or song made with AI and checked by hand, or a helper bot for the festival. Children pick one and finish it, then show the family.",
    },
  ],

  "/kids/at-home": [
    {
      q: "How can children learn AI at home without screens?",
      a: "With printable, unplugged activity packs. Children in Classes 3–8 sort and match pictures to see how machines learn, hunt for the fake in AI pictures and play ‘robot says’ instruction games with the family. Each activity takes about 30 minutes and needs no account or app.",
    },
    {
      q: "Are the activity packs in Tamil?",
      a: "Yes. Every Kids at Home pack comes in Tamil and English, with a parent guide that explains each activity and the questions to ask afterwards. The free sampler has Tamil headings too, so the whole family can play together in the language you speak at home.",
    },
    {
      q: "How much does a pack cost?",
      a: "Start with the free sampler: three unplugged activities about how machines think, for Classes 3–5 and 6–8. Full Kids at Home packs are proposed at ₹499–999 a pack. You only need paper, a pencil and coloured pencils; no screen or account.",
    },
  ],

  "/mission": [
    {
      q: "How can government schools teach AI?",
      a: "With a curriculum built for them. Mission schools get AI Flywheel lessons written in Tamil first, printed kits that work offline for Classes 3–5, and free Aware (C1) training for every teacher. It starts with Classes 3–8, funded by Mission Patrons and government partners.",
    },
    {
      q: "Does it work without internet?",
      a: "Yes. It is built offline first. Classes 3–5 learn with printed cards, worksheets and floor robots, with no AI accounts. Each school cluster gets a local offline hub, so older classes can still make things when the connection is poor or missing.",
    },
    {
      q: "What is Mission 2047?",
      a: "Mission 2047 is AI Flywheel’s purpose: by India’s hundredth year of independence, to count the people who can build with AI, by level and stage, in every district. Mission schools are its school part, reporting teachers by level and children’s work by stage, not enrolments.",
    },
  ],

  "/mission/schools": [
    {
      q: "Is there an AI curriculum in Tamil medium?",
      a: "Yes. For Mission schools, AI Flywheel lessons for Classes 3–8 are written in Tamil first, not translated after. Kits, worksheets and teacher training are in Tamil. The same four stages run as in partner schools: Know, Make, Do and Move.",
    },
    {
      q: "Can AI be taught offline?",
      a: "Yes. Classes 3–5 learn with printed cards, worksheets and floor robots, and the teacher demonstrates AI when a screen is available. A local offline hub serves each school cluster, so lessons do not depend on a steady internet connection.",
    },
    {
      q: "Is teacher training free for Mission schools?",
      a: "Yes. Every Mission teacher reaches Aware (C1), self-paced, in Tamil, at no cost to the school. Lead teachers can go on to Practitioner (C2) and Builder (C3) to coach a cluster of schools. Progress is reported by level each term.",
    },
  ],

  "/mission/csr": [
    {
      q: "How can a company fund AI education through CSR?",
      a: "By becoming a Mission Patron. A Patron funds AI literacy in government and aided schools in a district: Tamil-first kits, free teacher training and offline hubs. Cost per school is published in each district plan, and outcomes are reported by teacher level every term.",
    },
    {
      q: "What does a CSR funder receive?",
      a: "A termly district report: teachers by level, from Aware (C1) to Builder (C3), and children’s work by stage, not enrolment counts. The district plan shows the cost per school before you commit. Photos of children are used only with written consent.",
    },
    {
      q: "How is CSR money spent?",
      a: "On printed kits and robot sets, teacher training and coaching, offline hubs for school clusters, and reporting with independent checks. The exact split for each district is published in its plan; the split shown on this page is an illustrative scenario.",
    },
  ],

  "/events": [
    {
      q: "Is there an AI competition for school students?",
      a: "Yes. The Inter-school Challenge brings teams from Classes 6–12 in partner schools together once a year to solve one real local problem in one day, ending with one check done without AI. It is included in every School Flywheel Partnership.",
    },
    {
      q: "What is Flywheel Day?",
      a: "One school day a year when every class band, from Class 1 to 12, shows one thing it made with AI. Parents are invited. It is held at your own school and included in the School Flywheel Partnership, with photos only with written consent.",
    },
    {
      q: "When are the events held?",
      a: "Flywheel Day and the Inter-school Challenge run once a year, and the Annual Showcase comes at the end of the school year. Dates are set each June with partner schools. Teacher training happens before, in April–May.",
    },
  ],

  "/trust": [
    {
      q: "How does an AI programme protect children’s data?",
      a: "By collecting little and keeping control with the school and parents. Nothing about a child is saved before verified parent consent. Children in Classes 3–5 have no AI accounts. Data stays in India, is never used to train AI models, and parents can view, download or delete it.",
    },
    {
      q: "Where is children’s data stored?",
      a: "In India. Children’s work and records are stored in India and are never used to train any AI model. The school is the data fiduciary under the DPDP Act and AI Flywheel is its data processor. Full documents are published after legal review.",
    },
    {
      q: "Who do I contact with a concern?",
      a: "Our grievance officer. Parents and schools can raise a concern about a child’s data or an AI feature, and a person answers. The grievance page explains how to reach the officer and the response times we propose. Use our contact form and choose ‘A concern or complaint’.",
    },
  ],
};

/** Tamil quick answers (/ta pages), keyed by the English path they mirror. */
export const ANSWERS_TA: Record<string, QA[]> = {
  "/kids": [
    {
      q: "குழந்தைகளுக்கு AI வகுப்புகள் எந்த வயதில் தொடங்கலாம்?",
      a: "AI Flywheel Kids வகுப்பு 3–8 (8 முதல் 14 வயது) குழந்தைகளுக்கானது, வகுப்பு 3–5, வகுப்பு 6–8 என இரண்டு குழுக்களாக. சிறு குழந்தைகள் திரை இல்லாமல் சிறப்பாகக் கற்கிறார்கள்; அதனால் வகுப்பு 3–5க்கு AI கணக்குகள் இல்லை. வகுப்பு 6–8 பயிற்றுநரின் கணக்குகளைப் பயன்படுத்துகிறது.",
    },
    {
      q: "சென்னையில் AI கோடை முகாம் எப்போது?",
      a: "ஏப்ரல்–மே மாதங்களில், ஜூன் பள்ளிப் பருவத்துக்கு முன். ஒவ்வொரு முகாமும் இரண்டு வாரங்கள், நாளுக்கு 2–3 மணி நேரம். சென்னை, கோயம்புத்தூர், மதுரை, திருச்சிராப்பள்ளியில் திட்டமிடப்பட்டுள்ளது. உறுதியான தேதிகளை முதலில் அறியக் காத்திருப்புப் பட்டியலில் சேருங்கள்.",
    },
    {
      q: "கட்டணம் எவ்வளவு?",
      a: "முன்மொழியப்பட்ட கட்டணம்: கோடை முகாம் ₹4,000–7,500 (இரண்டு வாரம்); வார இறுதி கிளப் ஒரு பருவத்துக்கு ₹6,000–9,000; விடுமுறை பூட்கேம்ப் ₹2,500–4,000 (3–5 நாள்); Kids at Home இலவச மாதிரி, பிறகு ஒரு தொகுப்புக்கு ₹499–999. இறுதிக் கட்டணத்தை ஒவ்வொரு பள்ளியுடனும் முடிவு செய்கிறோம்.",
    },
  ],
  "/programmes/boards": [
    {
      q: "CBSE கணினிச் சிந்தனை மற்றும் AI பாடத்திட்டம் என்றால் என்ன?",
      a: "இது வகுப்பு 3–8க்கான CBSE-யின் புதிய பாடம் (Computational Thinking and AI). வடிவங்கள், தரவு, படிப்படியான சிந்தனை, செயற்கை நுண்ணறிவு (AI) என்றால் என்ன என்பதைக் கற்பிக்கிறது. இறுதிப் பாடத்திட்டத்துக்கு CBSE வெளியிட்ட ஆவணங்களையே பாருங்கள்.",
    },
    {
      q: "எப்போது தொடங்குகிறது?",
      a: "2026–27 கல்வியாண்டு முதல், வகுப்பு 3 முதல் 8 வரை. எங்கள் வகுப்பு வாரியான வரைபடம் இந்தப் பாடத்திட்டத்தை அடிப்படையாகக் கொண்டது; இது அங்கீகாரம் அல்ல. தொடங்கும் முன் உங்கள் ஒருங்கிணைப்பாளருடன் வரைபடத்தைப் பகிர்கிறோம்.",
    },
    {
      q: "மாநிலப் பாடத்திட்டப் பள்ளிகளுக்குப் பொருந்துமா?",
      a: "ஆம். தமிழ்நாடு மாநிலப் பாடத்திட்டத்தின் கணினி அறிவியல், ICT பாடங்களை அடிப்படையாகக் கொண்டு, தமிழில் முதலில் எழுதப்பட்ட பாடக் கருவிகளுடன் வகுப்பு 1–12க்குப் பொருந்துகிறது. இந்த வரைபடம் உங்கள் ஒருங்கிணைப்பாளர் பார்க்கும் வரை முன்மொழிவு நிலையில் உள்ளது.",
    },
  ],
};
