import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Check } from "lucide-react";
import { Section } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { StepList } from "@/components/orgs/blocks";
import { CheckForm } from "@/components/orgs/CheckForm";
import { CHECK_REPORT, CHECK_SCAN } from "@/lib/orgs";

export const metadata: Metadata = pageMeta("/business/check");

export default function BusinessCheckPage() {
  return (
    <>
      <PageHero
        eyebrow="Flywheel Check · for organisations"
        title="An AI readiness assessment of your people."
        intro="An AI readiness assessment for organisations: a capability scan, then a scored report you can act on."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Flywheel Check" }]}
      />

      <Section id="scan" eyebrow="The capability scan" title="Three things we measure.">
        <StepList steps={CHECK_SCAN} cols={3} />
      </Section>

      <section id="book" className="scroll-mt-20 border-t border-line py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">The scored report</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-[2.6rem]">What you get back.</h2>
            <ul className="mt-8 space-y-3">
              {CHECK_REPORT.map((r) => (
                <li key={r} className="flex items-start gap-3 text-ink-2">
                  <Check className="mt-0.5 size-5 shrink-0 text-physical" aria-hidden /> {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Just you? <Link href="/check" className="font-medium text-ink underline underline-offset-4">Take the free individual check</Link>
            </p>
          </div>
          <div className="lg:col-span-7">
            <CheckForm />
          </div>
        </div>
      </section>

      <QuickAnswers {...ANSWERS["/business/check"]} />
    </>
  );
}
