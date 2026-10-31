import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { GOV_OFFERS, getGovOffer } from "@/lib/government";
import { pageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/QuickAnswers";
import { ANSWERS } from "@/lib/answers";

export function generateStaticParams() {
  return GOV_OFFERS.map((o) => ({ offer: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ offer: string }> }): Promise<Metadata> {
  const { offer } = await params;
  const o = getGovOffer(offer);
  if (!o) return {};
  return pageMeta(`/government/${o.slug}`, { title: `${o.name} · Government`, description: o.description });
}

export default async function GovOfferPage({ params }: { params: Promise<{ offer: string }> }) {
  const { offer } = await params;
  const o = getGovOffer(offer);
  if (!o) notFound();
  const others = GOV_OFFERS.filter((x) => x.slug !== o.slug);

  return (
    <>
      <PageHero
        eyebrow={o.eyebrow}
        title={`${o.name}: ${/^[A-Z][a-z]+\b/.test(o.title) ? o.title.charAt(0).toLowerCase() + o.title.slice(1) : o.title}`}
        intro={o.line}
        crumbs={[{ label: "Home", href: "/" }, { label: "Government", href: "/government" }, { label: o.name }]}
      >
        <Button href="/contact?tag=government" size="lg">
          Talk to the government team
        </Button>
        {o.link && (
          <Button href={o.link.href} variant="secondary" size="lg">
            {o.link.label}
          </Button>
        )}
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
            <dl className="divide-y divide-line">
              {o.rows.map((r) => (
                <div key={r.t} className="grid gap-1 px-5 py-4 sm:grid-cols-12 sm:gap-6">
                  <dt className="font-display text-base font-semibold text-ink sm:col-span-4">{r.t}</dt>
                  <dd className="text-ink-2 sm:col-span-8">{r.d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 text-sm text-muted">Non-partisan: we name programmes and departments, never people or parties.</p>
        </div>
      </section>

      {ANSWERS[`/government/${o.slug}`] && <QuickAnswers {...ANSWERS[`/government/${o.slug}`]} />}

      <section className="border-t border-line py-12 md:py-16">
        <div className="container-site">
          <p className="eyebrow mb-4">Other government offers</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((x) => (
              <li key={x.slug}>
                <Link href={`/government/${x.slug}`} className="card card-hover flex h-full flex-col p-5">
                  <span className="font-display text-lg font-semibold text-ink">{x.name}</span>
                  <span className="mt-1 text-sm text-muted">{x.line}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-ink">
                    Open <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
