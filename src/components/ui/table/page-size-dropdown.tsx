import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'

import { cx } from '@/utils'

import type { PageSizeDropdownProps } from './types'

/**
 * A custom dropdown component for selecting page size.
 * Uses fixed positioning to avoid being cut off by container overflow.
 */
export function PageSizeDropdown({
  value,
  onChange,
  pageSizeOptions
}: PageSizeDropdownProps) {
  // State to track if dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0
  })
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)

  // Update dropdown position when it opens
  useEffect(() => {
    const updatePosition = () => {
      if (dropdownButtonRef.current && dropdownOpen) {
        const rect = dropdownButtonRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        })
      }
    }

    updatePosition()
    // Update position on scroll or resize
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [dropdownOpen])

  return (
    <div className="relative w-20">
      <button
        ref={dropdownButtonRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={cx(
          'relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-1.5 pl-3 pr-8 text-left',
          'text-sm text-gray-700 dark:text-gray-300',
          'border border-gray-300 dark:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900'
        )}
      >
        <span className="block truncate">{value}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {dropdownOpen && (
        <div
          className={cx(
            'absolute z-50 mt-1 overflow-auto rounded-md shadow-lg',
            'bg-white dark:bg-gray-800 py-1 text-sm',
            'ring-1 ring-black ring-opacity-5 focus:outline-none'
          )}
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            maxHeight: '200px'
          }}
        >
          {pageSizeOptions.map(size => (
            <div
              key={size}
              className={cx(
                'relative cursor-default select-none py-2 pl-3 pr-9',
                value === size
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                  : 'text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
              onClick={() => {
                onChange(size)
                setDropdownOpen(false)
              }}
            >
              <span
                className={cx(
                  'block truncate',
                  value === size && 'font-medium'
                )}
              >
                {size}
              </span>
              {value === size && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-500">
                  <CheckIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
