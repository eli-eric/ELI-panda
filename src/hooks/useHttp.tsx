import { useState } from 'react'

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

const defaultOptions: RequestOptions = {
  mode: 'no-cors'
}

const useHttp = () => {
  const initialState = {
    isLoading: false,
    data: null,
    error: ''
  }

  const [state, setState] = useState(initialState)

  const executeRequest = async (url: string, options: RequestOptions = {}) => {
    const requestOptions = { ...defaultOptions, ...options }
    const request = new Request(url, requestOptions)

    setState(prevState => ({ ...prevState, isLoading: true }))

    try {
      const response = await fetch(request)
      const jsonData = await response.json()
      setState({ error: '', isLoading: false, data: jsonData })
    } catch (err) {
      const errorMessage = (err as Error).toString()
      setState({ error: errorMessage, data: null, isLoading: false })
    }
  }

  return { ...state, executeRequest }
}

export default useHttp
