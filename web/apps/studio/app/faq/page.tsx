import type { Metadata } from "next";
import { siteHref } from "@flywheel/ui/sites";
import { faqLd, type QA } from "@/lib/seo";
import { AnswerList, JsonLd, RelatedLink } from "@/components/Seo";
import { Band, CtaBand, PageHero, StatusChip } from "@/components/ui";

const TITLE = "Studio FAQ: Access, Data and Schools";
const DESCRIPTION = "When Studio opens, who can use it, where data is stored, how schools join and how an agent is stopped. Short answers, one page.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: { title: `${TITLE} · AI Flywheel Studio`, description: DESCRIPTION, url: "/faq" },
};

/** Answer-first, factual. Every item renders visibly and in the page's one FAQPage JSON-LD. */
const FAQS: QA[] = [
  {
    q: "When does Agentic Studio open?",
    a: "Agentic Studio opens in early access at the Inevitable Summit, in the week of 8 February 2027. Model, Generative and Robotic Studio follow in FY28, each with its own Campus Lab.",
  },
  {
    q: "Who can use AI Flywheel Studio?",
    a: "Anyone who builds: cohort learners, Campus Labs and enterprise teams. Students under 18 join only through accounts their teacher or school owns, with verifiable parental consent.",
  },
  {
    q: "Is Studio free for cohort learners?",
    a: "Cohort learners build their project in the studio their programme uses. Studio pricing is not published yet; programme price bands, excluding GST, are listed on aiflywheel.in.",
  },
  {
    q: "Where is my data stored?",
    a: "Each tenant is pinned to a home region when it is created. For India that is AWS Mumbai (ap-south-1). Records, memory, the ledger and traces stay in that region; model calls follow the tenant's residency rule.",
  },
  {
    q: "Can schools use it?",
    a: "Yes, through teacher-run accounts. The school or teacher owns every under-18 profile, with verifiable parental consent and no marketing. At 18, with consent, the account moves to the learner and the portfolio is kept.",
  },
  {
    q: "What is the difference between a Lab and a Studio?",
    a: "A Lab is a room on campus. A Studio is the software. Every Campus Lab runs one studio: the Agentic Lab runs Agentic Studio, the Model Lab runs Model Studio, and so on.",
  },
  {
    q: "Does my level carry over from aiflywheel.in?",
    a: "Yes. One login works across aiflywheel.in, AI Flywheel at Schools and Studio, so your level (C1 to C5), projects and portfolio go with you.",
  },
  {
    q: "How do you stop an AI agent?",
    a: "With a kill switch. In Agentic Studio it has five levels, narrowest first: Run, Agent, System, Tenant and Global. Anyone on the run can stop an agent; only a human can restore it. Every agent must pass a kill-switch test at G6, before it goes live.",
  },
  {
    q: "How do you evaluate AI agents before production?",
    a: "With an eval suite of graded test cases that grows with every spec, run at the settings that will ship. In Agentic Studio, G5, the quality gate, checks test, eval, security, load and accessibility reports before G6 allows go-live.",
  },
  {
    q: "What are AI agent autonomy levels?",
    a: "They set how much an agent may do without a person. Agentic Studio uses six: L0 Manual, L1 Assist, L2 Pair, L3 Delegate, L4 Supervise and L5 Autonomous. Each level needs its controls in place first, such as a sandbox, an audit log and a kill switch at L4.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQS)} />
      <PageHero
        crumb="FAQ"
        eyebrow={<StatusChip color="#D98B0B">FAQ</StatusChip>}
        kicker="AI Flywheel Studio FAQ"
        title="Questions, answered."
        line="Short answers on AI Flywheel Studio: opening, access, data, schools and stopping an agent."
        updated
      />
      <Band>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="sr-only">Common questions</h2>
            <AnswerList items={FAQS} />
          </div>
          <aside className="space-y-2 text-sm lg:col-span-4">
            <p className="eyebrow mb-4">Read more</p>
            <RelatedLink href="/roadmap">Studio roadmap and opening dates</RelatedLink>
            <RelatedLink href="/security">Kill switch, SSO and data residency</RelatedLink>
            <RelatedLink href="/for-schools">Teacher-run accounts for schools</RelatedLink>
            <RelatedLink href={siteHref("flywheel", "/pricing")}>Programme price bands on aiflywheel.in</RelatedLink>
          </aside>
        </div>
      </Band>
      <CtaBand />
    </>
  );
}
