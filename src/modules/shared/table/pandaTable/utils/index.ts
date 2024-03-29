import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/react-table'

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Don't filter parent if child is matched

  let parentPassed = false
  row.subRows?.forEach(subRow => {
    const itemRank = rankItem(subRow.getValue(columnId), value)
    if (itemRank.passed) {
      parentPassed = true
      return
    }
  })
  if (parentPassed) {
    return true
  }
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)
  // Store the itemRank info
  addMeta({
    itemRank
  })
  // Return if the item should be filtered in/out
  return itemRank.passed
}
