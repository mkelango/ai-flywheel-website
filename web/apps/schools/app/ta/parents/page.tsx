import { ArrowRight, MessagesSquare, ScanEye, BookCheck } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Accordion, Reveal } from "@flywheel/ui/components/interactive";
import { PageHero, SectionHead } from "@/components/blocks";
import { WorkCollage } from "@/components/art";
import { TaAskSchool, TaKidsBanner, TaSafetyPromise } from "@/components/ta/blocks";
import { ScreenBars } from "@/components/ta/parents";
import { PROGRAMMES } from "@/lib/data";
import { SCREEN_BANDS } from "@/lib/families";
import { taMeta } from "@/lib/ta";
import { TA_FAQ, TA_GUIDES, TA_PROGRAMMES, TA_SCREEN_LINES, taClasses } from "@/lib/ta-content";

export const metadata = taMeta(
  "/parents",
  "பெற்றோருக்கு: உங்கள் குழந்தை என்ன கற்கிறது",
  "வகுப்பு வாரியாக உங்கள் குழந்தை AI உடன் என்ன உருவாக்குகிறது, எவ்வளவு திரை நேரம், எங்கள் ஆறு வரிப் பாதுகாப்பு வாக்குறுதி, பெற்றோர் கேள்விகளுக்குப் பதில்கள்.",
);

const GUIDE_ICONS = [MessagesSquare, ScanEye, BookCheck];

export default function TaParentsPage() {
  // Overview shows three screen bands: 1–5 (uses the 3–5 figure), 6–8, 9–12.
  const bands = SCREEN_BANDS.slice(1).map((s, i) => ({ ...s, classes: ["வகுப்பு 1–5", "வகுப்பு 6–8", "வகுப்பு 9–12"][i], line: TA_SCREEN_LINES[i + 1] }));
  return (
    <>
      <PageHero
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "பெற்றோர்" }]}
        eyebrow="பெற்றோருக்கு"
        title="உங்கள் குழந்தை AI உடன் உருவாக்கவும், அதைக் கேள்வி கேட்கவும் கற்கிறது."
        intro="வகுப்பு வாரியாக. சிறு வயதில் பெரும்பாலும் திரை இல்லாமல். வடிவமைப்பிலேயே பாதுகாப்பு."
        actions={
          <>
            <Button href="/ta/kids" className="!bg-[var(--kids)] hover:!brightness-110">
              AI Flywheel Kids முகாம்கள்
            </Button>
            <Button href="#safety" variant="secondary">
              பாதுகாப்பு வாக்குறுதி
            </Button>
          </>
        }
        art={<WorkCollage className="max-w-[420px]" />}
      />

      <section id="learning" className="scroll-mt-24 pb-16 md:pb-24">
        <Container>
          <SectionHead eyebrow="உங்கள் குழந்தை என்ன கற்கிறது" title="ஒவ்வொரு வயதுக்கும் ஒரு படி." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <SmartLink href={`/ta/programmes/${p.slug}`} className="card card-hover flex h-full flex-col overflow-hidden">
                  <span className="block p-5" style={{ background: p.tint }}>
                    <span className="block text-sm font-semibold text-ink-2">{taClasses(p.classRange)}</span>
                    <span className="mt-1 block font-display text-xl font-semibold text-ink">{p.short}</span>
                  </span>
                  <span className="block flex-1 p-5 text-ink-2">{TA_PROGRAMMES[p.slug].terms[0]}.</span>
                </SmartLink>
              </Reveal>
            ))}
          </div>
          <SmartLink href="/ta/parents/learning" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            பருவம் வாரியாகப் பாருங்கள் <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </Container>
      </section>

      <section id="screen-time" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="திரை நேரம்" title="திரை, உருவாக்க மட்டும். வீண் பொழுதுக்கு அல்ல." />
          <ScreenBars bands={bands} />
        </Container>
      </section>

      <TaSafetyPromise />

      <section id="guides" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="வீட்டில் AI" title="மாதம் ஒரு சிறு வழிகாட்டி." line="இலவசம், தமிழிலும் ஆங்கிலத்திலும்." />
          <div className="grid gap-4 md:grid-cols-3">
            {TA_GUIDES.slice(0, 3).map((g, i) => {
              const I = GUIDE_ICONS[i];
              return (
                <SmartLink key={g.slug} href="/ta/parents/guides" className="card card-hover p-6">
                  <I className="size-7 text-ink" aria-hidden />
                  <p className="mt-4 font-display text-lg font-semibold text-ink">{g.title}</p>
                  <p className="mt-1 text-muted">{g.classes}</p>
                  <p className="mt-4 text-sm font-semibold text-ink">வழிகாட்டியைப் படிக்க →</p>
                </SmartLink>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="பெற்றோர் கேள்விகள்" title="பெற்றோர் எங்களிடம் கேட்பவை." />
          <Accordion items={TA_FAQ} />
        </Container>
      </section>

      <TaKidsBanner />
      <TaAskSchool />
    </>
  );
}
