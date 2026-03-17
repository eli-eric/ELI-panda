import { useEffect } from 'react'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql, useFragment } from '@/types/gql'
import {
    CatalogueItemFragment,
    PhysicalItemFragment,
    SystemDetailFragment,
} from '@/utils/graphql/fragments'

import { SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'

const systemHierarchyDetailQuery = gql(`
  query SystemHierarchyDetail($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
    }
  }
`)

export const useSystemDetail = (leafUid: string | null) => {
    const { data, error, isLoading } = useGraphQL(systemHierarchyDetailQuery, {
        variables: {
            where: {
                deleted: false,
                uid: leafUid,
            },
        },
        customQueryKey: [SYSTEM_DETAIL_QUERY_KEY, leafUid],
        enabled: !!leafUid,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000, // 60 seconds
    })

    useEffect(() => {
        // Don't show toast for abort errors (caused by React Query cancellation)
        if (error && !error.message?.includes('abort')) {
            toast.error(`Error fetching system detail: ${error.message}`)
        }
    }, [error])

    const systemDetail = useFragment(SystemDetailFragment, data?.systems?.[0])
    const physicalItem = useFragment(PhysicalItemFragment, systemDetail?.physicalItem)
    const catalogueItem = useFragment(CatalogueItemFragment, physicalItem?.catalogueItem)

    // Map GraphQL response to SystemLeaf-like structure for compatibility
    const system = systemDetail
        ? {
              uid: systemDetail.uid,
              name: systemDetail.name,
              systemCode: systemDetail.systemCode ?? null,
              systemLevel: systemDetail.systemLevel ?? null,
              description: systemDetail.description ?? null,
              systemType: systemDetail.systemType ?? null,
              location: systemDetail.location ?? null,
              zone: systemDetail.zone ?? null,
              responsible: systemDetail.responsible
                  ? {
                        uid: systemDetail.responsible.uid,
                        name: systemDetail.responsible.fullName ?? '',
                    }
                  : null,
              responsibleTeam: systemDetail.responsibleTeam ?? null,
              owner: null, // Not in fragment, add if needed
              parentPath:
                  systemDetail.parentPath
                      ?.filter((p): p is NonNullable<typeof p> => p !== null)
                      .map(p => ({
                          uid: p.uid ?? '',
                          name: p.name ?? '',
                          systemLevel: p.systemLevel ?? null,
                      })) ?? null,
              physicalItem: physicalItem
                  ? {
                        uid: physicalItem.uid,
                        eun: physicalItem.eun ?? null,
                        name: physicalItem.name,
                        serialNumber: physicalItem.serialNumber ?? null,
                        notes: physicalItem.notes ?? null,
                        catalogueNumber: catalogueItem?.catalogueNumber ?? null,
                        itemUsage: physicalItem.itemUsage ?? null,
                        conditionStatus: physicalItem.conditionStatus ?? null,
                    }
                  : null,
              operators: systemDetail.operators ?? [],
              maintainedBy: systemDetail.maintainedBy ?? [],
              attribute: systemDetail.attribute ?? null,
              sparesIn: systemDetail.sparePartsConnection?.edges?.length ?? 0,
              sparesOut: systemDetail.sparePartsFor?.length ?? 0,
          }
        : null

    return {
        system,
        physicalItem,
        catalogueItem,
        isLoading,
        error,
    }
}
