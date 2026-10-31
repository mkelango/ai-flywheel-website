import type { Metadata } from "next";
import { JsonLd } from "@/components/ui";
import { AUTHOR_ID } from "@/lib/seo";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Button } from "@flywheel/ui/components/primitives";
import { BOOKS } from "@/lib/framework";
import { getProgramme } from "@/lib/programmes";
import { BOOK_DETAIL } from "@/lib/research";
import { BookCover, PageHero } from "@/components/ui";
import { CtaBand } from "@/components/research/CtaBand";

export const metadata: Metadata = pageMeta("/books");

export default function BooksPage() {
  return (
    <>
      <PageHero
        eyebrow="Books and research"
        title="The AI Flywheel books: six books, one curriculum."
        intro="Every programme names the chapter it teaches. About 2,250 pages of method, by M. K. Elango."
        crumbs={[{ label: "Home", href: "/" }, { label: "Books" }]}
        updated
      />

      <section className="py-16 md:py-24">
        <div className="container-site">
          <header className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">The series</p>
            <h2 className="font-display text-3xl font-semibold text-ink md:text-[2.6rem]">Which book takes you where.</h2>
            <p className="mt-4 text-lg text-muted">Levels are from The Foundation Studio Playbook, Table 45.8.</p>
          </header>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BOOKS.map((b) => {
              const d = BOOK_DETAIL[b.title];
              return (
                <li key={b.title} className="card flex gap-5 p-5">
                  <BookCover title={b.title} sub={b.sub} color={b.color} pages={b.pages} small />
                  <div className="flex min-w-0 flex-col">
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted">{b.line}</p>
                    <dl className="mt-3 space-y-1 text-xs">
                      <div className="flex gap-2">
                        <dt className="text-muted">Levels</dt>
                        <dd className="text-ink">{b.levels}</dd>
                      </div>
                      {d && (
                        <div className="flex gap-2">
                          <dt className="text-muted">Method</dt>
                          <dd className="text-ink">{d.lifecycle}</dd>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <dt className="text-muted">Pages</dt>
                        <dd className="text-ink">{b.pages ? `${b.pages} pp` : "—"}</dd>
                      </div>
                    </dl>
                    {d?.programmes.map((slug) => {
                      const p = getProgramme(slug);
                      return p ? (
                        <Link key={slug} href={`/programmes/${slug}`} className="mt-auto pt-3 text-sm font-medium text-ink hover:text-primary-hover">
                          {p.title} →
                        </Link>
                      ) : null;
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand eyebrow="Start reading by doing" title="The first book is a free course." line="AI Flywheel Foundation (C1) teaches The AI Flywheel in about 6 hours.">
        <Button href="/programmes/foundation">Start free</Button>
        <Button href="/framework" variant="secondary">
          The framework
        </Button>
      </CtaBand>

      <QuickAnswers {...ANSWERS["/books"]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "The AI Flywheel book series",
          itemListElement: BOOKS.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Book",
              name: b.title,
              author: { "@id": AUTHOR_ID },
              description: b.line,
              inLanguage: "en",
              ...(b.pages ? { numberOfPages: b.pages } : {}),
              ...(i > 0 ? { isPartOf: { "@type": "BookSeries", name: "The AI Flywheel series" } } : {}),
            },
          })),
        }}
      />
    </>
  );
}
