import type { Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { useState } from 'react'
import { useDrop } from 'react-dnd'

import { classNames } from '@/helpers'
import type { SystemDetail } from '@/modules/systems/types/responses'

import type { GetRowPropsReturnType } from '../PandaTable'

interface Props {
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  loading?: boolean
  row: any
  index: number
}

export const TableRow = ({ getRowProps, loading, row, index }: Props) => {
  const [isHoveringDrop, setIsHoveringDrop] = useState(false)
  const { dropSettings, className, ...rest } = getRowProps(row)

  const [, dropRef] = useDrop<SystemDetail>({
    accept: dropSettings?.accept || 'table-row',
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
      dropSettings && dropSettings.onDropHandler(item, row.original)
    }
  })

  return (
    <tr
      ref={dropSettings && dropRef}
      {...rest}
      className={classNames(
        index % 2 === 0 ? undefined : 'bg-gray-100',
        'hover:bg-gray-200 text-gray-500 z-0',
        isHoveringDrop ? 'bg-primary-200' : '',
        className
      )}
    >
      {row.getVisibleCells().map(cell => (
        <td
          key={cell.id}
          className={classNames(
            'text-xs sm:pl-6 sm:pr-6 border-r border-b  border-gray-400',
            row.getIsSelected() ? 'text-white' : '',
            cell.column.columnDef.meta?.sticky
              ? 'sticky sm:left-0 z-30 backdrop-blur-2xl backdrop-filter border-r pt-1 pb-1'
              : '',
            loading ? 'opacity-50' : '',
            cell.column.columnDef.meta?.className
          )}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}
