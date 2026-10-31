import type { Metadata } from "next";
import { Check, Minus, WifiOff } from "lucide-react";
import { Button, Container } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";
import { LAB_TIERS } from "@/lib/data";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/lab");

const TINT: Record<string, string> = { starter: "#FFE39A", standard: "#DCEBFB", advanced: "#D3EEEC" };

const ROWS: { label: string; v: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: "Classes served", v: ["1–5", "1–8", "1–12"] },
  { label: "Floor robots and unplugged kits", v: [true, true, true] },
  { label: "Block-coded robots and sensors", v: [false, true, true] },
  { label: "Shared student devices", v: [false, true, true] },
  { label: "Offline hub", v: [false, true, true] },
  { label: "Robot arms and simulation", v: [false, false, true] },
  { label: "Studios it runs", v: ["Teacher demos", "Generative, Model (FY28)", "Agentic from Feb 2027; all four in FY28"] },
  { label: "Set-up (Ed 1.1 band)", v: ["₹1–2 lakh", "₹3–6 lakh", "₹8–25 lakh"] },
];

export default function LabPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "For Schools", href: "/for-schools" }, { label: "Spark Lab" }]}
        eyebrow="Spark Lab · name to confirm"
        title="Spark Lab: an AI lab for schools in Tamil Nadu."
        intro="An AI and robotics lab for schools in three tiers, priced in Ed 1.1 bands, excl. GST. Robots, sensors and devices that run AI Flywheel Studio."
        updated
        actions={
          <>
            <Button href="/demo">Book a lab visit</Button>
            <Button href="#compare" variant="secondary">
              Compare tiers
            </Button>
          </>
        }
        art={
          <HeroPhoto
            photo="roboticsLab"
            alt="Engineer at a laptop inside a robotics workcell, with the robot arms an Advanced AI lab for schools grows into"
            chip={
              <>
                <WifiOff className="size-4" aria-hidden /> Offline hub from Standard
              </>
            }
            card={
              <>
                <FloatEyebrow>Set-up · Ed 1.1 bands, excl. GST</FloatEyebrow>
                <dl className="mt-2.5 divide-y divide-line">
                  {LAB_TIERS.map((t) => (
                    <div key={t.key} className="flex items-center justify-between gap-3 py-1.5">
                      <dt className="flex items-center gap-2 font-semibold text-ink">
                        <span className="size-2.5 rounded-full ring-1 ring-ink/25" style={{ background: TINT[t.key] }} aria-hidden />
                        {t.name}
                      </dt>
                      <dd className="text-ink-2">{t.price}</dd>
                    </div>
                  ))}
                </dl>
              </>
            }
          />
        }
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {LAB_TIERS.map((t, i) => (
              <Reveal key={t.key} delay={i * 0.08} className="card card-hover flex h-full flex-col overflow-hidden">
                <div className="p-7" style={{ background: TINT[t.key] }}>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-2">{t.classes}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-ink">{t.name}</p>
                  <p className="mt-1 text-lg text-ink">{t.price}</p>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-ink-2">{t.line}</p>
                  <ul className="mt-5 space-y-2">
                    {t.kit.map((k) => (
                      <li key={k} className="flex gap-2.5 text-[0.95rem] text-ink-2">
                        <Check className="mt-1 size-4 shrink-0 text-physical" aria-hidden /> {k}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-6 text-sm text-muted">
                    Runs: <span className="text-ink-2">{t.studio}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Lab prices are estimates from Ed 1.1 bands, excl. GST. We quote per school after a visit.</p>
        </Container>
      </section>

      <section id="compare" className="scroll-mt-24 bg-surface-2/60 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="Tier comparison" title="Which tier for which classes?" line="Starter for Classes 1–5, Standard for 1–8, Advanced for 1–12. Upgrade as more classes join." />
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Spark Lab tier comparison</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="p-4 text-sm font-semibold text-muted">
                    &nbsp;
                  </th>
                  {LAB_TIERS.map((t) => (
                    <th key={t.key} scope="col" className="p-4 font-display text-lg font-semibold text-ink">
                      <span className="mr-2 inline-block size-3 rounded-full align-middle" style={{ background: TINT[t.key] }} aria-hidden />
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 text-[0.95rem] font-medium text-ink">
                      {r.label === "Offline hub" ? (
                        <span className="inline-flex items-center gap-2">
                          <WifiOff className="size-4" aria-hidden /> Offline hub
                        </span>
                      ) : (
                        r.label
                      )}
                    </th>
                    {r.v.map((v, i) => (
                      <td key={i} className="p-4 text-ink-2">
                        {v === true ? <Check className="size-5 text-physical" aria-label="Included" /> : v === false ? <Minus className="size-5 text-muted" aria-label="Not included" /> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <QuickAnswers items={ANSWERS["/lab"]} />
      <RelatedLinks
        links={[
          { href: "/programmes/play", label: "AI for Class 1 and 2" },
          { href: "/programmes/spark", label: "AI for Classes 3 to 5" },
          { href: "/programmes/builders-club", label: "AI and robotics club for Classes 9–12" },
          { href: "/pricing", label: "AI curriculum price per student" },
          { href: "/mark", label: "AI school certification" },
        ]}
      />
      <DemoBand title="Visit a lab, or let us visit yours." line="We look at your rooms, power and network, then quote." />
    </>
  );
}
