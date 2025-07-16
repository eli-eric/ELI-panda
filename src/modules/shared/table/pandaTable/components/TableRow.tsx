import type { Row } from '@tanstack/react-table'
import { useContext, useId, useState } from 'react'
import { useDrop } from 'react-dnd'

import { cn } from '@/lib/utils'
import type { SystemDetail } from '@/types/responses/systems'

import type { GetRowPropsReturnType } from '../PandaTable'
import { PandaTableContext } from '../PandaTableCotrolled'
import { RowCell } from './RowCell'

interface Props {
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  row: Row<any>
  index: number
}

export const TableRow = ({ getRowProps, row, index }: Props) => {
  const { dropsettings } = getRowProps(row)

  return (
    <>
      {dropsettings ? (
        <TableRowOnDrop getRowProps={getRowProps} row={row} index={index} />
      ) : (
        <TableRowNoDrop getRowProps={getRowProps} row={row} index={index} />
      )}
    </>
  )
}

const TableRowNoDrop = ({ getRowProps, row, index }: Props) => {
  const { className, ...rest } = getRowProps(row)
  const id = useId()
  const { loading } = useContext(PandaTableContext)

  return (
    <tr
      id={id}
      {...rest}
      className={cn(
        index % 2 === 0 ? 'dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700',
        'group hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 z-0',
        className
      )}
    >
      {row.getVisibleCells().map(cell => (
        <RowCell key={cell.id} cell={cell} loading={loading} row={row} />
      ))}
    </tr>
  )
}

const TableRowOnDrop = ({ getRowProps, row, index }: Props) => {
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
      className={cn(
        index % 2 === 0 ? 'dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700',
        'group hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 z-0',
        className,
        isHoveringDrop ? 'bg-orange-200 dark:bg-orange-600' : ''
      )}
    >
      {row.getVisibleCells().map(cell => (
        <RowCell key={cell.id} cell={cell} loading={loading} row={row} />
      ))}
    </tr>
  )
}
