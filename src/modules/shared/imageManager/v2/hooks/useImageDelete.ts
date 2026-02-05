import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetchRequest } from '@/core/http/fetchClient'

import type { DeleteImageParams, ImageHookParams, ImageItem } from '../types'

/**
 * Delete image with optimistic updates
 *
 * Features:
 * - Optimistic removal: image disappears immediately
 * - Auto-rollback on error
 * - Toast notifications
 * - Updates React Query cache
 *
 * @param itemType - Type of item (e.g., 'catalogue', 'system')
 * @param itemId - UUID of the item
 * @returns Mutation object with delete function
 *
 * @example
 * ```tsx
 * const { mutate: deleteImage } = useImageDelete({
 *   itemType: FILE_TYPE.CATALOGUE,
 *   itemId: '123-456-789'
 * })
 *
 * const handleDelete = (imageId: string, imageName: string) => {
 *   deleteImage({ imageId, imageName })
 * }
 * ```
 */
export const useImageDelete = ({ itemType, itemId }: ImageHookParams) => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, DeleteImageParams, { previous?: ImageItem[] }>({
        mutationFn: async ({ imageId }: DeleteImageParams) => {
            if (!itemId) {
                throw new Error('Cannot delete image: itemId is required')
            }

            await fetchRequest(`/api/${itemType}/${itemId}/image/${imageId}`, {
                method: 'DELETE',
            })
        },

        onMutate: async ({ imageId }: DeleteImageParams) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({
                queryKey: ['images', itemType, itemId],
            })

            // Snapshot the previous value
            const previous = queryClient.getQueryData<ImageItem[]>(['images', itemType, itemId])

            // Optimistically remove image from cache
            queryClient.setQueryData<ImageItem[]>(['images', itemType, itemId], old =>
                old ? old.filter(img => img.id !== imageId) : [],
            )

            // Return context with previous value for rollback
            return { previous }
        },

        onSuccess: (_data, { imageName }) => {
            toast.success(`Deleted ${imageName}`)
        },

        onError: (error: Error, { imageName }, context) => {
            // Rollback optimistic update
            if (context?.previous) {
                queryClient.setQueryData<ImageItem[]>(
                    ['images', itemType, itemId],
                    context.previous,
                )
            }

            toast.error(`Failed to delete ${imageName}: ${error.message}`)
        },

        // Refetch after mutation settles to ensure cache is in sync
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['images', itemType, itemId],
            })
        },
    })
}
