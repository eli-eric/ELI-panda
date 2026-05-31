import type { QueryClient } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'
import { request } from 'graphql-request'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
// `useFragment` is a pure runtime cast (see src/types/gql/fragment-masking.ts) — the
// `use` prefix trips rules-of-hooks when called inside .map(). Alias to make intent clear.
import { gql, useFragment as unmaskFragment,useFragment } from '@/types/gql'
import {
    CatalogueItemFragment,
    PhysicalItemFragment,
    SystemDetailFragment,
    SystemFieldsFragment,
} from '@/utils/graphql/fragments'

import { SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'

const systemHierarchyDetailQuery = gql(`
  query SystemHierarchyDetail($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
    }
  }
`)

const fetchSystemDetail = (uid: string) =>
    request('/api/graphql', systemHierarchyDetailQuery, {
        where: { deleted: false, uid },
    })

export interface SparePartsForSystem {
    uid: string
    name: string | null
    physicalItem: {
        uid: string | null
        eun: string | null
        itemUsage: { uid: string } | null
    } | null
}

export interface OptimisticSystemHint {
    name: string
    systemCode?: string | null
    parentPath?: { uid: string; name: string }[]
}

// Seeds a partial SystemDetailFragment so the breadcrumb renders before the network
// resolves, then kicks off a background fetch to replace the seed with the full fragment.
// Background fetch is required because useSystemDetail uses refetchOnMount: false — a
// seed alone would otherwise stick and the consumer would never see physicalItem,
// operators, etc. Skips when an entry already exists (live cache or in-flight fetch).
export const primeSystemDetailCache = (
    queryClient: QueryClient,
    uid: string,
    hint: OptimisticSystemHint,
) => {
    if (queryClient.getQueryData([SYSTEM_DETAIL_QUERY_KEY, uid])) return
    queryClient.setQueryData([SYSTEM_DETAIL_QUERY_KEY, uid], {
        systems: [
            {
                __typename: 'System',
                uid,
                name: hint.name,
                systemCode: hint.systemCode ?? null,
                parentPath: (hint.parentPath ?? []).map(p => ({
                    __typename: 'System',
                    uid: p.uid,
                    name: p.name,
                    systemLevel: null,
                })),
            },
        ],
    })
    queryClient
        .fetchQuery({
            queryKey: [SYSTEM_DETAIL_QUERY_KEY, uid],
            queryFn: () => fetchSystemDetail(uid),
            staleTime: 60 * 1000,
        })
        .catch(() => {
            // errors surface via the active consumer's useQuery state
        })
}

export const useSystemDetail = (leafUid: string | null) => {
    const { data, error, isLoading, refetch } = useGraphQL(systemHierarchyDetailQuery, {
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
        placeholderData: keepPreviousData,
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

    const sparePartsEdges = systemDetail?.sparePartsConnection?.edges ?? []
    const sparePartsForSystems: SparePartsForSystem[] =
        systemDetail?.sparePartsFor?.map(s => {
            const fields = unmaskFragment(SystemFieldsFragment, s)
            const item = unmaskFragment(PhysicalItemFragment, s.physicalItem)
            return {
                uid: fields.uid,
                name: fields.name ?? null,
                physicalItem: item
                    ? {
                          uid: item.uid ?? null,
                          eun: item.eun ?? null,
                          itemUsage: item.itemUsage?.uid
                              ? { uid: item.itemUsage.uid }
                              : null,
                      }
                    : null,
            }
        }) ?? []

    return {
        system,
        physicalItem,
        catalogueItem,
        sparePartsEdges,
        sparePartsForSystems,
        sparePartsCoverageSum: systemDetail?.sparePartsCoverageSum ?? null,
        minimalSpareParstCount: systemDetail?.minimalSpareParstCount ?? null,
        refetch,
        isLoading,
        error,
    }
}
