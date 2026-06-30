import { api } from './api'

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true)
    const s = document.createElement('script')
    s.src = src; s.onload = () => resolve(true); s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

// Starts checkout for an item. Handles Stripe redirect, Razorpay modal, and demo.
export async function startCheckout(item: { sku?: string; name: string; amount: number; currency: string; region: string }) {
  const r: any = await api.checkout(item)

  if (r.provider === 'razorpay' && r.mode === 'order') {
    const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!ok) throw new Error('Could not load the payment gateway.')
    return new Promise<void>((resolve, reject) => {
      const rzp = new (window as any).Razorpay({
        key: r.keyId, amount: r.amount, currency: r.currency, name: 'The AI Flywheel', description: r.name, order_id: r.orderId,
        handler: async () => { await api.confirmPayment(r.orderId); window.location.href = `/checkout/success?order=${r.orderId}`; resolve() },
        modal: { ondismiss: () => reject(new Error('Payment cancelled.')) },
        theme: { color: '#E6B968' },
      })
      rzp.open()
    })
  }

  // Stripe + demo both return a redirect URL
  if (r.url) { window.location.href = r.url; return }
  throw new Error('Could not start checkout.')
}
