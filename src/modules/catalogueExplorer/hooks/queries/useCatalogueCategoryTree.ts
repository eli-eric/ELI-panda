import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import gql from 'graphql-tag'
import { useMemo } from 'react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import type { CatalogueCategoryFlat, CatalogueCategoryTreeNode } from '../../types'
import { CATALOGUE_CATEGORIES_QUERY_KEY } from '../../types/constants'
import { buildCategoryTree } from '../../utils/buildCategoryTree'

interface CatalogueCategoriesTreeResponse {
    catalogueCategories: Array<{
        uid: string
        name: string
        code: string
        miniImageUrl?: string | null
        systemType?: { uid: string; name: string } | null
        parentCategory?: { uid: string } | null
        catalogueItemsBelongsToCategoryAggregate?: {
            count: number
        } | null
    }>
}

const query = gql`
    query CatalogueCategoriesTree {
        catalogueCategories {
            uid
            name
            code
            miniImageUrl
            systemType {
                uid
                name
            }
            parentCategory {
                uid
            }
            catalogueItemsBelongsToCategoryAggregate {
                count
            }
        }
    }
` as TypedDocumentNode<CatalogueCategoriesTreeResponse, Record<string, unknown>>

export const useCatalogueCategoryTree = () => {
    const { data, isLoading, error, refetch } = useGraphQL(query, {
        customQueryKey: [CATALOGUE_CATEGORIES_QUERY_KEY],
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const flat = useMemo<CatalogueCategoryFlat[]>(
        () =>
            (data?.catalogueCategories ?? []).map(c => ({
                uid: c.uid,
                name: c.name,
                code: c.code,
                miniImageUrl: c.miniImageUrl ?? null,
                systemType: c.systemType ?? null,
                parentCategory: c.parentCategory ?? null,
                itemCount: c.catalogueItemsBelongsToCategoryAggregate?.count ?? 0,
            })),
        [data],
    )

    const tree = useMemo<CatalogueCategoryTreeNode[]>(() => buildCategoryTree(flat), [flat])

    return { tree, flat, isLoading, error, refetch }
}
