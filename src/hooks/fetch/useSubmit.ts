import type { AxiosError } from 'axios'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'

interface UseSubmitProps<T> {
  endpoint: string
  method: 'post' | 'put' | 'delete'
  mutateList?: string[]
  onSuccess?: (data?: T | null) => void
  onError?: (error: AxiosError) => void
}

const useSubmit = <T>({ endpoint, method, mutateList, onSuccess, onError }: UseSubmitProps<T>) => {
  const { cache, mutate } = useSWRConfig()
  const [response, setResponse] = useState<T | null>(null)
  const [error, setError] = useState<string>()
  const [loading, setloading] = useState<boolean>(false)

  const submit = (body?: any) => {
    setloading(true)
    axiosInstance[method](BASE_URL + endpoint, body)
      .then(res => {
        setResponse(res.data)
        if (onSuccess) onSuccess(res.data)
        if (mutateList)
          mutateList.forEach(url => {
            mutate(url, cache.get(url), { revalidate: true })
          })
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

export default useSubmit
