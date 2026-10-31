import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { TRACKS } from "@/lib/framework";
import { PageHero } from "@/components/ui";
import { TrackQuiz } from "@/components/TrackQuiz";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/professionals");

const INFO = [
  { id: "cohort", title: "How a cohort works", text: "12 weeks, about 8 hours a week, one real use case, a team of four to six, gates G1 to G6. Evenings (IST) and Saturdays." },
  { id: "credential", title: "Your credential", text: "An Open Badges 3.0 badge showing level and stage, a public verify page, recertification every year." },
  { id: "paying", title: "Paying for it", text: "EMI, student and women-in-tech scholarships (Proposed), an employer sponsorship letter and a GST invoice." },
  { id: "free", title: "Free resources", text: "The glossary, the 30-day technical literacy path, prompt library samples and insights." },
];

export default function ProfessionalsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Flywheel for Professionals"
        title="AI courses for working professionals, proven on real work."
        intro="Evening and Saturday AI courses (IST) for working professionals. Pick your role: we'll show where to start, what you'll build and where it leads."
        crumbs={[{ label: "Home", href: "/" }, { label: "Professionals" }]}
        aside={
          <HeroPhoto
            photo="portrait"
            alt="A smiling working professional in a grey blazer, the kind of learner our AI courses for working professionals are built for"
            chip="Start free · C1"
            card={
              <>
                <FloatEyebrow>Cohort · 12 weeks</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold text-ink">About 8 hours a week</p>
                <p className="text-xs text-ink-2">Evenings (IST) and Saturdays</p>
              </>
            }
          />
        }
      >
        <Button href="/programmes/foundation" size="lg">
          Start free
        </Button>
        <Button href="#find-my-track" variant="secondary" size="lg">
          Find my track
        </Button>
      </PageHero>

      <Section id="find-my-track" eyebrow="Three questions · about 30 seconds" title="Find my track." className="scroll-mt-20">
        <div className="max-w-3xl">
          <TrackQuiz />
          <p className="mt-3 text-xs text-muted">Runs in your browser. Nothing is stored or sent.</p>
        </div>
      </Section>

      <Section id="tracks" eyebrow="Seven career tracks" title="Start. Build. Lead." intro="Each track is built from the roles in the Studio Playbooks." className="border-t border-line">
        <div className="grid gap-4 md:grid-cols-2">
          {TRACKS.map((t, i) => (
            <Reveal key={t.key} delay={(i % 2) * 0.05}>
              <article id={`track-${t.key}`} className="card h-full scroll-mt-28 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-ink">{t.name}</h3>
                  <span className="shrink-0 rounded-pill bg-surface-2 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-ink-2">{t.studio}</span>
                </div>
                <ol className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                  <li className="rounded-lg border border-line p-3">
                    <span className="eyebrow block text-[0.62rem]">Start</span>
                    <span className="mt-1 block text-ink">{t.start}</span>
                  </li>
                  <li className="rounded-lg border border-line p-3">
                    <span className="eyebrow block text-[0.62rem]">Build</span>
                    <span className="mt-1 block text-ink">{t.build.join(" → ")}</span>
                  </li>
                  <li className="rounded-lg border border-line p-3">
                    <span className="eyebrow block text-[0.62rem]">Lead</span>
                    <span className="mt-1 block text-ink">{t.lead ?? "—"}</span>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-muted">{t.roles}</p>
                <Link href={`/tracks/${t.key === "data" ? "data-ml" : t.key}`} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
                  See this track <ArrowRight className="size-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-t border-line py-16 md:py-20">
        <div className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map((b) => (
            <div key={b.id} id={b.id} className="scroll-mt-28 rounded-[var(--radius-card)] bg-surface-2 p-6">
              <h2 className="font-display text-xl font-semibold text-ink">{b.title}</h2>
              <p className="mt-2 text-sm text-ink-2">{b.text}</p>
              {b.id === "paying" && (
                <span className="mt-3 inline-block">
                  <StatusTag status="Proposed" />
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <QuickAnswers {...ANSWERS["/professionals"]} />
    </>
  );
}
