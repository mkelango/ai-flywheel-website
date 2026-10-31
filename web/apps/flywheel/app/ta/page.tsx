import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, Building, GraduationCap, Landmark, Languages, Lock } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { Reveal, Accordion } from "@flywheel/ui/components/interactive";
import { WheelMark } from "@flywheel/ui/components/WheelMark";
import { getProgramme, PROGRAMMES, type Programme } from "@/lib/programmes";
import { TA_HOME_FAQ, TA_LEVEL_NAMES, TA_LEVELS, TA_WHEEL, taAlternates } from "@/lib/ta-content";
import { JsonLd, LayerBar } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { TaProgrammeCard, TaSection } from "@/components/ta/ui";

const taMeta = pageMeta("/ta");
export const metadata: Metadata = {
  ...taMeta,
  alternates: taAlternates("/"),
  openGraph: { ...taMeta.openGraph, locale: "ta_IN", url: "/ta" },
};

const DOORS = [
  { icon: GraduationCap, who: "நான் மாணவர் அல்லது பணியில் சேரப் போகிறேன்", what: "இலவசமாகத் தொடங்கு", href: "/ta/programmes/foundation" },
  { icon: Briefcase, who: "நான் பணியில் இருக்கிறேன்", what: "பணியாளர்களுக்கு", href: "/ta/professionals" },
  { icon: Building, who: "நான் ஒரு கல்லூரியை நடத்துகிறேன்", what: "உயர்கல்விக்கு", href: "/ta/higher-education" },
  { icon: Landmark, who: "நான் ஒரு நிறுவனம் அல்லது துறையை வழிநடத்துகிறேன்", what: "நிறுவனங்கள், அரசுக்கு", href: "/ta/business" },
];

const TRUST = [
  { icon: BadgeCheck, label: "வருகைக்கு அல்ல, சான்றுக்குச் சான்றிதழ்" },
  { icon: Languages, label: "தமிழ் மற்றும் ஆங்கிலம்" },
  { icon: Lock, label: "உங்கள் தரவு இந்தியாவிலேயே" },
];

const FEATURED = ["foundation", "generative-ai-practitioner", "agentic-ai-engineer"];

export default function TamilHome() {
  const featured = FEATURED.map(getProgramme).filter(Boolean) as Programme[];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-site grid items-center gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5">கற்றுக்கொள். உருவாக்கு. நிரூபி.</p>
              <h1 className="font-display text-[1.85rem] font-semibold leading-[1.3] text-ink [overflow-wrap:anywhere] sm:text-5xl lg:text-[3.6rem]">
                உங்கள் முதல் prompt முதல் <span className="text-primary-hover">முதல் production முகவர் வரை.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">
                எம். கே. இளங்கோவின் AI Flywheel முறையில் அமைந்த நடைமுறை AI பாடங்கள். உருவாக்கிக் கற்றுக்கொள்ளுங்கள். செய்யக்கூடியதற்குச் சான்று பெறுங்கள்.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/ta/programmes/foundation" size="lg">
                  இலவசமாகத் தொடங்கு <span className="hidden font-normal opacity-80 sm:inline">· C1, 6 மணி நேரம்</span>
                </Button>
                <Button href="/ta/programmes" variant="secondary" size="lg">
                  பாடத்தைக் கண்டறி
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="mx-auto lg:col-span-5">
            <WheelMark size={280} animate title="AI Flywheel சக்கரம்" />
          </div>
        </div>
        <div className="border-y border-line bg-surface/60">
          <ul className="container-site grid gap-x-6 gap-y-3 py-5 text-sm text-ink-2 sm:grid-cols-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-primary-hover" aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Door chooser */}
      <TaSection eyebrow="நான்கு வாசல்கள்" title="எங்கிருந்து தொடங்க விரும்புகிறீர்கள்?">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOORS.map(({ icon: Icon, who, what, href }, i) => (
            <Reveal key={who} delay={i * 0.06}>
              <Link href={href} className="card card-hover group flex h-full min-h-44 flex-col p-6">
                <Icon className="size-6 text-ink" aria-hidden />
                <span className="mt-6 font-display text-lg font-semibold leading-snug text-ink">{who}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary-hover">
                  {what} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          அரசுத் துறையா?{" "}
          <Link href="/ta/government" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            அரசுக்கான AI Flywheel →
          </Link>
        </p>
      </TaSection>

      {/* Ladder */}
      <section className="border-y border-line bg-surface-2/50 py-16 md:py-24">
        <div className="container-site">
          <header className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">நிலை ஏணி · C1 முதல் C5 வரை</p>
            <h2 className="font-display text-[1.75rem] font-semibold leading-[1.3] text-ink md:text-4xl">ஐந்து நிலைகள். ஒவ்வொன்றும் உண்மையான வேலையில் பெறுவது.</h2>
            <p className="mt-4 text-lg text-muted">உண்மையான வேலையின் சான்றும், AI இல்லாமல் ஒரு சோதனையும் இல்லாமல் எந்த நிலையும் இல்லை.</p>
          </header>
          <ol className="grid gap-3 md:grid-cols-5">
            {TA_LEVELS.map((l, i) => (
              <li key={l.code} className="card flex flex-col p-5">
                <span className="font-mono text-sm font-semibold text-primary-hover">{l.code}</span>
                <span className="mt-1 font-display text-xl font-semibold text-ink">{TA_LEVEL_NAMES[l.code]}</span>
                <span className="mt-2 text-sm text-ink-2">{l.line}</span>
                <span className="mt-auto pt-4 text-xs text-muted">சான்று: {l.evidence}</span>
                <span className="mt-3 h-1.5 rounded-pill bg-primary" style={{ width: `${(i + 1) * 20}%` }} aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured programmes */}
      <TaSection eyebrow="சிறப்புப் பாடங்கள்" title="இலவசமாகத் தொடங்குங்கள். மையத்தில் ஒரு குழுப் பயிற்சி.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} className="h-full">
              <TaProgrammeCard p={p} />
            </Reveal>
          ))}
          <Reveal delay={0.2} className="h-full">
            <Link href="/ta/programmes" className="group flex h-full min-h-56 flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-ink/25 p-6 hover:border-ink/60">
              <span className="eyebrow">பட்டியல்</span>
              <span>
                <span className="block font-display text-5xl font-semibold text-ink">{PROGRAMMES.length}</span>
                <span className="mt-1 block text-muted">பாடங்கள், C1 முதல் C5 வரை</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                அனைத்தையும் பாருங்கள் <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </TaSection>

      {/* Four stages */}
      <TaSection eyebrow="நான்கு கட்டங்கள்" title="ஒரு சக்கரம், நான்கு கட்டங்கள்." className="pt-0 md:pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TA_WHEEL.map((s, i) => (
            <div key={s.key} className="card relative h-full overflow-hidden p-6">
              <span className="absolute inset-y-0 left-0 w-1" style={{ background: s.color }} aria-hidden />
              <p className="font-mono text-[0.75rem] tracking-wider text-ink-2">
                <span className="text-muted">0{i + 1} ·</span> {s.verb}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.name}</h3>
              <p className="mt-1 text-sm text-muted">{s.line}.</p>
            </div>
          ))}
        </div>
      </TaSection>

      {/* 70 / 20 / 10 */}
      <TaSection eyebrow="எப்படிக் கற்கிறீர்கள் · 70 / 20 / 10" title="பெரும்பாலும் உருவாக்குதல். கொஞ்சம் வழிகாட்டல். சிறிது வகுப்பு." className="pt-0 md:pt-0">
        <div className="flex h-16 w-full overflow-hidden rounded-[var(--radius-card)] text-sm font-medium md:h-20">
          <div className="flex basis-[70%] items-center bg-inverse px-5 text-inverse-ink">
            <span className="font-display text-2xl md:text-3xl">70%</span>
          </div>
          <div className="flex basis-[20%] items-center bg-primary px-3 text-on-primary md:px-5">
            <span className="font-display text-xl md:text-2xl">20%</span>
          </div>
          <div className="flex basis-[10%] items-center justify-center bg-highlight text-ink">
            <span className="font-display text-lg md:text-xl">10%</span>
          </div>
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-medium text-ink">70% · உங்கள் திட்டம்</dt>
            <dd className="text-muted">Studio-வில் ஒரு உண்மையான பயன்பாடு</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">20% · வழிகாட்டல்</dt>
            <dd className="text-muted">பயிற்றுநர்கள், வாயில் மதிப்பாய்வு, சகாக்கள்</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">10% · வகுப்பு</dt>
            <dd className="text-muted">வாரத்துக்குச் சுமார் ஒரு மணி நேரம்</dd>
          </div>
        </dl>
      </TaSection>

      {/* Final CTA + FAQ */}
      <section className="pb-20 md:pb-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LayerBar className="mb-8 max-w-40" />
            <h2 className="font-display text-[2rem] font-semibold leading-[1.25] text-ink md:text-5xl">இருக்கும் இடத்திலிருந்து தொடங்குங்கள். இலவசம்.</h2>
            <p className="mt-4 text-lg text-muted">தமிழ் அல்லது ஆங்கிலம். கார்டு தேவையில்லை.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/ta/programmes/foundation" size="lg">
                இலவசமாகத் தொடங்கு
              </Button>
              <Button href="/contact?tag=professionals" variant="secondary" size="lg">
                ஆலோசகருடன் பேசுங்கள்
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Accordion items={TA_HOME_FAQ} />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "ta-IN",
          mainEntity: TA_HOME_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
