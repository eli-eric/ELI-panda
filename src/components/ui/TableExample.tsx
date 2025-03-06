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
}

// Example static data
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'active'
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
      status: Math.random() > 0.3 ? 'active' : 'inactive' // 70% active, 30% inactive
    }
  })
}

export const TableExample: React.FC = () => {
  // State for table options
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<User[]>([])
  const [useFixedHeight, setUseFixedHeight] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Use TanStack's columnHelper to create typed columns
  const columnHelper = createColumnHelper<User>()

  // Define columns - let TypeScript infer the correct type
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => (
        <div className="font-medium text-gray-900 dark:text-white">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => (
        <div className="text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </div>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Status',
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

      {/* Toggle fixed height */}
      <div className="flex items-center mb-4">
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
  )
}
