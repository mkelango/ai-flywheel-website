import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@flywheel/ui/components/primitives";
import { VerifyLookup } from "@flywheel/ui/components/VerifyLookup";

export const metadata: Metadata = pageMeta("/verify");

const STEPS = [
  { t: "Level and stage", d: "Each badge shows one level in one stage, e.g. Builder (C3) in Agentic." },
  { t: "Evidence behind it", d: "Gate records, a portfolio and a check taken without AI." },
  { t: "Recertified yearly", d: "Tools expire. A badge shows when it was last renewed." },
];

export default function VerifyPage() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-site max-w-3xl">
        <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Verify a credential" }]} />
        <p className="eyebrow mb-4 mt-8">Open Badges 3.0 · works on all three sites</p>
        <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-5xl">Verify an AI Flywheel credential.</h1>
        <p className="mt-4 text-lg text-muted">Verify an AI Flywheel certificate: enter the ID printed on the certificate or badge.</p>
        <div className="mt-8 [&_p_button]:inline-flex [&_p_button]:min-h-6 [&_p_button]:items-center">
          <VerifyLookup site="flywheel" />
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.t} className="border-t-2 border-ink pt-4">
              <h2 className="font-semibold text-ink">{s.t}</h2>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
