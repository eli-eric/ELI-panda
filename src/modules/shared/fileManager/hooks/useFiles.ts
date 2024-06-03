import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import axiosInstance from '@/core/axios/axiosInstance'

import type { FileItem } from '../types'

const getFiles = (itemType: string, uid: string): Promise<Array<FileItem>> => {
  const endpoint = `/api/${itemType}/${uid}/files`
  return axiosInstance.get(endpoint).then(res => res.data)
}

const deleteFile = (
  itemType: string,
  uid: string,
  id: string
): Promise<string> => {
  const endpoint = `/api/${itemType}/${uid}/files/${id}`
  return axiosInstance.delete(endpoint).then(res => res.data)
}

export const useFiles = ({ itemType, uid }) => {
  return useQuery({
    queryKey: ['files', itemType, uid],
    queryFn: () => getFiles(itemType, uid)
  })
}

export const useFileDelete = ({ itemType, uid, id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteFile(itemType, uid, id),
    onSuccess: () => {
      queryClient.setQueryData<FileItem[]>(['files', itemType, uid], old => {
        if (!old) return []
        return old?.filter(obj => obj.id !== id)
      })
    },
    onError: error => {
      toast.error('Failed to delete file: ' + error)
    }
  })
}
