import { ArrowRight, Sun, CalendarDays, Bot, House, ShieldCheck, School, MapPin } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { KidsArt, Sparkle, Squiggle } from "@/components/art";
import { TaAskSchool, TaStatus } from "@/components/ta/blocks";
import { CITIES, KIDS_PRODUCTS, STAGE_META } from "@/lib/data";
import { taPageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/seo";
import { ANSWERS_TA } from "@/lib/answers";
import { TA_CITIES, TA_KIDS, TA_KIDS_PRICE, TA_KIDS_SAFETY, TA_STAGE } from "@/lib/ta-content";

export const metadata = taPageMeta(
  "/kids",
  "AI Flywheel Kids: வகுப்பு 3–8க்கு AI கோடை முகாம்கள், கிளப்கள்",
  "8 முதல் 14 வயதுக் குழந்தைகள் கதைகள், உதவி போட்கள், நகரும் ரோபோக்களை உருவாக்கி, ஒரு இயந்திரத்தை எப்போது நம்பக்கூடாது என்றும் கற்கும் முகாம்கள், கிளப்கள். சென்னை, கோயம்புத்தூர், மதுரை, திருச்சிராப்பள்ளி.",
);

const ICON = { sun: Sun, calendar: CalendarDays, bot: Bot, house: House } as const;
const kidsButton = "!bg-[var(--kids)] !shadow-[0_10px_30px_-12px_var(--kids)] hover:!brightness-110";

export default function TaKidsPage() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="kids-sky relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-14">
        <Sparkle className="spin-slow absolute left-[6%] top-10 hidden size-8 md:block" color="var(--kids)" />
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex flex-wrap items-center gap-2 rounded-pill bg-surface/80 px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-[color-mix(in_oklab,var(--kids)_30%,transparent)]">
              <span className="size-2.5 rounded-full bg-[var(--kids)]" aria-hidden />
              AI Flywheel Kids <span className="font-normal text-muted">· by AI Flywheel at Schools</span>
            </p>
            <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.15] text-ink md:text-[4rem]">
              <span className="mb-4 block text-[0.42em] font-semibold leading-tight text-ink-2">குழந்தைகளுக்கான AI வகுப்புகள், வகுப்பு 3–8</span>{" "}
              உருவாக்கு.
              <br />
              <span className="text-[var(--kids)]">கேள்வி கேள்.</span>
              <br />
              பகிர்.
            </h1>
            <Squiggle className="mt-5 w-36" color="var(--kids)" />
            <p className="mt-5 max-w-xl text-lg text-ink-2 md:text-xl">
              8 முதல் 14 வயதுக் குழந்தைகளுக்கான AI வகுப்புகள்: கதைகள், உதவி போட்கள், நகரும் ரோபோக்களை உருவாக்கும் முகாம்கள், கிளப்கள். ஒரு இயந்திரத்தை எப்போது நம்பக்கூடாது என்றும் கற்கிறார்கள்.
            </p>
            <p className="mt-3 font-display text-lg font-medium text-ink">உனக்கு: ஒரு ரோபோ செய், பிறகு அதை நியாயமாக நடக்கக் கற்றுக்கொடு.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#find" size="lg" className={kidsButton}>
                அருகில் ஒரு முகாம் <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="#products" variant="secondary" size="lg" className="bg-surface/70">
                நான்கு வழிகள்
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {STAGE_META.map((s) => (
                <span key={s.key} className="inline-flex items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-sm font-semibold text-white" style={{ background: s.key === "agentic" ? "#8F5A00" : s.color }}>
                  {TA_STAGE[s.key].verb}
                </span>
              ))}
            </div>
          </div>
          <KidsArt className="mx-auto w-full max-w-[460px]" />
        </Container>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <header className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">முகாம்களும் கிளப்களும் · வகுப்பு 3–8</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.6rem]">சேர நான்கு வழிகள்.</h2>
            <p className="mt-3 text-lg text-muted">ஒவ்வொன்றும் உங்கள் குழந்தை செய்த ஒன்றுடன் முடிகிறது — உங்களுக்கும் காட்டுவார்கள்.</p>
          </header>
          <div className="grid gap-5 md:grid-cols-2">
            {KIDS_PRODUCTS.map((p, i) => {
              const I = ICON[p.emoji];
              const t = TA_KIDS[p.id];
              return (
                <Reveal key={p.id} delay={i * 0.06} className="h-full">
                  <article id={p.id} className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[32px] bg-surface p-7 ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 md:p-8">
                    <span className="absolute -right-10 -top-10 size-40 rounded-full opacity-25 transition-transform duration-500 group-hover:scale-110" style={{ background: p.color }} aria-hidden />
                    <span className="relative inline-flex size-14 items-center justify-center rounded-[20px] text-white" style={{ background: p.color === "#F2B705" ? "#C98F00" : p.color }}>
                      <I className="size-7" aria-hidden />
                    </span>
                    <h3 className="relative mt-5 font-display text-2xl font-bold text-ink">{t.name}</h3>
                    <p className="relative mt-1 text-ink-2">{t.format}</p>
                    <dl className="relative mt-5 space-y-2 text-[0.95rem]">
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted">யாருக்கு</dt>
                        <dd className="text-ink">{t.who}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted">வீட்டுக்கு</dt>
                        <dd className="text-ink">{t.takeHome}</dd>
                      </div>
                    </dl>
                    <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-6">
                      <span className="font-display text-xl font-semibold text-ink">{TA_KIDS_PRICE[p.id]}</span>
                      <TaStatus status="Proposed" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Finder: link to the English finder (interactive) */}
      <section id="find" className="kids-sky scroll-mt-24 py-16 md:py-24">
        <Container>
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-3">அருகில் ஒரு முகாம்</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.6rem]">கோடை முகாம்கள் பிப்ரவரி முதல் நிரம்பும்.</h2>
            <p className="mt-3 text-lg text-muted">உங்கள் ஊரைத் தேர்ந்தெடுங்கள். முதலில் தெரிந்துகொள்ளக் காத்திருப்புப் பட்டியலில் சேருங்கள்.</p>
          </header>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map((c) => (
              <li key={c}>
                <SmartLink href="/kids/find" className="flex min-h-14 items-center gap-3 rounded-3xl bg-surface p-5 font-display text-lg font-semibold text-ink ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-[var(--kids)]">
                  <MapPin className="size-5 shrink-0 text-[var(--kids)]" aria-hidden />
                  {TA_CITIES[c]}
                </SmartLink>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">முகாம் தேடல் பக்கம் தற்போது ஆங்கிலத்தில் உள்ளது. பெற்றோரின் விவரங்கள் மட்டுமே கேட்கப்படும்.</p>
        </Container>
      </section>

      {/* Safety */}
      <section className="py-16 md:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-3">அதே பாதுகாப்பு விதிகள்</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.4rem]">பள்ளியைப் போலவே பாதுகாப்பு.</h2>
            <p className="mt-3 text-lg text-muted">நீங்கள் எழுத்தில் சம்மதிக்காவிட்டால், புகைப்படங்களில் முகம் அல்ல — கைகளும் படைப்பும் மட்டும்.</p>
            <SmartLink href="/ta/parents/safety" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              பாதுகாப்பு வாக்குறுதி <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {TA_KIDS_SAFETY.map((s) => (
              <li key={s} className="flex items-center gap-3 rounded-3xl bg-surface p-5 ring-1 ring-line">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--kids)_14%,white)] text-[var(--kids)]">
                  <ShieldCheck className="size-5" aria-hidden />
                </span>
                <span className="font-medium text-ink">{s}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Host */}
      <section id="host" className="scroll-mt-24 pb-6">
        <Container>
          <div className="kids-band flex flex-col gap-6 rounded-[32px] p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex gap-4">
              <School className="size-9 shrink-0" aria-hidden />
              <div>
                <h2 className="font-display text-2xl font-bold">உங்கள் பள்ளியில் ஒரு Kids முகாம் நடத்துங்கள்</h2>
                <p className="mt-1 max-w-lg text-white/90">கூட்டாளிப் பள்ளிகள், மையங்களுக்கு: பயிற்சி, கருவிகள், விளம்பரம் — வருவாய்ப் பகிர்வில்.</p>
              </div>
            </div>
            <Button href="/demo?role=host" variant="accent">
              நடத்துவது பற்றிப் பேசுங்கள்
            </Button>
          </div>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS_TA["/kids"]} eyebrow="பெற்றோர் கேள்விகள்" title="விரைவான பதில்கள்" />
      <TaAskSchool />
    </div>
  );
}
