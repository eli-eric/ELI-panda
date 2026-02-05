import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { queryFetcher } from '@/utils/fetcher'

import type { CatalogueItemDetail } from '../types/responses'

const useGroupDetails = (categoryUid?: string) => {
    const router = useRouter()
    const itemUid = router.query.uid as string | undefined
    const { data } = useQuery({
        queryKey: [
            'catalogueCategoryProperties',
            itemUid ? { uid: categoryUid, query: { itemUid } } : { uid: categoryUid },
        ],
        queryFn: queryFetcher<CatalogueItemDetail[]>('catalogueCategoryProperties'),
    })

    const groups = useMemo(() => {
        const groupsUnsorted = data
            ?.map(item => item.propertyGroup)
            .filter((value, index, self) => self.indexOf(value) === index)

        const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
        return groups
    }, [data])

    return { groupDetails: data, groups }
}

export default useGroupDetails
