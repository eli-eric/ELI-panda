import type { Row } from '@tanstack/react-table'

import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import type { SystemDetail } from '@/types/responses/systems'

export const useSystemCellActions = (
  row: Row<SystemDetail>,
  setUid?: (uid: string | null) => void
) => {
  const { original } = row
  const { setUID } = useSystemStore()
  const openEdit = useSystemEditSheet(original.uid)

  const handleExpand = () => {
    if (!row.getIsExpanded()) {
      setUid?.(original.uid)
    }
    row.toggleExpanded()
  }

  const handleOpenEdit = () => {
    setUID(original.uid)
    openEdit()
  }

  return {
    handleExpand,
    handleOpenEdit,
    hasSubsystems: original.hasSubsystems
  }
}
