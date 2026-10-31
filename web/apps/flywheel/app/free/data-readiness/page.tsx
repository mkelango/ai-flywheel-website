import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { PrintButton } from "@/components/extras/PrintButton";
import { SourceNote } from "@/components/extras/SourceNote";
import { DataReadinessChecklist } from "@/components/extras/DataReadinessChecklist";

export const metadata: Metadata = pageMeta("/free/data-readiness");

export default function DataReadinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Free · Checklist"
        title="A data readiness checklist for AI: rock or sand?"
        intro="Run it on the slice your next use case needs, with the data owners in the room."
        crumbs={[{ label: "Home", href: "/" }, { label: "Free resources", href: "/free" }, { label: "Data-Readiness Checklist" }]}
      >
        <PrintButton />
        <Button href="/glossary/data-readiness" variant="secondary" size="lg" className="print:hidden">
          What data readiness means
        </Button>
      </PageHero>

      <section className="py-12 md:py-16 print:py-4">
        <div className="container-site max-w-3xl">
          <DataReadinessChecklist />
          <SourceNote>Source: The AI Flywheel, Chapter 4, Figure 4.3</SourceNote>
        </div>
      </section>
    </>
  );
}
