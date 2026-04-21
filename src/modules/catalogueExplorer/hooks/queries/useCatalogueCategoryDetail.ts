import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery } from '@tanstack/react-query'
import gql from 'graphql-tag'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import type { CategoryFormType } from '@/modules/catalogue/components/categoryEdit/types'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import { CATALOGUE_CATEGORY_DETAIL_QUERY_KEY } from '../../types/constants'

interface CategoryContextResponse {
    catalogueCategories: Array<{
        uid: string
        name: string
        code: string
        miniImageUrl?: string | null
        systemType?: { uid: string; name: string } | null
        parentPath?: Array<{ uid: string; name: string }> | null
        hasSubcategoryCatalogueCategoriesAggregate?: { count: number } | null
        catalogueItemsBelongsToCategoryAggregate?: { count: number } | null
    }>
}

const categoryContextQuery = gql`
    query CatalogueCategoryContextInExplorer($where: CatalogueCategoryWhere) {
        catalogueCategories(where: $where) {
            uid
            name
            code
            miniImageUrl
            systemType {
                uid
                name
            }
            parentPath {
                uid
                name
            }
            hasSubcategoryCatalogueCategoriesAggregate {
                count
            }
            catalogueItemsBelongsToCategoryAggregate {
                count
            }
        }
    }
` as TypedDocumentNode<CategoryContextResponse, Record<string, unknown>>

export interface CatalogueCategoryDetail {
    uid: string
    name: string
    code: string
    miniImageUrl?: string | null
    systemType?: { uid: string; name: string } | null
    parentPath?: Array<{ uid: string; name: string }> | null
    groups: NonNullable<CategoryFormType['groups']>
    physicalItemProperties: NonNullable<CategoryFormType['physicalItemProperties']>
    hasSubcategoryCatalogueCategoriesAggregate?: { count: number } | null
    catalogueItemsBelongsToCategoryAggregate?: { count: number } | null
}

export const useCatalogueCategoryDetail = (uid: string | null) => {
    const graphQL = useGraphQL(categoryContextQuery, {
        variables: { where: { uid } },
        customQueryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY, 'context', uid],
        enabled: !!uid,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const restQueryKey: QueryFetcherKey = ['catalogueCategoryEdit', { uid: uid ?? undefined }]
    const rest = useQuery({
        queryKey: restQueryKey,
        queryFn: queryFetcher<CategoryFormType>('catalogueCategoryEdit'),
        enabled: !!uid,
        staleTime: 60 * 1000,
    })

    const context = graphQL.data?.catalogueCategories?.[0] ?? null
    const restData = rest.data ?? null

    const category: CatalogueCategoryDetail | null =
        context && restData
            ? {
                  uid: context.uid,
                  name: context.name,
                  code: context.code,
                  miniImageUrl: context.miniImageUrl ?? restData.image ?? null,
                  systemType: context.systemType ?? restData.systemType ?? null,
                  parentPath: context.parentPath,
                  groups: restData.groups ?? [],
                  physicalItemProperties: restData.physicalItemProperties ?? [],
                  hasSubcategoryCatalogueCategoriesAggregate:
                      context.hasSubcategoryCatalogueCategoriesAggregate,
                  catalogueItemsBelongsToCategoryAggregate:
                      context.catalogueItemsBelongsToCategoryAggregate,
              }
            : null

    return {
        category,
        isLoading: graphQL.isLoading || rest.isLoading,
        error: graphQL.error || rest.error,
        refetch: () => {
            void graphQL.refetch()
            void rest.refetch()
        },
    }
}
