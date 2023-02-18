import axios from 'axios'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

interface UseSubmitProps {
  url: string
  method: 'get' | 'put' | 'delete'
  mutateUrlList?: string[]
}

interface UseSubmitReturn {
  response: object | null
  error: string
  loading: boolean
  submit: (body?: object) => void
}

const useSubmit = ({ url, method, mutateUrlList }: UseSubmitProps): UseSubmitReturn => {
  const { mutate } = useSWRConfig()

  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setloading] = useState<boolean>(false)
  let timer: NodeJS.Timeout
  const submit = (body?: object) => {
    setloading(true)
    axios[method](url, body ? body : undefined)
      .then(res => {
        setResponse(res.data)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          if (mutateUrlList)
            mutateUrlList.forEach(url => {
              mutate(url)
            })
        }, 200)
        setloading(false)
      })
  }
  return { response, error, loading, submit }
}

export default useSubmit
