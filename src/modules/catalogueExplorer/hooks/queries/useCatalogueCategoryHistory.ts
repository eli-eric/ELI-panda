import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import gql from 'graphql-tag'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import type { FieldChangeEntry } from '@/modules/systemItem/types/responses'

import type { CatalogueHistoryEntry } from './useCatalogueItemHistory'

interface CatalogueCategoryHistoryResponse {
    catalogueCategories: Array<{
        uid: string
        updatedByConnection: {
            edges: Array<{
                at: string
                action: string
                changes?: string | null
                node: { uid: string; firstName: string; lastName: string }
            }>
        }
    }>
}

const query = gql`
    query CatalogueCategoryHistoryInExplorer($where: CatalogueCategoryWhere) {
        catalogueCategories(where: $where) {
            uid
            updatedByConnection {
                edges {
                    at
                    action
                    changes
                    node {
                        uid
                        firstName
                        lastName
                    }
                }
            }
        }
    }
` as TypedDocumentNode<CatalogueCategoryHistoryResponse, Record<string, unknown>>

const parseChanges = (raw?: string | null): FieldChangeEntry[] => {
    if (!raw) return []
    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? (parsed as FieldChangeEntry[]) : []
    } catch {
        return []
    }
}

export const useCatalogueCategoryHistory = (uid: string | null) => {
    const { data, isLoading, error, refetch } = useGraphQL(query, {
        variables: { where: { uid } },
        customQueryKey: ['catalogueCategoryHistory', uid],
        enabled: !!uid,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    })

    const entries: CatalogueHistoryEntry[] =
        data?.catalogueCategories?.[0]?.updatedByConnection?.edges?.map(e => ({
            at: e.at,
            action: e.action,
            changes: parseChanges(e.changes),
            user: {
                uid: e.node.uid,
                fullName: `${e.node.firstName ?? ''} ${e.node.lastName ?? ''}`.trim() || null,
            },
        })) ?? []

    const sortedEntries = [...entries].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
    )

    return { entries: sortedEntries, isLoading, error, refetch }
}
