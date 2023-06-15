import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import axiosInstance from '@/core/axios/axiosInstance'

import type { SystemDetail } from '../types/responses'

//TODO: fix typing
const useSystemsColumns = setData => {
  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
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
                        axiosInstance.get(`api/mock-server/systems/${row.original.uid}/subsystems`).then(res => {
                          setData(prev => {
                            //recursion
                            const newData = [...prev]
                            const findAndReplace = (data, uid, newData) => {
                              data.forEach((item, index) => {
                                if (item.uid === uid) {
                                  newData[index].subSystems = res.data
                                } else if (item.subSystems) {
                                  findAndReplace(item.subSystems, uid, newData[index].subSystems)
                                }
                              })
                            }
                            findAndReplace(prev, row.original.uid, newData)
                            return newData
                          })
                        })
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
              {getValue()}
            </>
          </div>
        )
      },
      { header: 'systemCode', accessorKey: 'systemCode', id: 'systemCode' },
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

  return columns
}

export default useSystemsColumns
