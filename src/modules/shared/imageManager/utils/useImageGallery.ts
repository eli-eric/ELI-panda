import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import { toast } from 'sonner'

import axiosInstance from '@/core/axios/axiosInstance'

import type { FileItem, ProcessedFile } from '../../fileManager/types'
import type { Status } from '../types'
import { getEndpoint, readFilesAsProcessed } from '.'

export const useImageGallery = ({ itemCategory, itemId, fileCategory }) => {
    const endpoint = getEndpoint(itemCategory, itemId, fileCategory)

    const queryClient = useQueryClient()

    const dueUploadRef = useRef<ProcessedFile[]>([])
    const dueDeleteRef = useRef<FileItem[]>([])

    const handleDelete = (obj: FileItem) => {
        if (obj.id.startsWith('temp')) {
            dueUploadRef.current = dueUploadRef.current.filter(file => file.name !== obj.name)
        } else {
            dueDeleteRef.current = [...dueDeleteRef.current, obj]
        }
        queryClient.setQueryData<FileItem[]>(['fileItem', endpoint], data =>
            data?.filter(file => file.id !== obj.id),
        )
    }

    const onDrop = (files: File[]) => {
        readFilesAsProcessed(files).then(files => {
            dueUploadRef.current = [...dueUploadRef.current, ...files]
            const tempFiles = files.map(file => {
                const id = `temp-${crypto.randomUUID()}`
                const url = file.payload
                return {
                    ...file,
                    id,
                    url,
                    size: 0, // Add the missing 'size' property with a default value
                }
            })
            queryClient.setQueryData<FileItem[]>(['fileItem', endpoint], data =>
                data ? [...tempFiles, ...(data ?? [])] : tempFiles,
            )
        })
    }

    const submit = useCallback(
        (
            itemId: string,
            onSuccess?: (status: Status) => void,
            onError?: (status: Status) => void,
        ) => {
            const status: Status = {}
            const deletePromise = Promise.all(
                dueDeleteRef.current.map(file => axiosInstance.delete(`${endpoint}/${file.id}`)),
            )
                .then(() => {
                    status.successfulDeletions = dueDeleteRef.current.map(file => file.name)
                })
                .catch(() => {
                    status.failedDeletions = dueDeleteRef.current.map(file => file.name)
                })

            const ep = itemId ? getEndpoint(itemCategory, itemId, fileCategory) : endpoint

            const uploadPromise = Promise.all(
                dueUploadRef.current.map(file => axiosInstance.post(ep, file)),
            )
                .then(() => {
                    status.successfulUploads = dueUploadRef.current.map(file => file.name)
                })
                .catch(() => {
                    status.failedUploads = dueUploadRef.current.map(file => file.name)
                })

            Promise.allSettled([deletePromise, uploadPromise])
                .then(() => {
                    onSuccess && onSuccess(status)
                    if (status.failedDeletions?.length || status.failedUploads?.length) {
                        toast.error('Some files failed to upload or delete')
                    }
                })
                .catch(() => {
                    onError && onError(status)
                })
        },
        [endpoint, itemCategory, fileCategory],
    )

    return {
        onDrop,
        handleDelete,
        submit,
        hasChanges: dueUploadRef.current.length > 0 || dueDeleteRef.current.length > 0,
    }
}
