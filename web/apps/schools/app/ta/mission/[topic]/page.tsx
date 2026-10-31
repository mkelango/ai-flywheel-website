import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Languages, WifiOff, HandHeart, LayoutDashboard } from "lucide-react";
import { Button, Container } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero, SectionHead } from "@/components/blocks";
import { TaStatus } from "@/components/ta/blocks";
import { TaMissionContact, TaMissionTopicNav, TaProgressMock } from "@/components/ta/mission";
import { MISSION_TOPICS, PATRON_OUTCOMES, PATRON_SPLIT, getMissionTopic, type MissionTopicSlug } from "@/lib/families";
import { taMeta } from "@/lib/ta";
import { TA_MISSION_DELIVERY, TA_MISSION_PARTNERS, TA_MISSION_TOPICS, TA_PATRON_OUTCOMES, TA_PATRON_SPLIT } from "@/lib/ta-content";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return MISSION_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getMissionTopic((await params).topic);
  if (!t) return {};
  const ta = TA_MISSION_TOPICS[t.slug];
  return taMeta(`/mission/${t.slug}`, `${ta.label}: மிஷன் & CSR`, ta.description);
}

export default async function TaMissionTopicPage({ params }: Props) {
  const t = getMissionTopic((await params).topic);
  if (!t) notFound();
  const ta = TA_MISSION_TOPICS[t.slug];
  return (
    <>
      <PageHero
        crumbs={[{ label: "முகப்பு", href: "/ta" }, { label: "மிஷன் & CSR", href: "/ta/mission" }, { label: ta.label }]}
        eyebrow={`மிஷன் & CSR · ${ta.label}`}
        title={
          <>
            {ta.title}{" "}
            <span lang="en-IN" className="block pt-2 font-sans text-[0.55em] font-semibold text-ink-2">
              {ta.en}
            </span>
          </>
        }
        intro={ta.intro}
      />
      <TaMissionTopicNav current={t.slug} />
      <Body slug={t.slug} />
      <TaMissionContact overview />
    </>
  );
}

function Body({ slug }: { slug: MissionTopicSlug }) {
  if (slug === "schools") return <Schools />;
  if (slug === "progress") return <Progress />;
  return <Csr />;
}

const DELIVERY_ICONS = [Languages, WifiOff, HandHeart];

function Schools() {
  return (
    <>
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {TA_MISSION_DELIVERY.map((d, i) => {
              const I = DELIVERY_ICONS[i];
              return (
                <Reveal key={d.title} delay={i * 0.06} className="card h-full p-6">
                  <I className="size-7 text-ink" aria-hidden />
                  <h2 className="mt-4 font-display text-lg font-semibold text-ink">{d.title}</h2>
                  <p className="mt-2 text-muted">{d.line}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
      <section className="bg-surface-2/60 py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow="யாருடன் இணைந்து பணியாற்றத் திட்டம்"
            title={
              <>
                துறைகள், திட்டங்கள் வழியாக. <TaStatus status="Proposed" />
              </>
            }
            line="மாவட்டம் மாவட்டமாக, கல்வித் துறையுடன் சேர்ந்து திட்டமிடப்படும்."
            className="!mb-0"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {TA_MISSION_PARTNERS.map((p) => (
              <li key={p} className="card p-5 font-medium text-ink">
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

function Progress() {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <div className="card mb-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <LayoutDashboard className="size-8 shrink-0 text-ink" aria-hidden />
          <div>
            <p className="font-display text-lg font-semibold text-ink">முதல் மாவட்ட முன்னோட்டத்துக்குப் பிறகு பொது டாஷ்போர்டு திறக்கும்.</p>
            <p className="mt-1 text-muted">அதுவரை, அது பயன்படுத்தும் வடிவம் இதோ: நிலை வாரியாக ஆசிரியர்கள், கட்டம் வாரியாகக் குழந்தைகளின் படைப்புகள். சேர்க்கை எண்ணிக்கை அல்ல.</p>
          </div>
        </div>
        <TaProgressMock />
      </Container>
    </section>
  );
}

function Csr() {
  return (
    <>
      <section className="pb-16 md:pb-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl font-semibold text-ink">பணம் எங்கே போகிறது</h2>
              <TaStatus status="Illustrative scenario" />
            </div>
            <p className="mt-2 text-muted">ஒரு பள்ளிக்கான செலவு ஒவ்வொரு மாவட்டத் திட்டத்திலும் வெளியிடப்படும். இது வழக்கமான பகிர்வு.</p>
            <ul className="mt-6 space-y-4">
              {PATRON_SPLIT.map((s, i) => (
                <li key={s.label}>
                  <div className="flex justify-between gap-4 text-ink">
                    <span>{TA_PATRON_SPLIT[i]}</span>
                    <span className="font-display font-semibold">{s.share}%</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`${s.share}%`}>
                    <span className="block h-full rounded-full bg-accent" style={{ width: `${s.share}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">விளைவுகள், நிலை வாரியாக</h2>
            <p className="mt-2 text-muted">நீங்கள் நிதி தரும் ஒவ்வொரு பள்ளிக்கும், ஒவ்வொரு பருவமும் அறிக்கை — குழந்தைகளின் படைப்புகள் கட்டம் வாரியாக.</p>
            <ul className="mt-6 space-y-3">
              {PATRON_OUTCOMES.map((o, i) => (
                <li key={o.level} className="card p-5">
                  <p className="font-display font-semibold text-ink">{o.level}</p>
                  <p className="mt-1 text-muted">{TA_PATRON_OUTCOMES[i]}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="bg-inverse py-14 text-inverse-ink md:py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">மிஷன் புரவலர் ஆகுங்கள்.</h2>
            <p lang="en-IN" className="mt-1 text-lg opacity-85">
              Become a Mission Patron.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/demo?role=mission" variant="accent">
              மிஷன் குழுவுடன் பேசுங்கள்
            </Button>
            <Button href={siteHref("flywheel", "/mission-2047")} variant="ghost" className="!text-inverse-ink hover:!bg-white/10">
              Mission 2047 <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
