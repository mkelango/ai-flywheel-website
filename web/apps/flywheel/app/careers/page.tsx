import type { Metadata } from "next";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { CAREERS } from "@/lib/company";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work at AI Flywheel. No open roles are listed right now; trainers can apply as Knowledge Partners.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="About · careers"
        title="Build the ladder with us."
        intro="We are a small team in Tamil Nadu teaching AI by building it."
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Careers" }]}
      />

      <Section eyebrow="How we work" title="Three habits.">
        <ol className="grid gap-4 md:grid-cols-3">
          {CAREERS.values.map((v, i) => (
            <li key={v.t} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">{v.t}</h2>
              <p className="mt-1 text-sm text-muted">{v.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Open roles" title="No open roles listed right now." intro="When we hire, roles appear here first. Trainers can apply now as Knowledge Partners." className="border-t border-line">
        <div className="flex flex-wrap gap-3">
          <Button href="/partners/knowledge">Become a Knowledge Partner</Button>
          <Button href="/contact?tag=professionals" variant="secondary">
            Send us a note
          </Button>
        </div>
      </Section>
    </>
  );
}
