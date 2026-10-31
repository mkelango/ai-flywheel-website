import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Check, KeyRound, MapPin, ScrollText, ShieldCheck } from "lucide-react";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { siteHref } from "@flywheel/ui/sites";
import { PageHero } from "@/components/ui";
import { INDUSTRIES as INDUSTRY_LIST } from "@/lib/orgs";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/business");

const JOURNEY = [
  { n: "1", t: "Flywheel Check", d: "Capability scan: people by stage and level; your lowest CORE pillar.", href: "/check" },
  { n: "2", t: "Leadership", d: "The executive team at C1, and C4 in DRIVE and CORE.", href: "/programmes/leadership-programme" },
  { n: "3", t: "Workforce licence", d: "Courses, assessments, reporting. ₹3,000–12,000 per seat a year.", tag: "Ed 1.1" as const, href: "/programmes/workforce-licence" },
  { n: "4", t: "90-Day Flywheel Start", d: "A cohort on your own use case, gates G1 to G6.", href: "/business/enterprise" },
  { n: "5", t: "Studio seats", d: "Teams build on Agentic Studio.", href: siteHref("studio", "/") },
];

const INDUSTRY_LINKS = INDUSTRY_LIST.map((i) => ({ name: i.name, href: `/business/industries/${i.slug}` }));

const SECURITY = [
  { icon: KeyRound, t: "SSO" },
  { icon: MapPin, t: "India data residency" },
  { icon: ScrollText, t: "Audit log" },
  { icon: ShieldCheck, t: "DPDP processor terms" },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Flywheel for Business · Enterprises, GCCs, startups and MSMEs"
        title="An AI upskilling programme that turns training into results."
        intro="AI upskilling for companies: find where your people stand in each stage, move them up one level at a time, and ship a real use case while they learn."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business" }]}
        aside={
          <HeroPhoto
            photo="teamMeeting"
            alt="A team meeting around a table with laptops, the setting for an AI upskilling programme for companies"
            card={
              <>
                <FloatEyebrow>Five steps</FloatEyebrow>
                <ul className="mt-2 space-y-1.5 text-xs text-ink-2">
                  {JOURNEY.map((s, i) => (
                    <li key={s.n} className="flex items-center gap-2">
                      <span className={i < 2 ? "grid size-4 place-items-center rounded-full bg-agentic text-ink" : "size-4 rounded-full border border-line"} aria-hidden>
                        {i < 2 && <Check className="size-3" />}
                      </span>
                      {s.t}
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        }
      >
        <Button href="/business/check" size="lg">
          Book a Flywheel Check
        </Button>
        <Button href="/programmes/workforce-licence" variant="secondary" size="lg">
          See the workforce licence
        </Button>
      </PageHero>

      <Section id="journey" eyebrow="Enterprises and GCCs · five steps" title="Scan. Lead. License. Start. Build." className="scroll-mt-20">
        <ol className="grid gap-3 md:grid-cols-5">
          {JOURNEY.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.06} className="h-full">
                <Link href={s.href} className="card card-hover group flex h-full flex-col p-5">
                  <span className="grid size-9 place-items-center rounded-full bg-inverse font-mono text-sm text-inverse-ink">{s.n}</span>
                  <span className="mt-5 font-display text-lg font-semibold text-ink">{s.t}</span>
                  <span className="mt-1 text-sm text-muted">{s.d}</span>
                  <span className="mt-auto flex items-center justify-between pt-4">
                    {s.tag ? <StatusTag status={s.tag} /> : <span />}
                    <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-6 h-1.5 overflow-hidden rounded-pill bg-surface-2" aria-hidden>
          <div className="h-full w-full bg-linear-to-r from-foundation via-agentic to-physical" />
        </div>
      </Section>

      <Section id="startups" eyebrow="Startups and MSMEs" title="Where should AI go first in your business?" className="scroll-mt-20 border-t border-line">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Founder's Check", d: "A 60-minute review plus a 90-day plan." },
            { t: "Founder cohort", d: "One use case, run as a DRIVE turn with peers." },
            { t: "MSME robotics pilots", d: "With the Robotic Lab, simulation first." },
          ].map((c) => (
            <div key={c.t} className="card p-6">
              <h3 className="font-display text-xl font-semibold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm text-muted">{c.d}</p>
            </div>
          ))}
        </div>
        <Button href="/business/startups" variant="secondary" className="mt-6">
          Book a Founder&apos;s Check
        </Button>
      </Section>

      <section id="platform" className="scroll-mt-20 border-t border-line py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Platform and toolkit</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">28 tools, sold inside the licence.</h2>
            <p className="mt-4 text-muted">Diagnostic history, the Agent Operating Model builder, the CORE governance suite and a maturity benchmark. Priced in rupees.</p>
            <Link href="/business/platform" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
              See the AI governance and diagnostic toolkit <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div id="industries" className="scroll-mt-28">
            <p className="eyebrow mb-3">Industries (9)</p>
            <ul className="flex flex-wrap gap-2">
              {INDUSTRY_LINKS.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="inline-flex min-h-11 items-center rounded-pill border border-line bg-surface px-4 text-sm text-ink hover:border-ink/40">
                    AI in {i.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">
              Each names a first use case and a track.{" "}
              <Link href="/business/industries" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                AI use cases by industry
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="security" className="scroll-mt-20 bg-inverse py-16 text-inverse-ink md:py-20">
        <div className="container-site">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-inverse-ink/60">Security and sovereignty</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Your data stays in India.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY.map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-white/10 p-5">
                <Icon className="size-5 text-highlight" aria-hidden /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-inverse-ink/70">Invoices with GST. Reporting by level and stage, never enrolments.</p>
        </div>
      </section>

      <QuickAnswers {...ANSWERS["/business"]} />
    </>
  );
}
