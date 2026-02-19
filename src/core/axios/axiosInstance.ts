import { fetchRequestDetailed } from '@/core/http/fetchClient'
import type { AxiosResponse } from '@/types/http'
import { toAxiosError } from '@/types/http'

const createResponse = <T = any>(
    data: T,
    status: number,
    statusText: string,
    headers: Record<string, string>,
): AxiosResponse<T> => {
    return {
        data,
        status,
        statusText,
        headers,
        config: {},
        request: undefined,
    }
}

const request = async <T = any>(
    method: string,
    url: string,
    body?: unknown,
): Promise<AxiosResponse<T>> => {
    try {
        const response = await fetchRequestDetailed<T>(url, {
            method,
            body,
        })
        return createResponse(response.data, response.status, response.statusText, response.headers)
    } catch (error) {
        throw toAxiosError(error)
    }
}

const axiosInstance = {
    get: <T = any>(url: string) => request<T>('GET', url),
    post: <T = any>(url: string, body?: unknown) => request<T>('POST', url, body),
    put: <T = any>(url: string, body?: unknown) => request<T>('PUT', url, body),
    delete: <T = any>(url: string) => request<T>('DELETE', url),
}

export default axiosInstance
