import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { db, seed } from './db.js'
import { sendMail, diagnosticReportEmail, welcomeEmail } from './mailer.js'
import { signToken, withUser, requireAuth, publicUser } from './auth.js'
import { createCheckout } from './payments.js'
import { platformPost, platformGet, portalHandoff, syncDiagnostic, platformIngest } from './platform.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// API_PORT lets the API run alongside Vite in dev (the dev harness sets PORT for Vite).
// In single-process production, fall back to PORT.
const PORT = Number(process.env.API_PORT || process.env.PORT || 8787)
const app = express()

// CORS: open in dev; in production restrict to configured origins (CORS_ORIGIN,
// comma-separated) or the app's own origin. The SPA is served same-origin in prod,
// so this only gates cross-site API callers.
const corsOrigins = (process.env.CORS_ORIGIN || process.env.APP_URL || '').split(',').map((s) => s.trim()).filter(Boolean)
app.use(cors(
  process.env.NODE_ENV === 'production' && corsOrigins.length
    ? { origin: corsOrigins }
    : {} // reflect request origin (open) in dev
))
app.use(express.json({ limit: '256kb' }))
app.use(withUser)

const isEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
const ok = (res, data) => res.json({ ok: true, ...data })
const bad = (res, msg, code = 400) => res.status(code).json({ ok: false, error: msg })

seed()

// ── Health ───────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => ok(res, {
  service: 'ai-flywheel-api',
  time: new Date().toISOString(),
  email: process.env.SMTP_HOST ? 'smtp' : 'outbox',
  payments: process.env.STRIPE_SECRET_KEY ? 'stripe' : process.env.RAZORPAY_KEY_ID ? 'razorpay' : 'demo',
}))

// ── Newsletter ─────────────────────────────────────────────────────────────--
app.post('/api/newsletter', async (req, res) => {
  const { email, source } = req.body || {}
  if (!isEmail(email)) return bad(res, 'A valid email is required.')
  const existing = db.findOne('newsletter', (r) => r.email === email.toLowerCase())
  if (!existing) {
    db.insert('newsletter', { email: email.toLowerCase(), source: source || 'site' })
    await sendMail(welcomeEmail({ email }))
  }
  platformIngest('/ingest/subscribe', { email: email.toLowerCase(), source: source || 'site' }) // → portal CRM
  ok(res, { subscribed: true, alreadySubscribed: !!existing })
})

// ── Diagnostic result: persist + email report ─────────────────────────────────
app.post('/api/diagnostic', async (req, res) => {
  const { answers, score, level, headline, email } = req.body || {}
  if (typeof score !== 'number') return bad(res, 'A score is required.')
  const row = db.insert('diagnostics', {
    userId: req.user?.sub || null,
    email: isEmail(email) ? email.toLowerCase() : null,
    answers: answers || {}, score, level: level || null, headline: headline || null,
  })
  if (isEmail(email)) {
    await sendMail(diagnosticReportEmail({ email, score, level, headline }))
    // auto-subscribe diagnostic completers (governed, value-first lead capture)
    if (!db.findOne('newsletter', (r) => r.email === email.toLowerCase())) {
      db.insert('newsletter', { email: email.toLowerCase(), source: 'diagnostic' })
    }
    // single account: push the diagnostic into the platform so it's already in their portal
    syncDiagnostic({ email: email.toLowerCase(), score, level, headline, answers: answers || {} })
  }
  ok(res, { id: row.id, emailed: isEmail(email) })
})

// ── Analytics (first-party, privacy-respecting — no PII, no third parties) ─────
app.post('/api/track', (req, res) => {
  const { event, path: p, props, anonId } = req.body || {}
  if (!event || typeof event !== 'string') return bad(res, 'event required')
  db.insert('events', { event: event.slice(0, 64), path: (p || '').slice(0, 200), props: props || {}, anonId: anonId || null })
  platformIngest('/ingest/track', { event: event.slice(0, 64), path: (p || '').slice(0, 200), props: props || {}, anon_id: anonId || null }) // → portal Marketing funnel
  res.status(204).end()
})

// ── Verify a credential ─────────────────────────────────────────────────────
// The PLATFORM is the sovereign system of record for credentials. We proxy the verify to it so
// badges issued in the Academy verify end-to-end; we fall back to the local demo store if the
// platform is unreachable.
app.get('/api/credentials/:id', async (req, res) => {
  const id = String(req.params.id).trim()
  const { status, data } = await platformGet(`/credentials/${encodeURIComponent(id)}`)
  if (status < 400 && data && typeof data.found === 'boolean') {
    return ok(res, data.found ? { found: true, credential: data.credential } : { found: false })
  }
  // fallback: local demo credentials
  const cred = db.findOne('credentials', (c) => c.id.toLowerCase() === id.toLowerCase())
  if (!cred) return ok(res, { found: false })
  ok(res, { found: true, credential: cred })
})

// ── Headless content from the platform CMS ──────────────────────────────────
// The site renders its built-in content PLUS anything published in the portal CMS. New content added
// in the admin portal appears here automatically. Falls back to empty if the platform is unreachable.
app.get('/api/content', async (req, res) => {
  const type = String(req.query.type || '').trim()
  const { status, data } = await platformGet(`/content${type ? `?type=${encodeURIComponent(type)}` : ''}`)
  ok(res, { items: status < 400 && Array.isArray(data?.items) ? data.items : [] })
})
app.get('/api/content/:type/:slug', async (req, res) => {
  const { type, slug } = req.params
  const { status, data } = await platformGet(`/content/${encodeURIComponent(type)}/${encodeURIComponent(slug)}`)
  if (status < 400 && data) return ok(res, data)
  ok(res, { found: false })
})

// ── Auth — the PLATFORM is the system of record; we proxy to it, then hand off to the portal ──
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, consent } = req.body || {}
  if (!name || name.trim().length < 2) return bad(res, 'Please enter your name.')
  if (!isEmail(email)) return bad(res, 'A valid email is required.')
  if (!password || password.length < 8) return bad(res, 'Password must be at least 8 characters.')
  const { status, data } = await platformPost('/auth/signup', {
    name: name.trim(), email, password, consent: !!consent, org_name: `${name.trim()}'s workspace`,
  })
  if (status >= 400) return res.status(status === 429 ? 429 : status).json({ ok: false, error: data.detail || 'Signup failed.' })
  ok(res, { token: data.access_token, refresh: data.refresh_token, user: data.user, portalHandoff: portalHandoff(email, name.trim()) })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!isEmail(email) || !password) return bad(res, 'Email and password are required.')
  const { status, data } = await platformPost('/auth/login', { email, password })
  if (status >= 400) return res.status(status).json({ ok: false, error: data.detail || 'Invalid email or password.' })
  ok(res, { token: data.access_token, refresh: data.refresh_token, user: data.user, portalHandoff: portalHandoff(email, data.user?.name || '') })
})

app.get('/api/auth/me', async (req, res) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const { status, data } = await platformGet('/auth/me', token)
  if (status >= 400) return bad(res, 'Not authenticated.', 401)
  ok(res, { user: data.user })
})

// ── Contact / lead capture (advisory, programs, enterprise) ────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, org, message, type } = req.body || {}
  if (!isEmail(email)) return bad(res, 'A valid email is required.')
  const row = db.insert('leads', { name: name || '', email: email.toLowerCase(), org: org || '', message: message || '', type: type || 'general' })
  platformIngest('/ingest/lead', { kind: type || 'contact', name: name || '', email: email.toLowerCase(), org_name: org || '', message: message || '', source: 'website' }) // → portal CRM
  ok(res, { id: row.id })
})

// ── Checkout ───────────────────────────────────────────────────────────────--
app.post('/api/checkout', async (req, res) => {
  const { sku, name, amount, currency, region } = req.body || {}
  if (!name || typeof amount !== 'number') return bad(res, 'A valid item and amount are required.')
  const order = db.insert('orders', {
    userId: req.user?.sub || null,
    sku: sku || name, name, amount, currency: currency || 'usd', region: region || 'global', status: 'pending',
  })
  try {
    const checkout = await createCheckout({ sku: order.sku, name, amount, currency, orderId: order.id, email: req.user?.email })
    // mirror the order into the platform (portal Commerce); store its id for confirm
    const ing = await platformIngest('/ingest/order', { sku: order.sku, name, email: req.user?.email || '', amount, currency: (currency || 'usd').toUpperCase(), provider: checkout.provider })
    db.update('orders', order.id, { provider: checkout.provider, platformOrderId: ing.data?.order_id || null })
    ok(res, { orderId: order.id, ...checkout })
  } catch (e) {
    console.error('checkout error', e)
    bad(res, 'Could not start checkout. Please try again.', 502)
  }
})

// Confirm (demo + razorpay client-side success)
app.post('/api/payments/confirm', (req, res) => {
  const { orderId } = req.body || {}
  const order = db.findOne('orders', (o) => o.id === orderId)
  if (!order) return bad(res, 'Order not found.', 404)
  db.update('orders', orderId, { status: 'paid' })
  if (order.platformOrderId) platformIngest('/ingest/order/confirm', { order_id: order.platformOrderId }) // → portal Commerce
  ok(res, { status: 'paid' })
})

// ── Static front-end + SPA fallback (production single-process deploy) ──────────
const DIST = path.join(__dirname, '..', 'dist')
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) return next()
    res.sendFile(path.join(DIST, 'index.html'))
  })
}

app.use('/api', (_req, res) => bad(res, 'Not found.', 404))

app.listen(PORT, () => {
  console.log(`\n  ⚙  AI Flywheel API → http://localhost:${PORT}`)
  console.log(`     email: ${process.env.SMTP_HOST ? 'SMTP' : 'outbox (server/data/outbox)'}  ·  payments: ${process.env.STRIPE_SECRET_KEY ? 'Stripe' : process.env.RAZORPAY_KEY_ID ? 'Razorpay' : 'demo'}\n`)
})
