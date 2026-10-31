import Link from "next/link";
import { Button } from "@flywheel/ui/components/primitives";
import { WheelMark } from "@flywheel/ui/components/WheelMark";

export default function NotFound() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-site max-w-2xl text-center">
        <div className="mx-auto w-fit opacity-90">
          <WheelMark size={96} animate title="AI Flywheel" />
        </div>
        <p className="eyebrow mt-8">404 · Page not found</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">This turn of the wheel leads nowhere.</h1>
        <p className="mt-4 text-lg text-muted">The page may have moved in the new site. Try one of these.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/programmes">Browse programmes</Button>
          <Button href="/" variant="secondary">
            Home
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted">
          Looking for a credential?{" "}
          <Link href="/verify" className="font-medium text-ink underline underline-offset-4">
            Verify it here
          </Link>
        </p>
      </div>
    </section>
  );
}
