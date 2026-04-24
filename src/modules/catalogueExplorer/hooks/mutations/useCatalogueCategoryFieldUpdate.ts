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
    CATALOGUE_CATEGORY_DETAIL_QUERY_KEY,
} from '../../types/constants'

const updateCatalogueCategoryFieldMutation = gql`
    mutation UpdateCatalogueCategoryField(
        $where: CatalogueCategoryWhere!
        $update: CatalogueCategoryUpdateInput!
        $node: String
        $nodeUid: String
        $action: String
        $changes: String
    ) {
        updateCatalogueCategories(where: $where, update: $update) {
            catalogueCategories {
                uid
                name
                code
                systemType {
                    uid
                    name
                }
            }
        }
        updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action, changes: $changes)
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

const RELATIONSHIP_FIELDS = ['systemTypeUid'] as const
type RelationshipField = (typeof RELATIONSHIP_FIELDS)[number]
const isRelationshipField = (name: string): name is RelationshipField =>
    (RELATIONSHIP_FIELDS as readonly string[]).includes(name)

const FIELD_NAME_MAP: Record<RelationshipField, 'systemType'> = {
    systemTypeUid: 'systemType',
}

type CachedCodebook = { uid: string; name?: string; code?: string } | null

export interface CatalogueCategoryFieldCacheInput {
    name?: string | null
    code?: string | null
    systemType?: { uid: string; name?: string | null; code?: string | null } | null
}

const normalizeCacheEntry = (
    value: CatalogueCategoryFieldCacheInput['systemType'] | undefined,
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

export const useCatalogueCategoryFieldUpdate = (
    currentCategory?: CatalogueCategoryFieldCacheInput,
) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const currentRelRef = useRef<{ systemType: CachedCodebook }>({ systemType: null })
    const initRef = useRef(false)

    useEffect(() => {
        if (currentCategory && !initRef.current) {
            currentRelRef.current = {
                systemType: normalizeCacheEntry(currentCategory.systemType),
            }
            initRef.current = true
        }
    }, [currentCategory])

    const { mutateAsync, isPending } = useGraphQLMutation(updateCatalogueCategoryFieldMutation, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORIES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: ['catalogueCategoryEdit'] })
            queryClient.invalidateQueries({ queryKey: ['catalogueCategoryHistory'] })
        },
    })

    const updateField = useCallback(
        async (
            uid: string,
            fieldName: string,
            value: unknown,
            options?: {
                displayName?: string | null
                previousValue?: unknown
                extraScalars?: Record<string, { value: unknown; previousValue?: unknown }>
            },
        ) => {
            const displayName = options?.displayName
            let update: Record<string, unknown>
            let changeEntry: FieldChangeEntry | null = null

            if (isRelationshipField(fieldName)) {
                const gqlFieldName = FIELD_NAME_MAP[fieldName]
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

            const extraEntries: FieldChangeEntry[] = []
            if (options?.extraScalars) {
                for (const [extraField, extra] of Object.entries(options.extraScalars)) {
                    update[extraField] = extra.value
                    const entry = buildChangeEntry({
                        field: extraField,
                        oldValue: toChangeValue(extra.previousValue),
                        newValue: toChangeValue(extra.value),
                    })
                    if (entry) extraEntries.push(entry)
                }
            }

            const allEntries = [changeEntry, ...extraEntries].filter(
                (e): e is FieldChangeEntry => e !== null,
            )
            const changesPayload = allEntries.length > 0 ? JSON.stringify(allEntries) : undefined

            const promise = mutateAsync({
                where: { uid },
                update,
                node: 'CatalogueCategory',
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
