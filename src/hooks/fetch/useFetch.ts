import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import useSWR from 'swr'
import type { BareFetcher, Key, KeyedMutator, PublicConfiguration } from 'swr/_internal'

import { fetcher, mockFetcher } from '@/helpers/fetcher'

type Response = Record<string, any>

interface UseFetchProps<ResponseType = Response> {
  url?: Key
  useMockFetcher?: boolean
  config?: Partial<PublicConfiguration<ResponseType, any, BareFetcher<ResponseType>>>

  format?: (data?: ResponseType) => any

  onSuccess?: (data: ResponseType) => void

  onError?: (error: any) => void
}

const useFetch = <ResponseType>({
  url,
  useMockFetcher,
  config,
  format
}: UseFetchProps<ResponseType>): {
  response: ResponseType | undefined
  loading: boolean
  error: any
  mutate: KeyedMutator<ResponseType>
} => {
  const router = useRouter()
  const { isReady } = router
  const { data: session } = useSession()

  const {
    data: response,
    isLoading,
    mutate,
    error
  } = useSWR<ResponseType, AxiosError>(isReady && session && url, useMockFetcher ? mockFetcher : fetcher, config)

  const formattedResponse = useMemo(() => (format ? format(response) : response), [response, format])

  return { response: formattedResponse, mutate, error, loading: isLoading }
}

export default useFetch
