import { useCallback, useState } from 'react'

type RequestOptions = {
  method?: string
  headers?: HeadersInit
  body?: BodyInit | null
  mode?: RequestMode
  credentials?: RequestCredentials
  cache?: RequestCache
  redirect?: RequestRedirect
  referrer?: string
  referrerPolicy?: ReferrerPolicy
  integrity?: string
  keepalive?: boolean
  signal?: AbortSignal | null
  window?: any
}

const useHttp = () => {
  const initialState = {
    isLoading: false,
    data: null,
    error: ''
  }

  const [state, setState] = useState(initialState)

  const executeRequest = useCallback(
    (defaultOptions: RequestOptions) =>
      async (url: string, options: RequestOptions = {}) => {
        const requestOptions = { ...options, ...defaultOptions }
        const request = new Request(url, requestOptions)

        setState(prevState => ({ ...prevState, isLoading: true }))

        try {
          const response = await fetch(request)
          const jsonData = await response.json()
          setState(prevState => ({ ...prevState, isLoading: false, data: jsonData }))
        } catch (err) {
          const errorMessage = (err as Error).toString()
          setState({ error: errorMessage, data: null, isLoading: false })
        }
      },
    []
  )

  const httpMethods = {
    get: executeRequest({ method: 'get' }),
    post: executeRequest({ method: 'post' }),
    put: executeRequest({ method: 'put' }),
    patch: executeRequest({ method: 'patch' }),
    delete: executeRequest({ method: 'delete' })
  }

  return { ...state, fetch: httpMethods }
}

export default useHttp
