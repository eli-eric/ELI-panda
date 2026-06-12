import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { PATH } from '@/types/constants/paths'
import { gql, useFragment } from '@/types/gql'
import {
    CatalogueItemFragment,
    PhysicalItemFragment,
    SystemDetailFragment,
} from '@/utils/graphql/fragments'

const systemDetailQuery = gql(`
  query SystemDetail($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
  }
   }
`)

type SearchPatterns = {
    alias?: string
    itemUid?: string
}

/**
 * @deprecated The systemItem module is deprecated — system detail lives in
 * src/modules/systemHierarchy (/systems/hierarchy?leaf=<uid>). See
 * src/modules/systemItem/DEPRECATED.md.
 */
export const useSystemDetail = (
    searchPatterns?: SearchPatterns,
    onSuccess?: (data: any) => void,
) => {
    const router = useRouter()
    const uid = router.query.uid as string | undefined

    const { system: systemEndpoint } = useEndpoint({ uid })

    const { data, error, isLoading, refetch, status } = useGraphQL(systemDetailQuery, {
        variables: {
            where: {
                deleted: false,
                uid,
                systemCode: searchPatterns?.alias,
                physicalItem: {
                    uid: searchPatterns?.itemUid,
                },
            },
        },
        enabled: !!uid || !!searchPatterns?.alias || !!searchPatterns?.itemUid,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })

    useEffect(() => {
        if (data?.systems.length === 0) {
            router.push(PATH.NOT_FOUND)
        }

        if (error) {
            toast.error('Failed to fetch system detail')
        }
        if (status === 'success') {
            onSuccess?.(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, status])

    const systemDetail = useFragment(SystemDetailFragment, data?.systems[0])
    const physicalItem = useFragment(PhysicalItemFragment, systemDetail?.physicalItem)
    const catalogueItem = useFragment(CatalogueItemFragment, physicalItem?.catalogueItem)

    return {
        systemDetail,
        physicalItem,
        catalogueItem,
        loading: isLoading,
        error,
        refetch,
        systemEndpoint,
    }
}
