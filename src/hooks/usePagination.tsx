import React, { useEffect, useMemo, useState } from 'react'

import ItemsPaginationComponent from '@/components/catalogue/catalogueItems/paging/items-pagination.comp'

export type Pagination = {
  page: number
  pageSize: number
}

const usePagination = (
  searchValue?: string
): {
  pagination: string
  getPaginationComponent: () => JSX.Element
  setTotalCount: React.Dispatch<React.SetStateAction<number | undefined>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
} => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalCount, setTotalCount] = useState<number>()
  const [pageNumbers, setPageNumbers] = useState<number | undefined>()

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }
  const pagination = useMemo(() => {
    const pagination = {
      page,
      pageSize
    }
    return JSON.stringify(pagination)
  }, [page, pageSize])

  useEffect(() => {
    setPage(1)
  }, [searchValue])

  useEffect(() => {
    if (totalCount) {
      const pageCount = Math.ceil(totalCount / pageSize)
      setPageNumbers(pageCount)
    }
  }, [totalCount, setPageNumbers, pageSize])

  const getPaginationComponent = () => (
    <ItemsPaginationComponent
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
    setPageSize
  }
}

export default usePagination
