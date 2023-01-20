import axios from 'axios'
import { useState } from 'react'
import { ScopedMutator } from 'swr/dist/types'

interface UseAxiosProps {
  url: string
  method: 'get' | 'post' | 'put' | 'delet'
}

interface UseAxiosReturn {
  response: object | null
  error: string
  loading: boolean
  fetchData: ({}: fetchDataProps) => void
}

interface fetchDataProps {
  body?: object | null
  afterAction?: { mutate: ScopedMutator<any>; mutateUrlList: string[] }
}

const useAxios = ({ url, method }: UseAxiosProps): UseAxiosReturn => {
  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setloading] = useState<boolean>(false)
  let timer: NodeJS.Timeout
  const fetchData = ({ body, afterAction }: fetchDataProps) => {
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
          if (afterAction)
            afterAction.mutateUrlList.forEach(url => {
              afterAction.mutate(url)
            })
        }, 200)
        setloading(false)
      })
  }
  return { response, error, loading, fetchData }
}

export default useAxios
