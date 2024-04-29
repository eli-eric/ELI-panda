import { getEndpoints } from '@/hooks/fetch/useEndpoint'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import type { FileLinkPostResponse, FileLinkResponse } from '../types'
import { useEffect } from 'react'

const fetchLinks = (uid: string): Promise<FileLinkPostResponse[]> => {
  const { links } = getEndpoints(uid)
  return axiosInstance.get(BASE_URL + links).then(res => res.data)
}

const postLink = (
  parentUid: string,
  body: FileLinkResponse
): Promise<FileLinkPostResponse> => {
  const { link } = getEndpoints(parentUid)
  return axiosInstance.post(BASE_URL + link, body).then(res => res.data)
}

const putLink = (
  linkUid: string,
  body: FileLinkResponse
): Promise<FileLinkPostResponse> => {
  const { link } = getEndpoints(linkUid)
  return axiosInstance.put(BASE_URL + link, body).then(res => res.data)
}

const deleteLink = (linkUid: string): Promise<string> => {
  const { link } = getEndpoints(linkUid)
  return axiosInstance.delete(BASE_URL + link).then(res => res.data)
}

export const useLinks = ({ uid }) => {
  const response = useQuery({
    queryKey: ['links', uid],
    queryFn: () => fetchLinks(uid),
    placeholderData: keepPreviousData
  })
  useEffect(() => {
    if (response.isError) {
      toast.error('Failed to fetch links' + ' ' + response.error.message)
    }
  }, [response.isError, response.error])

  return response
}

export const useLinkCreate = ({ parentUid }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: FileLinkResponse) => postLink(parentUid, body),
    onSuccess: data => {
      queryClient.setQueryData<FileLinkPostResponse[]>(
        ['links', parentUid],
        old => (old ? [...old, data] : [data])
      )
    },
    onError: error => {
      toast.error('Failed to create link: ' + error)
    }
  })
}

export const useLinkUpdate = ({ parentUid }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: FileLinkPostResponse) => {
      const { uid, ...rest } = body
      return putLink(uid, rest)
    },
    onSuccess: data => {
      queryClient.setQueryData<FileLinkPostResponse[]>(
        ['links', parentUid],
        old =>
          old ? old.map(link => (link.uid === data.uid ? data : link)) : []
      )
    },
    onError: error => {
      toast.error('Failed to update link: ' + error)
    }
  })
}

export const useLinkDelete = ({ parentUid, uid }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (uid: string) => deleteLink(uid),
    onSuccess: () => {
      queryClient.setQueryData<FileLinkPostResponse[]>(
        ['links', parentUid],
        old => (old ? old.filter(link => link.uid !== uid) : [])
      )
    },
    onError: error => {
      toast.error('Failed to delete link: ' + error)
    }
  })
}
