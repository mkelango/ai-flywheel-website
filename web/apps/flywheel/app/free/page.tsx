import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { getProgramme } from "@/lib/programmes";
import { LEAD_MAGNETS } from "@/lib/learn";
import { GateLogCard, PageHero } from "@/components/ui";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/free");

export default function FreePage() {
  const foundation = getProgramme("foundation");
  return (
    <>
      <PageHero
        eyebrow="Free resources"
        title="Free AI resources. Start here."
        intro="Free AI resources: a free C1 course, the Flywheel Check and the templates we teach with. No card needed."
        crumbs={[{ label: "Home", href: "/" }, { label: "Free resources" }]}
        aside={
          <HeroPhoto
            photo="laptopWindow"
            alt="A laptop on a clean desk by a bright window, ready for free AI resources and the free C1 course"
            card={
              <>
                <FloatEyebrow>Free course</FloatEyebrow>
                <p className="mt-1 font-display text-lg font-semibold text-ink">Aware (C1)</p>
                <p className="text-xs text-ink-2">About 6 hours · English and Tamil · no card needed</p>
              </>
            }
          />
        }
      >
        <Button href="/programmes/foundation">Start the free course</Button>
        <Button href="/check" variant="secondary">
          Take the Flywheel Check
        </Button>
      </PageHero>

      <Section eyebrow="Free course" title="AI Flywheel Foundation." intro="About 6 hours, in English and Tamil. Earn Aware (C1).">
        <div className="grid gap-4 md:grid-cols-2">
          {foundation && <ProgrammeCard p={foundation} />}
          <Link href="/check" className="card card-hover flex flex-col p-6">
            <p className="eyebrow">About five minutes</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">Flywheel Check</h3>
            <p className="mt-1 text-sm text-muted">Suggests a level for each stage, so you know where to start.</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
              Take the check <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </Section>

      <Section eyebrow="Templates and guides" title="Tools we teach with." className="border-t border-line">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <Link href="/glossary" className="card card-hover flex h-full flex-col p-6">
              <p className="eyebrow">Reference</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">Glossary</h3>
              <p className="mt-1 text-sm text-ink-2">Plain-language terms from the playbooks.</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-ink">
                Open the glossary <ArrowRight className="size-4" />
              </span>
            </Link>
          </li>
          {LEAD_MAGNETS.map((m) => (
            <li key={m.title}>
              <Link href={m.href} className="card card-hover flex h-full flex-col p-6">
                <p className="eyebrow">{m.kind}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{m.title}</h3>
                <p className="mt-1 text-sm text-ink-2">{m.line}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-ink">
                  Open, print or save <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="gate-log" eyebrow="Sample" title="A gate log." intro="What reviewers audit at each gate of a turn." className="scroll-mt-20 border-t border-line">
        <div className="max-w-md">
          <GateLogCard />
          <Link href="/free/sample-gate-log" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
            See the full sample log <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Section>

      <QuickAnswers {...ANSWERS["/free"]} />
    </>
  );
}
