export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: Record<string, string>
    config: Record<string, unknown>
    request?: unknown
}

export interface AxiosError<T = any> extends Error {
    isAxiosError: true
    code?: string
    response?: {
        status: number
        data?: T
        headers?: Record<string, string>
    }
    details?: unknown
}

export const isAxiosError = (error: unknown): error is AxiosError => {
    return Boolean(error && typeof error === 'object' && 'isAxiosError' in error)
}

export const toAxiosError = <T = any>(error: unknown): AxiosError<T> => {
    if (isAxiosError(error)) return error as AxiosError<T>

    const defaultError = new Error('Request failed') as AxiosError<T>
    defaultError.isAxiosError = true

    if (error instanceof Error) {
        defaultError.message = error.message
    }

    if (error && typeof error === 'object') {
        const candidate = error as Record<string, unknown>
        const status = typeof candidate.status === 'number' ? candidate.status : undefined
        const details = candidate.details
        const data = (candidate.data ?? details ?? candidate) as T
        const code = typeof candidate.code === 'string' ? candidate.code : undefined

        if (status) {
            defaultError.response = {
                status,
                data,
            }
        }

        if (code) {
            defaultError.code = code
        }

        defaultError.details = details ?? candidate
    }

    return defaultError
}

/**
 * Reads the HTTP status off an error regardless of which fetch path threw it.
 *
 * `queryFetcher` lets the raw `NormalizedHttpError` propagate, which carries `status`
 * directly. `queryMutate` wraps errors via `toAxiosError`, which moves the status to
 * `response.status` and does not copy it back to the top level. Reading only one shape
 * silently misses half the errors in the app.
 */
export const getErrorStatus = (error: unknown): number | undefined =>
    (error as { status?: number })?.status ??
    (error as { response?: { status?: number } })?.response?.status

export const isClientError = (error: unknown): boolean => {
    const status = getErrorStatus(error)
    return status !== undefined && status >= 400 && status < 500
}

export const isBadRequestError = (error: unknown): boolean => getErrorStatus(error) === 400

/** Backend messages are prefixed with "Bad request: " — strip it before showing them. */
export const getErrorMessageText = (error: unknown): string =>
    ((error as Error)?.message ?? '').replace(/^bad request:\s*/i, '').trim()
