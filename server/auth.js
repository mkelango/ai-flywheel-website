// ── JWT auth helpers + middleware ────────────────────────────────────────────
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

// Fail safe: in production, never fall back to a known/shared secret. If JWT_SECRET
// is unset we generate a strong random one per process (tokens won't survive a
// restart, but they can never be forged with a published default).
function resolveSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠  JWT_SECRET is not set — using a random per-process secret. Set JWT_SECRET in production to keep sessions stable.')
    return crypto.randomBytes(48).toString('hex')
  }
  return 'dev-only-insecure-secret-change-me'
}
const SECRET = resolveSecret()
const TTL = '30d'

export function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: TTL })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}

// Attaches req.user if a valid bearer token is present (optional auth).
export function withUser(req, _res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  req.user = token ? verifyToken(token) : null
  next()
}

// Requires a valid token, else 401.
export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Authentication required' })
  next()
}

export function publicUser(u) {
  return { id: u.id, email: u.email, name: u.name, createdAt: u.createdAt }
}
