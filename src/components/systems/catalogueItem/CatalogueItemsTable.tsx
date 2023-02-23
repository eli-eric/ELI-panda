import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import CatalogueItemsComponent from '@/components/catalogue/catalogueItems/CatalogueItems.comp'
import EmptyResults from '@/components/ui/EmptyResults'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { CatalogueItemsResponse } from '@/types/responses'

const messages = message.systemsPage.relations.addRelationModal

export type Selectable = {
  isSelectable: boolean
  register: UseFormRegister<{
    itemUid: string
  }>
  itemUid: string | undefined
}

const CatalogueItemsTable = ({
  searchValue,
  setItemUid,
}: {
  searchValue?: string
  setItemUid: Dispatch<SetStateAction<string | undefined>>
}) => {
  const intl = useIntl()

  const { register, watch } = useForm<{ itemUid: string }>()
  const itemUid = watch('itemUid')
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
      <div className="h-full overflow-x-auto border-t border-gray-300">
        <fieldset>
          <CatalogueItemsComponent
            selectable={{ isSelectable: true, register, itemUid }}
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
