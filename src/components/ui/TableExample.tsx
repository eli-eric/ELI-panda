import { faker } from '@faker-js/faker'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'

import { Table } from './table/table'

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

export const TableExample: React.FC = () => {
  // State for table options
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<User[]>([])
  const [useFixedHeight, setUseFixedHeight] = useState(false)
  const [useFixedWidth, setUseFixedWidth] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Use TanStack's columnHelper to create typed columns
  const columnHelper = createColumnHelper<User>()

  // Define columns with specific sizes
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      size: 150, // Fixed width in pixels
      cell: info => (
        <div className="font-medium text-gray-900 dark:text-white">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      size: 200, // Fixed width in pixels
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      size: 100, // Fixed width in pixels
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 100, // Fixed width in pixels
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
      }
    }),
    columnHelper.accessor('longDescription', {
      header: 'Description',
      size: 400, // Fixed width for long text
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300 truncate">
          {info.getValue()}
        </div>
      )
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
          enablePagination={true}
          defaultPageSize={10}
          fixedHeight={useFixedHeight ? '400px' : undefined}
          getRowProps={getRowProps}
        />
      </div>
    </div>
  )
}
