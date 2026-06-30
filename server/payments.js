// ───────────────────────────────────────────────────────────────────────────
// Payments. Real Stripe (redirect checkout) and Razorpay (order) integrations,
// selected by region/currency. If no keys are configured, returns a DEMO
// checkout so the full purchase flow is testable without charging anyone.
// Add STRIPE_SECRET_KEY / RAZORPAY_KEY_ID+RAZORPAY_KEY_SECRET to .env to go live.
// ───────────────────────────────────────────────────────────────────────────
import Stripe from 'stripe'
import Razorpay from 'razorpay'

const APP_URL = process.env.APP_URL || 'http://localhost:5174'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null

// amount is the major-unit price (e.g. 60 for $60 / 18000 for ₹18,000).
export async function createCheckout({ sku, name, amount, currency, orderId, email }) {
  const minor = Math.round(Number(amount) * 100)
  const cur = (currency || 'usd').toLowerCase()
  const isINR = cur === 'inr'

  // Razorpay for INR when configured
  if (isINR && razorpay) {
    const order = await razorpay.orders.create({ amount: minor, currency: 'INR', receipt: orderId, notes: { sku } })
    return { provider: 'razorpay', mode: 'order', orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, amount: minor, currency: 'INR', name }
  }

  // Stripe for everything else when configured
  if (stripe) {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: cur,
          product_data: { name: `The AI Flywheel — ${name}` },
          unit_amount: minor,
        },
        quantity: 1,
      }],
      customer_email: email || undefined,
      success_url: `${APP_URL}/checkout/success?order=${orderId}`,
      cancel_url: `${APP_URL}/pricing?canceled=1`,
      metadata: { sku, orderId },
    })
    return { provider: 'stripe', mode: 'redirect', url: session.url }
  }

  // Demo fallback — no keys configured
  return {
    provider: 'demo',
    mode: 'redirect',
    url: `${APP_URL}/checkout/success?order=${orderId}&demo=1`,
    note: 'Demo checkout — add STRIPE_SECRET_KEY or RAZORPAY_KEY_ID/SECRET to .env to take real payments.',
  }
}
