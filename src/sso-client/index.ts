type SSOMode = 'production' | 'development'
type SSOConfig = {
  apiURL: string
  appURL?: string
  authenticateEndpoint?: string
  userInfoEndpoint?: string
  preflightURL?: string
  mode?: SSOMode
  originSourceQuery?: string
  redirectPath?: string
  localStorageKey?: string
  bearerTokenKey?: string
}

class SSOClient {
  #apiURL: string
  #appURL = window.location.origin // TODO: check for NextJS & server components
  #authenticateEndpoint = '/api/authenticate/'
  #userInfoEndpoint = '/api/user-info/'
  #mode: SSOMode = 'production'
  #ssoURL = 'https://sso.tga.gov.tr'
  #preflightURL = 'https://preflight.tga.gov.tr'
  #redirectPath = '/'
  #localStorageKey = 'token'
  #bearerTokenKey = 'Bearer'
  #originSourceQuery = ''

  constructor({ apiURL }: Partial<SSOConfig> = {}) {
    this.#apiURL = apiURL || ''
  }

  get appURL() {
    return this.#appURL
  }

  get apiURL() {
    return this.#apiURL
  }

  get authenticateEndpoint() {
    return this.#authenticateEndpoint
  }

  get userInfoEndpoint() {
    return this.#userInfoEndpoint
  }

  get preflightURL() {
    return this.#preflightURL
  }

  get ssoURL() {
    return this.#ssoURL
  }

  get mode() {
    return this.#mode
  }

  get localStorageKey() {
    return this.#localStorageKey
  }

  get bearerTokenKey() {
    return this.#bearerTokenKey
  }

  get originSourceQuery() {
    return this.#originSourceQuery
  }

  get redirectPath() {
    return this.#redirectPath
  }

  private setupOriginSource(origin: string) {
    this.#originSourceQuery = origin
      ?.replaceAll('https://', '')
      .replaceAll('http://', '')
  }

  private setupSSOModeAndURL(mode: SSOMode) {
    this.#mode = mode
    this.#ssoURL =
      mode === 'development'
        ? 'https://tga-sso-frontend-dev.arge-tga.com'
        : 'https://sso.tga.gov.tr'
  }

  redirectSSO(reason?: string, callback?: () => void, bypass = false) {
    if (bypass) return
    if (reason) console.error(reason)
    localStorage.removeItem(this.#localStorageKey)

    const { host, hostname } = window.location
    window.open(
      `${SSO.ssoURL}/login?url=${host}${
        hostname === 'localhost' ? `&origin=${SSO.originSourceQuery}` : ''
      }`,
      '_self'
    )
    if (callback) callback()
  }

  configure(config: SSOConfig) {
    this.#apiURL = config.apiURL || this.#apiURL
    this.#appURL = config.appURL || this.#appURL
    this.#authenticateEndpoint =
      config.authenticateEndpoint || this.#authenticateEndpoint
    this.#userInfoEndpoint = config.userInfoEndpoint || this.#userInfoEndpoint
    this.#preflightURL = config.preflightURL || this.#preflightURL
    this.#redirectPath = config.redirectPath || this.#redirectPath
    this.#localStorageKey = config.localStorageKey || this.#localStorageKey
    this.#bearerTokenKey = config.bearerTokenKey || this.#bearerTokenKey
    this.setupOriginSource(config.originSourceQuery || this.#originSourceQuery)
    this.setupSSOModeAndURL(config.mode || this.#mode)
  }
}

export const SSO = new SSOClient()
