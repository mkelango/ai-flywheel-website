import { Sparkles } from 'lucide-react'
import { Btn, Reveal } from '../lib/primitives'

export default function CTABand() {
  return (
    <section className="dark band-obsidian relative overflow-hidden border-y border-hairline/60 py-20 sm:py-24">
      <div className="grid-texture absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/60" />The one action<span className="h-px w-8 bg-gold/60" />
          </p>
          <h2 className="h-display mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
            Find your blue dot in <span className="text-shimmer">12 minutes</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            No signup to begin. Answer a short, honest assessment and get a scored result, a roadmap, and the single next step that matters for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> Run the free diagnostic</Btn>
            <Btn to="/framework" variant="ghost">Explore the framework</Btn>
          </div>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-faint">
            Free · ungated to start · no ads · your data stays yours
          </p>
        </Reveal>
      </div>
    </section>
  )
}
