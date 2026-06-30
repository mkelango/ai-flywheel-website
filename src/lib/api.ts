// ── Front-end API client ─────────────────────────────────────────────────────
const BASE = (import.meta.env.VITE_API_URL as string) || '/api'
const TOKEN_KEY = 'aif_token'

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

async function request<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = tokenStore.get()
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  })
  let data: any = null
  try { data = await res.json() } catch { /* no body */ }
  if (!res.ok || (data && data.ok === false)) {
    throw new Error((data && data.error) || `Request failed (${res.status})`)
  }
  return data as T
}

export const api = {
  health: () => request('/health'),
  newsletter: (email: string, source = 'site') => request('/newsletter', { method: 'POST', body: JSON.stringify({ email, source }) }),
  diagnostic: (payload: { answers: Record<string, number>; score: number; level: string; headline: string; email?: string }) =>
    request('/diagnostic', { method: 'POST', body: JSON.stringify(payload) }),
  verifyCredential: (id: string) => request(`/credentials/${encodeURIComponent(id)}`),
  content: (type: string) => request(`/content?type=${encodeURIComponent(type)}`),
  contentItem: (type: string, slug: string) => request(`/content/${encodeURIComponent(type)}/${encodeURIComponent(slug)}`),
  contact: (payload: { name?: string; email: string; org?: string; message?: string; type?: string }) =>
    request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  signup: (payload: { name: string; email: string; password: string; consent?: boolean }) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/auth/me'),
  checkout: (payload: { sku?: string; name: string; amount: number; currency: string; region: string }) =>
    request('/checkout', { method: 'POST', body: JSON.stringify(payload) }),
  confirmPayment: (orderId: string) => request('/payments/confirm', { method: 'POST', body: JSON.stringify({ orderId }) }),
}
