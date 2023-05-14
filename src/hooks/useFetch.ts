import { useCallback, useEffect } from 'react'
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
  const { data: response, mutate, error } = useSWR<ResponseType>(url, useMockFetcher ? mockFetcher : fetcher, config)

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

  return { response: format ? format(response) : response, mutate, error }
}

export default useFetch
