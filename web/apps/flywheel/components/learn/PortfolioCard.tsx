import { STAGE_META, type LevelCode, type StageKey } from "@/lib/programmes";

const SAMPLE: { stage: StageKey; level: LevelCode | null }[] = [
  { stage: "foundation", level: "C1" },
  { stage: "generative", level: "C2" },
  { stage: "agentic", level: "C3" },
  { stage: "physical", level: null },
];

const ARTEFACTS = ["Gate log · Agentic · G1–G6", "Eval suite at shipping settings", "Tested kill switch", "Logged use case · Generative"];

/** A mock learner portfolio: level per stage, artefacts, verify ID. Labelled as a sample. */
export function PortfolioCard() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Portfolio · sample</span>
        <span className="font-mono text-[0.7rem] text-muted">aiflywheel.in/verify</span>
      </div>
      <div className="p-5">
        <p className="font-display text-2xl font-semibold text-ink">Your name</p>
        <p className="text-sm text-muted">Developers and software engineers track</p>
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SAMPLE.map((s) => (
            <li key={s.stage} className="rounded-lg border border-line p-3">
              <span className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                <span className="size-1.5 rounded-full" style={{ background: STAGE_META[s.stage].color }} aria-hidden />
                {STAGE_META[s.stage].short}
              </span>
              <span className={s.level ? "mt-1 block font-display text-xl font-semibold text-ink" : "mt-1 block font-display text-xl text-muted"}>{s.level ?? "—"}</span>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-5">Artefacts</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {ARTEFACTS.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden /> {a}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-line pt-3 font-mono text-xs text-muted">ID AFW-C3-SAMPLE · Open Badges 3.0</p>
      </div>
    </div>
  );
}
