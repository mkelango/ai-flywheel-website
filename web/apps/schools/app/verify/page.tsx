import type { Metadata } from "next";
import { Container } from "@flywheel/ui/components/primitives";
import { VerifyLookup } from "@flywheel/ui/components/VerifyLookup";
import { PageHero } from "@/components/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/verify");

const STEPS = [
  { t: "Adults and schools only", d: "Teacher credentials and the AI Flywheel School mark are public. A child’s progress never is." },
  { t: "Open Badges 3.0", d: "A signed, open standard any school, parent or employer can check." },
  { t: "Renewed every year", d: "Each record shows when it was issued and when it must be renewed." },
];

export default function VerifyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Verify a credential" }]}
        eyebrow="Open Badges 3.0"
        title="Verify a teacher AI certificate or school mark."
        intro="Verify a teacher AI certificate or a school’s mark with the ID printed on it. Open Badges 3.0."
      />
      <section className="pb-16 md:pb-24">
        <Container className="max-w-3xl">
          <VerifyLookup site="schools" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.t} className="card p-5">
                <h2 className="font-display font-semibold text-ink">{s.t}</h2>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
