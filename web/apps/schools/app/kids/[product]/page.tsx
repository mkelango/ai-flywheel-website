import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Gift, Users, Download } from "lucide-react";
import { Button, Container, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { AskSchool, StageBadge } from "@/components/blocks";
import { HandsWork } from "@/components/families/art";
import { KidsCtas, KidsHero, KidsSafety, OtherKids, kidsButton } from "@/components/families/kids";
import { KIDS_PRODUCTS } from "@/lib/data";
import { KIDS_DETAIL, type KidsProductId } from "@/lib/families";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";

/** H1 and an answer-first lead per Kids product, each carrying that page's keyword. */
const HEAD: Record<KidsProductId, { h1: string; lead: string }> = {
  "summer-camp": {
    h1: "An AI summer camp for kids in Chennai: two weeks of making.",
    lead: "Our AI summer camp for kids runs in Chennai, Coimbatore, Madurai and Tiruchirappalli: two weeks in April–May, 2–3 hours a day, for Classes 3–8 (ages 8–14).",
  },
  "weekend-club": {
    h1: "Weekend AI classes for kids: a term of Saturdays.",
    lead: "Weekend AI classes for kids in Classes 3–8 (ages 8–14): a school term of Saturdays, 2 hours a week, with a project every month.",
  },
  bootcamp: {
    h1: "A robotics camp for kids in the holidays: one big build.",
    lead: "A 3–5 day robotics camp for kids in the Pongal, Diwali or Christmas break, for Classes 3–8 (ages 8–14).",
  },
  "at-home": {
    h1: "AI activities for kids at home, with no screen.",
    lead: "Printable AI activities for kids at home: unplugged packs for Classes 3–8 with a parent guide, in Tamil and English.",
  },
};

const RELATED: Record<KidsProductId, { href: string; label: string }[]> = {
  "summer-camp": [
    { href: "/kids/find", label: "Find a kids AI camp near you" },
    { href: "/kids/host", label: "Host a kids AI camp at your school" },
    { href: "/parents/safety", label: "Is AI safe for children?" },
  ],
  "weekend-club": [
    { href: "/kids/find", label: "Find a kids AI camp near you" },
    { href: "/programmes/practitioner", label: "AI for Classes 6 to 8 at school" },
    { href: "/parents/screen-time", label: "Screen time in AI lessons" },
  ],
  bootcamp: [
    { href: "/kids/find", label: "Find a kids AI camp near you" },
    { href: "/programmes/spark", label: "AI for Classes 3 to 5 at school" },
    { href: "/parents/safety", label: "Is AI safe for children?" },
  ],
  "at-home": [
    { href: "/kids/sampler", label: "Free unplugged AI activities" },
    { href: "/parents/guides", label: "AI guides for parents" },
    { href: "/parents/screen-time", label: "Screen time in AI lessons" },
  ],
};

type Props = { params: Promise<{ product: string }> };

export const dynamicParams = false;

const ART: Record<KidsProductId, "robot" | "story" | "cards" | "bot"> = { "summer-camp": "robot", "weekend-club": "story", bootcamp: "bot", "at-home": "cards" };

function get(id: string) {
  const p = KIDS_PRODUCTS.find((x) => x.id === id);
  if (!p) return null;
  return { ...p, id: p.id as KidsProductId, ...KIDS_DETAIL[p.id as KidsProductId] };
}

export function generateStaticParams() {
  return KIDS_PRODUCTS.map((p) => ({ product: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).product);
  if (!p) return {};
  return pageMeta(`/kids/${p.id}`, { title: `${p.name}, Classes 3–8`, description: p.description });
}

export default async function KidsProductPage({ params }: Props) {
  const p = get((await params).product);
  if (!p) notFound();
  // Darker yellow and blue, so white step numbers stay above 4.5:1.
  const tint = p.color === "#F2B705" ? "#8F5A00" : p.color === "#2F7FD8" ? "#1F66B8" : p.color;
  const facts = [
    { I: CalendarDays, k: "When", v: p.format },
    { I: Users, k: "Who", v: p.who },
    { I: Gift, k: "Take home", v: p.takeHome },
  ];

  return (
    <div className="font-sans">
      <KidsHero
        crumbs={[{ label: "Home", href: "/" }, { label: "AI Flywheel Kids", href: "/kids" }, { label: p.name }]}
        eyebrow={`${p.name} · by AI Flywheel at Schools`}
        title={HEAD[p.id].h1}
        intro={HEAD[p.id].lead}
        kidLine={p.kidLine}
        actions={
          p.id === "at-home" ? (
            <KidsCtas
              secondary={
                <Button href="/kids/sampler" variant="secondary" size="lg" className="bg-surface/70">
                  <Download className="size-4" aria-hidden /> Get the free sampler
                </Button>
              }
            />
          ) : (
            <KidsCtas />
          )
        }
        art={<HandsWork className="mx-auto w-full max-w-[440px]" color={p.color} kind={ART[p.id]} />}
      />

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-3">What they make</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.4rem]">Something real, every time.</h2>
            <ul className="mt-8 space-y-3">
              {p.makes.map((m, i) => (
                <li key={m.what}>
                  <Reveal delay={i * 0.05} className="flex flex-col gap-2 rounded-3xl bg-surface p-5 ring-1 ring-line sm:flex-row sm:items-center sm:gap-4">
                    <StageBadge stage={m.stage} className="w-fit" />
                    <span className="text-ink">{m.what}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <div className="rounded-[32px] bg-surface p-6 ring-2 ring-[color-mix(in_oklab,var(--kids)_22%,transparent)] md:p-7">
              <dl className="space-y-4">
                {facts.map(({ I, k, v }) => (
                  <div key={k} className="flex gap-3">
                    <I className="mt-0.5 size-5 shrink-0" style={{ color: tint }} aria-hidden />
                    <div>
                      <dt className="text-sm text-muted">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                <span className="font-display text-2xl font-semibold text-ink">{p.price}</span>
                <StatusTag status="Proposed" />
              </div>
              {p.note && <p className="mt-3 text-sm text-muted">{p.note}</p>}
            </div>
            <div className="rounded-[32px] bg-highlight/50 p-6 md:p-7">
              <p className="font-display text-lg font-semibold text-ink">Schedule</p>
              <ol className="mt-3 space-y-2">
                {p.schedule.map((s, i) => (
                  <li key={s} className="flex gap-3 text-ink-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-xs text-white" style={{ background: tint }}>
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <KidsSafety />

      <section className="kids-sky py-12">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-bold text-ink">Summer camps fill from February.</p>
          <Button href="/kids/find" size="lg" className={kidsButton}>
            Find a Kids camp
          </Button>
        </Container>
      </section>

      {ANSWERS[`/kids/${p.id}`] && <QuickAnswers items={ANSWERS[`/kids/${p.id}`]} eyebrow="Questions parents ask" />}
      <div className="pt-4">
        <OtherKids current={p.id} />
      </div>
      <RelatedLinks links={RELATED[p.id]} />
      <AskSchool />
    </div>
  );
}
