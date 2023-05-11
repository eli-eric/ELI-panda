import { type Dispatch, type SetStateAction, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import EmptyResults from '@/components/empty-section/EmptyResults'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import CatalogueItemsComponent from '@/modules/catalogue/catalogueItems/CatalogueItems.comp'
import type { CatalogueItem, CatalogueItemsResponse } from '@/types/responses'

const CatalogueItemsTable = ({
  searchValue,
  setItem,
  itemName
}: {
  searchValue?: string
  itemName?: string

  setItem: Dispatch<SetStateAction<CatalogueItem | undefined>>
}) => {
  const { setTotalCount, getPaginationComponent, page, pageSize } = usePagination({
    dependecies: [searchValue],
    pageSizeDefault: 5
  })
  const query = useMemo(
    () => ({
      search: searchValue,
      page,
      pageSize
    }),
    [searchValue, page, pageSize]
  )
  const endpoints = useEndpoint({ query })
  const { data: catalogueItems } = useSWR<CatalogueItemsResponse>(searchValue ? endpoints.catalogueItems : undefined)
  useEffect(() => {
    setItem(undefined)
  }, [page, setItem])

  useEffect(() => {
    setTotalCount(catalogueItems?.totalCount)
  }, [catalogueItems, setTotalCount])

  return (
    <div className="flex border-b min-h-[312px] flex-col justify-between">
      <div className="h-full overflow-y-hidden border-t border-gray-300">
        <fieldset>
          <CatalogueItemsComponent
            selectable={{ isSelectable: true, selectedItem: itemName, setItem }}
            catalogueItems={catalogueItems}
            categoryListLength={catalogueItems?.data.length}
          />
        </fieldset>
      </div>
      {!catalogueItems && <EmptyResults />}
      {catalogueItems && catalogueItems.data.length === 0 && <EmptyResults />}
      {getPaginationComponent()}
    </div>
  )
}

export default CatalogueItemsTable
