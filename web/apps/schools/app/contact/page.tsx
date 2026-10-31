import type { Metadata } from "next";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container, SmartLink } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/blocks";
import { ContactForm } from "@/components/offer/ContactForm";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/contact");

const QUICK = [
  { href: "/demo", label: "Book a school demo", line: "45 minutes, on site or online" },
  { href: "/check", label: "Take the School Flywheel Check", line: "15 minutes, instant report" },
  { href: "/trust", label: "Trust centre", line: "Safety, privacy and consent" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} eyebrow="Contact us" title="Contact AI Flywheel at Schools." intro="Contact AI Flywheel at Schools about your school, your child, a Mission programme or CSR funding. We reply within two working days." />

      <section className="pb-16 md:pb-24">
        <Container className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <ContactForm />
          <aside className="space-y-4">
            <p className="eyebrow">Quicker routes</p>
            {QUICK.map((q) => (
              <SmartLink key={q.href} href={q.href} className="card card-hover flex items-center justify-between gap-3 p-5">
                <span>
                  <span className="block font-display font-semibold text-ink">{q.label}</span>
                  <span className="block text-sm text-muted">{q.line}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-ink" aria-hidden />
              </SmartLink>
            ))}
            <p className="flex gap-2 rounded-2xl bg-surface-2/70 p-4 text-sm text-ink-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden /> Adult details only. We never ask for a child’s details here, and there is no tracking on this site.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
