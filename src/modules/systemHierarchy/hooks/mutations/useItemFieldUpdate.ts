import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import { gql } from '@/types/gql'

import { SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'
import type { ChangeValue, CodebookSnapshot, FieldChangeEntry } from '../../types/history'
import { buildChangeEntry, buildCodebookSnapshot } from '../../utils/fieldChangeBuilder'

// Lightweight mutation for single item field updates. The WAS_UPDATED_BY edge is recorded
// against the owning System node (not the Item) so the change surfaces in the system history
// feed — mirroring how systemItem records physical-item edits.
const updateItemFieldMutation = gql(`
  mutation UpdateItemField(
    $where: ItemWhere!
    $update: ItemUpdateInput!
    $node: String
    $nodeUid: String
    $action: String
    $changes: String
  ) {
    updateItems(where: $where, update: $update) {
      items {
        uid
        serialNumber
        notes
        itemUsage {
          uid
          name
        }
        conditionStatus {
          uid
          name
        }
      }
    }
    updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action, changes: $changes)
  }
`)

// Mapping of field names to their GraphQL relationship structure
const RELATIONSHIP_FIELDS = ['itemUsageUid', 'conditionStatusUid'] as const

type RelationshipField = (typeof RELATIONSHIP_FIELDS)[number]

const isRelationshipField = (fieldName: string): fieldName is RelationshipField => {
    return RELATIONSHIP_FIELDS.includes(fieldName as RelationshipField)
}

// Map field names to their GraphQL mutation keys
const FIELD_NAME_MAP: Record<string, string> = {
    itemUsageUid: 'itemUsage',
    conditionStatusUid: 'conditionStatus',
}

type CachedCodebook = { uid: string; name?: string } | null

interface ItemFieldCache {
    itemUsage?: { uid: string; name?: string | null } | null
    conditionStatus?: { uid: string; name?: string | null } | null
}

type CodebookCacheMap = {
    [K in keyof ItemFieldCache]: CachedCodebook
}

const normalizeCacheEntry = (
    value: ItemFieldCache[keyof ItemFieldCache] | undefined,
): CachedCodebook => {
    if (!value?.uid) return null
    const entry: { uid: string; name?: string } = { uid: value.uid }
    if (value.name) entry.name = value.name
    return entry
}

const toChangeValue = (value: unknown): ChangeValue | null => {
    if (value === null || value === undefined || value === '') return null
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value
    }
    return null
}

interface UpdateFieldOptions {
    displayName?: string | null
    previousValue?: unknown
}

export const useItemFieldUpdate = (systemUid: string, currentItem?: ItemFieldCache) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    // Track current relationship values in ref to handle consecutive updates correctly
    const currentValuesRef = useRef<CodebookCacheMap>({})
    const isInitializedRef = useRef(false)

    // Only sync ref with props on initial mount, not on every render
    // After that, the ref is updated by updateField after each successful save
    useEffect(() => {
        if (currentItem && !isInitializedRef.current) {
            currentValuesRef.current = {
                itemUsage: normalizeCacheEntry(currentItem.itemUsage),
                conditionStatus: normalizeCacheEntry(currentItem.conditionStatus),
            }
            isInitializedRef.current = true
        }
    }, [currentItem])

    const { mutateAsync, isPending } = useGraphQLMutation(updateItemFieldMutation, {
        onSuccess: () => {
            // Sync detail (sidebar/tab) and the system history feed
            queryClient.invalidateQueries({ queryKey: [SYSTEM_DETAIL_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: ['history'] })
        },
    })

    const updateField = useCallback(
        async (uid: string, fieldName: string, value: unknown, options?: UpdateFieldOptions) => {
            const displayName = options?.displayName
            let update: Record<string, unknown>
            let changeEntry: FieldChangeEntry | null = null

            if (isRelationshipField(fieldName)) {
                const gqlFieldName = FIELD_NAME_MAP[fieldName] ?? fieldName.replace('Uid', '')
                const cacheKey = gqlFieldName as keyof ItemFieldCache
                const cachedOld = currentValuesRef.current[cacheKey] ?? null
                const currentUid = cachedOld?.uid

                // Build relationship update - only include disconnect if there's something to disconnect
                const relationshipUpdate: Record<string, unknown> = {}
                if (value) {
                    relationshipUpdate.connect = { where: { node: { uid: value } } }
                }
                if (currentUid) {
                    relationshipUpdate.disconnect = { where: { node: { uid: currentUid } } }
                }

                update = { [gqlFieldName]: relationshipUpdate }

                const oldSnapshot: CodebookSnapshot | null = cachedOld?.name
                    ? buildCodebookSnapshot({ uid: cachedOld.uid, name: cachedOld.name })
                    : null
                const newSnapshot: CodebookSnapshot | null = value
                    ? buildCodebookSnapshot({ uid: value as string, name: displayName ?? undefined })
                    : null

                changeEntry = buildChangeEntry({
                    field: gqlFieldName,
                    oldValue: oldSnapshot,
                    newValue: newSnapshot,
                })

                // Update our tracked ref with the new value for future updates
                currentValuesRef.current[cacheKey] = value
                    ? { uid: value as string, ...(displayName ? { name: displayName } : {}) }
                    : null
            } else {
                // Scalar field - use value directly
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
                node: 'System',
                nodeUid: systemUid,
                action: 'UPDATE',
                changes: changesPayload,
            })

            toast.promise(promise, {
                loading: fm({ id: message.systemHierarchy.toast.saving }),
                success: fm({ id: message.systemHierarchy.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })

            return promise
        },
        [fm, mutateAsync, systemUid],
    )

    return {
        updateField,
        isPending,
    }
}
