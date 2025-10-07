import type {
  MutateFunction,
  QueryFunction,
  QueryKey
} from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { z } from 'zod'

// axiosInstance is gradually being replaced by fetchRequest – kept temporarily for compatibility
// import axiosInstance from '@/core/axios/axiosInstance'
import { fetchRequest } from '@/core/http/fetchClient'
import { BASE_URL } from '@/types/constants/common'

import type { EndpointProps } from './getEndpoints'
import { getEndpoints } from './getEndpoints'

/**
 * Query key shape used across the app. First element is endpoint key, second optional param bag.
 */
export type QueryFetcherKey = [string, EndpointProps] | [string]

// Development-time validation schema for EndpointProps
const endpointPropsSchema = z
  .object({
    uid: z.union([z.string(), z.null()]).optional(),
    path: z.union([z.string(), z.null()]).optional(),
    itemUid: z.union([z.string(), z.null()]).optional(),
    // Accept generic record with primitive or null values (string keys)
    query: z
      .record(
        z.string(),
        z.union([z.string(), z.number(), z.boolean(), z.null()])
      )
      .nullable()
      .optional(),
    codebook: z.union([z.string(), z.null()]).optional()
  })
  .strict()

interface NormalizedError {
  status?: number
  code?: string
  message: string
  details?: unknown
}

const normalizeError = (error: unknown): NormalizedError => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status,
      code: (error.response?.data as any)?.code,
      message:
        (error.response?.data as any)?.message ||
        error.message ||
        'Request error',
      details: error.response?.data
    }
  }
  if ((error as any)?.name === 'AbortError') {
    return { message: 'Request aborted' }
  }
  if (error instanceof Error) {
    return { message: error.message }
  }
  return { message: 'Unknown error' }
}

const buildUrl = (endpoint: string, isDefaultUrl?: boolean) => {
  const base = (isDefaultUrl ? '' : BASE_URL).replace(/\/+$/, '')
  const ep = endpoint.replace(/^\/+/, '')
  return base ? `${base}/${ep}` : `/${ep}`
}

// Placeholder for future endpoint response inference map (extend gradually)
type GetEndpointsReturn = ReturnType<typeof getEndpoints>
export type EndpointKey = keyof GetEndpointsReturn

const extractParams = (queryKey: QueryKey): EndpointProps | undefined => {
  if (!Array.isArray(queryKey)) return undefined
  const candidate = queryKey[1]
  if (candidate && typeof candidate === 'object')
    return candidate as EndpointProps
  return undefined
}

const resolveEndpoint = (
  endpointType: EndpointKey,
  params?: EndpointProps | Record<string, unknown>
): string => {
  const endpoint = getEndpoints((params || {}) as EndpointProps)[endpointType]
  if (!endpoint) {
    throw new Error(
      `Endpoint not available for key="${endpointType}" with params=${JSON.stringify(params)}`
    )
  }
  return endpoint
}

// Overloads to allow contextual typing and explicit generics
export function uniFetcher<T = any>(url: string): Promise<T>
export function uniFetcher(url: string): Promise<any>
export function uniFetcher(url: string) {
  return fetchRequest(url)
}

/**
 * Factory returning a Query Function bound to an endpoint key (public API preserved).
 * Enhancements: abort signal support, dev-time param validation, normalized endpoint resolution.
 */
export const queryFetcher = <T = unknown>(endpointType: string) => {
  const querFn: QueryFunction<T, QueryFetcherKey> = async ctx => {
    const { queryKey, signal } = ctx
    const params = extractParams(queryKey)

    if (process.env.NODE_ENV !== 'production' && params) {
      const parsed = endpointPropsSchema.safeParse(params)
      if (!parsed.success) {
        // eslint-disable-next-line no-console
        console.warn(
          '[queryFetcher] Invalid EndpointProps',
          parsed.error.format()
        )
      }
    }

    let endpoint: string
    try {
      endpoint = resolveEndpoint(endpointType as EndpointKey, params)
    } catch (e) {
      const norm = normalizeError(e)
      throw new Error(norm.message)
    }

    return await fetchRequest(buildUrl(endpoint), { signal })
  }
  return querFn
}

export const queryMutate = <TResponse, TVariables>(
  endpointType: string,
  mutationType: 'post' | 'put' | 'delete',
  uid?: string,
  isDefaultUrl?: boolean,
  endpointVariables?: Record<string, string>
) => {
  const mutateFn: MutateFunction<
    AxiosResponse<TResponse>,
    AxiosError,
    TVariables
  > = async variables => {
    const ep = resolveEndpoint(endpointType as EndpointKey, {
      uid,
      ...endpointVariables
    })
    const url = buildUrl(ep, isDefaultUrl)
    try {
      const method = mutationType.toUpperCase()
      // For delete do not send body
      const data = await fetchRequest<TResponse>(url, {
        method,
        body: mutationType === 'delete' ? undefined : (variables as any)
      })
      // Adapt to AxiosResponse shape expected by existing code
      const axiosLike = {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: undefined
      } as AxiosResponse<TResponse>
      return axiosLike
    } catch (e) {
      if ((e as any)?.name === 'AbortError') throw e
      throw e
    }
  }
  return mutateFn
}

// TODO: After full migration remove axios dependency and related types (AxiosError, AxiosResponse)
