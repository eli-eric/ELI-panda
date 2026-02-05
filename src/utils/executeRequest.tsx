type SuccessCallback<T> = (result: T) => void
type ErrorCallback = (err: Error) => void

const defaultHeaders = new Headers({ 'Content-Type': 'application/json' })
const defaultOptions: RequestInit = {
    // mode: 'no-cors'
    headers: defaultHeaders,
}

async function executeRequest<T>(
    url: string,
    options: RequestInit = {},
    onSuccess: SuccessCallback<T> = () => {},
    onError: ErrorCallback = () => {},
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
