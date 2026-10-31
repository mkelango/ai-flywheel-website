import { Button, Container } from "@flywheel/ui/components/primitives";
import { KidsArt } from "@/components/art";

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Page not found</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">Our robot took a wrong turn.</h1>
          <p className="mt-4 text-lg text-muted">Let’s give it better instructions.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/">Go home</Button>
            <Button href="/programmes" variant="secondary">
              See the curriculum
            </Button>
          </div>
        </div>
        <KidsArt className="mx-auto w-full max-w-sm" />
      </Container>
    </section>
  );
}
