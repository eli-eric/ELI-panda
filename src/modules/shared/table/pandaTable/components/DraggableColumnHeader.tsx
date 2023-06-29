import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import type { ColumnOrderState, Header, Table } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { useDrag, useDrop } from 'react-dnd'

import { classNames } from '@/helpers'

const reorderColumn = (draggedColumnId: string, targetColumnId: string, columnOrder: string[]): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  )
  return [...columnOrder]
}

interface DraggableColumnHeaderProps {
  header: Header<any, any>
  table: Table<any>
}

export const DraggableColumnHeader = ({ header, table }: DraggableColumnHeaderProps) => {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()
  const { column } = header

  const [, dropRef] = useDrop<Header<any, any>>({
    accept: 'column',
    drop: draggedColumn => {
      // eslint-disable-next-line
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder)
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

  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      style={{ opacity: isDragging ? 0.5 : 1, width: header.getSize() }}
      className={classNames(
        'whitespace-nowrap border-r border-b bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6',
        header.column.columnDef.meta?.sticky
          ? 'sticky left-0 top-0 text-ellipsis z-20 backdrop-blur-2xl backdrop-filter border-r'
          : 'sticky top-0 z-10'
      )}
    >
      <div
        ref={previewRef}
        {...{
          className: classNames(header.column.getCanSort() ? 'cursor-pointer select-none' : '', 'flex items-center '),
          onClick: header.column.getToggleSortingHandler(),
          style: {
            width: header.getSize()
          }
        }}
      >
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: ' 🔼',
          desc: ' 🔽'
        }[header.column.getIsSorted() as string] ?? null}
        <button ref={dragRef} className="ml-2">
          <ArrowsRightLeftIcon className="w-6 h-6" />
        </button>
      </div>
    </th>
  )
}
