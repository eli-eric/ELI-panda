import axios from 'axios'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { BASE_URL } from '@/types/constants/common'

interface UseSubmitProps<T> {
  endpoint: string
  method: 'post' | 'put' | 'delete'
  mutateList?: string[]
  onSuccess?: (data?: T | null) => void
}

const useSubmit = <T>({ endpoint, method, mutateList, onSuccess }: UseSubmitProps<T>) => {
  const { mutate } = useSWRConfig()
  const [response, setResponse] = useState<T | null>(null)
  const [error, setError] = useState<string>()
  const [loading, setloading] = useState<boolean>(false)

  const submit = (body?: object) => {
    setloading(true)
    axios[method](BASE_URL + endpoint, body)
      .then(res => {
        setResponse(res.data)
        if (onSuccess) onSuccess(res.data)
        if (mutateList)
          mutateList.forEach(url => {
            mutate(url, undefined, { revalidate: true })
          })
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }
  return { response, error, loading, submit }
}

export default useSubmit
