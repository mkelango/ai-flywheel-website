import type { Metadata } from "next";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "AI Flywheel news and press contact. No press releases yet.",
  alternates: { canonical: "/news" },
};

const KIT = [
  { t: "Who we are", d: "AI Flywheel is a practical AI learning platform and a brand of Inevitra Advisory." },
  { t: "The author", d: "M. K. Elango, author of The AI Flywheel and the four Studio Playbooks." },
  { t: "The framework", d: "Four stages, DRIVE as the method, CORE as the governance, levels C1 to C5." },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="About · newsroom"
        title="Newsroom"
        intro="Announcements and press contact, in one place."
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Newsroom" }]}
      />

      <Section eyebrow="Press releases" title="Nothing published yet." intro="Our first announcements will appear here. Until then, we would rather say nothing than say something unproven.">
        <div className="card grid min-h-40 place-items-center p-8 text-center text-sm text-muted">No releases yet.</div>
      </Section>

      <Section eyebrow="For journalists" title="The facts, in three lines." className="border-t border-line">
        <ul className="grid gap-4 md:grid-cols-3">
          {KIT.map((k) => (
            <li key={k.t} className="card p-6">
              <h2 className="font-semibold text-ink">{k.t}</h2>
              <p className="mt-2 text-sm text-muted">{k.d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact?tag=business">Press contact</Button>
          <Button href="/about" variant="secondary">
            About us
          </Button>
        </div>
      </Section>
    </>
  );
}
