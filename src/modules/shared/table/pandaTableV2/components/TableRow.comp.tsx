import { type Row } from '@tanstack/react-table'
import type { VirtualItem } from '@tanstack/react-virtual'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import { RowCellComponent } from './RowCell.comp'

interface Props {
  virtualRow: VirtualItem
  measureElement: (node: Element | null) => void
  row: Row<any>
  getRowProps: (row: Row<any>) => Record<string, any>
  virtualPaddingLeft?: string
  loading: boolean
}

export const TableRowComponent: FC<Props> = ({
  virtualRow,
  measureElement,
  row,
  getRowProps,
  virtualPaddingLeft,
  loading
}) => {
  const { className, ...rest } = getRowProps(row)
  const visibleCells = row.getVisibleCells()
  const rowRef = useRef<HTMLTableRowElement>(null)

  // Use useEffect to safely measure the row after render
  useEffect(() => {
    if (rowRef.current) {
      measureElement(rowRef.current)
    }
  }, [measureElement, virtualRow.index])

  return (
    <tr
      className={cn(
        'min-h-[49px]',
        'flex border-t border-gray-300 group',
        virtualRow.index % 2 === 0
          ? 'dark:bg-gray-800'
          : 'bg-gray-100 dark:bg-gray-700',
        'group hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300 z-0',
        className
      )}
      data-index={virtualRow.index} //needed for dynamic row height measurement
      // TODO:  fix dynamic row height measurement
      ref={rowRef}
      style={{
        display: 'flex',
        position: 'absolute',
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: '100%'
      }}
      {...rest}
    >
      {virtualPaddingLeft ? (
        //fake empty column to the left for virtualization scroll padding
        <td style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {visibleCells.map((cell, index) => (
        <RowCellComponent
          key={cell.id}
          cell={cell}
          row={row}
          loading={loading}
          index={index}
        />
      ))}
    </tr>
  )
}
