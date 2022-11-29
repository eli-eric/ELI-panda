import { MouseEventHandler } from 'react'

interface Props {
  itemsTotalCount: number
  page: number
  pageSize: number

  previousPageHandler: MouseEventHandler<HTMLButtonElement>
  nextPageHandler: MouseEventHandler<HTMLButtonElement>
}

export default function ItemsPaginationComponent({
  itemsTotalCount,
  page,
  pageSize,
  previousPageHandler,
  nextPageHandler
}: Props) {
  const from = 1 + (page - 1) * pageSize
  const to = page * pageSize
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{from}</span> to{' '}
          <span className="font-medium">{to}</span> of{' '}
          <span className="font-medium">{itemsTotalCount}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={previousPageHandler}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={nextPageHandler}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </nav>
  )
}
