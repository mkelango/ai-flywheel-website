import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Award, BarChart3, BookMarked, FlaskConical, Handshake, Trophy } from "lucide-react";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { Reveal } from "@flywheel/ui/components/interactive";
import { PageHero } from "@/components/ui";
import { FloatEyebrow, HeroPhoto } from "@/components/photos";

export const metadata: Metadata = pageMeta("/higher-education");

const OFFERS = [
  { icon: Handshake, href: "/campus-partnership", title: "Campus Partnership", text: "One annual MoU: courses, faculty, labs, hackathons and reporting. Associate, Partner or Centre of Excellence.", tag: "Proposed" as const },
  { icon: BookMarked, href: "/credit-courses", title: "Credit courses and minors", text: "Semester courses mapped to C2 and C3, with syllabus, assessments and teaching kits." },
  { icon: Award, href: "/faculty", title: "Faculty Flywheel", text: "Faculty development to C1, C2 and C3. Builders can teach the credit courses." },
  { icon: FlaskConical, href: "/campus-labs", title: "Campus Labs", text: "Four labs, each running its studio. Set-up quoted per campus." },
  { icon: Trophy, href: "/challenges", title: "Hackathons and challenges", text: "Inter-college challenges run as one DRIVE turn, with finals at the Inevitable Summit in February." },
  { icon: BarChart3, title: "Outcome reporting", text: "Students and faculty by level and stage, for accreditation and placement. Never enrolments." },
];

const LABS = [
  { href: "/campus-labs/agentic", lab: "Agentic Lab", color: "#D98B0B", runs: "Agentic Studio · Feb 2027", best: "CS and IT, MCA, management", reach: "C3 Builder in Agentic (ADLC)", book: "Agentic Studio Playbook" },
  { href: "/campus-labs/model", lab: "Model Lab", color: "#3B4BA8", runs: "Model Studio · FY28", best: "Data science and AI; Indian-language evaluation sets", reach: "C3 Builder in Foundation (MDLC)", book: "Foundation Studio Playbook" },
  { href: "/campus-labs/generative", lab: "Generative Lab", color: "#B8306F", runs: "Generative Studio · FY28", best: "Media, design, journalism, commerce, marketing", reach: "C3 Builder in Generative (GDLC)", book: "Generative Studio Playbook" },
  { href: "/campus-labs/robotic", lab: "Robotic Lab", color: "#13827F", runs: "Robotic Studio + hardware · FY28", best: "Mechanical, ECE, mechatronics; ITIs and polytechnics", reach: "C3 Builder in Physical (RDLC)", book: "Robotic Studio Playbook" },
];

const STEPS = [
  { n: "01", t: "Consult", d: "A campus consultation with leadership and IQAC." },
  { n: "02", t: "Pilot one department", d: "One credit course and one faculty batch." },
  { n: "03", t: "Sign the MoU", d: "Courses, faculty, challenges and reporting." },
  { n: "04", t: "Open the labs", d: "Campus Labs set up, each running its studio." },
];

export default function HigherEducationPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Flywheel for Higher Education"
        title="AI programmes for colleges: graduates who ship, not just prompt."
        intro="AI programmes for universities, engineering, arts and science colleges, polytechnics and ITIs."
        crumbs={[{ label: "Home", href: "/" }, { label: "Higher Education" }]}
        aside={
          <HeroPhoto
            photo="classroom"
            alt="College students writing in a bright classroom, where AI programmes for colleges begin: one department first"
            card={
              <>
                <div className="flex items-center justify-between gap-2">
                  <FloatEyebrow>One MoU · three tiers</FloatEyebrow>
                  <StatusTag status="Proposed" />
                </div>
                <ul className="mt-2 space-y-1 text-xs text-ink-2">
                  <li>Associate</li>
                  <li>Partner</li>
                  <li>Centre of Excellence</li>
                </ul>
              </>
            }
          />
        }
      >
        <Button href="/contact?tag=higher-ed" size="lg">
          Book a campus consultation
        </Button>
        <Button href="/contact?tag=higher-ed" variant="secondary" size="lg">
          Request the partnership guide
        </Button>
      </PageHero>

      <Section id="offers" eyebrow="Six offers, one partnership" title="Everything a campus needs, under one MoU." className="scroll-mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map(({ icon: Icon, title, text, tag, href }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.05}>
              <div className="card h-full p-6">
                <div className="flex items-center justify-between">
                  <Icon className="size-6 text-ink" aria-hidden />
                  {tag && <StatusTag status={tag} />}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {href ? (
                    <Link href={href} className="hover:text-primary-hover">
                      {title} →
                    </Link>
                  ) : (
                    title
                  )}
                </h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="labs" eyebrow="Campus Labs compared" title="A lab is a room. It runs a studio." className="scroll-mt-20 border-t border-line">
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line font-mono text-[0.7rem] uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Lab</th>
                <th className="px-5 py-3 font-medium">Runs</th>
                <th className="px-5 py-3 font-medium">Best for</th>
                <th className="px-5 py-3 font-medium">Students reach</th>
                <th className="px-5 py-3 font-medium">Built from</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {LABS.map((l) => (
                <tr key={l.lab}>
                  <th scope="row" className="px-5 py-4 font-semibold text-ink">
                    <Link href={l.href} className="inline-flex min-h-11 items-center gap-2 hover:text-primary-hover">
                      <span className="size-2.5 rounded-full" style={{ background: l.color }} /> {l.lab}
                    </Link>
                  </th>
                  <td className="px-5 py-4 text-ink-2">{l.runs}</td>
                  <td className="px-5 py-4 text-ink-2">{l.best}</td>
                  <td className="px-5 py-4 font-medium text-ink">{l.reach}</td>
                  <td className="px-5 py-4 text-muted">{l.book}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="steps" eyebrow="How a partnership runs" title="Start with one department." className="scroll-mt-20 border-t border-line">
        <ol className="grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.06} className="relative h-full border-t-2 border-ink pt-5">
                <span className="font-mono text-sm text-muted">{s.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.t}</h3>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-inverse p-8 text-inverse-ink md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-display text-2xl font-semibold md:text-3xl">Partner campuses are listed only with written permission.</p>
            <p className="mt-2 text-inverse-ink/70">Students get their own path: start free, build a portfolio, choose a track.</p>
          </div>
          <Button href="/contact?tag=higher-ed" size="lg">
            Book a consultation
          </Button>
        </div>
      </Section>

      <QuickAnswers {...ANSWERS["/higher-education"]} />
    </>
  );
}
