import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { PROGRAMMES, STAGE_META } from "@/lib/programmes";
import { STAGE_PAGES } from "@/lib/learn";
import { LevelPill, PageHero } from "@/components/ui";
import { PortfolioCard } from "@/components/learn/PortfolioCard";

export const metadata: Metadata = pageMeta("/portfolio");

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Your portfolio"
        title="Your AI project portfolio: the work, not the hours."
        intro="Every level leaves an artefact. Your portfolio keeps them, with your level in each stage and a public verify page."
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        aside={<PortfolioCard />}
      >
        <Button href="/programmes/foundation">Start free</Button>
        <Button href="/verify" variant="secondary">
          Verify a credential
        </Button>
      </PageHero>

      <Section eyebrow="Artefacts by stage and level" title="What you'll keep.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STAGE_PAGES.map((s) => {
            const progs = PROGRAMMES.filter((p) => p.stage === s.stage);
            return (
              <article key={s.slug} className="card overflow-hidden">
                <span className="block h-1" style={{ background: STAGE_META[s.stage].color }} aria-hidden />
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    <Link href={`/programmes/${s.slug}`} className="hover:text-primary-hover">
                      {STAGE_META[s.stage].short}
                    </Link>
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {progs.map((p) => (
                      <li key={p.slug}>
                        <LevelPill level={p.level} />
                        <p className="mt-1.5 text-sm text-ink-2">{p.build.join(" · ")}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Public verify page" title="One link for employers." intro="Each badge has an ID. Anyone can check who holds it, the level and stage, and when it was issued." className="border-t border-line">
        <Button href="/verify" variant="secondary">
          How verification works
        </Button>
      </Section>
    </>
  );
}
