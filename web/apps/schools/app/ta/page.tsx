import { ArrowRight, Check, Sparkles, Search, Award, Clock, ShieldCheck } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { SectionHead } from "@/components/blocks";
import { TaDemoBand, TaKidsBanner, TaSafetyPromise, TaStageBadge, TaStatus } from "@/components/ta/blocks";
import { PROGRAMMES, STAGE_META, band } from "@/lib/data";
import { taPageMeta } from "@/lib/seo";
import { TA_PROGRAMMES, TA_PROMISES, TA_STAGE, taClasses } from "@/lib/ta-content";

export const metadata = taPageMeta(
  "/",
  "பள்ளிகளுக்கான AI அறிவு, வகுப்பு 1 முதல் 12 வரை",
  "வகுப்பு வாரியான AI பாடத்திட்டம், பயிற்சி பெற்ற ஆசிரியர்கள், கைவேலை ஆய்வகம். CBSE, ICSE, மாநிலப் பாடத்திட்டப் பள்ளிகளுக்கு. வடிவமைப்பிலேயே பாதுகாப்பு, தமிழிலும் ஆங்கிலத்திலும்.",
);

const PROMISE_ICON = [Sparkles, Search, Award];
const PROMISE_TINT = ["var(--highlight)", "color-mix(in oklab, var(--primary) 18%, white)", "color-mix(in oklab, var(--kids) 16%, white)"];

export default function TamilHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow mb-4">CBSE · ICSE · மாநிலப் பாடத்திட்டம் · வகுப்பு 1–12</p>
            <h1 className="font-display text-[2.1rem] font-semibold leading-[1.2] text-ink md:text-[3.1rem]">
              பள்ளிகளுக்கான AI பாடத்திட்டம்.{" "}
              <span className="mt-2 block text-[0.62em] text-ink-2">பள்ளி பெருமைப்படும், பெற்றோர் நம்பும் செயற்கை நுண்ணறிவு அறிவு.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-2 md:text-xl">
              பள்ளிகளுக்கான வகுப்பு வாரியான AI பாடத்திட்டம், பயிற்சி பெற்ற ஆசிரியர்கள், கைவேலை ஆய்வகம். குழந்தைகள் AI உடன் உருவாக்கவும், அதைக் கேள்வி கேட்கவும் கற்கிறார்கள். தமிழிலும் ஆங்கிலத்திலும்.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" size="lg">
                பள்ளி டெமோ பதிவு செய்யுங்கள் <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/ta/programmes" variant="secondary" size="lg">
                பாடத்திட்டத்தைப் பாருங்கள்
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-ink-2">
              {["வகுப்பு 3–5க்கு AI கணக்குகள் இல்லை", "கண்காணிப்பு இல்லை", "தரவு இந்தியாவிலேயே"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-physical" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <HeroPhoto
            photo="classroom"
            alt="மேசைகளும் கரும்பலகையும் உள்ள வெளிச்சமான, காலியான பள்ளி வகுப்பறை"
            chip="தமிழிலும் ஆங்கிலத்திலும்"
            card={
              <>
                <FloatEyebrow>நான்கு திட்டங்கள், ஒரே சக்கரம்</FloatEyebrow>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {STAGE_META.map((s) => (
                    <TaStageBadge key={s.key} stage={s.key} />
                  ))}
                </div>
              </>
            }
          />
        </Container>
      </section>

      {/* Three promises */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {TA_PROMISES.map((p, i) => {
              const I = PROMISE_ICON[i];
              return (
                <Reveal key={p.title} delay={i * 0.08} className="card h-full p-7">
                  <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl text-ink" style={{ background: PROMISE_TINT[i] }}>
                    <I className="size-6" aria-hidden />
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-ink">{p.title}</h2>
                  <p className="mt-2 text-ink-2">{p.line}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Class by class */}
      <section id="journey" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead
            eyebrow="வகுப்பு வாரியாக"
            title="ஒவ்வொரு வயதுக்கும் சரியான படி."
            line={`நான்கு திட்டங்கள், ஒரே சக்கரம்: ${STAGE_META.map((s) => TA_STAGE[s.key].verb).join(" · ")}.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map((p, i) => {
              const t = TA_PROGRAMMES[p.slug];
              return (
                <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                  <SmartLink href={`/ta/programmes/${p.slug}`} className="card card-hover flex h-full flex-col overflow-hidden">
                    <span className="block p-6" style={{ background: p.tint }}>
                      <span className="block text-sm font-semibold text-ink-2">{taClasses(p.classRange)}</span>
                      <span className="mt-1 block font-display text-xl font-semibold text-ink">{p.name}</span>
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="block text-ink-2">{t.line}</span>
                      <span className="mt-4 flex items-start gap-2 text-sm text-muted">
                        <Clock className="mt-0.5 size-4 shrink-0" aria-hidden /> {t.time}
                      </span>
                      <span className="mt-1.5 flex items-start gap-2 text-sm text-muted">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden /> {t.aiUse}
                      </span>
                      <span className="mt-auto flex flex-wrap items-center gap-2 pt-5 text-sm text-ink-2">
                        <span className="font-semibold text-ink">{band(p.price)}</span> / மாணவர் / ஆண்டு <TaStatus status="Ed 1.1" />
                      </span>
                    </span>
                  </SmartLink>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <TaSafetyPromise />
      <TaKidsBanner />

      {/* Parents strip */}
      <section className="py-8">
        <Container className="grid gap-4 md:grid-cols-2">
          <SmartLink href="/ta/parents" className="card card-hover flex flex-col gap-3 p-7">
            <span className="eyebrow block">பெற்றோருக்கு</span>
            <span className="block font-display text-2xl font-semibold text-ink">வகுப்பு வாரியாக, உங்கள் குழந்தை என்ன கற்கும்.</span>
            <span className="mt-auto inline-flex items-center gap-1.5 font-semibold text-ink">
              பெற்றோர் வழிகாட்டி <ArrowRight className="size-4" aria-hidden />
            </span>
          </SmartLink>
          <SmartLink href="/ta/mission" className="card card-hover flex flex-col gap-3 p-7">
            <span className="eyebrow block">அரசுப் பள்ளிகளுக்கு</span>
            <span className="block font-display text-2xl font-semibold text-ink">தமிழில் முதலில். இணையம் இல்லாமலும்.</span>
            <span className="mt-auto inline-flex items-center gap-1.5 font-semibold text-ink">
              மிஷன் பள்ளிகள் <ArrowRight className="size-4" aria-hidden />
            </span>
          </SmartLink>
        </Container>
      </section>

      <TaDemoBand />
    </>
  );
}
