import React, { useMemo, useState } from 'react'

import ItemsPaginationComponent from '@/components/catalogue/catalogueItems/paging/items-pagination.comp'

export type Pagination = {
  page: number
  pageSize: number
}

const usePagination = (): {
  paginationStringyfy: string
  pagination: Pagination
  getPaginationComponent: () => JSX.Element
  setTotalCount: React.Dispatch<React.SetStateAction<number | undefined>>
} => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalCount, setTotalCount] = useState<number>()

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }

  const pagination = useMemo(() => {
    const pagination = {
      page: page,
      pageSize: pageSize
    }
    return { paginationStringyfy: JSON.stringify(pagination), pagination }
  }, [page, pageSize])

  const getPaginationComponent = () => (
    <ItemsPaginationComponent
      page={page}
      pageSize={pageSize}
      previousPageHandler={previousPageHandler}
      nextPageHandler={nextPageHandler}
      itemsTotalCount={totalCount}
    />
  )

  return {
    paginationStringyfy: pagination.paginationStringyfy,
    pagination: pagination.pagination,
    getPaginationComponent,
    setTotalCount
  }
}

export default usePagination
