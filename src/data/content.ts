// ───────────────────────────────────────────────────────────────────────────
// The AI Flywheel — canonical content (sourced from the framework book & blueprints)
// ───────────────────────────────────────────────────────────────────────────

export type StageKey = 'foundation' | 'generative' | 'agentic' | 'physical'

export interface Stage {
  key: StageKey
  num: string
  name: string
  tagline: string
  blurb: string
  color: string
  deep: string
  where: string
}

export const STAGES: Stage[] = [
  {
    key: 'foundation',
    num: '01',
    name: 'Foundation AI',
    tagline: 'The floor',
    blurb:
      'Your data, your analytics, the intelligence layer everything else stands on. Skip it and you build on sand.',
    color: '#5E92B3',
    deep: '#34607C',
    where: 'Data + intelligence',
  },
  {
    key: 'generative',
    num: '02',
    name: 'Generative AI',
    tagline: 'Table stakes',
    blurb:
      'The fast first value of drafting, coding, summarizing, creating — where almost everyone starts, and almost no one should stop. Now a commodity utility.',
    color: '#45C3B9',
    deep: '#27928B',
    where: 'Fast first value',
  },
  {
    key: 'agentic',
    num: '03',
    name: 'Agentic AI',
    tagline: 'The value frontier',
    blurb:
      'Software that does not just answer but acts — taking a goal, planning, using tools, completing multi-step work. Where durable, hard-to-copy advantage now lives.',
    color: '#8E86F0',
    deep: '#5F54D8',
    where: 'Agents that act',
  },
  {
    key: 'physical',
    num: '04',
    name: 'Physical AI',
    tagline: 'The industrial frontier',
    blurb:
      'Intelligence that leaves the screen and enters the world — robots, autonomous machines, embodied systems. The deepest moat and the largest economic lever.',
    color: '#F0A95E',
    deep: '#CE7A2E',
    where: 'Robotics & embodied systems',
  },
]

export const DRIVE = [
  { letter: 'D', name: 'Diagnose', desc: 'Pick the right problem; pass the data-readiness gate; define success before you build.' },
  { letter: 'R', name: 'Resource', desc: 'Right team, data as infrastructure, a vendor-neutral architecture; build vs buy.' },
  { letter: 'I', name: 'Implement', desc: 'Redesign the workflow, not just install the tool.' },
  { letter: 'V', name: 'Validate', desc: 'Prove it worked, honestly, with real measurement — then keep watching.' },
  { letter: 'E', name: 'Expand', desc: 'Standardize the win; feed the next turn of the wheel.' },
]

export const CORE = [
  { name: 'Compliance & Fairness', desc: 'Lawful and fair, by design.' },
  { name: 'Openness & Transparency', desc: 'Disclosed, documented, traceable.' },
  { name: 'Responsibility & Safety', desc: 'A named owner; guardrails; a kill-switch.' },
  { name: 'Empowerment & Human Agency', desc: 'Augment people, not replace them.' },
]

export const LAYERS = [
  { name: 'Interoperability', desc: 'Vendor-neutral; MCP / A2A-native. Own the road, not the car.' },
  { name: 'Governance & Sovereignty', desc: 'Your data, models & decisions — accountable, and in your control.' },
]

export interface Actor {
  key: string
  label: string
  question: string
  blurb: string
  href: string
  accent: string
}

export const ACTORS: Actor[] = [
  {
    key: 'business',
    label: 'For Business',
    question: 'How do I get real ROI from AI?',
    blurb: 'From startup to decacorn — turn pilots into compounding advantage.',
    href: '/solutions/business',
    accent: '#45C3B9',
  },
  {
    key: 'government',
    label: 'For Government',
    question: 'Sovereign AI, citizen services, jobs.',
    blurb: 'Workforce at scale, sovereignty-first, industrial productivity.',
    href: '/solutions/government',
    accent: '#F0A95E',
  },
  {
    key: 'institutions',
    label: 'For Institutions',
    question: 'Mission impact per dollar.',
    blurb: 'Universities, healthcare, nonprofits — outcomes you can prove.',
    href: '/solutions/institutions',
    accent: '#8E86F0',
  },
  {
    key: 'teams',
    label: 'For Teams',
    question: 'The smallest unit of the flywheel.',
    blurb: 'One workflow, turning one notch — where every flywheel begins.',
    href: '/solutions/teams',
    accent: '#5E92B3',
  },
]

// Revenue / monetization roles (Revenue Model poster)
export const REVENUE_ROLES = [
  { tag: 'FUNNEL', name: 'Front Door', body: 'Book · audiobook · YouTube · LinkedIn · newsletter · podcast', note: 'Builds the audience — the mouth of the funnel.', color: '#2FA39B' },
  { tag: 'OWN THE STANDARD', name: 'The Scalable Engine ★', body: 'Certification ladder · Accredited Training Orgs · recertification', note: 'Exams + royalties. High-margin, scalable.', color: '#1FA877' },
  { tag: 'THE ANNUITY', name: 'The Recurring Core ★', body: 'Platform / SaaS · enterprise L&D · membership', note: 'Recurring, high-multiple revenue.', color: '#E6B968' },
  { tag: 'REV-SHARE', name: 'Delivery', body: 'Certified partner network (15–30%) · advisory · assessments', note: "Capacity you didn't hire.", color: '#E08A3C' },
  { tag: 'VOLUME + LICENSE', name: 'Scale', body: 'Government workforce programs · sovereign-AI · master-licensing', note: 'Population-scale + global licensing.', color: '#C98A4E' },
  { tag: 'DEFENSIBLE', name: 'The Moat', body: 'Data & benchmark · State of AI Implementation report · marketplace', note: 'Proprietary data + authority.', color: '#4FB0C9' },
]

// Certification ladder
export interface Cert {
  level: string
  name: string
  audience: string
  exam: string
  flagship?: boolean
}
export const CERTS: Cert[] = [
  { level: 'L1', name: 'AI Flywheel Foundation', audience: 'Anyone; students', exam: 'Online proctored MCQ' },
  { level: 'L1', name: 'Generative AI Practitioner', audience: 'Practitioners', exam: 'MCQ + applied task' },
  { level: 'L2', name: 'Agentic AI Engineer', audience: 'Builders, engineers', exam: 'Applied build + viva', flagship: true },
  { level: 'L2', name: 'Physical AI / Robotics', audience: 'Manufacturing / industrial', exam: 'Applied + scenario' },
  { level: 'L3', name: 'DRIVE Implementer', audience: 'Consultants, PMs', exam: 'Case + portfolio' },
  { level: 'L3', name: 'CORE Governance Specialist', audience: 'Risk, compliance, gov', exam: 'Case + audit task' },
  { level: 'L4', name: 'AI Flywheel Strategist', audience: 'Senior leaders', exam: 'Portfolio review + panel' },
  { level: '—', name: 'Certified Trainer / Instructor', audience: 'Trainers, ATOs', exam: 'Train-the-trainer + audit' },
]

// Platform pricing tiers
export interface Tier {
  name: string
  price: string
  cadence: string
  best: string
  features: string[]
  featured?: boolean
  cta: string
}
export const TIERS: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    best: 'Individuals · top-of-funnel',
    features: ['1 diagnostic (no history)', 'View the Four-Leaks tools', '3 toolkit tools', 'Community support', '1 seat'],
    cta: 'Run the free diagnostic',
  },
  {
    name: 'Team',
    price: '$40',
    cadence: 'per seat / month',
    best: 'Small teams (≤10)',
    features: ['Tracked diagnostics + history', 'Full toolkit (28 tools)', 'Agent Operating Model (basic)', 'Basic governance tooling', 'Email support', 'Up to 10 seats'],
    cta: 'Start free trial',
  },
  {
    name: 'Business',
    price: '$60',
    cadence: 'per seat / month',
    best: 'Departments (≤50)',
    featured: true,
    features: ['Everything in Team', 'Full Agent Operating Model', 'CORE Governance suite', 'Benchmark / Maturity Index', 'Audit log + observability', 'Priority support', 'Up to 50 seats'],
    cta: 'Start free trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'annual',
    best: 'Orgs & sovereign deployment',
    features: ['Everything in Business', 'SSO / SCIM / RBAC', 'Immutable audit log', 'Data residency / sovereign option', 'Bundled certification seats', 'Dedicated success + SLA', 'Unlimited seats'],
    cta: 'Talk to us',
  },
]

// Stat band — the implementation gap (honest, proof-led)
export const STATS = [
  { value: '$547B', label: 'global AI spend the framework is built to make pay off', },
  { value: '4 stages', label: 'Foundation → Generative → Agentic → Physical' },
  { value: '1 method', label: 'DRIVE — run it at any stage, any scale' },
  { value: '3 scales', label: 'a team, an enterprise, an economy' },
]

export const NAV = [
  {
    label: 'Framework',
    href: '/framework',
    columns: [
      { title: 'The standard', links: [
        { label: 'At a Glance', href: '/framework' },
        { label: 'The Four Stages', href: '/framework#stages' },
        { label: 'DRIVE Methodology', href: '/framework#drive' },
        { label: 'CORE Governance', href: '/framework#core' },
      ]},
      { title: 'Going deeper', links: [
        { label: 'Interoperability & Sovereignty', href: '/framework#layers' },
        { label: 'The Maturity Model', href: '/framework#maturity' },
        { label: 'The Implementation Gap', href: '/framework#gap' },
        { label: 'Glossary', href: '/glossary' },
      ]},
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    columns: [
      { title: 'By actor', links: [
        { label: 'For Business', href: '/solutions/business' },
        { label: 'For Government', href: '/solutions/government' },
        { label: 'For Institutions', href: '/solutions/institutions' },
        { label: 'For Teams', href: '/solutions/teams' },
      ]},
      { title: 'Flagship', links: [
        { label: 'The Economy Program', href: '/solutions/government' },
        { label: 'By Industry', href: '/solutions' },
      ]},
    ],
  },
  {
    label: 'Platform',
    href: '/platform',
    columns: [
      { title: 'The product', links: [
        { label: 'Platform Overview', href: '/platform' },
        { label: 'Diagnostic & Maturity', href: '/diagnostic' },
        { label: 'CORE Governance Suite', href: '/platform#governance' },
        { label: 'Benchmark & Index', href: '/platform#benchmark' },
      ]},
      { title: 'Buy', links: [
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security & Sovereignty', href: '/platform#security' },
      ]},
    ],
  },
  {
    label: 'Learn & Certify',
    href: '/academy',
    columns: [
      { title: 'The Academy', links: [
        { label: 'Academy Overview', href: '/academy' },
        { label: 'Certification Ladder', href: '/academy#ladder' },
        { label: 'The 90-Day Flywheel Start', href: '/academy#cohort' },
        { label: 'Become an ATO', href: '/academy#ato' },
      ]},
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    columns: [
      { title: 'The engine', links: [
        { label: 'Insights / Blog', href: '/insights' },
        { label: 'State of AI Implementation', href: '/report' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'The Book', href: '/book' },
      ]},
      { title: 'More', links: [
        { label: 'Toolkit & Templates', href: '/toolkit' },
        { label: 'Glossary', href: '/glossary' },
        { label: 'About / The Standard', href: '/about' },
      ]},
    ],
  },
]
