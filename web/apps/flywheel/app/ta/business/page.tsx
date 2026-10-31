import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, KeyRound, MapPin, ScrollText, ShieldCheck } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { taAlternates } from "@/lib/ta-content";
import { TaPageHero, TaSection, TaTag } from "@/components/ta/ui";

export const metadata: Metadata = {
  title: "நிறுவனங்களுக்கான AI Flywheel",
  description: "ஒவ்வொரு AI கட்டத்திலும் உங்கள் பணியாளர்கள் எங்கே நிற்கிறார்கள் என்று அறிந்து, ஒவ்வொரு நிலையாக உயர்த்துங்கள். கற்கும்போதே ஒரு உண்மையான பயன்பாட்டை வெளியிடுங்கள்.",
  alternates: taAlternates("/business"),
};

const JOURNEY = [
  { n: "1", t: "Flywheel Check", d: "பணியாளர்கள் கட்டம், நிலை வாரியாக; உங்கள் பலவீனமான CORE தூண்.", href: "/check" },
  { n: "2", t: "தலைமை", d: "நிர்வாகக் குழுவுக்கு C1; DRIVE, CORE-இல் C4.", href: "/ta/programmes/leadership-programme" },
  { n: "3", t: "பணியாளர் உரிமம்", d: "பாடங்கள், மதிப்பீடு, அறிக்கை. ஒருவருக்கு ஆண்டுக்கு ₹3,000–12,000.", tag: true, href: "/programmes/workforce-licence" },
  { n: "4", t: "90 நாள் தொடக்கம்", d: "உங்கள் சொந்தப் பயன்பாட்டில் ஒரு குழுப் பயிற்சி, G1 முதல் G6.", href: "/business/enterprise" },
];

const SECURITY = [
  { icon: KeyRound, t: "SSO" },
  { icon: MapPin, t: "இந்தியாவில் தரவு" },
  { icon: ScrollText, t: "தணிக்கைப் பதிவு" },
  { icon: ShieldCheck, t: "DPDP விதிமுறைகள்" },
];

export default function TaBusinessPage() {
  return (
    <>
      <TaPageHero
        eyebrow="நிறுவனங்களுக்கான AI Flywheel · பெரு நிறுவனங்கள், GCC, ஸ்டார்ட்அப், MSME"
        title="AI பயிற்சியை AI விளைவாக மாற்றுங்கள்."
        intro="உங்கள் பணியாளர்கள் எங்கே நிற்கிறார்கள் என்று அறிந்து, ஒவ்வொரு நிலையாக உயர்த்துங்கள். கற்கும்போதே ஒரு உண்மையான பயன்பாட்டை வெளியிடுங்கள்."
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "நிறுவனங்கள்" }]}
      >
        <Button href="/business/check" size="lg">
          Flywheel Check முன்பதிவு
        </Button>
        <Button href="/ta/programmes/leadership-programme" variant="secondary" size="lg">
          தலைமைத்துவத் திட்டம்
        </Button>
      </TaPageHero>

      <TaSection id="journey" eyebrow="நான்கு படிகள்" title="அளவிடு. வழிநடத்து. உரிமம். தொடங்கு.">
        <ol className="grid gap-3 md:grid-cols-4">
          {JOURNEY.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.06} className="h-full">
                <Link href={s.href} className="card card-hover group flex h-full flex-col p-5">
                  <span className="grid size-9 place-items-center rounded-full bg-inverse font-mono text-sm text-inverse-ink">{s.n}</span>
                  <span className="mt-5 font-display text-lg font-semibold text-ink">{s.t}</span>
                  <span className="mt-1 text-sm text-muted">{s.d}</span>
                  <span className="mt-auto flex items-center justify-between pt-4">
                    {s.tag ? <TaTag status="Ed 1.1" /> : <span />}
                    <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </TaSection>

      <TaSection id="startups" eyebrow="ஸ்டார்ட்அப், MSME" title="உங்கள் தொழிலில் AI முதலில் எங்கே?" className="border-t border-line">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "நிறுவனர் Check", d: "60 நிமிட மதிப்பாய்வு, 90 நாள் திட்டம்." },
            { t: "நிறுவனர் குழு", d: "சக நிறுவனர்களுடன் ஒரு DRIVE சுற்று." },
            { t: "MSME ரோபோட்டிக்ஸ் முன்னோட்டம்", d: "Robotic Lab உடன், simulation முதலில்." },
          ].map((c) => (
            <div key={c.t} className="card p-6">
              <h3 className="font-display text-xl font-semibold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm text-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </TaSection>

      <section id="security" className="scroll-mt-20 bg-inverse py-16 text-inverse-ink md:py-20">
        <div className="container-site">
          <p className="font-mono text-xs tracking-[0.14em] text-inverse-ink/60">பாதுகாப்பு, இறையாண்மை</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-snug md:text-4xl">உங்கள் தரவு இந்தியாவிலேயே.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY.map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-white/10 p-5">
                <Icon className="size-5 text-highlight" aria-hidden /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-inverse-ink/70">GST விலைப்பட்டியல். அறிக்கை நிலை, கட்டம் வாரியாக; சேர்க்கை எண்ணிக்கை அல்ல.</p>
        </div>
      </section>
    </>
  );
}
