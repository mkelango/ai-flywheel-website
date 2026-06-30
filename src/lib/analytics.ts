// First-party, privacy-respecting analytics.
// - No third-party trackers, no ad pixels, no fingerprinting (ad-free, trust-first brand).
// - Honours Do-Not-Track and Global Privacy Control — fully no-ops if set.
// - A random anon id (no PII) only when tracking is allowed.
const BASE = (import.meta.env.VITE_API_URL as string) || '/api'
const KEY = 'aif_anon'

function trackingAllowed(): boolean {
  if (typeof navigator === 'undefined') return false
  const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack
  if (dnt === '1' || dnt === 'yes') return false
  if ((navigator as any).globalPrivacyControl) return false
  return true
}

function anonId(): string | null {
  if (!trackingAllowed()) return null
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = 'a_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(KEY, id)
  }
  return id
}

export function track(event: string, props: Record<string, any> = {}) {
  if (!trackingAllowed()) return
  const body = JSON.stringify({ event, path: location.pathname, props, anonId: anonId() })
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${BASE}/track`, new Blob([body], { type: 'application/json' }))
    } else {
      fetch(`${BASE}/track`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
    }
  } catch { /* never throw from analytics */ }
}

export const trackPageview = () => track('pageview', { ref: document.referrer || undefined })
