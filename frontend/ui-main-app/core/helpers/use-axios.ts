import axios from 'axios'
import { useEffect, useState } from 'react'

interface UseAxiosProps {
  url: string | null
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  body?: object | null
  headers?: object | null
}

interface UseAxiosReturn {
  response: object | null
  error: string
  loading: boolean
}

const useAxios = ({ url, method, body = null, headers = null }: UseAxiosProps): UseAxiosReturn => {
  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setloading] = useState<boolean>(true)

  const fetchData = () => {
    if (url) {
      axios[method](url, body ? body : undefined, headers ? { headers } : undefined)
        .then(res => {
          setResponse(res.data)
        })
        .catch(err => {
          setError(err)
        })
        .finally(() => {
          setloading(false)
        })
    }
  }

  useEffect(() => {
    if (!url) return
    fetchData()
  }, [method, url, body, headers])

  return { response, error, loading }
}

export default useAxios
