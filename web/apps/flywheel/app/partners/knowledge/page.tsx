import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { KNOWLEDGE_PARTNER } from "@/lib/company";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/research/CtaBand";

export const metadata: Metadata = pageMeta("/partners/knowledge");

export default function KnowledgePartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="About · work with us"
        title="Become an AI trainer. Share the revenue."
        intro="Knowledge Partners lead AI Flywheel cohorts in their own stage, on our method and our assessments."
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Knowledge Partners" }]}
      >
        <Button href="/contact?tag=professionals">Apply to partner</Button>
      </PageHero>

      <Section eyebrow="Who can apply" title="Earn it first, then teach it.">
        <ol className="grid gap-4 md:grid-cols-3">
          {KNOWLEDGE_PARTNER.requirements.map((r, i) => (
            <li key={r.t} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">{r.t}</h2>
              <p className="mt-1 text-sm text-muted">{r.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="What you get" title="A share, a listing, the materials." className="border-t border-line">
        <ul className="grid gap-4 md:grid-cols-3">
          {KNOWLEDGE_PARTNER.offer.map((o) => (
            <li key={o.t} className="card p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-ink">{o.t}</h3>
                {"status" in o && o.status && <StatusTag status={o.status} />}
              </div>
              <p className="mt-2 text-sm text-muted">{o.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Knowledge Partner sits outside the C1 to C5 levels. It replaces the live site&apos;s Certified Trainer and ATO route.</p>
      </Section>

      <CtaBand eyebrow="Apply" title="Tell us your stage and your level." line="We reply with the train-the-trainer dates and the next cohort you could co-teach.">
        <Button href="/contact?tag=professionals">Apply to partner</Button>
        <Button href="/framework/levels" variant="secondary">
          The levels
        </Button>
      </CtaBand>
    </>
  );
}
