import { slugify } from '../lib/slug'

export interface Post {
  title: string
  tag: string
  color: string
  read: string
  date: string
  dek: string
  body: string[] // paragraphs (markdown-lite: **bold**, plain)
  takeaway: string
}

const RAW: Post[] = [
  {
    title: 'The five-minute data-readiness gate',
    tag: 'Apply It Monday', color: '#45C3B9', read: '6 min', date: '2026-05-18',
    dek: 'Before you build anything, run the gate. Six questions decide whether your AI effort has a floor to stand on — or sand.',
    body: [
      'Most AI projects do not fail because the model was wrong. They fail because the data was never ready. The single biggest predictor of success in the entire framework is whether the data an effort needs actually exists and is usable — and the cheapest place to catch that is *before* a line of code is written.',
      'The Data-Readiness Gate is a hard checkpoint with six questions. The data must **exist** (it is actually captured), be **clean** (accurate and consistent), be **connected** (reachable, not trapped in silos), be **relevant** (it bears on the problem), be **allowed** (you may legally and ethically use it), and be **fresh** (current, and staying current).',
      'The rule is unforgiving on purpose: any "no" stops the build. If the data is not ready, fixing the data *is* your first turn of the flywheel — and that is not a delay, it is the work. A team that builds on unready data is building on sand, and the demo that impresses on a good day will crumble on the messy inputs of a real Tuesday.',
      'Run the gate as a literal five-minute conversation in the room where the decision is made. Read the six words aloud. Mark each. If you cannot honestly mark all six "yes," you have just saved yourself a quarter of wasted engineering — and found your real first project.',
    ],
    takeaway: 'Any "no" on the six-question gate = stop and fix the data first. The #1 cause of AI failure lives here.',
  },
  {
    title: 'Why agentic AI is the value frontier',
    tag: 'Framework', color: '#8E86F0', read: '9 min', date: '2026-05-04',
    dek: 'Generative AI became a commodity the moment it shipped in every suite. The durable advantage moved to systems that act.',
    body: [
      'There is a quiet shift happening underneath the noise: AI is moving from *answering* to *acting*. A generative model drafts an email; an agent reads the inbox, drafts the reply, checks the policy, books the meeting, and escalates the one case that needs a human. The first is a feature. The second is a capability — and capabilities compound.',
      'Generative AI is now table stakes. It is embedded in every word processor and code editor, available to your competitor at the same falling price as to you. Winning quickly there is good; *stopping* there is the most common strategic mistake of 2026. The model is not the variable, because everyone can rent the same model.',
      'Agentic AI is harder, slower, and gated by governance — which is exactly what makes it defensible. An agent that takes a goal, plans, uses tools, and completes multi-step work cannot be downloaded by a rival overnight. It has to be built on a real data foundation, wrapped in an operating model, and earned through a raised Trust Ceiling. That difficulty is the moat.',
      'The practical move is to design every agent with a one-page **Agent Operating Model**: its goal, the tools it may use, its permissions, the human checkpoints, the escalation path, and a tested kill-switch. Plan for the deployment, not the demo. The agents that reach production are the ones whose owners answered those questions before they shipped.',
    ],
    takeaway: 'Generative is the ante; agentic is the edge. Build the operating model before the agent.',
  },
  {
    title: 'CORE in practice: the kill-switch test',
    tag: 'Governance', color: '#1FA877', read: '7 min', date: '2026-04-20',
    dek: 'An untested guardrail is not a guardrail. It is a hope. Here is how to make governance operational, not decorative.',
    body: [
      'Governance fails when it lives on a wall instead of in the system. "We value responsible AI" is a poster. CORE is a discipline — four pillars built to be *operated*: Compliance & Fairness, Openness & Transparency, Responsibility & Safety, and Empowerment & Human Agency.',
      'Take one concrete control: the kill-switch. Every organization claims to have one. Almost none have tested it. A kill-switch that has never been pulled is folklore — when the incident comes, nobody knows who is authorized, where the switch is, or whether it actually stops the agent mid-action. The discipline is simple: someone owns it, someone is authorized to use it in the moment, and they have rehearsed pulling it.',
      'The same logic applies across CORE. An untested fairness check is a hope. An accountability register with empty owner fields is a shadow fleet waiting to happen. The rule that ties it together is blunt: **no owner, no agent.** Ownership is a named human, never "the AI team."',
      'Done right, governance is not a brake — it is the throttle. Weak governance keeps you stuck on low-stakes toys because no one will let you point AI at anything that matters. Mature governance *raises the Trust Ceiling*, which is what unlocks the high-value work. Governance is the unlock, not the brake.',
    ],
    takeaway: 'Test the guardrail or it does not exist. Governance raises the ceiling on what you are allowed to deploy.',
  },
  {
    title: 'The reset tax: why your AI keeps starting from zero',
    tag: 'Framework', color: '#E6B968', read: '8 min', date: '2026-04-06',
    dek: 'Run AI as a series of disconnected projects and you pay full price every time. Compounding is the whole point.',
    body: [
      'Here is a pattern that hides in plain sight: a company runs an impressive AI pilot, declares victory, and moves on. Six months later it starts a new pilot — from scratch. The data is re-gathered, the lessons re-learned, the trust re-negotiated. This is the **reset tax**, and it is the single most expensive habit in enterprise AI.',
      'A flywheel is the opposite of a project list. Each win deposits into three accounts: a **Data** account (better data for next time), a **Capability** account (new things you can now do), and a **Trust** account (what stakeholders will now allow). When those accounts carry forward, the next win is cheaper and larger. When they reset, you pay the full price again, forever.',
      'The fix is a discipline, not a platform. At the end of every win, fill in the Next-Turn Worksheet: what did this add to data, capability, and trust — and therefore, what is the next turn? A win that feeds nothing is a one-off. A win that feeds the next is a flywheel.',
      'This is why the framework insists "the compounding is the product." The durable advantage is never a single model or a single project. It is the accumulation — the steadily growing momentum that competitors running disconnected pilots can never catch.',
    ],
    takeaway: 'Design the next turn before you finish this one. A win that feeds nothing pays the reset tax.',
  },
  {
    title: 'Own the road, rent the car: a vendor-neutral architecture',
    tag: 'Architecture', color: '#5E92B3', read: '7 min', date: '2026-03-23',
    dek: 'The worst lock-in is the kind you back into without choosing. Open standards are how you keep your future yours.',
    body: [
      'The model layer is moving in weeks. Leading models arrive within days of one another at falling prices. In that world, welding your architecture to one vendor\'s closed plumbing is not a convenience — it is a slow-motion strategic error, "the decision made by not making it."',
      'The principle is to **own the road and rent the car**. The road is your data and your differentiating workflow — build and own those. The car is the model — a commodity you rent, and swap whenever a better or cheaper one arrives. The bridge between them is open standards: MCP for connecting to tools and data, A2A for agents handing work to one another. Together, the "HTTP of agents."',
      'Test your exposure with the Architecture-Neutrality Checklist: could you swap your main model in weeks? Do components connect on neutral standards? Is your data portable and genuinely yours? Could you route around any single vendor? Any "no" is a bar of a cage.',
      'Vendor-neutrality is not anti-vendor. It is pro-optionality. You will still buy and partner heavily — but on terms that let you leave. That freedom is what lets you ride the falling-price curve instead of being trapped above it.',
    ],
    takeaway: 'Build and own the road (your data). Rent the car (the model). Demand neutrality and an exit price.',
  },
  {
    title: 'What changed this quarter — and what didn\'t',
    tag: 'The moving layer', color: '#F0A95E', read: '5 min', date: '2026-03-09',
    dek: 'A discipline, not an emergency: how to stay current without chasing every model release.',
    body: [
      'The fastest way to burn out an AI team is to treat every model release as a fire drill. The fastest way to fall behind is to ignore them entirely. The answer is a cadence, run four times a year, that separates the compass from the map.',
      'The **compass holds constant**: the four-stage flywheel, the DRIVE discipline, CORE governance, "own the road, rent the car," and the human questions. These do not change when a new model ships. They are the engine.',
      'The **map refreshes quarterly**: which model leads and at what price, what is newly possible, your tools and assumptions, and the evidence behind your current bets. These are the fuel. You update the fuel, never the engine.',
      'The habit is one hour, four times a year, asking a single question: "What changed on the map — and does any of it change which turn we take next?" Most quarters, the answer is "sharpen one assumption." Occasionally it is "a new stage just became viable." Either way, freshness becomes a discipline instead of an emergency — and that steadiness is itself an advantage.',
    ],
    takeaway: 'Hold the engine constant; refresh the fuel quarterly. One hour, four times a year.',
  },
]

export const POSTS: (Post & { slug: string })[] = RAW.map((p) => ({ ...p, slug: slugify(p.title) }))
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug)
