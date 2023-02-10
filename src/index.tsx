import SSOClient from './utils/SSOClient'

export const SSO = new SSOClient()
export { useAuth } from './hooks/useAuth'
export { usePreflight } from './hooks/usePreflight'
