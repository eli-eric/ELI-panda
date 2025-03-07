import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useEffect, useState } from 'react'

import { cx } from '@/utils'

interface FilterDropdownProps {
  column: any
  onFilterChange: (value: string) => void
  currentFilter: string
}

export function FilterDropdown({
  column,
  onFilterChange,
  currentFilter
}: FilterDropdownProps) {
  const [filterValue, setFilterValue] = useState(currentFilter || '')

  // Update the filter value when the prop changes
  useEffect(() => {
    setFilterValue(currentFilter || '')
  }, [currentFilter])

  // Handle filter input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value)
  }

  // Apply filter when user clicks the apply button
  const applyFilter = () => {
    onFilterChange(filterValue)
  }

  // Clear the filter
  const clearFilter = () => {
    console.log('Clearing filter for column:', column.id)
    setFilterValue('')
    onFilterChange('')
  }

  // Apply filter when user presses Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilter()
    }
  }

  // Prevent click from bubbling up to the header cell
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="relative inline-block text-left">
      {/* We need this wrapper to prevent any conflicts with table sorting */}
      <Menu>
        {({ open }) => (
          <>
            <MenuButton
              className={cx(
                'inline-flex items-center justify-center p-1 rounded-md',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                currentFilter
                  ? 'text-primary-500'
                  : 'text-gray-400 hover:text-gray-500'
              )}
              aria-label="Filter"
              title="Filter"
              onClick={handleButtonClick}
            >
              <FunnelIcon className="w-4 h-4" aria-hidden="true" />
            </MenuButton>

            {open && (
              <div
                className="fixed inset-0 z-20"
                aria-hidden="true"
                onClick={handleButtonClick}
              />
            )}

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="bg-gray-50 dark:bg-gray-900 rounded-md shadow-lg shadow-gray-400 dark:shadow-black"
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    Filter {column.columnDef.header}
                  </p>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                      placeholder="Filter value..."
                      value={filterValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onClick={handleButtonClick}
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      onClick={e => {
                        e.stopPropagation()
                        clearFilter()
                      }}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-800"
                      onClick={e => {
                        e.stopPropagation()
                        applyFilter()
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
