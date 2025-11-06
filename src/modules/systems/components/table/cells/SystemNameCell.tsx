import type { CellContext } from '@tanstack/react-table'

import type { SystemDetail } from '@/types/responses/systems'
import type { EndpointProps } from '@/utils/getEndpoints'

import { useSystemCellActions } from '../../../hooks/useSystemCellActions'
import { SystemNameCellContent } from './SystemNameCellContent.comp'
import { SystemNameCellDraggable } from './SystemNameCellDraggable.comp'

interface SystemNameCellProps extends CellContext<SystemDetail, any> {
  setUid?: (uid: string | null) => void
  canEdit?: boolean
  hideButtons?: boolean
  tableId: string
  isHoveringId?: number | undefined | string
  enableDragAndDrop?: boolean
  queryKey?: [string, EndpointProps]
}

export const SystemNameCell = ({
  row,
  getValue,
  setUid,
  canEdit = true,
  hideButtons = false,
  tableId,
  queryKey,
  enableDragAndDrop = false
}: SystemNameCellProps) => {
  const { original } = row
  const { handleExpand, handleOpenEdit, hasSubsystems } = useSystemCellActions(
    row,
    setUid
  )

  const content = (
    <SystemNameCellContent
      value={getValue()}
      original={original}
      hasSubsystems={hasSubsystems ?? false}
      isExpanded={row.getIsExpanded()}
      onExpand={handleExpand}
      onEdit={handleOpenEdit}
      canEdit={canEdit}
      hideButtons={hideButtons}
      showDragHandle={enableDragAndDrop}
      sparesIn={original.sparesIn}
      sparesOut={original.sparesOut}
      queryKey={queryKey}
      tableId={tableId}
    />
  )

  return enableDragAndDrop ? (
    <SystemNameCellDraggable original={original} tableId={tableId}>
      {content}
    </SystemNameCellDraggable>
  ) : (
    content
  )
}
