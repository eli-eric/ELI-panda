import type { Row } from '@tanstack/react-table'
import { useContext, useId, useState } from 'react'
import { useDrop } from 'react-dnd'

import type { SystemDetail } from '@/modules/systems/types/responses'
import { classNames } from '@/utils'

import type { GetRowPropsReturnType } from '../PandaTable'
import { PandaTableContext } from '../PandaTableCotrolled'
import { RowCell } from './RowCell'

interface Props {
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  row: Row<any>
  index: number
}

export const TableRow = ({ getRowProps, row, index }: Props) => {
  const [isHoveringDrop, setIsHoveringDrop] = useState(false)
  const { dropSettings, className, ...rest } = getRowProps(row)
  const id = useId()
  const { tableId, loading } = useContext(PandaTableContext)

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
