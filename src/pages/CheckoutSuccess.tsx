import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Check, Loader2, Sparkles } from 'lucide-react'
import { api } from '../lib/api'
import { Btn } from '../lib/primitives'
import { Seo } from '../lib/seo'

export default function CheckoutSuccess() {
  const [params] = useSearchParams()
  const orderId = params.get('order')
  const demo = params.get('demo') === '1'
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (orderId) api.confirmPayment(orderId).then(() => setConfirmed(true)).catch(() => setConfirmed(true))
    else setConfirmed(true)
  }, [orderId])

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden pt-28 pb-24">
      <Seo title="Order confirmed" noindex />
      <div className="grid-texture absolute inset-0 opacity-[0.25]" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-core/10 blur-[140px]" />
      <div className="container-x relative max-w-lg text-center">
        <div className="card p-9">
          {!confirmed ? (
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-gold" />
          ) : (
            <>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-core/15"><Check className="h-8 w-8 text-core" /></span>
              <h1 className="mt-6 font-display text-3xl font-bold text-cloud">You're in.</h1>
              <p className="mt-3 text-[15px] text-muted">
                {demo
                  ? 'This was a demo checkout — no charge was made. Add Stripe or Razorpay keys to take real payments.'
                  : 'Payment confirmed. Your receipt and access details are on their way by email.'}
              </p>
              {orderId && <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-faint">Order {orderId}</p>}
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Btn to="/diagnostic"><Sparkles className="h-4 w-4" /> Start your first turn</Btn>
                <Btn to="/" variant="ghost">Back to home</Btn>
              </div>
            </>
          )}
        </div>
        <p className="mt-6 text-[12px] text-faint">Need help? <Link to="/contact" className="text-gold hover:text-gold-light">Contact us</Link>.</p>
      </div>
    </section>
  )
}
