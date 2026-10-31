import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Languages, WifiOff, HandHeart, Mail, LayoutDashboard } from "lucide-react";
import { Button, Container, SmartLink, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero, SectionHead } from "@/components/blocks";
import { QuickAnswers, RelatedLinks } from "@/components/seo";
import { ANSWERS } from "@/lib/answers";
import { pageMeta } from "@/lib/seo";
import { MissionTopicNav, ProgressMock } from "@/components/families/mission";
import { MISSION_DELIVERY, MISSION_PARTNERS, MISSION_TOPICS, PATRON_OUTCOMES, PATRON_SPLIT, getMissionTopic, type MissionTopicSlug } from "@/lib/families";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return MISSION_TOPICS.map((t) => ({ topic: t.slug }));
}

const MISSION_RELATED: Record<MissionTopicSlug, { href: string; label: string }[]> = {
  schools: [
    { href: "/mission", label: "AI literacy for government schools" },
    { href: "/programmes/spark", label: "AI for Classes 3 to 5" },
    { href: "/teachers/flywheel", label: "AI teacher certification C1–C3" },
  ],
  progress: [
    { href: "/mission/csr", label: "CSR funding for AI education" },
    { href: "/teachers/flywheel", label: "Teacher levels C1–C3" },
    { href: "/partnership", label: "The termly school report" },
  ],
  csr: [
    { href: "/mission/progress", label: "District AI literacy progress" },
    { href: "/mission/schools", label: "AI curriculum in Tamil, offline" },
    { href: "/lab", label: "AI lab for schools in Tamil Nadu" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getMissionTopic((await params).topic);
  if (!t) return {};
  return pageMeta(`/mission/${t.slug}`, { title: `${t.label}: Mission & CSR`, description: t.description });
}

export default async function MissionTopicPage({ params }: Props) {
  const t = getMissionTopic((await params).topic);
  if (!t) notFound();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Mission & CSR", href: "/mission" }, { label: t.label }]}
        eyebrow={`Mission & CSR · ${t.label}`}
        title={
          <>
            {t.title}{" "}
            <span lang="ta" className="block pt-2 font-sans text-[0.62em] font-semibold text-ink-2">
              {t.ta}
            </span>
          </>
        }
        intro={t.intro}
      />
      <MissionTopicNav current={t.slug} />
      <Body slug={t.slug} />
      {ANSWERS[`/mission/${t.slug}`] && <QuickAnswers items={ANSWERS[`/mission/${t.slug}`]} eyebrow="Questions officers and funders ask" />}
      <RelatedLinks links={MISSION_RELATED[t.slug]} />
      <Contact />
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
            {MISSION_DELIVERY.map((d, i) => {
              const I = DELIVERY_ICONS[i];
              return (
                <Reveal key={d.title} delay={i * 0.06} className="card h-full p-6">
                  <I className="size-7 text-ink" aria-hidden />
                  <h2 className="mt-4 font-display text-lg font-semibold text-ink">{d.title}</h2>
                  <p lang="ta" className="text-sm font-medium text-ink-2">
                    {d.ta}
                  </p>
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
            eyebrow="Who we plan to work with"
            title={
              <>
                Through departments and programmes. <StatusTag status="Proposed" />
              </>
            }
            line="Delivery will be planned with the education system, district by district."
            className="!mb-0"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {MISSION_PARTNERS.map((p) => (
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
            <p className="font-display text-lg font-semibold text-ink">The public dashboard opens after the first district pilot.</p>
            <p className="mt-1 text-muted">Until then, here is the format it will use: teachers by level, and children’s work by stage. Not enrolment counts.</p>
          </div>
        </div>
        <ProgressMock />
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
              <h2 className="font-display text-2xl font-semibold text-ink">Where the money goes</h2>
              <StatusTag status="Illustrative scenario" />
            </div>
            <p className="mt-2 text-muted">Cost per school is published in each district plan. This is the typical split.</p>
            <ul className="mt-6 space-y-4">
              {PATRON_SPLIT.map((s) => (
                <li key={s.label}>
                  <div className="flex justify-between gap-4 text-ink">
                    <span>{s.label}</span>
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
            <h2 className="font-display text-2xl font-semibold text-ink">Outcomes, by level</h2>
            <p className="mt-2 text-muted">Reported every term for each school you fund, with children’s work by stage.</p>
            <ul className="mt-6 space-y-3">
              {PATRON_OUTCOMES.map((o) => (
                <li key={o.level} className="card p-5">
                  <p className="font-display font-semibold text-ink">{o.level}</p>
                  <p className="mt-1 text-muted">{o.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="bg-inverse py-14 text-inverse-ink md:py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Become a Mission Patron.</h2>
            <p lang="ta" className="mt-1 text-lg opacity-85">
              மிஷன் புரவலர் ஆகுங்கள்.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/demo?role=mission" variant="accent">
              Talk to the Mission team
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

function Contact() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="card flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Contact the Mission team{" "}
              <span lang="ta" className="block pt-1 font-sans text-base font-medium text-ink-2">
                மிஷன் குழுவைத் தொடர்பு கொள்ளுங்கள்
              </span>
            </h2>
            <p className="mt-2 text-muted">For district officers, education departments and CSR teams.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/demo?role=mission">
              <Mail className="size-4" aria-hidden /> Request a meeting
            </Button>
            <SmartLink href="/mission" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              Mission overview <ArrowRight className="size-4" aria-hidden />
            </SmartLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
