import type { CellContext } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, ChevronRight } from 'lucide-react'
import { Edit } from 'lucide-react'
import { useDrag } from 'react-dnd'

import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import { getBadgeVariantBySystemLevel } from '@/modules/systemItem/utils'
import type { EndpointProps } from '@/utils/getEndpoints'

import { SystemActionButtons } from './SystemActionButtons'

interface SystemNameCellProps extends CellContext<any, any> {
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
  const { sparesIn, sparesOut } = original
  const { setUID } = useSystemStore()
  const openEdit = useSystemEditSheet(original.uid)

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    item: () => ({ ...original, tableId }),
    type: 'system'
  })

  const value = getValue()

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

  return (
    <div
      style={{
        paddingLeft: `${row.depth * 1.01}rem`
      }}
      className={cn(
        isDragging && 'text-orange-500',
        'flex items-center w-full group'
      )}
    >
      <div className="flex-1 min-w-0 overflow-hidden" ref={dragRef as any}>
        <div
          className={cn(
            'flex items-center py-1',
            original.hasSubsystems && 'group/expand cursor-pointer'
          )}
          onClick={original.hasSubsystems ? handleExpand : undefined}
          ref={previewRef as any}
        >
          {enableDragAndDrop && (
            <button className="mr-2 shrink-0">
              <ArrowUpDown className="w-5 h-5" />
            </button>
          )}
          <Tooltip
            content={(original.parentPath
              ? [...original.parentPath, { name: getValue() }]
              : []
            )
              ?.map(v => v.name)
              .join(' > ')}
          >
            {!original.hasSubsystems ? (
              <Badge
                onClick={handleOpenEdit}
                variant="outline"
                className={cn(
                  'flex items-center h-7 max-w-full overflow-hidden justify-start px-3 hover:opacity-80',
                  getBadgeVariantBySystemLevel(original.systemLevel)
                )}
              >
                <span className="cursor-pointer text-inherit hover:underline truncate block min-w-0">
                  {value}
                </span>
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className={cn(
                  'flex items-center h-7 max-w-full overflow-hidden justify-start gap-1 group-hover/expand:opacity-80 cursor-pointer px-2',
                  getBadgeVariantBySystemLevel(original.systemLevel)
                )}
              >
                {row.getIsExpanded() ? (
                  <ChevronDown className="w-4 h-4 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate min-w-0">{value}</span>
              </Badge>
            )}
          </Tooltip>
        </div>
      </div>
      <div className="flex-shrink-0 ml-2 flex items-center">
        {!hideButtons && (
          <Tooltip content={canEdit ? 'Edit System' : 'View System'}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenEdit}
              className="h-8 w-8 p-0  transition-opacity duration-200 mr-1 hover:text-primary text-muted-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Tooltip>
        )}
        <SystemActionButtons
          original={original}
          canEdit={canEdit}
          hideButtons={hideButtons}
          sparesIn={sparesIn}
          sparesOut={sparesOut}
          queryKey={queryKey}
          tableId={tableId}
        />
      </div>
    </div>
  )
}
