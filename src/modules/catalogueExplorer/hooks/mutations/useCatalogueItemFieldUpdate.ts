import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQueryClient } from '@tanstack/react-query'
import gql from 'graphql-tag'
import { useCallback, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import {
    buildChangeEntry,
    buildCodebookSnapshot,
} from '@/modules/systemHierarchy/utils/fieldChangeBuilder'
import type {
    ChangeValue,
    CodebookSnapshot,
    FieldChangeEntry,
} from '@/modules/systemItem/types/responses'

import {
    CATALOGUE_CATEGORIES_QUERY_KEY,
    CATALOGUE_ITEM_DETAIL_QUERY_KEY,
    CATALOGUE_ITEM_HISTORY_QUERY_KEY,
} from '../../types/constants'

const updateCatalogueItemFieldMutation = gql`
    mutation UpdateCatalogueItemField(
        $where: CatalogueItemWhere!
        $update: CatalogueItemUpdateInput!
        $node: String
        $nodeUid: String
        $action: String
        $changes: String
    ) {
        updateCatalogueItems(where: $where, update: $update) {
            catalogueItems {
                uid
                name
                catalogueNumber
                description
                manufacturerUrl
                catalogueCategory {
                    uid
                    name
                }
                supplier {
                    uid
                    name
                }
            }
        }
        updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action, changes: $changes)
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

const RELATIONSHIP_FIELDS = ['categoryUid', 'supplierUid'] as const
type RelationshipField = (typeof RELATIONSHIP_FIELDS)[number]
const isRelationshipField = (fieldName: string): fieldName is RelationshipField =>
    (RELATIONSHIP_FIELDS as readonly string[]).includes(fieldName)

const FIELD_NAME_MAP: Record<RelationshipField, string> = {
    categoryUid: 'catalogueCategory',
    supplierUid: 'supplier',
}

type CachedCodebook = { uid: string; name?: string; code?: string } | null

export interface CatalogueItemFieldCacheInput {
    name?: string | null
    catalogueNumber?: string | null
    description?: string | null
    manufacturerUrl?: string | null
    catalogueCategory?: { uid: string; name?: string | null; code?: string | null } | null
    supplier?: { uid: string; name?: string | null; code?: string | null } | null
}

type RelCacheKey = 'catalogueCategory' | 'supplier'

const normalizeCacheEntry = (
    value: CatalogueItemFieldCacheInput['catalogueCategory'] | undefined,
): CachedCodebook => {
    if (!value?.uid) return null
    const entry: { uid: string; name?: string; code?: string } = { uid: value.uid }
    if (value.name) entry.name = value.name
    if (value.code) entry.code = value.code
    return entry
}

const toChangeValue = (value: unknown): ChangeValue | null => {
    if (value === null || value === undefined || value === '') return null
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value
    }
    return null
}

export const useCatalogueItemFieldUpdate = (currentItem?: CatalogueItemFieldCacheInput) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const currentRelRef = useRef<Record<RelCacheKey, CachedCodebook>>({
        catalogueCategory: null,
        supplier: null,
    })
    const isInitializedRef = useRef(false)

    useEffect(() => {
        if (currentItem && !isInitializedRef.current) {
            currentRelRef.current = {
                catalogueCategory: normalizeCacheEntry(currentItem.catalogueCategory),
                supplier: normalizeCacheEntry(currentItem.supplier),
            }
            isInitializedRef.current = true
        }
    }, [currentItem])

    const { mutateAsync, isPending } = useGraphQLMutation(updateCatalogueItemFieldMutation, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_ITEM_DETAIL_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORIES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_ITEM_HISTORY_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: ['catalogueItem'] })
            queryClient.invalidateQueries({ queryKey: ['catalogueItems'] })
        },
    })

    const updateField = useCallback(
        async (
            uid: string,
            fieldName: string,
            value: unknown,
            options?: { displayName?: string | null; previousValue?: unknown },
        ) => {
            const displayName = options?.displayName
            let update: Record<string, unknown>
            let changeEntry: FieldChangeEntry | null = null

            if (isRelationshipField(fieldName)) {
                const gqlFieldName = FIELD_NAME_MAP[fieldName] as RelCacheKey
                const cachedOld = currentRelRef.current[gqlFieldName] ?? null
                const currentUid = cachedOld?.uid

                const relationshipUpdate: Record<string, unknown> = {}
                if (value) {
                    relationshipUpdate.connect = { where: { node: { uid: value } } }
                }
                if (currentUid) {
                    relationshipUpdate.disconnect = { where: { node: { uid: currentUid } } }
                }
                update = { [gqlFieldName]: relationshipUpdate }

                const oldSnapshot: CodebookSnapshot | null = cachedOld?.name
                    ? buildCodebookSnapshot({
                          uid: cachedOld.uid,
                          name: cachedOld.name,
                          code: cachedOld.code,
                      })
                    : null
                const newSnapshot: CodebookSnapshot | null = value
                    ? buildCodebookSnapshot({
                          uid: value as string,
                          name: displayName ?? undefined,
                      })
                    : null

                changeEntry = buildChangeEntry({
                    field: gqlFieldName,
                    oldValue: oldSnapshot,
                    newValue: newSnapshot,
                })

                if (value) {
                    currentRelRef.current[gqlFieldName] = {
                        uid: value as string,
                        ...(displayName ? { name: displayName } : {}),
                    }
                } else {
                    currentRelRef.current[gqlFieldName] = null
                }
            } else {
                update = { [fieldName]: value }
                changeEntry = buildChangeEntry({
                    field: fieldName,
                    oldValue: toChangeValue(options?.previousValue),
                    newValue: toChangeValue(value),
                })
            }

            const changesPayload = changeEntry ? JSON.stringify([changeEntry]) : undefined

            const promise = mutateAsync({
                where: { uid },
                update,
                node: 'CatalogueItem',
                nodeUid: uid,
                action: 'UPDATE',
                changes: changesPayload,
            })

            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.saving }),
                success: fm({ id: message.catalogue.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })

            return promise
        },
        [fm, mutateAsync],
    )

    return { updateField, isPending }
}
