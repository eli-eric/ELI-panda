import { Edit, GripVertical } from 'lucide-react'

import { SystemBadge } from '@/components/system/SystemBadge.comp'
import { SystemPathTooltip } from '@/components/system/SystemPathTooltip.comp'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SystemDetail } from '@/types/responses/systems'
import type { EndpointProps } from '@/utils/getEndpoints'

import { SystemActionButtons } from './SystemActionButtons'

interface SystemNameCellContentProps {
  value: string
  original: SystemDetail
  hasSubsystems: boolean
  isExpanded: boolean
  onExpand?: () => void
  onEdit: () => void
  canEdit: boolean
  hideButtons: boolean
  showDragHandle?: boolean
  sparesIn?: number
  sparesOut?: number
  queryKey?: [string, EndpointProps]
  tableId: string
  depth: number
  isLastChild: boolean
}

export const SystemNameCellContent = ({
  value,
  original,
  hasSubsystems,
  isExpanded,
  onExpand,
  onEdit,
  canEdit,
  hideButtons,
  showDragHandle = false,
  sparesIn,
  sparesOut,
  queryKey,
  tableId,
  depth,
  isLastChild
}: SystemNameCellContentProps) => {
  // Calculate indentation based on hierarchy depth (16px per level)
  const indentStyle = {
    paddingLeft: `${depth * 16}px`
  }

  return (
    <div className="flex items-center w-full group">
      <div className="flex-1 min-w-0 overflow-hidden">
        <div
          className={cn(
            'flex items-center py-1',
            hasSubsystems && 'group/expand cursor-pointer'
          )}
          style={indentStyle}
          onClick={hasSubsystems ? onExpand : undefined}
        >
          {showDragHandle && (
            <button className="mr-2 shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing">
              <GripVertical className="w-5 h-5" />
            </button>
          )}

          <SystemPathTooltip
            parentPath={original.parentPath}
            currentName={value}
          >
            <SystemBadge
              value={value}
              systemLevel={original.systemLevel}
              hasPhysicalItem={!!original?.physicalItem?.uid}
              variant={hasSubsystems ? 'expandable' : 'clickable'}
              isExpanded={isExpanded}
              onClick={!hasSubsystems ? onEdit : undefined}
            />
          </SystemPathTooltip>
        </div>
      </div>

      <div className="flex-shrink-0 ml-2 flex items-center">
        {!hideButtons && (
          <Tooltip content={canEdit ? 'Edit System' : 'View System'}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-8 w-8 p-0 transition-opacity duration-200 mr-1 hover:text-primary text-muted-foreground"
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
