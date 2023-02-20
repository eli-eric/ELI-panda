import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

import PaginationComponent from '@/components/ui/table/Pagination.comp'

export type Pagination = {
  page: number
  pageSize: number
}

const usePagination = ({
  dependecies,
  useQuery,
}: {
  dependecies: React.DependencyList
  useQuery?: boolean
}): {
  pagination: string
  getPaginationComponent: () => JSX.Element
  setTotalCount: React.Dispatch<React.SetStateAction<number | undefined>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  page: number
  pageSize: number
} => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalCount, setTotalCount] = useState<number>()
  const [pageNumbers, setPageNumbers] = useState<number | undefined>()
  const router = useRouter()

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }
  const pagination = useMemo(() => {
    const pagination = {
      page,
      pageSize,
    }
    return JSON.stringify(pagination)
  }, [page, pageSize])

  useEffect(() => {
    if (useQuery) {
      router.push(
        { pathname: router.pathname, query: { ...router.query, page: page } },
        undefined,
        {
          shallow: true,
        },
      )
    }
  }, [useQuery, page])

  useEffect(() => {
    setPage(1)
  }, [...dependecies]) //eslint-disable-line

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
    pageSize,
  }
}

export default usePagination
