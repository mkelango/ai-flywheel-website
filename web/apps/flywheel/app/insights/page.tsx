import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Section } from "@flywheel/ui/components/primitives";
import { INSIGHT_ARTICLES } from "@/lib/research";
import { PageHero } from "@/components/ui";
import { InsightCard } from "@/components/research/InsightCard";

export const metadata: Metadata = pageMeta("/insights");

export default function InsightsPage() {
  const articles = [...INSIGHT_ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        eyebrow="Research and insights"
        title="AI implementation insights: one idea each."
        intro="Each insight comes from a chapter of the books and points to the programme that teaches it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <Section eyebrow="Latest" title="From the books, not the news cycle.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <InsightCard a={a} />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          Looking for the annual report?{" "}
          <Link href="/research/report" className="font-medium text-ink underline-offset-4 hover:underline">
            State of AI Implementation
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
