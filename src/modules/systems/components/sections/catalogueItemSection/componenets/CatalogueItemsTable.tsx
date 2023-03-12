import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import EmptyResults from '@/components/EmptyResults'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import CatalogueItemsComponent from '@/modules/catalogue/catalogueItems/CatalogueItems.comp'
import { CatalogueItemsResponse } from '@/types/responses'

const CatalogueItemsTable = ({
  searchValue,
  setItem,
  itemName
}: {
  searchValue?: string
  itemName?: string

  setItem: Dispatch<SetStateAction<{ name?: string; uid?: string }>>
}) => {
  const { setTotalCount, getPaginationComponent, page, pageSize } = usePagination({
    dependecies: [searchValue]
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
  const { data: catalogueItems } = useSWR<CatalogueItemsResponse>(
    searchValue ? endpoints.catalogueItems : undefined
  )
  useEffect(() => {
    setItem({ name: undefined, uid: undefined })
  }, [page, setItem])

  useEffect(() => {
    setTotalCount(catalogueItems?.totalCount)
  }, [catalogueItems, setTotalCount])

  return (
    <div className="flex flex-col min-h-[535px] justify-between">
      <div className="h-full overflow-x-auto border-t border-gray-300">
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
