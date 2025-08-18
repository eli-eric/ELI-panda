import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { useDrag } from 'react-dnd'

import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getBadgeVariantBySystemLevel } from '@/modules/systemItem/utils'
import { PATH } from '@/types/constants/paths'
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
      <div className="flex-1 min-w-0 overflow-hidden" ref={dragRef}>
        <div
          className={cn(
            'flex items-center py-1',
            original.hasSubsystems && 'group/expand cursor-pointer'
          )}
          onClick={handleExpand}
          ref={previewRef}
        >
          {enableDragAndDrop && (
            <button className="mr-2 shrink-0">
              <ArrowsRightLeftIcon className="w-5 h-5" />
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
            <Badge
              variant="outline"
              className={cn(
                'flex items-center h-7 max-w-full overflow-hidden justify-start',
                original.hasSubsystems
                  ? 'gap-1 group-hover/expand:opacity-80 cursor-pointer px-2'
                  : 'px-3',
                getBadgeVariantBySystemLevel(original.systemLevel)
              )}
            >
              {original.hasSubsystems ? (
                <>
                  {row.getIsExpanded() ? (
                    <ChevronDownIcon className="w-4 h-4 shrink-0" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 shrink-0" />
                  )}
                  <span className="truncate min-w-0">{value}</span>
                </>
              ) : (
                <>
                  <span className="truncate min-w-0">{value}</span>
                </>
              )}
            </Badge>
          </Tooltip>
        </div>
      </div>
      <div className="flex-shrink-0 ml-2 flex items-center">
        {!hideButtons && (
          <Tooltip content={canEdit ? 'Edit System' : 'View System'}>
            <Link href={PATH.SYSTEM + '/' + original.uid}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0  transition-opacity duration-200 mr-1 hover:text-primary text-muted-foreground"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
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
