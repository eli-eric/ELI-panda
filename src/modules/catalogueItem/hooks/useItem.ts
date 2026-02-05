import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { CatalogueItem } from '../types/responses'

export const useCatalogueItem = () => {
    const router = useRouter()
    const catalogueUid = router.query.uid as string | undefined
    const queryKey: QueryFetcherKey = ['catalogueItem', { uid: catalogueUid }]

    const {
        data: item,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey,
        queryFn: queryFetcher<CatalogueItem>('catalogueItem'),
        enabled: !!catalogueUid,
    })

    const groups = useMemo(() => {
        const groupsUnsorted = item?.details
            ?.map(item => item.propertyGroup)
            .filter((value, index, self) => self.indexOf(value) === index)
        const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
        return groups
    }, [item])

    return { item: item, loading: isLoading, error, groups, refetch, queryKey }
}
