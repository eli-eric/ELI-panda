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

type RequestCallback = (result: object | Error) => void

const defaultOptions: RequestOptions = {
  // mode: 'no-cors'
}

const executeRequest = async (
  url: string,
  options: RequestOptions,
  onSuccess: RequestCallback,
  onError: RequestCallback
) => {
  const requestOptions = { ...defaultOptions, ...options }
  const request = new Request(url, requestOptions)
  try {
    const response = await fetch(request)
    const jsonData = await response.json()
    onSuccess(jsonData)
  } catch (err) {
    if (err instanceof Error) {
      onError(err)
    } else {
      onError(new Error(String(err)))
    }
  }
}

const useHttp = () => executeRequest

export default useHttp
