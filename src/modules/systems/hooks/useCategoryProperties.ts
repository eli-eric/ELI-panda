import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { queryFetcher } from '@/utils/fetcher'

export const useCategoryProperties = (uid?: string) => {
    const { data, error } = useQuery({
        queryKey: ['catalogueCategoryProperties', { uid }],
        queryFn: queryFetcher<CatalogueItemDetail[]>('catalogueCategoryProperties'),
        enabled: !!uid,
    })

    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch category properties')
        }
    }, [error])

    return { catalogueCategoryProperties: data }
}
