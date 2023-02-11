type SSOMode = 'production' | 'development'
type SSOProps = {
  appURL: string
  apiURL: string
  authenticateEndpoint?: string
  userInfoEndpoint?: string
  preflightURL?: string
  mode?: SSOMode
  originSourceQuery?: string
  redirectPath?: string
  localStorageKey?: string
}

class SSOClient {
  #appURL: string
  #apiURL: string
  #authenticateEndpoint = '/api/authenticate/'
  #userInfoEndpoint = '/api/user-info/'
  #mode: SSOMode = 'production'
  #ssoURL = 'https://sso.tga.gov.tr'
  #preflightURL = 'https://preflight.tga.gov.tr/api/preflight/'
  #redirectPath = '/'
  #localStorageKey = 'token'
  #originSourceQuery = ''

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

  get originSourceQuery() {
    return this.#originSourceQuery
  }

  get redirectPath() {
    return this.#redirectPath
  }

  //  TODO: maybe useful?
  set redirectPath(path: string) {
    this.#redirectPath = path
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

  configure(props: SSOProps) {
    this.#appURL = props.appURL || this.#appURL
    this.#apiURL = props.apiURL || this.#apiURL
    this.#authenticateEndpoint =
      props.authenticateEndpoint || this.#authenticateEndpoint
    this.#userInfoEndpoint = props.userInfoEndpoint || this.#userInfoEndpoint
    this.#preflightURL = props.preflightURL || this.#preflightURL
    this.#redirectPath = props.redirectPath || this.#redirectPath
    this.#localStorageKey = props.localStorageKey || this.#localStorageKey
    this.setupOriginSource(props.originSourceQuery || this.#originSourceQuery)
    this.setupSSOModeAndURL(props.mode || this.#mode)
  }
}

export const SSO = new SSOClient()
