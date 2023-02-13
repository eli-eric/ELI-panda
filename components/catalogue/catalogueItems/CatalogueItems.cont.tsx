import { useCatalogueItemsPath, useCategoryPath } from 'hooks/usePath'
import { message } from 'i18n/src/messages'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'
import { CatalogueItemsResponse } from 'types/responses'

import DefaultMessageComponent from '../message/default-message.comp'
import CatalogueItemsComponent from './CatalogueItems.comp'
import ItemsPaginationComponent from './paging/items-pagination.comp'

const messages = message.cataloguePage.defaultMessage

interface Props {
  categoryListLength?: number
  setCatalogueItemsList: Dispatch<SetStateAction<CatalogueItemsResponse | undefined>>
}

const CatalogueItemsContainer = ({ categoryListLength, setCatalogueItemsList }: Props) => {
  const intl = useIntl()
  const router = useRouter()
  const { status: session } = useSession()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const catalogueItemsPath = useCatalogueItemsPath(pageSize, page)
  const categoryPath = useCategoryPath()

  const [pageNumbers, setPageNumbers] = useState<number | undefined>()
  /* conditionaly fetch catalogue Items if category list dont return categories or search is not in query */
  const { data: catalogueItems } = useSWR<CatalogueItemsResponse>(
    categoryListLength === 0 || (router.query.search && session === 'authenticated') ? catalogueItemsPath : null
  )
  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }
  /* reason for that is overflow of paging when we redirect to another category  */
  useEffect(() => {
    setPage(1)
  }, [categoryPath])

  /* Use effect for calculate poage numbers and set page to query params when items are fetched */
  useEffect(() => {
    setCatalogueItemsList(catalogueItems)
    if (catalogueItems) {
      const pageCount = Math.ceil(catalogueItems?.totalCount / pageSize)
      setPageNumbers(pageCount)
      router.push({ query: { ...router.query, page: page } }, undefined, {
        shallow: true
      })
    }
  }, [catalogueItems, pageSize, page]) // eslint-disable-line

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
    </Fragment>
  )
}

export default CatalogueItemsContainer
