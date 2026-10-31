import type { ReactNode } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Breadcrumbs, Button, Container, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { Sparkle, Squiggle } from "@/components/art";
import { SITE } from "@/lib/seo";
import { KIDS_PRODUCTS } from "@/lib/data";
import { KIDS_SAFETY_RULES, type KidsProductId } from "@/lib/families";

/** Brighter Kids hero for /kids/* subpages. */
export function KidsHero({
  crumbs,
  eyebrow,
  title,
  intro,
  kidLine,
  actions,
  art,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  kidLine?: string;
  actions?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <section className="kids-sky relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-14">
      <Sparkle className="spin-slow absolute right-[8%] top-8 hidden size-7 md:block" color="var(--kids)" />
      <Container className={art ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]" : undefined}>
        <div className="max-w-2xl">
          <div className="mb-6">
            <Breadcrumbs items={crumbs} base={SITE} />
          </div>
          <p className="inline-flex items-center gap-2 rounded-pill bg-surface/80 px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-[color-mix(in_oklab,var(--kids)_30%,transparent)]">
            <span className="size-2.5 rounded-full bg-[var(--kids)]" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[2.3rem] font-bold leading-[1.06] text-ink md:text-[3.4rem]">{title}</h1>
          <Squiggle className="mt-5 w-28" color="var(--kids)" />
          {intro && <p className="mt-5 max-w-xl text-lg text-ink-2 md:text-xl">{intro}</p>}
          {kidLine && <p className="mt-3 font-display text-lg font-medium text-ink">{kidLine}</p>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {art && <div className="relative">{art}</div>}
      </Container>
    </section>
  );
}

export const kidsButton = "!bg-[var(--kids)] !shadow-[0_10px_30px_-12px_var(--kids)] hover:!brightness-110";

export function KidsCtas({ secondary }: { secondary?: ReactNode }) {
  return (
    <>
      <Button href="/kids/find" size="lg" className={kidsButton}>
        Find a Kids camp <ArrowRight className="size-4" aria-hidden />
      </Button>
      {secondary ?? (
        <Button href="/demo?role=parent" variant="secondary" size="lg" className="bg-surface/70">
          Ask your school to join
        </Button>
      )}
    </>
  );
}

/** Same safety rules as school, as a compact list. */
export function KidsSafety() {
  return (
    <section className="py-14 md:py-20">
      <Container className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-3">Same safety rules</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.4rem]">As safe as school.</h2>
          <SmartLink href="/parents/safety" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            Is AI safe for children? Read the promise <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {KIDS_SAFETY_RULES.map((s) => (
            <li key={s} className="flex items-center gap-3 rounded-3xl bg-surface p-4 ring-1 ring-line">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--kids)_14%,white)] text-[var(--kids)]">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <span className="font-medium text-ink">{s}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Links to the other Kids products. */
export function OtherKids({ current }: { current?: KidsProductId }) {
  return (
    <section className="pb-6">
      <Container>
        <p className="eyebrow mb-4">More ways to join · Classes 3–8</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {KIDS_PRODUCTS.filter((p) => p.id !== current).map((p) => (
            <li key={p.id}>
              <SmartLink href={`/kids/${p.id}`} className="flex min-h-11 h-full items-center gap-3 rounded-3xl bg-surface p-4 ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-[var(--kids)]">
                <span className="size-3 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden />
                <span>
                  <span className="block font-display font-semibold text-ink">{p.name}</span>
                  <span className="block text-sm text-muted">
                    {p.price} <StatusTag status="Proposed" />
                  </span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
