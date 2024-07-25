import { faker } from '@faker-js/faker'
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'

import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import { SystemNameCell } from '@/modules/systems/components/table/cells/SystemNameCell'
import { ITEM_USAGE } from '@/modules/systems/types/constants'
import { classNames } from '@/utils'

import { TableHead } from './components/TableHead'
import { fuzzyFilter } from './utils'

export const TableVirtualTest = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: 'icon',
        size: 41,
        meta: { sticky: true },
        cell: () => (
          <div>
            <IconCell itemUsageUid={ITEM_USAGE.SPARE_PART} />
          </div>
        )
      },
      {
        header: 'Name',
        accessorFn: row => row.firstName,
        id: 'name',
        size: 480,

        enableHiding: false,
        cell: props => (
          <SystemNameCell
            {...props}
            setUid={() => {}}
            canEdit={true}
            queryKey={['', {}]}
            hideButtons={false}
            tableId={'test'}
            enableDragAndDrop={false}
          />
        )
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60
      },
      {
        accessorKey: 'firstName',
        cell: info => info.getValue()
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50
      },
      {
        accessorKey: 'status',
        header: 'Status'
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: info => info.getValue<Date>().toLocaleString()
      }
    ],
    []
  )

  const [data, setData] = React.useState(() => makeData(500))

  const table = useReactTable<any>({
    columns,
    data,
    state: {
      sorting
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    filterFns: {
      fuzzy: fuzzyFilter
    }
  })

  const { rows } = table.getRowModel()

  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 51,
    debug: true,
    overscan: 20
  })

  return (
    <div
      ref={parentRef}
      className=" border relative border-cyan-900 overflow-scroll h-screen scrollbar-style"
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table>
          <TableHead table={table} />
          <tbody className="bg-white dark:bg-gray-800">
            {virtualizer.getVirtualItems().map((virtualRow, rowIndex) => {
              const row = rows[virtualRow.index] as Row<any>
              return (
                <tr
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start - rowIndex * virtualRow.size}px)`
                  }}
                  className={classNames(
                    virtualRow.index % 2 === 0
                      ? 'dark:bg-gray-800'
                      : 'bg-gray-100 dark:bg-gray-700',
                    'group hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 z-0'
                  )}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td
                        key={cell.id}
                        style={
                          {
                            width: cell.column.getSize()
                          } as React.CSSProperties
                        }
                        className={classNames(
                          ' border-r border-b border-gray-400 dark:text-gray-100 pl-3 pr-3',
                          cell.column.columnDef.meta?.sticky
                            ? 'sticky z-30 backdrop-blur-2xl backdrop-filter border-r pt-1 pb-1'
                            : '',
                          cell.column.columnDef.meta?.className
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export type Person = {
  id: number
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  createdAt: Date
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (index: number): Person => {
  return {
    id: index + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    createdAt: faker.datatype.datetime({ max: new Date().getTime() }),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single'
    ])[0]!
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(d)
      }
    })
  }

  return makeDataLevel()
}
