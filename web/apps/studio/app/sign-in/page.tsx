import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@flywheel/ui/components/WheelMark";
import { SignInMock } from "@/components/Forms";
import { Glow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to AI Flywheel Studio. Studio opens in February 2027.",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <section className="relative overflow-hidden">
      <Glow colors={["#D98B0B", "#3B4BA8"]} />
      <div className="container-site relative flex justify-center py-16 md:py-24">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl border border-line p-6 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] md:p-9">
            <Logo descriptor="Studio" size={28} />
            <h1 className="mt-8 font-display text-3xl font-semibold text-ink">Sign in</h1>
            <p className="mt-2 text-sm text-muted">One login for aiflywheel.in, Schools and Studio.</p>
            <div className="mt-8">
              <SignInMock />
            </div>
          </div>
          <p className="mt-6 rounded-xl border border-line bg-surface/70 px-4 py-3 text-center text-sm text-ink-2">
            <span className="font-mono text-xs uppercase tracking-wider text-agentic">Studio opens Feb 2027.</span> This sign-in is a preview.{" "}
            <Link href="/early-access" className="text-ink underline underline-offset-4">
              Join early access
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
