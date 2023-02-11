import { useEffect, useRef, useState } from 'react'
import { SSO } from '../sso-client'
import { fetchWithTimeout } from '../utils'

type PreflightResponse = {
  success: boolean
}

export const usePreflight = () => {
  const [isAllowed, setAllowed] = useState(false)
  const [isPreflighting, setPreflighting] = useState(true)
  const abortRef = useRef<() => void>(() => {})

  const usePreflight = async () => {
    try {
      const abortController = new AbortController()
      const signal = abortController.signal
      abortRef.current = abortController.abort

      const res = await fetchWithTimeout(SSO.preflightURL, {
        signal,
        method: 'GET',
        timeout: 25000
      })
      const data: PreflightResponse = await res.json()
      if (res.ok && data.success) setAllowed(true)
    } catch (err) {
      setAllowed(false)
    } finally {
      setPreflighting(false)
    }
  }

  useEffect(() => {
    usePreflight()
    return () => {
      if (SSO.mode === 'production') abortRef.current()
    }
  }, [])

  return { isPreflighting, isAllowed }
}
