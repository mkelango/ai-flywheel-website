import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Flywheel from '../components/Flywheel'
import { Btn } from '../lib/primitives'
import { Seo } from '../lib/seo'

export default function NotFound() {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden pt-28 pb-20">
      <Seo title="Page not found" noindex />
      <div className="grid-texture absolute inset-0 opacity-[0.25]" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Error 404 · off the wheel</p>
          <h1 className="font-display text-5xl font-bold tracking-tightest text-cloud sm:text-6xl">This page didn't compound.</h1>
          <p className="mt-5 max-w-md text-lg text-muted">The page you're looking for isn't here — but every good flywheel finds its way back to center. Let's get you to the next turn.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> Run the free diagnostic</Btn>
            <Btn to="/" variant="ghost">Back to home</Btn>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
            <Link to="/framework" className="link-underline hover:text-gold">Framework</Link>
            <Link to="/solutions" className="link-underline hover:text-gold">Solutions</Link>
            <Link to="/platform" className="link-underline hover:text-gold">Platform</Link>
            <Link to="/academy" className="link-underline hover:text-gold">Academy</Link>
            <Link to="/resources" className="link-underline hover:text-gold">Resources</Link>
          </div>
        </div>
        <div className="hidden lg:block"><Flywheel size={420} className="mx-auto" /></div>
      </div>
    </section>
  )
}
