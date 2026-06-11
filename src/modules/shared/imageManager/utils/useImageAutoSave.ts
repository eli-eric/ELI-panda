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
        // settle every upload so a partial failure still commits the successful files
        // (reconciled by onSettled invalidate); the thrown count drives an honest toast.
        mutationFn: async (files: ProcessedFile[]) => {
            const results = await Promise.allSettled(
                files.map(file => axiosInstance.post(endpoint, file)),
            )
            const failed = results.filter(result => result.status === 'rejected').length
            if (failed) throw Object.assign(new Error('upload-failed'), { failed })
        },
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

    // Each returns a promise that resolves when the mutation settles (and to `undefined` on
    // failure — rollback runs in the mutation's onError). The returned `.catch(noop)` means
    // fire-and-forget callers (dropzone / warning-modal) never raise an unhandled rejection,
    // while callers that want sequencing can still `await` it.
    const uploadImages = useCallback(
        async (files: File[]) => {
            if (!files.length) return
            const count = files.length
            let processed: ProcessedFile[]
            try {
                processed = await readFilesAsProcessed(files)
            } catch {
                toast.error(fm({ id: message.common.imageGallery.uploadError }, { count }))
                return
            }
            const promise = uploadAsync(processed)
            toast.promise(promise, {
                loading: fm({ id: message.common.imageGallery.uploading }),
                success: fm({ id: message.common.imageGallery.uploaded }, { count }),
                // report the actual number that failed (a partial batch still throws)
                error: (err: unknown) =>
                    fm(
                        { id: message.common.imageGallery.uploadError },
                        { count: (err as { failed?: number })?.failed ?? count },
                    ),
            })
            return promise.catch(() => {})
        },
        [fm, uploadAsync],
    )

    const deleteImage = useCallback(
        (file: FileItem) => {
            const promise = deleteAsync(file)
            toast.promise(promise, {
                loading: fm({ id: message.common.imageGallery.deleting }),
                success: fm({ id: message.common.imageGallery.deleted }),
                error: fm({ id: message.common.imageGallery.deleteError }),
            })
            return promise.catch(() => {})
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
