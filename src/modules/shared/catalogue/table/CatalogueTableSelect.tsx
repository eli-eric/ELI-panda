import { type Dispatch, Fragment, type SetStateAction, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import useTableStateStore from '@/store/useTableStateStore'
import type { CatalogueItem } from '@/types/responses/catalogue'

import { Pagination } from '../../table/Pagination'
import { SearchBar } from '../../table/SearchBar'
import { CatalogueTable } from './CatalogueItems.table'

interface Props {
  setItem: Dispatch<SetStateAction<CatalogueItem | undefined>>
  selectedItem?: CatalogueItem
}

const CatalogueTableSelect = ({ setItem, selectedItem }: Props) => {
  const tableId = 'catalogueItemsModal'

  const { catalogueItems, loading } = useCatalogueItems(tableId)
  const { catalogueCategories } = useCategoryList()

  const { instances } = useTableStateStore()

  const pagination = instances[tableId]?.pagination
  const search = instances[tableId]?.search

  useEffect(() => {
    setItem(undefined)
  }, [search, pagination, setItem])

  return (
    <Fragment>
      <SearchBar
        tableId={tableId}
        useQuery={false}
        onChange={() => {
          setItem(undefined)
        }}
      />
      <div className="h-full overflow-y-hidden min-h-[245px] border-t border-gray-300">
        <CatalogueTable
          tableId={tableId}
          enableQueryURL={false}
          hideButtons={true}
          loading={loading}
          getRowProps={row => ({
            className: cn(
              'cursor-pointer',
              row.original.uid === selectedItem?.uid
                ? 'bg-primary-300 dark:bg-primary-600 hover:bg-color-300 dark:hover:bg-color-600'
                : ''
            ),
            onClick: () => {
              setItem(row.original)
            }
          })}
          categoryList={catalogueCategories}
          catalogueItems={catalogueItems}
        />
      </div>
      <Pagination
        tableId={tableId}
        settings={{
          enableQueryURL: false,
          total: catalogueItems?.totalCount,
          pageSizeDefault: 5
        }}
      />
    </Fragment>
  )
}

export default CatalogueTableSelect
