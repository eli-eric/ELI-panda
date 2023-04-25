type RequestCallback<T> = (result: T | Error) => void

const defaultOptions: RequestInit = {
  // mode: 'no-cors'
}

async function executeRequest<T>(
  url: string,
  options: RequestInit,
  onSuccess: RequestCallback<T> = () => {},
  onError: RequestCallback<Error> = () => {}
): Promise<void> {
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

export default executeRequest
