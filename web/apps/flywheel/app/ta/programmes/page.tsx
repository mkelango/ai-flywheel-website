import type { Metadata } from "next";
import { Button } from "@flywheel/ui/components/primitives";
import { PROGRAMMES, type LevelCode } from "@/lib/programmes";
import { TA_LEVEL_NAMES, taAlternates } from "@/lib/ta-content";
import { TaPageHero, TaProgrammeCard, TaTag } from "@/components/ta/ui";

export const metadata: Metadata = {
  title: "பாடங்கள்",
  description: "இலவச C1 பாடம் முதல் 12 வாரக் குழுப் பயிற்சி, உயர்நிலைத் திட்டங்கள் வரை. நிலை வாரியாக. விலைகள் ரூபாயில், GST நீங்கலாக.",
  alternates: taAlternates("/programmes"),
};

const GROUPS: (LevelCode | null)[] = ["C1", "C2", "C3", "C4", "C5", null];

export default function TaProgrammesPage() {
  return (
    <>
      <TaPageHero
        eyebrow="பாடப் பட்டியல்"
        title="உங்கள் பாடத்தைக் கண்டறியுங்கள்."
        intro="ஒவ்வொரு பாடமும் C1 முதல் C5 வரை ஒரு நிலையில் உள்ளது, அடுத்த படியையும் சொல்லும். விலைகள் ரூபாயில், GST நீங்கலாக."
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "பாடங்கள்" }]}
      >
        <Button href="/check" variant="secondary">
          Flywheel Check எடுங்கள்
        </Button>
      </TaPageHero>

      <div className="container-site space-y-14 py-12 md:py-16">
        {GROUPS.map((lvl) => {
          const list = PROGRAMMES.filter((p) => p.level === lvl);
          if (!list.length) return null;
          return (
            <section key={lvl ?? "org"} aria-labelledby={`lvl-${lvl ?? "org"}`}>
              <h2 id={`lvl-${lvl ?? "org"}`} className="mb-5 flex items-baseline gap-3 font-display text-2xl font-semibold text-ink md:text-3xl">
                {lvl ? (
                  <>
                    {TA_LEVEL_NAMES[lvl]} <span className="font-mono text-base text-muted">({lvl})</span>
                  </>
                ) : (
                  "நிறுவனங்களுக்கு"
                )}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <TaProgrammeCard key={p.slug} p={p} />
                ))}
              </div>
            </section>
          );
        })}
        <p className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <TaTag status="Ed 1.1" /> விலைகள் Website Strategy Ed. 1.1-இலிருந்து. <TaTag status="Proposed" /> விலைகள் தொடக்கத்துக்கு முன் சோதிக்கப்படும். &ldquo;English ↗&rdquo; எனக் குறித்தவை ஆங்கிலப் பக்கத்துக்குச் செல்லும்.
        </p>
      </div>
    </>
  );
}
