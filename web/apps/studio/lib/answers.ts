/**
 * Quick answers (AEO): answer-first, factual, 35 to 60 words each.
 * Every set renders visibly and as the page's single FAQPage JSON-LD.
 */
import type { QA } from "./seo";
import type { AudienceKey, StudioKey } from "./content";

export const HOME_QA: QA[] = [
  {
    q: "What is AI Flywheel Studio?",
    a: "AI Flywheel Studio is the agentic AI platform of AI Flywheel: the software where learning becomes building. Learners, Campus Labs and enterprise teams sign in, start a project and ship it through signed gates, leaving a gate log, an eval suite and a tested kill switch behind.",
  },
  {
    q: "When does Agentic Studio open?",
    a: "Agentic Studio opens first, in early access at the Inevitable Summit in the week of 8 February 2027. Model Studio, Generative Studio and Robotic Studio are planned for FY28, each opening with its own Campus Lab. Join the early-access list for one email when it opens.",
  },
  {
    q: "What are the four AI Flywheel studios?",
    a: "One studio per stage of the wheel: Model Studio to know your data and models, Generative Studio to make with AI safely, Agentic Studio to build agents that act, and Robotic Studio to put intelligence into machines. Each runs its own life cycle with the same six gates, G1 to G6.",
  },
  {
    q: "Who can use AI Flywheel Studio?",
    a: "Anyone who builds: cohort learners from aiflywheel.in, Campus Labs and enterprise teams on Studio seats. Students under 18 join only through accounts their school or teacher owns, with verifiable parental consent. One login carries your level, projects and portfolio across all three AI Flywheel sites.",
  },
];

export const AGENTIC_QA: QA[] = [
  {
    q: "What do you build in Agentic Studio?",
    a: "One bounded AI agent for one real workflow, chosen at G1 and expanded by reuse. Each agent has a named human owner, a risk tier and autonomy limits, and reaches tools through the MCP gateway. Agentic Studio is the AI agent builder that opens first, in February 2027.",
  },
  {
    q: "Is Agentic Studio model-agnostic?",
    a: "Yes. You bring your own key, and the Model Mesh routes each task to a suitable model under the tenant's residency rules, with fallbacks and guard models. Tools connect through an MCP gateway with a connector registry and a token vault, so no agent holds long-lived credentials.",
  },
  {
    q: "What are the six autonomy levels L0 to L5?",
    a: "L0 Manual, L1 Assist, L2 Pair, L3 Delegate, L4 Supervise and L5 Autonomous. Each level needs its controls in place first. At L3 an agent proposes and a person approves; L4 needs a sandbox, an agent identity, an audit log, sampled review and a kill switch.",
  },
  {
    q: "What does an Agentic Studio project leave behind?",
    a: "Four records you can hand over: a gate log of six signed decisions with linked evidence, an eval suite of graded test cases, a register row naming one human owner, and a kill switch tested before go-live. Together they are the evidence behind a Builder (C3) level.",
  },
];

export const HOW_QA: QA[] = [
  {
    q: "What is the agent development life cycle (ADLC)?",
    a: "The agent development life cycle (ADLC) is the method every Agentic Studio project runs: ten phases, from Discover to Learn and evolve, and six signed gates, G1 to G6. Each gate is a signed decision with linked evidence, and an agent goes live only once its kill switch is tested.",
  },
  {
    q: "How many phases does the ADLC have?",
    a: "Ten: Discover, Define, Design, Specify, Prototype, Build, Verify, Govern and release, Operate, and Learn and evolve. Build runs in waves between G4 and G5. Model, Generative and Robotic Studio run twelve-phase cycles, the MDLC, GDLC and RDLC, with the same six gates.",
  },
  {
    q: "What is a gate in the ADLC?",
    a: "A gate is a signed decision with linked evidence, not a meeting. A named human signs each one: G1 Thesis approved, G2 Architecture approved, G3 Definition of ready, G4 Experience sign-off, G5 Quality gate, and G6 Governance and go-live, which needs a tested kill switch.",
  },
  {
    q: "How is ADLC different from SDLC?",
    a: "The SDLC ships code; the ADLC ships an agent and the system that watches it. Alongside design, build and test, it adds a risk tier, autonomy limits, an eval suite, one named human owner and a kill switch tested before go-live. Every release then feeds the next G1.",
  },
];

export const ARCHITECTURE_QA: QA[] = [
  {
    q: "How is Agentic Studio built?",
    a: "As nine layers, from experience surfaces down to infrastructure, crossed by four planes: identity and access, trust and governance, observability and evals, and cost. Orchestration and the agent runtime form the agentic core. It is a published design today, ahead of opening in February 2027.",
  },
  {
    q: "How are AI agents evaluated before release?",
    a: "Through the Eval Service. Each agent has graded test cases that grow with every spec, a Replay Bench for regression checks and an Evidence Pack per release. G5, the quality gate, asks whether it works, safely, at load, before governance and go-live at G6.",
  },
  {
    q: "Where do agent policy limits live?",
    a: "In the Policy Engine, never in the prompt. Autonomy limits are enforced at run time, approvals go to a people-facing inbox, and every decision is written to an append-only, hash-chained Trust Ledger. That way a prompt cannot widen what an agent is allowed to do.",
  },
  {
    q: "How are tenants isolated?",
    a: "Each run gets its own microVM, never reused across tenants. Tenant context comes from the verified token, not the prompt, and each tenant is pinned to a home region: AWS Mumbai (ap-south-1) for India. Your content stays in the Execution Plane, outside the Control Plane.",
  },
];

export const SECURITY_QA: QA[] = [
  {
    q: "How do you stop an AI agent?",
    a: "With the kill switch. It has five levels, narrowest first: Run, Agent, System, Tenant and Global. Anyone on the run can stop an agent; only a human can restore it. Every Agentic Studio agent must pass a kill-switch test at G6 before it goes live.",
  },
  {
    q: "Where is AI Flywheel Studio data stored?",
    a: "Each tenant is pinned to a home region when it is created. For India that is AWS Mumbai (ap-south-1), so India data residency is the default for Indian tenants. Records, memory, the ledger and traces stay in that region, and model calls follow the tenant's residency rule.",
  },
  {
    q: "Is AI Flywheel Studio built for DPDP?",
    a: "Yes. It is designed for India's Digital Personal Data Protection (DPDP) rules: India data residency, a tamper-evident audit log, short-lived agent identities and SSO via OIDC. Under-18 profiles are owned by a school or teacher, with verifiable parental consent, and student data is never used for marketing.",
  },
  {
    q: "Does Studio support single sign-on?",
    a: "Yes. You sign in through your organisation's identity provider via OIDC, with SCIM provisioning for joiners and leavers. Each agent gets its own separate, short-lived identity, so nothing long-lived sits in a prompt or a tool, and every action traces back to a person or an agent.",
  },
];

export const ROADMAP_QA: QA[] = [
  {
    q: "What ships first in AI Flywheel Studio?",
    a: "Agentic Studio ships first. It opens in early access at the Inevitable Summit in the week of 8 February 2027, with single sign-on and credential verification across all three AI Flywheel sites. The first Agentic AI Engineer cohort follows after the Summit.",
  },
  {
    q: "When do Model, Generative and Robotic Studio open?",
    a: "They are planned for FY28 and open in turn. Each runs its own twelve-phase life cycle, the MDLC, GDLC and RDLC, with the same six gates as Agentic Studio. We publish dates only once they are committed; each studio page has a list for one email when it opens.",
  },
  {
    q: "Which Campus Lab runs which studio?",
    a: "A Lab is the room; the Studio is the software. The Agentic Lab runs Agentic Studio, the Model Lab runs Model Studio, the Generative Lab runs Generative Studio and the Robotic Lab runs Robotic Studio. Each Lab opens with the studio it runs.",
  },
];

export const EARLY_ACCESS_QA: QA[] = [
  {
    q: "How do I join Agentic Studio early access?",
    a: "Fill in the short form on this page: your name, email, role and, if you like, your organisation. You get one email when Agentic Studio opens. Cohort learners, Campus Labs and enterprise teams can all join; schools join through teacher-run accounts, and we never market to under-18s.",
  },
  {
    q: "When does early access open?",
    a: "Agentic Studio early access opens at the Inevitable Summit, in the week of 8 February 2027. Model, Generative and Robotic Studio follow in FY28, and each studio page has its own list, so you hear only about the studio you care about.",
  },
  {
    q: "What happens after I join the list?",
    a: "Nothing until your studio opens. Then you get one email telling you how to sign in. Sign-in uses your single AI Flywheel login, so your level, projects and portfolio from aiflywheel.in come with you on day one.",
  },
];

export const VERIFY_QA: QA[] = [
  {
    q: "How do I verify an AI Flywheel credential?",
    a: "Enter the credential ID shown on the badge in the box on this page. The check shows whether the badge is valid, the holder's name and level, its dates and whether it has been revoked. Only the holder's name, level and dates are public.",
  },
  {
    q: "What is an Open Badges 3.0 credential?",
    a: "Open Badges 3.0 is an open standard from 1EdTech for digital credentials, built on the W3C Verifiable Credentials model. Each AI Flywheel badge is a signed record of a level, earned with gate evidence from Studio, which any employer or client can check.",
  },
  {
    q: "Do AI Flywheel badges expire?",
    a: "Yes. Every AI Flywheel level badge is recertified yearly, because tools move fast. Each badge shows when it expires, and a lookup on this page shows that date alongside the level, so an employer can see whether the credential is current.",
  },
];

export const AUDIENCE_QA: Record<AudienceKey, QA[]> = {
  learners: [
    {
      q: "How do cohort learners use Studio?",
      a: "Your cohort builds one real use case in Studio, in a mixed-role team of four to six. You run it through the agent development life cycle, sign gates as you go and keep the records as Builder (C3) evidence. The programme itself lives on aiflywheel.in.",
    },
    {
      q: "How long is a cohort build?",
      a: "Twelve weeks. Gates G1 to G5 fall inside the cohort, and G6, governance and go-live with a tested kill switch, follows at a week-16 review. The first Agentic AI Engineer cohort starts after Agentic Studio opens in February 2027.",
    },
    {
      q: "Does my portfolio stay with my login?",
      a: "Yes. One login works across aiflywheel.in, AI Flywheel at Schools and Studio, so your level (C1 to C5), projects and portfolio travel with you. Credentials earned by shipping are Open Badges 3.0 badges that anyone can check at aiflywheel.studio/verify.",
    },
  ],
  campuses: [
    {
      q: "What is the difference between a Campus Lab and a Studio?",
      a: "A Campus Lab is a room on campus; a Studio is the software that runs in it. Every Campus Lab runs one studio, so students build in the same software, with the same gates and levels, as cohort learners and enterprise teams.",
    },
    {
      q: "Which studio does the Agentic Lab run?",
      a: "The Agentic Lab runs Agentic Studio, the first studio to open, in early access from February 2027. Students build bounded AI agents through gates G1 to G6 and reach Builder (C3) on gate records, not slides.",
    },
    {
      q: "When do the Model, Generative and Robotic Labs open?",
      a: "They are planned for FY28 and ship with their studios: the Model Lab with Model Studio, the Generative Lab with Generative Studio and the Robotic Lab with Robotic Studio. Each Lab runs its studio's twelve-phase life cycle with the same six gates.",
    },
  ],
  teams: [
    {
      q: "How do enterprise teams use Agentic Studio?",
      a: "Teams build governed AI agents on Studio seats, through one gateway. Every model call and tool goes through one policy layer, every run gets one trace, and every agent has a named owner, an eval suite and a tested kill switch before it goes live.",
    },
    {
      q: "What are Studio seats?",
      a: "Studio seats are for the people who build, sign and operate agents in your tenant: builders, gate signers and operators. Studio pricing is not published yet. Join early access and you will get one email when Agentic Studio opens in February 2027.",
    },
    {
      q: "Does Studio support SSO with our identity provider?",
      a: "Yes. Sign-in uses your organisation's identity provider via OIDC, with SCIM provisioning for joiners and leavers. Agents get their own separate, short-lived identities, so nothing long-lived is held by a prompt or a tool, and every action is traced.",
    },
    {
      q: "Can a tenant stay in India?",
      a: "Yes. Each tenant is pinned to a home region when it is created; for India that is AWS Mumbai (ap-south-1). Records, memory, the ledger and traces stay in that region, and model calls follow the tenant's residency rule.",
    },
  ],
  schools: [
    {
      q: "Can school students use AI Flywheel Studio?",
      a: "Yes, through teacher-run accounts only. Students under 18 build in Studio through accounts their school or teacher owns, with verifiable parental consent. Schools start on AI Flywheel at Schools, schools.aiflywheel.in, which runs AI literacy for Classes 1 to 12.",
    },
    {
      q: "Who owns a student's Studio profile?",
      a: "The school or teacher owns every under-18 profile. A parent gives verifiable consent before a student builds. Student data is never used for marketing, and Studio sends no marketing to under-18s, ever.",
    },
    {
      q: "What happens to the account at 18?",
      a: "At 18, with consent, the account moves from the school or teacher to the learner. The portfolio is kept, along with projects and level, so work done at school counts towards AI Flywheel levels on aiflywheel.in and in Studio.",
    },
  ],
};

const OPENS = (name: string, lab: string) => ({
  q: `When does ${name} open?`,
  a: `${name} is planned for FY28, with the ${lab} on campus. Agentic Studio opens first, in early access in the week of 8 February 2027. Use the form on this page for one email when ${name} opens; same login, same levels, same six gates.`,
});

export const STUDIO_QA: Record<Exclude<StudioKey, "agentic">, QA[]> = {
  model: [
    {
      q: "What is the Model Development Life Cycle?",
      a: "The Model Development Life Cycle (MDLC) is the method Model Studio runs: twelve phases, from Discover to Learn and renew, with six signed gates. It ends with an eval record at shipping settings, a model card, a census entry, a tested kill switch and a rehearsed rollback.",
    },
    {
      q: "How do you choose between renting, adapting or building a model?",
      a: "On evidence. You run a data-readiness checklist, then a blind bake-off that scores three or more candidates on a golden set. G3, after the Select phase, records the choice: rent a hosted model, adapt one, or train your own, at the settings that will ship.",
    },
    OPENS("Model Studio", "Model Lab"),
  ],
  generative: [
    {
      q: "What is the Generative Development Life Cycle?",
      a: "The Generative Development Life Cycle (GDLC) is the method Generative Studio runs: twelve phases, from Discover to Learn and scale, with six signed gates. Rights are cleared at G2, before any model is selected, and every output that ships carries content credentials.",
    },
    {
      q: "What are C2PA content credentials?",
      a: "C2PA content credentials follow an open standard from the Coalition for Content Provenance and Authenticity. They attach a signed record to a file saying how it was made, including any use of AI. In Generative Studio, every output that ships carries a C2PA label.",
    },
    {
      q: "How do you track rights for generative AI inputs?",
      a: "With a rights ledger: a record of the licences, releases and consents behind every input. The GDLC's Source data and rights phase ends at G2, so nothing is adapted or generated from material whose rights are unclear, and every input can be traced later.",
    },
    OPENS("Generative Studio", "Generative Lab"),
  ],
  robotic: [
    {
      q: "What is the Robotic Development Life Cycle?",
      a: "The Robotic Development Life Cycle (RDLC) is the method Robotic Studio runs: twelve phases, from Discover to Learn and scale, with six signed gates. You simulate in a digital twin at G3, integrate on the bench at G4 and certify before release at G6.",
    },
    {
      q: "What is a safety case for a robot?",
      a: "A safety case is an evidence-backed argument that a robot is acceptably safe inside a defined operational design domain (ODD): where, when and how it may run. In Robotic Studio it draws on sim results, bench integration and verification, and is signed before release.",
    },
    {
      q: "Why simulate in a digital twin before building?",
      a: "Because failures are cheap in simulation and costly in metal. A digital twin with a scenario library lets you test edge cases before hardware is built. In the RDLC, simulation is gated at G3, ahead of prototyping, teaching and training.",
    },
    OPENS("Robotic Studio", "Robotic Lab"),
  ],
};
