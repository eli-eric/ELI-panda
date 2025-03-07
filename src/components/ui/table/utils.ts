import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/react-table'

/**
 * Fuzzy filter function for filtering table data.
 * Uses the rankItem function from @tanstack/match-sorter-utils to perform fuzzy matching.
 */
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Skip filtering if no value
  if (!value || value === '') return true

  // Get the value from the row
  const rowValue = row.getValue(columnId)

  // Skip empty values
  if (rowValue === null || rowValue === undefined) return false

  // Convert to string for comparison
  const itemStr = String(rowValue).toLowerCase()
  const searchStr = String(value).toLowerCase()

  // Log filter operation for debugging
  console.log(`Filtering ${columnId}: '${itemStr}' with '${searchStr}'`)

  // Check for direct substring match first (faster)
  if (itemStr.includes(searchStr)) {
    return true
  }

  // If no direct match, use the fuzzy matching
  const itemRank = rankItem(rowValue, value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// Extract scroll-related classes from className
export const scrollClasses = [
  'overflow-auto',
  'overflow-x-auto',
  'overflow-y-auto',
  'overflow-hidden',
  'overflow-x-hidden',
  'overflow-y-hidden',
  'overflow-visible',
  'overflow-x-visible',
  'overflow-y-visible',
  'overflow-scroll',
  'overflow-x-scroll',
  'overflow-y-scroll'
]

// Extract min/max width classes
export const widthClasses = [
  'min-w-0',
  'min-w-full',
  'min-w-min',
  'min-w-max',
  'max-w-0',
  'max-w-none',
  'max-w-xs',
  'max-w-sm',
  'max-w-md',
  'max-w-lg',
  'max-w-xl',
  'max-w-2xl',
  'max-w-3xl',
  'max-w-4xl',
  'max-w-5xl',
  'max-w-6xl',
  'max-w-7xl',
  'max-w-full',
  'max-w-min',
  'max-w-max',
  'max-w-prose',
  'max-w-screen-sm',
  'max-w-screen-md',
  'max-w-screen-lg',
  'max-w-screen-xl',
  'max-w-screen-2xl'
]
