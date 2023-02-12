# sso-client

> TGA SSO Client Package

Requires `React >= 18.0.0`
</br>

## Install

```bash
yarn add ktb-tga/sso-client
```

### Usage

<!-- TODO: add react and nextjs usage -->

```ts
SSO.configure({
  apiURL: 'https://backend-api.com'
})
```

`configure` method accepts properties in the table below.

| property               |    \*    | default                                     |
| ---------------------- | :------: | ------------------------------------------- |
| `apiURL`               | required | -                                           |
| `appURL`               | optional | `window.location.origin`                    |
| `ssoURL`               |  static  | https://sso.tga.gov.tr                      |
| `preflightURL`         | optional | https://preflight.tga.gov.tr/api/preflight/ |
| `authenticateEndpoint` | optional | /api/authenticate/                          |
| `userInfoEndpoint`     | optional | /api/user-info/                             |
| `mode`                 | optional | production                                  |
| `redirectPath`         | optional | /                                           |
| `originSourceQuery`    | optional | -                                           |
| `localStorageKey`      | optional | token                                       |

## Example

```tsx
import React from 'react'

import { SSO, usePreflight, useAuth } from 'sso-client'

SSO.configure({
  apiURL: __API_URL__, // xxx-api.tga.gov.tr
  originSourceQuery:
    __APP_ENV__ === 'dev' ? 'xxx-frontend-dev.arge-tga.com' : 'xxx.tga.gov.tr',
  preflightURL: 'https://rapor-api.tga.gov.tr/api/preflight', // temporary usage => sso.tga.gov.tr
  localStorageKey: 'tga-xxx-token'
})

type User = {
  id: number
  token: string
  email: string
}

const App = () => {
  const setUser = useAuthStore((state) => state.setUser) // example setUser method
  const { isAllowed, isPreflighting } = usePreflight()
  const { isAuthed, isAuthing, user } = useAuth<User>(isAllowed, setUser) // default (true, undefined)

  return (
    <div>
      <h1>SSO Client</h1>
      <hr />
      isAllowed: {JSON.stringify(isAllowed)}
      <hr />
      isPreflighting: {JSON.stringify(isPreflighting)}
      <hr />
      isAuthing: {JSON.stringify(isAuthing)}
      <hr />
      isAuthed: {JSON.stringify(isAuthed)}
      <hr />
      user: {JSON.stringify(user)}
    </div>
  )
}

export default App
```

<!-- `(production \| development)`  -->

  <!-- appURL: 'http://localhost:3000', // app frontend url
  apiURL: 'https://mote-backend-dev.arge-tga.com', // app backend url for authenticate and user-info
  originSourceQuery: 'http://mote-frontend-dev.arge-tga.com', //optional for prod required for locale, https:// and http:// will be removed automatically
  authenticateEndpoint: '/api/authenticate/', // optional, endpoint to 'authenticate' defaults to '/api/authenticate/'
  userInfoEndpoint: '/api/user-info/', // optional, endpoint to 'authenticate' defaults to '/api/authenticate/'
  preflightURL: 'https://rapor-api.tga.gov.tr/api/preflight', //optional, preflight api defaults to 'https://preflight.tga.gov.tr/api/preflight/'
  mode: 'production', // optional, this sets SSO to development or production, defaults to 'production'
  redirectPath: '/', // optional, after authenticate redirecting this path, defaults to '/'
  localStorageKey: 'token' // optional, defaults to 'token' -->

   <!-- // isAllowed property is optional, defaults to true for public apps -->
