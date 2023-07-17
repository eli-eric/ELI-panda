import type { ColumnDef } from '@tanstack/react-table'
import { type Dispatch, Fragment, type SetStateAction, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import useTableStateStore from '@/store/useTableStateStore'
import type { CatalogueItem } from '@/types/responses'

import { Pagination } from '../../table/Pagination'
import SearchBar from '../../table/SearchBar'
import { CatalogueTable } from './CatalogueItems.table'
import { SelectCell } from './cells/SelectCell'

const messages = message.cataloguePage.itemList.header

const CatalogueTableSelect = ({ setItem }: { setItem: Dispatch<SetStateAction<CatalogueItem | undefined>> }) => {
  const intl = useIntl()
  const tableId = 'catalogueItemsModal'

  const { catalogueItems, loading } = useCatalogueItems(tableId)
  const { categoryList } = useCategoryList()

  const selectColumn: ColumnDef<CatalogueItem, any> = useMemo(
    () => ({
      header: intl.formatMessage({ id: messages.select }),
      id: 'select',
      cell: props => <SelectCell {...props} setItem={setItem} />
    }),
    [intl, setItem]
  )
  const { instances } = useTableStateStore()

  const pagination = instances[tableId]?.pagination
  const search = instances[tableId]?.search

  useEffect(() => {
    if (search) {
      setItem(undefined)
    }
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
      <div className="flex flex-col min-h-[324px] pb-3 justify-between">
        <div className="flex border-b min-h-[312px] flex-col justify-between">
          <div className="h-full overflow-y-hidden border-t border-gray-300">
            <fieldset>
              <CatalogueTable
                tableId={tableId}
                additionalColumn={selectColumn}
                enableQueryURL={false}
                loading={loading}
                categoryList={categoryList}
                catalogueItems={catalogueItems}
              />
            </fieldset>
          </div>
        </div>
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
