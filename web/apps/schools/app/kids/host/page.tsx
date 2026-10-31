import type { Metadata } from "next";
import { ArrowRight, GraduationCap, Package, Megaphone, HandCoins } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { HandsWork } from "@/components/families/art";
import { KidsHero, KidsSafety, kidsButton } from "@/components/families/kids";
import { HOST_OFFER, HOST_STEPS } from "@/lib/families";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/kids/host");

const ICONS = [GraduationCap, Package, Megaphone, HandCoins];

export default function KidsHostPage() {
  return (
    <div className="font-sans">
      <KidsHero
        crumbs={[{ label: "Home", href: "/" }, { label: "AI Flywheel Kids", href: "/kids" }, { label: "Host a camp" }]}
        eyebrow="For schools and learning centres"
        title="Host a kids AI camp at your school or centre."
        intro="Host a kids AI camp for Classes 3–8, run by your people, with our training, kit and marketing. On a revenue share."
        actions={
          <Button href="/demo?role=host" size="lg" className={kidsButton}>
            Talk to us about hosting <ArrowRight className="size-4" aria-hidden />
          </Button>
        }
        art={<HandsWork className="mx-auto w-full max-w-[420px]" kind="robot" />}
      />

      <section className="py-14 md:py-20">
        <Container>
          <p className="eyebrow mb-3">What we bring</p>
          <h2 className="mb-10 font-display text-3xl font-bold leading-tight text-ink md:text-[2.4rem]">Everything to run a great camp.</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOST_OFFER.map((o, i) => {
              const I = ICONS[i];
              return (
                <Reveal key={o.title} delay={i * 0.05} className="h-full rounded-[28px] bg-surface p-6 ring-1 ring-line">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--kids)_14%,white)] text-[var(--kids)]">
                    <I className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{o.title}</h3>
                  <p className="mt-1 text-muted">{o.line}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="kids-sky py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.4rem]">From one camp to a school partnership.</h2>
            <p className="mt-4 text-lg text-muted">A camp lets parents and teachers see the work first.</p>
            <SmartLink href="/for-schools" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              About the School Flywheel Partnership <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {HOST_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-3xl bg-surface/90 p-5 ring-1 ring-line">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--kids)] font-display font-semibold text-white">{i + 1}</span>
                <span>
                  <span className="block font-display font-semibold text-ink">{s.title}</span>
                  <span className="block text-muted">{s.line}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <KidsSafety />

      <section className="pb-16">
        <Container>
          <div className="kids-band flex flex-col gap-6 rounded-[32px] p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-display text-2xl font-bold">Hosting for summer 2027?</h2>
              <p className="mt-1 max-w-lg text-white/90">Talk to us by February. We ask for adult contact details only.</p>
            </div>
            <Button href="/demo?role=host" variant="accent">
              Send a hosting enquiry
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
