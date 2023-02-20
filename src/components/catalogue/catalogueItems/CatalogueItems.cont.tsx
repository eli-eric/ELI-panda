import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'
import useSWR from 'swr'

import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { useCataloguePath, useCategoryPath } from '@/hooks/usePath'
import { CatalogueItemsResponse } from '@/types/responses'

import DefaultMessageComponent from '../message/default-message.comp'
import CatalogueItemsComponent from './CatalogueItems.comp'

const messages = message.cataloguePage.defaultMessage

interface Props {
  categoryListLength?: number
  setCatalogueItemsList: Dispatch<SetStateAction<CatalogueItemsResponse | undefined>>
}

const CatalogueItemsContainer = ({ categoryListLength, setCatalogueItemsList }: Props) => {
  const intl = useIntl()
  const router = useRouter()
  const { status: session } = useSession()
  const categoryPathUrl = useCategoryPath()
  const categoryPath = useCataloguePath()

  const { getPaginationComponent, setTotalCount, page, pageSize, setPageSize } = usePagination({
    dependecies: [router.query.search, categoryPathUrl],
    useQuery: true
  })
  const endpoints = useEndpoint({
    query: router.query.search
      ? { search: router.query.search, page, pageSize, categoryPath }
      : { page, pageSize, categoryPath }
  })
  useEffect(() => {
    setPageSize(30)
  }, [setPageSize])

  const { data: catalogueItems } = useSWR<CatalogueItemsResponse>(
    categoryListLength === 0 || (router.query.search && session === 'authenticated') ? endpoints.catalogueItems : null
  )
  useEffect(() => {
    setTotalCount(catalogueItems?.totalCount)
  }, [catalogueItems, setTotalCount])
  useEffect(() => {
    setCatalogueItemsList(catalogueItems)
  }, [catalogueItems]) // eslint-disable-line

  return (
    <Fragment>
      <div className="h-full overflow-auto border-t border-gray-300  ">
        {catalogueItems &&
          (catalogueItems.totalCount !== 0 ? (
            <CatalogueItemsComponent catalogueItems={catalogueItems} categoryListLength={categoryListLength} />
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
