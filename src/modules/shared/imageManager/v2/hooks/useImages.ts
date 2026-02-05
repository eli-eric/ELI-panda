import { useQuery } from '@tanstack/react-query'

import { uniFetcher } from '@/utils/fetcher'

import type { ImageHookParams, ImageItem } from '../types'

/**
 * Fetch images for a specific item
 *
 * Uses React Query for caching and automatic refetching.
 * Images are sorted by timestamp (newest first) by the server.
 *
 * @param itemType - Type of item (e.g., 'catalogue', 'system')
 * @param itemId - UUID of the item
 * @returns Query result with images array
 *
 * @example
 * ```tsx
 * const { data: images, isLoading } = useImages({
 *   itemType: FILE_TYPE.CATALOGUE,
 *   itemId: '123-456-789'
 * })
 * ```
 */
export const useImages = ({ itemType, itemId }: ImageHookParams) => {
    return useQuery<ImageItem[]>({
        queryKey: ['images', itemType, itemId],
        queryFn: async () => {
            if (!itemId) return []
            return uniFetcher<ImageItem[]>(`/api/${itemType}/${itemId}/image`)
        },
        enabled: !!itemId,
        refetchOnMount: true,
        // Keep images fresh, refetch when user focuses window
        refetchOnWindowFocus: true,
        // Cache images for 5 minutes
        staleTime: 5 * 60 * 1000,
    })
}
