import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MessagesSquare, ScanEye, BookCheck, PhoneCall, Check, Scissors, Monitor } from "lucide-react";
import { Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { JsonLd, PageHero, SectionHead, faqLd } from "@/components/blocks";
import { QAList, QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";
import { ConsentFlow, ParentLinks, ParentTopicNav, SafetyNote } from "@/components/families/parents";
import { PROGRAMMES, WHATSAPP_URL } from "@/lib/data";
import { PARENT_GUIDES, type GuideSlug } from "@/components/extras/content";
import { GUIDES, HOME_TIPS, PARENT_FAQ, PARENT_TOPICS, PLAIN_PROMISES, SCREEN_BANDS, getParentTopic, type ParentTopicSlug } from "@/lib/families";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PARENT_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getParentTopic((await params).topic);
  if (!t) return {};
  return pageMeta(`/parents/${t.slug}`, { title: `${t.label}: for parents`, description: t.description });
}

export default async function ParentTopicPage({ params }: Props) {
  const t = getParentTopic((await params).topic);
  if (!t) notFound();
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Parents", href: "/parents" }, { label: t.label }]} eyebrow={`For parents · ${t.label}`} title={t.title} intro={t.intro} updated={t.slug === "safety"} />
      <ParentTopicNav current={t.slug} />
      <Body slug={t.slug} />
      {ANSWERS[`/parents/${t.slug}`] && <QuickAnswers items={ANSWERS[`/parents/${t.slug}`]} eyebrow="Questions parents ask" className="bg-surface-2/60" />}
      <RelatedLinks links={PARENT_RELATED[t.slug]} />
      <ParentLinks />
    </>
  );
}

const PARENT_RELATED: Record<ParentTopicSlug, { href: string; label: string }[]> = {
  learning: [
    { href: "/programmes", label: "AI syllabus, Class 1 to 12" },
    { href: "/parents/screen-time", label: "Screen time in AI lessons" },
    { href: "/kids", label: "AI classes for kids, Classes 3–8" },
  ],
  safety: [
    { href: "/trust/children-privacy", label: "Children’s privacy notice" },
    { href: "/trust/ai-register", label: "AI feature register" },
    { href: "/kids", label: "AI classes for kids: the same safety rules" },
  ],
  "screen-time": [
    { href: "/kids/sampler", label: "Free unplugged AI activities" },
    { href: "/parents/guide/screens-for-making", label: "Creative screen time for kids" },
    { href: "/programmes/play", label: "AI for Class 1 and 2" },
  ],
  guides: [
    { href: "/kids/at-home", label: "AI activities for kids at home" },
    { href: "/parents/safety", label: "Is AI safe for children?" },
    { href: "/parents/faq", label: "AI in school FAQ for parents" },
  ],
  faq: [
    { href: "/parents/safety", label: "Is AI safe for children?" },
    { href: "/parents/guide/homework-and-honesty", label: "AI and homework" },
    { href: "/kids", label: "AI classes for kids, Classes 3–8" },
  ],
};

function Body({ slug }: { slug: ParentTopicSlug }) {
  switch (slug) {
    case "learning":
      return <Learning />;
    case "safety":
      return <Safety />;
    case "screen-time":
      return <ScreenTime />;
    case "guides":
      return <Guides />;
    case "faq":
      return <Faq />;
  }
}

function Learning() {
  return (
    <section className="pb-16 md:pb-24">
      <Container className="space-y-5">
        {PROGRAMMES.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <article className="card overflow-hidden md:grid md:grid-cols-[15rem_1fr]">
              <div className="p-6" style={{ background: p.tint }}>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-2">{p.classes}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{p.short}</h2>
                <p className="mt-2 text-sm text-ink-2">{p.aiUse}</p>
              </div>
              <div className="p-6">
                <ol className="grid gap-3 sm:grid-cols-3">
                  {p.terms.map((term) => (
                    <li key={term.term}>
                      <p className="font-mono text-xs uppercase tracking-widest text-muted">{term.term}</p>
                      <p className="mt-1 text-ink">{term.make}</p>
                    </li>
                  ))}
                </ol>
                <SmartLink href={`/programmes/${p.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
                  See a sample lesson for {p.classes} <ArrowRight className="size-4" aria-hidden />
                </SmartLink>
              </div>
            </article>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

function Safety() {
  return (
    <>
      <section className="pb-16 md:pb-24">
        <Container>
          <ol className="grid gap-3 md:grid-cols-2">
            {PLAIN_PROMISES.map((s, i) => (
              <li key={s.title} className="card flex gap-4 p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-display font-semibold text-on-accent">{i + 1}</span>
                <span>
                  <span className="block font-display font-semibold text-ink">{s.title}</span>
                  <span className="mt-1 block text-muted">{s.plain}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="bg-surface-2/60 py-16 md:py-24">
        <Container>
          <SectionHead eyebrow="How consent works" title="Nothing starts until you say yes." line="For Classes 6–12, when your school uses AI Flywheel Studio." />
          <ConsentFlow />
          <SafetyNote className="mt-6" />
          <p className="mt-4">
            <SmartLink href="/trust" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              Read the full policy in the Trust centre <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </p>
        </Container>
      </section>
    </>
  );
}

function ScreenTime() {
  return (
    <section className="pb-16 md:pb-24">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ul className="space-y-4">
          {SCREEN_BANDS.map((s) => (
            <li key={s.classes} className="card p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-display font-semibold text-ink">{s.classes}</span>
                <span className="text-sm text-muted">about {s.unplugged}% unplugged</span>
              </div>
              <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`About ${s.unplugged}% unplugged, ${100 - s.unplugged}% on screen`}>
                <span className="h-full bg-accent" style={{ width: `${s.unplugged}%` }} />
                <span className="h-full flex-1 bg-primary/50" />
              </div>
              <p className="mt-3 text-ink-2">{s.line}</p>
            </li>
          ))}
          <li className="flex flex-wrap gap-x-5 gap-y-1 px-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Scissors className="size-4" aria-hidden /> Unplugged
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Monitor className="size-4" aria-hidden /> On screen
            </span>
            <span>Illustrative proportions; your school’s timetable decides.</span>
          </li>
        </ul>
        <aside className="card h-fit bg-highlight/40 p-6">
          <p className="font-display text-lg font-semibold text-ink">At home this week</p>
          <ul className="mt-4 space-y-3">
            {HOME_TIPS.map((tip) => (
              <li key={tip} className="flex gap-3 text-ink-2">
                <Check className="mt-1 size-4 shrink-0 text-ink" aria-hidden /> {tip}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </section>
  );
}

const GUIDE_ICONS: Record<GuideSlug, typeof MessagesSquare> = {
  "talking-about-ai-at-dinner": MessagesSquare,
  "spotting-fakes": ScanEye,
  "homework-and-honesty": BookCheck,
  "screens-for-making": Monitor,
};

function Guides() {
  const voices = GUIDES.find((g) => g.slug === "voices");
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2">
          {PARENT_GUIDES.map((g, i) => {
            const I = GUIDE_ICONS[g.slug];
            return (
              <Reveal key={g.slug} delay={i * 0.05} className="h-full">
                <SmartLink href={`/parents/guide/${g.slug}`} className="card card-hover flex h-full flex-col p-6">
                  <I className="size-7 text-ink" aria-hidden />
                  <h2 className="mt-4 font-display text-xl font-semibold text-ink">{g.title}</h2>
                  <p className="mt-1 text-sm text-muted">{g.classes}</p>
                  <p className="mt-3 flex-1 text-ink-2">{g.line}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink">
                    Read and print <ArrowRight className="size-4" aria-hidden />
                  </span>
                </SmartLink>
              </Reveal>
            );
          })}
        </div>
        {voices && (
          <div className="card mt-4 flex flex-col gap-4 p-6 md:flex-row md:items-start">
            <PhoneCall className="size-7 shrink-0 text-ink" aria-hidden />
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                {voices.title} <span className="font-sans text-sm font-normal text-muted">· {voices.classes}</span>
              </h2>
              <ol className="mt-3 space-y-1.5">
                {voices.steps.map((s, n) => (
                  <li key={s} className="flex gap-3 text-ink-2">
                    <span className="font-mono text-sm text-muted">{n + 1}</span> {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
        <p className="mt-6 text-muted">Each guide fits on two printed pages, with Tamil headings. Use “Print or save as PDF” on any guide.</p>
      </Container>
    </section>
  );
}

function Faq() {
  return (
    <section className="pb-16 md:pb-24">
      <JsonLd data={faqLd(PARENT_FAQ)} />
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="sr-only">Questions parents ask</h2>
          <QAList items={PARENT_FAQ} />
        </div>
        <aside className="card h-fit p-6">
          <p className="font-display text-lg font-semibold text-ink">Still have a question?</p>
          <p className="mt-1 text-muted">A person replies, in Tamil or English.</p>
          <SmartLink href={WHATSAPP_URL} className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            Ask us on WhatsApp <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </aside>
      </Container>
    </section>
  );
}
