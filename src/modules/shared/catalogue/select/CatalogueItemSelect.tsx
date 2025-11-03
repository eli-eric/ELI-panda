import { Fragment } from 'react'

import { cn } from '@/lib/utils'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import type { CatalogueItem } from '@/types/responses/catalogue'

import { FilterBadges } from '../../form/FilterBadges'
import { Pagination } from '../../table/Pagination'
import { SearchBar } from '../../table/SearchBar'
import { CatalogueItemSelectTable } from './CatalogueItemSelect.table'
import { CatalogueSelectFilterButton } from './filter/CatalogueSelectFilterButton'
import { usePinnedCatalogueData } from './hooks/usePinnedCatalogueData'

interface CatalogueItemSelectProps {
  /**
   * Currently selected catalogue item (if any)
   */
  selectedItem?: CatalogueItem

  /**
   * Callback fired when item is selected or deselected
   * - Called with item when checkbox is checked
   * - Called with undefined when checkbox is unchecked
   */
  onSelect: (item: CatalogueItem | undefined) => void

  /**
   * Unique table ID for this instance
   * Used for managing table state (pagination, search, filters) in store
   */
  tableId: string

  /**
   * Whether to show action buttons in table cells
   * @default false
   */
  hideButtons?: boolean

  /**
   * Additional CSS classes for the container
   */
  className?: string
}

/**
 * Generic, reusable catalogue item selection component
 *
 * Features:
 * - Pins selected item to first row (always visible)
 * - Checkbox selection with deselect capability
 * - Store-only filters (not URL-based)
 * - Search functionality
 * - Pagination
 * - Filter badges
 *
 * Usage:
 * ```tsx
 * <CatalogueItemSelect
 *   selectedItem={formState.selectedCatalogueItem}
 *   onSelect={(item) => setValue('selectedCatalogueItem', item)}
 *   tableId="my-unique-table-id"
 * />
 * ```
 */
export const CatalogueItemSelect = ({
  selectedItem,
  onSelect,
  tableId,
  hideButtons = true,
  className
}: CatalogueItemSelectProps) => {
  const { catalogueItems, loading } = useCatalogueItems(tableId)
  const { catalogueCategories } = useCategoryList()

  // Pin selected item to first row
  const pinnedData = usePinnedCatalogueData(catalogueItems?.data, selectedItem)

  // Handle checkbox toggle - select or deselect
  const handleItemToggle = (item: CatalogueItem) => {
    if (selectedItem?.uid === item.uid) {
      // Deselect if clicking the same item
      onSelect(undefined)
    } else {
      // Select new item
      onSelect(item)
    }
  }

  return (
    <Fragment>
      <SearchBar
        tableId={tableId}
        useQuery={false}
        left={<CatalogueSelectFilterButton tableId={tableId} />}
      />

      <FilterBadges tableId={tableId} enableQueryURL={false} />

      <div
        className={cn(
          'h-full overflow-y-hidden min-h-[245px] border-t border-gray-300',
          className
        )}
      >
        <CatalogueItemSelectTable
          tableId={tableId}
          enableQueryURL={false}
          hideButtons={hideButtons}
          loading={loading}
          selectedItemUid={selectedItem?.uid}
          onItemToggle={handleItemToggle}
          getRowProps={row => ({
            className: cn(
              'cursor-pointer transition-all',
              row.original.uid === selectedItem?.uid
                ? 'bg-orange-50 dark:bg-orange-950 border-l-1 border-l-orange-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-900'
            ),
            onClick: () => {
              handleItemToggle(row.original)
            }
          })}
          categoryList={catalogueCategories}
          catalogueItems={catalogueItems}
          pinnedData={pinnedData}
        />
      </div>

      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: false,
          total: catalogueItems?.totalCount,
          pageSizeDefault: 10
        }}
      />
    </Fragment>
  )
}
