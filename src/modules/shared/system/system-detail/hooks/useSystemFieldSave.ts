import { useCallback } from 'react'

import { usePermission } from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import type { PhysicalItemPatchFields, SystemPatchFields } from '../types'
import { usePhysicalItemPatch } from './mutations/usePhysicalItemPatch'
import { useSystemPatch } from './mutations/useSystemPatch'

/**
 * Inline-field adapter over the PATCH hooks: `onSave` handlers resolve to void and
 * reject on failure / declined soft lock, which makes the inline field revert.
 * `readOnly` is the role gate only — responsibility never disables a field.
 */
export const useSystemFieldSave = (systemUid: string) => {
    const readOnly = !usePermission([ROLE.SYSTEM_EDIT])
    const { patchSystem, isPending: isSystemPending } = useSystemPatch(systemUid)
    const { patchPhysicalItem, isPending: isItemPending } = usePhysicalItemPatch(systemUid)

    const saveSystem = useCallback(
        async (fields: SystemPatchFields) => {
            await patchSystem(fields)
        },
        [patchSystem],
    )

    const savePhysicalItem = useCallback(
        async (fields: PhysicalItemPatchFields) => {
            await patchPhysicalItem(fields)
        },
        [patchPhysicalItem],
    )

    return {
        saveSystem,
        savePhysicalItem,
        readOnly,
        isPending: isSystemPending || isItemPending,
    }
}

/** Empty inline input → explicit null (clear), anything else trimmed as-is. */
export const toNullableText = (value: string): string | null => {
    const trimmed = value.trim()
    return trimmed === '' ? null : trimmed
}

export const toUidRef = (uid: string | null | undefined) => (uid ? { uid } : null)
