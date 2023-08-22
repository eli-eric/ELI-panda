import type { ColumnDef } from '@tanstack/react-table'
import { type Dispatch, Fragment, type SetStateAction, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import useTableStateStore from '@/store/useTableStateStore'

import { Pagination } from '../../table/Pagination'
import { SearchBar } from '../../table/SearchBar'
import { CatalogueTable } from './CatalogueItems.table'
import { SelectCell } from './cells/SelectCell'

const messages = message.cataloguePage.itemList.header

interface Props {
  setItem: Dispatch<SetStateAction<CatalogueItem | undefined>>
  selectedItem?: CatalogueItem
}

const CatalogueTableSelect = ({ setItem, selectedItem }: Props) => {
  const intl = useIntl()
  const tableId = 'catalogueItemsModal'

  const { catalogueItems, loading } = useCatalogueItems(tableId)
  const { categoryList } = useCategoryList()

  const selectColumn: ColumnDef<CatalogueItem, any> = useMemo(
    () => ({
      header: intl.formatMessage({ id: messages.select }),
      id: 'select',
      cell: props => <SelectCell {...props} setItem={setItem} selectedItem={selectedItem} />,
      size: 70
    }),
    [intl, setItem, selectedItem]
  )
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
