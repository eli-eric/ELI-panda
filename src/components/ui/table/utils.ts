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
