import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@flywheel/ui/components/primitives";
import { TERMS } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use for aiflywheel.in, a brand of Inevitra Advisory: prices, payments, credentials, your work and acceptable use.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="py-10 md:py-16">
      <div className="container-site max-w-3xl">
        <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
        <p className="eyebrow mb-4 mt-8">Legal</p>
        <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-5xl">Terms of use</h1>
        <p className="mt-4 text-lg text-muted">The short version. Draft for legal review; the full terms will be published before launch.</p>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {TERMS.map((t) => (
            <div key={t.t} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="font-semibold text-ink">{t.t}</dt>
              <dd className="text-muted sm:col-span-2">{t.d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-muted">
          Last updated 30 October 2026. Privacy and data:{" "}
          <Link href="/trust/privacy" className="font-medium text-ink underline-offset-4 hover:underline">
            Trust centre
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
