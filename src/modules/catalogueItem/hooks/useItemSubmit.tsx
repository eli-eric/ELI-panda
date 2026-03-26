import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import type { UseFormSetValue } from 'react-hook-form'
import { toast } from 'sonner'

import { PATH } from '@/types/constants/paths'
import type { AxiosError } from '@/types/http'
import { navigateBack } from '@/utils'
import { queryMutate } from '@/utils/fetcher'

import type { CatalogueItem } from '../types/responses'
import { useCatalogueItem } from './useItem'

export const useItemSubmit = ({
    setvalue,
    saveAndExit,
    reset,
}: {
    setvalue: UseFormSetValue<any>
    saveAndExit?: boolean
    reset?: (data?: any) => void
}) => {
    const { query, replace } = useRouter()
    const uid = query.uid as string | undefined

    const { queryKey } = useCatalogueItem()

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: ['catalogueItemCreateUpdate', { uid }],
        mutationFn: queryMutate<CatalogueItem, CatalogueItem>(
            'catalogueItem',
            uid ? 'put' : 'post',
            { uid },
        ),
        onSuccess: catalogueItem => {
            if (uid) {
                queryClient.setQueryData(queryKey, catalogueItem.data)
            }
            queryClient.invalidateQueries({ queryKey: ['catalogueItems', queryKey] })

            setvalue('lastUpdateTime', catalogueItem.data?.lastUpdateTime)

            // Convert API array response back to object structure for form
            // Form stores details as object with UID keys: { [propertyUid]: detail }
            // API returns details as array: [{ property: { uid, ... }, value, ... }]
            const detailsObject = catalogueItem.data?.details?.reduce(
                (acc, detail) => {
                    if (detail.property?.uid) {
                        acc[detail.property.uid] = detail
                    }
                    return acc
                },
                {} as Record<string, any>,
            )

            const formData = {
                ...catalogueItem.data,
                details: detailsObject || {},
            }

            // Reset form with converted data to match form structure
            // This prevents "unsaved changes" warning after successful save
            if (reset && catalogueItem.data) {
                reset(formData)
            }

            // Images are now uploaded independently via ImageGalleryV2
            // No need to coordinate image submission with form submission
            if (saveAndExit) {
                navigateBack()
            } else {
                if (!uid) {
                    replace(PATH.CATALOGUE_ITEM + '/' + catalogueItem.data?.uid)
                }
            }
            toast.success('Item saved')

            // Note: No need to refetch() here - cache is already updated via setQueryData above
            // The form will be synced via useEffect in the container component
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 409) {
                toast.error('Item with was edited by another user')
            } else {
                toast.error('Failed to save item: ' + error.message)
            }
        },
    })

    return { submit: mutate, loading: isPending }
}
