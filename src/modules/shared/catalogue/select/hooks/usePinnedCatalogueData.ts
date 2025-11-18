import { useMemo } from 'react'

import type { CatalogueItem } from '@/types/responses/catalogue'

/**
 * Custom hook for pinning selected catalogue item to the first row
 * Ensures selected item is always visible at the top of the table
 * regardless of filters, pagination, or search
 *
 * @param catalogueItems - Array of catalogue items from API
 * @param selectedItem - Currently selected catalogue item (if any)
 * @returns Array with selected item pinned to first position
 */
export const usePinnedCatalogueData = (
  catalogueItems: CatalogueItem[] | undefined,
  selectedItem: CatalogueItem | undefined
): CatalogueItem[] => {
  return useMemo(() => {
    // No items to display
    if (!catalogueItems || catalogueItems.length === 0) {
      return selectedItem ? [selectedItem] : []
    }

    // No selected item, return items as-is
    if (!selectedItem) {
      return catalogueItems
    }

    // Filter out selected item from the list to avoid duplicates
    const filteredItems = catalogueItems.filter(
      item => item.uid !== selectedItem.uid
    )

    // Prepend selected item to the beginning
    return [selectedItem, ...filteredItems]
  }, [catalogueItems, selectedItem?.uid])
}
