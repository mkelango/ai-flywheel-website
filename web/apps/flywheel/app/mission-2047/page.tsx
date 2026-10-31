import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { LEVELS, siteHref, SITES } from "@flywheel/ui/sites";
import { MISSION } from "@/lib/company";
import { PageHero } from "@/components/ui";
import { CtaBand } from "@/components/research/CtaBand";

export const metadata: Metadata = pageMeta("/mission-2047");

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="About · our purpose"
        title="Mission 2047: count AI builders, not enrolments."
        intro="By India's hundredth year of independence, people who can build with AI, counted by level and stage, in every district."
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Mission 2047" }]}
      >
        <Button href="/government">For government</Button>
        <Button href={siteHref("schools", "/mission")} variant="secondary">
          Mission schools ↗
        </Button>
      </PageHero>

      <Section eyebrow="What we stand for" title="Four commitments.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MISSION.pillars.map((p, i) => (
            <li key={p.t} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">{p.t}</h2>
              <p className="mt-1 text-sm text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="The public count" title="People by level and stage." intro="A level counts only when it is earned on evidence. Figures will be published once the first cohorts are assessed." className="border-t border-line">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">Public count by stage and level, not yet published</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-muted">
                  Stage
                </th>
                {LEVELS.map((l) => (
                  <th key={l.code} scope="col" className="px-2 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                    {l.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MISSION.count.map((s) => (
                <tr key={s.stage} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium text-ink">
                    <span className="mr-2 inline-block size-2 rounded-full" style={{ background: s.color }} aria-hidden />
                    {s.stage}
                  </th>
                  {LEVELS.map((l) => (
                    <td key={l.code} className="px-2 py-3 text-muted">
                      —
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <StatusTag status="Proposed" /> No figures yet. Dashes mean not published, not zero.
        </p>
      </Section>

      <CtaBand eyebrow="Schools" title={`Children learn on ${SITES.schools.name}.`} line="School delivery, Mission schools and children's data rules live on the Schools site.">
        <Button href={siteHref("schools", "/mission")}>Schools Mission ↗</Button>
        <Button href="/contact?tag=government" variant="secondary">
          Talk to the government team
        </Button>
      </CtaBand>
    </>
  );
}
