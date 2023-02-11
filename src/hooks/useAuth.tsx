import { useCallback, useEffect, useRef, useState } from 'react'
import { SSO } from '../sso-client'
import { fetchWithTimeout } from '../utils'

interface UseAuthType<T> {
  isAuthed: boolean
  isAuthing: boolean
  user: T | null
}

export const useAuth = <T extends unknown>(
  allowedNetwork = true
): UseAuthType<T> => {
  const [isAuthed, setAuthed] = useState(false)
  const [isAuthing, setAuthing] = useState(false)
  const [user, setUser] = useState<T | null>(null) // user type could be anything depends on app

  const abortRef = useRef<() => void>(() => {})
  const redirectRef = useRef(SSO.redirectPath)

  const authenticate = useCallback(
    async (ssoToken: string | null, signal: AbortSignal) => {
      const res = await fetchWithTimeout(
        `${SSO.apiURL}${SSO.authenticateEndpoint}`,
        {
          signal,
          method: 'POST',
          body: JSON.stringify({ token: ssoToken })
        }
      )
      const data = await res.json()

      if (!data?.success) return redirectSSO()

      localStorage.setItem(
        SSO.localStorageKey,
        JSON.stringify(data?.data?.token)
      )
      setAuthed(true)

      return data?.data
    },
    []
  )

  const userInfo = useCallback(async (signal: AbortSignal) => {
    const res = await fetchWithTimeout(`${SSO.apiURL}${SSO.userInfoEndpoint}`, {
      signal,
      method: 'GET',
      headers: {
        Authorization: `Token ${JSON.parse(
          localStorage.getItem(SSO.localStorageKey)!
        )}`
      }
    })
    const data = await res.json()

    if (!data.success) return redirectSSO()
    setAuthed(true)
    redirectRef.current = window.location.pathname

    return data?.data
  }, [])

  const handleAuth = useCallback(async () => {
    setAuthing(true)
    const token = JSON.parse(localStorage.getItem(SSO.localStorageKey)!)
    const ssoToken = new URLSearchParams(window.location.search).get('token')

    if (!token && !ssoToken) return redirectSSO()

    try {
      const abortController = new AbortController()
      const signal = abortController.signal
      abortRef.current = abortController.abort

      const data = token
        ? await userInfo(signal)
        : await authenticate(ssoToken, signal)
      setUser(data)
    } catch (error) {
      localStorage.removeItem(SSO.localStorageKey)
      return redirectSSO()
    } finally {
      setAuthing(false)
      window.history.pushState({}, document.title, redirectRef.current)
    }
  }, [])

  useEffect(() => {
    if (!allowedNetwork) return
    handleAuth()
    return () => {
      if (SSO.mode === 'production') abortRef.current()
    }
  }, [allowedNetwork])

  return { isAuthed, isAuthing, user }
}

function redirectSSO() {
  const { host, hostname } = window.location
  window.open(
    `${SSO.ssoURL}/login?url=${host}${
      hostname === 'localhost' ? `&origin=${SSO.originSourceQuery}` : ''
    }`,
    '_self'
  )
}
