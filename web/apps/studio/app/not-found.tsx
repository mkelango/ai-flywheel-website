import { ArrowRight } from "lucide-react";
import { Button } from "@flywheel/ui/components/primitives";
import { Glow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <Glow />
      <div className="container-site relative py-24 text-center md:py-36">
        <p className="font-mono text-sm text-agentic">run.error · 404 · route not found</p>
        <h1 className="text-gradient mt-5 font-display text-5xl font-semibold md:text-7xl">Nothing here yet.</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-muted">This page isn't part of the studio. Try one of these.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/">
            Studio home <ArrowRight className="size-4" />
          </Button>
          <Button href="/agentic" variant="secondary">
            Agentic Studio
          </Button>
        </div>
      </div>
    </section>
  );
}
