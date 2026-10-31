import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@flywheel/ui/components/primitives";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to an AI Flywheel adviser about programmes, campus partnerships, workforce training or government programmes.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <p className="eyebrow mb-4 mt-8">Talk to us</p>
          <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-5xl">Start a conversation.</h1>
          <p className="mt-4 text-lg text-muted">Tell us who you are and what you need. One adviser, one reply.</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>
              <Link href="/check" className="font-medium text-ink hover:text-primary-hover">
                Not sure where to start? Flywheel Check →
              </Link>
            </li>
            <li>
              <Link href="/verify" className="font-medium text-ink hover:text-primary-hover">
                Verify a credential →
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-8">
          <Suspense fallback={<div className="card min-h-[32rem]" aria-hidden />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
