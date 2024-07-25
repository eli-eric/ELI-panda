import type { Row } from '@tanstack/react-table'
import type { Virtualizer } from '@tanstack/react-virtual'
import type { FC } from 'react'

import type { GetRowPropsReturnType } from '../PandaTable'
import { TableRow } from './TableRow'

interface Props {
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  virtualizer: Virtualizer<HTMLDivElement, Element>
  rows: Row<any>[]
}
export const TableBody: FC<Props> = ({ getRowProps, virtualizer, rows }) => {
  return (
    <tbody
      className="bg-white dark:bg-gray-800"
      style={{
        display: 'grid',
        height: `${virtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
        position: 'relative' //needed for absolute positioning of rows
      }}
    >
      {virtualizer.getVirtualItems().map((virtualRow, index) => {
        const row = rows[virtualRow.index] as Row<any>
        return (
          <TableRow
            virtualizer={virtualizer}
            key={row?.id}
            row={row}
            virtualRow={virtualRow}
            index={virtualRow.index}
            getRowProps={getRowProps}
          />
        )
      })}
    </tbody>
  )
}
