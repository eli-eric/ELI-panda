import axios from 'axios'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { BASE_URL } from '@/types/constants/common'

interface UseSubmitProps {
  endpoint: string
  method: 'post' | 'put' | 'delete'
  mutateList?: string[]
}

const useSubmit = ({ endpoint, method, mutateList }: UseSubmitProps) => {
  const { mutate } = useSWRConfig()

  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>()
  const [loading, setloading] = useState<boolean>(false)
  const submit = async (body?: object) => {
    setloading(true)
    axios[method](BASE_URL + endpoint, body ? body : undefined)
      .then(res => setResponse(res.data))
      .catch(err => {
        setError(err)
        setloading(false)
      })
      .finally(() => {
        if (mutateList)
          mutateList.forEach(url => {
            mutate(url, undefined, { revalidate: true }).finally(() =>
              setloading(false),
            )
          })
      })
  }
  return { response, error, loading, submit, setloading }
}

export default useSubmit
