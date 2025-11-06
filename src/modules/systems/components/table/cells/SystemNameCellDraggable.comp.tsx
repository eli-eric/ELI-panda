import type { ReactNode } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'

import { cn } from '@/lib/utils'
import type { SystemDetail } from '@/types/responses/systems'

interface SystemNameCellDraggableProps {
  original: SystemDetail
  tableId: string
  children: ReactNode
}

export const SystemNameCellDraggable = ({
  original,
  tableId,
  children
}: SystemNameCellDraggableProps) => {
  const [{ isDragging }, dragRef, previewRef] = useDrag<
    SystemDetail & { tableId: string },
    unknown,
    { isDragging: boolean }
  >({
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: () => ({ ...original, tableId }),
    type: 'system'
  })

  return (
    <div
      className={cn(isDragging && 'text-orange-500', 'w-full')}
      ref={dragRef as any}
    >
      <div ref={previewRef as any}>{children}</div>
    </div>
  )
}
