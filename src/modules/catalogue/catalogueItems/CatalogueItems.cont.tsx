import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import usePagination from '@/hooks/table/usePagination'

import useCatalogueItems from '../hooks/useCatalogueItems'
import CatalogueItemsComponent from './CatalogueItems.comp'
import DefaultMessageComponent from './message/default-message.comp'

const messages = message.cataloguePage.defaultMessage

const CatalogueItemsContainer = () => {
  const intl = useIntl()
  const router = useRouter()

  const { catalogueItems } = useCatalogueItems()

  const { getPaginationComponent } = usePagination({
    dependecies: [router.query.search],
    useQuery: false,
    tableId: 'catalogueItems',
    total: catalogueItems?.totalCount,
    pageSizeDefault: 50
  })

  return (
    <Fragment>
      <div data-testid="item-list" className="h-full overflow-auto border-t border-gray-300  ">
        {catalogueItems &&
          (catalogueItems.totalCount !== 0 ? (
            <CatalogueItemsComponent />
          ) : (
            <DefaultMessageComponent
              title={intl.formatMessage({ id: messages.noResults.title })}
              message={intl.formatMessage({ id: messages.noResults.text })}
            />
          ))}
      </div>
      {catalogueItems && getPaginationComponent()}
    </Fragment>
  )
}

export default CatalogueItemsContainer
