import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import type { Order } from '@/modules/orders/types'

const useSystemsColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Order, string>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`
            }}
          >
            <>
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' }
                  }}
                >
                  {row.getIsExpanded() ? '👇' : '👉'}
                </button>
              ) : (
                '🔵'
              )}{' '}
              {getValue()}
            </>
          </div>
        )
      },
      { header: 'systemCode', accessorKey: 'systemCode', id: 'systemCode' },
      { header: 'systemAlias', accessorKey: 'systemAlias', id: 'systemAlias' }
    ],
    []
  )

  return columns
}

export default useSystemsColumns
