import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useMemo } from 'react'
import useSWR from 'swr'
import type { BareFetcher, KeyedMutator, PublicConfiguration } from 'swr/_internal'

import { fetcher, mockFetcher } from '@/helpers/fetcher'

type Response = Record<string, any>

interface UseFetchProps<ResponseType = Response> {
  url?: string | null
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
  onSuccess,
  onError,
  format
}: UseFetchProps<ResponseType>): {
  response: ResponseType
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

  // handle success callback
  const handleSuccess = useCallback(
    (data: ResponseType) => {
      if (onSuccess) {
        onSuccess(data)
      }
    },
    [onSuccess]
  )
  // handle success useEffect
  useEffect(() => {
    if (response) {
      handleSuccess(response)
    }
  }, [response, handleSuccess])

  // handle error callback
  const handleError = useCallback(
    (error: any) => {
      if (onError) {
        onError(error)
      }
    },
    [onError]
  )
  // handle error useEffect
  useEffect(() => {
    if (error) {
      handleError(error)
    }
  }, [error, handleError])

  const formattedResponse = useMemo(() => (format ? format(response) : response), [response, format])

  return { response: formattedResponse, mutate, error, loading: isLoading }
}

export default useFetch
