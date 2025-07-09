import { LinkIcon } from '@heroicons/react/24/outline'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/solid'
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable
} from '@tanstack/react-table'
import { type FC, useMemo, useState } from 'react'

import { Disclosure } from '@/components/ui'
import { Badge } from '@/components/visuals/Badge'
import { useShowDeviceStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { fuzzyFilter } from '@/modules/shared/table/pandaTable/utils'
import type { TableSystem } from '@/modules/systemItem/components/subsystems/types'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'

interface SubsystemsSectionProps {
  systemDetail: any
}

export const SubsystemsSection: FC<SubsystemsSectionProps> = ({
  systemDetail
}) => {
  const { setUID } = useShowDeviceStore()
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo((): ColumnDef<TableSystem, any>[] => {
    return [
      {
        id: 'subsystem',
        accessorFn: row => row.name,
        header: 'Subsystem',
        cell: ({ row }) => row.original
      }
    ]
  }, [])

  const table = useReactTable({
    data: systemDetail?.subSystems || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      sorting,
      pagination,
      globalFilter
    }
  })

  if (!systemDetail?.subSystems || systemDetail.subSystems.length === 0) {
    return null
  }

  const totalPages = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1

  return (
    <Disclosure
      title={`Subsystems (${systemDetail.subSystems.length})`}
      defaultOpen={false}
      className="w-full border rounded-md overflow-hidden shadow-md"
      buttonClassName="bg-blue-50 dark:bg-blue-900/20"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      {/* Search/Filter */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Filter subsystems..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Subsystems List */}
      <div className="space-y-1">
        {table.getRowModel().rows.map(row => {
          const subsystem = row.original
          const { physicalItem, name, uid, sp_coverage } = subsystem

          return (
            <button
              key={uid}
              onClick={() => setUID(uid)}
              className="flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent cursor-pointer group w-full"
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className="w-4 h-4 flex-shrink-0">
                  <IconCell
                    itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE}
                  />
                </div>
                <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
                  {name}
                </span>
                <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400 flex-shrink-0" />
              </div>

              {/* Spare Parts Coverage Badge */}
              {sp_coverage !== null && sp_coverage !== undefined && (
                <div className="flex items-center space-x-1">
                  <Badge
                    className={`text-[10px] ${
                      sp_coverage < 1
                        ? 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100'
                        : 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100'
                    }`}
                  >
                    {`${(sp_coverage * 100).toFixed(1)}%`}
                  </Badge>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Showing {table.getRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} subsystems
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => table.setPageIndex(page - 1)}
                      className={`px-2 py-1 text-xs rounded ${
                        page === currentPage
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  )
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <EllipsisHorizontalIcon
                      key={page}
                      className="h-4 w-4 text-gray-400 dark:text-gray-500"
                    />
                  )
                }
                return null
              })}
            </div>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </Disclosure>
  )
}
