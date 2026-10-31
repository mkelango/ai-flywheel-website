import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { QuickAnswers } from "@/components/QuickAnswers";
import { ANSWERS } from "@/lib/answers";
import Link from "next/link";
import { Breadcrumbs } from "@flywheel/ui/components/primitives";
import { FlywheelCheck } from "@/components/FlywheelCheck";

export const metadata: Metadata = pageMeta("/check");

export default function CheckPage() {
  return (
    <>
    <section className="py-10 md:py-16">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Breadcrumbs base={SITE_URL} items={[{ label: "Home", href: "/" }, { label: "Flywheel Check" }]} />
          <p className="eyebrow mb-4 mt-8">Flywheel Check · for learners</p>
          <h1 className="font-display text-[2.4rem] font-semibold leading-[1.04] text-ink md:text-5xl">Free AI skills test: where do you stand?</h1>
          <p className="mt-4 text-lg text-muted">This free AI skills test takes eight questions. You get a suggested level for each stage, and one programme to start.</p>
          <p className="mt-6 text-sm text-muted">
            Checking a whole team?{" "}
            <Link href="/business#journey" className="font-medium text-ink underline decoration-line underline-offset-4">
              Book the organisation scan
            </Link>
          </p>
        </div>
        <div className="lg:col-span-8">
          <FlywheelCheck />
        </div>
      </div>
    </section>
    <QuickAnswers {...ANSWERS["/check"]} />
    </>
  );
}
