# sso-client

> TGA SSO Client Package

## Install

```bash
yarn add ktb-tga/sso-client
```

## Usage

```tsx
import React from 'react'

import { usePreflight, useAuth, SSO } from 'sso-client'

SSO.configure({
  appURL: 'http://localhost:3000', // app frontend url
  apiURL: 'https://mote-backend-dev.arge-tga.com', // app backend url for authenticate and user-info
  originSourceQuery: 'http://mote-frontend-dev.arge-tga.com', //optional for prod required for locale, https:// and http:// will be removed automatically
  authenticateEndpoint: '/api/authenticate/', // optional, endpoint to 'authenticate' defaults to '/api/authenticate/'
  userInfoEndpoint: '/api/user-info/', // optional, endpoint to 'authenticate' defaults to '/api/authenticate/'
  preflightURL: 'https://rapor-api.tga.gov.tr/api/preflight', //optional, preflight api defaults to 'https://preflight.tga.gov.tr/api/preflight/'
  mode: 'production', // optional, this sets SSO to development or production, defaults to 'production'
  redirectPath: '/', // optional, after authenticate redirecting this path, defaults to '/'
  localStorageKey: 'token' // optional, defaults to 'token'
})

type User = {
  id: number
  token: string
  email: string
  age?: number
}

const App = () => {
  const { isAllowed, isPreflighting } = usePreflight()
  const { isAuthed, isAuthing, user } = useAuth<User>(isAllowed) // isAllowed property is optional, defaults to true for public apps

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
