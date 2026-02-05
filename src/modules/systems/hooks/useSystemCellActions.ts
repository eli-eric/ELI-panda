import type { Row } from '@tanstack/react-table'

import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import type { SystemDetail } from '@/types/responses/systems'

export const useSystemCellActions = (
    row: Row<SystemDetail>,
    setUid?: (uid: string | null) => void,
) => {
    const { original } = row
    const openEdit = useSystemEditSheet()

    const handleExpand = () => {
        if (!row.getIsExpanded()) {
            setUid?.(original.uid)
        }
        row.toggleExpanded()
    }

    const handleOpenEdit = () => {
        openEdit(original.uid)
    }

    return {
        handleExpand,
        handleOpenEdit,
        hasSubsystems: original.hasSubsystems,
    }
}
