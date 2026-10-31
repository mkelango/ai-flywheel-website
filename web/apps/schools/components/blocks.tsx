import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowRight, BookOpen, GraduationCap, ClipboardCheck, Trophy, Heart, FlaskConical, ShieldCheck, MessageCircle } from "lucide-react";
import { Button, Breadcrumbs, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { SAFETY, STAGE_META, WHATSAPP_URL, type StageKey } from "@/lib/data";
import { ORG_ID, SITE, UPDATED } from "@/lib/seo";
import { KidsArt, Squiggle } from "./art";

export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  art,
  crumbs,
  updated,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  art?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  /** Show the visible "Updated <month year>" line (reference pages). */
  updated?: boolean;
  className?: string;
}) {
  return (
    <section className={clsx("relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-14", className)}>
      <Container className={clsx("grid items-center gap-10", art && "lg:grid-cols-[1.1fr_0.9fr]")}>
        <div className="max-w-2xl">
          {crumbs && (
            <div className="mb-6">
              <Breadcrumbs items={crumbs} base={SITE} />
            </div>
          )}
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="font-display text-[2.3rem] font-semibold leading-[1.08] text-ink md:text-[3.4rem]">{title}</h1>
          <Squiggle className="mt-5 w-28" />
          {intro && <p className="mt-5 max-w-xl text-lg text-ink-2 md:text-xl">{intro}</p>}
          {updated && (
            <p className="mt-3 text-sm text-muted">
              Updated <time dateTime={UPDATED.iso}>{UPDATED.label}</time>
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {art && <div className="relative">{art}</div>}
      </Container>
    </section>
  );
}

/** Stage badge: tinted background, ink text (layer colours are too light for text). */
export function StageBadge({ stage, className }: { stage: StageKey; className?: string }) {
  const s = STAGE_META.find((x) => x.key === stage)!;
  return (
    <span
      className={clsx("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold text-ink", className)}
      style={{ background: `color-mix(in oklab, ${s.color} 16%, white)` }}
    >
      <span className="size-2 rounded-full" style={{ background: s.color }} aria-hidden />
      {s.verb}
    </span>
  );
}

const ICONS = { book: BookOpen, cap: GraduationCap, report: ClipboardCheck, trophy: Trophy, heart: Heart, lab: FlaskConical } as const;

export function IconTile({ icon, title, line, tint = "var(--highlight)", delay = 0 }: { icon: keyof typeof ICONS; title: string; line: string; tint?: string; delay?: number }) {
  const I = ICONS[icon];
  return (
    <Reveal delay={delay} className="card card-hover h-full p-6">
      <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl text-ink" style={{ background: tint }}>
        <I className="size-6" aria-hidden />
      </span>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-muted">{line}</p>
    </Reveal>
  );
}

/** The six-line safety promise (homepage, Parents, Kids). */
export function SafetyPromise({ id = "safety", eyebrow = "Safety promise", dark = true }: { id?: string; eyebrow?: string; dark?: boolean }) {
  return (
    <section id={id} className={clsx("scroll-mt-24 py-16 md:py-24", dark ? "bg-inverse text-inverse-ink" : "bg-surface-2")}>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className={clsx("eyebrow mb-3", dark && "!text-inverse-ink/70")}>{eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-[2.6rem]">Safe by design.</h2>
          <p className={clsx("mt-4 text-lg", dark ? "opacity-80" : "text-muted")}>Six rules, stated plainly. Then built in.</p>
          <SmartLink href="/trust" className={clsx("mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline", dark ? "text-highlight" : "text-ink")}>
            Trust centre for schools <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {SAFETY.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.05} className={clsx("flex h-full gap-4 rounded-[var(--radius-card)] p-5", dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-surface ring-1 ring-line")}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-display font-semibold text-on-accent">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className={clsx("mt-0.5 block text-[0.95rem]", dark ? "opacity-75" : "text-muted")}>{s.line}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function KidsBanner() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Reveal className="kids-band relative grid items-center gap-6 overflow-hidden rounded-[32px] px-6 py-10 text-white md:grid-cols-[1.3fr_0.7fr] md:px-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/85">AI Flywheel Kids · by AI Flywheel at Schools</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">Summer camps and weekend clubs for Classes 3–8.</h2>
            <p className="mt-3 text-lg text-white/90">Make it. Question it. Share it.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/kids/find" variant="accent">
                Find a Kids camp <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/kids" variant="ghost" className="!text-white hover:!bg-white/15">
                Meet AI Flywheel Kids
              </Button>
            </div>
          </div>
          <KidsArt className="mx-auto hidden w-full max-w-[260px] md:block" />
        </Reveal>
      </Container>
    </section>
  );
}

/** Final call to action: demo + WhatsApp. */
export function DemoBand({ title = "See a lesson with your own students.", line = "On site or online. 45 minutes. No obligation." }: { title?: string; line?: string }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-surface-2 px-6 py-12 text-center ring-1 ring-line md:px-12 md:py-16">
          <p className="eyebrow mb-3">Book a school demo</p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight text-ink md:text-[2.6rem]">{title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted">{line}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/demo" size="lg">
              Book a school demo <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href={WHATSAPP_URL} variant="secondary" size="lg" className="bg-surface">
              <MessageCircle className="size-4" aria-hidden /> Talk to us on WhatsApp
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="size-4" aria-hidden /> We ask for adult details only. No tracking on this site.
          </p>
        </div>
      </Container>
    </section>
  );
}

/** "Ask your school to join": on every parent-facing page. */
export function AskSchool({ id = "ask" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <Container>
        <div className="card flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Want this at your child’s school?</h2>
            <p className="mt-1.5 text-muted">Forward this page to the principal, or ask them to book a demo.</p>
          </div>
          <Button href="/demo?role=parent" variant="secondary">
            Ask your school to join <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function SectionHead({ eyebrow, title, line, center, className }: { eyebrow: string; title: ReactNode; line?: ReactNode; center?: boolean; className?: string }) {
  return (
    <header className={clsx("mb-10 max-w-2xl md:mb-12", center && "mx-auto text-center", className)}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">{title}</h2>
      {line && <p className="mt-4 text-lg text-muted">{line}</p>}
    </header>
  );
}

/** Structured data for search engines. Not executed, so it adds no script to the page. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Short reference to the organisation, for provider/publisher fields. The full node is in the root layout. */
export const SCHOOLS_ORG = { "@type": "EducationalOrganization", "@id": ORG_ID, name: "AI Flywheel at Schools", url: SITE } as const;

/** FAQPage data from question-and-answer pairs. */
export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});
