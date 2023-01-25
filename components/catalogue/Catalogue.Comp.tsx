import ProgressBarComponent from 'components/ui/progress-bar.comp'
import { message } from 'i18n/src/messages'
import { useIntl } from 'react-intl'
import { CatalogueCategoryResponse, CatalogueItemsResponse } from 'types/responses'

import BreadcrumbContainer from './breadcrump/breadcrump.cont'
import CategoryListComponent from './category-list/category-list.comp'
import ItemListContainer from './item-list/item-list.cont'
import { CatalogLayoutContainer, TableLayoutComponent } from './layout/catalog-layout.cont'
import DefaultMessageComponent from './message/default-message.comp'
import ItemsPaginationComponent from './paging/items-pagination.comp'
import SearchBarComponent from './search-bar/search-bar.comp'

const messages = message.cataloguePage.defaultMessage

interface Props {
  catalogueItems?: CatalogueItemsResponse
  categoryList?: CatalogueCategoryResponse[]
  page: number
  pageSize: number
  pageNumbers?: number
  previousPageHandler: () => void
  nextPageHandler: () => void
  search?: string | string[] | undefined
}

const CatalogueComponent = ({
  catalogueItems,
  categoryList,
  page,
  pageSize,
  pageNumbers,
  search,
  previousPageHandler,
  nextPageHandler
}: Props) => {
  const intl = useIntl()
  return (
    <CatalogLayoutContainer catalogueItems={catalogueItems} categoryList={categoryList}>
      <SearchBarComponent />
      <BreadcrumbContainer />

      {categoryList ? <CategoryListComponent categoryList={categoryList} /> : <ProgressBarComponent />}

      {catalogueItems ? (
        <TableLayoutComponent>
          <ItemListContainer itemList={catalogueItems.data} categoryListLength={categoryList?.length} />
          {catalogueItems.data.length === 0 && (
            <DefaultMessageComponent
              title={intl.formatMessage({ id: messages.noResults.title })}
              message={intl.formatMessage({ id: messages.noResults.text })}
            />
          )}
        </TableLayoutComponent>
      ) : (categoryList?.length === 0 || search) && !catalogueItems ? (
        <ProgressBarComponent />
      ) : (
        <DefaultMessageComponent message={intl.formatMessage({ id: messages.help.text })} />
      )}

      {catalogueItems && (
        <ItemsPaginationComponent
          itemsTotalCount={catalogueItems?.totalCount}
          page={page}
          pageSize={pageSize}
          pageNumbers={pageNumbers}
          previousPageHandler={previousPageHandler}
          nextPageHandler={nextPageHandler}
        />
      )}
    </CatalogLayoutContainer>
  )
}

export default CatalogueComponent
