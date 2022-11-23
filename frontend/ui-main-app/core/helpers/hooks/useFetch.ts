import axios from 'axios'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.PANDA_API_GW_URL
    : 'http://localhost:5001/api/mock-server'

export const useFetch = <ResponseType = Response>(
  endpointUri: string
): ResponseType | undefined => {
  const { data } = useSession()
  axios.defaults.headers.common['authorization'] = data?.user.apiAccessToken
  const { data: response, error } = useSWR(baseURL + endpointUri)
  return response
}

export const useFetchImage = (endpointUri: string): string | undefined => {
  const { data } = useSession()
  axios.defaults.headers.common['authorization'] = data?.user.apiAccessToken
  const fetcher = url =>
    axios
      .get(url, {
        responseType: 'blob'
      })
      .then(res => {
        const objectURL = URL.createObjectURL(res.data)
        return objectURL
      })

  const { data: response, error } = useSWR(baseURL + endpointUri, fetcher)

  return response
}
