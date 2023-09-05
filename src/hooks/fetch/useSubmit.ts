import type { AxiosError } from 'axios'
import { useState } from 'react'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'

interface UseSubmitProps<T> {
  endpoint: string
  method: 'post' | 'put' | 'delete'
  mutateList?: string[]
  onSuccess?: (data: T, body: any) => void
  onError?: (error: AxiosError) => void
}

export const useSubmit = <T>({ endpoint, method, onSuccess, onError }: UseSubmitProps<T>) => {
  const [response, setResponse] = useState<T | null>(null)
  const [error, setError] = useState<string>()
  const [loading, setloading] = useState<boolean>(false)

  const submit = (body?: any) => {
    setloading(true)
    axiosInstance[method](BASE_URL + endpoint, body)
      .then(res => {
        setResponse(res.data)
        if (onSuccess) onSuccess(res.data, body)
      })
      .catch(err => {
        if (onError) onError(err)
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }
  return { response, error, loading, submit }
}
