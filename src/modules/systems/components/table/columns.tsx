import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import useFetch from '@/hooks/fetch/useFetch'
import { PATH } from '@/types/constants/paths'

import type { SystemDetail } from '../../types/responses'

//TODO: fix typing
const useSystemsColumns = setData => {
  const [uid, setUid] = useState<string | null>(null)

  const { response, loading: pending } = useFetch<SystemDetail[]>({
    url: uid ? `/systems/${uid}/subsystems` : null,
    useMockFetcher: true,
    config: {
      suspense: false
    }
  })

  useEffect(() => {
    if (response) {
      setData(prev => {
        const newData = [...prev]
        const findAndReplace = (data, uid, newData) => {
          data.forEach((item, index) => {
            if (item.uid === uid) {
              newData[index].subSystems = response
            } else if (item.subSystems) {
              findAndReplace(item.subSystems, uid, newData[index].subSystems)
            }
          })
        }
        findAndReplace(prev, uid, newData)
        return newData
      })
    }
  }, [response, setData, uid])

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
                  {...{
                    onClick: () => {
                      if (!row.getIsExpanded()) {
                        setUid(row.original.uid)
                      }
                      row.toggleExpanded()
                    },
                    style: { cursor: 'pointer' }
                  }}
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
      { header: 'systemAlias', accessorKey: 'systemAlias', id: 'systemAlias' },
      {
        header: 'systemType',
        accessorKey: 'systemType',
        id: 'systemType',
        cell: ({ getValue }) => getValue().name
      },
      { header: 'zone', accessorKey: 'zone', id: 'zone', cell: ({ getValue }) => getValue().name },
      { header: 'location', accessorKey: 'location', id: 'location', cell: ({ getValue }) => getValue().name },
      { header: 'owner', accessorKey: 'owner', id: 'owner', cell: ({ getValue }) => getValue().name }
    ],
    []
  )

  return { columns, pending }
}

export default useSystemsColumns
