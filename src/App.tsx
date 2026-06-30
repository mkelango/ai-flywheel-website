import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home' // eager — the landing page
import { trackPageview } from './lib/analytics'

// Route-split: each page is its own chunk, loaded on demand.
const Framework = lazy(() => import('./pages/Framework'))
const Diagnostic = lazy(() => import('./pages/Diagnostic'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionActor = lazy(() => import('./pages/SolutionActor'))
const Platform = lazy(() => import('./pages/Platform'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Academy = lazy(() => import('./pages/Academy'))
const Resources = lazy(() => import('./pages/Resources'))
const About = lazy(() => import('./pages/About'))
const Account = lazy(() => import('./pages/Account'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Glossary = lazy(() => import('./pages/Glossary'))
const GlossaryTerm = lazy(() => import('./pages/GlossaryTerm'))
const Insights = lazy(() => import('./pages/Insights'))
const InsightPost = lazy(() => import('./pages/InsightPost'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const Toolkit = lazy(() => import('./pages/Toolkit'))
const Report = lazy(() => import('./pages/Report'))
const Book = lazy(() => import('./pages/Book'))
const Industry = lazy(() => import('./pages/Industry'))
const Certification = lazy(() => import('./pages/Certification'))
const Legal = lazy(() => import('./pages/Legal'))
const Contact = lazy(() => import('./pages/Contact'))
const Careers = lazy(() => import('./pages/Careers'))
const Newsroom = lazy(() => import('./pages/Newsroom'))

const NAV_OFFSET = 84 // fixed-nav height + breathing room

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Pages are lazy-loaded, so the target section may not be in the DOM yet on
      // a cross-route anchor navigation. Poll briefly until it appears, then scroll.
      let tries = 0
      let timer: number
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
        } else if (tries++ < 25) {
          timer = window.setTimeout(tryScroll, 60)
        }
      }
      tryScroll()
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  useEffect(() => { trackPageview() }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-gold" aria-label="Loading" />
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-ground">
        Skip to content
      </a>
      <ScrollManager />
      <Nav />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:actor" element={<SolutionActor />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/glossary/:slug" element={<GlossaryTerm />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightPost />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudy />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/report" element={<Report />} />
            <Route path="/book" element={<Book />} />
            <Route path="/industries/:slug" element={<Industry />} />
            <Route path="/certifications/:slug" element={<Certification />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/newsroom" element={<Newsroom />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/security" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/responsible-ai" element={<Legal />} />
            <Route path="/sovereignty" element={<Legal />} />
            <Route path="/signin" element={<Account mode="signin" />} />
            <Route path="/signup" element={<Account mode="signup" />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
