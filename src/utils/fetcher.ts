import axios from 'axios'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import type { EndpointProps } from './getEndpoints'
import { getEndpoints } from './getEndpoints'
import type { QueryFunction, QueryKey } from '@tanstack/react-query'

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

export const queryFetcher =
  <T>(
    endpointType: keyof ReturnType<typeof getEndpoints>
  ): QueryFunction<T, QueryKey, never> =>
  async ({ queryKey }) => {
    const query = queryKey[1] as EndpointProps
    const endpoint = getEndpoints(query)[endpointType] as string
    return axiosInstance.get(BASE_URL + endpoint).then(res => res.data)
  }
