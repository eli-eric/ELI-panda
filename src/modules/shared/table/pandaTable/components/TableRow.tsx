import type { Row } from '@tanstack/react-table'
import { memo, useId, useState } from 'react'
import { useDrop } from 'react-dnd'

import type { SystemDetail } from '@/modules/systems/types/responses'
import { classNames } from '@/utils'

import type { GetRowPropsReturnType } from '../PandaTable'
import { RowCell } from './RowCell'

const MemoizedRowCell = memo(RowCell)

interface Props {
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  loading?: boolean
  row: Row<any>
  index: number
  tableId: string
}

export const TableRow = ({ getRowProps, loading, row, index, tableId }: Props) => {
  const [isHoveringDrop, setIsHoveringDrop] = useState(false)
  const { dropSettings, className, ...rest } = getRowProps(row)
  const id = useId()

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
      dropSettings && dropSettings.onDropHandler(item, { tableId, ...row.original })
    }
  })

  return (
    <tr
      ref={dropSettings && dropRef}
      id={id}
      {...rest}
      className={classNames(
        index % 2 === 0 ? 'dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700',
        'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 z-0',
        isHoveringDrop ? 'bg-primary-200 dark:bg-primary-200' : '',
        className
      )}
    >
      {row.getVisibleCells().map(cell => (
        <MemoizedRowCell key={cell.id} cell={cell} loading={loading} row={row} />
      ))}
    </tr>
  )
}
