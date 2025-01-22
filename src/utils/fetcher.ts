import type { MutateFunction, QueryFunction } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'

import type { EndpointProps } from './getEndpoints'
import { getEndpoints } from './getEndpoints'

export const uniFetcher = async (url: string) =>
  await axios.get(url).then(res => res.data)

export type QueryFetcherKey = [string, EndpointProps] | [string]

export const queryFetcher = <T>(
  endpointType: keyof ReturnType<typeof getEndpoints>
) => {
  const querFn: QueryFunction<T, QueryFetcherKey> = async ({ queryKey }) => {
    const queryParams = queryKey[1] as EndpointProps
    const endpoint = getEndpoints(queryParams || {})[endpointType] as string
    return axiosInstance.get(BASE_URL + endpoint).then(res => res.data)
  }
  return querFn
}

export const queryMutate = <TResponse, TVariables>(
  endpointType: keyof ReturnType<typeof getEndpoints>,
  mutationType: 'post' | 'put' | 'delete',
  uid?: string,
  isDefaultUrl?: boolean,
  endpointVariables?: Record<string, string>
) => {
  const mutateFn: MutateFunction<
    AxiosResponse<TResponse>,
    AxiosError,
    TVariables
  > = variables => {
    const endpoint = getEndpoints({ uid, ...endpointVariables })[
      endpointType
    ] as string | undefined
    if (!endpoint) {
      throw new Error(`Endpoint for type ${endpointType} not found`)
    }
    return axiosInstance[mutationType](
      (isDefaultUrl ? '' : BASE_URL) + endpoint,
      variables || {}
    )
  }
  return mutateFn
}
