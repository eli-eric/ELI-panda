import { ChevronDown } from 'lucide-react'
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
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      ) : column.getIsSorted() === 'desc' ? (
        <ChevronDown className="h-4 w-4 text-muted-foreground rotate-180" />
      ) : (
        <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
      )}
    </span>
  )
}
