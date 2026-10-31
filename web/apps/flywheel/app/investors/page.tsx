import type { Metadata } from "next";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Investors",
  description: "Investor relations for AI Flywheel, a brand of Inevitra Advisory. There is no public fundraising on this site.",
  alternates: { canonical: "/investors" },
};

const POINTS = [
  { t: "No public offer", d: "Nothing on this site is an offer of shares or a solicitation to invest." },
  { t: "Private placement", d: "Any investment is by private placement, through direct conversation only." },
  { t: "One contact", d: "Investor questions go to one person, who replies directly." },
];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="About · investors"
        title="Investor relations"
        intro="AI Flywheel is a brand of Inevitra Advisory. We do not raise funds publicly."
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Investors" }]}
      >
        <Button href="/contact?tag=business">Contact investor relations</Button>
      </PageHero>
      <Section eyebrow="Please note" title="How we talk to investors.">
        <ol className="grid gap-4 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <li key={p.t} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">{p.t}</h2>
              <p className="mt-1 text-sm text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
