import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'

import type { SortIndicatorProps } from './types'

/**
 * A component that renders a sort indicator for a table column.
 */
export function SortIndicator({ column }: SortIndicatorProps) {
  if (!column.getCanSort()) {
    return null
  }

  return (
    <span className="ml-1">
      {column.getIsSorted() === 'asc' ? (
        <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      ) : column.getIsSorted() === 'desc' ? (
        <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 rotate-180" />
      ) : (
        <ChevronDownIcon className="h-4 w-4 text-gray-300 dark:text-gray-600 opacity-50" />
      )}
    </span>
  )
}
