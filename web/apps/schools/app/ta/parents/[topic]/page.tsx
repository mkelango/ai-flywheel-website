import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MessagesSquare, ScanEye, BookCheck, PhoneCall, Check, ShieldCheck } from "lucide-react";
import { Container, SmartLink } from "@flywheel/ui/components/primitives";
import { Accordion, Reveal } from "@flywheel/ui/components/interactive";
import { JsonLd, PageHero, SectionHead, faqLd } from "@/components/blocks";
import { TaConsentFlow } from "@/components/ta/blocks";
import { ScreenBars, TaParentLinks, TaParentTopicNav } from "@/components/ta/parents";
import { PROGRAMMES, WHATSAPP_URL } from "@/lib/data";
import { PARENT_TOPICS, SCREEN_BANDS, getParentTopic, type ParentTopicSlug } from "@/lib/families";
import { taPageMeta } from "@/lib/seo";
import { TA_FAQ, TA_GUIDES, TA_HOME_TIPS, TA_PARENT_TOPICS, TA_PLAIN_PROMISES, TA_PROGRAMMES, TA_SCREEN_LINES, taClasses } from "@/lib/ta-content";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PARENT_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getParentTopic((await params).topic);
  if (!t) return {};
  const ta = TA_PARENT_TOPICS[t.slug];
  return taPageMeta(`/parents/${t.slug}`, `${ta.label}: பெற்றோருக்கு`, ta.description);
}

export default async function TaParentTopicPage({ params }: Props) {
  const t = getParentTopic((await params).topic);
  if (!t) notFound();
  const ta = TA_PARENT_TOPICS[t.slug];
  return (
    <>
      <PageHero
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "பெற்றோர்", href: "/ta/parents" }, { label: ta.label }]}
        eyebrow={`பெற்றோருக்கு · ${ta.label}`}
        title={ta.title}
        intro={ta.intro}
      />
      <TaParentTopicNav current={t.slug} />
      <Body slug={t.slug} />
      <TaParentLinks />
    </>
  );
}

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
        {PROGRAMMES.map((p, i) => {
          const tp = TA_PROGRAMMES[p.slug];
          const cls = taClasses(p.classRange);
          return (
            <Reveal key={p.slug} delay={i * 0.05}>
              <article className="card overflow-hidden md:grid md:grid-cols-[15rem_1fr]">
                <div className="p-6" style={{ background: p.tint }}>
                  <p className="text-sm font-semibold text-ink-2">{cls}</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{p.short}</h2>
                  <p className="mt-2 text-sm text-ink-2">{tp.aiUse}</p>
                </div>
                <div className="p-6">
                  <ol className="grid gap-3 sm:grid-cols-3">
                    {tp.terms.map((make, n) => (
                      <li key={make}>
                        <p className="text-sm font-semibold text-muted">பருவம் {n + 1}</p>
                        <p className="mt-1 text-ink">{make}</p>
                      </li>
                    ))}
                  </ol>
                  <SmartLink href={`/ta/programmes/${p.slug}#sample`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
                    {cls}: ஒரு மாதிரிப் பாடம் <ArrowRight className="size-4" aria-hidden />
                  </SmartLink>
                </div>
              </article>
            </Reveal>
          );
        })}
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
            {TA_PLAIN_PROMISES.map((s, i) => (
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
          <SectionHead eyebrow="ஒப்புதல் எப்படி நடக்கிறது" title="நீங்கள் சம்மதம் சொல்லும் வரை எதுவும் தொடங்காது." line="வகுப்பு 6–12, உங்கள் பள்ளி AI Flywheel Studio பயன்படுத்தும்போது." />
          <TaConsentFlow />
          <p className="mt-6 inline-flex items-start gap-2 text-sm text-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden /> இந்தத் தளத்தின் படிவங்கள் பெற்றோரின் விவரங்களை மட்டுமே கேட்கின்றன. குழந்தையின் விவரங்கள், உங்கள் ஒப்புதலுக்குப் பிறகு, தளத்துக்குள் மட்டுமே பதிவாகும்.
          </p>
          <p className="mt-4">
            <SmartLink href="/trust" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              முழுக் கொள்கை: Trust centre (ஆங்கிலம்) <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </p>
        </Container>
      </section>
    </>
  );
}

function ScreenTime() {
  const bands = SCREEN_BANDS.map((s, i) => ({ ...s, classes: s.classes.replace("Classes", "வகுப்பு"), line: TA_SCREEN_LINES[i] }));
  return (
    <section className="pb-16 md:pb-24">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ScreenBars bands={bands} />
        <aside className="card h-fit bg-highlight/40 p-6">
          <p className="font-display text-lg font-semibold text-ink">இந்த வாரம் வீட்டில்</p>
          <ul className="mt-4 space-y-3">
            {TA_HOME_TIPS.map((tip) => (
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

const GUIDE_ICONS = { dinner: MessagesSquare, fakes: ScanEye, homework: BookCheck, voices: PhoneCall } as const;

function Guides() {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2">
          {TA_GUIDES.map((g, i) => {
            const I = GUIDE_ICONS[g.slug];
            return (
              <Reveal key={g.slug} delay={i * 0.05} className="card h-full p-6">
                <I className="size-7 text-ink" aria-hidden />
                <h2 className="mt-4 font-display text-xl font-semibold text-ink">{g.title}</h2>
                <p className="mt-1 text-sm text-muted">{g.classes}</p>
                <ol className="mt-4 space-y-2">
                  {g.steps.map((s, n) => (
                    <li key={s} className="flex gap-3 text-ink-2">
                      <span className="font-mono text-sm text-muted">{n + 1}</span> {s}
                    </li>
                  ))}
                </ol>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-muted">அச்சிடக்கூடிய தமிழ், ஆங்கிலப் பதிப்புகள் விரைவில்.</p>
      </Container>
    </section>
  );
}

function Faq() {
  return (
    <section className="pb-16 md:pb-24">
      <JsonLd data={faqLd(TA_FAQ)} />
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="sr-only">பெற்றோர் கேட்கும் கேள்விகள்</h2>
          <Accordion items={TA_FAQ} />
        </div>
        <aside className="card h-fit p-6">
          <p className="font-display text-lg font-semibold text-ink">இன்னும் கேள்வி இருக்கிறதா?</p>
          <p className="mt-1 text-muted">ஒரு மனிதர் பதில் தருவார், தமிழிலோ ஆங்கிலத்திலோ.</p>
          <SmartLink href={WHATSAPP_URL} className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
            WhatsApp-இல் கேளுங்கள் <ArrowRight className="size-4" aria-hidden />
          </SmartLink>
        </aside>
      </Container>
    </section>
  );
}
