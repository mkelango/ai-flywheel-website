import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check, ClipboardList, Download, Handshake, MessageSquare, Sparkles, Users } from "lucide-react";
import { Button, Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { DemoBand, PageHero, SectionHead } from "@/components/blocks";
import { TeacherArt } from "@/components/art";
import { Timeline } from "@/components/offer/Timeline";
import { PROGRAMMES } from "@/lib/data";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";
import { COMMUNITY, KIT_CONTENTS, PARTNER_PATH, TEACHER_LEVELS, TEACHER_TOPICS, TEACHER_TOPIC_META, WORKSHOP_CALENDAR, type TeacherTopic } from "@/lib/offer";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return TEACHER_TOPICS.map((topic) => ({ topic }));
}

export const dynamicParams = false;

const TEACHER_RELATED: Record<TeacherTopic, { href: string; label: string }[]> = {
  flywheel: [
    { href: "/verify", label: "Verify a teacher AI certificate" },
    { href: "/teachers/workshops", label: "AI workshops for teachers" },
    { href: "/mark", label: "AI school certification" },
  ],
  kits: [
    { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
    { href: "/programmes/boards", label: "CBSE AI curriculum, Class 3 to 8" },
    { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
  ],
  workshops: [
    { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
    { href: "/teachers/kits", label: "AI lesson plans for teachers" },
    { href: "/events", label: "Inter-school AI challenge" },
  ],
  community: [
    { href: "/teachers", label: "AI training for teachers" },
    { href: "/teachers/kits", label: "AI lesson plans for teachers" },
    { href: "/mission/schools", label: "AI curriculum in Tamil, for government schools" },
  ],
};

const isTopic = (t: string): t is TeacherTopic => (TEACHER_TOPICS as readonly string[]).includes(t);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  if (!isTopic(topic)) return {};
  const m = TEACHER_TOPIC_META[topic];
  return pageMeta(`/teachers/${topic}`, { title: `${m.label} for teachers`, description: m.description });
}

export default async function TeacherTopicPage({ params }: Props) {
  const { topic } = await params;
  if (!isTopic(topic)) notFound();
  const m = TEACHER_TOPIC_META[topic];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Teachers", href: "/teachers" }, { label: m.label }]}
        eyebrow={m.label}
        title={m.title}
        intro={m.intro}
        updated={topic === "flywheel"}
        art={topic === "flywheel" ? <TeacherArt className="mx-auto w-full max-w-md" /> : undefined}
        actions={
          topic === "kits" ? (
            <Button href="/demo">
              <Download className="size-4" aria-hidden /> Download a sample kit
            </Button>
          ) : topic === "community" ? (
            <Button href={siteHref("studio", "/sign-in")}>Teacher login</Button>
          ) : (
            <Button href="/demo">Book a school demo</Button>
          )
        }
      />
      {topic === "flywheel" && <Flywheel />}
      {topic === "kits" && <Kits />}
      {topic === "workshops" && <Workshops />}
      {topic === "community" && <Community />}
      {ANSWERS[`/teachers/${topic}`] && <QuickAnswers items={ANSWERS[`/teachers/${topic}`]} eyebrow="Questions teachers ask" />}
      <RelatedLinks links={TEACHER_RELATED[topic]} />
      <DemoBand title="Train your teachers before the June term." line="Aware (C1) is free for every teacher in a partner school." />
    </>
  );
}

function Flywheel() {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <ol className="grid gap-4 md:grid-cols-3">
          {TEACHER_LEVELS.map((l, i) => (
            <Reveal key={l.code} delay={i * 0.08} className="card h-full overflow-hidden">
              <div className="flex items-baseline justify-between p-6" style={{ background: l.tint }}>
                <h2 className="font-display text-2xl font-semibold text-ink">{l.name}</h2>
                <p className="font-mono text-sm text-ink-2">{l.code}</p>
              </div>
              <dl className="space-y-4 p-6">
                {(
                  [
                    ["What it is", l.how],
                    ["How it’s earned", l.proof],
                    ["Access", l.cost],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                    <dd className="mt-0.5 text-ink-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 text-muted">The same level words children use, from C1 to C3.</p>
      </Container>
    </section>
  );
}

function Kits() {
  return (
    <>
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                <SmartLink href={`/programmes/${p.slug}#sample`} className="card card-hover flex h-full flex-col p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl text-ink" style={{ background: p.tint }}>
                    <BookOpen className="size-5" aria-hidden />
                  </span>
                  <span className="mt-4 block font-display text-lg font-semibold text-ink">{p.short} kit</span>
                  <span className="block text-sm text-muted">{p.classes}</span>
                  <span className="mt-3 block text-[0.95rem] text-ink-2">{p.terms.length} terms · {p.time.toLowerCase()}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-ink">
                    Sample lesson <ArrowRight className="size-4" aria-hidden />
                  </span>
                </SmartLink>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="In every kit" title="Ready to teach on Monday." className="!mb-6" />
            <ul className="space-y-3">
              {KIT_CONTENTS.map((k) => (
                <li key={k} className="flex gap-3 text-ink-2">
                  <Check className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden /> {k}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <ClipboardList className="size-7 text-ink" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Assessment guides</h2>
            <p className="mt-2 text-muted">One per class band. Mark by level and stage, never by rank. No marks for Classes 1–2.</p>
            <Button href="/demo" variant="secondary" className="mt-6">
              <Download className="size-4" aria-hidden /> Download a sample kit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function Workshops() {
  return (
    <section className="pb-16 md:pb-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="Termly calendar" title="Four moments in the year." line="Each school gets its own dates." />
        <Timeline
          items={WORKSHOP_CALENDAR.map((w) => ({
            when: w.when,
            title: w.term,
            detail: (
              <span className="mt-1 block space-y-1">
                {w.items.map((it) => (
                  <span key={it} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" aria-hidden /> {it}
                  </span>
                ))}
              </span>
            ),
          }))}
        />
      </Container>
    </section>
  );
}

const COMMUNITY_ICONS = [Sparkles, Users, MessageSquare];

function Community() {
  return (
    <>
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {COMMUNITY.map((c, i) => {
              const I = COMMUNITY_ICONS[i];
              return (
                <Reveal key={c.title} delay={i * 0.06} className="card h-full p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-highlight text-ink">
                    <I className="size-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-ink">{c.title}</h2>
                  <p className="mt-1 text-muted">{c.line}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
      <section className="py-4 md:py-8">
        <Container>
          <div className="rounded-[32px] bg-inverse p-8 text-inverse-ink md:p-12">
            <Handshake className="size-8" aria-hidden />
            <h2 className="mt-4 font-display text-3xl font-semibold">The path to Knowledge Partner</h2>
            <p className="mt-2 max-w-xl opacity-80">Teachers at Leader (C4), with train-the-trainer, can train other teachers and co-write kits, through AI Flywheel.</p>
            <ol className="mt-8 flex flex-wrap items-center gap-2">
              {PARTNER_PATH.map((s, i) => (
                <li key={s.code} className="flex items-center gap-2">
                  <span className={i === PARTNER_PATH.length - 1 ? "rounded-pill bg-accent px-4 py-2 font-semibold text-on-accent" : "rounded-pill bg-white/10 px-4 py-2 ring-1 ring-white/15"}>
                    <span className="font-mono text-xs opacity-75">{s.code}</span> {s.name}
                  </span>
                  {i < PARTNER_PATH.length - 1 && <ArrowRight className="size-4 opacity-60" aria-hidden />}
                </li>
              ))}
            </ol>
            <Button href={siteHref("flywheel", "/partners/knowledge")} variant="accent" className="mt-8">
              Become a Knowledge Partner <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
