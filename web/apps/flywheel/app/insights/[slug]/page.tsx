import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Button } from "@flywheel/ui/components/primitives";
import { getProgramme } from "@/lib/programmes";
import { formatDate, getInsight, INSIGHT_ARTICLES } from "@/lib/research";
import { JsonLd } from "@/components/ui";
import { InsightCard } from "@/components/research/InsightCard";
import { BASE_OG, SITE_URL } from "@/lib/site";
import { AUTHOR_ID } from "@/lib/seo";

export function generateStaticParams() {
  return INSIGHT_ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return {};
  return {
    title: a.title.length > 56 ? a.title.split(". ")[0] : a.title,
    description: `${a.dek} From ${a.source.book}, ${a.source.chapter}.`,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { ...BASE_OG, type: "article", publishedTime: a.date, url: `/insights/${a.slug}`, authors: ["M. K. Elango"] },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();
  const p = getProgramme(a.programme);
  const more = INSIGHT_ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <article className="py-10 md:py-16">
        <div className="container-site max-w-3xl">
          <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.tag }]} />
          <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
            <span className="size-2 rounded-full" style={{ background: a.color }} aria-hidden /> {a.tag}
          </p>
          <h1 className="mt-4 font-display text-[2.2rem] font-semibold leading-[1.08] text-ink md:text-5xl">{a.title}</h1>
          <p className="mt-4 text-lg text-muted">{a.dek}</p>
          <p className="mt-6 text-sm text-muted">
            <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.read} read · M. K. Elango
          </p>

          <div className="mt-10 space-y-5 border-t border-line pt-10 text-[1.05rem] leading-relaxed text-ink-2">
            {a.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <aside className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-surface-2 p-5">
              <p className="eyebrow">From the book</p>
              <p className="mt-2 font-semibold text-ink">{a.source.book}</p>
              <p className="text-sm text-muted">{a.source.chapter}</p>
              <Link href="/books" className="mt-3 inline-flex min-h-6 items-center text-sm font-medium text-ink hover:text-primary-hover">
                The books →
              </Link>
            </div>
            {p && (
              <div className="rounded-xl bg-surface-2 p-5">
                <p className="eyebrow">Learn it</p>
                <p className="mt-2 font-semibold text-ink">{p.title}</p>
                <p className="text-sm text-muted">{p.outcome}</p>
                <Button href={`/programmes/${p.slug}`} size="sm" className="mt-3">
                  See the programme
                </Button>
              </div>
            )}
          </aside>
        </div>
      </article>

      <section className="border-t border-line py-16">
        <div className="container-site">
          <p className="eyebrow mb-6">More insights</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <InsightCard a={m} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.dek,
          datePublished: a.date,
          author: { "@type": "Person", "@id": AUTHOR_ID, name: "M. K. Elango", url: `${SITE_URL}/about#elango` },
          publisher: { "@type": "Organization", name: "AI Flywheel", url: `${SITE_URL}/` },
          mainEntityOfPage: `${SITE_URL}/insights/${a.slug}`,
        }}
      />
    </>
  );
}
