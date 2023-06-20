import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { mockFetcher } from '@/helpers/fetcher'
import { PATH } from '@/types/constants/paths'

import { useSystems } from '../../hooks/useSystems'
import type { SystemDetail } from '../../types/responses'

//TODO: fix typing
const useSystemsColumns = () => {
  const [uid, setUid] = useState<string | null>(null)
  const { mutate } = useSystems()

  const systemsUpdate = (prev, uid, response) => {
    const newData = [...prev.data]
    const findAndReplace = (data, uid, newData) => {
      data.forEach((item, index) => {
        if (item.uid === uid) {
          newData[index].subSystems = response
        } else if (item.subSystems) {
          findAndReplace(item.subSystems, uid, newData[index].subSystems)
        }
      })
    }
    findAndReplace(prev.data, uid, newData)
    return { ...prev, data: newData }
  }

  const { isLoading: pending } = useSWR<SystemDetail[]>(uid ? `/systems/${uid}/subsystems` : null, mockFetcher, {
    onSuccess: response => mutate(prev => systemsUpdate(prev, uid, response), { revalidate: false }),
    suspense: false,
    onError: () => {
      toast.error('Error fetching subsystems')
    }
  })

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
    []
  )

  return { columns, pending }
}

export default useSystemsColumns
