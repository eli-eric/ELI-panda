import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import axiosInstance from '@/core/axios/axiosInstance'

import type { FILE_TYPE, FileItem } from '../types'

const getFiles = async (itemType: string, uid?: string): Promise<Array<FileItem>> => {
    const endpoint = `/api/${itemType}/${uid}/files`
    return axiosInstance.get(endpoint).then(res => res.data)
}

const deleteFile = async (itemType: string, uid: string, id: string): Promise<string> => {
    const endpoint = `/api/${itemType}/${uid}/files/${id}`
    return axiosInstance.delete(endpoint).then(res => res.data)
}

interface UseFilesProps {
    itemType: FILE_TYPE
    uid?: string
}

export const useFiles = ({ itemType, uid }: UseFilesProps) => {
    return useQuery({
        queryKey: ['files', itemType, uid],
        queryFn: () => getFiles(itemType, uid),
        enabled: !!uid,
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
        },
    })
}
