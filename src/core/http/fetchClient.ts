import { getSession } from 'next-auth/react'

import { isFeatureEnabled } from '@/config/featureFlags'

export interface FetchRequestOptions {
  method?: string
  body?: any
  headers?: Record<string, string>
  signal?: AbortSignal
  timeoutMs?: number
  responseType?: 'json' | 'text' | 'blob'
}

export interface NormalizedHttpError extends Error {
  status?: number
  code?: string
  details?: unknown
}

const DEFAULT_TIMEOUT = 15000

const withTimeout = (signal: AbortSignal | undefined, ms: number) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true })
  }
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timer)
  }
}

export async function fetchRequest<T = unknown>(
  url: string,
  options: FetchRequestOptions = {}
): Promise<T> {
  const session = await getSession()
  const headers: Record<string, string> = { ...(options.headers || {}) }

  if (session?.user?.apiAccessToken) {
    headers['authorization'] = `Bearer ${session.user.apiAccessToken}`
  }

  let body = options.body
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT
  const { signal, clear } = withTimeout(options.signal, timeoutMs)

  let response: Response
  try {
    response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body,
      signal
    })
  } catch (err) {
    clear()
    if ((err as any)?.name === 'AbortError') {
      throw err
    }
    const error: NormalizedHttpError = new Error('Network request failed')
    error.details = err
    throw error
  }

  clear()

  if (!response.ok) {
    let details: any
    try {
      details = await response.clone().json()
    } catch {
      try {
        details = await response.text()
      } catch {
        details = undefined
      }
    }
    const error: NormalizedHttpError = new Error(
      (details && (details.message || details.error)) ||
        `HTTP ${response.status}`
    )
    error.status = response.status
    error.code = details?.code
    error.details = details
    throw error
  }

  const type = options.responseType || 'json'
  if (type === 'text') return (await response.text()) as T
  if (type === 'blob') return (await response.blob()) as T
  // default json
  if (response.status === 204) return undefined as T

  // Get the raw text first to log it
  const rawText = await response.text()

  if (isFeatureEnabled('enableHttpLogging')) {
    //eslint-disable-next-line
    console.log('[fetchClient] Response details:', {
      url,
      method: options.method || 'GET',
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      rawText: rawText.substring(0, 200), // First 200 chars
      rawTextLength: rawText.length
    })
  }

  // Try to parse as JSON
  try {
    return JSON.parse(rawText) as T
  } catch (error) {
    if (isFeatureEnabled('enableHttpLogging')) {
      //eslint-disable-next-line
      console.error('[fetchClient] JSON parse error:', {
        error,
        rawText: rawText.substring(0, 500)
      })
    }
    throw error
  }
}
