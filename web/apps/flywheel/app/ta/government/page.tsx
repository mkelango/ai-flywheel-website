import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { taAlternates } from "@/lib/ta-content";
import { TaPageHero, TaSection } from "@/components/ta/ui";

export const metadata: Metadata = {
  title: "அரசுக்கான AI Flywheel",
  description: "அலுவலர்களுக்குக் கட்டம், நிலை வாரியாகத் திறன், தலைமை AI அலுவலர் பயிற்சி, தெளிவான ஆளுகையுடன் AI சேவைகள். சேர்க்கை அல்ல, நிலை வாரியாக அறிக்கை.",
  alternates: taAlternates("/government"),
};

const OFFERS: { offer: string; what: string; href?: string; external?: boolean }[] = [
  { offer: "அரசுப் பணியாளர் திட்டம்", what: "நான்கு கட்டங்களிலும் C1, CORE-இல் கட்டமைப்பாளர் (C3); தமிழிலும் ஆங்கிலத்திலும். iGOT Karmayogi உடன் இணைந்து, போட்டியாக அல்ல." },
  { offer: "தலைமை AI அலுவலர் திட்டம்", what: "C5 பாதை: குழு, மையம், மாதிரிக் கணக்கெடுப்பு, Handoff Map.", href: "/programmes/ai-flywheel-strategist" },
  { offer: "பொதுத்துறைப் பயன்பாட்டுப் பட்டறை", what: "துறைகள் ஒரு சேவையைக் கொண்டு வருகின்றன; CORE வாயில்களுடன் ஒரு DRIVE சுற்று." },
  { offer: "பள்ளிகள்", what: "பள்ளிகளுக்கு AI Flywheel at Schools.", href: siteHref("schools", "/"), external: true },
];

export default function TaGovernmentPage() {
  return (
    <>
      <TaPageHero
        eyebrow="அரசுக்கான AI Flywheel"
        title="எண்ணிக் காட்டக்கூடிய AI திறன்."
        intro="அலுவலர்களுக்குக் கட்டம், நிலை வாரியாகத் திறன். தலைமை AI அலுவலர்களுக்குப் பயிற்சி. தெளிவான ஆளுகையுடன் AI சேவைகள்."
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "அரசு" }]}
      >
        <Button href="/contact?tag=government" size="lg">
          அரசுக் குழுவுடன் பேசுங்கள்
        </Button>
      </TaPageHero>

      <TaSection id="offers" eyebrow="சேவைகள்" title="பாடச் சேர்க்கை அல்ல, நிலை வாரியாக மக்களைக் கணக்கிடுங்கள்.">
        <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          {OFFERS.map((o) => (
            <li key={o.offer} className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_2fr] md:gap-6">
              <p className="font-display text-base font-semibold text-ink">
                {o.href ? (
                  o.external ? (
                    <a href={o.href} className="hover:text-primary-hover">
                      {o.offer} ↗
                    </a>
                  ) : (
                    <Link href={o.href} className="hover:text-primary-hover">
                      {o.offer} →
                    </Link>
                  )
                ) : (
                  o.offer
                )}
              </p>
              <p className="text-sm text-ink-2">{o.what}</p>
            </li>
          ))}
        </ul>
      </TaSection>

      <section className="border-t border-line py-16 md:py-20">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <p className="eyebrow">கொள்முதல்</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink">GeM, பட்டியலிடல், MoU வழிகள்.</h2>
            <p className="mt-2 text-muted">ஒப்பந்தப்புள்ளிக்கு ஏற்ற வடிவங்கள்.</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-surface-2 p-8">
            <p className="eyebrow">கட்சி சார்பற்றது</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink">திட்டங்களையும் துறைகளையும் குறிப்பிடுவோம்.</h2>
            <p className="mt-2 text-muted">தனிநபர்களையோ கட்சிகளையோ ஒருபோதும் அல்ல.</p>
          </div>
        </div>
      </section>
    </>
  );
}
