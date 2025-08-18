import { type Row } from '@tanstack/react-table'
import type { VirtualItem } from '@tanstack/react-virtual'
import { type FC, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'

import { cn } from '@/lib/utils'
import type { SystemDetail } from '@/types/responses/systems'

import type { GetRowPropsReturnType } from '../../pandaTable/PandaTable'
import { RowCellComponent } from './RowCell.comp'

interface Props {
  virtualRow: VirtualItem
  measureElement: (node: Element | null) => void
  row: Row<any>
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  virtualPaddingLeft?: string
  loading: boolean
  tableId: string
}

export const TableRowDNDComponent: FC<Props> = ({
  virtualRow,
  measureElement,
  row,
  getRowProps,
  virtualPaddingLeft,
  loading,
  tableId
}) => {
  const { className, dropsettings, ...rest } = getRowProps(row)
  const visibleCells = row.getVisibleCells()
  const [isHoveringDrop, setIsHoveringDrop] = useState(false)

  const rowRef = useRef<HTMLTableRowElement>(null)
  useEffect(() => {
    if (rowRef.current) {
      measureElement(rowRef.current)
    }
  }, [measureElement, virtualRow.index])

  const [, dropRef] = useDrop<SystemDetail>({
    accept: dropsettings?.accept || 'table-row',
    hover: (item, monitor) => {
      if (monitor.isOver({ shallow: true }) && item.uid !== row.original.uid) {
        setIsHoveringDrop(true)
      }
      setTimeout(() => {
        if (!monitor.isOver()) {
          setIsHoveringDrop(false)
        }
      }, 50)
    },
    drop: item => {
      dropsettings &&
        dropsettings.onDropHandler(item, { tableId, ...row.original })
    }
  })

  return (
    <tr
      className={cn(
        'min-h-[49px]',
        'flex border-t border-border group',
        virtualRow.index % 2 === 0 ? 'bg-background' : 'bg-muted/50',
        'group hover:bg-accent text-muted-foreground z-0',
        className,
        isHoveringDrop ? 'bg-primary/20' : ''
      )}
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={rowRef} //measure dynamic row height
      style={{
        display: 'flex',
        position: 'absolute',
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: '100%'
      }}
      {...rest}
    >
      <div className="flex" ref={dropRef}>
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
      </div>
    </tr>
  )
}
