import { useCallback, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import { gql } from '@/types/gql'

// Lightweight mutation for single item field updates
const updateItemFieldMutation = gql(`
  mutation UpdateItemField(
    $where: ItemWhere!
    $update: ItemUpdateInput!
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

interface ItemFieldCache {
    itemUsage?: { uid: string } | null
    conditionStatus?: { uid: string } | null
}

export const useItemFieldUpdate = (currentItem?: ItemFieldCache) => {
    const { formatMessage: fm } = useIntl()

    // Track current relationship values in ref to handle consecutive updates correctly
    const currentValuesRef = useRef<ItemFieldCache>({})
    const isInitializedRef = useRef(false)

    // Only sync ref with props on initial mount, not on every render
    // After that, the ref is updated by updateField after each successful save
    useEffect(() => {
        if (currentItem && !isInitializedRef.current) {
            currentValuesRef.current = { ...currentItem }
            isInitializedRef.current = true
        }
    }, [currentItem])

    const { mutateAsync, isPending } = useGraphQLMutation(updateItemFieldMutation)

    const updateField = useCallback(
        async (uid: string, fieldName: string, value: unknown) => {
            let update: Record<string, unknown>

            if (isRelationshipField(fieldName)) {
                // Get the GraphQL field name
                const gqlFieldName = FIELD_NAME_MAP[fieldName] ?? fieldName.replace('Uid', '')
                // Get current value for disconnect from our tracked ref
                const currentUid =
                    currentValuesRef.current[gqlFieldName as keyof ItemFieldCache]?.uid

                // Build relationship update - only include disconnect if there's something to disconnect
                const relationshipUpdate: Record<string, unknown> = {}
                if (value) {
                    relationshipUpdate.connect = { where: { node: { uid: value } } }
                }
                if (currentUid) {
                    relationshipUpdate.disconnect = { where: { node: { uid: currentUid } } }
                }

                update = { [gqlFieldName]: relationshipUpdate }

                // Update our tracked ref with the new value for future updates
                if (value) {
                    currentValuesRef.current[gqlFieldName as keyof ItemFieldCache] = {
                        uid: value as string,
                    }
                } else {
                    currentValuesRef.current[gqlFieldName as keyof ItemFieldCache] = null
                }
            } else {
                // Scalar field - use value directly
                update = { [fieldName]: value }
            }

            const promise = mutateAsync({
                where: { uid },
                update,
            })

            toast.promise(promise, {
                loading: fm({ id: message.systemHierarchy.toast.saving }),
                success: fm({ id: message.systemHierarchy.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })

            return promise
        },
        [fm, mutateAsync],
    )

    return {
        updateField,
        isPending,
    }
}
