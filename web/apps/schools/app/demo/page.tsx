import type { Metadata } from "next";
import { Clock, MonitorPlay, ShieldCheck, MessageCircle } from "lucide-react";
import { Breadcrumbs, Container } from "@flywheel/ui/components/primitives";
import { DemoForm } from "@/components/DemoForm";
import { Squiggle } from "@/components/art";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { SITE, pageMeta } from "@/lib/seo";

const CRUMBS = [{ label: "Home", href: "/" }, { label: "Book a demo" }];

export const metadata: Metadata = pageMeta("/demo");

export default function DemoPage() {
  return (
    <>
    <section className="pb-20 pt-10 md:pt-14">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Breadcrumbs items={CRUMBS} base={SITE} />
          <p className="eyebrow mb-4 mt-6">Book a school demo</p>
          <h1 className="font-display text-[2.3rem] font-semibold leading-[1.08] text-ink md:text-[3.2rem]">Book an AI curriculum demo with your own students.</h1>
          <Squiggle className="mt-5 w-28" />
          <p className="mt-5 text-lg text-ink-2">Our AI curriculum demo for schools is a sample lesson for the class band you choose. No obligation.</p>
          <ul className="mt-8 space-y-4 text-ink-2">
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden /> 45 minutes, on site or online.
            </li>
            <li className="flex gap-3">
              <MonitorPlay className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden /> A sample lesson for the class band you choose.
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden /> Prefer WhatsApp? Tick the box and we’ll message you.
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden /> Adult details only. Never a child’s.
            </li>
          </ul>
        </div>
        <DemoForm />
      </Container>
    </section>
    <QuickAnswers items={ANSWERS["/demo"]} className="!pt-0" />
    <RelatedLinks
      links={[
        { href: "/check", label: "School AI readiness check" },
        { href: "/pilot", label: "AI pilot programme for schools" },
        { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
      ]}
    />
    </>
  );
}
