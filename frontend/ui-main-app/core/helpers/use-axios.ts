import axios from 'axios'
import { AXIOS_METHOD } from 'core/types/constants/endpoints'
import { useState } from 'react'

interface UseAxiosProps {
  url: string
  method: AXIOS_METHOD
  body?: object | null
  headers?: object | null
}

interface UseAxiosReturn {
  response: object | null
  error: string
  loading: boolean

  fetchData: () => void
}

const useAxios = ({ url, method, body = null, headers = null }: UseAxiosProps): UseAxiosReturn => {
  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setloading] = useState<boolean>(true)

  const fetchData = () => {
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

  return { response, error, loading, fetchData }
}

export default useAxios
