import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from '@/types/http'
import { toast } from 'sonner'

import { queryMutate } from '@/utils/fetcher'

import type { CatalogueItem } from '../types/responses'

/**
 * Hook for creating new catalogue items (POST only)
 * Simplified version without navigation or router dependencies
 * Ideal for use in dialogs and modals
 *
 * @param itemName - Optional item name for success message customization
 */
export const useItemCreate = (itemName?: string) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: ['catalogueItemCreate'],
        mutationFn: queryMutate<CatalogueItem, CatalogueItem>('catalogueItem', 'post'),
        onSuccess: catalogueItem => {
            // Invalidate all catalogue items queries to ensure consistency
            // This is necessary because the new item may be relevant for various filtered views
            queryClient.invalidateQueries({ queryKey: ['catalogueItems'] })

            const name = catalogueItem.data?.name || itemName || 'Item'
            toast.success(`"${name}" was successfully created`)
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            if (error.response?.status === 409) {
                toast.error('Item already exists with this catalogue number')
            } else if (error.response?.status === 400) {
                toast.error('Invalid data provided. Please check the form.')
            } else {
                const errorMsg = error.response?.data?.message || error.message
                toast.error(`Failed to save item: ${errorMsg}`)
            }
        },
    })

    return { submit: mutate, loading: isPending }
}
