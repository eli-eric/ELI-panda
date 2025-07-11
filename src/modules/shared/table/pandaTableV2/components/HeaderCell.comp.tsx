import type { Column, Header } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { type FC, useMemo } from 'react'

import { cn } from '@/lib/utils'

import styles from './RowCell.module.css'

//TODO: add props validation

interface Props {
  header: Header<any, any>
  headerIndex: number
  columns: Column<any, any>[]
}

export const HeaderCellComponent: FC<Props> = ({
  header,
  headerIndex,
  columns
}) => {
  const isSticky = header.column.columnDef.meta?.sticky
  const noHeader = header.column.columnDef.meta?.noHeader

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
      className={cn(
        'whitespace-nowrap flex border-r outline-offset-0 bg-white dark:bg-gray-900 border-gray-400 bg-opacity-95 p-2 text-left font-semibold text-gray-900 dark:text-gray-200 backdrop-blur backdrop-filter',
        isSticky ? 'sticky top-0 t z-40 ' : 'sticky top-0 z-10',
        styles.cell,
        header.column.columnDef.meta?.headerClassName
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
        className={cn(
          'h-full w-full',
          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
        )}
        onClick={
          header.column.getCanSort()
            ? header.column.getToggleSortingHandler()
            : undefined
        }
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: ' 🔼',
          desc: ' 🔽'
        }[header.column.getIsSorted() as string] ?? null}
      </div>
    </th>
  )
}
