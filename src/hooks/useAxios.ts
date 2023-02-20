import axios from 'axios'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

interface UseAxiosProps {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  mutateUrlList?: string[]
}

interface UseAxiosReturn {
  response: object | null
  error: string
  loading: boolean
  fetchData: (body?: object) => void
}

const useAxios = ({
  url,
  method,
  mutateUrlList,
}: UseAxiosProps): UseAxiosReturn => {
  const { mutate } = useSWRConfig()

  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setloading] = useState<boolean>(false)
  let timer: NodeJS.Timeout
  const fetchData = (body?: object) => {
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
  return { response, error, loading, fetchData }
}

export default useAxios
