import type { FileItem } from '../types'
import axiosInstance from '@/core/axios/axiosInstance'
import { useQuery } from 'react-query'

const getFiles = (itemType: string, uid: string): Promise<Array<FileItem>> => {
  const endpoint = `/api/${itemType}/${uid}/files`
  return axiosInstance.get(endpoint).then(res => res.data)
}

export const useFiles = ({ itemType, uid }) => {
  return useQuery(['files', itemType, uid], () => getFiles(itemType, uid))
}
