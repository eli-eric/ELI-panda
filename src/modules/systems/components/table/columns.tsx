import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { PATH } from '@/types/constants/paths'

import { useSubsystems } from '../../hooks/useSubsystems'
import type { SystemDetail } from '../../types/responses'

//TODO: fix typing
const useSystemsColumns = () => {
  const { setUid, pending } = useSubsystems()

  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        size: 300,
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`
            }}
          >
            <>
              {row.original.hasSubsystems ? (
                <button
                  onClick={() => {
                    if (!row.getIsExpanded()) {
                      setUid(row.original.uid)
                    }
                    row.toggleExpanded()
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {row.getIsExpanded() ? '👇' : '👉'}
                </button>
              ) : (
                '🔵'
              )}{' '}
              <Link href={PATH.SYSTEM + '/' + row.original.uid} className={'cursor-pointer hover:text-blue-500'}>
                {getValue()}
              </Link>
            </>
          </div>
        )
      },
      { header: 'systemCode', accessorKey: 'systemCode', id: 'systemCode', size: 150 },
      { header: 'systemAlias', accessorKey: 'systemAlias', id: 'systemAlias', size: 150 },
      {
        header: 'systemType',
        accessorKey: 'systemType',
        id: 'systemType',
        size: 150,
        cell: ({ getValue }) => getValue().name
      },
      { header: 'zone', accessorKey: 'zone', id: 'zone', size: 150, cell: ({ getValue }) => getValue().name },
      {
        header: 'location',
        accessorKey: 'location',
        id: 'location',
        size: 150,
        cell: ({ getValue }) => getValue().name
      },
      { header: 'owner', accessorKey: 'owner', id: 'owner', size: 150, cell: ({ getValue }) => getValue().name }
    ],
    [setUid]
  )

  return { columns, pending }
}

export default useSystemsColumns
