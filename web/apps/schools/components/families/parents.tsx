import clsx from "clsx";
import { ArrowRight, Mail, ShieldCheck, Smartphone, UserCheck, Eye } from "lucide-react";
import { Container, SmartLink } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { PARENT_TOPICS, CONSENT_STEPS, type ParentTopicSlug } from "@/lib/families";

/** Pill row linking the five parent topics; current one is marked. */
export function ParentTopicNav({ current }: { current: ParentTopicSlug }) {
  return (
    <nav aria-label="Parent topics" className="pb-10">
      <Container>
        <ul className="flex flex-wrap gap-2">
          {PARENT_TOPICS.map((t) => {
            const on = t.slug === current;
            return (
              <li key={t.slug}>
                <SmartLink
                  href={`/parents/${t.slug}`}
                  aria-current={on ? "page" : undefined}
                  className={clsx(
                    "inline-flex min-h-11 items-center rounded-pill border px-4 text-[0.95rem] font-medium transition",
                    on ? "border-ink bg-ink text-bg" : "border-line text-ink hover:border-ink/60",
                  )}
                >
                  {t.label}
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}

/** Small closing links on every parent subpage: ask the school, and a soft adult link outside any child flow. */
export function ParentLinks() {
  return (
    <section className="border-t border-line py-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
        <SmartLink href="/demo?role=parent" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
          Ask your school to join <ArrowRight className="size-4" aria-hidden />
        </SmartLink>
        <SmartLink href={siteHref("flywheel", "/programmes/foundation")} className="inline-flex min-h-11 items-center gap-1.5 text-muted underline-offset-4 hover:text-ink hover:underline">
          For you, not your child: AI for your own work <ArrowRight className="size-4" aria-hidden />
        </SmartLink>
      </Container>
    </section>
  );
}

const CONSENT_ICONS = [Mail, Smartphone, UserCheck, Eye];

/** School invites → parent verifies with OTP → account created → parent can view, download or delete. */
export function ConsentFlow() {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {CONSENT_STEPS.map((s, i) => {
        const I = CONSENT_ICONS[i];
        return (
          <li key={s.title} className="card relative p-5">
            <span className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-display font-semibold text-on-accent">{i + 1}</span>
              <I className="size-5 text-ink" aria-hidden />
            </span>
            <p className="mt-4 font-display font-semibold text-ink">{s.title}</p>
            <p className="mt-1 text-[0.95rem] text-muted">{s.line}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function SafetyNote({ className }: { className?: string }) {
  return (
    <p className={clsx("inline-flex items-start gap-2 text-sm text-muted", className)}>
      <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden /> Forms on this site ask for a parent’s details only. Your child’s details are entered only inside the platform, after your consent.
    </p>
  );
}
