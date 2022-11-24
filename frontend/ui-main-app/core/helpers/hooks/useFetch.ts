import axios from 'axios'
import { BASE_URL } from 'core/types/constants/common'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export const useFetch = <ResponseType = Response>(
  endpointUri: string
): ResponseType | undefined => {
  const { data } = useSession()
  const { data: response, error } = useSWR(BASE_URL + endpointUri)
  return response
}

export const useFetchImage = (endpointUri: string): string | undefined => {
  const { data } = useSession()
  const fetcher = url =>
    axios
      .get(url, {
        responseType: 'blob'
      })
      .then(res => {
        const objectURL = URL.createObjectURL(res.data)
        return objectURL
      })

  const { data: response, error } = useSWR(BASE_URL + endpointUri, fetcher)

  return response
}
