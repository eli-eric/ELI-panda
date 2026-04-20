import { useCallback } from 'react'

import type { SystemLeaf } from '../../types'
import { useSystemFieldUpdate } from './useSystemFieldUpdate'

export const useSystemCodeClear = (system: SystemLeaf) => {
    const { updateField, isPending } = useSystemFieldUpdate({
        location: system.location,
        zone: system.zone,
        systemType: system.systemType,
    })

    const clearCode = useCallback(async () => {
        await updateField(system.uid, 'systemCode', null, { previousValue: system.systemCode })
    }, [system.uid, system.systemCode, updateField])

    return {
        clearCode,
        isClearing: isPending,
    }
}
