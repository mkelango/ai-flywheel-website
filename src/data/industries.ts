import { slugify } from '../lib/slug'

export interface Industry {
  name: string
  accent: string
  tagline: string
  intro: string
  startHere: string // typical first turn
  stagePath: string[]
  useCases: string[]
  governance: string
}

const RAW: Industry[] = [
  {
    name: 'Manufacturing', accent: '#F0A95E',
    tagline: 'From the data floor to the embodied frontier.',
    intro: 'Manufacturing has the most to gain from the full flywheel — and the clearest path to Physical AI. The discipline is to build the data floor and prove agentic wins before pointing capital at robotics.',
    startHere: 'A high-volume, measurable quality-control or scheduling workflow with usable historical data.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Physical'],
    useCases: ['Predictive maintenance on a real data foundation', 'Agentic production scheduling and exception handling', 'Simulation-first robotics for repetitive physical tasks', 'Supplier and document automation'],
    governance: 'Safety-critical and capital-intensive: deterministic guardrails, tested kill-switches, and the Physical AI Candidate Screen before any real-world deployment.',
  },
  {
    name: 'BFSI', accent: '#1FA877',
    tagline: 'Where governance is the unlock.',
    intro: 'Banking, financial services, and insurance run on trust and regulation — which makes CORE governance the decisive advantage, not an obstacle. Mature governance is what raises the Trust Ceiling to high-value, high-stakes work.',
    startHere: 'A high-volume back-office reconciliation, document, or servicing workflow with a clean audit trail.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Governed scale'],
    useCases: ['Reconciliation and back-office agents', 'Multi-agent claims and underwriting workflows', 'Governed customer-servicing assistants', 'Fraud and risk analytics on an owned data floor'],
    governance: 'Risk-classified, fairness-tested, residency-aware, and provable to a regulator — built on the blueprint, not retrofitted after inspection.',
  },
  {
    name: 'Healthcare', accent: '#8E86F0',
    tagline: 'Build the floor first; keep humans in the loop.',
    intro: 'Healthcare faces the sharpest version of the implementation gap: high stakes, tight budgets, and a duty of care. The flywheel starts with the data floor and lower-stakes administrative work, with ethics leading.',
    startHere: 'Documentation and administrative burden — freeing clinician time without touching clinical decisions.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Governed scale'],
    useCases: ['Clinical documentation and admin relief', 'Agentic scheduling and intake', 'Research and literature acceleration', 'Operations and supply analytics'],
    governance: 'Human-in-the-loop on anything touching care or assessment; fairness-tested; sovereign where regulated. Trust is the endowment.',
  },
  {
    name: 'Retail', accent: '#45C3B9',
    tagline: 'Win fast on generative, compound into agents.',
    intro: 'Retail can capture quick generative value — but the cautionary tale is building on sand. Durable advantage comes from an owned data foundation feeding agentic operations.',
    startHere: 'A high-volume content, service, or merchandising workflow with clean product and customer data.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Physical'],
    useCases: ['Content and merchandising generation at scale', 'Agentic customer service and returns', 'Demand and inventory analytics', 'Warehouse and fulfilment robotics (later)'],
    governance: 'Disclosure of AI to customers, fairness in personalization, and a data floor that holds on real catalogue data.',
  },
  {
    name: 'Telecom', accent: '#5E92B3',
    tagline: 'Engineer the handoffs.',
    intro: 'Telecoms have the data volume to compound fast — if each stage is engineered to feed the next instead of running as silos. The handoff is where the advantage is won.',
    startHere: 'A high-volume network-operations or customer-care workflow rich in telemetry.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Compounding'],
    useCases: ['Network operations and anomaly detection', 'Agentic customer care and provisioning', 'Field and dispatch optimization', 'Cross-stage data handoffs that compound'],
    governance: 'Observability and traceability across a large agent fleet; an accountability register so no agent is an orphan.',
  },
  {
    name: 'Education', accent: '#E6B968',
    tagline: 'Free the talent; lead with ethics.',
    intro: 'Education institutions turn administrative overhead into mission capacity. The sequence is generative wins on admin, composed into governed agents, with ethics first.',
    startHere: 'Administrative and documentation burden that keeps educators from teaching.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Governed scale'],
    useCases: ['Administrative and documentation relief', 'Research and content acceleration', 'Agentic student services (lower-stakes first)', 'Operations analytics'],
    governance: 'Human-in-the-loop on assessment; fairness and student-data protection by design.',
  },
  {
    name: 'Energy', accent: '#E08A3C',
    tagline: 'Reliability is the metric.',
    intro: 'Energy and utilities deploy AI where uptime, safety, and throughput are the proof. The flywheel runs from analytics on an owned data floor to governed agentic operations and, eventually, the physical frontier.',
    startHere: 'A high-volume operations or maintenance workflow with strong telemetry.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Physical'],
    useCases: ['Predictive maintenance and asset analytics', 'Agentic operations and outage response', 'Grid and demand optimization', 'Inspection robotics (later)'],
    governance: 'Safety-critical guardrails, autonomy boundaries set to the stakes, and tested kill-switches.',
  },
  {
    name: 'Real Estate', accent: '#9DB1C2',
    tagline: 'From documents to decisions.',
    intro: 'Real estate runs on documents, transactions, and local data — fertile ground for generative wins that compound into agents handling multi-step workflows.',
    startHere: 'A high-volume document, listing, or transaction workflow.',
    stagePath: ['Foundation', 'Generative', 'Agentic', 'Governed scale'],
    useCases: ['Document and listing generation', 'Agentic transaction and diligence workflows', 'Market and valuation analytics', 'Tenant and operations services'],
    governance: 'Fairness in valuation and screening; disclosure; data residency where required.',
  },
  {
    name: 'Public Sector', accent: '#36C794',
    tagline: 'Reach is the return; the road must be sovereign.',
    intro: 'Government services reach entire populations — the largest single prize of the flywheel. The discipline is sovereignty-first, lower-stakes-first, and measured honestly.',
    startHere: 'A high-reach, lower-stakes citizen service (information, forms, status).',
    stagePath: ['Sovereign Foundation', 'Generative', 'Agentic', 'Governed scale'],
    useCases: ['Multilingual citizen-service assistants', 'Agentic forms, status, and information services', 'Workforce-skilling at population scale', 'Operations analytics'],
    governance: 'Sovereign by design; human-in-the-loop on benefits, justice, and health; provable to the public.',
  },
]

export const INDUSTRIES: (Industry & { slug: string })[] = RAW.map((i) => ({ ...i, slug: slugify(i.name) }))
export const findIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug)
