import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { KeyRound, MapPin, ScrollText, ShieldCheck } from "lucide-react";
import { Button, Section, StatusTag } from "@flywheel/ui/components/primitives";
import { PageHero } from "@/components/ui";
import { CardGrid } from "@/components/orgs/blocks";
import { PLATFORM_TOOLS, SECURITY_ITEMS } from "@/lib/orgs";

export const metadata: Metadata = pageMeta("/business/platform");

const ICONS = [KeyRound, MapPin, ScrollText, ShieldCheck];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform and toolkit"
        title="An AI governance and diagnostic toolkit: 28 tools."
        intro="The AI governance and diagnostic toolkit sold inside the workforce licence. Priced in rupees."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Platform" }]}
      >
        <Button href="/programmes/workforce-licence" size="lg">
          See the workforce licence
        </Button>
      </PageHero>

      <Section id="tools" eyebrow="What is inside" title="Five parts, one login.">
        <CardGrid items={PLATFORM_TOOLS} />
      </Section>

      <Section id="pricing" eyebrow="Pricing" title="No separate platform fee." className="border-t border-line">
        <div className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="font-display text-2xl font-semibold text-ink">₹3,000–12,000 per seat a year</p>
            <p className="mt-1 text-sm text-muted">Workforce licence, platform included. Excl. GST; invoices with GST.</p>
          </div>
          <StatusTag status="Ed 1.1" />
        </div>
      </Section>

      <section id="security" className="bg-inverse py-16 text-inverse-ink md:py-20">
        <div className="container-site">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-inverse-ink/60">Security and sovereignty</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Your data stays in India.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY_ITEMS.map((t, i) => {
              const Icon = ICONS[i];
              return (
                <li key={t} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-white/10 p-5">
                  <Icon className="size-5 text-highlight" aria-hidden /> {t}
                </li>
              );
            })}
          </ul>
          <Button href="/contact?tag=business" className="mt-8">
            Ask for the security pack
          </Button>
        </div>
      </section>
    </>
  );
}
