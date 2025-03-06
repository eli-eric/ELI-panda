import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/react-table'

/**
 * Fuzzy filter function for filtering table data.
 * Uses the rankItem function from @tanstack/match-sorter-utils to perform fuzzy matching.
 */
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
