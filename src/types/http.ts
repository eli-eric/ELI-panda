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
        const code = typeof candidate.code === 'string' ? candidate.code : undefined

        if (status) {
            defaultError.response = {
                status,
                data: details as T,
            }
        }

        if (code) {
            defaultError.code = code
        }

        if (details !== undefined) {
            defaultError.details = details
        }
    }

    return defaultError
}
