import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import axiosInstance from '@/core/axios/axiosInstance'
import { message } from '@/i18n/src/messages'
import { uniFetcher } from '@/utils/fetcher'

import type { FileItem, ProcessedFile } from '../../fileManager/types'
import { getEndpoint, readFilesAsProcessed } from '.'

type Params = {
    itemCategory: string
    itemId: string
    fileCategory?: string
}

const QUERY_KEY = 'fileItem'

const toTempItems = (files: ProcessedFile[]): FileItem[] =>
    files.map(file => ({
        id: `temp-${crypto.randomUUID()}`,
        name: file.name,
        url: file.payload,
        size: 0,
    }))

/**
 * Auto-saving image gallery state. Unlike `useImageGallery` (which queues changes behind a
 * form `ref.submit()`), this commits each upload/delete immediately and optimistically, then
 * reconciles with the server via query invalidation. Built for views without a save button.
 */
export const useImageAutoSave = ({ itemCategory, itemId, fileCategory = 'image' }: Params) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const endpoint = getEndpoint(itemCategory, itemId, fileCategory)
    const queryKey = [QUERY_KEY, endpoint]

    const { data: images = [], isLoading } = useQuery<FileItem[]>({
        queryKey,
        queryFn: async () => uniFetcher(endpoint),
        refetchOnMount: true,
    })

    const { mutateAsync: uploadAsync, isPending: isUploading } = useMutation({
        mutationFn: (files: ProcessedFile[]) =>
            Promise.all(files.map(file => axiosInstance.post(endpoint, file))),
        onMutate: async (files: ProcessedFile[]) => {
            await queryClient.cancelQueries({ queryKey })
            const prev = queryClient.getQueryData<FileItem[]>(queryKey)
            queryClient.setQueryData<FileItem[]>(queryKey, data => [
                ...toTempItems(files),
                ...(data ?? []),
            ])
            return { prev }
        },
        onError: (_err, _files, context) => {
            queryClient.setQueryData(queryKey, context?.prev)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })

    const { mutateAsync: deleteAsync, isPending: isDeleting } = useMutation({
        mutationFn: (file: FileItem) => axiosInstance.delete(`${endpoint}/${file.id}`),
        onMutate: async (file: FileItem) => {
            await queryClient.cancelQueries({ queryKey })
            const prev = queryClient.getQueryData<FileItem[]>(queryKey)
            queryClient.setQueryData<FileItem[]>(queryKey, data =>
                data?.filter(item => item.id !== file.id),
            )
            return { prev }
        },
        onError: (_err, _file, context) => {
            queryClient.setQueryData(queryKey, context?.prev)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })

    // toast.promise handles the mutation's rejection (rollback runs in onError); we don't
    // await it so an upload/delete failure never surfaces as an unhandled rejection in the
    // un-awaited dropzone/warning-modal callers.
    const uploadImages = useCallback(
        async (files: File[]) => {
            if (!files.length) return
            let processed: ProcessedFile[]
            try {
                processed = await readFilesAsProcessed(files)
            } catch {
                toast.error(fm({ id: message.common.imageGallery.uploadError }))
                return
            }
            toast.promise(uploadAsync(processed), {
                loading: fm({ id: message.common.imageGallery.uploading }),
                success: fm({ id: message.common.imageGallery.uploaded }),
                error: fm({ id: message.common.imageGallery.uploadError }),
            })
        },
        [fm, uploadAsync],
    )

    const deleteImage = useCallback(
        (file: FileItem) => {
            toast.promise(deleteAsync(file), {
                loading: fm({ id: message.common.imageGallery.deleting }),
                success: fm({ id: message.common.imageGallery.deleted }),
                error: fm({ id: message.common.imageGallery.deleteError }),
            })
        },
        [fm, deleteAsync],
    )

    return {
        images,
        isLoading,
        isMutating: isUploading || isDeleting,
        uploadImages,
        deleteImage,
    }
}
