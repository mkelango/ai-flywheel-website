import { ArrowRight, WifiOff, Languages, MapPinned, HandHeart, School, Printer, Mail } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero, SectionHead } from "@/components/blocks";
import { TaStatus } from "@/components/ta/blocks";
import { TaMissionContact } from "@/components/ta/mission";
import { taPageMeta } from "@/lib/seo";
import { TA_DISTRICTS } from "@/lib/ta-content";

export const metadata = taPageMeta(
  "/mission",
  "மிஷன் & CSR: அரசுப் பள்ளிகளுக்கு AI அறிவு",
  "மிஷன் பள்ளிகள், மாவட்ட முன்னேற்றம், தமிழில் முதலில் — இணையம் இல்லாமலும், CSR நிதியாளர்களுக்கு மிஷன் புரவலர் வழி. Mission 2047-இன் ஒரு பகுதி.",
);

export default function TaMissionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "மிஷன் & CSR" }]}
        eyebrow="மிஷன் & CSR · அரசுக்கும் நிதியாளர்களுக்கும்"
        title={
          <>
            அரசுப் பள்ளிகளுக்கு AI கல்வி: ஒவ்வொரு குழந்தைக்கும் AI அறிவு. <span lang="en-IN" className="block pt-2 text-[0.6em] text-ink-2">Every child, every school.</span>
          </>
        }
        intro="அரசுப் பள்ளிகளுக்கு AI கல்வி: அதே பாடத்திட்டம், தமிழில் முதலில், இணையம் இல்லாமலும் இயங்கும்படி."
        actions={
          <>
            <Button href="#contact">மிஷன் குழுவுடன் பேசுங்கள்</Button>
            <Button href="#csr" variant="secondary">
              மிஷன் புரவலர் ஆகுங்கள்
            </Button>
          </>
        }
      />

      <section id="schools" className="scroll-mt-24 pb-16 md:pb-24">
        <Container>
          <SectionHead eyebrow="மிஷன் பள்ளிகள்" title="அரசு, அரசு உதவி பெறும் பள்ளிகளுக்கு." line="முதலில் வகுப்பு 3–8. மிஷன் புரவலர்களும் அரசுக் கூட்டாளிகளும் நிதி தருகிறார்கள்." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { I: School, t: "முதலில் வகுப்பு 3–8", l: "Spark, Practitioner — ஒவ்வொரு மிஷன் பள்ளியிலும், முதலில் திரை இல்லாமல்." },
              { I: Printer, t: "அச்சிட்ட கருவிகள்", l: "பாடக் கருவிகள் அச்சிட்டு வழங்கப்படும். வகுப்பு 3–5க்குச் சாதனம் தேவையில்லை." },
              { I: HandHeart, t: "ஆசிரியர் பயிற்சி இலவசம்", l: "ஒவ்வொரு மிஷன் ஆசிரியரும் அறிந்தவர் (C1) அடைகிறார், தமிழில்." },
            ].map(({ I, t, l }, i) => (
              <Reveal key={t} delay={i * 0.06} className="card h-full p-6">
                <I className="size-7 text-ink" aria-hidden />
                <p className="mt-4 font-display text-lg font-semibold text-ink">{t}</p>
                <p className="mt-1 text-muted">{l}</p>
              </Reveal>
            ))}
          </div>
          <SmartLink href="/ta/mission/schools" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            மிஷன் பள்ளிகள் பற்றி <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </Container>
      </section>

      <section id="progress" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead eyebrow="மாவட்ட முன்னேற்றம்" title="மாவட்டம் வாரியாக." className="!mb-0" />
            <TaStatus status="Illustrative scenario" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TA_DISTRICTS.map((d) => (
              <div key={d.name} className="card p-6">
                <MapPinned className="size-6 text-ink" aria-hidden />
                <p className="mt-3 font-display text-xl font-semibold text-ink">{d.name}</p>
                <p className="mt-1">
                  <TaStatus status={d.stage} />
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                  <div>
                    <dt className="text-xs text-muted">பள்ளிகள்</dt>
                    <dd className="font-display text-2xl font-semibold text-ink">{d.schools}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">ஆசிரியர்கள்</dt>
                    <dd className="font-display text-2xl font-semibold text-ink">{d.teachers}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">அறிக்கை வடிவத்தைக் காட்டும் மாதிரி எண்கள் மட்டுமே. உண்மையான மாவட்ட அறிக்கைகள் முதல் முன்னோட்டங்களுக்குப் பிறகு.</p>
          <SmartLink href="/ta/mission/progress" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            அறிக்கை எப்படி இருக்கும் <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </Container>
      </section>

      <section id="tamil" className="scroll-mt-24 py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">தமிழில், இணையம் இல்லாமலும்</p>
            <h2 className="font-sans text-3xl font-bold leading-snug text-ink md:text-4xl">தமிழில் முதலில். இணையம் இல்லாமலும்.</h2>
            <p className="mt-4 text-lg text-muted">பாடங்களும் வழிகாட்டிகளும் தமிழிலேயே எழுதப்படுகின்றன.</p>
          </div>
          <ul className="grid gap-3">
            {[
              { I: Languages, t: "தமிழில் எழுதிய பாடங்கள், வழிகாட்டிகள்", l: "தமிழிலேயே எழுதியவை — பின்னர் மொழிபெயர்த்தவை அல்ல." },
              { I: WifiOff, t: "ஒவ்வொரு குழுமத்துக்கும் ஆஃப்லைன் மையம்", l: "பாடங்களும் Studio டெமோக்களும் உள்ளூர் மையத்தில் இயங்கும்." },
              { I: Printer, t: "சிறு வகுப்புகளுக்கு முதலில் காகிதம்", l: "அட்டைகள், பயிற்சித்தாள்கள், தரை ரோபோக்கள்." },
            ].map(({ I, t, l }) => (
              <li key={t} className="card flex gap-4 p-5">
                <I className="mt-0.5 size-6 shrink-0 text-ink" aria-hidden />
                <span>
                  <span className="block font-display font-semibold text-ink">{t}</span>
                  <span className="block text-muted">{l}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="csr" className="scroll-mt-24 bg-inverse py-16 text-inverse-ink md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-3 !text-inverse-ink/70">CSR கூட்டாளிகளுக்கு</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-[2.4rem]">மிஷன் புரவலர் ஆகுங்கள்.</h2>
            <p lang="en-IN" className="mt-2 text-lg opacity-85">
              Become a Mission Patron.
            </p>
            <p className="mt-5 max-w-lg text-lg opacity-80">ஒரு மாவட்டத்துக்கு நிதி தாருங்கள். பணம் எங்கே போகிறது, நிலை வாரியாக என்ன மாறுகிறது என்று பாருங்கள்.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/ta/mission/csr" variant="accent">
                புரவலர் வழி பற்றி
              </Button>
              <Button href={siteHref("flywheel", "/mission-2047")} variant="ghost" className="!text-inverse-ink hover:!bg-white/10">
                Mission 2047 <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
          <ul className="grid gap-3">
            {["ஒரு பள்ளிக்கான செலவு, வெளிப்படையாக", "நிலை வாரியான விளைவுகள் (C1–C3)", "ஒவ்வொரு பருவமும் மாவட்ட அறிக்கை", "ஒப்புதலுடன், மிஷன் பக்கத்தில் உங்கள் பெயர்"].map((t) => (
              <li key={t} className="rounded-[var(--radius-card)] bg-white/[0.06] p-5 ring-1 ring-white/10">
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <TaMissionContact />
    </>
  );
}
