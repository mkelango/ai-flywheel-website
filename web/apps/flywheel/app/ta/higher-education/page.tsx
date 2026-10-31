import type { Metadata } from "next";
import { Award, BarChart3, BookMarked, FlaskConical, Handshake, Trophy } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { taAlternates } from "@/lib/ta-content";
import { TaPageHero, TaSection, TaTag } from "@/components/ta/ui";

export const metadata: Metadata = {
  title: "உயர்கல்விக்கான AI Flywheel",
  description: "மதிப்பெண் பாடங்கள், ஆசிரியர் பயிற்சி, நான்கு Campus Labs: ஒரே கூட்டாண்மையில். மாணவர்கள் என்ன செய்ய முடியும் என்பதற்குச் சான்று.",
  alternates: taAlternates("/higher-education"),
};

const OFFERS = [
  { icon: Handshake, title: "Campus கூட்டாண்மை", text: "ஒரே ஆண்டு MoU: பாடங்கள், ஆசிரியர்கள், ஆய்வகங்கள், போட்டிகள், அறிக்கைகள்.", tag: true },
  { icon: BookMarked, title: "மதிப்பெண் பாடங்கள்", text: "C2, C3 நிலைகளுக்கு ஏற்ற பருவப் பாடங்கள், பாடத்திட்டம், மதிப்பீடுகளுடன்." },
  { icon: Award, title: "ஆசிரியர் Flywheel", text: "ஆசிரியர்களுக்கு C1, C2, C3 வரை பயிற்சி. கட்டமைப்பாளர்கள் பாடம் நடத்தலாம்." },
  { icon: FlaskConical, title: "Campus Labs", text: "நான்கு ஆய்வகங்கள், ஒவ்வொன்றும் ஒரு Studio-வை இயக்கும். Agentic Lab பிப்ரவரி 2027-இல்; மற்றவை FY28-இல். அமைப்புச் செலவு கல்லூரிக்கு ஏற்ப." },
  { icon: Trophy, title: "போட்டிகள்", text: "கல்லூரிகளுக்கு இடையிலான போட்டிகள், ஒரு DRIVE சுற்றாக." },
  { icon: BarChart3, title: "விளைவு அறிக்கை", text: "மாணவர்களும் ஆசிரியர்களும் நிலை, கட்டம் வாரியாக. சேர்க்கை எண்ணிக்கை அல்ல." },
];

const STEPS = [
  { n: "01", t: "ஆலோசனை", d: "நிர்வாகம், IQAC உடன் ஒரு சந்திப்பு." },
  { n: "02", t: "ஒரு துறையில் முன்னோட்டம்", d: "ஒரு பாடம், ஒரு ஆசிரியர் தொகுதி." },
  { n: "03", t: "MoU கையெழுத்து", d: "பாடங்கள், ஆசிரியர்கள், அறிக்கைகள்." },
  { n: "04", t: "ஆய்வகங்கள் திறப்பு", d: "ஒவ்வொரு ஆய்வகமும் ஒரு Studio-வை இயக்கும்." },
];

export default function TaHigherEducationPage() {
  return (
    <>
      <TaPageHero
        eyebrow="உயர்கல்விக்கான AI Flywheel"
        title="prompt மட்டுமல்ல, வெளியிடத் தெரிந்த பட்டதாரிகள்."
        intro="பல்கலைக்கழகங்கள், பொறியியல், கலை அறிவியல் கல்லூரிகள், பாலிடெக்னிக், ITI-களுக்கு."
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "உயர்கல்வி" }]}
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          ஆலோசனை முன்பதிவு
        </Button>
      </TaPageHero>

      <TaSection id="offers" eyebrow="ஆறு சேவைகள், ஒரே கூட்டாண்மை" title="கல்லூரிக்குத் தேவையான அனைத்தும், ஒரே MoU-வில்.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map(({ icon: Icon, title, text, tag }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.05}>
              <div className="card h-full p-6">
                <div className="flex items-center justify-between">
                  <Icon className="size-6 text-ink" aria-hidden />
                  {tag && <TaTag status="Proposed" />}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </TaSection>

      <TaSection id="steps" eyebrow="கூட்டாண்மை எப்படி" title="ஒரு துறையில் தொடங்குங்கள்." className="border-t border-line">
        <ol className="grid gap-4 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.t}</h3>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-inverse p-8 text-inverse-ink md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">எழுத்துப்பூர்வ அனுமதியுடன் மட்டுமே கூட்டாளர் கல்லூரிகளின் பெயர்கள் வெளியிடப்படும்.</p>
            <p className="mt-2 text-inverse-ink/70">மாணவர்கள் இலவசப் பாடத்தில் தொடங்கலாம்.</p>
          </div>
          <Button href="/ta/programmes/foundation" size="lg">
            இலவசமாகத் தொடங்கு
          </Button>
        </div>
      </TaSection>
    </>
  );
}
