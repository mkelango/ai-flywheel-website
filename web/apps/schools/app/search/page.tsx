import type { Metadata } from "next";
import { Container } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/blocks";
import { SiteSearch } from "@/components/extras/SiteSearch";
import { ADULT_TERMS, SEARCH_INDEX } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every page on AI Flywheel at Schools: programmes by class, parents, Kids camps, teachers, Mission and the Trust centre.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]} eyebrow="Search" title="What are you looking for?" intro="Programmes by class, parent guides, Kids camps, teachers and the Trust centre." className="!pb-8 md:!pb-10" />
      <section className="pb-16 md:pb-24">
        <Container className="max-w-3xl">
          <SiteSearch index={SEARCH_INDEX} adultTerms={ADULT_TERMS} />
        </Container>
      </section>
    </>
  );
}
