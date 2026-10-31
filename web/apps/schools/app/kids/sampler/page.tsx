import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Clock, Heart, Pencil } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { AskSchool } from "@/components/blocks";
import { KidsHero, KidsSafety, OtherKids, kidsButton } from "@/components/families/kids";
import { PaperDoodle } from "@/components/extras/bits";
import { PrintButton, PrintStyles } from "@/components/extras/print";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/kids/sampler");

const KIDS = "#B8306F";

export default function KidsSamplerPage() {
  return (
    <div className="font-sans">
      <PrintStyles />
      <KidsHero
        crumbs={[{ label: "Home", href: "/" }, { label: "AI Flywheel Kids", href: "/kids" }, { label: "Kids at Home", href: "/kids/at-home" }, { label: "Free sampler" }]}
        eyebrow="Kids at Home · free sampler"
        title="Free unplugged AI activities: three games about how machines think."
        intro="Free unplugged AI activities to print: grab a pencil and play together. About 30 minutes each. No screen, no account."
        kidLine="For you: be a robot, hunt for data, and catch an AI picture getting it wrong."
        actions={
          <>
            <PrintButton className="!min-h-12 px-6 text-base" />
            <Button href="/kids/at-home" variant="ghost" size="lg">
              About the full packs <ArrowRight className="size-4" aria-hidden />
            </Button>
          </>
        }
        art={<PaperDoodle className="mx-auto w-full max-w-[300px]" color={KIDS} />}
      />

      <article data-print-area className="py-12 md:py-16">
        <Container className="max-w-4xl space-y-8">
          <header className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
            <div>
              <p className="eyebrow mb-1">AI Flywheel Kids · Kids at Home</p>
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Free sampler: Classes 3–5 and 6–8</h2>
              <p lang="ta" className="mt-1 text-ink-2">
                இலவச மாதிரி: வீட்டில் செய்யும் செயல்பாடுகள்
              </p>
            </div>
            <p className="text-sm text-muted">You need: paper, a pencil, coloured pencils.</p>
          </header>

          <ParentGuide />

          <Activity n={1} title="Robot says" ta="ரோபோ சொல்கிறது" stage="Do" color="#8F5A00">
            <p>A robot only does exactly what it is told. Can you give perfect instructions?</p>
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
              <div className="space-y-4">
                <Band label="Classes 3–5">
                  One person is the robot. The other gives instructions to walk from the bed to the door: ‘step forward’, ‘turn left’, ‘stop’. The robot does exactly what is said, even if it is silly. Swap.
                </Band>
                <Band label="Classes 6–8">
                  On the grid, write the steps that take the robot to the star without touching a block. Use only F (forward one square), L (turn left) and R (turn right). Then give your steps to someone else. Did it work? Find the bug and fix it.
                </Band>
                <WriteLines label="My steps" />
              </div>
              <RobotGrid />
            </div>
            <Talk>Why did the robot do something silly? Whose mistake was it: the robot’s, or the instructions’?</Talk>
          </Activity>

          <Activity n={2} title="Picture data hunt" ta="படத் தரவு வேட்டை" stage="Know" color="#3B4BA8">
            <p>Machines learn from examples. Collect some examples of your own, and see what they say.</p>
            <Band label="Classes 3–5">Walk around one room. Make a tally mark for every thing you find in each group.</Band>
            <TallyTable />
            <Band label="Classes 6–8">
              Turn your tally into a bar chart on the back of this page. Then think: if a machine learned what ‘round’ means only from your kitchen, what might it get wrong in a classroom?
            </Band>
            <Talk>Which group had the most? Would a different room give a different answer? That is why machines need lots of fair examples.</Talk>
          </Activity>

          <Activity n={3} title="Spot what’s wrong in an AI picture" ta="AI படத்தில் தவறு எது?" stage="Make" color={KIDS}>
            <p>AI pictures can look real but get small things wrong. This picture has five mistakes. Circle them.</p>
            <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:items-start">
              <OddPicture />
              <div className="space-y-4">
                <Band label="Classes 3–5">Look at hands, writing, shadows and wheels. Count what you find.</Band>
                <Band label="Classes 6–8">For each mistake, write one word: why might an AI get this wrong?</Band>
                <p className="rotate-180 text-xs text-muted" aria-label="Answers: six fingers, a misspelt sign, a shadow pointing at the sun, a square wheel, a clock with no hands">
                  Answers: six fingers · ‘BUS STPO’ · shadow points at the sun · a square wheel · a clock with no hands
                </p>
              </div>
            </div>
            <Talk>Where have you seen a picture that might be made by AI? How could you check?</Talk>
          </Activity>

          <footer className="flex flex-col gap-2 border-t border-line pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>From AI Flywheel Kids, by AI Flywheel at Schools · aiflywheel.in/schools/kids/sampler</span>
            <span className="flex items-center gap-2">
              Full packs <StatusTag status="Proposed" /> ₹499–999 a pack
            </span>
          </footer>
          <div className="flex flex-wrap gap-3 print:hidden">
            <PrintButton />
            <Button href="/demo?role=parent&interest=kids-at-home" className={kidsButton}>
              Tell me when full packs are ready
            </Button>
          </div>
        </Container>
      </article>

      <KidsSafety />
      <div className="pt-4">
        <OtherKids current="at-home" />
      </div>
      <AskSchool />
    </div>
  );
}

function ParentGuide() {
  const points = [
    "Each activity takes about 30 minutes. Do one a day, not all three at once.",
    "Classes 3–5: read the steps aloud and play along. Classes 6–8: let them lead, and you be the robot.",
    "There are no wrong answers in the talk questions. Ask, then listen.",
    "Keep it unplugged. The point is to think about machines, not to use one.",
  ];
  return (
    <section data-print-card className="rounded-[28px] bg-highlight/50 p-6 md:p-7">
      <div className="flex items-center gap-3">
        <Heart className="size-6 text-ink" aria-hidden />
        <h2 className="font-display text-xl font-bold text-ink">
          For parents <span lang="ta" className="font-sans text-base font-medium text-ink-2">· பெற்றோருக்கு</span>
        </h2>
      </div>
      <ul className="mt-4 space-y-2 text-ink-2">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <Clock className="mt-1 size-4 shrink-0 text-ink" aria-hidden /> {p}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Activity({ n, title, ta, stage, color, children }: { n: number; title: string; ta: string; stage: string; color: string; children: ReactNode }) {
  return (
    <section data-print-card className="rounded-[28px] bg-surface p-6 ring-1 ring-line md:p-8" style={{ breakBefore: n > 1 ? "page" : undefined }}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full font-display text-lg font-bold text-white" style={{ background: color }}>
          {n}
        </span>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
          <p lang="ta" className="text-ink-2">
            {ta}
          </p>
        </div>
        <span className="ml-auto rounded-pill px-3 py-1 text-xs font-semibold text-ink" style={{ background: `color-mix(in oklab, ${color} 16%, white)` }}>
          {stage}
        </span>
      </div>
      <div className="mt-5 space-y-4 text-ink-2">{children}</div>
    </section>
  );
}

function Band({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1 text-ink">{children}</p>
    </div>
  );
}

function Talk({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl bg-surface-2/70 p-4 text-ink">
      <span className="font-semibold">Talk about it: </span>
      {children}
    </p>
  );
}

function WriteLines({ label }: { label: string }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <Pencil className="size-4" aria-hidden /> {label}
      </p>
      <div className="mt-2 space-y-5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-px border-b border-dashed border-ink/30" />
        ))}
      </div>
    </div>
  );
}

/** 5×5 grid: robot bottom-left facing up, star top-right, three blocks. */
function RobotGrid() {
  const S = 44;
  const blocks = [
    [1, 1],
    [3, 2],
    [2, 3],
  ];
  return (
    <svg viewBox={`0 0 ${S * 5 + 8} ${S * 5 + 8}`} className="mx-auto w-full max-w-[240px]" role="img" aria-label="A five by five grid. The robot starts bottom left, facing up. The star is top right. Three squares are blocked.">
      <g transform="translate(4 4)">
        {Array.from({ length: 25 }, (_, i) => (
          <rect key={i} x={(i % 5) * S} y={Math.floor(i / 5) * S} width={S} height={S} fill="#FFF7E8" stroke="#1E2A44" strokeOpacity=".3" strokeWidth="1.5" />
        ))}
        {blocks.map(([c, r]) => (
          <rect key={`${c}-${r}`} x={c * S + 6} y={r * S + 6} width={S - 12} height={S - 12} rx="6" fill="#1E2A44" opacity=".75" />
        ))}
        {/* star */}
        <path transform={`translate(${4 * S + S / 2} ${S / 2})`} d="M0-15l4.4 9 9.9 1.4-7.2 7 1.7 9.9L0 7.3l-8.8 4.6 1.7-9.9-7.2-7 9.9-1.4z" fill="#F2B705" />
        {/* robot facing up */}
        <g transform={`translate(${S / 2} ${4 * S + S / 2})`}>
          <rect x="-13" y="-10" width="26" height="22" rx="7" fill="#D98B0B" />
          <circle cx="-5" cy="0" r="3" fill="#FFF7E8" />
          <circle cx="5" cy="0" r="3" fill="#FFF7E8" />
          <path d="M0-10v-6" stroke="#1E2A44" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M-5-18l5-6 5 6z" fill="#1E2A44" />
        </g>
      </g>
    </svg>
  );
}

function TallyTable() {
  const rows = ["Red things", "Round things", "Things with wheels", "Things that make a sound"];
  return (
    <table className="w-full table-fixed border-collapse text-left">
      <caption className="sr-only">Tally table for the picture data hunt</caption>
      <thead>
        <tr className="text-sm text-muted">
          <th scope="col" className="w-[45%] border-b border-line py-2 font-semibold">Group</th>
          <th scope="col" className="border-b border-line py-2 font-semibold">Tally</th>
          <th scope="col" className="w-[18%] border-b border-line py-2 font-semibold">Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r}>
            <th scope="row" className="border-b border-dashed border-ink/25 py-4 pr-2 font-medium text-ink">
              {r}
            </th>
            <td className="border-b border-dashed border-ink/25" />
            <td className="border-b border-dashed border-ink/25" />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** A friendly street scene with five deliberate mistakes. No faces. */
function OddPicture() {
  return (
    <svg viewBox="0 0 360 260" className="w-full rounded-2xl ring-1 ring-line" role="img" aria-label="A street scene with a bus stop sign, a tree, a bicycle, a clock and a waving hand. Five things are wrong.">
      <rect width="360" height="260" fill="#DCEBFB" />
      <rect y="190" width="360" height="70" fill="#FFE39A" />
      {/* sun top-left */}
      <circle cx="46" cy="44" r="24" fill="#F2B705" />
      {/* tree, with a shadow pointing towards the sun (mistake) */}
      <path d="M118 196 L60 206 L66 200 Z" fill="#1E2A44" opacity=".25" />
      <rect x="112" y="140" width="12" height="56" rx="3" fill="#8B5A3C" />
      <circle cx="118" cy="128" r="30" fill="#13827F" />
      {/* bus stop sign with misspelt text (mistake) */}
      <rect x="196" y="110" width="6" height="86" fill="#1E2A44" />
      <rect x="168" y="84" width="64" height="30" rx="6" fill="#FFF7E8" stroke="#1E2A44" strokeWidth="2" />
      <text x="200" y="104" textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#1E2A44">
        BUS STPO
      </text>
      {/* clock with no hands (mistake) */}
      <circle cx="300" cy="56" r="22" fill="#FFF7E8" stroke="#1E2A44" strokeWidth="3" />
      {[0, 90, 180, 270].map((a) => (
        <rect key={a} x="299" y="38" width="2" height="6" fill="#1E2A44" transform={`rotate(${a} 300 56)`} />
      ))}
      {/* bicycle with one square wheel (mistake) */}
      <circle cx="262" cy="206" r="18" fill="none" stroke="#1E2A44" strokeWidth="4" />
      <rect x="296" y="188" width="36" height="36" fill="none" stroke="#1E2A44" strokeWidth="4" />
      <path d="M262 206l20-24h22l10 24M282 182l-6-10h-8M304 182l4-12h10" stroke="#B8306F" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* waving hand with six fingers (mistake) */}
      <g fill="#C98A5E">
        <rect x="24" y="200" width="40" height="40" rx="14" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={24 + i * 8} y={170 - (i === 2 ? 6 : 0)} width="7" height="36" rx="3.5" />
        ))}
        <rect x="64" y="196" width="8" height="26" rx="4" transform="rotate(30 68 209)" />
      </g>
    </svg>
  );
}
