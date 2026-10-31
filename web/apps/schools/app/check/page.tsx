import type { Metadata } from "next";
import { Container } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/blocks";
import { SchoolCheck } from "@/components/SchoolCheck";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/check");

export default function CheckPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "For Schools", href: "/for-schools" }, { label: "School Flywheel Check" }]}
        eyebrow="For principals and correspondents"
        title="School AI readiness check"
        intro="The School Flywheel Check is a free school AI readiness check: six questions, an instant report and a suggested next step. No sign-up."
        className="!pb-8"
      />
      <section className="pb-20">
        <Container className="max-w-4xl">
          <SchoolCheck />
        </Container>
      </section>
      <QuickAnswers items={ANSWERS["/check"]} eyebrow="Questions leaders ask" className="!pt-0" />
      <RelatedLinks
        links={[
          { href: "/demo", label: "Book an AI curriculum demo" },
          { href: "/for-schools", label: "AI programme for schools in India" },
          { href: "/trust", label: "Child data privacy for schools" },
        ]}
      />
    </>
  );
}
