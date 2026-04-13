import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import { gql } from '@/types/gql'

import { SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'

// Lightweight mutation for single field updates
const updateSystemFieldMutation = gql(`
  mutation UpdateSystemField(
    $where: SystemWhere!
    $update: SystemUpdateInput!
    $node: String
    $nodeUid: String
    $action: String
  ) {
    updateSystems(where: $where, update: $update) {
      systems {
        uid
        name
        systemCode
        systemLevel
        description
        location {
          uid
          name
        }
        zone {
          uid
          name
        }
        systemType {
          uid
          name
        }
        responsible {
          uid
          fullName
        }
        responsibleTeam {
          uid
          name
        }
      }
    }
    updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action)
  }
`)

// Mapping of field names to their GraphQL relationship structure
const RELATIONSHIP_FIELDS = [
    'locationUid',
    'zoneUid',
    'systemTypeUid',
    'responsibleUid',
    'responsibleTeamUid',
    'ownerUid',
] as const

type RelationshipField = (typeof RELATIONSHIP_FIELDS)[number]

const isRelationshipField = (fieldName: string): fieldName is RelationshipField => {
    return RELATIONSHIP_FIELDS.includes(fieldName as RelationshipField)
}

// Map field names to their GraphQL mutation keys
const FIELD_NAME_MAP: Record<string, string> = {
    locationUid: 'location',
    zoneUid: 'zone',
    systemTypeUid: 'systemType',
    responsibleUid: 'responsible',
    responsibleTeamUid: 'responsibleTeam',
    ownerUid: 'owner',
}

interface SystemFieldCache {
    location?: { uid: string } | null
    zone?: { uid: string } | null
    systemType?: { uid: string } | null
    responsible?: { uid: string } | null
    responsibleTeam?: { uid: string } | null
    owner?: { uid: string } | null
}

export const useSystemFieldUpdate = (currentSystem?: SystemFieldCache) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    // Track current relationship values in ref to handle consecutive updates correctly
    // This is needed because props don't update after optimistic saves
    const currentValuesRef = useRef<SystemFieldCache>({})
    const isInitializedRef = useRef(false)

    // Only sync ref with props on initial mount, not on every render
    // After that, the ref is updated by updateField after each successful save
    useEffect(() => {
        if (currentSystem && !isInitializedRef.current) {
            currentValuesRef.current = { ...currentSystem }
            isInitializedRef.current = true
        }
    }, [currentSystem])

    const { mutateAsync, isPending } = useGraphQLMutation(updateSystemFieldMutation, {
        onSuccess: () => {
            // Invalidate to sync sidebar, history, and other components
            // Components have optimistic state so they won't flicker
            queryClient.invalidateQueries({ queryKey: [SYSTEM_DETAIL_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: ['history'] })
        },
    })

    const updateField = useCallback(
        async (uid: string, fieldName: string, value: unknown) => {
            let update: Record<string, unknown>

            if (isRelationshipField(fieldName)) {
                // Get the GraphQL field name
                const gqlFieldName = FIELD_NAME_MAP[fieldName] ?? fieldName.replace('Uid', '')
                // Get current value for disconnect from our tracked ref
                const currentUid =
                    currentValuesRef.current[gqlFieldName as keyof SystemFieldCache]?.uid

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
                    currentValuesRef.current[gqlFieldName as keyof SystemFieldCache] = {
                        uid: value as string,
                    }
                } else {
                    currentValuesRef.current[gqlFieldName as keyof SystemFieldCache] = null
                }
            } else {
                // Scalar field - use value directly
                update = { [fieldName]: value }
            }

            const promise = mutateAsync({
                where: { uid },
                update,
                node: 'System',
                nodeUid: uid,
                action: 'UPDATE',
            })

            // Custom toast messages for systemCode
            if (fieldName === 'systemCode') {
                toast.promise(promise, {
                    loading: value
                        ? fm({ id: message.systemHierarchy.toast.generatingCode })
                        : fm({ id: message.systemHierarchy.toast.releasingCode }),
                    success: value
                        ? fm({ id: message.systemHierarchy.toast.codeGenerated })
                        : fm({ id: message.systemHierarchy.toast.codeReleased }),
                    error: err => {
                        // Check for duplicate error
                        const errorMsg = err?.message?.toLowerCase() || ''
                        if (
                            errorMsg.includes('duplicate') ||
                            errorMsg.includes('already exists') ||
                            errorMsg.includes('constraint')
                        ) {
                            return fm(
                                { id: message.systemHierarchy.toast.duplicateCode },
                                { code: String(value || '') },
                            )
                        }
                        return fm({ id: message.common.errors.somethingWentWrong })
                    },
                })
            } else {
                // Default toast for other fields
                toast.promise(promise, {
                    loading: fm({ id: message.systemHierarchy.toast.saving }),
                    success: fm({ id: message.systemHierarchy.toast.saved }),
                    error: fm({ id: message.common.errors.somethingWentWrong }),
                })
            }

            return promise
        },
        [fm, mutateAsync],
    )

    return {
        updateField,
        isPending,
    }
}
