import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { WheelMark } from "@flywheel/ui/components/WheelMark";
import { LEVELS, STAGES } from "@flywheel/ui/sites";
import { CORE, DRIVE, MATRIX } from "@/lib/framework";
import { PageHero } from "@/components/ui";
import { StageMatrix } from "@/components/StageMatrix";

export const metadata: Metadata = pageMeta("/framework");

export default function FrameworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Framework & Research"
        title="The AI Flywheel framework: four stages, DRIVE at the hub, CORE at the rim."
        intro="The AI Flywheel framework runs every programme, every studio and every level. Tools expire. Layers endure."
        crumbs={[{ label: "Home", href: "/" }, { label: "Framework" }]}
        updated
        aside={
          <div className="mx-auto w-fit">
            <WheelMark size={300} animate title="The AI Flywheel" />
          </div>
        }
      >
        <Button href="/check">Take the Flywheel Check</Button>
        <Button href="/programmes" variant="secondary">
          See programmes
        </Button>
      </PageHero>

      <Section id="stages" eyebrow="The four stages" title="Know. Make. Do. Move." className="scroll-mt-20">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <li key={s.key}>
              <Reveal delay={i * 0.06} className="card h-full overflow-hidden">
                <div className="h-1.5" style={{ background: s.color }} />
                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    0{i + 1} · {s.verb}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted">{s.line}.</p>
                  <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-wider text-ink-2">{MATRIX[s.key].lifecycle}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <section id="drive" className="scroll-mt-20 border-t border-line py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">The hub · method</p>
            <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">DRIVE</h2>
            <p className="mt-3 text-muted">A cycle, not a line. Every life cycle runs inside it.</p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-5">
            {DRIVE.map((d) => (
              <li key={d.word} className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
                <span className="font-display text-4xl font-semibold text-primary-hover">{d.letter}</span>
                <span className="mt-2 block font-semibold text-ink">{d.word}</span>
                <span className="mt-1 block text-sm text-muted">{d.line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="core" className="scroll-mt-20 bg-inverse py-16 text-inverse-ink md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-inverse-ink/60">The rim · governance</p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">CORE</h2>
            <p className="mt-3 text-inverse-ink/70">Governance that runs across every stage, not after it.</p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {CORE.map((c) => (
              <li key={c.word} className="rounded-[var(--radius-card)] border border-white/10 p-5">
                <span className="font-display text-4xl font-semibold text-highlight">{c.letter}</span>
                <span className="mt-2 block font-semibold">{c.word}</span>
                <span className="mt-1 block text-sm text-inverse-ink/70">{c.line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section id="levels" eyebrow="Learning framework · C1 to C5" title="Your level, held separately in each stage." intro="Click a stage. Each level is earned only with evidence from real work." className="scroll-mt-20">
        <StageMatrix />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {LEVELS.map((l) => (
            <div key={l.code} className="rounded-xl bg-surface-2 p-4">
              <p className="font-mono text-xs text-muted">{l.code}</p>
              <p className="font-semibold text-ink">{l.name}</p>
              <p className="mt-1 text-xs text-ink-2">Evidence: {l.evidence}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">The framework is proposed and not yet externally validated. It is based on, not aligned to, UNESCO and SFIA.</p>
      </Section>

      <QuickAnswers {...ANSWERS["/framework"]} />
    </>
  );
}
