import axios from 'axios'
import { useState } from 'react'

import { AxiosMethodTypes } from './../types/constants/endpoints'

interface UseAxiosProps {
  url: string
  method: AxiosMethodTypes
  body?: object | null
}

interface UseAxiosReturn {
  response: object | null
  error: string
  loading: boolean
  fetchData: () => void
}

const useAxios = ({ url, method, body = null }: UseAxiosProps) => {
  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setloading] = useState<boolean>(false)
  const fetchData = () => {
    setloading(true)
    axios[method](url, body ? body : undefined)
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
  return [response, error, loading, fetchData]
}

export default useAxios
