import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api, tokenStore } from './api'

export interface User { id: string; email: string; name: string; createdAt?: string }

interface AuthCtx {
  user: User | null
  loading: boolean
  // return the portal hand-off URL so the caller can send the user straight into the admin portal
  signup: (name: string, email: string, password: string, consent: boolean) => Promise<string | undefined>
  login: (email: string, password: string) => Promise<string | undefined>
  logout: () => void
}

const Ctx = createContext<AuthCtx>(null as any)
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tokenStore.get()) { setLoading(false); return }
    api.me()
      .then((r: any) => setUser(r.user))
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false))
  }, [])

  const signup = async (name: string, email: string, password: string, consent: boolean) => {
    const r: any = await api.signup({ name, email, password, consent })
    tokenStore.set(r.token); setUser(r.user)
    return r.portalHandoff as string | undefined
  }
  const login = async (email: string, password: string) => {
    const r: any = await api.login({ email, password })
    tokenStore.set(r.token); setUser(r.user)
    return r.portalHandoff as string | undefined
  }
  const logout = () => { tokenStore.clear(); setUser(null) }

  return <Ctx.Provider value={{ user, loading, signup, login, logout }}>{children}</Ctx.Provider>
}
