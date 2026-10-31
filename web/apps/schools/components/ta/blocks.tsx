/**
 * Tamil versions of the shared blocks (components/blocks.tsx), same design, Tamil copy.
 * Server components.
 */
import clsx from "clsx";
import { ArrowRight, MessageCircle, ShieldCheck, Mail, Smartphone, UserCheck, Eye } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { STAGE_META, WHATSAPP_URL, type StageKey } from "@/lib/data";
import { TA_CONSENT_STEPS, TA_SAFETY, TA_SITE_LINE, TA_STAGE, TA_STATUS, type TaStatusKey } from "@/lib/ta-content";
import { KidsArt } from "@/components/art";

/** Claim-status label (same look as StatusTag), in Tamil. */
export function TaStatus({ status }: { status: TaStatusKey }) {
  return <span className="whitespace-nowrap rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[0.72rem] font-medium text-muted">{TA_STATUS[status]}</span>;
}

export function TaStageBadge({ stage, className }: { stage: StageKey; className?: string }) {
  const s = STAGE_META.find((x) => x.key === stage)!;
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold text-ink", className)} style={{ background: `color-mix(in oklab, ${s.color} 16%, white)` }}>
      <span className="size-2 rounded-full" style={{ background: s.color }} aria-hidden />
      {TA_STAGE[stage].verb}
    </span>
  );
}

/** Pill row of topic links; the current one is marked. */
export function TaTopicNav({ label, items, current }: { label: string; items: { href: string; label: string; key: string }[]; current: string }) {
  return (
    <nav aria-label={label} className="pb-10">
      <Container>
        <ul className="flex flex-wrap gap-2">
          {items.map((t) => {
            const on = t.key === current;
            return (
              <li key={t.key}>
                <SmartLink
                  href={t.href}
                  aria-current={on ? "page" : undefined}
                  className={clsx("inline-flex min-h-11 items-center rounded-pill border px-4 text-[0.95rem] font-medium transition", on ? "border-ink bg-ink text-bg" : "border-line text-ink hover:border-ink/60")}
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

/** The six-line safety promise, in Tamil. */
export function TaSafetyPromise({ id = "safety", dark = true }: { id?: string; dark?: boolean }) {
  return (
    <section id={id} className={clsx("scroll-mt-24 py-16 md:py-24", dark ? "bg-inverse text-inverse-ink" : "bg-surface-2")}>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className={clsx("eyebrow mb-3", dark && "!text-inverse-ink/70")}>பாதுகாப்பு வாக்குறுதி</p>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-[2.4rem]">வடிவமைப்பிலேயே பாதுகாப்பு.</h2>
          <p className={clsx("mt-4 text-lg", dark ? "opacity-80" : "text-muted")}>ஆறு விதிகள், தெளிவாகச் சொல்லி, உள்ளேயே கட்டமைத்தவை.</p>
          <SmartLink href="/ta/parents/safety" className={clsx("mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline", dark ? "text-highlight" : "text-ink")}>
            பெற்றோருக்கு, விரிவாக <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {TA_SAFETY.map((s, i) => (
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

export function TaKidsBanner() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Reveal className="kids-band relative grid items-center gap-6 overflow-hidden rounded-[32px] px-6 py-10 text-white md:grid-cols-[1.3fr_0.7fr] md:px-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/85">AI Flywheel Kids · by AI Flywheel at Schools</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">வகுப்பு 3–8க்கு கோடை முகாம்களும் வார இறுதி கிளப்களும்.</h2>
            <p className="mt-3 text-lg text-white/90">{TA_SITE_LINE}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/ta/kids" variant="accent">
                AI Flywheel Kids பற்றி <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/kids/find" variant="ghost" className="!text-white hover:!bg-white/15">
                அருகில் முகாம் தேடுங்கள் (English)
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
export function TaDemoBand({ title = "உங்கள் சொந்த மாணவர்களுடன் ஒரு பாடத்தைப் பாருங்கள்.", line = "பள்ளியிலோ ஆன்லைனிலோ. 45 நிமிடம். எந்தக் கட்டாயமும் இல்லை." }: { title?: string; line?: string }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-surface-2 px-6 py-12 text-center ring-1 ring-line md:px-12 md:py-16">
          <p className="eyebrow mb-3">பள்ளி டெமோ</p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight text-ink md:text-[2.4rem]">{title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted">{line}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/demo" size="lg">
              பள்ளி டெமோ பதிவு செய்யுங்கள் <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href={WHATSAPP_URL} variant="secondary" size="lg" className="bg-surface">
              <MessageCircle className="size-4" aria-hidden /> WhatsApp-இல் பேசுங்கள்
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="size-4 shrink-0" aria-hidden /> பெரியவர்களின் விவரங்கள் மட்டுமே கேட்கிறோம். இந்தத் தளத்தில் கண்காணிப்பு இல்லை.
          </p>
        </div>
      </Container>
    </section>
  );
}

/** "Ask your school to join", for parent-facing pages. */
export function TaAskSchool({ id = "ask" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <Container>
        <div className="card flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">உங்கள் குழந்தையின் பள்ளியில் இது வேண்டுமா?</h2>
            <p className="mt-1.5 text-muted">இந்தப் பக்கத்தை முதல்வருக்கு அனுப்புங்கள், அல்லது டெமோ பதிவு செய்யச் சொல்லுங்கள்.</p>
          </div>
          <Button href="/demo?role=parent" variant="secondary">
            பள்ளியைச் சேரச் சொல்லுங்கள் <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}

const CONSENT_ICONS = [Mail, Smartphone, UserCheck, Eye];

export function TaConsentFlow() {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {TA_CONSENT_STEPS.map((s, i) => {
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

