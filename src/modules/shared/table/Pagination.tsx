import { useQueryState } from 'next-usequerystate'
import React, { startTransition, useCallback, useEffect, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import PaginationComponent from '@/components/table/Pagination.comp'
import useTableStateStore from '@/store/useTableStateStore'

interface PaginationProps {
  tableId: string
  settings?: {
    enableQueryURL?: boolean
    total?: number
    pageSizeDefault?: number
  }
}
//TODO: refactor to use useQueryState and avoid useEffects

export const Pagination = ({ tableId, settings }: PaginationProps) => {
  const { enableQueryURL, total, pageSizeDefault = 10 } = settings || {}
  const [page, setPage] = useState<number>(1)
  const [pageSize] = useState<number>(pageSizeDefault)
  const [pageNumbers, setPageNumbers] = useState<number | undefined>()
  const { setPagination, instances } = useTableStateStore()
  const search = instances[tableId]?.search || ''
  const filter = instances[tableId]?.filter || ''
  const sortBy = instances[tableId]?.sortBy || ''

  const [queryPage, setQueryPage] = useQueryState('page')

  const previousPageHandler = useCallback(() => {
    setPage(prev => prev - 1)
  }, [])

  const nextPageHandler = useCallback(() => {
    setPage(prev => prev + 1)
  }, [])

  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    startTransition(() => {
      setPage(1)
    })
  }, [search, filter, sortBy])

  //calculate page numbers
  useEffect(() => {
    startTransition(() => {
      const itemsTotalCount = total
      if (itemsTotalCount) {
        const pageCount = Math.ceil(itemsTotalCount / pageSize)
        setPageNumbers(pageCount)
      }
    })
  }, [pageSize, total])

  //initial page load
  useEffect(() => {
    if (enableQueryURL) {
      if (queryPage) {
        setPage(parseInt(queryPage))
        setPagination(tableId, `{"page":${queryPage},"pageSize":${pageSize}}`)
      } else {
        setQueryPage(page.toString())
        setPage(1)
        setPagination(tableId, `{"page":${page},"pageSize":${pageSize}}`)
      }
    } else {
      setPage(1)
      setPagination(tableId, `{"page":${page},"pageSize":${pageSize}}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //page change
  useEffect(() => {
    if (!isFirstRender) {
      if (enableQueryURL) {
        setQueryPage(page.toString())
      }
      setPagination(tableId, `{"page":${page},"pageSize":${pageSize}}`)
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableQueryURL, page, pageSize, setPagination, tableId, setQueryPage])

  return (
    <PaginationComponent
      page={page}
      pageSize={pageSize}
      previousPageHandler={previousPageHandler}
      nextPageHandler={nextPageHandler}
      itemsTotalCount={total}
      pageNumbers={pageNumbers}
    />
  )
}
