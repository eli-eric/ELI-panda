import type { Column, ColumnOrderState, Header } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, GripVertical } from 'lucide-react'
import { type FC, useMemo } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { cn } from '@/lib/utils'

import styles from './RowCell.module.css'

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  )
  console
  return [...columnOrder]
}

interface Props {
  header: Header<any, any>
  headerIndex: number
  columns: Column<any, any>[]
  setColumnOrder: (columnOrder: ColumnOrderState) => void
  columnOrder: ColumnOrderState
}

export const HeaderCellDNDComponent: FC<Props> = ({
  header,
  headerIndex,
  columns,
  setColumnOrder,
  columnOrder
}) => {
  const isSticky = header.column.columnDef.meta?.sticky
  const noHeader = header.column.columnDef.meta?.noHeader
  const { column } = header
  const [, dropRef] = useDrop<Header<any, any>>({
    accept: 'column',
    drop: draggedColumn => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      )
      setColumnOrder(newColumnOrder)
    }
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    item: () => column,
    type: 'column'
  })

  const stickyCellsSize = useMemo(() => {
    let size = 0
    for (let i = 0; i < headerIndex; i++) {
      const cell = columns[i]
      if (isSticky) {
        size += cell.getSize()
      }
    }
    return size
  }, [isSticky, headerIndex, columns])

  if (noHeader) {
    return null
  }

  return (
    <th
      ref={dropRef}
      className={cn(
        'border-r outline-offset-0 border-border',
        'whitespace-nowrap p-2 text-left bg-background font-semibold text-foreground',
        isSticky
          ? 'sticky top-0 text-ellipsis z-40 backdrop-blur-2xl backdrop-filter border-r'
          : 'sticky top-0 z-10',
        styles.cell,
        header.column.columnDef.meta?.headerClassName,
        isDragging ? 'opacity-50' : ''
      )}
      colSpan={header.colSpan}
      style={
        {
          width: header.getSize(),
          '--left': isSticky
            ? `${headerIndex === 0 ? 0 : stickyCellsSize}px`
            : null,
          position: 'sticky'
        } as React.CSSProperties
      }
    >
      <div
        ref={previewRef}
        className={cn(
          'h-full w-full flex justify-between',
          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
        )}
        onClick={
          header.column.getCanSort()
            ? header.column.getToggleSortingHandler()
            : undefined
        }
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        <div className="flex items-center ml-1">
          {{
            asc: <ArrowUp className="w-4 h-4 text-primary" />,
            desc: <ArrowDown className="w-4 h-4 text-primary" />
          }[header.column.getIsSorted() as string] ?? null}
          {!isSticky && (
            <button
              ref={dragRef}
              className={cn(
                'ml-1 p-1 hover:bg-accent rounded transition-colors',
                header.getContext() && 'opacity-50 hover:opacity-100'
              )}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </th>
  )
}
