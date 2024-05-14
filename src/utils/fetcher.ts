import axios from 'axios'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import type { EndpointProps } from './getEndpoints'
import { getEndpoints } from './getEndpoints'
import type { QueryFunction } from '@tanstack/react-query'

export async function fetcher(url) {
  const res = await axiosInstance.get(BASE_URL + url).then(res => res.data)
  return res
}

export async function mockFetcher(url) {
  const res = await axiosInstance
    .get('/api/mock-server' + url)
    .then(res => res.data)
  return res
}

export const uniFetcher = async url =>
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
