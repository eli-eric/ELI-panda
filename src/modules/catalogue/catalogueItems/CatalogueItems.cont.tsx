import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { type Dispatch, Fragment, type SetStateAction, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'
import useSWR from 'swr'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import usePagination from '@/hooks/table/usePagination'
import { useCataloguePath } from '@/hooks/usePath'
import type { CatalogueItemsResponse } from '@/types/responses'

import DefaultMessageComponent from '../message/default-message.comp'
import CatalogueItemsComponent from './CatalogueItems.comp'
import useCatalogueItems from '../hooks/useCatalogueItems'

const messages = message.cataloguePage.defaultMessage

const CatalogueItemsContainer = () => {
  const intl = useIntl()
  const router = useRouter()

  const { catalogueItems } = useCatalogueItems()

  const { getPaginationComponent, setTotalCount, page, pageSize, setPageSize } = usePagination({
    dependecies: [router.query.search],
    useQuery: !!catalogueItems,
    tableId: 'catalogueItems'
  })

  useEffect(() => {
    setPageSize(50)
  }, [setPageSize])

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
