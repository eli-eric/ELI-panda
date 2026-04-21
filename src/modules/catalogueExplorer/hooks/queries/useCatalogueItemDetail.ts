import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery } from '@tanstack/react-query'
import gql from 'graphql-tag'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import type { CatalogueItem as CatalogueItemRest } from '@/modules/catalogueItem/types/responses'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import { CATALOGUE_ITEM_DETAIL_QUERY_KEY } from '../../types/constants'

interface CatalogueItemContextResponse {
    catalogueItems: Array<{
        uid: string
        catalogueCategory?: {
            uid: string
            name: string
            parentPath?: Array<{ uid: string; name: string }> | null
        } | null
        supplier?: { uid: string; name: string } | null
        itemAggregate?: { count: number } | null
        relatedCatalogueItemsAggregate?: { count: number } | null
    }>
}

const itemContextQuery = gql`
    query CatalogueItemContextInExplorer($where: CatalogueItemWhere) {
        catalogueItems(where: $where) {
            uid
            catalogueCategory {
                uid
                name
                parentPath {
                    uid
                    name
                }
            }
            supplier {
                uid
                name
            }
            itemAggregate {
                count
            }
            relatedCatalogueItemsAggregate {
                count
            }
        }
    }
` as TypedDocumentNode<CatalogueItemContextResponse, Record<string, unknown>>

export interface CatalogueItemExplorerDetail {
    uid: string
    name: string
    catalogueNumber: string
    description?: string | null
    manufacturerUrl?: string | null
    miniImageUrl?: string | null
    lastUpdateTime?: string | null
    lastUpdateBy?: string | null
    catalogueCategory: {
        uid: string
        name: string
        parentPath?: Array<{ uid: string; name: string }> | null
    } | null
    supplier: { uid: string; name: string } | null
    physicalItemsCount: number
    relatedItemsCount: number
}

type CatalogueItemWithAudit = CatalogueItemRest & { lastUpdateBy?: string | null }

export const useCatalogueItemDetail = (uid: string | null) => {
    const graphQL = useGraphQL(itemContextQuery, {
        variables: { where: { uid } },
        customQueryKey: [CATALOGUE_ITEM_DETAIL_QUERY_KEY, 'context', uid],
        enabled: !!uid,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const restKey: QueryFetcherKey = ['catalogueItem', { uid: uid ?? undefined }]
    const rest = useQuery({
        queryKey: restKey,
        queryFn: queryFetcher<CatalogueItemWithAudit>('catalogueItem'),
        enabled: !!uid,
        staleTime: 60 * 1000,
    })

    const context = graphQL.data?.catalogueItems?.[0] ?? null
    const restData = rest.data ?? null

    const item: CatalogueItemExplorerDetail | null =
        restData && context
            ? {
                  uid: restData.uid,
                  name: restData.name,
                  catalogueNumber: restData.catalogueNumber,
                  description: restData.description ?? null,
                  manufacturerUrl: restData.manufacturerUrl ?? null,
                  miniImageUrl: null,
                  lastUpdateTime: restData.lastUpdateTime ?? null,
                  lastUpdateBy: (restData as CatalogueItemWithAudit).lastUpdateBy ?? null,
                  catalogueCategory:
                      context.catalogueCategory ??
                      (restData.category
                          ? {
                                uid: restData.category.uid,
                                name: restData.category.name,
                                parentPath: null,
                            }
                          : null),
                  supplier:
                      context.supplier ??
                      (restData.supplier
                          ? { uid: restData.supplier.uid, name: restData.supplier.name }
                          : null),
                  physicalItemsCount: context.itemAggregate?.count ?? 0,
                  relatedItemsCount: context.relatedCatalogueItemsAggregate?.count ?? 0,
              }
            : null

    return {
        item,
        isLoading: graphQL.isLoading || rest.isLoading,
        error: graphQL.error || rest.error,
        refetch: () => {
            void graphQL.refetch()
            void rest.refetch()
        },
    }
}
