import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button, Section } from "@flywheel/ui/components/primitives";
import { siteHref } from "@flywheel/ui/sites";
import { getProgramme } from "@/lib/programmes";
import { TRACK_LINKS, TRACK_PAGE_SLUGS, getTrack } from "@/lib/learn";
import { PageHero } from "@/components/ui";
import { SEO, pageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/QuickAnswers";
import { ProgrammeCard } from "@/components/ProgrammeCard";

type Props = { params: Promise<{ track: string }> };

export function generateStaticParams() {
  return TRACK_PAGE_SLUGS.map((track) => ({ track }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTrack((await params).track);
  if (!t) return {};
  return pageMeta(`/tracks/${t.slug}`, {
    title: `${t.name}: AI career track`,
    description: `Start, build, lead: the AI Flywheel path for ${t.name.toLowerCase()}. Prepares you for ${t.roleList.slice(0, 3).join(", ").toLowerCase()}.`,
  });
}

export default async function TrackPage({ params }: Props) {
  const t = getTrack((await params).track);
  if (!t) notFound();
  const keyword = SEO[`/tracks/${t.slug}`]?.primary ?? `AI career track for ${t.name.toLowerCase()}`;
  const steps = t.steps.map((s) => getProgramme(s.slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        eyebrow={`Career track · ${t.name}`}
        title={`${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}.`}
        intro="Where to start, what you'll build, and the roles it prepares you for."
        crumbs={[{ label: "Home", href: "/" }, { label: "Professionals", href: "/professionals" }, { label: "Tracks", href: "/professionals#tracks" }, { label: t.name }]}
      >
        <Button href={`/programmes/${t.steps[0].slug}`}>Start free</Button>
        {t.studioPath && (
          <Button href={siteHref("studio", t.studioPath)} variant="secondary">
            {t.studio} Studio <ArrowUpRight className="size-4" aria-hidden />
          </Button>
        )}
      </PageHero>

      <Section eyebrow="Your path" title="Start. Build. Lead." intro="Each step names the next. Prices in rupees, excluding GST.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => {
            const p = getProgramme(s.slug);
            if (!p) return null;
            return (
              <li key={s.slug + i} className="flex flex-col">
                <p className="eyebrow mb-2">
                  {String(i + 1).padStart(2, "0")} · {s.phase}
                </p>
                {s.note && <p className="mb-2 text-sm text-muted">{s.note}</p>}
                <div className="flex-1">
                  <ProgrammeCard p={p} />
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section eyebrow="Roles it prepares you for" title="Where it leads." intro={`From the playbooks: ${t.source}.`} className="border-t border-line">
        <ul className="flex flex-wrap gap-2">
          {t.roleList.map((r) => (
            <li key={r} className="rounded-pill border border-line bg-surface px-4 py-2 text-sm text-ink">
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Studio: <span className="text-ink">{t.studio}</span>
        </p>
      </Section>

      <QuickAnswers
        title="This track, answered."
        items={[
          {
            q: "Where should I start on this track?",
            a: `Start with the free AI Flywheel Foundation (C1): about 6 hours, in English or Tamil, with no card needed. Then take ${steps
              .slice(1)
              .map((p) => `${p.title}${p.level ? ` (${p.level})` : ""}`)
              .join(", then ")}. Each step names the next, and prices are in rupees, excluding GST.`,
          },
          {
            q: "Which roles does this track prepare me for?",
            a: `Roles such as ${t.roleList.join(", ").toLowerCase()}. The roles come from ${t.source}, and every step leaves an artefact for your portfolio and a level an employer can verify on a public page.`,
          },
        ]}
      />

      <Section eyebrow="Other tracks" title="Not quite you?" className="border-t border-line">
        <ul className="flex flex-wrap gap-2">
          {TRACK_LINKS.filter((x) => x.slug !== t.slug).map((x) => (
            <li key={x.slug}>
              <Link href={`/tracks/${x.slug}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-pill border border-line px-4 text-sm text-ink-2 hover:border-ink/40 hover:text-ink">
                {x.name} <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
