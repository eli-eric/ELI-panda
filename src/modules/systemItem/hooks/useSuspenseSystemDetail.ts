import { useEffect } from 'react'
import { toast } from 'sonner'

import { useSuspenseGraphQL } from '@/hooks/fetch/useGraphQL'
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
    code?: string
    uid?: string
}

/**
 * @deprecated The systemItem module is deprecated — system detail lives in
 * src/modules/systemHierarchy (/systems/hierarchy?leaf=<uid>). See
 * src/modules/systemItem/DEPRECATED.md.
 */
export const useSuspenseSystemDetail = ({ code, uid }: SearchPatterns) => {
    const { data, error, isLoading, refetch, status } = useSuspenseGraphQL(systemDetailQuery, {
        variables: {
            where: {
                deleted: false,
                uid,
                systemCode: code,
            },
        },
        refetchOnMount: 'always',
        refetchOnReconnect: 'always',
    })

    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch system detail')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, status, data])

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
    }
}
