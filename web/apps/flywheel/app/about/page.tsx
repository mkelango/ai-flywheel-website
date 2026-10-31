import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/ui";
import { AUTHOR, BRAND_LINE, ORG_ID, UPDATED } from "@/lib/seo";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { siteHref, SITES } from "@flywheel/ui/sites";
import { BOOKS } from "@/lib/framework";
import { BookCover, PageHero } from "@/components/ui";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/about");

const PRINCIPLES = [
  { t: "Proof over promise", d: "Levels are earned on artefacts and one check without AI." },
  { t: "Method over tools", d: "DRIVE, CORE and the four life cycles outlast any model." },
  { t: "A ladder, not a library", d: "Every course sits on C1 to C5 and names the next step." },
  { t: "Built in Tamil Nadu", d: "Tamil and English, rupee prices, data kept in India." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AI Flywheel"
        title="The AI learning platform that certifies what you can build."
        intro="AI Flywheel is the practical AI learning platform that certifies what you can build. Not what you watched: one framework, six books of method and a studio where you ship real work."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        aside={
          <HeroPhoto
            photo="library"
            alt="A student walking down a library aisle between tall bookshelves, a nod to the books of method behind AI Flywheel"
            card={
              <>
                <FloatEyebrow>The method</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold text-ink">2,250 pages</p>
                <p className="text-xs text-ink-2">of method in the four Studio Playbooks</p>
              </>
            }
          />
        }
      />

      <Section eyebrow="Our story" title="Four principles.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <li key={p.t} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{p.t}</h3>
              <p className="mt-1 text-sm text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section id="elango" className="scroll-mt-20 border-t border-line py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="grid aspect-square w-full max-w-xs place-items-center rounded-[var(--radius-card)] bg-inverse font-display text-6xl text-inverse-ink" aria-hidden>
              MKE
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">The author</p>
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">M. K. Elango</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-2">
              Strategist based in Tamil Nadu. Works with founders, MSMEs and family business groups across India, the Gulf and South-East Asia. Author of The AI Flywheel and the four Studio Playbooks.
            </p>
            <div id="books" className="mt-10 scroll-mt-28">
              <p className="eyebrow mb-4">The books · the curriculum</p>
              <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {BOOKS.map((b) => (
                  <li key={b.title}>
                    <BookCover title={b.title} sub={b.sub} color={b.color} pages={b.pages} />
                    <p className="mt-2 text-xs text-muted">Takes learners {b.levels}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="mission-2047" className="scroll-mt-20 bg-inverse py-16 text-inverse-ink md:py-24">
        <div className="container-site max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-inverse-ink/60">Mission 2047 · our purpose</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-5xl">Count builders, not enrolments.</h2>
          <p className="mt-4 text-lg text-inverse-ink/75">People who can build with AI, counted by stage and level, in every district. School delivery runs on {SITES.schools.name}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/government">For government</Button>
            <a href={siteHref("schools", "/")} className="inline-flex min-h-11 items-center rounded-pill border border-white/25 px-5 text-sm font-medium hover:border-white/60">
              {SITES.schools.name} ↗
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-4 md:grid-cols-2">
          <div id="inevitra" className="card scroll-mt-28 p-8">
            <p className="eyebrow">The company</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Inevitra Advisory</h2>
            <p className="mt-2 text-muted">AI Flywheel is a brand of Inevitra Advisory. Make the impossible inevitable.</p>
          </div>
          <div id="partners" className="card scroll-mt-28 p-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Work with us</p>
              <StatusTag status="Ed 1.1" />
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Knowledge Partners</h2>
            <p className="mt-2 text-muted">Leader (C4) or above, plus train-the-trainer. A 15 to 25% revenue share.</p>
            <Button href="/contact?tag=professionals" variant="secondary" size="sm" className="mt-5">
              Apply to partner
            </Button>
          </div>
        </div>
      </section>

      <QuickAnswers {...ANSWERS["/about"]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/about`,
          name: "About AI Flywheel and M. K. Elango",
          description: BRAND_LINE,
          about: { "@id": ORG_ID },
          mainEntity: AUTHOR,
          dateModified: UPDATED.iso,
        }}
      />
    </>
  );
}
