import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Suspense } from "react";
import { siteHref } from "@flywheel/ui/sites";
import { Breadcrumbs } from "@flywheel/ui/components/primitives";
import { SEARCH_INDEX } from "@/lib/search-index";
import { SiteSearch } from "@/components/extras/SiteSearch";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }): Promise<Metadata> {
  const { q } = await searchParams;
  const term = typeof q === "string" ? q.trim().slice(0, 60) : "";
  return {
    title: term ? `Search: ${term}` : "Search",
    description: "Search every page on aiflywheel.in: programmes, stages, levels, tracks, labs, industries, the framework, insights and the glossary.",
    alternates: { canonical: "/search" },
    robots: { index: false, follow: true },
  };
}

export default function SearchPage() {
  return (
    <section className="py-10 md:py-14">
      <div className="container-site">
        <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
        <p className="eyebrow mb-4 mt-8">Search</p>
        <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-5xl">Find it fast.</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">Every programme, page and glossary term. Use the arrow keys and Enter.</p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-14 max-w-2xl rounded-pill border border-line bg-surface" />}>
            <SiteSearch index={SEARCH_INDEX} schoolsHref={siteHref("schools", "/")} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
