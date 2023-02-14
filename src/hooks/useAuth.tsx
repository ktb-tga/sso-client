import { useCallback, useEffect, useRef, useState } from 'react'
import { SSO } from '../sso-client'
import { fetchWithTimeout } from '../utils'

interface UseAuthType<T> {
  isAuthed: boolean
  isAuthing: boolean
  user: T | null
}

export const useAuth = <T extends unknown>(
  allowedNetwork = true,
  callback?: (user: T) => void
): UseAuthType<T> => {
  const [isAuthed, setAuthed] = useState(false)
  const [isAuthing, setAuthing] = useState(false)
  const [user, setUser] = useState<T | null>(null) // user type could be anything depends on app
  const abortRef = useRef<AbortController>()
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
      if (!data?.success)
        return SSO.redirectSSO('autheticate !data?.success on :35')

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
        Authorization: `${SSO.bearerTokenKey} ${JSON.parse(
          localStorage.getItem(SSO.localStorageKey)!
        )}`
      }
    })
    const data = await res.json()

    if (!data?.success) return SSO.redirectSSO('userInfo !data.success on :59')
    redirectRef.current = window.location.pathname
    setAuthed(true)

    return data?.data
  }, [])

  const handleAuth = useCallback(async () => {
    setAuthing(true)
    const token = JSON.parse(localStorage.getItem(SSO.localStorageKey)!)
    const ssoToken = new URLSearchParams(window.location.search).get('token')

    if (!token && !ssoToken)
      return SSO.redirectSSO('handleAuth !token && !ssoToken on :71 ')

    try {
      abortRef.current = new AbortController()
      const data = token
        ? await userInfo(abortRef.current.signal)
        : await authenticate(ssoToken, abortRef.current.signal)
      setUser(data)
      if (callback) callback(data)
    } catch (error) {
      localStorage.removeItem(SSO.localStorageKey)
      return SSO.redirectSSO('handleAuth catch error on :82')
    } finally {
      setAuthing(false)
      window.history.pushState({}, document.title, redirectRef.current)
    }
  }, [])

  useEffect(() => {
    if (!allowedNetwork) return
    handleAuth()
    return () => {
      if (SSO.mode === 'production') abortRef.current?.abort()
    }
  }, [allowedNetwork])

  return { isAuthed, isAuthing, user }
}
