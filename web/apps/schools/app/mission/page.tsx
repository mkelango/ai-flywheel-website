import type { Metadata } from "next";
import { ArrowRight, WifiOff, Languages, MapPinned, HandHeart, School, Printer, Mail } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero, SectionHead } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/mission");

const DISTRICTS = [
  { name: "District A", schools: 24, teachers: 60, stage: "Example" },
  { name: "District B", schools: 18, teachers: 42, stage: "Example" },
  { name: "District C", schools: 30, teachers: 75, stage: "Example" },
  { name: "District D", schools: 20, teachers: 48, stage: "Example" },
];

export default function MissionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Mission & CSR" }]}
        eyebrow="Mission & CSR · Government and funders"
        title={
          <>
            AI literacy for government schools. <span lang="ta" className="block pt-2 text-[0.72em] text-ink-2">ஒவ்வொரு குழந்தைக்கும் AI அறிவு.</span>
          </>
        }
        intro="AI literacy for government schools: the same curriculum, in Tamil first, built to work offline. Every child, every school."
        actions={
          <>
            <Button href="#contact">Talk to the Mission team</Button>
            <Button href="#csr" variant="secondary">
              Become a Mission Patron
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="library"
            alt="A reader walking down a library aisle between full bookshelves"
            chip="Classes 3–8 first"
            card={
              <>
                <FloatEyebrow>Every child, every school</FloatEyebrow>
                <ul className="mt-2.5 space-y-1.5 text-ink">
                  <li className="flex items-center gap-2.5">
                    <Languages className="size-4 shrink-0 text-ink-2" aria-hidden /> Tamil first
                  </li>
                  <li className="flex items-center gap-2.5">
                    <WifiOff className="size-4 shrink-0 text-ink-2" aria-hidden /> Built to work offline
                  </li>
                </ul>
              </>
            }
          />
        }
      />

      <section id="schools" className="scroll-mt-24 pb-16 md:pb-24">
        <Container>
          <SectionHead
            eyebrow="Mission schools"
            title={
              <>
                Mission schools <span lang="ta" className="font-sans text-[0.7em] font-semibold text-ink-2">· மிஷன் பள்ளிகள்</span>
              </>
            }
            line="Government and aided schools, Classes 3–8 first. Funded through Mission Patrons and government partners."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { I: School, t: "Classes 3–8 first", l: "Spark and Practitioner, unplugged-first, in every Mission school." },
              { I: Printer, t: "Printed kits", l: "Lesson kits printed and delivered. No device needed for Classes 3–5." },
              { I: HandHeart, t: "Teachers trained free", l: "Every Mission teacher reaches Aware (C1), in Tamil." },
            ].map(({ I, t, l }, i) => (
              <Reveal key={t} delay={i * 0.06} className="card h-full p-6">
                <I className="size-7 text-ink" aria-hidden />
                <p className="mt-4 font-display text-lg font-semibold text-ink">{t}</p>
                <p className="mt-1 text-muted">{l}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="progress" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead eyebrow="Districts and progress" title="District by district." className="!mb-0" />
            <StatusTag status="Illustrative scenario" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DISTRICTS.map((d) => (
              <div key={d.name} className="card p-6">
                <MapPinned className="size-6 text-ink" aria-hidden />
                <p className="mt-3 font-display text-xl font-semibold text-ink">{d.name}</p>
                <p className="mt-1 text-sm text-muted">{d.stage}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                  <div>
                    <dt className="text-xs text-muted">Schools</dt>
                    <dd className="font-display text-2xl font-semibold text-ink">{d.schools}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Teachers</dt>
                    <dd className="font-display text-2xl font-semibold text-ink">{d.teachers}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Sample figures to show the reporting format. Live district reports follow the first pilots.</p>
        </Container>
      </section>

      <section id="tamil" className="scroll-mt-24 py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Tamil, offline-first delivery</p>
            <h2 lang="ta" className="font-sans text-3xl font-bold leading-snug text-ink md:text-4xl">
              தமிழில் முதலில். இணையம் இல்லாமலும்.
            </h2>
            <p className="mt-4 text-lg text-muted">Tamil first. Works without the internet too.</p>
          </div>
          <ul className="grid gap-3">
            {[
              { I: Languages, t: "Tamil-led lessons and guides", l: "Written in Tamil, not translated after." },
              { I: WifiOff, t: "An offline hub per cluster", l: "Lessons and Studio demos run on a local hub." },
              { I: Printer, t: "Paper first for young classes", l: "Cards, worksheets and floor robots." },
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
            <p className="eyebrow mb-3 !text-inverse-ink/70">For CSR partners</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-[2.6rem]">Become a Mission Patron.</h2>
            <p lang="ta" className="mt-2 text-xl opacity-85">
              மிஷன் புரவலர் ஆகுங்கள்.
            </p>
            <p className="mt-5 max-w-lg text-lg opacity-80">Fund a district. See where the money goes, and what changes, level by level.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact" variant="accent">
                Talk to the Mission team
              </Button>
              <Button href={siteHref("flywheel", "/mission-2047")} variant="ghost" className="!text-inverse-ink hover:!bg-white/10">
                Mission 2047 <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
          <ul className="grid gap-3">
            {["Cost per school, published", "Outcomes reported by level (C1–C3)", "A district report each term", "Your name on the Mission page, with consent"].map((t) => (
              <li key={t} className="rounded-[var(--radius-card)] bg-white/[0.06] p-5 ring-1 ring-white/10">
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/mission"]} eyebrow="Questions officers and funders ask" />
      <RelatedLinks
        links={[
          { href: "/mission/schools", label: "AI curriculum in Tamil, offline" },
          { href: "/mission/progress", label: "District AI literacy progress" },
          { href: "/mission/csr", label: "CSR funding for AI education" },
          { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
        ]}
      />

      <section id="contact" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <div className="card flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Contact the Mission team <span lang="ta" className="block pt-1 font-sans text-lg font-medium text-ink-2">மிஷன் குழுவைத் தொடர்பு கொள்ளுங்கள்</span>
              </h2>
              <p className="mt-2 text-muted">For district officers, education departments and CSR teams.</p>
            </div>
            <Button href="/demo?role=mission">
              <Mail className="size-4" aria-hidden /> Request a meeting
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
