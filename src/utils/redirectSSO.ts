import { SSO } from '..'

export const redirectSSO = () => {
  const { host, hostname } = window.location
  window.open(`${SSO.ssoURL}/login?url=${host}${hostname === 'localhost' ? `&origin=${SSO.originSourceQuery}` : ''}`, '_self')
}
