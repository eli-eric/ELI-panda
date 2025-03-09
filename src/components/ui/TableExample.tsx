import { faker } from '@faker-js/faker'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'

import { Table } from './table/table'
import { fuzzyFilter } from './table/utils'

// Example data type
interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  longDescription?: string
}

// Example static data
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    longDescription:
      'This is a very long description that should cause the table to require horizontal scrolling when displayed in a fixed width container.'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    longDescription:
      'Another long description text that demonstrates horizontal scrolling behavior in the table component.'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'active',
    longDescription:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]

/**
 * Generates a specified number of random users using faker
 */
const generateRandomUsers = (count: number): User[] => {
  return Array.from({ length: count }).map((_, index) => {
    const roles = ['Admin', 'User', 'Editor', 'Viewer', 'Manager']
    const randomRole = roles[Math.floor(Math.random() * roles.length)]

    return {
      id: (index + 1).toString(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: randomRole,
      status: Math.random() > 0.3 ? 'active' : 'inactive', // 70% active, 30% inactive
      longDescription: faker.lorem.paragraph(3) // Add a long description
    }
  })
}

// Add a new component for demonstrating price summation across all pages
const PriceFooter = ({ table }: { table: any }) => {
  // Get ALL filtered rows, not just the current page
  const allRows = table.getAllFilteredRows
    ? table.getAllFilteredRows()
    : table.getFilteredRowModel().rows

  // Calculate total of a numeric field (simulating price calculation)
  // This is similar to what you'd do in your actual PriceFooter component
  const totalUsers = allRows.length
  const activeUsers = allRows.filter(
    row => row.original.status === 'active'
  ).length
  const activePercentage =
    totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0

  return (
    <div className="font-medium">
      <div className="text-primary-600 dark:text-primary-400">
        Total: {totalUsers} users
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {activePercentage}% active
      </div>
    </div>
  )
}

export const TableExample: React.FC = () => {
  // State for table options
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<User[]>([])
  const [useFixedHeight, setUseFixedHeight] = useState(false)
  const [useFixedWidth, setUseFixedWidth] = useState(false)
  const [enableFiltering, setEnableFiltering] = useState(false)
  const [enableFooter, setEnableFooter] = useState(false)
  const [enablePinning, setEnablePinning] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Use TanStack's columnHelper to create typed columns
  const columnHelper = createColumnHelper<User>()

  // Define columns with specific sizes
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      size: 240,
      cell: info => (
        <div className="font-medium text-gray-900 dark:text-white">
          {info.getValue()}
        </div>
      ),
      filterFn: 'fuzzy',
      enableColumnFilter: true,
      footer: ({ table }) => (
        <div className="font-medium">Total: {table.getRowCount()} users</div>
      ),
      // Pin this column to the left by default
      enablePinning: true
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      size: 300, // Fixed width in pixels
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </div>
      ),
      // Make filter case-insensitive and works with partial matches
      filterFn: 'fuzzy',
      enableColumnFilter: true
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      size: 240, // Fixed width in pixels
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </div>
      ),
      // Make filter case-insensitive and works with partial matches
      filterFn: 'fuzzy',
      enableColumnFilter: true,
      // Example of using the PriceFooter component to show cross-page totals
      footer: props => <PriceFooter table={props.table} />
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 200,
      cell: info => {
        const status = info.getValue()
        return (
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'
              }`}
            >
              {status}
            </span>
          </div>
        )
      },
      filterFn: 'fuzzy',
      enableColumnFilter: false,
      // Pin this column to the right by default
      enablePinning: true,
      meta: {
        pin: 'right'
      },
      footer: ({ table }) => {
        const rows = table.getFilteredRowModel().rows
        const activeCount = rows.filter(
          row => row.original.status === 'active'
        ).length
        const inactiveCount = rows.filter(
          row => row.original.status === 'inactive'
        ).length

        return (
          <div>
            <div className="text-green-600 dark:text-green-400">
              Active: {activeCount}
            </div>
            <div className="text-red-600 dark:text-red-400">
              Inactive: {inactiveCount}
            </div>
          </div>
        )
      }
    }),
    columnHelper.accessor('longDescription', {
      header: 'Description',
      size: 400, // Fixed width for long text
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300 truncate">
          {info.getValue()}
        </div>
      ),
      // Make filter case-insensitive and works with partial matches
      filterFn: fuzzyFilter,
      enableColumnFilter: true
    })
  ]

  // Load a specific dataset
  const loadDataset = (datasetType: 'small' | 'large' | 'loading') => {
    if (datasetType === 'loading') {
      setLoading(true)
      setTableData([])
      setSelectedUser(null)
    } else {
      setLoading(false)
      setTableData(datasetType === 'small' ? users : generateRandomUsers(100))
    }
  }

  // Handle row click and add custom attributes to rows
  const getRowProps = (row: User) => {
    // Determine if this row is the selected one
    const isSelected = selectedUser?.id === row.id

    return {
      // Add onClick handler for rows
      onClick: () => {
        setSelectedUser(row)
        console.log('Selected user:', row.name)
      },
      // Add some custom styling for selected rows
      className: isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : undefined,
      // Add title for better UX
      title: `Click to select ${row.name}`
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900 w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Users Table Example
      </h2>

      {/* Data control buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => loadDataset('loading')}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Show Loading State
        </button>

        <button
          onClick={() => loadDataset('small')}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Load Small Dataset (4 rows)
        </button>

        <button
          onClick={() => loadDataset('large')}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Load Large Dataset (100 rows)
        </button>
      </div>

      {/* Toggle options */}
      <div className="flex flex-wrap gap-5 mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useFixedHeight}
            onChange={() => setUseFixedHeight(!useFixedHeight)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Use Fixed Height ({useFixedHeight ? 'ON' : 'OFF'})
          </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useFixedWidth}
            onChange={() => setUseFixedWidth(!useFixedWidth)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Use Fixed Width ({useFixedWidth ? 'ON' : 'OFF'})
          </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enableFiltering}
            onChange={() => setEnableFiltering(!enableFiltering)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enable Filtering ({enableFiltering ? 'ON' : 'OFF'})
          </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enableFooter}
            onChange={() => setEnableFooter(!enableFooter)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enable Footer ({enableFooter ? 'ON' : 'OFF'})
          </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enablePinning}
            onChange={() => setEnablePinning(!enablePinning)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enable Column Pinning ({enablePinning ? 'ON' : 'OFF'})
          </span>
        </label>
      </div>

      {/* Display selected user info */}
      {selectedUser && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Selected User
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Status:</strong> {selectedUser.status}
            </p>
          </div>
        </div>
      )}

      {/* Container with fixed width if enabled */}
      <div style={{ maxWidth: useFixedWidth ? '600px' : '100%' }}>
        <Table
          columns={columns}
          className="w-full"
          data={tableData}
          loading={loading}
          enableSorting={true}
          enableFiltering={enableFiltering}
          enableFooter={enableFooter}
          enablePinning={enablePinning}
          enablePagination={true}
          defaultPageSize={10}
          fixedHeight={useFixedHeight ? '400px' : undefined}
          getRowProps={getRowProps}
        />
      </div>
    </div>
  )
}
