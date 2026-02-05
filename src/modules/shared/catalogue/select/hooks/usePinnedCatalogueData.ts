import { useMemo } from 'react'

import { isEmptyArray } from '@/lib/predicates/data'
import { isUndefined } from '@/lib/predicates/type-guards'
import type { CatalogueItem } from '@/types/responses/catalogue'

/**
 * Custom hook for pinning selected catalogue item to the first row
 * Ensures selected item is always visible at the top of the table
 * regardless of filters, pagination, or search
 *
 * @param catalogueItems - Array of catalogue items from API
 * @param selectedItem - Currently selected catalogue item (if any)
 * @returns Array with selected item pinned to first position, or undefined if no data loaded yet
 */
export const usePinnedCatalogueData = (
    catalogueItems: CatalogueItem[] | undefined,
    selectedItem: CatalogueItem | undefined,
): CatalogueItem[] | undefined => {
    return useMemo(() => {
        // Initial load - data hasn't been fetched yet
        if (isUndefined(catalogueItems)) {
            return selectedItem ? [selectedItem] : undefined
        }

        // Empty results - data is loaded but empty (e.g., after filtering)
        if (isEmptyArray(catalogueItems)) {
            return selectedItem ? [selectedItem] : []
        }

        // No selected item, return items as-is
        if (!selectedItem) {
            return catalogueItems
        }

        // Filter out selected item from the list to avoid duplicates
        const filteredItems = catalogueItems.filter(item => item.uid !== selectedItem.uid)

        // Prepend selected item to the beginning
        return [selectedItem, ...filteredItems]
    }, [catalogueItems, selectedItem?.uid])
}
