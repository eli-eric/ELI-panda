import axios from 'axios'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { BASE_URL } from '@/types/constants/common'

interface UseSubmitProps {
  endpoint: string
  method: 'post' | 'put' | 'delete'
  mutateUrlList?: string[]
}

interface UseSubmitReturn {
  response: any
  error: string | undefined
  loading: boolean
  submit: (body?: object) => void
}

const useSubmit = ({ endpoint, method, mutateUrlList }: UseSubmitProps) => {
  const { mutate } = useSWRConfig()

  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>()
  const [loading, setloading] = useState<boolean>(false)
  const submit = async (body?: object) => {
    setloading(true)
    axios[method](BASE_URL + endpoint, body ? body : undefined)
      .then(res => setResponse(res.data))
      .catch(err => setError(err))
      .finally(() => {
        if (mutateUrlList)
          mutateUrlList.forEach(url => {
            mutate(url).finally(() => setloading(false))
          })
      })
  }
  return { response, error, loading, submit, setloading }
}

export default useSubmit
