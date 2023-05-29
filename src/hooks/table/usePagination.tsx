import { useQueryState } from 'next-usequerystate'
import React, { useCallback, useEffect, useState } from 'react'

import PaginationComponent from '@/components/table/Pagination.comp'
import useTableStateStore from '@/store/useTableStateStore'

import useQueryString from '../useQueryString'

interface PaginationProps {
  dependecies?: React.DependencyList
  useQuery?: boolean
  pageSizeDefault?: number
  tableId?: string
  total?: number
}

type PaginationResponse = {
  pagination: string
  getPaginationComponent: () => JSX.Element
  setTotalCount: React.Dispatch<React.SetStateAction<number | undefined>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  page: number
  pageSize: number
}

//TODO: clean up this mess
const usePagination = ({
  dependecies,
  useQuery,
  pageSizeDefault,
  tableId,
  total
}: PaginationProps): PaginationResponse => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(pageSizeDefault || 10)
  const [totalCount, setTotalCount] = useState<number | undefined>(total)
  const [pageNumbers, setPageNumbers] = useState<number | undefined>()
  const { setPagination } = useTableStateStore()
  const [queryPage, setQueryPage] = useQueryState('page') //eslint-disable-line

  const previousPageHandler = useCallback(() => {
    setPage(prev => prev - 1)
  }, [])

  const nextPageHandler = useCallback(() => {
    setPage(prev => prev + 1)
  }, [])

  const pagination = useQueryString({
    page,
    pageSize
  })

  useEffect(() => {
    tableId && setPagination(tableId, pagination)
  }, [pagination, setPagination, tableId])

  useEffect(
    () => {
      if (useQuery) {
        setQueryPage(page ? page.toString() : null)
      }
    },
    dependecies ? [useQuery, page, ...dependecies] : [useQuery, page] //eslint-disable-line
  )

  useEffect(
    () => {
      setPage(1)
    },
    dependecies ? [...dependecies] : [] //eslint-disable-line
  )

  useEffect(() => {
    const itemsTotalCount = total || totalCount
    if (itemsTotalCount) {
      const pageCount = Math.ceil(itemsTotalCount / pageSize)
      setPageNumbers(pageCount)
    }
  }, [totalCount, pageSize, total])

  const getPaginationComponent = () => (
    <PaginationComponent
      page={page}
      pageSize={pageSize}
      previousPageHandler={previousPageHandler}
      nextPageHandler={nextPageHandler}
      itemsTotalCount={totalCount || total}
      pageNumbers={pageNumbers}
    />
  )

  return {
    pagination,
    getPaginationComponent,
    setTotalCount,
    setPageSize,
    page,
    pageSize
  }
}

export default usePagination
