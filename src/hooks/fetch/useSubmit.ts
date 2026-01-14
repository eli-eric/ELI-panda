import type { AxiosError } from 'axios'
import { useRef, useState } from 'react'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'

interface UseSubmitProps<T> {
  endpoint: string
  method: 'post' | 'put' | 'delete' | 'get'
  mutateList?: string[]
  onSuccess?: (
    data: T,
    body: any,
    custom?: {
      [key: string]: any
    }
  ) => void
  onError?: (error: AxiosError) => void
}

/** @deprecated Use useMutation from react-query instead */
export const useSubmit = <T>({
  endpoint,
  method,
  onSuccess,
  onError
}: UseSubmitProps<T>) => {
  const [response, setResponse] = useState<T | null>(null)
  const [error, setError] = useState<string>()
  const [loading, setloading] = useState<boolean>(false)
  const isSubmittingRef = useRef<boolean>(false) // Ref to track submission state

  const submit = (
    body?: any,
    custom?: {
      [key: string]: any
    }
  ) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setloading(true)
    axiosInstance[method](BASE_URL + endpoint, body)
      .then(res => {
        setResponse(res.data)
        if (onSuccess) onSuccess(res.data, body, custom)
      })
      .catch(err => {
        if (onError) onError(err)
        setError(err)
      })
      .finally(() => {
        isSubmittingRef.current = false
        setloading(false)
      })
  }
  return { response, error, loading, submit }
}
