import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import CatalogueItemsComponent from '@/components/catalogue/catalogueItems/CatalogueItems.comp'
import EmptyResults from '@/components/ui/EmptyResults'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { CatalogueItemsResponse } from '@/types/responses'

const messages = message.systemsPage.relations.addRelationModal

const CatalogueItemsTable = ({
  searchValue,
  setItemUid,
}: {
  searchValue?: string
  setItemUid: Dispatch<SetStateAction<string | undefined>>
}) => {
  const intl = useIntl()

  const { setTotalCount, getPaginationComponent, page, pageSize } =
    usePagination({ dependecies: [searchValue] })
  const query = useMemo(
    () => ({
      search: searchValue,
      page,
      pageSize,
    }),
    [searchValue, page, pageSize],
  )
  const endpoints = useEndpoint({ query })
  const { data: catalogueItems } = useSWR<CatalogueItemsResponse>(
    searchValue ? endpoints.catalogueItems : undefined,
  )

  useEffect(() => {
    setItemUid(undefined)
  }, [page, setItemUid])

  useEffect(() => {
    setTotalCount(catalogueItems?.totalCount)
  }, [catalogueItems, setTotalCount])

  const collumsTitle = Object.keys(messages.tableHeader).map(key =>
    intl.formatMessage({ id: messages.tableHeader[key] }),
  )

  return (
    <div className="flex flex-col min-h-[535px] justify-between">
      <div className="h-full overflow-x-auto border-t border-gray-300  ">
        <CatalogueItemsComponent
          catalogueItems={catalogueItems}
          categoryListLength={catalogueItems?.data.length}
        />
      </div>
      {!catalogueItems && <EmptyResults />}
      {catalogueItems && catalogueItems.data.length === 0 && <EmptyResults />}
      {getPaginationComponent()}
    </div>
  )
}

export default CatalogueItemsTable
