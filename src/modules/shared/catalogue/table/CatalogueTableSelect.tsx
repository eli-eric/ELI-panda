import { type Dispatch, Fragment, type SetStateAction, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import useTableStateStore from '@/store/useTableStateStore'
import type { CatalogueItem } from '@/types/responses/catalogue'

import { Pagination } from '../../table/Pagination'
import { SearchBar } from '../../table/SearchBar'
import { CatalogueTableSelectComponent } from './CatalogueTableSelect.table'

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

  const handleSelectionChange = (uid: string) => {
    const item = catalogueItems?.data.find(item => item.uid === uid)
    if (item) {
      setItem(item)
    }
  }

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
        <CatalogueTableSelectComponent
          tableId={tableId}
          enableQueryURL={false}
          hideButtons={true}
          loading={loading}
          selectedItemUid={selectedItem?.uid}
          onSelectionChange={handleSelectionChange}
          getRowProps={row => ({
            className: cn(
              'cursor-pointer transition-all',
              row.original.uid === selectedItem?.uid
                ? 'bg-orange-50 dark:bg-orange-950 border-l-1 border-l-orange-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-900'
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
