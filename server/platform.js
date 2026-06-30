// ── Bridge to The AI Flywheel Platform (Phase 2) ────────────────────────────
// The marketing site authenticates against the platform (system of record) and hands the
// authenticated identity to the admin portal via a short-lived HMAC SSO token. The same HMAC
// signing is verified by the platform's /auth/exchange (see apps/api/app/security.py).
import crypto from 'node:crypto'

const PLATFORM_URL = process.env.PLATFORM_URL || 'http://localhost:8000'
const PORTAL_ORIGIN = process.env.PORTAL_ORIGIN || 'http://localhost:5180'
const SSO_SECRET = process.env.SSO_SHARED_SECRET || 'change-me-too'

const b64url = (buf) => Buffer.from(buf).toString('base64url')

export function mintSso(email, name, ttlSec = 120) {
  const now = Math.floor(Date.now() / 1000)
  const payload = { email, name, iat: now, exp: now + ttlSec, nonce: crypto.randomUUID().replace(/-/g, '') }
  const p = b64url(JSON.stringify(payload)) // sign over the base64url payload string
  const sig = b64url(crypto.createHmac('sha256', SSO_SECRET).update(p).digest())
  return `${p}.${sig}`
}

// Where the browser is sent after a successful site sign-in → the portal exchanges this for a session.
export function portalHandoff(email, name) {
  return `${PORTAL_ORIGIN}/auth/callback#sso=${encodeURIComponent(mintSso(email, name))}`
}

export async function platformPost(path, body, headers = {}) {
  try {
    const r = await fetch(`${PLATFORM_URL}${path}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body),
    })
    return { status: r.status, data: await r.json().catch(() => ({})) }
  } catch (e) {
    return { status: 502, data: { detail: 'Platform unavailable' } }
  }
}

export async function platformGet(path, token = '') {
  try {
    const r = await fetch(`${PLATFORM_URL}${path}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    return { status: r.status, data: await r.json().catch(() => ({})) }
  } catch {
    return { status: 502, data: {} }
  }
}

// Best-effort: push a completed diagnostic into the platform so it appears in the user's portal.
export async function syncDiagnostic(payload) {
  try {
    await fetch(`${PLATFORM_URL}/sync/diagnostic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Service-Key': SSO_SECRET },
      body: JSON.stringify(payload),
    })
  } catch { /* never block the user on the sync */ }
}

// Service-to-service ingest into the platform's operator/marketing layer (CRM, commerce, analytics,
// careers). Best-effort: the local store stays as a fallback so a user is never blocked.
export async function platformIngest(path, payload) {
  try {
    const r = await fetch(`${PLATFORM_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Service-Key': SSO_SECRET },
      body: JSON.stringify(payload),
    })
    return { status: r.status, data: await r.json().catch(() => ({})) }
  } catch {
    return { status: 502, data: {} }
  }
}
