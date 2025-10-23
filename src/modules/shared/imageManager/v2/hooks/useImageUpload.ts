import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetchRequest } from '@/core/http/fetchClient'

import type {
  ImageHookParams,
  ImageItem,
  ImageUploadPayload,
  ImageUploadResponse,
  UploadImageParams
} from '../types'

/**
 * Convert File to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Upload image with immediate feedback and optimistic updates
 *
 * Features:
 * - Converts File to base64 automatically
 * - Optimistic update: shows preview immediately
 * - Auto-rollback on error
 * - Toast notifications
 * - Updates React Query cache
 *
 * @param itemType - Type of item (e.g., 'catalogue', 'system')
 * @param itemId - UUID of the item
 * @returns Mutation object with upload function
 *
 * @example
 * ```tsx
 * const { mutate: uploadImage, isPending } = useImageUpload({
 *   itemType: FILE_TYPE.CATALOGUE,
 *   itemId: '123-456-789'
 * })
 *
 * const handleDrop = (files: File[]) => {
 *   files.forEach(file => uploadImage({ file }))
 * }
 * ```
 */
export const useImageUpload = ({ itemType, itemId }: ImageHookParams) => {
  const queryClient = useQueryClient()
  const endpoint = itemId ? `/api/${itemType}/${itemId}/image` : null

  return useMutation<ImageUploadResponse, Error, UploadImageParams, { previous?: ImageItem[] }>({
    mutationFn: async ({ file }: UploadImageParams) => {
      if (!endpoint) {
        throw new Error('Cannot upload image: itemId is required')
      }

      const payload = await fileToBase64(file)
      const uploadPayload: ImageUploadPayload = {
        name: file.name,
        payload
      }

      const response = await fetchRequest<ImageUploadResponse>(endpoint, {
        method: 'POST',
        body: uploadPayload
      })
      return response
    },

    onMutate: async ({ file }: UploadImageParams) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({
        queryKey: ['images', itemType, itemId]
      })

      // Snapshot the previous value
      const previous = queryClient.getQueryData<ImageItem[]>([
        'images',
        itemType,
        itemId
      ])

      // Optimistically update with temporary image
      const tempImage: ImageItem = {
        id: `temp-${Date.now()}-${Math.random()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        ts: Date.now(),
        size: file.size,
        tags: []
      }

      queryClient.setQueryData<ImageItem[]>(
        ['images', itemType, itemId],
        old => (old ? [tempImage, ...old] : [tempImage])
      )

      // Return context with previous value for rollback
      return { previous }
    },

    onSuccess: (uploadedImage: ImageUploadResponse) => {
      // Replace temp image with real image from server
      queryClient.setQueryData<ImageItem[]>(
        ['images', itemType, itemId],
        old => {
          if (!old) return []

          // Remove temp images and add the real one
          const withoutTemp = old.filter(img => !img.id.startsWith('temp-'))

          // Convert upload response to ImageItem
          const newImage: ImageItem = {
            ...uploadedImage,
            ts: Date.now(),
            size: 0 // Server doesn't return size in upload response
          }

          return [newImage, ...withoutTemp]
        }
      )

      toast.success(`Uploaded ${uploadedImage.name}`)
    },

    onError: (error: Error, { file }, context) => {
      // Rollback optimistic update
      if (context?.previous) {
        queryClient.setQueryData<ImageItem[]>(
          ['images', itemType, itemId],
          context.previous
        )
      }

      toast.error(`Failed to upload ${file.name}: ${error.message}`)
    },

    // Refetch after mutation settles (success or error)
    // This ensures we have the latest server state
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['images', itemType, itemId]
      })
    }
  })
}
