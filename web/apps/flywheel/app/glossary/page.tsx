import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { GLOSSARY } from "@/lib/research";
import { JsonLd, PageHero } from "@/components/ui";
import { GlossarySearch } from "@/components/research/GlossarySearch";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta("/glossary");

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        eyebrow="Glossary · A to Z"
        title="AI glossary: plain words for the whole wheel."
        intro="Each term is defined as the books use it, with the chapter where it goes deeper."
        crumbs={[{ label: "Home", href: "/" }, { label: "Glossary" }]}
        updated
      />
      <section className="py-12 md:py-16">
        <div className="container-site">
          <GlossarySearch terms={GLOSSARY.map(({ slug, term, short }) => ({ slug, term, short }))} />
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "AI Flywheel Glossary",
          url: `${SITE_URL}/glossary`,
          hasDefinedTerm: GLOSSARY.map((t) => ({
            "@type": "DefinedTerm",
            name: t.term,
            description: t.short,
            url: `${SITE_URL}/glossary/${t.slug}`,
          })),
        }}
      />

      <QuickAnswers {...ANSWERS["/glossary"]} />
    </>
  );
}
