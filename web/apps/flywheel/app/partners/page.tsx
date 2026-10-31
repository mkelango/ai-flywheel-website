import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/orgs/blocks";

export const metadata: Metadata = {
  title: "Partner campuses",
  description: "Campuses that partner with AI Flywheel. Partner logos appear only with written permission.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner campuses"
        title="Real partners only."
        intro="Each partner campus gets its own page here, once it agrees in writing."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education", href: "/higher-education" }, { label: "Partner campuses" }]}
      />

      <Section id="list" eyebrow="Listed partners" title="None listed yet.">
        <div className="grid place-items-center rounded-[var(--radius-card)] border border-dashed border-line px-6 py-16 text-center">
          <Building2 className="size-8 text-muted" aria-hidden />
          <p className="mt-4 font-display text-xl font-semibold text-ink">Partner logos appear only with written permission.</p>
          <p className="mt-2 max-w-md text-sm text-muted">We publish what we can prove. No placeholder logos, no borrowed names.</p>
        </div>
      </Section>

      <CtaBand title="Become a partner campus." line="Start with a consultation and a one-department pilot." href="/contact?tag=higher-ed" label="Book a campus consultation" secondary={{ href: "/campus-partnership", label: "How partnership works" }} />
    </>
  );
}
