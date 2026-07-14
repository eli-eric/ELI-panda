import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import {
    guardSystemEdit,
    SYSTEM_CAN_EDIT_QUERY_KEY,
} from '@/modules/shared/system/edit-permission'
import { gql } from '@/types/gql'

import { SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'
import type { ChangeValue, CodebookSnapshot, FieldChangeEntry } from '../../types/history'
import { buildChangeEntry, buildCodebookSnapshot } from '../../utils/fieldChangeBuilder'

// Changing responsibility can revoke the current user's own edit rights, so the
// cached can-edit result must be re-derived after these saves.
const RESPONSIBILITY_FIELDS = ['responsibleUid', 'responsibleTeamUid']

// Lightweight mutation for single field updates
const updateSystemFieldMutation = gql(`
  mutation UpdateSystemField(
    $where: SystemWhere!
    $update: SystemUpdateInput!
    $node: String
    $nodeUid: String
    $action: String
    $changes: String
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
    updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action, changes: $changes)
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

type CachedCodebook = { uid: string; name?: string; code?: string } | null

interface SystemFieldCache {
    location?: { uid: string; name?: string; code?: string | null } | null
    zone?: { uid: string; name?: string; code?: string | null } | null
    systemType?: { uid: string; name?: string; code?: string | null } | null
    responsible?: { uid: string; name?: string; code?: string | null } | null
    responsibleTeam?: { uid: string; name?: string; code?: string | null } | null
    owner?: { uid: string; name?: string; code?: string | null } | null
}

type CodebookCacheMap = {
    [K in keyof SystemFieldCache]: CachedCodebook
}

const normalizeCacheEntry = (
    value: SystemFieldCache[keyof SystemFieldCache] | undefined,
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

export const useSystemFieldUpdate = (currentSystem?: SystemFieldCache) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    // Track current relationship values in ref to handle consecutive updates correctly
    // This is needed because props don't update after optimistic saves
    const currentValuesRef = useRef<CodebookCacheMap>({})
    const isInitializedRef = useRef(false)

    // Only sync ref with props on initial mount, not on every render
    // After that, the ref is updated by updateField after each successful save
    useEffect(() => {
        if (currentSystem && !isInitializedRef.current) {
            currentValuesRef.current = {
                location: normalizeCacheEntry(currentSystem.location),
                zone: normalizeCacheEntry(currentSystem.zone),
                systemType: normalizeCacheEntry(currentSystem.systemType),
                responsible: normalizeCacheEntry(currentSystem.responsible),
                responsibleTeam: normalizeCacheEntry(currentSystem.responsibleTeam),
                owner: normalizeCacheEntry(currentSystem.owner),
            }
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
        async (
            uid: string,
            fieldName: string,
            value: unknown,
            options?: { displayName?: string | null; previousValue?: unknown },
        ) => {
            // Hard guard: never let an unpermitted GraphQL patch reach the server,
            // regardless of whether the UI disabled the field.
            if (!(await guardSystemEdit(queryClient, uid, fm))) return

            const displayName = options?.displayName
            let update: Record<string, unknown>
            let changeEntry: FieldChangeEntry | null = null

            if (isRelationshipField(fieldName)) {
                // Get the GraphQL field name
                const gqlFieldName = FIELD_NAME_MAP[fieldName] ?? fieldName.replace('Uid', '')
                const cacheKey = gqlFieldName as keyof SystemFieldCache
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

                // Update our tracked ref with the new value for future updates
                if (value) {
                    currentValuesRef.current[cacheKey] = {
                        uid: value as string,
                        ...(displayName ? { name: displayName } : {}),
                    }
                } else {
                    currentValuesRef.current[cacheKey] = null
                }
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
                nodeUid: uid,
                action: 'UPDATE',
                changes: changesPayload,
            })

            // A responsible/team change may have revoked the user's own access —
            // re-derive can-edit once the save lands.
            if (RESPONSIBILITY_FIELDS.includes(fieldName)) {
                void promise
                    .then(() =>
                        queryClient.invalidateQueries({ queryKey: [SYSTEM_CAN_EDIT_QUERY_KEY] }),
                    )
                    // The failure itself is surfaced by the toast.promise below; this
                    // side-chain only needs to avoid an unhandled rejection.
                    .catch(() => {})
            }

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
        [fm, mutateAsync, queryClient],
    )

    return {
        updateField,
        isPending,
    }
}
