import { Check, Plus } from "lucide-react";
import { Button, Container } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { PageHero } from "@/components/blocks";
import { TaDemoBand, TaStatus } from "@/components/ta/blocks";
import { BOARD_ROWS } from "@/lib/offer";
import { taPageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/seo";
import { ANSWERS_TA } from "@/lib/answers";
import { TA_BOARDS } from "@/lib/ta-content";

export const metadata = taPageMeta(
  "/programmes/boards",
  "பாடத்திட்டப் பொருத்தம்: CBSE, ICSE, தமிழ்நாடு மாநிலப் பாடத்திட்டம்",
  "AI Flywheel பாடத்திட்டம் CBSE (வகுப்பு 3–8 Computational Thinking and AI), ICSE, தமிழ்நாடு மாநிலப் பாடத்திட்டத்தோடு எப்படிப் பொருந்துகிறது: எதை உள்ளடக்குகிறோம், எதைச் சேர்க்கிறோம்.",
);

const ROWS = BOARD_ROWS.map((b, i) => ({ ...b, ...TA_BOARDS[i], classes: b.classes.replace("Classes", "வகுப்பு") }));

export default function TaBoardsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "திட்டங்கள்", href: "/ta/programmes" }, { label: "பாடத்திட்டங்கள்" }]}
        eyebrow="CBSE · ICSE · தமிழ்நாடு மாநிலப் பாடத்திட்டம்"
        title="CBSE AI பாடத்திட்டம், வகுப்பு 3 முதல் 8 வரை."
        intro="எங்கள் CBSE AI பாடத்திட்டம் (வகுப்பு 3–8), 2026–27 முதலான CBSE கணினிச் சிந்தனை மற்றும் செயற்கை நுண்ணறிவு (Computational Thinking and AI) பாடத்திட்டத்தை அடிப்படையாகக் கொண்டது. ICSE, தமிழ்நாடு மாநிலப் பாடத்திட்டத்துக்கும். இது அங்கீகாரம் அல்ல."
        actions={
          <>
            <Button href="/demo">பள்ளி டெமோ பதிவு செய்யுங்கள்</Button>
            <Button href="/ta/programmes" variant="secondary">
              திட்டங்களைப் பாருங்கள்
            </Button>
          </>
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {ROWS.map((b, i) => (
              <Reveal key={b.board} delay={i * 0.05} className="card h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink">{b.board}</h2>
                    <p className="text-ink-2">{b.classes}</p>
                  </div>
                  <TaStatus status={b.status} />
                </div>
                <p className="mt-1 text-sm text-muted">அடிப்படை: {b.basis}</p>
                <h3 className="mt-5 text-sm font-semibold text-ink">நாங்கள் உள்ளடக்குவது</h3>
                <div className="mt-2">
                  <List items={b.cover} kind="cover" />
                </div>
                <h3 className="mt-5 text-sm font-semibold text-ink">நாங்கள் சேர்ப்பது</h3>
                <div className="mt-2">
                  <List items={b.add} kind="add" />
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm text-muted">
            இது ஒவ்வொரு பாடத்திட்டத்தையும் நாங்கள் புரிந்துகொண்ட விதம். தொடங்கும் முன் வகுப்பு வாரியான வரைபடத்தை உங்கள் ஒருங்கிணைப்பாளருடன் பகிர்வோம். ICSE வரைபடம் தயாரிப்பில் உள்ளது.
          </p>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS_TA["/programmes/boards"]} eyebrow="CBSE கணினிச் சிந்தனை மற்றும் AI" title="விரைவான பதில்கள்" />
      <TaDemoBand title="உங்கள் பாடத்திட்டத்துக்கான வரைபடத்தைப் பாருங்கள்." line="டெமோவுக்கு வகுப்பு வாரியான வரைபடத்தைக் கொண்டு வருவோம்." />
    </>
  );
}

function List({ items, kind }: { items: string[]; kind: "cover" | "add" }) {
  const I = kind === "cover" ? Check : Plus;
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-ink-2">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-ink" style={{ background: kind === "cover" ? "#DCEBFB" : "#FFE39A" }} aria-hidden>
            <I className="size-3.5" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}
