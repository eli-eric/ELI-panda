import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import PaginationComponent from '@/components/table/Pagination.comp'

import useQueryString from './useQueryString'

export type Pagination = {
  page: number
  pageSize: number
}

const usePagination = ({
  dependecies,
  useQuery,
  pageSizeDefault
}: {
  dependecies?: React.DependencyList
  useQuery?: boolean
  pageSizeDefault?: number
}): {
  pagination: string
  getPaginationComponent: () => JSX.Element
  setTotalCount: React.Dispatch<React.SetStateAction<number | undefined>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  page: number
  pageSize: number
} => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(pageSizeDefault || 10)
  const [totalCount, setTotalCount] = useState<number>()
  const [pageNumbers, setPageNumbers] = useState<number | undefined>()

  const router = useRouter()

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }
  const pagination = useQueryString({
    page,
    pageSize
  })

  useEffect(
    () => {
      if (useQuery) {
        router.replace({
          pathname: router.pathname,
          query: router.query.search
            ? {
                ...router.query,
                search: router.query.search,
                page: page
              }
            : {
                ...router.query,
                page: page
              }
        })
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
    if (totalCount) {
      const pageCount = Math.ceil(totalCount / pageSize)
      setPageNumbers(pageCount)
    }
  }, [totalCount, setPageNumbers, pageSize])

  const getPaginationComponent = () => (
    <PaginationComponent
      page={page}
      pageSize={pageSize}
      previousPageHandler={previousPageHandler}
      nextPageHandler={nextPageHandler}
      itemsTotalCount={totalCount}
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
