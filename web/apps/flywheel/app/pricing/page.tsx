import type { Metadata } from "next";
import { ANSWERS } from "@/lib/answers";
import { QuickAnswers } from "@/components/QuickAnswers";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { PROGRAMMES, STAGE_META, levelLabel } from "@/lib/programmes";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = pageMeta("/pricing");

const HELP = [
  { title: "EMI", text: "Pay in monthly instalments on any paid programme." },
  { title: "GST invoice", text: "Every payment comes with a GST invoice, in your name or your employer's." },
  { title: "Employer letter", text: "A ready-made letter asking your employer to sponsor you." },
  { title: "Scholarships", text: "Student and women-in-tech scholarships.", href: "/scholarships", proposed: true },
];

const individual = PROGRAMMES.filter((p) => p.format !== "For organisations");
const org = PROGRAMMES.filter((p) => p.format === "For organisations");

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="AI course fees in rupees."
        intro="AI course fees in India, from free to C5, with every band excluding GST. Ed 1.1 bands are set; Proposed bands will be tested before launch."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        updated
      >
        <Button href="/programmes/foundation">Start free</Button>
        <Button href="/scholarships" variant="secondary">
          Scholarships
        </Button>
      </PageHero>

      <Section eyebrow="For individuals" title="Price bands by programme.">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="hidden border-b border-line font-mono text-[0.7rem] uppercase tracking-wider text-muted md:table-header-group">
              <tr>
                <th className="px-4 py-3 font-medium">Programme</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Format</th>
                <th className="px-4 py-3 font-medium">Price band, excl. GST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {individual.map((p) => (
                <tr key={p.slug} className="grid gap-1 px-4 py-3 md:table-row md:p-0">
                  <td className="md:px-4 md:py-3">
                    <Link href={`/programmes/${p.slug}`} className="inline-flex min-h-6 items-center gap-2 font-medium text-ink hover:text-primary-hover">
                      <span className="size-2 shrink-0 rounded-full" style={{ background: STAGE_META[p.stage].color }} aria-hidden />
                      {p.title}
                    </Link>
                  </td>
                  <td className="text-ink-2 md:px-4 md:py-3">{levelLabel(p)}</td>
                  <td className="text-ink-2 md:px-4 md:py-3">
                    {p.formatDetail} · {p.hours}
                  </td>
                  <td className="md:px-4 md:py-3">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-ink">{p.price}</span>
                      {p.priceStatus !== "Free" && <StatusTag status={p.priceStatus} />}
                    </span>
                    {p.priceNote && <span className="block text-xs text-muted">{p.priceNote}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Paying for it" title="Ways to pay." className="border-t border-line">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HELP.map((h) => (
            <li key={h.title} className="rounded-[var(--radius-card)] bg-surface-2 p-6">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                {h.title} {h.proposed && <StatusTag status="Proposed" />}
              </h3>
              <p className="mt-2 text-sm text-ink-2">{h.text}</p>
              {h.href && (
                <Link href={h.href} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary-hover">
                  Details <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="For organisations" title="Seats, not courses." intro="Licences and leadership programmes for enterprises, GCCs and government." className="border-t border-line">
        <div className="grid gap-4 md:grid-cols-2">
          {org.map((p) => (
            <Link key={p.slug} href={`/programmes/${p.slug}`} className="card card-hover p-6">
              <p className="eyebrow">{p.formatDetail}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.focus}</p>
              <p className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink">{p.price}</span>
                {p.priceNote && <span className="text-sm text-muted">{p.priceNote.toLowerCase()}</span>}
                <StatusTag status={p.priceStatus === "Free" ? "Proposed" : p.priceStatus} />
              </p>
            </Link>
          ))}
        </div>
        <Button href="/business" variant="secondary" className="mt-6">
          AI Flywheel for Business <ArrowRight className="size-4" aria-hidden />
        </Button>
      </Section>

      <QuickAnswers {...ANSWERS["/pricing"]} />
    </>
  );
}
