import { type Dispatch, Fragment, type SetStateAction, useCallback, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import type { CellProps, Column } from 'react-table'

import EmptyResults from '@/components/empty-section/EmptyResults'
import { useSearch } from '@/hooks/table/useSearch'
import { message } from '@/i18n/src/messages'
import useCatalogueItems from '@/modules/catalogue/hooks/useCatalogueItems'
import useTableStateStore from '@/store/useTableStateStore'
import type { CatalogueItem } from '@/types/responses'

import useCatalogueTable from './CatalogueItems.table'

const messages = message.cataloguePage.itemList.header

const CatalogueTableSelect = ({ setItem }: { setItem: Dispatch<SetStateAction<CatalogueItem | undefined>> }) => {
  const { catalogueItems } = useCatalogueItems()
  const intl = useIntl()
  const { renderSearchBar } = useSearch({
    useQuery: false,
    tableId: 'catalogueItems',
    onSuccess: () => {
      setItem(undefined)
    }
  })

  const Select = useCallback(
    ({ row: { original } }: CellProps<CatalogueItem>) => (
      <div className="ml-3 flex h-5 items-center">
        <input
          id={`side-${original.uid}`}
          name="itemUid"
          type="radio"
          onClick={() => {
            setItem(original)
          }}
          className="h-4 w-4 border-gray-300 text-primary-500 focus:ring-primary-500"
        />
      </div>
    ),
    [setItem]
  )
  const selectColumn: Column<CatalogueItem> = useMemo(
    () => ({
      Header: intl.formatMessage({ id: messages.select }),
      id: 'select',
      Cell: Select
    }),
    [intl, Select]
  )
  const { getPaginationComponent, getTable } = useCatalogueTable(5, selectColumn, false)

  const { instances } = useTableStateStore()

  const pagination = instances['catalogueItems']?.pagination
  const search = instances['catalogueItems']?.search

  useEffect(() => {
    if (search) {
      setItem(undefined)
    }
  }, [search, pagination, setItem])

  return (
    <Fragment>
      {renderSearchBar()}
      <div className="flex flex-col min-h-[324px] pb-3 justify-between">
        <div className="flex border-b min-h-[312px] flex-col justify-between">
          <div className="h-full overflow-y-hidden border-t border-gray-300">
            <fieldset>{getTable()}</fieldset>
          </div>
          {!catalogueItems && <EmptyResults />}
          {catalogueItems && catalogueItems.data.length === 0 && <EmptyResults />}
          {getPaginationComponent()}
        </div>
      </div>
    </Fragment>
  )
}

export default CatalogueTableSelect
