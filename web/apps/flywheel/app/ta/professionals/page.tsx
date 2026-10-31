import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { getProgramme, type Programme } from "@/lib/programmes";
import { taAlternates } from "@/lib/ta-content";
import { TaPageHero, TaProgrammeCard, TaSection, TaTag } from "@/components/ta/ui";

export const metadata: Metadata = {
  title: "பணியாளர்களுக்கு",
  description: "இலவச C1 பாடம் முதல் 12 வாரக் குழுப் பயிற்சி வரை. உண்மையான வேலையில் நிரூபிக்கும் உங்கள் அடுத்த AI நிலை.",
  alternates: taAlternates("/professionals"),
};

const PATH = [
  { step: "தொடங்கு", line: "இலவசம், 6 மணி நேரம்.", slugs: ["foundation"] },
  { step: "பயிற்சி", line: "அன்றாட வேலையில் AI, சரிபார்ப்புடன்.", slugs: ["generative-ai-practitioner", "working-with-ai-agents", "ai-for-managers"] },
  { step: "கட்டமை", line: "12 வாரங்களில் ஒரு உண்மையான வெளியீடு.", slugs: ["agentic-ai-engineer", "generative-ai-engineer", "model-engineer"] },
];

const INFO = [
  { title: "குழுப் பயிற்சி எப்படி", text: "12 வாரங்கள், வாரம் சுமார் 8 மணி நேரம், ஒரு உண்மையான பயன்பாடு, 4–6 பேர் அணி, G1 முதல் G6 வாயில்கள். மாலை நேரங்களும் சனிக்கிழமைகளும்." },
  { title: "உங்கள் சான்றிதழ்", text: "நிலையும் கட்டமும் காட்டும் Open Badges 3.0 பேட்ஜ், பொதுச் சரிபார்ப்புப் பக்கம், ஆண்டுதோறும் புதுப்பிப்பு." },
  { title: "கட்டணம் செலுத்த", text: "EMI, மாணவர் மற்றும் பெண்களுக்கான உதவித்தொகை, நிறுவன நிதியுதவிக் கடிதம், GST விலைப்பட்டியல்.", tag: true },
];

export default function TaProfessionalsPage() {
  return (
    <>
      <TaPageHero
        eyebrow="பணியாளர்களுக்கான AI Flywheel"
        title="AI-இல் உங்கள் அடுத்த நிலை, உண்மையான வேலையில் நிரூபிக்கப்பட்டது."
        intro="இலவசமாகத் தொடங்குங்கள். பிறகு உங்கள் பணிக்கு ஏற்ற பாதையைத் தேர்ந்தெடுங்கள்."
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "பணியாளர்கள்" }]}
      >
        <Button href="/ta/programmes/foundation" size="lg">
          இலவசமாகத் தொடங்கு
        </Button>
        <Button href="/check" variant="secondary" size="lg">
          Flywheel Check எடுங்கள்
        </Button>
      </TaPageHero>

      {PATH.map((g, gi) => (
        <TaSection key={g.step} eyebrow={`படி ${gi + 1}`} title={`${g.step}. ${g.line}`} className={gi ? "border-t border-line" : undefined}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(g.slugs.map(getProgramme).filter(Boolean) as Programme[]).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                <TaProgrammeCard p={p} />
              </Reveal>
            ))}
          </div>
        </TaSection>
      ))}

      <section className="border-t border-line py-16 md:py-20">
        <div className="container-site grid gap-4 md:grid-cols-3">
          {INFO.map((b) => (
            <div key={b.title} className="rounded-[var(--radius-card)] bg-surface-2 p-6">
              <h2 className="font-display text-xl font-semibold leading-snug text-ink">{b.title}</h2>
              <p className="mt-2 text-sm text-ink-2">{b.text}</p>
              {b.tag && (
                <span className="mt-3 inline-block">
                  <TaTag status="Proposed" />
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="container-site mt-8">
          <Link href="/ta/programmes" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-primary-hover">
            எல்லாப் பாடங்களும் <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
