import { slugify } from '../lib/slug'

export interface Cert {
  level: string
  name: string
  audience: string
  exam: string
  flagship?: boolean
  prerequisite: string
  validity: string
  priceIndia: string
  priceGlobal: string
  recert: string
  whoFor: string
  outcomes: string[]
  syllabus: string[]
  faq: { q: string; a: string }[]
  accent: string
}

const RAW: Omit<Cert, 'slug'>[] = [
  {
    level: 'L1', name: 'AI Flywheel Foundation', audience: 'Anyone; students', exam: 'Online proctored MCQ',
    prerequisite: 'None', validity: '2 years', priceIndia: '₹8,000', priceGlobal: '$180', recert: '₹4,000 / $120', accent: '#5E92B3',
    whoFor: 'Anyone entering the field — leaders, students, and practitioners who need a shared language for turning AI into value.',
    outcomes: ['Explain the four stages, DRIVE, and CORE in plain language', 'Run the Four-Leaks Diagnostic and the Data-Readiness Gate', 'Locate an organization on the Maturity Model', 'Spot the implementation gap before it drains a budget'],
    syllabus: ['The AI Flywheel at a glance — why a wheel, not a ladder', 'The four stages and how they compound', 'DRIVE: the method that turns the wheel', 'CORE: the governance that keeps it true', 'The toolkit: orient, diagnose, and locate'],
    faq: [{ q: 'Do I need a technical background?', a: 'No. Foundation is written for the non-technical reader — no prior knowledge assumed.' }, { q: 'How long does it take?', a: 'Most candidates prepare in a few weeks alongside work; the exam is a single proctored online session.' }],
  },
  {
    level: 'L1', name: 'Generative AI Practitioner', audience: 'Practitioners', exam: 'MCQ + applied task',
    prerequisite: 'None', validity: '2 years', priceIndia: '₹10,000', priceGlobal: '$220', recert: '₹4,000 / $120', accent: '#45C3B9',
    whoFor: 'Practitioners capturing fast generative value who want to do it with discipline — and know when to stop and reach for agents.',
    outcomes: ['Choose a generative quick win with the Fast-First-Value grid', 'Ship a high-value, high-safety win in ~30 days', 'Avoid the "stop at table stakes" trap', 'Set realistic ROI horizons for generative apps'],
    syllabus: ['Generative AI as table stakes — the commoditized utility', 'The Fast-First-Value Selection Grid', 'Workflow redesign vs paving the cow path', 'Honest validation of generative wins', 'When generative becomes the floor for agents'],
    faq: [{ q: 'Is this just prompt engineering?', a: 'No — it is about capturing durable value with discipline, not model tricks. The model is not the variable.' }],
  },
  {
    level: 'L2', name: 'Agentic AI Engineer', audience: 'Builders, engineers', exam: 'Applied build + viva', flagship: true,
    prerequisite: 'AI Flywheel Foundation', validity: '2 years', priceIndia: '₹18,000', priceGlobal: '$450', recert: '₹6,000 / $180', accent: '#8E86F0',
    whoFor: 'The hero credential. For builders and engineers shipping systems that act — where durable, hard-to-copy advantage now lives.',
    outcomes: ['Design an Agent Operating Model for any agent that acts', 'Build to production-grade, not demo-grade', 'Compose multi-agent systems from proven building blocks', 'Wire in observability, traceability, and a tested kill-switch'],
    syllabus: ['Agentic AI: the value frontier', 'The Agent Operating Model — goal, tools, permissions, checkpoints, escalation, kill-switch', 'From demo to production: the Implementation Readiness Checklist', 'Multi-agent composition', 'Governing agents: autonomy levels and the accountability register', 'The applied build + viva'],
    faq: [{ q: 'What is the exam format?', a: 'An applied build — you ship a governed agent to a brief — followed by a viva defending your operating-model and validation choices.' }, { q: 'Why is this the flagship?', a: 'Agentic systems are the value frontier and the scarce skill. This credential is the anchor of the whole ladder.' }],
  },
  {
    level: 'L2', name: 'Physical AI / Robotics', audience: 'Manufacturing / industrial', exam: 'Applied + scenario',
    prerequisite: 'AI Flywheel Foundation', validity: '2 years', priceIndia: '₹18,000', priceGlobal: '$450', recert: '₹6,000 / $180', accent: '#F0A95E',
    whoFor: 'For manufacturing and industrial implementers reaching the embodied frontier — the deepest moat, and the most capital-intensive.',
    outcomes: ['Screen physical processes with the Physical AI Candidate Screen', 'Use simulation and synthetic data to practise in a dream', 'Set deterministic guardrails for safety-critical deployment', 'Sequence Foundation → Physical without skipping the floor'],
    syllabus: ['Physical AI: the industrial frontier', 'World models, VLA, and embodied systems', 'Simulation-first: digital twins and synthetic data', 'Safety, autonomy boundaries, and kill-switches for the physical world', 'The applied scenario'],
    faq: [{ q: 'Do I need robotics hardware?', a: 'No — much of the work is simulation-first. The credential emphasises screening, safety, and sequencing.' }],
  },
  {
    level: 'L3', name: 'DRIVE Implementer', audience: 'Consultants, PMs', exam: 'Case + portfolio',
    prerequisite: 'AI Flywheel Foundation', validity: '2 years', priceIndia: '₹15,000', priceGlobal: '$400', recert: '₹5,000 / $150', accent: '#E6B968',
    whoFor: 'For consultants and project leaders who run the method — turning opportunities into validated, compounding wins.',
    outcomes: ['Run a full DRIVE loop end to end', 'Lead opportunity selection, resourcing, and build-vs-buy', 'Drive workflow redesign and change management', 'Prove wins with the Validation Scorecard'],
    syllabus: ['Diagnose: opportunity, gate, success definition', 'Resource: team, neutral architecture, build-vs-buy', 'Implement: workflow redesign and production-grade', 'Validate: honest measurement and continuous watch', 'Expand: standardize and feed the next turn', 'Case + portfolio assessment'],
    faq: [{ q: 'Is this a project-management cert?', a: 'It is the implementation discipline specific to AI — the scarce skill that closes the implementation gap.' }],
  },
  {
    level: 'L3', name: 'CORE Governance Specialist', audience: 'Risk, compliance, gov', exam: 'Case + audit task',
    prerequisite: 'AI Flywheel Foundation', validity: '2 years', priceIndia: '₹15,000', priceGlobal: '$400', recert: '₹6,000 / $180', accent: '#1FA877',
    whoFor: 'For risk, compliance, and governance leaders who raise the Trust Ceiling — making high-stakes deployment possible, not impossible.',
    outcomes: ['Operationalize the four CORE pillars', 'Build an Agent Accountability Register and autonomy guide', 'Run fairness, residency, and sovereignty readiness checks', 'Make governance provable to a regulator'],
    syllabus: ['Governance as the unlock, not the brake', 'Compliance, fairness, and the EU AI Act / DPDP', 'Openness, transparency, and traceability', 'Responsibility: autonomy, guardrails, kill-switches', 'Empowerment and human agency', 'The audit task'],
    faq: [{ q: 'Is governance a brake on speed?', a: 'The opposite — mature governance raises the ceiling on what you are allowed to deploy. That is the whole thesis.' }],
  },
  {
    level: 'L4', name: 'AI Flywheel Strategist', audience: 'Senior leaders', exam: 'Portfolio review + panel',
    prerequisite: 'Agentic + DRIVE + CORE', validity: '3 years', priceIndia: '₹60,000', priceGlobal: '$1,800', recert: '₹10,000 / $300', accent: '#D9AE5E',
    whoFor: 'The capstone. For senior leaders running the whole machine — across stages, scales, and the full monetization flywheel.',
    outcomes: ['Design and govern a portfolio of compounding flywheels', 'Engineer handoffs so each turn funds the next', 'Lead at enterprise and economy scale', 'Set strategy against the moving model layer'],
    syllabus: ['One framework, three scales, four actors', 'Engineering compounding across a portfolio', 'The monetization flywheel applied to your own business', 'Leading governance and sovereignty at scale', 'Portfolio review + leadership panel'],
    faq: [{ q: 'Why three prerequisites?', a: 'The Strategist sits above the ladder — it assumes fluency in agentic building, the DRIVE method, and CORE governance.' }],
  },
  {
    level: '—', name: 'Certified Trainer / Instructor', audience: 'Trainers, ATOs', exam: 'Train-the-trainer + audit',
    prerequisite: 'A Level-2/3 cert', validity: 'Annual', priceIndia: '₹50,000 + ₹20,000/yr', priceGlobal: '$1,500 + $600/yr', recert: 'Included in licence', accent: '#36C794',
    whoFor: 'For trainers and Accredited Training Organizations who teach the curriculum and run the exams — the infinite-leverage tier.',
    outcomes: ['Deliver the curriculum to standard', 'Run proctored exams and uphold the credential', 'Operate as (or within) an Accredited Training Org', 'Carry the standard without diluting it'],
    syllabus: ['Teaching the framework to standard', 'Assessment integrity and proctoring', 'The ATO model and royalties', 'Train-the-trainer + audit'],
    faq: [{ q: 'How does the ATO model work?', a: 'Organizations pay an annual accreditation fee plus a per-seat royalty to teach the curriculum and run exams — the ITIL / PMI / SAFe position.' }],
  },
]

export const CERTS: (Cert & { slug: string })[] = RAW.map((c) => ({ ...c, slug: slugify(c.name) }))
export const findCert = (slug: string) => CERTS.find((c) => c.slug === slug)
export const certSlug = (name: string) => slugify(name)
