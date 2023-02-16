type CustomRequest = RequestInit & {
  timeout?: number
}

export async function fetchWithTimeout(
  resource: string,
  options: CustomRequest
) {
  const { timeout = 25000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(resource, {
    ...options,
    mode: 'cors',
    signal: controller.signal,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  })

  clearTimeout(id)

  return response
}
