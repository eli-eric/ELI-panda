import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import useSWR from 'swr'
import type { BareFetcher, PublicConfiguration } from 'swr/dist/types'

import { fetcher, mockFetcher } from '@/helpers/fetcher'

type Response = Record<string, any>

interface UseFetchProps<ResponseType = Response> {
  url?: string
  useMockFetcher?: boolean
  config?: Partial<PublicConfiguration<ResponseType, any, BareFetcher<ResponseType>>>

  format?: (data: any) => ResponseType

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
}: UseFetchProps<ResponseType>) => {
  const router = useRouter()
  const { isReady } = router

  const {
    data: response,
    isValidating,
    mutate,
    error
  } = useSWR<ResponseType>(isReady && url, useMockFetcher ? mockFetcher : fetcher, config)

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

  return { response: formattedResponse, mutate, error, loading: isValidating }
}

export default useFetch
