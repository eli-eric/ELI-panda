import type { Row } from '@tanstack/react-table'
import type { VirtualItem } from '@tanstack/react-virtual'
import { useContext, useId, useState } from 'react'
import { useDrop } from 'react-dnd'

import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import type { GetRowPropsReturnType } from '../PandaTable'
import { PandaTableContext } from '../PandaTableCotrolled'
import { RowCell } from './RowCell'

interface Props {
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  row: Row<any>
  virtualRow: VirtualItem<Element>
  index: number
}

export const TableRow = ({ getRowProps, row, index, virtualRow }: Props) => {
  const [isHoveringDrop, setIsHoveringDrop] = useState(false)
  const { dropsettings, className, ...rest } = getRowProps(row)
  const id = useId()
  const { tableId, loading } = useContext(PandaTableContext)

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
      ref={dropsettings && dropRef}
      id={id}
      {...rest}
      style={{
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`
      }}
      className={classNames(
        index % 2 === 0 ? 'dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700',
        'group hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 z-0',
        className,
        isHoveringDrop ? 'bg-primary-200 dark:bg-primary-600' : ''
      )}
    >
      {row.getVisibleCells().map(cell => (
        <RowCell key={cell.id} cell={cell} loading={loading} row={row} />
      ))}
    </tr>
  )
}
